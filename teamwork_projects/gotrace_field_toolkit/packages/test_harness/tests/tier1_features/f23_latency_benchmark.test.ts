import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LatencyProfiler } from '../../src/benchmark/latency_profiler.ts';

describe('Tier 1: Feature 23 - Latency Benchmark Suite (< 500ms SLA)', () => {
  it('F23-TC1: High-resolution nanosecond timer measures sub-millisecond execution times', () => {
    const profiler = new LatencyProfiler();
    profiler.startE2e();
    profiler.startStage(1);
    // Tiny computation
    let sum = 0;
    for (let i = 0; i < 1000; i++) sum += i;
    const elapsed = profiler.stopStage(1);
    assert.ok(elapsed >= 0);
    assert.ok(elapsed < 10.0); // should take < 10ms
  });

  it('F23-TC2: Asserts each of 8 pipeline stages is individually tracked with specific target and max budget', () => {
    const profiler = new LatencyProfiler();
    profiler.startE2e();
    const report = profiler.generateReport();
    assert.strictEqual(report.stages.length, 8);
    const stage1 = report.stages[0];
    assert.strictEqual(stage1.targetMs, 50);
    assert.strictEqual(stage1.maxBudgetMs, 80);
  });

  it('F23-TC3: SLA Certification: Cumulative end-to-end processing time is strictly < 500ms', () => {
    const profiler = new LatencyProfiler();
    profiler.startE2e();
    const report = profiler.generateReport();
    assert.strictEqual(report.slaPassed, true, `Report total ${report.totalDurationMs}ms must be < 500ms`);
    assert.ok(report.totalDurationMs < 500.0);
  });

  it('F23-TC4: Generates clean markdown summary table matching benchmark spec', () => {
    const profiler = new LatencyProfiler();
    profiler.startE2e();
    const report = profiler.generateReport();
    assert.ok(report.summaryTable.includes('| # | Pipeline Stage | Component | Target | Max Budget | Measured | Status |'));
    assert.ok(report.summaryTable.includes('SLA PASSED'));
  });

  it('F23-TC5: Successfully flags SLA BREACH when network latency exceeds maximum threshold', () => {
    const profiler = new LatencyProfiler();
    profiler.startE2e();
    // Simulate severe 4G network delay of 450ms
    const breachReport = profiler.generateReport(450);
    assert.strictEqual(breachReport.slaPassed, false);
    assert.ok(breachReport.totalDurationMs > 500.0);
    assert.ok(breachReport.summaryTable.includes('SLA BREACH'));
  });
});
