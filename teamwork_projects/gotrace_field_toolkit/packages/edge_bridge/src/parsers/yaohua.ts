/**
 * Yaohua Serial Stream Parser (XK3190-A9 / A12 / T7E)
 * Supports 12-byte and 16-byte continuous stream formats with '=' or STX delimiter,
 * reverse (low-byte-first) or direct digit encoding, decimal point flags, and XOR checksum.
 */

import type { RawWeightReading } from '../types/index.ts';

export class YaohuaParser {
  /**
   * Checks if string or buffer is a Yaohua frame (starts with '=' or STX followed by digits/sign).
   */
  public static isYaohuaFrame(data: Buffer | string): boolean {
    if (Buffer.isBuffer(data)) {
      if (data.length >= 8 && (data[0] === 0x3d || data[0] === 0x02)) {
        return true;
      }
      const str = data.toString('ascii').trimStart();
      return str.startsWith('=');
    }
    const str = data.trimStart();
    return str.startsWith('=');
  }

  /**
   * Verifies XOR checksum (BCC) on a raw buffer if checksum byte is present.
   */
  public static verifyXorChecksum(buf: Buffer, checksumIndex: number): boolean {
    if (buf.length <= checksumIndex) return false;
    let xor = 0;
    for (let i = 0; i < checksumIndex; i++) {
      xor ^= buf[i];
    }
    return xor === buf[checksumIndex];
  }

  /**
   * Parses a Yaohua XK3190 frame (12-byte binary/ASCII or string).
   *
   * Standard 12-byte continuous frame:
   * Byte 0: '=' (0x3D) or STX (0x02)
   * Format A (low-byte first):
   *   Bytes 1-6: 6 digits in reverse order (D0..D5)
   *   Byte 7: Sign ('+' or '-')
   *   Byte 8: Decimal point position ('0'..'4' or 0..4)
   *   Byte 9: Status byte (bit 0 = 0: stable, 1: unstable/motion; or '0'/'1')
   *   Byte 10: XOR checksum (or status 2)
   *   Byte 11: CR (0x0D) or ETX (0x03)
   *
   * Format B (sign first, direct/reverse digits):
   *   Byte 1: Sign ('+' or '-')
   *   Bytes 2-7: 6 digits
   *   Byte 8: Decimal point ('0'..'4')
   *   Byte 9: Status / CR
   */
  public static parse(data: Buffer | string): RawWeightReading {
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, 'binary');
    const rawStr = buf.toString('ascii');

    if (buf.length < 8) {
      throw new Error(`Invalid Yaohua frame: Length too short (${buf.length} bytes) in '${rawStr}'`);
    }

    if (buf[0] !== 0x3d && buf[0] !== 0x02) {
      throw new Error(`Invalid Yaohua frame start: Expected '=' (0x3D) or STX, got 0x${buf[0].toString(16)}`);
    }

    let isNegative = false;
    let digitsStr = '';
    let isReversed = false;
    let decimalPos = 0;
    let isStable = true;
    let isOverload = false;

    // Detect format based on byte 1
    const byte1Char = String.fromCharCode(buf[1]);

    if (byte1Char === '+' || byte1Char === '-') {
      // Sign first format: = + D5 D4 D3 D2 D1 D0 ... or = + D0 D1 D2 D3 D4 D5 ...
      isNegative = byte1Char === '-';
      const extractedDigits = buf.toString('ascii', 2, Math.min(buf.length, 8)).replace(/[^0-9]/g, '');

      // Check if remainder contains decimal position
      if (buf.length >= 9) {
        const decChar = String.fromCharCode(buf[8]);
        if (/[0-4]/.test(decChar)) {
          decimalPos = parseInt(decChar, 10);
        }
      }

      // Check status byte (index 9)
      if (buf.length >= 10) {
        const statusByte = buf[9];
        // If ASCII '1' or bit 0 is set -> motion/unstable
        if (statusByte === 0x31 || (statusByte & 0x01) === 0x01) {
          isStable = false;
        }
        if (statusByte === 0x4f || statusByte === 0x6f) { // 'O' or 'o' overload
          isOverload = true;
          isStable = false;
        }
      }

      digitsStr = extractedDigits;
      isReversed = false;
    } else {
      // Reverse digits first format: = D0 D1 D2 D3 D4 D5 [Sign] [Decimal] [Status] [CR]
      const rawDigits = buf.toString('ascii', 1, 7).replace(/[^0-9]/g, '');
      // Reverse the 6 digits (D0..D5 -> D5..D0)
      digitsStr = rawDigits.split('').reverse().join('');
      isReversed = true;

      if (buf.length >= 8) {
        const signChar = String.fromCharCode(buf[7]);
        isNegative = signChar === '-';
      }

      if (buf.length >= 9) {
        const decChar = String.fromCharCode(buf[8]);
        if (/[0-4]/.test(decChar)) {
          decimalPos = parseInt(decChar, 10);
        }
      }

      if (buf.length >= 10) {
        const statusByte = buf[9];
        // Status byte: 0x00 / '0' = stable, 0x01 / '1' = motion
        if (statusByte === 0x31 || (statusByte & 0x01) === 0x01) {
          isStable = false;
        }
      }
    }

    let parsedVal = parseInt(digitsStr, 10);
    if (isNaN(parsedVal)) {
      parsedVal = 0;
    }

    // Apply decimal divisor:
    // decimalPos = 1 -> divide by 10
    // decimalPos = 2 -> divide by 100
    // decimalPos = 3 -> divide by 1000
    // decimalPos = 4 -> divide by 10000
    if (decimalPos > 0 && decimalPos <= 4) {
      parsedVal = parsedVal / Math.pow(10, decimalPos);
    }

    if (isNegative) {
      parsedVal = -Math.abs(parsedVal);
    }

    const netKg = Math.round(parsedVal * 100) / 100;
    const grossKg = netKg;
    const tareKg = 0;

    return {
      grossKg,
      tareKg,
      netKg,
      isStable: isStable && !isOverload,
      rawString: rawStr,
      protocol: 'YAOHUA',
      timestampMs: Date.now(),
      statusFlags: {
        overload: isOverload,
        motion: !isStable,
        unit: 'kg',
        rawHeader: `= (reversed=${isReversed}, dec=${decimalPos})`,
      },
    };
  }
}
