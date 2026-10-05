import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { ToledoParser } from '../src/parsers/toledo.ts';

describe('Mettler Toledo IND570 Parser', () => {
  it('should parse valid 18-byte continuous frame (Gross 45000 kg, Tare 15000 kg, Stable)', () => {
    const buf = Buffer.alloc(18);
    buf[0] = 0x02; // STX
    buf[1] = 0x04; // Status A: Decimal 4 (no divisor)
    buf[2] = 0x10; // Status B: Bit 4 = kg (0x10), Bit 3 = 0 (stable), Bit 0 = 0 (gross)
    buf[3] = 0x00; // Status C
    buf.write(' 45000', 4, 6, 'ascii'); // Gross: 45000
    buf.write(' 15000', 10, 6, 'ascii'); // Tare: 15000
    buf[16] = 0x0d; // CR
    buf[17] = 0x0a; // LF

    const reading = ToledoParser.parse(buf);
    assert.strictEqual(reading.protocol, 'TOLEDO');
    assert.strictEqual(reading.grossKg, 45000);
    assert.strictEqual(reading.tareKg, 15000);
    assert.strictEqual(reading.netKg, 30000);
    assert.strictEqual(reading.isStable, true);
  });

  it('should detect motion / unstable flag in Status Word B (Bit 3 = 1)', () => {
    const buf = Buffer.alloc(18);
    buf[0] = 0x02;
    buf[1] = 0x04;
    buf[2] = 0x18; // 0x10 (kg) | 0x08 (motion)
    buf[3] = 0x00;
    buf.write(' 45120', 4, 6, 'ascii');
    buf.write(' 15000', 10, 6, 'ascii');
    buf[16] = 0x0d;
    buf[17] = 0x0a;

    const reading = ToledoParser.parse(buf);
    assert.strictEqual(reading.isStable, false);
    assert.strictEqual(reading.statusFlags?.motion, true);
  });

  it('should detect overload flag in Status Word B (Bit 2 = 1)', () => {
    const buf = Buffer.alloc(18);
    buf[0] = 0x02;
    buf[1] = 0x04;
    buf[2] = 0x14; // 0x10 (kg) | 0x04 (overload)
    buf[3] = 0x00;
    buf.write(' 99999', 4, 6, 'ascii');
    buf.write(' 00000', 10, 6, 'ascii');
    buf[16] = 0x0d;
    buf[17] = 0x0a;

    const reading = ToledoParser.parse(buf);
    assert.strictEqual(reading.isStable, false);
    assert.strictEqual(reading.statusFlags?.overload, true);
  });

  it('should parse SICS protocol string (Stable Gross 45000 kg)', () => {
    const sicsStr = 'S S      45000.0 kg\r\n';
    const reading = ToledoParser.parse(sicsStr);
    assert.strictEqual(reading.protocol, 'TOLEDO');
    assert.strictEqual(reading.grossKg, 45000.0);
    assert.strictEqual(reading.netKg, 45000.0);
    assert.strictEqual(reading.isStable, true);
  });

  it('should parse SICS protocol string (Dynamic/Unstable 45000 kg)', () => {
    const sicsStr = 'S D      45000.0 kg\r\n';
    const reading = ToledoParser.parse(sicsStr);
    assert.strictEqual(reading.isStable, false);
    assert.strictEqual(reading.statusFlags?.motion, true);
  });

  it('should throw on malformed Toledo continuous frame', () => {
    const shortBuf = Buffer.from([0x02, 0x04, 0x10]);
    assert.throws(() => ToledoParser.parseContinuousFrame(shortBuf));
  });
});
