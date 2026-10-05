/**
 * GoTRACE IoT Weighbridge Edge Bridge — Types and Contracts
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

export type ScaleProtocol = 'TOLEDO' | 'CAS' | 'YAOHUA';

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
  protocol: ScaleProtocol;
  timestampMs: number;
  statusFlags?: {
    overload?: boolean;
    motion?: boolean;
    underload?: boolean;
    centerOfZero?: boolean;
    unit?: string;
    rawHeader?: string;
  };
}

export interface StabilizationConfig {
  windowSeconds?: number;
  sampleRateHz?: number;
  sampleCount?: number;
  maxVarianceKg?: number;
  minWeightThresholdKg?: number;
  requireHardwareStability?: boolean;
  hysteresisReleaseKg?: number;
  hysteresisDurationSeconds?: number;
}

export interface StabilizationResult {
  isStable: boolean;
  stableWeightKg: number | null;
  grossWeightKg: number | null;
  tareWeightKg: number | null;
  netWeightKg: number | null;
  varianceKg: number;
  durationSeconds: number;
  sampleCount: number;
  meanKg: number;
  minKg: number;
  maxKg: number;
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
  edgeDeviceUuid?: string;
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

export type SimulatorState = 'EMPTY' | 'APPROACH' | 'BOUNCE' | 'STEADY' | 'DEPART';

export interface SimulatorOptions {
  protocol?: ScaleProtocol;
  targetWeightKg?: number;
  tareWeightKg?: number;
  vehiclePlate?: string;
  stationGci?: string;
  scaleModel?: string;
  sampleRateHz?: number;
  approachDurationSeconds?: number;
  bounceDurationSeconds?: number;
  steadyDurationSeconds?: number;
  departDurationSeconds?: number;
  noiseStdDevKg?: number;
  autoLoop?: boolean;
  port?: number;
}
