/**
 * Test Suite: End-to-End HTTP REST API & Webhook Handler Tests
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Readable, Writable } from 'node:stream';
import { IncomingMessage, ServerResponse } from 'node:http';
import { createRequestHandler } from '../src/api/server.js';
import { WebhookReceiver } from '../src/webhooks/webhook_receiver.js';
import { generateHmacSha256 } from '../src/crypto/hmac.js';
import { BravoDeliveryOrderPayload } from '../src/types/models.js';

class MockIncomingMessage extends Readable {
  method: string;
  url: string;
  headers: Record<string, string>;

  constructor(method: string, url: string, headers: Record<string, string> = {}, body?: string | Buffer) {
    super();
    this.method = method;
    this.url = url;
    this.headers = Object.fromEntries(
      Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
    );
    if (body !== undefined) {
      this.push(typeof body === 'string' ? Buffer.from(body) : body);
    }
    this.push(null);
  }

  _read() {}
}

class MockServerResponse extends Writable {
  statusCode: number = 200;
  headers: Record<string, string> = {};
  body: string = '';
  private chunks: Buffer[] = [];

  writeHead(statusCode: number, headers?: Record<string, string>) {
    this.statusCode = statusCode;
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        this.headers[k.toLowerCase()] = v;
      }
    }
    return this;
  }

  setHeader(name: string, value: string) {
    this.headers[name.toLowerCase()] = value;
    return this;
  }

  getHeader(name: string) {
    return this.headers[name.toLowerCase()];
  }

  _write(chunk: any, encoding: any, callback: any) {
    this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    callback();
  }

  end(data?: any) {
    if (data) {
      this.chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
    }
    this.body = Buffer.concat(this.chunks).toString('utf-8');
    super.end();
    this.emit('finish');
    return this;
  }
}

describe('HTTP REST API & Webhook Handler Endpoints', () => {
  const sharedSecret = 'http_test_secret_key_2026';
  let receiver: WebhookReceiver;
  let handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>;

  beforeEach(() => {
    receiver = new WebhookReceiver({ sharedSecret });
    handler = createRequestHandler(receiver);
  });

  async function executeRequest(
    method: string,
    url: string,
    headers: Record<string, string> = {},
    body?: string | Buffer
  ): Promise<{ statusCode: number; headers: Record<string, string>; body: string; json: () => any }> {
    const req = new MockIncomingMessage(method, url, headers, body) as unknown as IncomingMessage;
    const res = new MockServerResponse() as unknown as ServerResponse;

    await new Promise<void>((resolve) => {
      res.on('finish', () => resolve());
      handler(req, res);
    });

    const mockRes = res as unknown as MockServerResponse;
    return {
      statusCode: mockRes.statusCode,
      headers: mockRes.headers,
      body: mockRes.body,
      json: () => JSON.parse(mockRes.body)
    };
  }

  test('GET /api-docs returns HTML Swagger UI', async () => {
    const res = await executeRequest('GET', '/api-docs');
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.headers['content-type']?.includes('text/html'));
    assert.ok(res.body.includes('SwaggerUIBundle'));
    assert.ok(res.body.includes('/swagger.json'));
  });

  test('GET /swagger.json returns OpenAPI 3.0 specification JSON', async () => {
    const res = await executeRequest('GET', '/swagger.json');
    assert.strictEqual(res.statusCode, 200);
    const json = res.json();
    assert.strictEqual(json.openapi, '3.0.3');
    assert.ok('paths' in json);
  });

  test('GET /api/v1/health returns 200 UP status', async () => {
    const res = await executeRequest('GET', '/api/v1/health');
    assert.strictEqual(res.statusCode, 200);
    const json = res.json();
    assert.strictEqual(json.status, 'UP');
    assert.strictEqual(json.service, 'gotrace-erp-connector');
  });

  test('POST /api/v1/erp/webhook/delivery-order with valid HMAC creates transaction & returns QR', async () => {
    const payload: BravoDeliveryOrderPayload = {
      erp_source: 'BRAVO_8',
      order_id: 'DO-HTTP-2026-01',
      delivery_date: '2026-09-30',
      warehouse_gci: 'VN.DT.PLACE.WAREHOUSE.WH-COMAY-01',
      customer_party_gci: 'VN.SG.PARTY.BUYER.COOPMART',
      items: [
        {
          item_code: 'GAO-ST25-5KG',
          lot_number: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01',
          quantity: 2000,
          uom: 'BAG',
          net_weight_kg: 10000.0
        }
      ],
      timestamp_utc: new Date().toISOString()
    };

    const rawBody = JSON.stringify(payload);
    const sig = `sha256=${generateHmacSha256(rawBody, sharedSecret)}`;

    const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
      'Content-Type': 'application/json',
      'X-GoTRACE-Signature': sig
    }, rawBody);

    assert.strictEqual(res.statusCode, 200);
    const data = res.json();

    assert.match(data.traceabilityId, /^VN\.DT\.TRANSACTION\.CUSTODY_TRANSFER\.DO-HTTP-2026-01$/);
    assert.ok(data.qrImageBase64.startsWith('data:image/png;base64,'));
    assert.ok(data.zplCode.includes('^XA'));
    assert.ok(data.generationLatencyMs < 30);
  });

  test('POST /api/v1/erp/webhook/delivery-order with invalid HMAC signature returns 401', async () => {
    const payload = {
      erp_source: 'BRAVO_8',
      order_id: 'DO-FORGED',
      items: []
    };

    const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
      'Content-Type': 'application/json',
      'X-GoTRACE-Signature': 'sha256=bad_hex_signature_0000000000000000000000000000000000000000000000000'
    }, JSON.stringify(payload));

    assert.strictEqual(res.statusCode, 401);
  });

  test('POST /api/v1/erp/qr/generate generates standalone QR & ZPL', async () => {
    const reqBody = {
      targetGci: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01',
      commodityName: 'GAO ST25 CO MAY DONG THAP',
      productionDate: '2026-09-28',
      weightNetKg: 5.0
    };

    const res = await executeRequest('POST', '/api/v1/erp/qr/generate', {
      'Content-Type': 'application/json'
    }, JSON.stringify(reqBody));

    assert.strictEqual(res.statusCode, 200);
    const data = res.json();

    assert.strictEqual(data.targetGci, reqBody.targetGci);
    assert.ok(data.pngBase64.startsWith('data:image/png;base64,'));
    assert.ok(data.svg.includes('<svg'));
    assert.ok(data.zplCarton.includes('^XA'));
    assert.ok(data.generationLatencyMs < 30);
  });

  test('GET /api/v1/erp/lots/:id returns stored LOT, 404 for unknown', async () => {
    // First, ingest a delivery order to store the lot
    const payload: BravoDeliveryOrderPayload = {
      erp_source: 'BRAVO_8',
      order_id: 'DO-FOR-QUERY-01',
      delivery_date: '2026-09-30',
      items: [
        {
          item_code: 'GAO-OM5451',
          lot_number: 'VN.DT.LOT.FINISHED.20260930-QUERY-01',
          quantity: 1000,
          uom: 'KG'
        }
      ],
      timestamp_utc: new Date().toISOString()
    };
    const rawBody = JSON.stringify(payload);
    await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
      'Content-Type': 'application/json',
      'X-GoTRACE-Signature': `sha256=${generateHmacSha256(rawBody, sharedSecret)}`
    }, rawBody);

    const validLotId = 'VN.DT.LOT.FINISHED.20260930-QUERY-01';
    const resFound = await executeRequest('GET', `/api/v1/erp/lots/${encodeURIComponent(validLotId)}`);
    assert.strictEqual(resFound.statusCode, 200);
    const lot = resFound.json();
    assert.strictEqual(lot.lot_id, validLotId);

    const resNotFound = await executeRequest('GET', '/api/v1/erp/lots/NONEXISTENT_LOT_GCI');
    assert.strictEqual(resNotFound.statusCode, 404);
  });

  test('GET /api/v1/erp/lineage/:lotId returns lineage report', async () => {
    // Ingest DO
    const payload: BravoDeliveryOrderPayload = {
      erp_source: 'BRAVO_8',
      order_id: 'DO-FOR-LINEAGE-01',
      delivery_date: '2026-09-30',
      items: [
        {
          item_code: 'GAO-ST25',
          lot_number: 'VN.DT.LOT.FINISHED.20260930-LINEAGE-01',
          quantity: 500,
          uom: 'KG'
        }
      ],
      timestamp_utc: new Date().toISOString()
    };
    const rawBody = JSON.stringify(payload);
    await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
      'Content-Type': 'application/json',
      'X-GoTRACE-Signature': `sha256=${generateHmacSha256(rawBody, sharedSecret)}`
    }, rawBody);

    const validLotId = 'VN.DT.LOT.FINISHED.20260930-LINEAGE-01';
    const res = await executeRequest('GET', `/api/v1/erp/lineage/${encodeURIComponent(validLotId)}`);
    assert.strictEqual(res.statusCode, 200);
    const report = res.json();
    assert.strictEqual(report.lotGci, validLotId);
    assert.ok(Array.isArray(report.custodyTransactions));
    assert.strictEqual(report.custodyTransactions.length, 1);
  });
});
