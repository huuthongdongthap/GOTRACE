import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_PLOT_GCI } from '../../src/fixtures/zalo_fixtures.ts';
import { mrvCalculator } from '@gotrace/zalo-mini-app';

interface AwdSession {
  plotGci: string;
  waterLevelCm: number;
  mode: 'FLOODING' | 'DRAINING';
  completedDryCycles: number;
  history: Array<{ timestamp: string; level: number; action: string }>;
}

function createAwdSession(): AwdSession {
  return {
    plotGci: MOCK_PLOT_GCI,
    waterLevelCm: 0,
    mode: 'FLOODING',
    completedDryCycles: 0,
    history: [],
  };
}

function recordDrain(session: AwdSession, levelCm: number): void {
  if (levelCm < -20 || levelCm > 10) {
    throw new Error('Water level out of physical tube range (-20cm to +10cm)');
  }
  session.waterLevelCm = levelCm;
  session.mode = 'DRAINING';
  if (levelCm <= -15) {
    session.completedDryCycles++;
  }
  session.history.push({
    timestamp: new Date().toISOString(),
    level: levelCm,
    action: 'DRAIN',
  });
}

function recordFlood(session: AwdSession, levelCm: number): void {
  session.waterLevelCm = levelCm;
  session.mode = 'FLOODING';
  session.history.push({
    timestamp: new Date().toISOString(),
    level: levelCm,
    action: 'FLOOD',
  });
}

describe('Tier 1: Feature 10 - Screen 2: AWD Water Level Logger', () => {
  it('F10-TC1: Initializes AWD session with default flooding state (0cm)', () => {
    const session = createAwdSession();
    assert.strictEqual(session.waterLevelCm, 0);
    assert.strictEqual(session.mode, 'FLOODING');
    assert.strictEqual(session.completedDryCycles, 0);
  });

  it('F10-TC2: Successfully records drain action to -15cm and increments dry cycle counter', () => {
    const session = createAwdSession();
    recordDrain(session, -15);
    assert.strictEqual(session.waterLevelCm, -15);
    assert.strictEqual(session.mode, 'DRAINING');
    assert.strictEqual(session.completedDryCycles, 1);
  });

  it('F10-TC3: Alternate wetting and drying: Flood back to +5cm preserves completed dry cycles', () => {
    const session = createAwdSession();
    recordDrain(session, -15);
    assert.strictEqual(session.completedDryCycles, 1);

    recordFlood(session, 5);
    assert.strictEqual(session.mode, 'FLOODING');
    assert.strictEqual(session.waterLevelCm, 5);
    assert.strictEqual(session.completedDryCycles, 1);
  });

  it('F10-TC4: Accumulates 3 complete dry cycles required for full 1Mha carbon credit', () => {
    const session = createAwdSession();
    for (let i = 0; i < 3; i++) {
      recordDrain(session, -15);
      recordFlood(session, 3);
    }
    assert.strictEqual(session.completedDryCycles, 3);
    assert.strictEqual(session.history.length, 6);

    const mrv = mrvCalculator.calculate({
      plotGci: session.plotGci,
      areaHa: 1.0,
      awdCycles: session.completedDryCycles,
      waterLevelMinCm: -15,
    });
    assert.strictEqual(mrv.totalEmissionReductionTCo2e, 3.35);
  });

  it('F10-TC5: Rejects unrealistic water level values outside physical tube limits', () => {
    const session = createAwdSession();
    assert.throws(() => recordDrain(session, -50), /out of physical tube range/);
  });
});
