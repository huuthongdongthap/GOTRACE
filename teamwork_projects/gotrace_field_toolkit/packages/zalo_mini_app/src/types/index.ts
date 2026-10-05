/**
 * GoTRACE Field Integration Toolkit - Zalo Mini App Types
 * Defines canonical data structures for 3-button UX, AWD MRV Carbon, and GCI syntax.
 */

export type CommodityType =
  | "RICE_OM5451"
  | "RICE_ST25"
  | "RICE_OM18"
  | "RICE_DT8"
  | "MANGO_CAT_CHU"
  | "DURIAN_RI6";

export type LotStatus = "REQUESTED" | "CUTTING" | "WEIGHED" | "RECEIVED_AT_MILL";

export type TransportType = "WATERWAY_BARGE" | "ROAD_TRUCK";

export type SoilStatus = "FLOODED" | "MOIST" | "CRACKED_DRY";

export type AwdWaterAction = "PUMP_IN" | "DRAIN_OUT";

export interface FarmerProfile {
  partyId: string; // GCI: VN.<PROV>.PARTY.FARMER.<PHONE>
  fullName: string;
  phone: string;
  citizenId: string;
  cooperativeGci: string; // GCI: VN.<PROV>.PARTY.COOP.<ID>
  cooperativeName: string;
  provinceCode: string; // "DT", "AG", "CT", "TG"
  isEkycVerified: boolean;
}

export interface GisPlot {
  plotGci: string; // GCI: VN.<PROV>.PLACE.PLOT.<ID>
  plotName: string;
  areaHa: number;
  msvt: string; // e.g. "VN-DTH-0012"
  growingAreaGci: string; // GCI: VN.<PROV>.PLACE.GROWING_AREA.<ID>
  polygon: [number, number][]; // Array of [lat, lng]
  centerCoordinate: { latitude: number; longitude: number };
  currentCropStatus: "IDLE" | "GROWING" | "HARVEST_READY" | "HARVESTED";
}

export interface MsvtRecord {
  code: string; // e.g. "VN-DTH-0012"
  gci: string; // GCI: VN.<PROV>.PLACE.GROWING_AREA.<ID>
  name: string;
  commodity: CommodityType;
  variety: string;
  approvedMarkets: string[];
  maxYieldTonsPerHa: number;
  currentPlantedHa: number;
  totalQuotaTons: number;
}

export interface CropPlanEventPayload {
  eventId: string; // GCI: VN.<PROV>.EVENT.CROP_PLAN_CREATED.<UUID>
  eventType: "CROP_PLAN_CREATED";
  farmerPartyId: string;
  plotGci: string;
  msvt: string;
  commodity: CommodityType;
  variety: string;
  sowingDate: string; // YYYY-MM-DD
  gpsCoordinates: { latitude: number; longitude: number };
  gisMatched: boolean;
  mrvEnrolled: boolean;
  timestamp: string; // ISO 8601
}

export interface AwdLogPayload {
  eventId: string; // GCI: VN.<PROV>.EVENT.AWD_LOG.<UUID>
  eventType: "AWD_LOG";
  plotGci: string;
  action: AwdWaterAction;
  waterLevelCm: number; // e.g. -15 to +10
  soilStatus: SoilStatus;
  cycleNumber: number;
  photoUri: string;
  photoHashSha256: string;
  gpsCoordinates: { latitude: number; longitude: number };
  timestamp: string;
}

export interface OcrResult {
  productName: string;
  category: "FERTILIZER" | "PESTICIDE";
  activeIngredients: string[];
  npkRatio?: string;
  phiDays: number;
  confidenceScore: number; // 0.0 to 1.0
  evidencePhotoGci: string;
  photoHashSha256: string;
  safeForExport: boolean;
}

export interface InputAppliedPayload {
  eventId: string; // GCI: VN.<PROV>.EVENT.INPUT_APPLIED.<UUID>
  eventType: "INPUT_APPLIED";
  plotGci: string;
  farmerPartyId: string;
  ocrData: OcrResult;
  appliedDate: string;
  timestamp: string;
}

export interface MrvCarbonCalculation {
  plotGci: string;
  areaHa: number;
  cropDurationDays: number;
  awdCycles: number;
  waterLevelMinCm: number;
  baselineEmissionTCo2ePerHa: number; // 7.20 tCO2e/ha
  projectEmissionTCo2ePerHa: number; // 3.85 tCO2e/ha
  netReductionTCo2ePerHa: number; // 3.35 tCO2e/ha
  totalEmissionReductionTCo2e: number; // area * 3.35 (scaled by cycles)
  carbonPriceUsdPerTon: number; // $20.00
  totalValueUsd: number;
  totalValueVnd: number; // USD * 25,400
  methodology: string;
  isCompliant: boolean;
}

export interface HarvestLotPayload {
  lotId: string; // GCI: VN.<PROV>.LOT.HARVEST.<ID>
  msvt: string; // Mã số vùng trồng, e.g. "VN-DTH-0012"
  plotGci: string; // GCI: VN.<PROV>.PLACE.PLOT.<ID>
  commodity: string; // e.g. "RICE_OM5451"
  estimatedYieldKg: number;
  harvestDate: string; // YYYY-MM-DD
  farmerPartyId: string; // GCI: VN.<PROV>.PARTY.FARMER.<PHONE>
  mrvData: {
    awdCycles: number;
    waterLevelMinCm: number;
    emissionReductionTCo2e: number;
  };
  status: LotStatus;
  transportType: TransportType;
  vehiclePlate: string;
  destinationFacilityGci: string;
  qrPayloadUrl: string;
  createdAt: string;
}

export type OfflineQueueEventType =
  | "CROP_PLAN_CREATED"
  | "AWD_LOG"
  | "INPUT_APPLIED"
  | "HARVEST_REQUEST";

export interface OfflineQueueItem<T = unknown> {
  id: string; // UUID
  type: OfflineQueueEventType;
  payload: T;
  status: "PENDING" | "SYNCING" | "SYNCED" | "FAILED";
  createdAt: string;
  retryCount: number;
  lastError?: string;
}

/**
 * Strict GCI Identifier regular expression:
 * Syntax: VN.<PROVINCE>.<PRIMITIVE>.<SUBTYPE>.<ID>
 * e.g. VN.DT.LOT.HARVEST.20261115-OM5451-TB01
 */
export const GCI_REGEX = /^VN\.[A-Z]{2,4}\.[A-Z_]+\.[A-Z0-9_]+\.[A-Za-z0-9_\-]+$/;

export function isValidGci(gci: string): boolean {
  if (!gci || typeof gci !== "string") return false;
  return GCI_REGEX.test(gci);
}

export function generateGci(
  province: string,
  primitive: string,
  subtype: string,
  id: string
): string {
  const prov = province.toUpperCase().trim();
  const prim = primitive.toUpperCase().trim();
  const sub = subtype.toUpperCase().trim();
  const cleanId = id.trim().replace(/[^A-Za-z0-9_\-]/g, "_");
  return `VN.${prov}.${prim}.${sub}.${cleanId}`;
}
