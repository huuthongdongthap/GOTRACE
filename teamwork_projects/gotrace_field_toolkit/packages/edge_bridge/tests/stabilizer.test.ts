import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { WeightStabilizer } from '../src/stabilizer/stable_detector.ts';
import type { RawWeightReading } from '../src/types/index.ts';

describe('Weight Stabilization Engine', () => {
  it('should reject unstable samples when variance exceeds 5 kg', () => {
    const stabilizer = new WeightStabilizer({
      windowSeconds: 2.5,
      sampleCount: 25,
      maxVarianceKg: 5.0,
      minWeightThresholdKg: 100.0,
      requireHardwareStability: true,
    });

    let stableEmitted = false;
    stabilizer.on('stableWeight', () => {
      stableEmitted = true;
    });

    const now = Date.now();
    // Feed 25 samples with high oscillation (44,900 to 45,200 kg)
    for (let i = 0; i < 25; i++) {
      const oscillatingWeight = 45000 + (i % 2 === 0 ? 150 : -150);
      const reading: RawWeightReading = {
        grossKg: oscillatingWeight,
        tareKg: 0,
        netKg: oscillatingWeight,
        isStable: true,
        rawString: `ST,GS,0,+ ${oscillatingWeight},kg\r\n`,
        protocol: 'CAS',
        timestampMs: now + i * 100,
      };
      stabilizer.addReading(reading);
    }

    assert.strictEqual(stableEmitted, false);
    assert.strictEqual(stabilizer.getState(), 'WEIGHING');
  });

  it('should reject samples when hardware stability flag is false (US header)', () => {
    const stabilizer = new WeightStabilizer({
      sampleCount: 25,
      maxVarianceKg: 5.0,
      minWeightThresholdKg: 100.0,
      requireHardwareStability: true,
    });

    let stableEmitted = false;
    stabilizer.on('stableWeight', () => {
      stableEmitted = true;
    });

    const now = Date.now();
    // Constant weight 45000 kg, but with US flag (in motion)
    for (let i = 0; i < 25; i++) {
      const reading: RawWeightReading = {
        grossKg: 45000,
        tareKg: 0,
        netKg: 45000,
        isStable: false, // Motion!
        rawString: 'US,GS,0,+ 45000.0,kg\r\n',
        protocol: 'CAS',
        timestampMs: now + i * 100,
      };
      stabilizer.addReading(reading);
    }

    assert.strictEqual(stableEmitted, false);
  });

  it('should detect stable weight when 25 samples meet variance <= 5kg and ST flag', () => {
    const stabilizer = new WeightStabilizer({
      windowSeconds: 2.5,
      sampleCount: 25,
      maxVarianceKg: 5.0,
      minWeightThresholdKg: 100.0,
      requireHardwareStability: true,
    });

    let stableResult: any = null;
    stabilizer.on('stableWeight', (res) => {
      stableResult = res;
    });

    const now = Date.now();
    // 25 samples hovering between 45000.0 and 45001.0 kg (variance < 1 kg)
    for (let i = 0; i < 25; i++) {
      const stableWeight = 45000.0 + (i % 3) * 0.5;
      const reading: RawWeightReading = {
        grossKg: stableWeight,
        tareKg: 15000.0,
        netKg: stableWeight - 15000.0,
        isStable: true,
        rawString: `ST,GS,0,+ ${stableWeight},kg\r\n`,
        protocol: 'CAS',
        timestampMs: now + i * 100,
      };
      stabilizer.addReading(reading);
    }

    assert.ok(stableResult);
    assert.strictEqual(stableResult.isStable, true);
    assert.ok(Math.abs(stableResult.stableWeightKg - 30000) <= 2);
    assert.strictEqual(stabilizer.getState(), 'STABLE_LOCKED');
  });

  it('should enforce anti-double-weighing hysteresis lock until truck departs', () => {
    const stabilizer = new WeightStabilizer({
      sampleCount: 25,
      maxVarianceKg: 5.0,
      minWeightThresholdKg: 100.0,
      hysteresisReleaseKg: 20.0,
      hysteresisDurationSeconds: 1.0,
    });

    let stableCount = 0;
    stabilizer.on('stableWeight', () => stableCount++);

    let scaleReleased = false;
    stabilizer.on('scaleReleased', () => {
      scaleReleased = true;
    });

    const now = Date.now();
    // 1. Lock on 45,000 kg
    for (let i = 0; i < 25; i++) {
      stabilizer.addReading({
        grossKg: 45000,
        tareKg: 0,
        netKg: 45000,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now + i * 100,
      });
    }
    assert.strictEqual(stableCount, 1);
    assert.strictEqual(stabilizer.getState(), 'STABLE_LOCKED');

    // 2. Additional 30 readings at 45,000 kg must NOT produce new ticket
    for (let i = 25; i < 55; i++) {
      stabilizer.addReading({
        grossKg: 45000,
        tareKg: 0,
        netKg: 45000,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now + i * 100,
      });
    }
    assert.strictEqual(stableCount, 1); // Still 1!

    // 3. Truck departs: weight drops to 0 kg
    for (let i = 55; i < 70; i++) {
      stabilizer.addReading({
        grossKg: 0,
        tareKg: 0,
        netKg: 0,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now + i * 100,
      });
    }

    assert.strictEqual(scaleReleased, true);
    assert.strictEqual(stabilizer.getState(), 'IDLE');
  });
});
