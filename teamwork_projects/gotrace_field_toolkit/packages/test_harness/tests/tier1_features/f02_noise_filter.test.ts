import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SerialRingBuffer } from '../../src/engines/serial_protocol_engine.ts';

describe('Tier 1: Feature 2 - Noise Filter & Jitter Rejection', () => {
  it('F2-TC1: Ring buffer writes and stores bytes accurately', () => {
    const ring = new SerialRingBuffer(128);
    ring.write('ST,GS,+045000.0,kg\r\n');
    assert.strictEqual(ring.getAvailableBytes(), 20);
    const frame = ring.readFrame();
    assert.strictEqual(frame, 'ST,GS,+045000.0,kg\r\n');
    assert.strictEqual(ring.getAvailableBytes(), 0);
  });

  it('F2-TC2: Filters out non-printable electrical motor noise bytes (< 0x20)', () => {
    const ring = new SerialRingBuffer(128);
    // Write corrupted string with 0x01, 0x05, 0x1B noise bytes
    const noisy = Buffer.from([0x01, 0x05, 0x53, 0x54, 0x1B, 0x0D, 0x0A]); // noise + 'ST' + noise + CRLF
    ring.write(noisy);
    const frame = ring.readFrame();
    assert.strictEqual(frame, 'ST\r\n');
  });

  it('F2-TC3: Correctly extracts CR-delimited frames for Yaohua indicators', () => {
    const ring = new SerialRingBuffer(64);
    ring.write('=045000\r=045000\r');
    const f1 = ring.readFrame();
    const f2 = ring.readFrame();
    assert.strictEqual(f1, '=045000\r');
    assert.strictEqual(f2, '=045000\r');
  });

  it('F2-TC4: Retains partial frames in buffer until closing delimiter arrives', () => {
    const ring = new SerialRingBuffer(64);
    ring.write('ST,GS,+0450');
    assert.strictEqual(ring.readFrame(), null); // Incomplete, no delimiter yet
    ring.write('00.0,kg\r\n');
    const frame = ring.readFrame();
    assert.strictEqual(frame, 'ST,GS,+045000.0,kg\r\n');
  });

  it('F2-TC5: Clears internal pointers on reset without memory leaks', () => {
    const ring = new SerialRingBuffer(64);
    ring.write('JUNK_DATA_WITHOUT_DELIMITER');
    assert.strictEqual(ring.getAvailableBytes() > 0, true);
    ring.clear();
    assert.strictEqual(ring.getAvailableBytes(), 0);
    assert.strictEqual(ring.readFrame(), null);
  });
});
