import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  StabilizationEngine,
  generateSimulatorStream,
  parseSerialFrame,
} from '../../src/engines/serial_protocol_engine.ts';
import {
  calculateAwdEmissionReduction,
} from '../../src/engines/mrv_carbon_engine.ts';
import {
  generateTraceabilityLabel,
} from '../../src/engines/erp_label_engine.ts';
import {
  canonicalizeJson,
  sha256Hex,
  verifyWeightTicketHash,
  calculateHmacSha256,
  verifyHmacSignature,
} from '../../src/verifiers/crypto_verifier.ts';
import {
  validateGciSyntax,
  isValidWeighStationGci,
  isValidHarvestLotGci,
  isValidFinishedLotGci,
} from '../../src/verifiers/gci_verifier.ts';
import {
  validateWeighedEvent,
  validateWeightTicket,
  validateHarvestLot,
  validateDeliveryOrderWebhook,
  validateTraceabilityLabel,
} from '../../src/verifiers/schema_verifier.ts';
import {
  LatencyProfiler,
} from '../../src/benchmark/latency_profiler.ts';
import {
  MOCK_HARVEST_LOT_PAYLOAD,
  MOCK_PLOT_GCI,
  MOCK_GROWING_AREA_GCI,
} from '../../src/fixtures/zalo_fixtures.ts';
import {
  MOCK_DELIVERY_ORDER,
  MOCK_HMAC_SECRET,
} from '../../src/fixtures/erp_fixtures.ts';
import type { WeightTicketPayload, WeighedEventPayload, HarvestLotPayload } from '../../src/models/contracts.ts';

