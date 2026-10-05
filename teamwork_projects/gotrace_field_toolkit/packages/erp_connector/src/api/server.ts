/**
 * GoTRACE ERP Connector - Native Node.js RESTful API & Webhook Server
 * 
 * Implements high-throughput, low-latency REST endpoints & Webhook listener
 * with native Node.js HTTP and zero external runtime dependencies.
 */

import { createServer, IncomingMessage, ServerResponse, Server } from 'node:http';
import { OPENAPI_SPEC } from './openapi_spec.js';
import { renderSwaggerHtml } from './swagger_ui.js';
import { WebhookReceiver, WebhookReceiverConfig } from '../webhooks/webhook_receiver.js';
import { generateTraceabilityQr } from '../qr/qr_generator.js';
import { ZplGenerator } from '../qr/zpl_builder.js';
import { QrEcLevel } from '../qr/qr_matrix.js';

export interface ServerConfig extends WebhookReceiverConfig {
  port?: number;
  host?: string;
}

export function createRequestHandler(receiver: WebhookReceiver) {
  const lineage = receiver.getLineageEngine();

  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-GoTRACE-Signature, X-Signature-SHA256, Authorization');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    const pathname = url.pathname;
    const method = req.method?.toUpperCase();

    // 1. Swagger UI & Documentation Endpoints
    if (method === 'GET' && (pathname === '/api-docs' || pathname === '/docs')) {
      const html = renderSwaggerHtml('/swagger.json');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    if (method === 'GET' && (pathname === '/swagger.json' || pathname === '/openapi.json')) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(OPENAPI_SPEC, null, 2));
      return;
    }

    // 2. Health Check
    if (method === 'GET' && pathname === '/api/v1/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'UP',
        service: 'gotrace-erp-connector',
        timestamp: new Date().toISOString()
      }));
      return;
    }

    // 3. Helper to buffer request body
    const readBody = async (): Promise<Buffer> => {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      return Buffer.concat(chunks);
    };

    // 4. Webhook: Delivery Order
    if (method === 'POST' && pathname === '/api/v1/erp/webhook/delivery-order') {
      try {
        const rawBuf = await readBody();
        const rawStr = rawBuf.toString('utf-8');
        const signature = (req.headers['x-gotrace-signature'] || 
                           req.headers['x-signature-sha256'] || 
                           req.headers['authorization']) as string | undefined;

        let parsed: Record<string, unknown>;
        try {
          parsed = JSON.parse(rawStr);
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'BAD_REQUEST', message: 'Malformed JSON payload' }));
          return;
        }

        const result = receiver.handleDeliveryOrder(rawBuf, signature, parsed);
        res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.success ? result.data : { error: result.error }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'INTERNAL_ERROR', message: (err as Error).message }));
      }
      return;
    }

    // 5. Webhook: E-Invoice
    if (method === 'POST' && pathname === '/api/v1/erp/webhook/e-invoice') {
      try {
        const rawBuf = await readBody();
        const rawStr = rawBuf.toString('utf-8');
        const signature = (req.headers['x-gotrace-signature'] || 
                           req.headers['x-signature-sha256'] || 
                           req.headers['authorization']) as string | undefined;

        let parsed: Record<string, unknown>;
        try {
          parsed = JSON.parse(rawStr);
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'BAD_REQUEST', message: 'Malformed JSON payload' }));
          return;
        }

        const result = receiver.handleEInvoice(rawBuf, signature, parsed);
        res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.success ? result.data : { error: result.error }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'INTERNAL_ERROR', message: (err as Error).message }));
      }
      return;
    }

    // 6. Direct QR & ZPL Generation Endpoint
    if (method === 'POST' && pathname === '/api/v1/erp/qr/generate') {
      try {
        const rawBuf = await readBody();
        const body = JSON.parse(rawBuf.toString('utf-8'));

        if (!body.targetGci) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'MISSING_FIELD', message: 'targetGci is required' }));
          return;
        }

        const baseUrl = body.landingBaseUrl || 'https://trace.gotrace.vn/resolve';
        const targetUrl = `${baseUrl}?gci=${encodeURIComponent(body.targetGci)}`;
        const qrRes = generateTraceabilityQr(targetUrl, { level: (body.level as QrEcLevel) || 'M' });

        const zplCarton = ZplGenerator.generateCartonLabel({
          productName: body.commodityName || 'NONG SAN TAY NAM BO',
          lotGci: body.targetGci,
          productionDate: body.productionDate || new Date().toISOString().slice(0, 10),
          expiryDate: body.expiryDate,
          weightKg: body.weightNetKg,
          traceabilityUrl: targetUrl
        });

        const zplPallet = ZplGenerator.generatePalletLabel({
          sscc: '089350010000000014',
          sellerName: 'CONG TY CP CO MAY DONG THAP',
          buyerName: 'DOI TAC THUONG MAI',
          deliveryOrderNumber: 'DO-QUICK-GEN',
          primaryLotGci: body.targetGci,
          totalCartons: 100,
          totalNetWeightKg: (body.weightNetKg ?? 50) * 100,
          totalGrossWeightKg: (body.weightNetKg ?? 50) * 101,
          traceabilityUrl: targetUrl,
          dispatchDate: new Date().toISOString().slice(0, 10)
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          targetGci: body.targetGci,
          url: targetUrl,
          pngBase64: qrRes.qrImageBase64,
          svg: qrRes.qrSvg,
          zplCarton,
          zplPallet,
          generationLatencyMs: qrRes.generationLatencyMs
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'INTERNAL_ERROR', message: (err as Error).message }));
      }
      return;
    }

    // 7. Query LOT by ID
    if (method === 'GET' && pathname.startsWith('/api/v1/erp/lots/')) {
      const lotId = decodeURIComponent(pathname.replace('/api/v1/erp/lots/', ''));
      const lot = lineage.getLot(lotId);
      if (!lot) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'NOT_FOUND', message: `Lot ${lotId} not found` }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(lot));
      return;
    }

    // 8. Query Transaction by ID
    if (method === 'GET' && pathname.startsWith('/api/v1/erp/transactions/')) {
      const txId = decodeURIComponent(pathname.replace('/api/v1/erp/transactions/', ''));
      const tx = lineage.getTransaction(txId);
      if (!tx) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'NOT_FOUND', message: `Transaction ${txId} not found` }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tx));
      return;
    }

    // 9. Query Lineage by LOT
    if (method === 'GET' && pathname.startsWith('/api/v1/erp/lineage/')) {
      const lotId = decodeURIComponent(pathname.replace('/api/v1/erp/lineage/', ''));
      const report = lineage.getLineage(lotId);
      if (!report) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'NOT_FOUND', message: `Lineage for lot ${lotId} not found` }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(report));
      return;
    }

    // Default route
    if (pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        service: 'GoTRACE Two-Way ERP/WMS Connector API',
        documentation: '/api-docs',
        openapiSpec: '/swagger.json',
        health: '/api/v1/health'
      }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'NOT_FOUND', message: `Path ${pathname} not found` }));
  };
}

export function startServer(config: ServerConfig): Promise<{ server: Server; port: number }> {
  return new Promise((resolve) => {
    const receiver = new WebhookReceiver(config);
    const handler = createRequestHandler(receiver);
    const server = createServer(handler);
    const port = config.port ?? 3000;
    const host = config.host ?? '0.0.0.0';

    server.listen(port, host, () => {
      resolve({ server, port });
    });
  });
}
