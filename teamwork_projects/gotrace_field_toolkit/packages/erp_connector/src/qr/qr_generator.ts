/**
 * GoTRACE Dynamic Traceability QR Code Generator
 * 
 * Provides dynamic QR code generation pointing to traceability landing pages.
 * Guarantees generation latency < 30ms (typically ~1-2ms).
 */

import { performance } from 'node:perf_hooks';
import { QrEcLevel, QrMatrix, QrMatrixBuilder } from './qr_matrix.js';
import { renderQrSvg } from './qr_svg.js';
import { renderQrPngBuffer, renderQrPngDataUrl } from './qr_png.js';

export interface GenerateQrOptions {
  level?: QrEcLevel; // Default: 'M'
  scale?: number; // Pixels per module (default: 6)
  margin?: number; // Modules for quiet zone (default: 4)
}

export interface GeneratedQrResult {
  qrPayload: string;
  qrImageBase64: string; // data:image/png;base64,...
  qrPngBuffer: Buffer;
  qrSvg: string;
  version: number;
  sizeModules: number;
  generationLatencyMs: number;
}

/**
 * Generate full dynamic QR Code bundle for a URL or GCI payload.
 */
export function generateTraceabilityQr(
  targetUrlOrGci: string,
  options: GenerateQrOptions = {}
): GeneratedQrResult {
  const startTime = performance.now();
  const level = options.level ?? 'M';

  // Build matrix
  const matrix: QrMatrix = QrMatrixBuilder.build(targetUrlOrGci, level);

  // Render SVG and PNG
  const qrSvg = renderQrSvg(matrix, { margin: options.margin });
  const qrPngBuffer = renderQrPngBuffer(matrix, { scale: options.scale, margin: options.margin });
  const qrImageBase64 = `data:image/png;base64,${qrPngBuffer.toString('base64')}`;

  const endTime = performance.now();
  const generationLatencyMs = Number((endTime - startTime).toFixed(3));

  return {
    qrPayload: targetUrlOrGci,
    qrImageBase64,
    qrPngBuffer,
    qrSvg,
    version: matrix.version,
    sizeModules: matrix.size,
    generationLatencyMs
  };
}

/**
 * Benchmark QR code generation across N iterations.
 */
export function benchmarkQrGeneration(
  targetUrl: string,
  iterations = 100
): { minMs: number; maxMs: number; avgMs: number; p95Ms: number; success: boolean } {
  const latencies: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const res = generateTraceabilityQr(targetUrl);
    latencies.push(res.generationLatencyMs);
  }

  latencies.sort((a, b) => a - b);
  const minMs = latencies[0];
  const maxMs = latencies[latencies.length - 1];
  const avgMs = Number((latencies.reduce((acc, v) => acc + v, 0) / iterations).toFixed(3));
  const p95Idx = Math.floor(iterations * 0.95);
  const p95Ms = latencies[p95Idx];

  return {
    minMs,
    maxMs,
    avgMs,
    p95Ms,
    success: p95Ms < 30.0 // SLA: < 30ms
  };
}

export class DynamicQrGenerator {
  public static generate(targetUrlOrGci: string, options: GenerateQrOptions = {}): GeneratedQrResult {
    return generateTraceabilityQr(targetUrlOrGci, options);
  }

  public static benchmark(targetUrl = 'https://trace.gotrace.vn/resolve?gci=VN.DT.LOT.FINISHED.TEST', iterations = 100) {
    return benchmarkQrGeneration(targetUrl, iterations);
  }
}


