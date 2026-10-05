/**
 * CAS Corporation Serial Stream Parser (CI-200A / CI-2001A / CI-5010A)
 * Supports 22-byte ASCII streaming format:
 * Header1 (ST/US/OL), Header2 (GS/NT/TR), Lamp, Weight, Unit, CRLF.
 */

import type { RawWeightReading } from '../types/index.ts';

export class CasParser {
  /**
   * Checks if string or buffer looks like a CAS frame (starts with ST, US, or OL).
   */
  public static isCasFrame(data: Buffer | string): boolean {
    const str = typeof data === 'string' ? data : data.toString('ascii');
    const trimmed = str.trimStart();
    return (
      trimmed.startsWith('ST,') ||
      trimmed.startsWith('US,') ||
      trimmed.startsWith('OL,')
    );
  }

  /**
   * Parses a single CAS protocol line (e.g., "ST,GS,0,+ 45000.0,kg\r\n" or "ST,GS,+0045000.0,kg\r\n").
   */
  public static parse(data: Buffer | string): RawWeightReading {
    const rawStr = typeof data === 'string' ? data : data.toString('ascii');
    const trimmed = rawStr.trim();

    if (!trimmed.includes(',')) {
      throw new Error(`Invalid CAS frame: Missing comma delimiters in '${rawStr}'`);
    }

    const parts = trimmed.split(',').map((p) => p.trim());
    if (parts.length < 4) {
      throw new Error(`Invalid CAS frame: Expected at least 4 comma-separated fields, got ${parts.length}`);
    }

    // Field 0: Header 1 (Stability / Status)
    const header1 = parts[0].toUpperCase();
    const isStable = header1 === 'ST';
    const isOverload = header1 === 'OL';
    const isMotion = header1 === 'US';

    // Field 1: Header 2 (Weight type)
    const header2 = parts[1].toUpperCase(); // GS = Gross, NT = Net, TR = Tare

    // Extract weight and unit
    // In 5-field format: ST, GS, Lamp, Weight, Unit
    // In 4-field format: ST, GS, Weight, Unit
    let weightStr = '';
    let unitStr = 'kg';
    let lampStatus = '';

    if (parts.length >= 5) {
      // Check if parts[2] is lamp code (single char or short number)
      if (parts[2].length <= 2 && !parts[2].includes('.')) {
        lampStatus = parts[2];
        weightStr = parts[3];
        unitStr = parts[4] || 'kg';
      } else {
        weightStr = parts[2];
        unitStr = parts[3] || 'kg';
      }
    } else {
      weightStr = parts[2];
      unitStr = parts[3] || 'kg';
    }

    // Sanitize weight string: remove spaces between sign and digits (e.g. "+ 45000.0" -> "+45000.0")
    const cleanWeightStr = weightStr.replace(/\s+/g, '');
    let weightVal = parseFloat(cleanWeightStr);
    if (isNaN(weightVal)) {
      weightVal = 0;
    }

    // Unit conversion if needed
    const unitMultiplier = unitStr.toLowerCase() === 'lb' ? 0.45359237 : 1.0;
    const finalWeightKg = Math.round(weightVal * unitMultiplier * 100) / 100;

    let grossKg = 0;
    let netKg = 0;
    let tareKg = 0;

    if (header2 === 'GS') {
      grossKg = finalWeightKg;
      netKg = finalWeightKg;
    } else if (header2 === 'NT') {
      netKg = finalWeightKg;
      grossKg = finalWeightKg;
    } else if (header2 === 'TR') {
      tareKg = finalWeightKg;
    } else {
      grossKg = finalWeightKg;
      netKg = finalWeightKg;
    }

    return {
      grossKg,
      tareKg,
      netKg,
      isStable: isStable && !isOverload,
      rawString: rawStr,
      protocol: 'CAS',
      timestampMs: Date.now(),
      statusFlags: {
        overload: isOverload,
        motion: isMotion,
        unit: unitStr.toLowerCase(),
        rawHeader: `${header1},${header2}${lampStatus ? ',' + lampStatus : ''}`,
      },
    };
  }
}
