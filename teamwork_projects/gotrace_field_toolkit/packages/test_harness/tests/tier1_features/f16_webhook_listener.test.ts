import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateHmacSha256 as calculateHmacSha256,
  verifyHmacSha256 as verifyHmacSignature,
  WebhookReceiver,
} from '@gotrace/erp_connector';
import {
  MOCK_HMAC_SECRET,
  MOCK_DELIVERY_ORDER,
  MOCK_EXPIRED_DO,
} from '../../src/fixtures/erp_fixtures.ts';
import { WebhookIdempotencyStore } from '../../src/engines/erp_label_engine.ts';

function processWebhookRequest(
  body: object,
  sigHeader: string,
  secret: string,
  store: WebhookIdempotencyStore
): { status: number; body: Record<string, unknown> } {
  const bodyStr = JSON.stringify(body);
  const sigCheck = verifyHmacSignature(bodyStr, sigHeader, secret);
  if (!sigCheck.valid) {
    return { status: 401, body: { error: 'HMAC_SIGNATURE_MISMATCH' } };
  }

  const payload = body as { orderId: string; timestampUtc: string };
  const reqTimeMs = new Date(payload.timestampUtc).getTime();
  const nowMs = Date.now();
  if (Math.abs(nowMs - reqTimeMs) > 300_000) {
    return { status: 400, body: { error: 'REPLAY_ATTACK_DETECTED' } };
  }

  // Idempotency check
  if (store.has(payload.orderId)) {
    return { status: 200, body: store.get(payload.orderId) as Record<string, unknown> };
  }

  const response = {
    message: 'SUCCESS',
    orderId: payload.orderId,
    gciTransaction: `VN.DT.TRANSACTION.CUSTODY_TRANSFER.${payload.orderId}`,
  };
  store.set(payload.orderId, response);
  return { status: 200, body: response };
}

describe('Tier 1: Feature 16 - DO & Invoice Webhook Ingestion (HMAC-SHA256)', () => {
  it('F16-TC1: Successfully authenticates valid Delivery Order with genuine HMAC-SHA256 signature', () => {
    const store = new WebhookIdempotencyStore();
    const bodyStr = JSON.stringify(MOCK_DELIVERY_ORDER);
    const signature = `sha256=${calculateHmacSha256(bodyStr, MOCK_HMAC_SECRET)}`;

    const response = processWebhookRequest(MOCK_DELIVERY_ORDER, signature, MOCK_HMAC_SECRET, store);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'SUCCESS');
  });

  it('F16-TC2: Rejects webhook when body has been tampered (returns 401 HMAC_SIGNATURE_MISMATCH)', () => {
    const store = new WebhookIdempotencyStore();
    const originalBodyStr = JSON.stringify(MOCK_DELIVERY_ORDER);
    const signature = `sha256=${calculateHmacSha256(originalBodyStr, MOCK_HMAC_SECRET)}`;

    // Tamper with orderId
    const tampered = { ...MOCK_DELIVERY_ORDER, orderId: 'DO-TAMPERED-9999' };
    const response = processWebhookRequest(tampered, signature, MOCK_HMAC_SECRET, store);
    assert.strictEqual(response.status, 401);
    assert.strictEqual(response.body.error, 'HMAC_SIGNATURE_MISMATCH');
  });

  it('F16-TC3: Replay Attack: Rejects webhook payload with timestamp older than 300 seconds', () => {
    const store = new WebhookIdempotencyStore();
    const bodyStr = JSON.stringify(MOCK_EXPIRED_DO);
    const signature = `sha256=${calculateHmacSha256(bodyStr, MOCK_HMAC_SECRET)}`;

    const response = processWebhookRequest(MOCK_EXPIRED_DO, signature, MOCK_HMAC_SECRET, store);
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, 'REPLAY_ATTACK_DETECTED');
  });

  it('F16-TC4: Idempotency: Duplicate delivery returns identical cached result without re-processing', () => {
    const store = new WebhookIdempotencyStore();
    const bodyStr = JSON.stringify(MOCK_DELIVERY_ORDER);
    const signature = `sha256=${calculateHmacSha256(bodyStr, MOCK_HMAC_SECRET)}`;

    const res1 = processWebhookRequest(MOCK_DELIVERY_ORDER, signature, MOCK_HMAC_SECRET, store);
    const res2 = processWebhookRequest(MOCK_DELIVERY_ORDER, signature, MOCK_HMAC_SECRET, store);
    assert.strictEqual(res1.status, 200);
    assert.strictEqual(res2.status, 200);
    assert.deepStrictEqual(res1.body, res2.body);
  });

  it('F16-TC5: Successfully verifies HMAC signature formatted without sha256= prefix', () => {
    const store = new WebhookIdempotencyStore();
    const bodyStr = JSON.stringify(MOCK_DELIVERY_ORDER);
    const rawHex = calculateHmacSha256(bodyStr, MOCK_HMAC_SECRET);

    const response = processWebhookRequest(MOCK_DELIVERY_ORDER, rawHex, MOCK_HMAC_SECRET, store);
    assert.strictEqual(response.status, 200);
  });
});
