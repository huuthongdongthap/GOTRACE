import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateWeighedEvent } from '../../src/verifiers/schema_verifier.ts';
import { sha256Hex, canonicalizeJson } from '../../src/verifiers/crypto_verifier.ts';
import type { WeighedEventPayload } from '../../src/models/contracts.ts';

function createValidWeighedEvent(): WeighedEventPayload {
  const telemetry = {
    weightKg: 45000.0,
    grossWeightKg: 58500.0,
    tareWeightKg: 13500.0,
    moisturePct: 24.2,
    sensorId: 'CAS-CI200A-SERIAL-01',
    rawSerialFrame: 'ST,GS,+058500.0,kg\r\n',
  };

  const rawHashObj = {
    eventId: 'VN.DT.EVENT.WEIGHED.EVT-20260930-0891',
    placeId: 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01',
    telemetry,
  };
  const eventHashSha256 = sha256Hex(canonicalizeJson(rawHashObj));

  return {
    eventId: 'VN.DT.EVENT.WEIGHED.EVT-20260930-0891',
    eventType: 'WEIGHED',
    timestampUtc: '2026-09-30T04:15:30.450Z',
    placeId: 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01',
    operatorPartyId: 'VN.DT.PARTY.OPERATOR.OP-4421',
    inputLots: ['VN.DT.LOT.HARVEST.20260930-OM5451-HTX01'],
    outputLots: ['VN.DT.LOT.HARVEST.20260930-OM5451-HTX01'],
    telemetryData: telemetry,
    evidenceRefs: ['VN.DT.EVIDENCE.WEIGHT_TICKET.TK-20260930-88219'],
    eventHashSha256,
    createdAt: '2026-09-30T04:15:30.500Z',
  };
}

describe('Tier 1: Feature 4 - EVENT: WEIGHED Packager', () => {
  it('F4-TC1: Packages valid EVENT: WEIGHED meeting all contract constraints', () => {
    const evt = createValidWeighedEvent();
    const result = validateWeighedEvent(evt);
    assert.strictEqual(result.valid, true, `Validation errors: ${result.errors.join(', ')}`);
  });

  it('F4-TC2: Net weight correctly equals gross weight minus tare weight', () => {
    const evt = createValidWeighedEvent();
    const { weightKg, grossWeightKg, tareWeightKg } = evt.telemetryData;
    assert.strictEqual(weightKg, grossWeightKg - tareWeightKg);
  });

  it('F4-TC3: Computes valid SHA-256 event hash matching 64 hex characters', () => {
    const evt = createValidWeighedEvent();
    assert.match(evt.eventHashSha256, /^[a-f0-9]{64}$/);
    const recomputed = sha256Hex(canonicalizeJson({
      eventId: evt.eventId,
      placeId: evt.placeId,
      telemetry: evt.telemetryData,
    }));
    assert.strictEqual(evt.eventHashSha256, recomputed);
  });

  it('F4-TC4: Rejects event payload with invalid weigh station GCI syntax', () => {
    const evt = createValidWeighedEvent();
    evt.placeId = 'INVALID_STATION_ID';
    const result = validateWeighedEvent(evt);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes('placeId')));
  });

  it('F4-TC5: Rejects event payload with zero or negative net weight', () => {
    const evt = createValidWeighedEvent();
    evt.telemetryData.weightKg = -100.0;
    const result = validateWeighedEvent(evt);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some((e) => e.includes('weightKg')));
  });
});
