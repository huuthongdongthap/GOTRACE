import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateGciSyntax,
  parseGci,
  buildGci,
  toUrn,
  isValidWeighStationGci,
  isValidHarvestLotGci,
} from '../../src/verifiers/gci_verifier.ts';

describe('Tier 1: Feature 6 - GCI Identifier Assignment & Syntax', () => {
  it('F6-TC1: Builds and validates valid Weigh Station GCI', () => {
    const gci = buildGci({
      province: 'DT',
      primitive: 'PLACE',
      subtype: 'WEIGH_STATION',
      id: 'WS-COMAY-SADEC-01',
    });
    assert.strictEqual(gci, 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01');
    assert.strictEqual(isValidWeighStationGci(gci), true);
  });

  it('F6-TC2: Decomposes GCI into 5 hierarchical components', () => {
    const gci = 'VN.AG.LOT.HARVEST.20261012-ST25-HTX03';
    const comp = parseGci(gci);
    assert.strictEqual(comp.country, 'VN');
    assert.strictEqual(comp.province, 'AG');
    assert.strictEqual(comp.primitive, 'LOT');
    assert.strictEqual(comp.subtype, 'HARVEST');
    assert.strictEqual(comp.id, '20261012-ST25-HTX03');
    assert.strictEqual(isValidHarvestLotGci(gci), true);
  });

  it('F6-TC3: Converts canonical GCI to GS1 physical barcode URN format', () => {
    const gci = 'VN.DT.LOT.HARVEST.20260930-OM5451-TB01';
    const urn = toUrn(gci);
    assert.strictEqual(urn, 'GT:VN:LOT:HARVEST:20260930-OM5451-TB01');
  });

  it('F6-TC4: Rejects unknown province code (e.g. VN.XX.PLACE...)', () => {
    const invalidGci = 'VN.XX.PLACE.WEIGH_STATION.WS-01';
    const res = validateGciSyntax(invalidGci);
    assert.strictEqual(res.valid, false);
    assert.ok(res.error?.includes('INVALID_PROVINCE_CODE'));
  });

  it('F6-TC5: Rejects whitespace and forbidden special characters (#, $, %, space)', () => {
    const badGci1 = 'VN.DT.PLACE. WEIGH_STATION.01';
    const badGci2 = 'VN.DT.PLACE.WEIGH_STATION.01#';
    assert.strictEqual(validateGciSyntax(badGci1).valid, false);
    assert.strictEqual(validateGciSyntax(badGci2).valid, false);
  });
});
