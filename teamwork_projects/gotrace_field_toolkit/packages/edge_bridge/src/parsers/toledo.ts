/**
 * Mettler Toledo Serial Stream Parser (IND570 / 8142 / SICS)
 * Supports 18-byte continuous output format and SICS command-response strings.
 */

import type { RawWeightReading } from '../types/index.ts';

export class ToledoParser {
  /**
   * Checks if the given buffer or string is a Toledo frame.
   */
  public static isToledoFrame(data: Buffer | string): boolean {
    if (Buffer.isBuffer(data)) {
      if (data.length === 18 && data[0] === 0x02 && data[16] === 0x0d && data[17] === 0x0a) {
        return true;
      }
      const str = data.toString('ascii');
      return str.startsWith('S S ') || str.startsWith('S D ');
    }
    const str = data.trim();
    return str.startsWith('S S ') || str.startsWith('S D ') || (data.length === 18 && data.charCodeAt(0) === 0x02);
  }

  /**
   * Parses an 18-byte continuous Toledo IND570 frame.
   * Format:
   * Byte 0: STX (0x02)
   * Byte 1: Status Word A
   * Byte 2: Status Word B
   * Byte 3: Status Word C
   * Bytes 4-9: Displayed Weight (6 ASCII chars)
   * Bytes 10-15: Tare Weight (6 ASCII chars)
   * Byte 16: CR (0x0D)
   * Byte 17: LF (0x0A)
   */
  public static parseContinuousFrame(buf: Buffer): RawWeightReading {
    if (buf.length !== 18) {
      throw new Error(`Invalid Toledo continuous frame length: expected 18, got ${buf.length}`);
    }

    if (buf[0] !== 0x02) {
      throw new Error(`Invalid Toledo start byte: expected 0x02 STX, got 0x${buf[0].toString(16)}`);
    }

    if (buf[16] !== 0x0d || buf[17] !== 0x0a) {
      throw new Error('Invalid Toledo frame termination: expected CRLF');
    }

    const statusA = buf[1];
    const statusB = buf[2];
    const statusC = buf[3];

    // Status Word A: Bits 0-2 define decimal point position
    const decimalCode = statusA & 0x07;
    let decimalDivisor = 1;
    switch (decimalCode) {
      case 0: decimalDivisor = 0.0001; break; // X0000
      case 1: decimalDivisor = 0.001; break;  // X000
      case 2: decimalDivisor = 0.01; break;   // X00
      case 3: decimalDivisor = 0.1; break;    // X0
      case 4: decimalDivisor = 1; break;      // X
      case 5: decimalDivisor = 10; break;     // X.X
      case 6: decimalDivisor = 100; break;    // X.XX
      case 7: decimalDivisor = 1000; break;   // X.XXX
      default: decimalDivisor = 1;
    }

    // Status Word B:
    // Bit 0: 0 = Gross, 1 = Net
    // Bit 1: 0 = Positive, 1 = Negative
    // Bit 2: 1 = Overload
    // Bit 3: 0 = Stable (no motion), 1 = Motion (unstable)
    // Bit 4: 0 = lb, 1 = kg
    const isNet = (statusB & 0x01) === 0x01;
    const isNegative = (statusB & 0x02) === 0x02;
    const isOverload = (statusB & 0x04) === 0x04;
    const isMotion = (statusB & 0x08) === 0x08;
    const isKg = (statusB & 0x10) === 0x10;

    const displayedRawStr = buf.toString('ascii', 4, 10).trim();
    const tareRawStr = buf.toString('ascii', 10, 16).trim();

    let rawDisplayed = parseFloat(displayedRawStr);
    if (isNaN(rawDisplayed)) rawDisplayed = 0;
    if (decimalDivisor !== 1) {
      rawDisplayed = rawDisplayed / decimalDivisor;
    }
    if (isNegative) {
      rawDisplayed = -Math.abs(rawDisplayed);
    }

    let rawTare = parseFloat(tareRawStr);
    if (isNaN(rawTare)) rawTare = 0;
    if (decimalDivisor !== 1) {
      rawTare = rawTare / decimalDivisor;
    }

    // Convert lb to kg if indicator is set to lb
    const unitMultiplier = isKg ? 1.0 : 0.45359237;
    const displayedKg = Math.round(rawDisplayed * unitMultiplier * 100) / 100;
    const tareKg = Math.round(rawTare * unitMultiplier * 100) / 100;

    let grossKg: number;
    let netKg: number;

    if (isNet) {
      netKg = displayedKg;
      grossKg = Math.round((netKg + tareKg) * 100) / 100;
    } else {
      grossKg = displayedKg;
      netKg = Math.max(0, Math.round((grossKg - tareKg) * 100) / 100);
    }

    return {
      grossKg,
      tareKg,
      netKg,
      isStable: !isMotion && !isOverload,
      rawString: buf.toString('ascii'),
      protocol: 'TOLEDO',
      timestampMs: Date.now(),
      statusFlags: {
        overload: isOverload,
        motion: isMotion,
        unit: isKg ? 'kg' : 'lb',
        rawHeader: `A=${statusA.toString(16)},B=${statusB.toString(16)},C=${statusC.toString(16)}`,
      },
    };
  }

  /**
   * Parses SICS protocol strings (e.g., "S S      45000.0 kg\r\n" or "S D      45000.0 kg\r\n").
   */
  public static parseSicsString(rawStr: string): RawWeightReading {
    const trimmed = rawStr.trim();
    const parts = trimmed.split(/\s+/);

    if (parts.length < 3 || parts[0] !== 'S') {
      throw new Error(`Invalid SICS string format: '${rawStr}'`);
    }

    const statusCode = parts[1]; // S = Stable, D = Dynamic, + = Overload, - = Underload
    const isStable = statusCode === 'S';
    const isOverload = statusCode === '+';

    let weightVal = 0;
    let unit = 'kg';

    if (statusCode === '+' || statusCode === '-') {
      weightVal = 0;
    } else {
      weightVal = parseFloat(parts[2]) || 0;
      if (parts.length >= 4) {
        unit = parts[3].toLowerCase();
      }
    }

    const unitMult = unit === 'lb' ? 0.45359237 : 1.0;
    const netKg = Math.round(weightVal * unitMult * 100) / 100;
    const grossKg = netKg; // Default when tare not provided in single SICS reading
    const tareKg = 0;

    return {
      grossKg,
      tareKg,
      netKg,
      isStable: isStable && !isOverload,
      rawString: rawStr,
      protocol: 'TOLEDO',
      timestampMs: Date.now(),
      statusFlags: {
        overload: isOverload,
        motion: !isStable,
        unit,
        rawHeader: statusCode,
      },
    };
  }

  /**
   * Auto-detects whether data is 18-byte continuous or SICS and parses it.
   */
  public static parse(data: Buffer | string): RawWeightReading {
    if (Buffer.isBuffer(data)) {
      if (data.length === 18 && data[0] === 0x02) {
        return this.parseContinuousFrame(data);
      }
      return this.parseSicsString(data.toString('ascii'));
    }
    if (data.length === 18 && data.charCodeAt(0) === 0x02) {
      return this.parseContinuousFrame(Buffer.from(data, 'binary'));
    }
    return this.parseSicsString(data);
  }
}
