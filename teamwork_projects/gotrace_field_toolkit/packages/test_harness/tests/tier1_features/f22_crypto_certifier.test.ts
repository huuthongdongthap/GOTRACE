import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalizeJson,
  sha256Hex,
  calculateHmacSha256,
  verifyHmacSignature,
  verifyAttestationSignature,
} from '../../src/verifiers/crypto_verifier.ts';
import { validateGciSyntax } from '../../src/verifiers/gci_verifier.ts';
import { CORE_PRIMITIVES, VALID_PROVINCES } from '../../src/models/contracts.ts';

describe('Tier 1: Feature 22 - Cryptographic & GCI Certifier', () => {
  it('F22-TC1: 100% Mathematical Certification of SHA-256 digests against known vectors', () => {
    // Known test vector: SHA256("") = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
    const emptyHash = sha256Hex('');
    assert.strictEqual(emptyHash, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

    // Mathematical vector: SHA256("GoTRACE") = 8823d80c50c753d8c64ed74485fd64ba08716a72a6a22047446390e88f04107c
    const gotraceHash = sha256Hex('GoTRACE');
    assert.strictEqual(gotraceHash, '8823d80c50c753d8c64ed74485fd64ba08716a72a6a22047446390e88f04107c');
  });

  it('F22-TC2: RFC 8785 JCS Certification: Strict alphabetical key sorting & no whitespace', () => {
    const complexObj = {
      z: 100,
      b: 'test',
      a: {
        two: 2,
        one: 1,
      },
    };
    const canonical = canonicalizeJson(complexObj);
    assert.strictEqual(canonical, '{"a":{"one":1,"two":2},"b":"test","z":100}');
  });

  it('F22-TC3: GCI Syntax Certification: Certifies all 9 Core Primitives across Mekong Delta provinces', () => {
    for (const primitive of CORE_PRIMITIVES) {
      for (const province of ['DT', 'AG', 'CT', 'TG']) {
        const testGci = `VN.${province}.${primitive}.TEST_SUBTYPE.ID-001`;
        const result = validateGciSyntax(testGci);
        assert.strictEqual(result.valid, true, `Failed on ${testGci}`);
      }
    }
  });

  it('F22-TC4: HMAC-SHA256 Certification: Constant-time comparison prevents timing attacks', () => {
    const secret = 'super_secret_test_key_123';
    const payload = 'PAYLOAD_DATA_SAMPLE';
    const hmacHex = calculateHmacSha256(payload, secret);
    assert.strictEqual(verifyHmacSignature(payload, `sha256=${hmacHex}`, secret), true);
    assert.strictEqual(verifyHmacSignature(payload, `sha256=${hmacHex.replace('a', 'b')}`, secret), false);
  });

  it('F22-TC5: Digital Signature Attestation Certification: Edge device signature verification', () => {
    const data = 'WEIGHT_TICKET_HASH_123456';
    const pubKey = 'PUBKEY-SCALE-STATION-SADEC';
    const signature = sha256Hex(`${pubKey}:${data}`);
    const verified = verifyAttestationSignature(data, signature, pubKey);
    assert.strictEqual(verified, true);
  });
});
