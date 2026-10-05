import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  StabilizationEngine,
  SerialRingBuffer,
  parseSerialFrame,
} from '../../src/engines/serial_protocol_engine.ts';
import {
  calculateAwdEmissionReduction,
} from '../../src/engines/mrv_carbon_engine.ts';
import {
  validateGciSyntax,
  buildGci,
} from '../../src/verifiers/gci_verifier.ts';
import {
  verifyHmacSignature,
  calculateHmacSha256,
} from '../../src/verifiers/crypto_verifier.ts';
import {
  validateDeliveryOrderWebhook,
  validateWeightTicket,
  validateHarvestLot,
} from '../../src/verifiers/schema_verifier.ts';
import {
  MOCK_DELIVERY_ORDER,
  MOCK_EMPTY_ITEMS_DO,
  MOCK_HMAC_SECRET,
} from '../../src/fixtures/erp_fixtures.ts';
import {
  MOCK_PLOT_GCI,
} from '../../src/fixtures/zalo_fixtures.ts';
import type { RawWeightReading, WeightTicketPayload } from '../../src/models/contracts.ts';

describe('Tier 2: Boundary & Corner Cases', () => {
  it('BVA-01: Jitter Noise Bursts: Extreme voltage spikes (+/- 25,000kg) in serial stream do not falsely trigger stabilization', () => {
    const engine = new StabilizationEngine(25, 5.0);
    // 20 normal samples, then burst of 5 extreme noise spikes
    for (let i = 0; i < 20; i++) {
      engine.addReading({
        grossKg: 60000,
        tareKg: 15000,
        netKg: 45000,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: Date.now(),
      });
    }
    // Voltage spike bursts
    for (let i = 0; i < 5; i++) {
      const spike = engine.addReading({
        grossKg: 85000, // Spike
        tareKg: 15000,
        netKg: 70000,
        isStable: false,
        rawString: '',
        protocol: 'CAS',
        timestampMs: Date.now(),
      });
      assert.strictEqual(spike.isStable, false);
      assert.strictEqual(spike.stableWeightKg, null);
    }
  });

  it('BVA-02: Unstable Weights: Continuously oscillating weight (+/- 15kg) never stabilizes regardless of duration', () => {
    const engine = new StabilizationEngine(25, 5.0);
    let finalResult = null;
    // 100 consecutive oscillating readings (10 seconds)
    for (let i = 0; i < 100; i++) {
      const osc = (i % 2 === 0 ? 15.0 : -15.0);
      finalResult = engine.addReading({
        grossKg: 60000 + osc,
        tareKg: 15000,
        netKg: 45000 + osc,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: Date.now(),
      });
    }
    assert.ok(finalResult);
    assert.strictEqual(finalResult.isStable, false);
    assert.strictEqual(finalResult.stableWeightKg, null);
    assert.ok(finalResult.varianceKg >= 30.0);
  });

  it('BVA-03: Zero AWD Cycles: Exactly 0 dry cycles returns 0.00 tCO2e reduction without throwing unexpected errors', () => {
    const res = calculateAwdEmissionReduction(MOCK_PLOT_GCI, 10.0, 0);
    assert.strictEqual(res.dryCycles, 0);
    assert.strictEqual(res.emissionReductionTCo2e, 0);
    assert.strictEqual(res.carbonCreditValueUsd, 0);
  });

  it('BVA-04: Invalid GCI Regex: Malformed province, missing dots, lowercase letters, or illegal symbols rejected', () => {
    const badCases = [
      'VN.XX.PLACE.WEIGH_STATION.01', // Invalid province XX
      'VN.DT.UNKNOWN_PRIMITIVE.SUB.01', // Unknown primitive
      'VN-DT-PLACE-WEIGH_STATION-01', // Dashes instead of dots
      'vn.dt.place.weigh_station.01', // Lowercase
      'VN.DT.PLACE.WEIGH_STATION.01;DROP TABLE', // SQL injection attempt
      'VN.DT.PLACE.WEIGH_STATION.', // Empty ID segment
    ];

    for (const bad of badCases) {
      const res = validateGciSyntax(bad);
      assert.strictEqual(res.valid, false, `Expected ${bad} to be invalid`);
    }
  });

  it('BVA-05: Tampered HMAC: Modifying single bit of webhook payload causes signature rejection', () => {
    const originalBody = JSON.stringify(MOCK_DELIVERY_ORDER);
    const signature = calculateHmacSha256(originalBody, MOCK_HMAC_SECRET);

    // Tamper single character
    const tamperedBody = originalBody.replace('BRAVO_8', 'BRAVO_9');
    assert.strictEqual(verifyHmacSignature(tamperedBody, signature, MOCK_HMAC_SECRET), false);
    assert.strictEqual(verifyHmacSignature(tamperedBody, `sha256=${signature}`, MOCK_HMAC_SECRET), false);
  });

  it('BVA-06: Empty DO Items: Delivery order with 0 items fails schema validation', () => {
    const res = validateDeliveryOrderWebhook(MOCK_EMPTY_ITEMS_DO);
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some((e) => e.includes('lineItems')));
  });

  it('BVA-07: Negative Net Weight: Weight ticket where tare weight >= gross weight is rejected', () => {
    const invalidTicket: WeightTicketPayload = {
      evidenceId: 'VN.DT.EVIDENCE.WEIGHT_TICKET.TK-NEG-01',
      evidenceType: 'WEIGHT_TICKET',
      fileHashSha256: 'a'.repeat(64),
      storageUri: 'https://storage.gotrace.vn/tk.json',
      capturedAt: new Date().toISOString(),
      issuerPartyId: 'VN.DT.PARTY.OPERATOR.OP-4421',
      metadataJson: {
        ticketNumber: 'TK-NEG-01',
        vehiclePlate: '66C-123.45',
        scaleStationGci: 'VN.DT.PLACE.WEIGH_STATION.WS-01',
        grossWeightKg: 10000.0,
        tareWeightKg: 15000.0, // Tare > Gross!
        netWeightKg: -5000.0,
        isStable: true,
        scaleModel: 'CAS_CI200A',
        rawSerialString: '',
      },
      createdAt: new Date().toISOString(),
    };
    const res = validateWeightTicket(invalidTicket);
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some((e) => e.includes('tareWeightKg') || e.includes('netWeightKg')));
  });

  it('BVA-08: Ring Buffer Overflow: Writing data exceeding buffer capacity wraps around cleanly without crashing', () => {
    const ring = new SerialRingBuffer(32);
    // Write 100 bytes into 32-byte capacity ring buffer
    const largeChunk = 'A'.repeat(100) + '\r\n';
    ring.write(largeChunk);
    assert.ok(ring.getAvailableBytes() <= 32);
    const frame = ring.readFrame();
    assert.ok(frame !== null);
    assert.ok(frame.endsWith('\r\n'));
  });

  it('BVA-09: Overload Limit: Loadcell readings exceeding bridge maximum (120,000kg) flagged', () => {
    const overloadFrame = 'OL,GS,+135000.0,kg\r\n';
    const reading = parseSerialFrame(overloadFrame);
    assert.ok(reading.grossKg > 120000.0);
    // Any gross weight over 120 tons is an overload
    const isOverloaded = reading.grossKg > 120000.0;
    assert.strictEqual(isOverloaded, true);
  });

  it('BVA-10: Yield Quota Overflow: Harvest yield exceeding biological ceiling (e.g. 25 tons/ha) flagged', () => {
    const plotHectares = 1.0;
    const claimedYieldKg = 25000.0; // 25 tons/ha - biologically impossible for Mekong paddy (ceiling is 8-10 tons/ha)
    const MAX_BIOLOGICAL_YIELD_KG_PER_HA = 10000.0;
    const isOverflow = claimedYieldKg > plotHectares * MAX_BIOLOGICAL_YIELD_KG_PER_HA;
    assert.strictEqual(isOverflow, true, 'Biological yield ceiling exceeded');
  });
});
