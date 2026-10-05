import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  canonicalizeJson,
  sha256Hex,
  verifyWeightTicketHash,
  verifyAttestationSignature,
} from '../../src/verifiers/crypto_verifier.ts';
import { validateWeightTicket } from '../../src/verifiers/schema_verifier.ts';
import type { WeightTicketPayload, WeightTicketMetadata } from '../../src/models/contracts.ts';

function createMockTicket(): WeightTicketPayload {
  const metadataJson: WeightTicketMetadata = {
    ticketNumber: 'TK-20260930-88219',
    vehiclePlate: '66C-123.45',
    driverName: 'Tran Van Nam',
    scaleStationGci: 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01',
    supplierPartyGci: 'VN.DT.PARTY.COOP.HTX-THANGLOI',
    commodityItemGci: 'VN.DT.ITEM.GRAIN.OM5451',
    harvestLotGci: 'VN.DT.LOT.HARVEST.20260930-OM5451-TB01',
    grossWeightKg: 58500.0,
    tareWeightKg: 13500.0,
    netWeightKg: 45000.0,
    moisturePct: 24.2,
    temperatureAmbientC: 31.5,
    isStable: true,
    scaleModel: 'CAS_CI200A',
    rawSerialString: 'ST,GS,+058500.0,kg\r\n',
  };

  const fileHashSha256 = sha256Hex(canonicalizeJson(metadataJson));
  const digitalSignature = sha256Hex(`PUBKEY-STATION-01:${fileHashSha256}`);

  return {
    evidenceId: 'VN.DT.EVIDENCE.WEIGHT_TICKET.TK-20260930-88219',
    evidenceType: 'WEIGHT_TICKET',
    fileHashSha256,
    storageUri: 'https://storage.gotrace.vn/tickets/2026/09/TK-20260930-88219.json',
    capturedAt: '2026-09-30T04:15:30.450Z',
    issuerPartyId: 'VN.DT.PARTY.OPERATOR.OP-4421',
    metadataJson,
    digitalSignature,
    createdAt: '2026-09-30T04:15:30.500Z',
  };
}

describe('Tier 1: Feature 5 - EVIDENCE: WEIGHT_TICKET & SHA-256 Hashing', () => {
  it('F5-TC1: RFC 8785 canonicalization guarantees key sorting and zero extraneous spacing', () => {
    const rawObj = { z_last: 1, a_first: 'hello', m_mid: { d: 4, b: 2 } };
    const canonical = canonicalizeJson(rawObj);
    assert.strictEqual(canonical, '{"a_first":"hello","m_mid":{"b":2,"d":4},"z_last":1}');
  });

  it('F5-TC2: Calculates deterministic SHA-256 hash across identical payloads regardless of original property order', () => {
    const objA = { gross: 58500, net: 45000, plate: '66C-123.45' };
    const objB = { plate: '66C-123.45', net: 45000, gross: 58500 };
    const hashA = sha256Hex(canonicalizeJson(objA));
    const hashB = sha256Hex(canonicalizeJson(objB));
    assert.strictEqual(hashA, hashB);
  });

  it('F5-TC3: Verifies 100% hash integrity of valid Weight Ticket', () => {
    const ticket = createMockTicket();
    const verification = verifyWeightTicketHash(ticket);
    assert.strictEqual(verification.valid, true);
    assert.strictEqual(verification.calculatedHash, ticket.fileHashSha256);
  });

  it('F5-TC4: Tamper Detection: Altering net weight by 1 kg flags integrity violation', () => {
    const ticket = createMockTicket();
    // Tamper with net weight in database
    ticket.metadataJson.netWeightKg = 45001.0;
    const verification = verifyWeightTicketHash(ticket);
    assert.strictEqual(verification.valid, false, 'Tampered weight ticket must fail hash verification');
    assert.notStrictEqual(verification.calculatedHash, ticket.fileHashSha256);
  });

  it('F5-TC5: Validates digital signature attestation and schema compliance', () => {
    const ticket = createMockTicket();
    const schemaCheck = validateWeightTicket(ticket);
    assert.strictEqual(schemaCheck.valid, true);

    const sigCheck = verifyAttestationSignature(
      ticket.fileHashSha256,
      ticket.digitalSignature!,
      'PUBKEY-STATION-01'
    );
    assert.strictEqual(sigCheck, true);
  });
});
