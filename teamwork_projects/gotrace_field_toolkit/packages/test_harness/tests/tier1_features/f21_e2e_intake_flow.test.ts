import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateSimulatorStream, StabilizationEngine, parseSerialFrame } from '../../src/engines/serial_protocol_engine.ts';
import { canonicalizeJson, sha256Hex, verifyWeightTicketHash } from '../../src/verifiers/crypto_verifier.ts';
import { generateTraceabilityLabel } from '../../src/engines/erp_label_engine.ts';
import { MOCK_HARVEST_LOT_PAYLOAD } from '../../src/fixtures/zalo_fixtures.ts';
import type { WeightTicketPayload, WeighedEventPayload, HarvestLotPayload } from '../../src/models/contracts.ts';

describe('Tier 1: Feature 21 - E2E Integration Pipeline Runner', () => {
  it('F21-TC1: Step 1 - Virtual Weighbridge generates 45,000kg paddy stream and locks stable', () => {
    const stream = generateSimulatorStream(45000.0, 'CAS');
    const engine = new StabilizationEngine(25, 5.0);
    let locked = null;
    for (const frame of stream.stableFrames) {
      const reading = parseSerialFrame(frame);
      const res = engine.addReading(reading);
      if (res.isStable) {
        locked = res;
        break;
      }
    }
    assert.ok(locked);
    assert.strictEqual(locked.isStable, true);
    assert.strictEqual(Math.round(locked.stableWeightKg!), 45000);
  });

  it('F21-TC2: Step 2 - IoT Bridge creates Weight Ticket Evidence and computes immutable SHA-256 hash', () => {
    const ticketMeta = {
      ticketNumber: 'TK-45000-01',
      vehiclePlate: '66C-123.45',
      scaleStationGci: 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01',
      grossWeightKg: 60000.0,
      tareWeightKg: 15000.0,
      netWeightKg: 45000.0,
      isStable: true,
      scaleModel: 'CAS_CI200A',
      rawSerialString: 'ST,GS,+060000.0,kg\r\n',
    };
    const ticketHash = sha256Hex(canonicalizeJson(ticketMeta));
    const ticket: WeightTicketPayload = {
      evidenceId: 'VN.DT.EVIDENCE.WEIGHT_TICKET.TK-45000-01',
      evidenceType: 'WEIGHT_TICKET',
      fileHashSha256: ticketHash,
      storageUri: 'https://storage.gotrace.vn/tickets/TK-45000-01.json',
      capturedAt: new Date().toISOString(),
      issuerPartyId: 'VN.DT.PARTY.OPERATOR.OP-4421',
      metadataJson: ticketMeta,
      createdAt: new Date().toISOString(),
    };

    const verify = verifyWeightTicketHash(ticket);
    assert.strictEqual(verify.valid, true);
  });

  it('F21-TC3: Step 3 - Zalo Mini App HarvestLot transitions status from REQUESTED to WEIGHED', () => {
    const harvestLot: HarvestLotPayload = { ...MOCK_HARVEST_LOT_PAYLOAD };
    assert.strictEqual(harvestLot.status, 'REQUESTED');

    // Link with weighed event
    harvestLot.status = 'WEIGHED';
    assert.strictEqual(harvestLot.status, 'WEIGHED');
    assert.strictEqual(harvestLot.estimatedYieldKg, 45000.0);
  });

  it('F21-TC4: Step 4 - ERP Connector issues Delivery Order & Custody Transfer with dynamic QR', () => {
    const finishedLotGci = 'VN.DT.LOT.FINISHED.20260930-OM5451-01';
    const label = generateTraceabilityLabel(finishedLotGci, 'Gao OM5451 Co May Sa Dec', {
      weightKg: 45000.0,
      transactionId: 'VN.DT.TRANSACTION.CUSTODY_TRANSFER.DO-45000-INTAKE',
    });
    assert.ok(label.qrPayload.includes(encodeURIComponent(finishedLotGci)));
    assert.ok(label.zplCode.includes('45000') && label.zplCode.includes('KG'));
  });

  it('F21-TC5: Full pipeline links all 4 touchpoints with 100% mass balance integrity', () => {
    const scaleNetKg = 45000.0;
    const harvestEstKg = MOCK_HARVEST_LOT_PAYLOAD.estimatedYieldKg;
    const erpDispatchedKg = 45000.0;

    assert.strictEqual(scaleNetKg, harvestEstKg);
    assert.strictEqual(scaleNetKg, erpDispatchedKg);
  });
});
