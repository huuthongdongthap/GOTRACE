/**
 * Zalo Mini App Test Fixtures
 * GIS Coordinates, MSVT codes, AWD logs, OCR simulations, and HarvestLot payloads.
 */

import type { HarvestLotPayload, AwdLogEntry } from '../models/contracts.ts';

export const MOCK_FARMER_GCI = 'VN.DT.PARTY.FARMER.0912345678';
export const MOCK_COOP_GCI = 'VN.DT.PARTY.COOP.HTX-THANGLOI';
export const MOCK_PLOT_GCI = 'VN.DT.PLACE.PLOT.PLOT-MY-XUONG-01';
export const MOCK_GROWING_AREA_GCI = 'VN.DT.PLACE.GROWING_AREA.MSVT-0881';
export const MOCK_MSVT_CODE = 'VN-DTH-0012';

export const MOCK_HARVEST_LOT_PAYLOAD: HarvestLotPayload = {
  lotId: 'VN.DT.LOT.HARVEST.20260930-OM5451-TB01',
  msvt: MOCK_MSVT_CODE,
  plotGci: MOCK_PLOT_GCI,
  commodity: 'RICE_OM5451',
  estimatedYieldKg: 45000.0,
  harvestDate: '2026-09-30',
  farmerPartyId: MOCK_FARMER_GCI,
  mrvData: {
    awdCycles: 3,
    waterLevelMinCm: -15,
    emissionReductionTCo2e: 10.05, // 3 ha * 3.35 tCO2e/ha
  },
  status: 'REQUESTED',
};

export const MOCK_AWD_LOGS: AwdLogEntry[] = [
  { plotGci: MOCK_PLOT_GCI, timestampUtc: '2026-07-15T02:00:00Z', waterLevelCm: -15, cycleNumber: 1, isDrained: true },
  { plotGci: MOCK_PLOT_GCI, timestampUtc: '2026-08-01T02:00:00Z', waterLevelCm: -15, cycleNumber: 2, isDrained: true },
  { plotGci: MOCK_PLOT_GCI, timestampUtc: '2026-08-18T02:00:00Z', waterLevelCm: -15, cycleNumber: 3, isDrained: true },
];

export const MOCK_OCR_CASES = [
  {
    inputImageName: 'anvil_5sc.jpg',
    rawText: 'THUỐC TRỪ BỆNH ANVIL 5SC HOẠT CHẤT HEXACONAZOLE 50G/L ĐKLH: 123/CNĐK-BVTV',
    expectedActiveIngredients: ['Hexaconazole'],
    expectedProductName: 'ANVIL 5SC',
  },
  {
    inputImageName: 'amistar_top_325sc.jpg',
    rawText: 'AMISTAR TOP 325SC AZOXYSTROBIN 200G/L DIFENOCONAZOLE 125G/L SYNGENTA',
    expectedActiveIngredients: ['Azoxystrobin', 'Difenoconazole'],
    expectedProductName: 'AMISTAR TOP 325SC',
  },
];
