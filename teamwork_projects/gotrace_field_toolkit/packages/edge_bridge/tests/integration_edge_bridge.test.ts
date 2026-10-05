import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { EdgeBridgeDaemon } from '../src/daemon.ts';
import { WeighbridgeSimulator } from '../src/simulator/weighbridge_simulator.ts';
import { verifyTicketHash } from '../src/crypto/jcs_hasher.ts';
import { isValidWeighStationGci, isValidWeightTicketGci, isValidWeighedEventGci } from '../src/gci/index.ts';
import type { WeightTicketPayload, WeighedEventPayload } from '../src/types/index.ts';

describe('Edge Bridge End-to-End Integration Flow', () => {
  it('should process simulated 45,000 kg truck stream and produce valid EVIDENCE and EVENT', async () => {
    const stationGci = 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01';
    const harvestLotGci = 'VN.DT.LOT.HARVEST.20260930-OM5451-TB01';
    const vehiclePlate = '66C-123.45';

    // 1. Initialize Edge Bridge Daemon
    const daemon = new EdgeBridgeDaemon({
      stationGci,
      protocol: 'CAS',
      scaleModel: 'CAS_CI200A',
      defaultVehiclePlate: vehiclePlate,
      edgeSigningSecret: 'secret-audit-key-2026',
      stabilization: {
        windowSeconds: 1.0,
        sampleCount: 15,
        maxVarianceKg: 5.0,
        minWeightThresholdKg: 1000.0,
      },
    });

    daemon.setVehicleContext({
      vehiclePlate,
      harvestLotGci,
    });

    let generatedTicket: WeightTicketPayload | null = null;
    let emittedEvent: WeighedEventPayload | null = null;

    daemon.on('ticketGenerated', (ticket) => {
      generatedTicket = ticket;
    });

    daemon.on('eventEmitted', (event) => {
      emittedEvent = event;
    });

    // 2. Feed stream: 5 noise/approach frames + 20 stable frames at 45,000 kg
    // Approach frames (unstable, US)
    for (let i = 0; i < 5; i++) {
      const w = 20000 + i * 5000;
      daemon.feedBytes(`US,GS,0,+00${w}.0,kg\r\n`);
    }

    assert.strictEqual(generatedTicket, null); // Not yet stable

    // Stable frames at 45,000 kg (ST)
    for (let i = 0; i < 20; i++) {
      daemon.feedBytes('ST,GS,0,+0045000.0,kg\r\n');
    }

    // 3. Verify EVIDENCE: WEIGHT_TICKET
    assert.ok(generatedTicket, 'Weight ticket must be generated');
    const ticket = generatedTicket as WeightTicketPayload;

    assert.strictEqual(ticket.evidenceType, 'WEIGHT_TICKET');
    assert.strictEqual(isValidWeightTicketGci(ticket.evidenceId), true);
    assert.strictEqual(ticket.metadataJson.scaleStationGci, stationGci);
    assert.strictEqual(ticket.metadataJson.vehiclePlate, vehiclePlate);
    assert.strictEqual(ticket.metadataJson.grossWeightKg, 45000.0);
    assert.strictEqual(ticket.metadataJson.netWeightKg, 45000.0);
    assert.strictEqual(ticket.metadataJson.isStable, true);

    // Cryptographic validation of ticket
    const ticketVerification = verifyTicketHash(ticket);
    assert.strictEqual(ticketVerification.valid, true);
    assert.ok(ticket.digitalSignature);

    // 4. Verify EVENT: WEIGHED
    assert.ok(emittedEvent, 'Weighed event must be emitted');
    const event = emittedEvent as WeighedEventPayload;

    assert.strictEqual(event.eventType, 'WEIGHED');
    assert.strictEqual(isValidWeighedEventGci(event.eventId), true);
    assert.strictEqual(event.placeId, stationGci);
    assert.deepStrictEqual(event.inputLots, [harvestLotGci]);
    assert.strictEqual(event.telemetryData.weightKg, 45000.0);
    assert.deepStrictEqual(event.evidenceRefs, [ticket.evidenceId]);
    assert.ok(event.eventHashSha256);
  });

  it('should stream simulated weighbridge frames into EdgeBridgeDaemon and trigger tickets', async () => {
    const stationGci = 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01';

    // Start Simulator with TCP server on free port to confirm server bind capability
    const sim = new WeighbridgeSimulator({
      protocol: 'CAS',
      targetWeightKg: 45000.0,
      tareWeightKg: 0,
    });
    const port = await sim.startTcpServer(0);
    assert.ok(port > 0);
    assert.strictEqual(sim.isListening(), true);

    const daemon = new EdgeBridgeDaemon({
      stationGci,
      protocol: 'CAS',
      stabilization: {
        windowSeconds: 1.0,
        sampleCount: 10,
        maxVarianceKg: 5.0,
      },
    });

    let ticketReceived: WeightTicketPayload | null = null;
    daemon.on('ticketGenerated', (ticket) => {
      ticketReceived = ticket;
    });

    // Stream from simulator to daemon via data pipeline
    sim.on('data', ({ frame }) => {
      daemon.feedBytes(frame);
    });

    // Advance simulator to STEADY and feed 15 steady ticks
    for (let i = 0; i < 15; i++) {
      const frame = sim.encodeFrame(45000.0, 0, 45000.0, true);
      daemon.feedBytes(frame);
    }

    assert.ok(ticketReceived);
    const finalTicket = ticketReceived as unknown as WeightTicketPayload;
    assert.strictEqual(isValidWeighStationGci(finalTicket.metadataJson.scaleStationGci), true);

    daemon.disconnect();
    await sim.stopTcpServer();
  });
});
