import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  canonicalizeJson,
  sha256Hex,
  computeTicketHash,
  verifyTicketHash,
  signTicketHash,
  verifyTicketSignature,
} from '../src/crypto/jcs_hasher.ts';
import type { WeightTicketPayload, WeightTicketMetadata } from '../src/types/index.ts';

describe('GoTRACE Cryptographic JCS & SHA-256 Module', () => {
  it('should canonicalize JSON with sorted keys and no whitespace', () => {
    const unordered = {
      z: 1,
      a: 'test',
      m: [3, 2, 1],
      b: { y: true, x: false },
    };
    const canonical = canonicalizeJson(unordered);
    assert.strictEqual(canonical, '{"a":"test","b":{"x":false,"y":true},"m":[3,2,1],"z":1}');
  });

  it('should compute identical SHA-256 for differently ordered objects', () => {
    const obj1 = { ticketNumber: 'WT-001', grossKg: 45000, isStable: true };
    const obj2 = { isStable: true, ticketNumber: 'WT-001', grossKg: 45000 };

    const hash1 = sha256Hex(obj1);
    const hash2 = sha256Hex(obj2);

    assert.strictEqual(hash1, hash2);
    assert.strictEqual(hash1.length, 64);
  });

  it('should verify ticket hash and detect fraudulent tampering', () => {
    const metadata: WeightTicketMetadata = {
      ticketNumber: 'WT-20260930-01',
      vehiclePlate: '66C-123.45',
      scaleStationGci: 'VN.DT.PLACE.WEIGH_STATION.WS-SADEC-01',
      grossWeightKg: 45000.0,
      tareWeightKg: 15000.0,
      netWeightKg: 30000.0,
      isStable: true,
      scaleModel: 'CAS_CI200A',
      rawSerialString: 'ST,GS,+0045000.0,kg',
    };

    const genuineHash = computeTicketHash(metadata);

    const ticket: WeightTicketPayload = {
      evidenceId: 'VN.DT.EVIDENCE.WEIGHT_TICKET.TK-001',
      evidenceType: 'WEIGHT_TICKET',
      fileHashSha256: genuineHash,
      storageUri: 'https://storage.gotrace.vn/tickets/TK-001.json',
      capturedAt: '2026-09-30T04:15:30Z',
      issuerPartyId: 'VN.DT.PARTY.OPERATOR.OP-01',
      metadataJson: metadata,
      createdAt: '2026-09-30T04:15:30Z',
    };

    // 1. Genuine verification
    const validResult = verifyTicketHash(ticket);
    assert.strictEqual(validResult.valid, true);

    // 2. Tampered verification (driver modifies net weight by 1 kg)
    const tamperedTicket: WeightTicketPayload = {
      ...ticket,
      metadataJson: {
        ...metadata,
        netWeightKg: 30001.0, // Modified!
      },
    };
    const tamperedResult = verifyTicketHash(tamperedTicket);
    assert.strictEqual(tamperedResult.valid, false);
    assert.notStrictEqual(tamperedResult.calculatedHash, tamperedResult.expectedHash);
  });

  it('should sign and verify ticket attestation signature', () => {
    const hash = '4a5c9f8e71b2d3c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8';
    const secret = 'edge-bridge-secure-key-2026';

    const signature = signTicketHash(hash, secret);
    assert.strictEqual(signature.length, 64);

    const isValid = verifyTicketSignature(hash, signature, secret);
    assert.strictEqual(isValid, true);

    const isInvalid = verifyTicketSignature(hash, signature, 'wrong-secret');
    assert.strictEqual(isInvalid, false);
  });
});
