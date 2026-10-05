import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { EvidencePackager } from '../src/packaging/evidence_packager.ts';
import { EventPackager } from '../src/packaging/event_packager.ts';
import { verifyTicketHash } from '../src/crypto/jcs_hasher.ts';
import { isValidWeightTicketGci, isValidWeighedEventGci } from '../src/gci/index.ts';

describe('Evidence & Event Packagers', () => {
  it('should package EVIDENCE: WEIGHT_TICKET with RFC 8785 Canonical SHA-256 hash', () => {
    const stationGci = 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01';
    const ticket = EvidencePackager.createWeightTicket({
      scaleStationGci: stationGci,
      vehiclePlate: '66C-123.45',
      driverName: 'Tran Van Nam',
      grossWeightKg: 58500.0,
      tareWeightKg: 13500.0,
      netWeightKg: 45000.0,
      scaleModel: 'YAOHUA_XK3190_A9',
      edgeSigningSecret: 'edge-secret-2026',
    });

    assert.strictEqual(ticket.evidenceType, 'WEIGHT_TICKET');
    assert.strictEqual(isValidWeightTicketGci(ticket.evidenceId), true);
    assert.strictEqual(ticket.metadataJson.grossWeightKg, 58500.0);
    assert.strictEqual(ticket.metadataJson.tareWeightKg, 13500.0);
    assert.strictEqual(ticket.metadataJson.netWeightKg, 45000.0);
    assert.strictEqual(ticket.metadataJson.vehiclePlate, '66C-123.45');
    assert.ok(ticket.fileHashSha256);
    assert.strictEqual(ticket.fileHashSha256.length, 64);
    assert.ok(ticket.digitalSignature);

    // Verify hash integrity mathematically
    const verification = verifyTicketHash(ticket);
    assert.strictEqual(verification.valid, true);
  });

  it('should reject negative net weight', () => {
    assert.throws(
      () =>
        EvidencePackager.createWeightTicket({
          scaleStationGci: 'VN.DT.PLACE.WEIGH_STATION.WS-01',
          vehiclePlate: '66C-999.99',
          grossWeightKg: 10000.0,
          tareWeightKg: 15000.0, // Tare > Gross -> Net = -5000 kg!
        }),
      /NEGATIVE_NET_WEIGHT/
    );
  });

  it('should package EVENT: WEIGHED linked to ticket evidence', () => {
    const stationGci = 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01';
    const ticket = EvidencePackager.createWeightTicket({
      scaleStationGci: stationGci,
      vehiclePlate: '66C-123.45',
      grossWeightKg: 45000.0,
      tareWeightKg: 0,
      netWeightKg: 45000.0,
    });

    const harvestLotGci = 'VN.DT.LOT.HARVEST.20260930-OM5451-HTX01';
    const weighedEvent = EventPackager.createWeighedEvent({
      stationGci,
      ticket,
      inputLots: [harvestLotGci],
    });

    assert.strictEqual(weighedEvent.eventType, 'WEIGHED');
    assert.strictEqual(isValidWeighedEventGci(weighedEvent.eventId), true);
    assert.strictEqual(weighedEvent.placeId, stationGci);
    assert.deepStrictEqual(weighedEvent.inputLots, [harvestLotGci]);
    assert.strictEqual(weighedEvent.telemetryData.weightKg, 45000.0);
    assert.deepStrictEqual(weighedEvent.evidenceRefs, [ticket.evidenceId]);
    assert.strictEqual(weighedEvent.eventHashSha256.length, 64);
  });
});
