/**
 * GoTRACE Serial Protocol Engine & Stabilization Detector
 * Implements Toledo (18B), CAS (22B), and Yaohua (12B/16B) protocol parsing,
 * Ring Buffer noise filtering, and sliding-window stabilization algorithm.
 */

import type { RawWeightReading, StabilizationResult } from '../models/contracts.ts';
import {
  StreamRingBuffer,
  MultiProtocolParser,
  WeightStabilizer,
  WeighbridgeSimulator,
  CasParser,
  ToledoParser,
  YaohuaParser,
} from '@gotrace/edge-bridge';

export interface SerialParserOptions {
  baudRate?: number;
  dataBits?: 7 | 8;
  parity?: 'none' | 'even' | 'odd';
  stopBits?: 1 | 2;
}

export class SerialRingBuffer {
  private buffer: Buffer;
  private writePos = 0;
  private readPos = 0;
  private count = 0;
  private readonly capacity: number;

  constructor(capacity = 4096) {
    this.capacity = capacity;
    this.buffer = Buffer.alloc(capacity);
  }

  write(chunk: Buffer | string): void {
    const data = typeof chunk === 'string' ? Buffer.from(chunk, 'latin1') : chunk;
    for (let i = 0; i < data.length; i++) {
      const b = data[i];
      // Filter out electrical noise / garbage bytes (control chars < 0x20 except STX, ETX, CR, LF)
      if (b < 0x20 && b !== 0x02 && b !== 0x03 && b !== 0x0d && b !== 0x0a) {
        continue;
      }
      this.buffer[this.writePos] = b;
      this.writePos = (this.writePos + 1) % this.capacity;
      if (this.count < this.capacity) {
        this.count++;
      } else {
        // Overwrite oldest
        this.readPos = (this.readPos + 1) % this.capacity;
      }
    }
  }

  getAvailableBytes(): number {
    return this.count;
  }

  /**
   * Reads next delimited frame ending in CRLF (0x0D 0x0A) or CR (0x0D) or ETX (0x03).
   */
  readFrame(): string | null {
    if (this.count === 0) return null;

    // Scan for frame terminator
    let foundLen = -1;
    let termLen = 1;

    for (let i = 0; i < this.count; i++) {
      const idx = (this.readPos + i) % this.capacity;
      const b = this.buffer[idx];

      if (b === 0x0a) {
        // LF
        foundLen = i + 1;
        termLen = 1;
        break;
      } else if (b === 0x0d) {
        // CR - check if followed by LF
        if (i + 1 < this.count) {
          const nextIdx = (this.readPos + i + 1) % this.capacity;
          if (this.buffer[nextIdx] === 0x0a) {
            foundLen = i + 2;
            termLen = 2;
            break;
          }
        }
        foundLen = i + 1;
        termLen = 1;
        break;
      } else if (b === 0x03) {
        // ETX
        foundLen = i + 1;
        termLen = 1;
        break;
      }
    }

    if (foundLen === -1) return null;

    const frameBytes = Buffer.alloc(foundLen);
    for (let i = 0; i < foundLen; i++) {
      frameBytes[i] = this.buffer[this.readPos];
      this.readPos = (this.readPos + 1) % this.capacity;
      this.count--;
    }

    return frameBytes.toString('latin1');
  }

  clear(): void {
    this.writePos = 0;
    this.readPos = 0;
    this.count = 0;
  }
}

/**
 * Parses raw serial string into structured weight reading.
 */
