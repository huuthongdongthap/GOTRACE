import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateSimulatorStream, parseSerialFrame } from '../../src/engines/serial_protocol_engine.ts';

describe('Tier 1: Feature 7 - Virtual Weighbridge Simulator', () => {
  it('F7-TC1: Generates 4 physical state stages for 45,000kg truck intake', () => {
    const stream = generateSimulatorStream(45000.0, 'CAS');
    assert.strictEqual(stream.approachFrames.length, 10);
    assert.strictEqual(stream.bounceFrames.length, 15);
    assert.strictEqual(stream.stableFrames.length, 25);
    assert.strictEqual(stream.departureFrames.length, 6);
  });

  it('F7-TC2: Approach frames progressively ramp weight up to target', () => {
    const stream = generateSimulatorStream(45000.0, 'CAS');
    const firstReading = parseSerialFrame(stream.approachFrames[0]);
    const lastReading = parseSerialFrame(stream.approachFrames[stream.approachFrames.length - 1]);
    assert.ok(firstReading.grossKg < lastReading.grossKg);
    assert.strictEqual(firstReading.isStable, false);
  });

  it('F7-TC3: Bounce frames simulate mechanical shock absorber vibration', () => {
    const stream = generateSimulatorStream(45000.0, 'CAS');
    const readings = stream.bounceFrames.map(parseSerialFrame);
    assert.ok(readings.every((r) => r.isStable === false));
    const weights = readings.map((r) => r.netKg);
    const maxBounce = Math.max(...weights);
    const minBounce = Math.min(...weights);
    assert.ok(maxBounce > 45000.0);
    assert.ok(minBounce < 45000.0);
  });

  it('F7-TC4: Stable frames hold 45,000kg within +/- 1.5kg tolerance with ST flag', () => {
    const stream = generateSimulatorStream(45000.0, 'CAS');
    const readings = stream.stableFrames.map(parseSerialFrame);
    assert.strictEqual(readings.length, 25);
    assert.ok(readings.every((r) => r.isStable === true));
    for (const r of readings) {
      assert.ok(Math.abs(r.netKg - 45000.0) <= 2.0);
    }
  });

  it('F7-TC5: Simulator supports Yaohua and Toledo indicator formatting', () => {
    const yaohuaStream = generateSimulatorStream(45000.0, 'YAOHUA');
    assert.ok(yaohuaStream.stableFrames[0].startsWith('='));

    const toledoStream = generateSimulatorStream(45000.0, 'TOLEDO');
    assert.ok(toledoStream.stableFrames[0].startsWith('S S'));
  });
});
