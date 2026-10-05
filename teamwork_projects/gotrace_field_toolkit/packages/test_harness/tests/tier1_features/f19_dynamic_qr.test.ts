import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateTraceabilityLabel } from '../../src/engines/erp_label_engine.ts';
import { validateTraceabilityLabel } from '../../src/verifiers/schema_verifier.ts';

describe('Tier 1: Feature 19 - Dynamic QR Code Generator (< 30ms)', () => {
  it('F19-TC1: Generates dynamic QR payload containing valid public resolution URL', () => {
    const lotGci = 'VN.DT.LOT.FINISHED.20260930-OM5451-01';
    const label = generateTraceabilityLabel(lotGci, 'Gao OM5451 Co May');
    assert.ok(label.qrPayload.startsWith('https://trace.gotrace.vn/resolve?'));
    assert.ok(label.qrPayload.includes(encodeURIComponent(lotGci)));
  });

  it('F19-TC2: Generation latency is strictly under 30ms SLA target', () => {
    const lotGci = 'VN.DT.LOT.FINISHED.20260930-OM5451-01';
    const label = generateTraceabilityLabel(lotGci, 'Gao OM5451 Co May');
    assert.ok(
      label.generationLatencyMs < 30.0,
      `Generation latency ${label.generationLatencyMs}ms must be < 30ms`
    );
  });

  it('F19-TC3: Returns valid Base64 Data URI string for direct web rendering', () => {
    const lotGci = 'VN.DT.LOT.FINISHED.20260930-OM5451-01';
    const label = generateTraceabilityLabel(lotGci, 'Gao OM5451 Co May');
    assert.ok(label.qrImageBase64.startsWith('data:image/'));
    assert.ok(label.qrImageBase64.includes('base64,'));
  });

  it('F19-TC4: Traceability label response satisfies all contract constraints', () => {
    const lotGci = 'VN.DT.LOT.FINISHED.20260930-OM5451-01';
    const label = generateTraceabilityLabel(lotGci, 'Gao OM5451 Co May');
    const result = validateTraceabilityLabel(label);
    assert.strictEqual(result.valid, true, `Validation errors: ${result.errors.join(', ')}`);
  });

  it('F19-TC5: Successfully handles high throughput batch generation without latency degradation', () => {
    const lotGci = 'VN.DT.LOT.FINISHED.20260930-OM5451-01';
    const latencies: number[] = [];
    for (let i = 0; i < 50; i++) {
      const label = generateTraceabilityLabel(lotGci, `Batch Rice Item ${i}`);
      latencies.push(label.generationLatencyMs);
    }
    const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    assert.ok(avgLatency < 5.0, `Average batch latency ${avgLatency}ms must be < 5ms`);
  });
});
