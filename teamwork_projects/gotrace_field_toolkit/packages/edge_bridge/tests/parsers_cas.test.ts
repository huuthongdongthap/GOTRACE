import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { CasParser } from '../src/parsers/cas.ts';

describe('CAS CI-200A Serial Parser', () => {
  it('should parse 5-field stable gross frame: ST,GS,0,+ 45000.0,kg', () => {
    const frame = 'ST,GS,0,+ 45000.0,kg\r\n';
    const reading = CasParser.parse(frame);

    assert.strictEqual(reading.protocol, 'CAS');
    assert.strictEqual(reading.grossKg, 45000.0);
    assert.strictEqual(reading.netKg, 45000.0);
    assert.strictEqual(reading.isStable, true);
    assert.strictEqual(reading.statusFlags?.motion, false);
    assert.strictEqual(reading.statusFlags?.overload, false);
    assert.strictEqual(reading.statusFlags?.unit, 'kg');
  });

  it('should parse 4-field stable frame: ST,GS,+0045000.0,kg', () => {
    const frame = 'ST,GS,+0045000.0,kg\r\n';
    const reading = CasParser.parse(frame);

    assert.strictEqual(reading.grossKg, 45000.0);
    assert.strictEqual(reading.isStable, true);
  });

  it('should detect unstable motion header: US,GS,0,+ 45210.0,kg', () => {
    const frame = 'US,GS,0,+ 45210.0,kg\r\n';
    const reading = CasParser.parse(frame);

    assert.strictEqual(reading.grossKg, 45210.0);
    assert.strictEqual(reading.isStable, false);
    assert.strictEqual(reading.statusFlags?.motion, true);
  });

  it('should detect overload header: OL,GS,0,+ 99999.0,kg', () => {
    const frame = 'OL,GS,0,+ 99999.0,kg\r\n';
    const reading = CasParser.parse(frame);

    assert.strictEqual(reading.isStable, false);
    assert.strictEqual(reading.statusFlags?.overload, true);
  });

  it('should accurately convert lb units to kg', () => {
    // 100,000 lb = 45,359.24 kg
    const frame = 'ST,GS,0,+100000.0,lb\r\n';
    const reading = CasParser.parse(frame);

    assert.strictEqual(reading.grossKg, 45359.24);
    assert.strictEqual(reading.statusFlags?.unit, 'lb');
  });

  it('should throw on invalid frame without delimiters', () => {
    assert.throws(() => CasParser.parse('CORRUPTED_SERIAL_LINE\r\n'));
  });
});
