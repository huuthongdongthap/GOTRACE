/**
 * Test Suite: ERP Ingestion Engine (Bravo 8, MISA AMIS, SAP S/4HANA)
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { WebhookReceiver } from '../src/webhooks/webhook_receiver.js';
import { generateHmacSha256 } from '../src/crypto/hmac.js';
import { 
  BravoDeliveryOrderPayload, 
  MisaInvoicePayload, 
  SapDeliveryOrderPayload 
} from '../src/types/models.js';

describe('ERP Ingestion & Entity Mapping', () => {
  const sharedSecret = 'test_secret_key_mekong_erp_2026';
  let receiver: WebhookReceiver;

  beforeEach(() => {
    receiver = new WebhookReceiver({
      sharedSecret,
      defaultLandingUrl: 'https://trace.gotrace.vn/resolve',
      defaultProvince: 'DT'
    });
  });

  test('ingests Bravo 8 Delivery Order and returns full traceability response', () => {
    const payload: BravoDeliveryOrderPayload = {
      event_id: 'EVT-ERP-DO-20260930-9921',
      erp_source: 'BRAVO_8',
      order_id: 'DO-20260930-0012',
      warehouse_gci: 'VN.DT.PLACE.WAREHOUSE.WH-COMAY-01',
      carrier_party_gci: 'VN.DT.PARTY.LOGISTICS.CH-SA-DEC-01',
      customer_party_gci: 'VN.SG.PARTY.BUYER.COOPMART',
      delivery_date: '2026-09-30',
      vehicle_plate: '66C-998.81',
      items: [
        {
          item_code: 'GAO-ST25-5KG',
          lot_number: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01',
          quantity: 1000,
          uom: 'BAG',
          gross_weight_kg: 5050.0,
          net_weight_kg: 5000.0,
          mfg_date: '2026-09-28',
          exp_date: '2027-09-28'
        }
      ],
      issued_by_accountant: 'Nguyễn Thị Mai',
      timestamp_utc: new Date().toISOString()
    };

    const rawBody = JSON.stringify(payload);
    const signature = `sha256=${generateHmacSha256(rawBody, sharedSecret)}`;

    const res = receiver.handleDeliveryOrder(rawBody, signature, payload as unknown as Record<string, unknown>);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.success, true);
    assert.ok(res.data, 'Expected response data');

    const data = res.data!;
    assert.match(data.traceabilityId, /^VN\.DT\.TRANSACTION\.CUSTODY_TRANSFER\.DO-20260930-0012$/);
    assert.ok(data.qrPayload.startsWith('https://trace.gotrace.vn/resolve?tx='));
    assert.ok(data.qrImageBase64.startsWith('data:image/png;base64,'));
    assert.ok(data.qrSvg.includes('<svg'));
    assert.ok(data.zplCode.includes('^XA') && data.zplCode.includes('^XZ'));
    assert.ok(data.generationLatencyMs < 30, `Latency must be < 30ms, got ${data.generationLatencyMs}ms`);

    // Verify extracted lots
    assert.strictEqual(data.extractedLots.length, 1);
    const lot = data.extractedLots[0];
    assert.strictEqual(lot.lot_id, 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01');
    assert.strictEqual(lot.quantity_net, 5000.0);
    assert.strictEqual(lot.uom, 'BAG');
    assert.strictEqual(lot.status, 'INSPECTED');

    // Verify mapped transaction
    const tx = data.transaction;
    assert.strictEqual(tx.transaction_type, 'CUSTODY_TRANSFER');
    assert.strictEqual(tx.status, 'EXECUTED');
    assert.strictEqual(tx.input_lots[0].lot_id, lot.lot_id);
    assert.strictEqual(tx.output_lots[0].lot_id, lot.lot_id);
  });

  test('ingests MISA AMIS E-Invoice and maps custody transfer transaction', () => {
    const payload: MisaInvoicePayload = {
      invoice_number: 'HD-0012894',
      invoice_series: '1C26TNB',
      erp_source: 'MISA_AMIS',
      issue_date: new Date().toISOString(),
      seller_tax_code: '1400123456',
      seller_name: 'Công ty Cổ phần Cỏ May',
      buyer_tax_code: '0300987654',
      buyer_name: 'Liên hiệp HTX Thương mại TP.HCM (Saigon Co.op)',
      total_amount_before_vat: 125000000.0,
      vat_rate_pct: 5.0,
      total_amount_vnd: 131250000.0,
      lots: [
        {
          lot_gci: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01',
          quantity: 5000.0,
          uom: 'KG',
          unit_price_vnd: 25000.0,
          exp_date: '2027-09-28'
        }
      ]
    };

    const rawBody = JSON.stringify(payload);
    const signature = generateHmacSha256(rawBody, sharedSecret);

    const res = receiver.handleEInvoice(rawBody, signature, payload as unknown as Record<string, unknown>);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.success, true);
    assert.ok(res.data);

    const data = res.data!;
    assert.match(data.traceabilityId, /^VN\.DT\.TRANSACTION\.CUSTODY_TRANSFER\.HD-0012894$/);
    assert.strictEqual(data.extractedLots.length, 1);
    assert.strictEqual(data.transaction.financial_value_vnd, 131250000.0);
    assert.strictEqual(data.transaction.seller_party_id, 'VN.DT.PARTY.ENTERPRISE.1400123456');
    assert.strictEqual(data.transaction.buyer_party_id, 'VN.SG.PARTY.BUYER.0300987654');
  });

  test('ingests SAP S/4HANA Delivery Order payload format', () => {
    const payload: SapDeliveryOrderPayload = {
      orderNumber: 'SAP-DO-889123',
      erpSource: 'SAP_S4HANA',
      partnerTaxId: '0300987654',
      warehouseCode: 'WH_SADEC_01',
      issueDate: '2026-09-30',
      lineItems: [
        {
          itemGci: 'VN.DT.ITEM.GRAIN.OM5451',
          lotGci: 'VN.DT.LOT.FINISHED.20260930-OM5451-01',
          quantity: 25000,
          unit: 'KG',
          expiryDate: '2027-09-30'
        }
      ],
      timestampUtc: new Date().toISOString()
    };

    const rawBody = JSON.stringify(payload);
    const signature = `sha256=${generateHmacSha256(rawBody, sharedSecret)}`;

    const res = receiver.handleDeliveryOrder(rawBody, signature, payload as unknown as Record<string, unknown>);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.success, true);
    assert.ok(res.data);
    assert.strictEqual(res.data!.extractedLots[0].lot_id, 'VN.DT.LOT.FINISHED.20260930-OM5451-01');
    assert.strictEqual(res.data!.extractedLots[0].quantity_net, 25000);
  });

  test('rejects delivery order with invalid HMAC signature with 401', () => {
    const payload: BravoDeliveryOrderPayload = {
      erp_source: 'BRAVO_8',
      order_id: 'DO-FORGED-01',
      delivery_date: '2026-09-30',
      items: [{ item_code: 'GAO', lot_number: 'L01', quantity: 100, uom: 'KG' }],
      timestamp_utc: new Date().toISOString()
    };

    const rawBody = JSON.stringify(payload);
    const fakeSignature = 'sha256=0000000000000000000000000000000000000000000000000000000000000000';

    const res = receiver.handleDeliveryOrder(rawBody, fakeSignature, payload as unknown as Record<string, unknown>);
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.success, false);
    assert.match(res.error!, /INVALID_SIGNATURE/);
  });

  test('handles duplicate delivery orders idempotently (returns cached result)', () => {
    const payload: BravoDeliveryOrderPayload = {
      erp_source: 'BRAVO_8',
      order_id: 'DO-IDEMPOTENT-001',
      delivery_date: '2026-09-30',
      items: [
        { item_code: 'GAO-OM5451', lot_number: '20260930-L01', quantity: 3000, uom: 'KG' }
      ],
      timestamp_utc: new Date().toISOString()
    };

    const rawBody = JSON.stringify(payload);
    const signature = `sha256=${generateHmacSha256(rawBody, sharedSecret)}`;

    // First call
    const firstRes = receiver.handleDeliveryOrder(rawBody, signature, payload as unknown as Record<string, unknown>);
    assert.strictEqual(firstRes.statusCode, 200);
    assert.strictEqual(firstRes.data?.isIdempotent, false);

    // Duplicate call with same order_id
    const secondRes = receiver.handleDeliveryOrder(rawBody, signature, payload as unknown as Record<string, unknown>);
    assert.strictEqual(secondRes.statusCode, 200);
    assert.strictEqual(secondRes.data?.isIdempotent, true);
    assert.strictEqual(secondRes.data?.traceabilityId, firstRes.data?.traceabilityId);
  });
});
