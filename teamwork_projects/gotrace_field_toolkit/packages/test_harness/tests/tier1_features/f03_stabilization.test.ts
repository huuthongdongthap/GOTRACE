import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { StabilizationEngine } from '../../src/engines/serial_protocol_engine.ts';
import type { RawWeightReading } from '../../src/models/contracts.ts';

function createMockReading(netKg: number, isStable: boolean): RawWeightReading {
  return {
    grossKg: netKg + 15000,
    tareKg: 15000,
    netKg,
    isStable,
    rawString: '',
    protocol: 'CAS',
    timestampMs: Date.now(),
  };
}

describe('Tier 1: Feature 3 - Stable Weight Detection Algorithm', () => {
  it('F3-TC1: Does not lock stable before sliding window reaches N=25 samples', () => {
    const engine = new StabilizationEngine(25, 5.0);
    for (let i = 0; i < 20; i++) {
      const res = engine.addReading(createMockReading(45000.0, true));
      assert.strictEqual(res.isStable, false);
      assert.strictEqual(res.stableWeightKg, null);
    }
  });

  it('F3-TC2: Successfully locks stable at 45,000kg when variance <= 5kg and flag is true', () => {
    const engine = new StabilizationEngine(25, 5.0);
    let finalResult = null;
    for (let i = 0; i < 25; i++) {
      const jitter = (i % 3) * 1.0; // 0, 1, 2 kg jitter
      finalResult = engine.addReading(createMockReading(45000.0 + jitter, true));
    }
    assert.ok(finalResult);
    assert.strictEqual(finalResult.isStable, true);
    assert.strictEqual(Math.round(finalResult.stableWeightKg!), 45001);
    assert.strictEqual(finalResult.durationSeconds, 2.5);
  });

  it('F3-TC3: Rejects stabilization when mechanical oscillation variance > 5kg', () => {
    const engine = new StabilizationEngine(25, 5.0);
    let finalResult = null;
    for (let i = 0; i < 25; i++) {
      const highJitter = (i % 2 === 0 ? 10.0 : -10.0); // 20kg variance
      finalResult = engine.addReading(createMockReading(45000.0 + highJitter, true));
    }
    assert.ok(finalResult);
    assert.strictEqual(finalResult.isStable, false);
    assert.strictEqual(finalResult.stableWeightKg, null);
    assert.ok(finalResult.varianceKg > 5.0);
  });

  it('F3-TC4: Rejects stabilization if hardware stable flag is false in window', () => {
    const engine = new StabilizationEngine(25, 5.0);
    let finalResult = null;
    for (let i = 0; i < 25; i++) {
      // 24 stable flags, but 1 unstable flag
      const hwFlag = i !== 12;
      finalResult = engine.addReading(createMockReading(45000.0, hwFlag));
    }
    assert.ok(finalResult);
    assert.strictEqual(finalResult.isStable, false);
  });

  it('F3-TC5: Anti-double-weighing hysteresis blocks second ticket until scale empties (<50kg)', () => {
    const engine = new StabilizationEngine(25, 5.0);
    // 1st weigh session
    for (let i = 0; i < 25; i++) {
      engine.addReading(createMockReading(45000.0, true));
    }
    // Attempt next reading while truck still on scale
    const reAttempt = engine.addReading(createMockReading(45000.0, true));
    assert.strictEqual(reAttempt.isStable, false, 'Should remain locked until cleared');

    // Scale empties (<50kg)
    engine.addReading(createMockReading(0.0, true));

    // Next truck arrives
    let nextResult = null;
    for (let i = 0; i < 25; i++) {
      nextResult = engine.addReading(createMockReading(42000.0, true));
    }
    assert.ok(nextResult);
    assert.strictEqual(nextResult.isStable, true);
    assert.strictEqual(nextResult.stableWeightKg, 42000.0);
  });
});