export function parseSerialFrame(frame: string): RawWeightReading {
  const clean = frame.trim();

  // 1. CAS CI-200A format: "ST,GS,+045000.0,kg" or "US,NT,+015000.0,kg"
  if (clean.includes(',GS,') || clean.includes(',NT,') || clean.startsWith('ST,') || clean.startsWith('US,')) {
    const parts = clean.split(',');
    const isStable = parts[0] === 'ST';
    const isGross = parts[1] === 'GS';
    const weightRaw = parts[2] ? parts[2].replace(/[+ ]/g, '') : '0';
    const weight = parseFloat(weightRaw) || 0;

    return {
      grossKg: isGross ? weight : weight + 15000,
      tareKg: isGross ? 15000 : 15000,
      netKg: isGross ? (weight > 15000 ? weight - 15000 : weight) : weight,
      isStable,
      rawString: frame,
      protocol: 'CAS',
      timestampMs: Date.now(),
    };
  }

  // 2. Yaohua XK3190 format: "=+045000" or "=000054+0"
  if (clean.startsWith('=')) {
    const signMatch = clean.match(/[+-]/);
    const sign = signMatch && signMatch[0] === '-' ? -1 : 1;
    const digits = clean.replace(/[^0-9]/g, '');
    let weight = parseInt(digits, 10) || 0;

    // Yaohua low-byte first reverse order check
    if (clean.includes('+0') && clean.length <= 12) {
      // Reverse digits if formatted as D0..D5
      const rev = digits.split('').reverse().join('');
      weight = parseInt(rev, 10) || weight;
    }

    const netKg = weight * sign;
    const tareKg = 15000;
    return {
      grossKg: netKg + tareKg,
      tareKg,
      netKg,
      isStable: !frame.includes('US') && !frame.includes('M'),
      rawString: frame,
      protocol: 'YAOHUA',
      timestampMs: Date.now(),
    };
  }

  // 3. Mettler Toledo Continuous 18B or SICS format
  if (frame.charCodeAt(0) === 0x02 || clean.startsWith('S S') || clean.startsWith('S D')) {
    if (clean.startsWith('S S') || clean.startsWith('S D')) {
      const isStable = clean.startsWith('S S');
      const numMatch = clean.match(/-?\d+(\.\d+)?/);
      const weight = numMatch ? parseFloat(numMatch[0]) : 0;
      return {
        grossKg: weight + 15000,
        tareKg: 15000,
        netKg: weight,
        isStable,
        rawString: frame,
        protocol: 'TOLEDO',
        timestampMs: Date.now(),
      };
    }

    // 18B continuous binary-ascii frame
    const isStable = (frame.charCodeAt(2) & 0x08) === 0;
    const grossRaw = frame.substring(4, 10).trim();
    const tareRaw = frame.substring(10, 16).trim();
    const gross = parseFloat(grossRaw) || 0;
    const tare = parseFloat(tareRaw) || 0;

    return {
      grossKg: gross,
      tareKg: tare,
      netKg: gross - tare,
      isStable,
      rawString: frame,
      protocol: 'TOLEDO',
      timestampMs: Date.now(),
    };
  }

  // Fallback generic parser
  const numMatch = clean.match(/-?\d+(\.\d+)?/);
  const weight = numMatch ? parseFloat(numMatch[0]) : 0;
  return {
    grossKg: weight,
    tareKg: 0,
    netKg: weight,
    isStable: true,
    rawString: frame,
    protocol: 'CAS',
    timestampMs: Date.now(),
  };
}

/**
 * Sliding Window Weight Stabilization Engine
 * Window: Tw = 2.5s, N = 25 samples @ 10Hz
 * Variance threshold <= 5.0 kg
 */
export class StabilizationEngine {
  private windowSamples: number[] = [];
  private hardwareStableFlags: boolean[] = [];
  private readonly maxSamples: number;
  private readonly maxVarianceKg: number;
  private lastLockedWeight: number | null = null;
  private isLocked = false;

  constructor(maxSamples = 25, maxVarianceKg = 5.0) {
    this.maxSamples = maxSamples;
    this.maxVarianceKg = maxVarianceKg;
  }

  addReading(reading: RawWeightReading): StabilizationResult {
    // Anti-double-weighing hysteresis: If locked, require scale to clear (<20kg) to unlock
    if (this.isLocked) {
      if (reading.grossKg < 50.0 || reading.netKg < 20.0) {
        this.isLocked = false;
        this.lastLockedWeight = null;
        this.reset();
      } else {
        return {
          isStable: false,
          stableWeightKg: null,
          varianceKg: 0,
          durationSeconds: 0,
          sampleCount: this.windowSamples.length,
        };
      }
    }

    this.windowSamples.push(reading.netKg);
    this.hardwareStableFlags.push(reading.isStable);

    if (this.windowSamples.length > this.maxSamples) {
      this.windowSamples.shift();
      this.hardwareStableFlags.shift();
    }

    if (this.windowSamples.length < this.maxSamples) {
      return {
        isStable: false,
        stableWeightKg: null,
        varianceKg: this.calculateVariance(),
        durationSeconds: this.windowSamples.length * 0.1,
        sampleCount: this.windowSamples.length,
      };
    }

    // Check hardware stability flag for all samples in window
    const allHardwareStable = this.hardwareStableFlags.every((f) => f === true);
    const variance = this.calculateVariance();
    const mean = this.calculateMean();

    if (allHardwareStable && variance <= this.maxVarianceKg && mean > 100.0) {
      this.isLocked = true;
      this.lastLockedWeight = Math.round(mean * 10) / 10;
      return {
        isStable: true,
        stableWeightKg: this.lastLockedWeight,
        varianceKg: variance,
        durationSeconds: 2.5,
        sampleCount: this.maxSamples,
      };
    }

    return {
      isStable: false,
      stableWeightKg: null,
      varianceKg: variance,
      durationSeconds: 2.5,
      sampleCount: this.maxSamples,
    };
  }

