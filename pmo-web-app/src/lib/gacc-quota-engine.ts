/**
 * GOTRACE Phase 2: GACC Quota & Compliance Verification Engine
 * Implements GACC Order 280 & 281 compliance logic for Vietnamese fruit exports to China.
 *
 * References:
 * - Lệnh 280 / 281 GACC (Tổng cục Hải quan Trung Quốc)
 * - plans/2026-09-27-phase-02-expansion-plan/phase-02-branching-fruit-gacc-compliance.md
 */

export interface GaccPlantingArea {
  msvt_code: string; // e.g. "MSVT-DT-CR-7810"
  crop_type: "DURIAN" | "MANGO" | "DRAGON_FRUIT" | "JACKFRUIT";
  hs_code: string; // e.g. "0810.60.00"
  registered_area_ha: number; // e.g. 50.0 ha
  yield_standard_ton_per_ha: number; // e.g. 18.0 tấn/ha
  max_authorized_quota_tons: number; // 50 * 18 = 900 tấn
  exported_tons_ytd: number; // Lũy kế đã xuất khẩu
  expiry_date: string;
  status: "ACTIVE" | "SUSPENDED" | "EXPIRED";
}

export interface GaccLotInspection {
  lot_id: string;
  msvt_code: string;
  hs_code: string;
  shipment_weight_tons: number;
  cadmium_level_mg_kg?: number; // Max allowed 0.05 mg/kg for Durian
  auramine_o_detected?: boolean; // Must be false (chất vàng ô)
  residue_compliant: boolean; // Dư lượng BVTV đạt chuẩn MRL
  packing_house_gci: string;
}

export interface GaccAuditResult {
  lot_id: string;
  verdict: "APPROVED" | "REJECTED" | "FLAGGED_INSPECTION";
  quota_available_before_tons: number;
  quota_remaining_after_tons: number;
  rejection_reasons: string[];
  compliance_details: {
    quota_check: boolean;
    cadmium_check: boolean;
    auramine_check: boolean;
    msvt_status_check: boolean;
  };
  audit_timestamp: string;
}

export class GaccQuotaEngine {
  private plantingAreas: Map<string, GaccPlantingArea> = new Map();

  constructor() {
    // Seed initial MSVT registries
    this.registerArea({
      msvt_code: "MSVT-DT-CR-7810",
      crop_type: "DURIAN",
      hs_code: "0810.60.00",
      registered_area_ha: 50.0,
      yield_standard_ton_per_ha: 18.0,
      max_authorized_quota_tons: 900.0,
      exported_tons_ytd: 612.0, // 68% utilized
      expiry_date: "2027-12-31",
      status: "ACTIVE",
    });

    this.registerArea({
      msvt_code: "MSVT-DT-XOAI-9902",
      crop_type: "MANGO",
      hs_code: "0804.50.20",
      registered_area_ha: 80.0,
      yield_standard_ton_per_ha: 15.0,
      max_authorized_quota_tons: 1200.0,
      exported_tons_ytd: 480.0, // 40% utilized
      expiry_date: "2027-10-30",
      status: "ACTIVE",
    });
  }

  public registerArea(area: GaccPlantingArea): void {
    this.plantingAreas.set(area.msvt_code, area);
  }

  public getPlantingArea(msvtCode: string): GaccPlantingArea | undefined {
    return this.plantingAreas.get(msvtCode);
  }

  public evaluateShipment(inspection: GaccLotInspection): GaccAuditResult {
    const reasons: string[] = [];
    const area = this.plantingAreas.get(inspection.msvt_code);

    if (!area) {
      return {
        lot_id: inspection.lot_id,
        verdict: "REJECTED",
        quota_available_before_tons: 0,
        quota_remaining_after_tons: 0,
        rejection_reasons: [`Mã số vùng trồng (MSVT) ${inspection.msvt_code} không tồn tại trên hệ thống GACC`],
        compliance_details: {
          quota_check: false,
          cadmium_check: false,
          auramine_check: false,
          msvt_status_check: false,
        },
        audit_timestamp: new Date().toISOString(),
      };
    }

    // Check 1: MSVT Active
    const msvtActive = area.status === "ACTIVE";
    if (!msvtActive) {
      reasons.push(`Mã vùng trồng ${area.msvt_code} đang bị đình chỉ hoặc hết hạn (${area.status})`);
    }

    // Check 2: Quota check
    const quotaAvailable = area.max_authorized_quota_tons - area.exported_tons_ytd;
    const quotaValid = inspection.shipment_weight_tons <= quotaAvailable;
    if (!quotaValid) {
      reasons.push(
        `Vượt hạn ngạch xuất khẩu cho phép: Cần ${inspection.shipment_weight_tons} tấn nhưng chỉ còn ${quotaAvailable.toFixed(1)} tấn khả dụng`
      );
    }

    // Check 3: Cadmium check (for Durian, max 0.05 mg/kg)
    let cadmiumValid = true;
    if (area.crop_type === "DURIAN" && inspection.cadmium_level_mg_kg !== undefined) {
      if (inspection.cadmium_level_mg_kg > 0.05) {
        cadmiumValid = false;
        reasons.push(
          `Hàm lượng Cadmium ${inspection.cadmium_level_mg_kg} mg/kg vượt ngưỡng kiểm dịch tối đa 0.05 mg/kg`
        );
      }
    }

    // Check 4: Auramine O (Chất vàng ô)
    let auramineValid = true;
    if (inspection.auramine_o_detected === true) {
      auramineValid = false;
      reasons.push("Phát hiện chất cấm Vàng ô (Auramine O) nhuộm vỏ trái cây!");
    }

    const approved = msvtActive && quotaValid && cadmiumValid && auramineValid && inspection.residue_compliant;

    let verdict: "APPROVED" | "REJECTED" | "FLAGGED_INSPECTION" = "APPROVED";
    if (!approved) {
      verdict = !cadmiumValid || !auramineValid ? "REJECTED" : "FLAGGED_INSPECTION";
    }

    const quotaRemaining = approved
      ? quotaAvailable - inspection.shipment_weight_tons
      : quotaAvailable;

    if (approved) {
      area.exported_tons_ytd += inspection.shipment_weight_tons;
    }

    return {
      lot_id: inspection.lot_id,
      verdict,
      quota_available_before_tons: quotaAvailable,
      quota_remaining_after_tons: quotaRemaining,
      rejection_reasons: reasons,
      compliance_details: {
        quota_check: quotaValid,
        cadmium_check: cadmiumValid,
        auramine_check: auramineValid,
        msvt_status_check: msvtActive,
      },
      audit_timestamp: new Date().toISOString(),
    };
  }
}

export const gaccQuotaEngine = new GaccQuotaEngine();
