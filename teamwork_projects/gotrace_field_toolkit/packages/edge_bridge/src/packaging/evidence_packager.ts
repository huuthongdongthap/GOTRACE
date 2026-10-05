/**
 * GoTRACE Evidence Packager: EVIDENCE: WEIGHT_TICKET
 * Canonical RFC 8785 JSON serialization & immutable SHA-256 hashing.
 */

import { randomUUID } from 'node:crypto';
import type {
  WeightTicketMetadata,
  WeightTicketPayload,
} from '../types/index.ts';
import { buildWeightTicketGci, isValidWeighStationGci } from '../gci/index.ts';
import { computeTicketHash, signTicketHash } from '../crypto/jcs_hasher.ts';

export interface CreateWeightTicketParams {
  province?: string;
  ticketId?: string;
  ticketNumber?: string;
  vehiclePlate: string;
  driverName?: string;
  scaleStationGci: string;
  supplierPartyGci?: string;
  commodityItemGci?: string;
  harvestLotGci?: string;
  grossWeightKg: number;
  tareWeightKg?: number;
  netWeightKg?: number;
  moisturePct?: number;
  temperatureAmbientC?: number;
  scaleModel?: string;
  rawSerialString?: string;
  issuerPartyId?: string;
  storageUri?: string;
  edgeSigningSecret?: string;
}

export class EvidencePackager {
  public static createWeightTicket(params: CreateWeightTicketParams): WeightTicketPayload {
    if (!isValidWeighStationGci(params.scaleStationGci)) {
      throw new Error(`Invalid weigh station GCI: '${params.scaleStationGci}'`);
    }

    const province = params.province || params.scaleStationGci.split('.')[1] || 'DT';
    const uniqueId = params.ticketId || `TK-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const evidenceId = buildWeightTicketGci(province, uniqueId);

    const gross = Math.round(params.grossWeightKg * 100) / 100;
    const tare = Math.round((params.tareWeightKg ?? 0) * 100) / 100;
    const net = params.netWeightKg !== undefined
      ? Math.round(params.netWeightKg * 100) / 100
      : Math.round((gross - tare) * 100) / 100;

    if (net < 0) {
      throw new Error(`NEGATIVE_NET_WEIGHT: Net weight (${net} kg) cannot be negative`);
    }

    const nowIso = new Date().toISOString();

    const metadataJson: WeightTicketMetadata = {
      ticketNumber: params.ticketNumber || `WT-${Date.now()}`,
      vehiclePlate: params.vehiclePlate.trim().toUpperCase(),
      driverName: params.driverName,
      scaleStationGci: params.scaleStationGci,
      supplierPartyGci: params.supplierPartyGci,
      commodityItemGci: params.commodityItemGci,
      harvestLotGci: params.harvestLotGci,
      grossWeightKg: gross,
      tareWeightKg: tare,
      netWeightKg: net,
      moisturePct: params.moisturePct,
      temperatureAmbientC: params.temperatureAmbientC,
      isStable: true,
      scaleModel: params.scaleModel || 'GENERIC_INDICATOR',
      rawSerialString: params.rawSerialString || '',
      edgeDeviceUuid: randomUUID(),
    };

    // Calculate RFC 8785 Canonical JSON hash
    const fileHashSha256 = computeTicketHash(metadataJson);

    // Generate digital signature if signing secret provided
    let digitalSignature: string | undefined;
    if (params.edgeSigningSecret) {
      digitalSignature = signTicketHash(fileHashSha256, params.edgeSigningSecret);
    }

    const issuer = params.issuerPartyId || `VN.${province}.PARTY.OPERATOR.OP-EDGE-BRIDGE`;
    const storageUri = params.storageUri || `https://storage.gotrace.vn/tickets/${province}/${evidenceId}.json`;

    return {
      evidenceId,
      evidenceType: 'WEIGHT_TICKET',
      fileHashSha256,
      storageUri,
      capturedAt: nowIso,
      issuerPartyId: issuer,
      metadataJson,
      digitalSignature,
      createdAt: nowIso,
    };
  }
}