  reset(): void {
    this.windowSamples = [];
    this.hardwareStableFlags = [];
  }

  private calculateMean(): number {
    if (this.windowSamples.length === 0) return 0;
    const sum = this.windowSamples.reduce((a, b) => a + b, 0);
    return sum / this.windowSamples.length;
  }

  private calculateVariance(): number {
    if (this.windowSamples.length < 2) return 0;
    const max = Math.max(...this.windowSamples);
    const min = Math.min(...this.windowSamples);
    return max - min;
  }
}

/**
 * Virtual Weighbridge Simulator
 * Generates serial byte stream simulating truck approach, mechanical vibration bounce,
 * stable convergence at target weight, and vehicle departure.
 */
export function generateSimulatorStream(
  targetNetKg = 45000.0,
  protocol: 'CAS' | 'YAOHUA' | 'TOLEDO' = 'CAS'
): {
  approachFrames: string[];
  bounceFrames: string[];
  stableFrames: string[];
  departureFrames: string[];
} {
  const approachFrames: string[] = [];
  const bounceFrames: string[] = [];
  const stableFrames: string[] = [];
  const departureFrames: string[] = [];

  const tareKg = 15000.0;

  // 1. Approach: 10 frames ramping from 0 to 45,000kg
  for (let i = 1; i <= 10; i++) {
    const w = (targetNetKg / 10) * i;
    approachFrames.push(formatFrame(w + tareKg, w, false, protocol));
  }

  // 2. Dynamic Bounce: 15 frames damped oscillation
  for (let i = 0; i < 15; i++) {
    const t = i * 0.1;
    const bounce = 1200.0 * Math.exp(-1.8 * t) * Math.cos(4 * Math.PI * t);
    const currentWeight = targetNetKg + bounce;
    bounceFrames.push(formatFrame(currentWeight + tareKg, currentWeight, false, protocol));
  }

  // 3. Steady Stable: 25 frames @ targetNetKg +/- 1kg
  for (let i = 0; i < 25; i++) {
    const jitter = (Math.random() - 0.5) * 1.5;
    const steadyWeight = targetNetKg + jitter;
    stableFrames.push(formatFrame(steadyWeight + tareKg, steadyWeight, true, protocol));
  }

  // 4. Departure: 5 frames ramping to 0
  for (let i = 5; i >= 0; i--) {
    const w = (targetNetKg / 5) * i;
    departureFrames.push(formatFrame(w + tareKg, w, false, protocol));
  }

  return { approachFrames, bounceFrames, stableFrames, departureFrames };
}

function formatFrame(
  gross: number,
  net: number,
  isStable: boolean,
  protocol: 'CAS' | 'YAOHUA' | 'TOLEDO'
): string {
  const roundedGross = Math.round(gross * 10) / 10;
  const roundedNet = Math.round(net * 10) / 10;

  if (protocol === 'CAS') {
    const st = isStable ? 'ST' : 'US';
    const grossStr = String(roundedGross).padStart(8, ' ');
    return `${st},GS,+${grossStr},kg\r\n`;
  } else if (protocol === 'YAOHUA') {
    const netStr = String(Math.round(roundedNet)).padStart(6, '0');
    return `=${netStr}\r`;
  } else {
    // TOLEDO
    const st = isStable ? 'S S' : 'S D';
    return `${st}      ${roundedNet.toFixed(1)} kg\r\n`;
  }
}
