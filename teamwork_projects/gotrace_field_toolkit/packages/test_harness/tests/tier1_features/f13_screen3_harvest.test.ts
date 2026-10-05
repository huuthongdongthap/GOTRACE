import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_HARVEST_LOT_PAYLOAD } from '../../src/fixtures/zalo_fixtures.ts';
import { validateHarvestLot } from '../../src/verifiers/schema_verifier.ts';
import { isValidHarvestLotGci } from '../../src/verifiers/gci_verifier.ts';
import type { HarvestLotPayload } from '../../src/models/contracts.ts';

describe('Tier 1: Feature 13 - Screen 3: Harvest Request & HarvestLot', () => {
  it('F13-TC1: Successfully generates LOT: HarvestLot with valid GCI format', () => {
    assert.strictEqual(isValidHarvestLotGci(MOCK_HARVEST_LOT_PAYLOAD.lotId), true);
    assert.ok(MOCK_HARVEST_LOT_PAYLOAD.lotId.startsWith('VN.DT.LOT.HARVEST.'));
  });

  it('F13-TC2: Validates contract schema of mock harvest lot payload', () => {
    const result = validateHarvestLot(MOCK_HARVEST_LOT_PAYLOAD);
    assert.strictEqual(result.valid, true, `Validation errors: ${result.errors.join(', ')}`);
  });

  it('F13-TC3: Validates estimated yield is positive (45,000 kg for 6.5 ha paddy plot)', () => {
    assert.strictEqual(MOCK_HARVEST_LOT_PAYLOAD.estimatedYieldKg, 45000.0);
    assert.ok(MOCK_HARVEST_LOT_PAYLOAD.estimatedYieldKg > 0);
  });

  it('F13-TC4: Advances status machine: REQUESTED -> CUTTING -> WEIGHED -> RECEIVED_AT_MILL', () => {
    const lot: HarvestLotPayload = { ...MOCK_HARVEST_LOT_PAYLOAD };
    assert.strictEqual(lot.status, 'REQUESTED');

    lot.status = 'CUTTING';
    assert.strictEqual(validateHarvestLot(lot).valid, true);

    lot.status = 'WEIGHED';
    assert.strictEqual(validateHarvestLot(lot).valid, true);

    lot.status = 'RECEIVED_AT_MILL';
    assert.strictEqual(validateHarvestLot(lot).valid, true);
  });

  it('F13-TC5: Rejects harvest lot with zero or negative estimated yield', () => {
    const invalidLot: HarvestLotPayload = { ...MOCK_HARVEST_LOT_PAYLOAD, estimatedYieldKg: -50 };
    const res = validateHarvestLot(invalidLot);
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some((e) => e.includes('estimatedYieldKg')));
  });
});
