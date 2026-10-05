/**
 * Multi-Protocol Serial Parser Engine
 * Dispatches to Toledo, CAS, or Yaohua parsers with auto-detection or explicit protocol.
 */

import type { RawWeightReading, ScaleProtocol } from '../types/index.ts';
import { ToledoParser } from './toledo.ts';
import { CasParser } from './cas.ts';
import { YaohuaParser } from './yaohua.ts';

export class MultiProtocolParser {
  /**
   * Auto-detects the scale protocol from raw bytes or string.
   */
  public static detectProtocol(data: Buffer | string): ScaleProtocol {
    if (CasParser.isCasFrame(data)) {
      return 'CAS';
    }
    if (ToledoParser.isToledoFrame(data)) {
      return 'TOLEDO';
    }
    if (YaohuaParser.isYaohuaFrame(data)) {
      return 'YAOHUA';
    }
    // Default fallback to CAS if comma found, Yaohua if '=' found, Toledo otherwise
    const str = typeof data === 'string' ? data : data.toString('ascii');
    if (str.includes(',')) return 'CAS';
    if (str.includes('=')) return 'YAOHUA';
    return 'TOLEDO';
  }

  /**
   * Parses raw stream data using explicit protocol or auto-detection.
   */
  public static parse(data: Buffer | string, protocol?: ScaleProtocol): RawWeightReading {
    const proto = protocol || this.detectProtocol(data);

    switch (proto) {
      case 'CAS':
        return CasParser.parse(data);
      case 'TOLEDO':
        return ToledoParser.parse(data);
      case 'YAOHUA':
        return YaohuaParser.parse(data);
      default:
        throw new Error(`Unsupported scale protocol: '${proto}'`);
    }
  }
}
