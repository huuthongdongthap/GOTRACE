import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  validateGci,
  parseGci,
  buildGci,
  buildWeighStationGci,
  isValidWeighStationGci,
  buildWeightTicketGci,
  isValidWeightTicketGci,
  buildWeighedEventGci,
  isValidWeighedEventGci,
  toUrn,
} from '../src/gci/index.ts';

describe('GoTRACE GCI Identifier Generator & Validator', () => {
  it('should validate standard weigh station GCI', () => {
    const validGci = 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01';
    const result = validateGci(validGci);
    assert.strictEqual(result.valid, true);
    assert.ok(result.components);
    assert.strictEqual(result.components.country, 'VN');
    assert.strictEqual(result.components.province, 'DT');
    assert.strictEqual(result.components.primitive, 'PLACE');
    assert.strictEqual(result.components.subtype, 'WEIGH_STATION');
    assert.strictEqual(result.components.id, 'WS-COMAY-SADEC-01');
    assert.strictEqual(isValidWeighStationGci(validGci), true);
  });

  it('should validate standard weight ticket evidence GCI', () => {
    const ticketGci = 'VN.DT.EVIDENCE.WEIGHT_TICKET.TK-20260930-88219';
    const result = validateGci(ticketGci);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(isValidWeightTicketGci(ticketGci), true);
  });

  it('should validate weighed event GCI', () => {
    const eventGci = 'VN.CT.EVENT.WEIGHED.EVT-20260930-001';
    const result = validateGci(eventGci);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(isValidWeighedEventGci(eventGci), true);
  });

  it('should reject invalid province codes', () => {
    const badProvince = 'VN.XX.PLACE.WEIGH_STATION.WS-01';
    const result = validateGci(badProvince);
    assert.strictEqual(result.valid, false);
    assert.ok(result.error?.includes('INVALID_PROVINCE_CODE'));
  });

  it('should reject GCIs containing spaces or illegal characters', () => {
    const spaceGci = 'VN.DT.PLACE. WEIGH_STATION.01';
    const specialCharGci = 'VN.DT.PLACE.WEIGH_STATION.01#';
    assert.strictEqual(validateGci(spaceGci).valid, false);
    assert.strictEqual(validateGci(specialCharGci).valid, false);
  });

  it('should build weigh station GCI from components', () => {
    const gci = buildWeighStationGci('DT', 'WS-LOCTROI-01');
    assert.strictEqual(gci, 'VN.DT.PLACE.WEIGH_STATION.WS-LOCTROI-01');
    assert.strictEqual(isValidWeighStationGci(gci), true);
  });

  it('should build weight ticket GCI from components', () => {
    const gci = buildWeightTicketGci('TG', 'TK-99128');
    assert.strictEqual(gci, 'VN.TG.EVIDENCE.WEIGHT_TICKET.TK-99128');
    assert.strictEqual(isValidWeightTicketGci(gci), true);
  });

  it('should build weighed event GCI from components', () => {
    const gci = buildWeighedEventGci('AG', 'EVT-1002');
    assert.strictEqual(gci, 'VN.AG.EVENT.WEIGHED.EVT-1002');
    assert.strictEqual(isValidWeighedEventGci(gci), true);
  });

  it('should map GCI to URN format', () => {
    const gci = 'VN.DT.PLACE.WEIGH_STATION.WS-01';
    const urn = toUrn(gci);
    assert.strictEqual(urn, 'GT:VN:PLACE:WEIGH_STATION:WS-01');
  });

  it('should throw on parseGci with invalid input', () => {
    assert.throws(() => parseGci('INVALID_GCI_STRING'));
  });
});
