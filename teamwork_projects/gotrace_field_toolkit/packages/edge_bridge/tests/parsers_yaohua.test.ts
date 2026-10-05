import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { YaohuaParser } from '../src/parsers/yaohua.ts';

describe('Yaohua XK3190 Serial Parser', () => {
  it('should parse 12-byte reverse frame (=000054+0\\r) as 45000 kg stable', () => {
    // Digits: 000054 reversed -> 450000. With decimal flag '1' (dec 1) -> 45000.0 kg
    // Or digits 000540 reversed -> 045000 (45000 kg with dec 0)
    // In our parser: = D0 D1 D2 D3 D4 D5 [Sign] [Dec] [Status]
    // If digits raw is '000054', reversed is '450000'. With dec 1 -> 45000 kg.
    const frame = '=000054+10\r';
    const reading = YaohuaParser.parse(frame);

    assert.strictEqual(reading.protocol, 'YAOHUA');
    assert.strictEqual(reading.netKg, 45000);
    assert.strictEqual(reading.isStable, true);
  });

  it('should parse direct digits frame (=+045000\\r) as 45000 kg stable', () => {
    const frame = '=000540+00\r'; // '000540' reversed -> '045000' = 45000 with dec 0
    const reading = YaohuaParser.parse(frame);

    assert.strictEqual(reading.netKg, 45000);
    assert.strictEqual(reading.isStable, true);
  });

  it('should parse sign-first frame: =+045000010\\r', () => {
    // Byte 0: '=', Byte 1: '+', Bytes 2-7: '045000', Byte 8: '0' (dec), Byte 9: '0' (stable)
    const frame = '=+' + '045000' + '0' + '0' + '\r';
    const reading = YaohuaParser.parse(frame);

    assert.strictEqual(reading.netKg, 45000);
    assert.strictEqual(reading.isStable, true);
  });

  it('should detect motion status flag (status byte = 1)', () => {
    const frame = '=+' + '045120' + '0' + '1' + '\r';
    const reading = YaohuaParser.parse(frame);

    assert.strictEqual(reading.netKg, 45120);
    assert.strictEqual(reading.isStable, false);
    assert.strictEqual(reading.statusFlags?.motion, true);
  });

  it('should verify XOR checksum (BCC)', () => {
    const buf = Buffer.alloc(12);
    buf[0] = 0x3d; // '='
    buf[1] = 0x2b; // '+'
    buf.write('045000', 2, 6, 'ascii');
    buf[8] = 0x30; // dec 0
    buf[9] = 0x30; // stable

    let xor = 0;
    for (let i = 0; i < 10; i++) {
      xor ^= buf[i];
    }
    buf[10] = xor;
    buf[11] = 0x0d;

    const isValidBcc = YaohuaParser.verifyXorChecksum(buf, 10);
    assert.strictEqual(isValidBcc, true);

    const reading = YaohuaParser.parse(buf);
    assert.strictEqual(reading.netKg, 45000);
    assert.strictEqual(reading.isStable, true);
  });

  it('should throw on invalid start byte', () => {
    assert.throws(() => YaohuaParser.parse('X+045000\r\n'));
  });
});
