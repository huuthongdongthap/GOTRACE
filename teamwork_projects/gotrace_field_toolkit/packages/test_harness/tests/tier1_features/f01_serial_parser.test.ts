import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseSerialFrame } from '../../src/engines/serial_protocol_engine.ts';
import { SERIAL_VECTORS } from '../../src/fixtures/weighbridge_fixtures.ts';

describe('Tier 1: Feature 1 - Multi-Protocol Serial Parser', () => {
  it('F1-TC1: Parses CAS CI-200A stable gross weight frame (58,500kg gross -> 45,000kg net)', () => {
    const reading = parseSerialFrame(SERIAL_VECTORS.CAS_STABLE_45000);
    assert.strictEqual(reading.protocol, 'CAS');
    assert.strictEqual(reading.grossKg, 58500.0);
    assert.strictEqual(reading.tareKg, 15000.0);
    assert.strictEqual(reading.netKg, 43500.0);
    assert.strictEqual(reading.isStable, true);
  });

  it('F1-TC2: Parses CAS CI-200A unstable frame and sets isStable to false', () => {
    const reading = parseSerialFrame(SERIAL_VECTORS.CAS_UNSTABLE_45000);
    assert.strictEqual(reading.protocol, 'CAS');
    assert.strictEqual(reading.isStable, false);
    assert.strictEqual(reading.grossKg, 58490.0);
  });

  it('F1-TC3: Parses Yaohua XK3190 standard frame (=045000\\r) with 45,000kg net', () => {
    const reading = parseSerialFrame(SERIAL_VECTORS.YAOHUA_STABLE_45000);
    assert.strictEqual(reading.protocol, 'YAOHUA');
    assert.strictEqual(reading.netKg, 45000.0);
    assert.strictEqual(reading.isStable, true);
  });

  it('F1-TC4: Parses Mettler Toledo SICS stable frame', () => {
    const reading = parseSerialFrame(SERIAL_VECTORS.TOLEDO_SICS_STABLE_45000);
    assert.strictEqual(reading.protocol, 'TOLEDO');
    assert.strictEqual(reading.netKg, 45000.0);
    assert.strictEqual(reading.isStable, true);
  });

  it('F1-TC5: Parses Mettler Toledo SICS unstable frame (S D)', () => {
    const reading = parseSerialFrame(SERIAL_VECTORS.TOLEDO_SICS_UNSTABLE_45000);
    assert.strictEqual(reading.protocol, 'TOLEDO');
    assert.strictEqual(reading.netKg, 44980.0);
    assert.strictEqual(reading.isStable, false);
  });
});
