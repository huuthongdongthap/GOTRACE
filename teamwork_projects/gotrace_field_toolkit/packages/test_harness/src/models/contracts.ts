/**
 * GoTRACE Field Integration Toolkit — Core Contracts & Data Models
 * Authoritative source: docs/02_Platform_Object_Implementation_Blueprint.md,
 * spec_miner_blueprint_gci/analysis.md, spec_miner_field_integration/analysis.md
 */

export const VALID_PROVINCES = [
  'DT', 'AG', 'CT', 'TG', 'BT', 'LA', 'BL', 'CM',
  'KG', 'ST', 'TV', 'HG', 'VL', 'SG', 'DN', 'BD', 'LD', 'TN'
] as const;

export type ProvinceCode = typeof VALID_PROVINCES[number];

export const CORE_PRIMITIVES = [
  'PARTY', 'PLACE', 'ITEM', 'LOT', 'EVENT',
  'EVIDENCE', 'CLAIM', 'VERIFY', 'TRANSACTION'
] as const;

export type CorePrimitive = typeof CORE_PRIMITIVES[number];

// Generalized GCI Regex
export const GCI_GENERAL_REGEX =
  /^VN\.(DT|AG|CT|TG|BT|LA|BL|CM|KG|ST|TV|HG|VL|SG|DN|BD|LD|TN)\.(PARTY|PLACE|ITEM|LOT|EVENT|EVIDENCE|CLAIM|VERIFY|TRANSACTION)\.[A-Z0-9_-]+\.[A-Z0-9._-]+$/;

// Specialized GCI Regexes
export const GCI_WEIGH_STATION_REGEX =
  /^VN\.[A-Z]{2,3}\.PLACE\.WEIGH_STATION\.[A-Z0-9_-]+$/;

export const GCI_HARVEST_LOT_REGEX =
  /^VN\.[A-Z]{2,3}\.LOT\.HARVEST\.[A-Z0-9._-]+$/;

export const GCI_FINISHED_LOT_REGEX =
  /^VN\.[A-Z]{2,3}\.LOT\.FINISHED\.[A-Z0-9._-]+$/;

export const GCI_WEIGHT_TICKET_REGEX =
  /^VN\.[A-Z]{2,3}\.EVIDENCE\.WEIGHT_TICKET\.[A-Z0-9._-]+$/;

export const GCI_WEIGHED_EVENT_REGEX =
  /^VN\.[A-Z]{2,3}\.EVENT\.WEIGHED\.[A-Z0-9._-]+$/;

export const GCI_GROWING_AREA_REGEX =
  /^VN\.[A-Z]{2,3}\.PLACE\.GROWING_AREA\.[A-Z0-9_-]+$/;

export const GCI_PLOT_REGEX =
  /^VN\.[A-Z]{2,3}\.PLACE\.PLOT\.[A-Z0-9_-]+$/;

export const GCI_CUSTODY_TRANSFER_REGEX =
  /^VN\.[A-Z]{2,3}\.TRANSACTION\.CUSTODY_TRANSFER\.[A-Z0-9._-]+$/;

