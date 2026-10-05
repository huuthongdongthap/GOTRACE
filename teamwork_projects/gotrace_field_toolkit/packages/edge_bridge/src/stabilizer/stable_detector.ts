/**
 * GoTRACE Stable Weight Detection Engine
 * Sliding window algorithm: Tw = 2.5s (N = 25 samples @ 10Hz),
 * max variance / range <= 5.0 kg, hardware stability bit (ST) check,
 * and anti-double-weighing hysteresis lock.
 */

import { EventEmitter } from 'node:events';
import type {
  RawWeightReading,
  StabilizationConfig,
  StabilizationResult,
} from '../types/index.ts';

interface SampleRecord {
  weightKg: number;
  grossKg: number;
  tareKg: number;
  netKg: number;
  isStable: boolean;
  timestampMs: number;
}

export type ScaleSessionState = 'IDLE' | 'WEIGHING' | 'STABLE_LOCKED' | 'DEPARTING';

export class WeightStabilizer extends EventEmitter {
  private config: Required<StabilizationConfig>;
  private samples: SampleRecord[] = [];
  private state: ScaleSessionState = 'IDLE';
  private zeroWeightSampleCount: number = 0;
  private lockedWeight: number | null = null;

  constructor(config?: StabilizationConfig) {
    super();
    this.config = {
      windowSeconds: config?.windowSeconds ?? 2.5,
      sampleRateHz: config?.sampleRateHz ?? 10,
      sampleCount: config?.sampleCount ?? 25,
      maxVarianceKg: config?.maxVarianceKg ?? 5.0,
      minWeightThresholdKg: config?.minWeightThresholdKg ?? 100.0,
      requireHardwareStability: config?.requireHardwareStability ?? true,
      hysteresisReleaseKg: config?.hysteresisReleaseKg ?? 20.0,
      hysteresisDurationSeconds: config?.hysteresisDurationSeconds ?? 3.0,
    };
  }

  /**
   * Ingests a new raw weight reading into the sliding window.
   */
  public addReading(reading: RawWeightReading): StabilizationResult {
    const now = reading.timestampMs || Date.now();
    const weight = reading.netKg > 0 ? reading.netKg : reading.grossKg;

    const sample: SampleRecord = {
      weightKg: weight,
      grossKg: reading.grossKg,
      tareKg: reading.tareKg,
      netKg: reading.netKg,
      isStable: reading.isStable,
      timestampMs: now,
    };

    // Add to sliding window
    this.samples.push(sample);

    // Prune samples older than windowSeconds
    const cutoffTime = now - this.config.windowSeconds * 1000;
    while (this.samples.length > 0 && this.samples[0].timestampMs < cutoffTime) {
      this.samples.shift();
    }

    // Keep only the latest sampleCount samples in the sliding window
    if (this.samples.length > this.config.sampleCount) {
      this.samples.splice(0, this.samples.length - this.config.sampleCount);
    }

    // Evaluate anti-double-weighing hysteresis & zero return
    if (this.state === 'STABLE_LOCKED') {
      if (weight <= this.config.hysteresisReleaseKg) {
        this.zeroWeightSampleCount++;
        const requiredZeroSamples = Math.max(3, Math.round(this.config.hysteresisDurationSeconds * this.config.sampleRateHz * 0.5));
        if (this.zeroWeightSampleCount >= requiredZeroSamples) {
          // Truck has completely departed; reset state machine to IDLE
          this.state = 'IDLE';
          this.lockedWeight = null;
          this.zeroWeightSampleCount = 0;
          this.emit('scaleReleased');
        }
      } else {
        this.zeroWeightSampleCount = 0;
      }

      // While locked, do not trigger another stable event
      return this.buildResult(false, null, null, null, null, 0, 0, 0, 0, 0);
    }

    // Evaluate stability if in IDLE or WEIGHING
    const n = this.samples.length;
    if (n < this.config.sampleCount) {
      this.state = weight >= this.config.minWeightThresholdKg ? 'WEIGHING' : 'IDLE';
      return this.buildResult(false, null, null, null, null, 0, 0, n, 0, 0);
    }

    // Check hardware stability across all samples in the window
    if (this.config.requireHardwareStability) {
      const allHardwareStable = this.samples.every((s) => s.isStable);
      if (!allHardwareStable) {
        this.state = 'WEIGHING';
        return this.buildResult(false, null, null, null, null, 0, 0, n, 0, 0);
      }
    }

    // Calculate arithmetic mean, min, max, variance
    let sum = 0;
    let minW = Infinity;
    let maxW = -Infinity;
    for (let i = 0; i < n; i++) {
      const w = this.samples[i].weightKg;
      sum += w;
      if (w < minW) minW = w;
      if (w > maxW) maxW = w;
    }
    const mean = sum / n;

    // Variance calculation
    let sumSquaredDiff = 0;
    for (let i = 0; i < n; i++) {
      const diff = this.samples[i].weightKg - mean;
      sumSquaredDiff += diff * diff;
    }
    const variance = sumSquaredDiff / n;
    const stdDev = Math.sqrt(variance);
    const range = maxW - minW;

    const durationSec = (this.samples[n - 1].timestampMs - this.samples[0].timestampMs) / 1000;

    // Criteria: range <= maxVarianceKg OR stdDev <= maxVarianceKg, and mean >= minWeightThresholdKg
    const isStableMet =
      (range <= this.config.maxVarianceKg || stdDev <= this.config.maxVarianceKg) &&
      mean >= this.config.minWeightThresholdKg;

    if (isStableMet) {
      this.state = 'STABLE_LOCKED';
      this.lockedWeight = Math.round(mean);
      this.zeroWeightSampleCount = 0;

      const latestSample = this.samples[n - 1];
      const result = this.buildResult(
        true,
        this.lockedWeight,
        latestSample.grossKg,
        latestSample.tareKg,
        latestSample.netKg,
        variance,
        durationSec,
        n,
        mean,
        minW,
        maxW
      );

      this.emit('stableWeight', result);
      return result;
    }

    this.state = weight >= this.config.minWeightThresholdKg ? 'WEIGHING' : 'IDLE';
    return this.buildResult(
      false,
      null,
      null,
      null,
      null,
      variance,
      durationSec,
      n,
      mean,
      minW,
      maxW
    );
  }

  private buildResult(
    isStable: boolean,
    stableWeightKg: number | null,
    grossWeightKg: number | null,
    tareWeightKg: number | null,
    netWeightKg: number | null,
    varianceKg: number,
    durationSeconds: number,
    sampleCount: number,
    meanKg: number = 0,
    minKg: number = 0,
    maxKg: number = 0
  ): StabilizationResult {
    return {
      isStable,
      stableWeightKg,
      grossWeightKg,
      tareWeightKg,
      netWeightKg,
      varianceKg: Math.round(varianceKg * 100) / 100,
      durationSeconds: Math.round(durationSeconds * 100) / 100,
      sampleCount,
      meanKg: Math.round(meanKg * 100) / 100,
      minKg: Math.round(minKg * 100) / 100,
      maxKg: Math.round(maxKg * 100) / 100,
    };
  }

  public getState(): ScaleSessionState {
    return this.state;
  }

  public getLockedWeight(): number | null {
    return this.lockedWeight;
  }

  public reset(): void {
    this.samples = [];
    this.state = 'IDLE';
    this.lockedWeight = null;
    this.zeroWeightSampleCount = 0;
  }
}
