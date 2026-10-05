/**
 * Test Suite: HMAC-SHA256 Webhook Authentication & Integrity
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { generateHmacSha256, verifyHmacSha256 } from '../src/crypto/hmac.js';

describe('HMAC-SHA256 Verification & Security', () => {
  const secretKey = 'sec_mekong_test_shared_key_2026';
  const samplePayload = JSON.stringify({
    order_id: 'DO-20260930-0012',
    erp_source: 'BRAVO_8',
    delivery_date: '2026-09-30',
    quantity_kg: 5000
  });

  test('generateHmacSha256 produces 64-hex SHA-256 digest', () => {
    const sig = generateHmacSha256(samplePayload, secretKey);
    assert.strictEqual(typeof sig, 'string');
    assert.strictEqual(sig.length, 64);
    assert.match(sig, /^[a-f0-9]{64}$/);
  });

  test('verifies valid signature with sha256= prefix', () => {
    const rawSig = generateHmacSha256(samplePayload, secretKey);
    const header = `sha256=${rawSig}`;
    const result = verifyHmacSha256(samplePayload, header, secretKey);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.code, 'OK');
  });

  test('verifies valid signature without prefix (raw hex)', () => {
    const rawSig = generateHmacSha256(samplePayload, secretKey);
    const result = verifyHmacSha256(samplePayload, rawSig, secretKey);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.code, 'OK');
  });

  test('rejects tampered payload (even single byte change)', () => {
    const rawSig = generateHmacSha256(samplePayload, secretKey);
    const tamperedPayload = JSON.stringify({
      order_id: 'DO-20260930-0012',
      erp_source: 'BRAVO_8',
      delivery_date: '2026-09-30',
      quantity_kg: 5001 // Tampered 5000 -> 5001
    });

    const result = verifyHmacSha256(tamperedPayload, `sha256=${rawSig}`, secretKey);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.code, 'INVALID_SIGNATURE');
  });

  test('rejects incorrect secret key', () => {
    const rawSig = generateHmacSha256(samplePayload, 'wrong_secret_key');
    const result = verifyHmacSha256(samplePayload, `sha256=${rawSig}`, secretKey);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.code, 'INVALID_SIGNATURE');
  });

  test('rejects missing or empty signature header', () => {
    const res1 = verifyHmacSha256(samplePayload, undefined, secretKey);
    assert.strictEqual(res1.valid, false);
    assert.strictEqual(res1.code, 'MISSING_SIGNATURE');

    const res2 = verifyHmacSha256(samplePayload, '', secretKey);
    assert.strictEqual(res2.valid, false);
    assert.strictEqual(res2.code, 'MISSING_SIGNATURE');
  });

  test('rejects malformed signature header format', () => {
    const result = verifyHmacSha256(samplePayload, 'sha256=not-a-valid-hex-digest', secretKey);
    assert.strictEqual(result.valid, false);
    assert.strictEqual(result.code, 'MALFORMED_HEADER');
  });

  test('enforces replay protection timestamp validation', () => {
    const rawSig = generateHmacSha256(samplePayload, secretKey);
    const recentTimestamp = new Date().toISOString();
    const oldTimestamp = new Date(Date.now() - 400 * 1000).toISOString(); // 400s ago (> 300s max skew)

    // Recent timestamp passes
    const passRes = verifyHmacSha256(samplePayload, rawSig, secretKey, {
      maxClockSkewSeconds: 300,
      timestamp: recentTimestamp
    });
    assert.strictEqual(passRes.valid, true);

    // Old timestamp rejected
    const failRes = verifyHmacSha256(samplePayload, rawSig, secretKey, {
      maxClockSkewSeconds: 300,
      timestamp: oldTimestamp
    });
    assert.strictEqual(failRes.valid, false);
    assert.strictEqual(failRes.code, 'TIMESTAMP_EXPIRED');
  });
});
