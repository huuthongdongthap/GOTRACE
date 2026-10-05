/**
 * GoTRACE Agricultural Chemical Bag AI OCR Simulator
 * Simulates on-device camera OCR recognition of fertilizer and pesticide packages,
 * extracting brand names, active ingredients, N-P-K ratios, and PHI (Pre-Harvest Interval) quarantine times.
 */

import { OcrResult } from "../types/index.js";

export interface KnownChemicalProduct {
  id: string;
  name: string;
  category: "FERTILIZER" | "PESTICIDE";
  activeIngredients: string[];
  npkRatio?: string;
  phiDays: number;
  safeForExport: boolean;
  notes: string;
}

export const KNOWN_CHEMICAL_CATALOG: KnownChemicalProduct[] = [
  {
    id: "UREA-CAMAU-01",
    name: "Đạm Urê Cà Mau Hạt Đục (PVCFC)",
    category: "FERTILIZER",
    activeIngredients: ["Total Nitrogen (Nts): 46.3%", "Biuret: < 1.0%"],
    npkRatio: "46-0-0",
    phiDays: 0,
    safeForExport: true,
    notes: "Đạt chuẩn Đề án 1Mha khi áp dụng bón vùi sâu giảm 30% lượng phân",
  },
  {
    id: "NPK-BINHDIEN-01",
    name: "Phân NPK 20-20-15+TE Đầu Trâu Bình Điền",
    category: "FERTILIZER",
    activeIngredients: ["N: 20%", "P2O5: 20%", "K2O: 15%", "TE (Zn, B)"],
    npkRatio: "20-20-15",
    phiDays: 0,
    safeForExport: true,
    notes: "Bón đợt 2 và đón đòng, cung cấp trung vi lượng",
  },
  {
    id: "ANVIL-5SC-01",
    name: "Thuốc trừ bệnh Anvil 5SC (Syngenta)",
    category: "PESTICIDE",
    activeIngredients: ["Hexaconazole: 50 g/L", "Phụ gia & Dung môi: 950 g/L"],
    phiDays: 14,
    safeForExport: true,
    notes: "Đặc trị khô vằn, lem lép hạt. Tuân thủ cách ly PHI 14 ngày trước thu hoạch",
  },
  {
    id: "AMISTAR-TOP-01",
    name: "Thuốc trừ nấm bệnh Amistar Top 325SC",
    category: "PESTICIDE",
    activeIngredients: ["Azoxystrobin: 200 g/L", "Difenoconazole: 125 g/L"],
    phiDays: 14,
    safeForExport: true,
    notes: "Kiểm soát đạo ôn và vàng lá. Được phép xuất khẩu thị trường EU/Trung Quốc",
  },
  {
    id: "HUMIC-GOLD-01",
    name: "Phân Bón Hữu Cơ Sinh Học Humic Gold Tây Nam Bộ",
    category: "FERTILIZER",
    activeIngredients: ["Acid Humic: 70%", "Acid Fulvic: 10%", "K2O hữu hiệu: 12%"],
    npkRatio: "0-0-12",
    phiDays: 0,
    safeForExport: true,
    notes: "Cải tạo đất phèn, kích thích ra rễ sâu, phù hợp canh tác hữu cơ",
  },
];

export class OcrSimulator {
  /**
   * Simple deterministic SHA-256 simulation helper for web/tests
   */
  public static generatePhotoHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      hash = (hash << 5) - hash + content.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return `${hex}e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.substring(
      0,
      64
    );
  }

  /**
   * Simulates AI OCR extraction on captured image
   */
  public simulateOcrCapture(
    productIndex = 0,
    photoUri = "blob:gotrace/capture_photo_01.jpg"
  ): OcrResult {
    const catalogItem =
      KNOWN_CHEMICAL_CATALOG[productIndex % KNOWN_CHEMICAL_CATALOG.length];

    const timestamp = Date.now();
    const photoHashSha256 = OcrSimulator.generatePhotoHash(
      `${photoUri}_${catalogItem.id}_${timestamp}`
    );

    return {
      productName: catalogItem.name,
      category: catalogItem.category,
      activeIngredients: catalogItem.activeIngredients,
      npkRatio: catalogItem.npkRatio,
      phiDays: catalogItem.phiDays,
      confidenceScore: 0.96, // 96% confidence
      evidencePhotoGci: `VN.DT.EVIDENCE.GIS_PHOTO.PH-${timestamp}`,
      photoHashSha256,
      safeForExport: catalogItem.safeForExport,
    };
  }
}

export const ocrSimulator = new OcrSimulator();