// Error Codes
export const ERROR_CODES = {
  INVALID_GCI_SYNTAX: 'INVALID_GCI_SYNTAX',
  INVALID_PROVINCE_CODE: 'INVALID_PROVINCE_CODE',
  UNSTABLE_WEIGHT_DETECTED: 'UNSTABLE_WEIGHT_DETECTED',
  NEGATIVE_NET_WEIGHT: 'NEGATIVE_NET_WEIGHT',
  INVALID_DIGITAL_SIGNATURE: 'INVALID_DIGITAL_SIGNATURE',
  UNAPPROVED_GROWING_AREA: 'UNAPPROVED_GROWING_AREA',
  YIELD_QUOTA_OVERFLOW: 'YIELD_QUOTA_OVERFLOW',
  MASS_BALANCE_MISMATCH: 'MASS_BALANCE_MISMATCH',
  DUPLICATE_TRANSACTION_REF: 'DUPLICATE_TRANSACTION_REF',
  REPLAY_ATTACK_DETECTED: 'REPLAY_ATTACK_DETECTED',
  HMAC_SIGNATURE_MISMATCH: 'HMAC_SIGNATURE_MISMATCH',
  EMPTY_LINE_ITEMS: 'EMPTY_LINE_ITEMS',
  LOT_NOT_FOUND: 'LOT_NOT_FOUND',
  LATENCY_BREACH: 'LATENCY_BREACH',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// Interfaces
export interface GciComponents {
  country: 'VN';
  province: string;
  primitive: CorePrimitive;
  subtype: string;
  id: string;
}

export interface RawWeightReading {
  grossKg: number;
  tareKg: number;
  netKg: number;
  isStable: boolean;
  rawString: string;
  protocol: 'TOLEDO' | 'CAS' | 'YAOHUA';
  timestampMs: number;
}

export interface StabilizationResult {
  isStable: boolean;
  stableWeightKg: number | null;
  varianceKg: number;
  durationSeconds: number;
  sampleCount: number;
}

export interface WeightTicketMetadata {
  ticketNumber: string;
  vehiclePlate: string;
  driverName?: string;
  scaleStationGci: string;
  supplierPartyGci?: string;
  commodityItemGci?: string;
  harvestLotGci?: string;
  grossWeightKg: number;
  tareWeightKg: number;
  netWeightKg: number;
  moisturePct?: number;
  temperatureAmbientC?: number;
  isStable: boolean;
  scaleModel: string;
  rawSerialString: string;
}

export interface WeightTicketPayload {
  evidenceId: string;
  evidenceType: 'WEIGHT_TICKET';
  fileHashSha256: string;
  storageUri: string;
  capturedAt: string;
  issuerPartyId: string;
  metadataJson: WeightTicketMetadata;
  digitalSignature?: string;
  createdAt: string;
}

export interface WeighedEventPayload {
  eventId: string;
  eventType: 'WEIGHED';
  timestampUtc: string;
  placeId: string;
  operatorPartyId: string;
  inputLots: string[];
  outputLots: string[];
  telemetryData: {
    weightKg: number;
    grossWeightKg: number;
    tareWeightKg: number;
    moisturePct?: number;
    temperatureCelsius?: number;
    sensorId: string;
    rawSerialFrame: string;
    readings?: {
      scaleOscillationDelta?: number;
      settlingDurationSeconds?: number;
    };
  };
  evidenceRefs: string[];
  eventHashSha256: string;
  createdAt: string;
}

export interface HarvestLotPayload {
  lotId: string;
  msvt: string;
  plotGci: string;
  commodity: string;
  estimatedYieldKg: number;
  harvestDate: string;
  farmerPartyId: string;
  mrvData: {
    awdCycles: number;
    waterLevelMinCm: number;
    emissionReductionTCo2e: number;
  };
  status: 'REQUESTED' | 'CUTTING' | 'WEIGHED' | 'RECEIVED_AT_MILL';
}

export interface ErpDeliveryOrderWebhook {
  eventId: string;
  erpSource: 'BRAVO_8' | 'MISA_AMIS' | 'SAP_S4HANA';
  orderId: string;
  warehouseGci: string;
  carrierPartyGci?: string;
  customerPartyGci: string;
  deliveryDate: string;
  vehiclePlate?: string;
  lineItems: Array<{
    itemCode: string;
    lotNumber: string;
    quantity: number;
    uom: string;
    grossWeightKg?: number;
    netWeightKg: number;
    mfgDate?: string;
    expDate?: string;
  }>;
  issuedByAccountant: string;
  timestampUtc: string;
}

export interface TraceabilityLabelResponse {
  traceabilityId: string;
  qrPayload: string;
  qrImageBase64: string;
  zplCode: string;
  generationLatencyMs: number;
}

export interface AwdLogEntry {
  plotGci: string;
  timestampUtc: string;
  waterLevelCm: number; // e.g. -15 to 0
  cycleNumber: number;
  isDrained: boolean;
}

export interface MrvCalculationResult {
  plotGci: string;
  hectares: number;
  dryCycles: number;
  emissionReductionTCo2e: number;
  carbonCreditValueUsd: number;
  formulaDescription: string;
}

export interface OcrResult {
  rawText: string;
  productName: string;
  activeIngredients: string[];
  registrationNumber?: string;
  manufacturer?: string;
  confidenceScore: number;
}

export interface OfflineQueueItem {
  id: string;
  eventType: 'PLANTED' | 'TREATED' | 'AWD_RECORDED' | 'HARVEST_REQUESTED';
  payload: Record<string, unknown>;
  timestampUtc: string;
  syncStatus: 'PENDING_SYNC' | 'SYNCED' | 'FAILED';
  retryCount: number;
}