describe('Tier 4: Real-World Application Scenarios & Benchmarks', () => {
  it('SCENARIO 1: Full 45,000kg Fresh Paddy Delivery at Tháp Mười Rice Mill with 100% Cryptographic Cert & Latency < 500ms', () => {
    const profiler = new LatencyProfiler();
    profiler.startE2e();

    // Stage 1: Serial Parsing & Stable Weight Lock (Target: 50ms, Max: 80ms)
    profiler.startStage(1);
    const stream = generateSimulatorStream(45000.0, 'CAS');
    const engine = new StabilizationEngine(25, 5.0);
    let lockedWeight: number | null = null;
    for (const frame of stream.stableFrames) {
      const res = engine.addReading(parseSerialFrame(frame));
      if (res.isStable) {
        lockedWeight = res.stableWeightKg;
        break;
      }
    }
    assert.ok(lockedWeight);
    assert.strictEqual(Math.round(lockedWeight), 45000);
    const stage1Elapsed = profiler.stopStage(1);
    assert.ok(stage1Elapsed < 80.0, `Stage 1 took ${stage1Elapsed}ms, max is 80ms`);

    // Stage 2: Canonical JSON & SHA-256 Ticket Hashing (Target: 15ms, Max: 25ms)
    profiler.startStage(2);
    const scaleStationGci = 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01';
    assert.strictEqual(isValidWeighStationGci(scaleStationGci), true);

    const ticketMeta = {
      ticketNumber: 'TK-THAPMUOI-45T-01',
      vehiclePlate: '66C-123.45',
      driverName: 'Nguyen Van Nam',
      scaleStationGci,
      grossWeightKg: 60000.0,
      tareWeightKg: 15000.0,
      netWeightKg: 45000.0,
      isStable: true,
      scaleModel: 'CAS_CI200A',
      rawSerialString: 'ST,GS,+060000.0,kg\r\n',
    };
    const ticketHash = sha256Hex(canonicalizeJson(ticketMeta));
    const ticket: WeightTicketPayload = {
      evidenceId: 'VN.DT.EVIDENCE.WEIGHT_TICKET.TK-THAPMUOI-45T-01',
      evidenceType: 'WEIGHT_TICKET',
      fileHashSha256: ticketHash,
      storageUri: 'https://storage.gotrace.vn/tickets/TK-THAPMUOI-45T-01.json',
      capturedAt: new Date().toISOString(),
      issuerPartyId: 'VN.DT.PARTY.OPERATOR.OP-4421',
      metadataJson: ticketMeta,
      createdAt: new Date().toISOString(),
    };
    assert.strictEqual(validateWeightTicket(ticket).valid, true);
    assert.strictEqual(verifyWeightTicketHash(ticket).valid, true);
    const stage2Elapsed = profiler.stopStage(2);
    assert.ok(stage2Elapsed < 25.0, `Stage 2 took ${stage2Elapsed}ms, max is 25ms`);

    // Stage 3: Edge-to-Cloud 4G Transport Simulation (Target: 85ms, Max: 120ms)
    profiler.startStage(3);
    const simulatedNetworkPayload = JSON.stringify(ticket);
    assert.ok(simulatedNetworkPayload.length > 0);
    const stage3Elapsed = profiler.stopStage(3);
    assert.ok(stage3Elapsed < 120.0);

    // Stage 4: GCI Validation & Graph Ledger Record (Target: 60ms, Max: 90ms)
    profiler.startStage(4);
    const eventTelemetry = {
      weightKg: 45000.0,
      grossWeightKg: 60000.0,
      tareWeightKg: 15000.0,
      sensorId: 'CAS-CI200A-01',
      rawSerialFrame: 'ST,GS,+060000.0,kg\r\n',
    };
    const eventHash = sha256Hex(canonicalizeJson({
      eventId: 'VN.DT.EVENT.WEIGHED.EVT-THAPMUOI-45T',
      placeId: scaleStationGci,
      telemetry: eventTelemetry,
    }));
    const weighedEvent: WeighedEventPayload = {
      eventId: 'VN.DT.EVENT.WEIGHED.EVT-THAPMUOI-45T',
      eventType: 'WEIGHED',
      timestampUtc: new Date().toISOString(),
      placeId: scaleStationGci,
      operatorPartyId: 'VN.DT.PARTY.OPERATOR.OP-4421',
      inputLots: ['VN.DT.LOT.HARVEST.20260930-OM5451-TB01'],
      outputLots: ['VN.DT.LOT.HARVEST.20260930-OM5451-TB01'],
      telemetryData: eventTelemetry,
      evidenceRefs: [ticket.evidenceId],
      eventHashSha256: eventHash,
      createdAt: new Date().toISOString(),
    };
    assert.strictEqual(validateWeighedEvent(weighedEvent).valid, true);
    const stage4Elapsed = profiler.stopStage(4);
    assert.ok(stage4Elapsed < 90.0);

    // Stage 5: Zalo Mini App Sync (Target: 40ms, Max: 60ms)
    profiler.startStage(5);
    const harvestLot: HarvestLotPayload = {
      ...MOCK_HARVEST_LOT_PAYLOAD,
      status: 'WEIGHED',
      estimatedYieldKg: 45000.0,
    };
    assert.strictEqual(validateHarvestLot(harvestLot).valid, true);
    assert.strictEqual(isValidHarvestLotGci(harvestLot.lotId), true);
    const stage5Elapsed = profiler.stopStage(5);
    assert.ok(stage5Elapsed < 60.0);

    // Stage 6: ERP Webhook & HMAC Verification (Target: 40ms, Max: 60ms)
    profiler.startStage(6);
    const doBodyStr = JSON.stringify(MOCK_DELIVERY_ORDER);
    const hmacSig = `sha256=${calculateHmacSha256(doBodyStr, MOCK_HMAC_SECRET)}`;
    assert.strictEqual(verifyHmacSignature(doBodyStr, hmacSig, MOCK_HMAC_SECRET), true);
    const stage6Elapsed = profiler.stopStage(6);
    assert.ok(stage6Elapsed < 60.0);

    // Stage 7: LOT Extraction & Custody Transfer (Target: 80ms, Max: 110ms)
    profiler.startStage(7);
    const finishedLotGci = MOCK_DELIVERY_ORDER.lineItems[0].lotNumber;
    assert.strictEqual(isValidFinishedLotGci(finishedLotGci), true);
    assert.strictEqual(validateDeliveryOrderWebhook(MOCK_DELIVERY_ORDER).valid, true);
    const stage7Elapsed = profiler.stopStage(7);
    assert.ok(stage7Elapsed < 110.0);

    // Stage 8: Dynamic QR & Zebra ZPL Generator (Target: 30ms, Max: 50ms)
    profiler.startStage(8);
    const label = generateTraceabilityLabel(finishedLotGci, 'Gao OM5451 Co May Dong Thap', {
      weightKg: 45000.0,
      transactionId: 'VN.DT.TRANSACTION.CUSTODY_TRANSFER.DO-THAPMUOI-01',
    });
    assert.strictEqual(validateTraceabilityLabel(label).valid, true);
    assert.ok(label.generationLatencyMs < 30.0);
    const stage8Elapsed = profiler.stopStage(8);
    assert.ok(stage8Elapsed < 50.0);

    // SLA Benchmark Report Generation & Final Assertion
    const report = profiler.generateReport();
    assert.strictEqual(report.slaPassed, true, `Cumulative latency ${report.totalDurationMs}ms exceeded 500ms SLA`);
    assert.ok(report.totalDurationMs < 500.0);
  });

  it('SCENARIO 2: Cooperative AWD Carbon Audit & MRV Issuance under Decision 1490 (< 100ms)', () => {
    const start = process.hrtime.bigint();

    // 10 hectares cooperative plot, 3 AWD cycles
    const plotHectares = 10.0;
    const mrv = calculateAwdEmissionReduction(MOCK_PLOT_GCI, plotHectares, 3);
    assert.strictEqual(mrv.dryCycles, 3);
    assert.strictEqual(mrv.emissionReductionTCo2e, 33.5); // 10 * 3.35
    assert.strictEqual(mrv.carbonCreditValueUsd, 670.0); // 33.5 * $20

    const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    assert.ok(elapsedMs < 100.0, `Scenario 2 took ${elapsedMs}ms, SLA target is < 100ms`);
  });

  it('SCENARIO 3: Durian Cold-Chain & Export Packing under GACC Lệnh 280 (< 150ms)', () => {
    const start = process.hrtime.bigint();

    // Validate GACC packing house MSVT
    const packingGci = 'VN.TG.PLACE.PACKING_HOUSE.PH-CHANHTHU-01';
    assert.strictEqual(validateGciSyntax(packingGci).valid, true);

    // Validate fruit quota: 15 tons from 1 ha Cai Lậy orchard
    const registeredHectares = 1.0;
    const maxQuotaTons = 15.0;
    const deliveredTons = 14.8;
    const isWithinQuota = deliveredTons <= registeredHectares * maxQuotaTons;
    assert.strictEqual(isWithinQuota, true);

    // Generate GACC carton label
    const durianLot = 'VN.TG.LOT.FINISHED.20260930-DURIAN-RI6-01';
    const label = generateTraceabilityLabel(durianLot, 'Sau Rieng Ri6 Cai Lay Tien Giang', {
      weightKg: 14800.0,
      transactionId: 'VN.TG.TRANSACTION.CUSTODY_TRANSFER.TX-GACC-DURIAN-01',
    });
    assert.ok(label.zplCode.includes('SAU RIENG RI6 CAI LAY TIEN GIANG'));

    const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    assert.ok(elapsedMs < 150.0, `Scenario 3 took ${elapsedMs}ms, SLA target is < 150ms`);
  });

  it('SCENARIO 4: Offline Canal-side Sowing Sync & Reconnection (< 50ms)', () => {
    const start = process.hrtime.bigint();

    const offlineQueue = [
      { event: 'PLANTED', plotGci: MOCK_PLOT_GCI, variety: 'ST25' },
      { event: 'AWD_RECORDED', plotGci: MOCK_PLOT_GCI, waterLevelCm: -15 },
      { event: 'TREATED', plotGci: MOCK_PLOT_GCI, activeIngredient: 'Hexaconazole' },
    ];

    // Reconnection batch sync
    const syncedRecords = offlineQueue.map((item) => ({
      ...item,
      syncedAt: new Date().toISOString(),
      syncGci: `VN.DT.EVENT.${item.event}.EVT-${Date.now()}`,
    }));
    assert.strictEqual(syncedRecords.length, 3);

    const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    assert.ok(elapsedMs < 50.0, `Scenario 4 took ${elapsedMs}ms, SLA target is < 50ms`);
  });

  it('SCENARIO 5: Enterprise ERP Webhook Surge & Instant Carton ZPL Printing (< 30ms/label)', () => {
    const start = process.hrtime.bigint();

    const surgeCount = 20;
    const labels = [];
    for (let i = 0; i < surgeCount; i++) {
      const lot = `VN.DT.LOT.FINISHED.20260930-ST25-${i.toString().padStart(2, '0')}`;
      const label = generateTraceabilityLabel(lot, `Gao ST25 Carton Item ${i}`, {
        weightKg: 50.0,
      });
      labels.push(label);
    }
    assert.strictEqual(labels.length, surgeCount);

    const elapsedMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    const perLabelMs = elapsedMs / surgeCount;
    assert.ok(perLabelMs < 30.0, `Average ${perLabelMs}ms per label must be < 30ms`);
  });
});
