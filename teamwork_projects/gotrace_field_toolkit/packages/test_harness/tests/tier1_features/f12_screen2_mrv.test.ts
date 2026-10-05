import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateAwdEmissionReduction } from '../../src/engines/mrv_carbon_engine.ts';
import { MOCK_PLOT_GCI } from '../../src/fixtures/zalo_fixtures.ts';

describe('Tier 1: Feature 12 - Screen 2: 1Mha MRV Carbon Engine', () => {
  it('F12-TC1: Accurately calculates standard reduction for 1.0 ha with 3 dry cycles (3.35 tCO2e)', () => {
    const result = calculateAwdEmissionReduction(MOCK_PLOT_GCI, 1.0, 3);
    assert.strictEqual(result.emissionReductionTCo2e, 3.35);
    assert.strictEqual(result.carbonCreditValueUsd, 67.0); // 3.35 * $20
  });

  it('F12-TC2: Scales linearly across larger cooperative plots (5.0 ha -> 16.75 tCO2e -> $335.00)', () => {
    const result = calculateAwdEmissionReduction(MOCK_PLOT_GCI, 5.0, 3);
    assert.strictEqual(result.emissionReductionTCo2e, 16.75);
    assert.strictEqual(result.carbonCreditValueUsd, 335.0);
  });

  it('F12-TC3: Computes partial reduction for 1 or 2 dry cycles according to proportional factor', () => {
    // 1 cycle out of 3 = 1/3 factor
    const res1 = calculateAwdEmissionReduction(MOCK_PLOT_GCI, 3.0, 1);
    assert.strictEqual(res1.emissionReductionTCo2e, 3.35); // 3 * 3.35 * (1/3) = 3.35

    // 2 cycles out of 3 = 2/3 factor
    const res2 = calculateAwdEmissionReduction(MOCK_PLOT_GCI, 3.0, 2);
    assert.strictEqual(res2.emissionReductionTCo2e, 6.7); // 3 * 3.35 * (2/3) = 6.7
  });

  it('F12-TC4: Returns 0 tCO2e reduction when 0 AWD dry cycles are recorded', () => {
    const result = calculateAwdEmissionReduction(MOCK_PLOT_GCI, 2.0, 0);
    assert.strictEqual(result.emissionReductionTCo2e, 0);
    assert.strictEqual(result.carbonCreditValueUsd, 0);
    assert.ok(result.formulaDescription.includes('0 AWD dry cycles'));
  });

  it('F12-TC5: Rejects invalid or negative plot hectare parameters', () => {
    assert.throws(() => calculateAwdEmissionReduction(MOCK_PLOT_GCI, -1.5, 3), /Hectares must be greater than 0/);
    assert.throws(() => calculateAwdEmissionReduction(MOCK_PLOT_GCI, 0, 3), /Hectares must be greater than 0/);
  });
});
