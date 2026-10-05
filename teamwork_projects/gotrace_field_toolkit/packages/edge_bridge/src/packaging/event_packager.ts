/**
 * GoTRACE Event Packager: EVENT: WEIGHED
 * Canonical event packaging linking weight ticket evidence to GoTRACE Graph Ledger.
 */

import { randomUUID } from 'node:crypto';
import type {
  WeighedEventPayload,
  WeightTicketPayload,
} from '../types/index.ts';
import { buildWeighedEventGci, isValidWeighStationGci } from '../gci/index.ts';
import { canonicalizeJson, sha256Hex } from '../crypto/jcs_hasher.ts';

export interface CreateWeighedEventParams {
  province?: string;
  eventId?: string;
  stationGci: string;
  operatorPartyId?: string;
  inputLots?: string[];
  outputLots?: string[];
  ticket: WeightTicketPayload;
  settlingDurationSeconds?: number;
  scaleOscillationDelta?: number;
}

export class EventPackager {
  public static createWeighedEvent(params: CreateWeighedEventParams): WeighedEventPayload {
    if (!isValidWeighStationGci(params.stationGci)) {
      throw new Error(`Invalid weigh station GCI: '${params.stationGci}'`);
    }

    const province = params.province || params.stationGci.split('.')[1] || 'DT';
    const uniqueId = params.eventId || `EVT-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const eventId = buildWeighedEventGci(province, uniqueId);

    const nowIso = new Date().toISOString();
    const ticketMeta = params.ticket.metadataJson;

    const operator = params.operatorPartyId || `VN.${province}.PARTY.OPERATOR.OP-SCALE-01`;

    const lotRefs = ticketMeta.harvestLotGci ? [ticketMeta.harvestLotGci] : [];
    const inputLots = params.inputLots && params.inputLots.length > 0 ? params.inputLots : lotRefs;
    const outputLots = params.outputLots && params.outputLots.length > 0 ? params.outputLots : inputLots;

    const telemetryData = {
      weightKg: ticketMeta.netWeightKg,
      grossWeightKg: ticketMeta.grossWeightKg,
      tareWeightKg: ticketMeta.tareWeightKg,
      moisturePct: ticketMeta.moisturePct,
      temperatureCelsius: ticketMeta.temperatureAmbientC,
      sensorId: ticketMeta.scaleModel,
      rawSerialFrame: ticketMeta.rawSerialString,
      readings: {
        scaleOscillationDelta: params.scaleOscillationDelta ?? 0.05,
        settlingDurationSeconds: params.settlingDurationSeconds ?? 2.5,
      },
    };

    // Prepare core event body for canonical hashing
    const coreEventData = {
      eventId,
      eventType: 'WEIGHED' as const,
      timestampUtc: nowIso,
      placeId: params.stationGci,
      operatorPartyId: operator,
      inputLots,
      outputLots,
      telemetryData,
      evidenceRefs: [params.ticket.evidenceId],
    };

    const eventHashSha256 = sha256Hex(canonicalizeJson(coreEventData));

    return {
      ...coreEventData,
      eventHashSha256,
      createdAt: nowIso,
    };
  }
}
