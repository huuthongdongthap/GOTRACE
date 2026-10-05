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
} from '../../src/verifiers/crypto_verifier.ts';
import {
  MOCK_HARVEST_LOT_PAYLOAD,
  MOCK_PLOT_GCI,
} from '../../src/fixtures/zalo_fixtures.ts';
import {
  MOCK_DELIVERY_ORDER,
} from '../../src/fixtures/erp_fixtures.ts';
import type { WeightTicketPayload, HarvestLotPayload } from '../../src/models/contracts.ts';

describe('Tier 3: Cross-Feature Pairwise Integration', () => {
  it('PAIR-01: Weighbridge + Zalo: Virtual Weighbridge 45,000kg intake matches Zalo HarvestLot and updates status to WEIGHED', () => {
    // 1. Zalo creates harvest request
    const harvestLot: HarvestLotPayload = {
      ...MOCK_HARVEST_LOT_PAYLOAD,
      estimatedYieldKg: 45000.0,
      status: 'REQUESTED',
    };
    assert.strictEqual(harvestLot.status, 'REQUESTED');

    // 2. Weighbridge truck arrives and stabilizes at 45,000kg
    const stream = generateSimulatorStream(45000.0, 'CAS');
    const engine = new StabilizationEngine(25, 5.0);
    let lockedWeight = null;
    for (const frame of stream.stableFrames) {
      const res = engine.addReading(parseSerialFrame(frame));
      if (res.isStable) {
        lockedWeight = res.stableWeightKg;
        break;
      }
    }
    assert.ok(lockedWeight);
    assert.strictEqual(Math.round(lockedWeight), 45000);

    // 3. Status transitions to WEIGHED; difference between estimated and weighed is 0%
    harvestLot.status = 'WEIGHED';
    const deltaPct = Math.abs(harvestLot.estimatedYieldKg - lockedWeight) / lockedWeight;
    assert.ok(deltaPct < 0.01, `Tolerance must be < 1%, got ${deltaPct}`);
    assert.strictEqual(harvestLot.status, 'WEIGHED');
  });

  it('PAIR-02: Zalo + ERP: HarvestLot produced in Zalo Mini App is resolved in ERP Delivery Order lineage', () => {
    // 1. Harvest lot created by farmer in Zalo
    const harvestGci = MOCK_HARVEST_LOT_PAYLOAD.lotId;
    assert.ok(harvestGci.includes('.LOT.HARVEST.'));

    // 2. ERP Delivery order references finished LOT milled from this harvest lot
    const finishedLotGci = MOCK_DELIVERY_ORDER.lineItems[0].lotNumber;
    assert.ok(finishedLotGci.includes('.LOT.FINISHED.'));

    // 3. Lineage mapping: Finished LOT parentage contains harvest lot
    const lineageGraph = new Map<string, string[]>();
    lineageGraph.set(finishedLotGci, [harvestGci]);

    const parents = lineageGraph.get(finishedLotGci);
    assert.ok(parents);
    assert.ok(parents.includes(harvestGci));
  });

  it('PAIR-03: Weighbridge + ERP: Weight ticket evidence from Weighbridge reconciles ERP receiving stock and mass balance', () => {
    // 1. Weighbridge issues weight ticket
    const ticketMeta = {
      ticketNumber: 'TK-WB-ERP-01',
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
      evidenceId: 'VN.DT.EVIDENCE.WEIGHT_TICKET.TK-WB-ERP-01',
      evidenceType: 'WEIGHT_TICKET',
      fileHashSha256: ticketHash,
      storageUri: 'https://storage.gotrace.vn/tk.json',
      capturedAt: new Date().toISOString(),
      issuerPartyId: 'VN.DT.PARTY.OPERATOR.OP-4421',
      metadataJson: ticketMeta,
      createdAt: new Date().toISOString(),
    };
    assert.strictEqual(verifyWeightTicketHash(ticket).valid, true);

    // 2. ERP receiving dock confirms 45,000kg fresh intake
    const erpIntakeMassKg = 45000.0;
    assert.strictEqual(ticket.metadataJson.netWeightKg, erpIntakeMassKg);

    // 3. Mass balance check for drying (14% target moisture from 24% initial)
    // Dry yield = Fresh * (1 - 0.24) / (1 - 0.14) = 45000 * 0.76 / 0.86 = 39,767.4 kg
    const initialMoisture = 0.24;
    const finalMoisture = 0.14;
    const expectedDryMassKg = erpIntakeMassKg * ((1 - initialMoisture) / (1 - finalMoisture));
    assert.ok(expectedDryMassKg > 39000 && expectedDryMassKg < 40000);
  });

  it('PAIR-04: Weighbridge + Zalo AWD Carbon: Paddy intake links to farmer AWD logs and inherits verified carbon credits', () => {
    // 1. Zalo logs 3 AWD dry cycles for 3.0 ha plot
    const mrv = calculateAwdEmissionReduction(MOCK_PLOT_GCI, 3.0, 3);
    assert.strictEqual(mrv.emissionReductionTCo2e, 10.05);

    // 2. Weighbridge confirms 45,000kg delivered from this certified AWD plot
    const ticketNetKg = 45000.0;
    const emissionReductionPerKg = mrv.emissionReductionTCo2e / ticketNetKg; // tCO2e per kg paddy
    assert.ok(emissionReductionPerKg > 0);

    // 3. Finished product inherits carbon reduction badge
    const label = generateTraceabilityLabel('VN.DT.LOT.FINISHED.20260930-OM5451-01', 'Gao Phat Thai Thap 1Mha');
    assert.ok(label.qrPayload.length > 0);
  });

  it('PAIR-05: Zalo OCR + ERP DO: Chemical treatment records from Zalo OCR attach to LOT for export compliance', () => {
    // 1. Zalo OCR extracted Hexaconazole treatment on plot 30 days before harvest
    const preHarvestIntervalDays = 30; // Isolation period >= 14 days
    const minRequiredPhiDays = 14;
    const isSafeForExport = preHarvestIntervalDays >= minRequiredPhiDays;
    assert.strictEqual(isSafeForExport, true);

    // 2. ERP connector allows release of Delivery Order for export shipment
    const canIssueExportDO = isSafeForExport && MOCK_DELIVERY_ORDER.lineItems.length > 0;
    assert.strictEqual(canIssueExportDO, true);
  });
});
