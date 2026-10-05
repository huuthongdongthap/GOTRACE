/**
 * GoTRACE GIS Plot Polygon Matcher
 * Ray-casting Point-in-Polygon algorithm for matching on-field GPS coordinates
 * with pre-registered agricultural plot boundaries and MSVT growing areas.
 */

import { GisPlot, MsvtRecord, FarmerProfile } from "../types/index.js";

export const MOCK_FARMER_PROFILE: FarmerProfile = {
  partyId: "VN.DT.PARTY.FARMER.0918234567",
  fullName: "Nguyễn Văn Nam",
  phone: "0918234567",
  citizenId: "087090001234",
  cooperativeGci: "VN.DT.PARTY.COOP.HTX-THANGLOI",
  cooperativeName: "HTX Nông Nghiệp Thắng Lợi - Cao Lãnh, Đồng Tháp",
  provinceCode: "DT",
  isEkycVerified: true,
};

export const MOCK_MSVT_LIST: MsvtRecord[] = [
  {
    code: "VN-DTH-0012",
    gci: "VN.DT.PLACE.GROWING_AREA.MSVT-0012",
    name: "Vùng lúa phát thải thấp Thắng Lợi - Cao Lãnh",
    commodity: "RICE_OM5451",
    variety: "OM5451",
    approvedMarkets: ["VIETNAM", "CHINA", "EU"],
    maxYieldTonsPerHa: 7.5,
    currentPlantedHa: 120.5,
    totalQuotaTons: 900.0,
  },
  {
    code: "VN-DTH-0025",
    gci: "VN.DT.PLACE.GROWING_AREA.MSVT-0025",
    name: "Vùng lúa đặc sản ST25 Tam Nông",
    commodity: "RICE_ST25",
    variety: "ST25",
    approvedMarkets: ["VIETNAM", "EU", "USA"],
    maxYieldTonsPerHa: 6.8,
    currentPlantedHa: 85.0,
    totalQuotaTons: 578.0,
  },
  {
    code: "VN-DTH-0088",
    gci: "VN.DT.PLACE.GROWING_AREA.MSVT-0088",
    name: "Vùng xoài Cát Chu xuất khẩu Mỹ Xương",
    commodity: "MANGO_CAT_CHU",
    variety: "Cát Chu Cao Lãnh",
    approvedMarkets: ["CHINA", "AUSTRALIA", "JAPAN", "USA"],
    maxYieldTonsPerHa: 25.0,
    currentPlantedHa: 45.0,
    totalQuotaTons: 1125.0,
  },
];

export const MOCK_PLOTS: GisPlot[] = [
  {
    plotGci: "VN.DT.PLACE.PLOT.TB-01",
    plotName: "Thửa 4 - Lung Lớn (1.5 ha)",
    areaHa: 1.5,
    msvt: "VN-DTH-0012",
    growingAreaGci: "VN.DT.PLACE.GROWING_AREA.MSVT-0012",
    centerCoordinate: { latitude: 10.4582, longitude: 105.6321 },
    polygon: [
      [10.457, 105.631],
      [10.46, 105.631],
      [10.46, 105.634],
      [10.457, 105.634],
      [10.457, 105.631],
    ],
    currentCropStatus: "IDLE",
  },
  {
    plotGci: "VN.DT.PLACE.PLOT.TB-02",
    plotName: "Thửa 7 - Kênh Giữa (2.2 ha)",
    areaHa: 2.2,
    msvt: "VN-DTH-0012",
    growingAreaGci: "VN.DT.PLACE.GROWING_AREA.MSVT-0012",
    centerCoordinate: { latitude: 10.4615, longitude: 105.6358 },
    polygon: [
      [10.46, 105.634],
      [10.463, 105.634],
      [10.463, 105.638],
      [10.46, 105.638],
      [10.46, 105.634],
    ],
    currentCropStatus: "GROWING",
  },
  {
    plotGci: "VN.DT.PLACE.PLOT.MX-03",
    plotName: "Thửa 12 - Vườn Xoài Cát Chu (1.0 ha)",
    areaHa: 1.0,
    msvt: "VN-DTH-0088",
    growingAreaGci: "VN.DT.PLACE.GROWING_AREA.MSVT-0088",
    centerCoordinate: { latitude: 10.435, longitude: 105.712 },
    polygon: [
      [10.434, 105.71],
      [10.436, 105.71],
      [10.436, 105.714],
      [10.434, 105.714],
      [10.434, 105.71],
    ],
    currentCropStatus: "HARVEST_READY",
  },
];

export class GisMatcher {
  /**
   * Ray-casting algorithm to test if a point (lat, lng) is inside a polygon
   */
  public static isPointInPolygon(
    lat: number,
    lng: number,
    polygon: [number, number][]
  ): boolean {
    if (!polygon || polygon.length < 3) return false;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect =
        yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  }

  /**
   * Matches current device GPS with the most relevant plot in the cooperative
   */
  public static matchPlotByGps(
    lat: number,
    lng: number,
    plots: GisPlot[] = MOCK_PLOTS
  ): { matchedPlot: GisPlot | null; isInsidePolygon: boolean } {
    for (const plot of plots) {
      if (this.isPointInPolygon(lat, lng, plot.polygon)) {
        return { matchedPlot: plot, isInsidePolygon: true };
      }
    }

    // If outside, find nearest plot within 500m
    let nearestPlot: GisPlot | null = null;
    let minDistance = Infinity;

    for (const plot of plots) {
      const dLat = plot.centerCoordinate.latitude - lat;
      const dLng = plot.centerCoordinate.longitude - lng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestPlot = plot;
      }
    }

    // If within ~0.005 degrees (~550m), return as matched but outside polygon
    const isNearby = minDistance < 0.005;
    return {
      matchedPlot: isNearby ? nearestPlot : (plots[0] ?? null),
      isInsidePolygon: false,
    };
  }
}
