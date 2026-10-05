/**
 * GOTRACE Phase 2: MRV Carbon Accounting Engine (1Mha Low-Emission Rice)
 * Implements IPCC Tier 2 methodology for quantifying GHG reductions in AWD rice cultivation.
 *
 * References:
 * - IPCC 2019 Refinement to 2006 IPCC Guidelines (Agriculture - Rice Cultivation)
 * - Đề án 1 Triệu Hecta Lúa Chất Lượng Cao, Phát Thải Thấp Vùng ĐBSCL (Bộ NN&PTNT)
 * - plans/2026-09-27-phase-02-expansion-plan/phase-03-linear-rice-mrv-carbon.md
 */

export interface AwdCultivationLog {
  farm_id: string;
  polygon_id: string;
  farmer_group: string;
  season_crop: "DONG_XUAN" | "HE_THU" | "THU_DONG";
  area_ha: number;
  crop_duration_days: number; // e.g. 95
  pre_season_water_regime: "NON_FLOODED_PRE_SEASON" | "FLOODED_PRE_SEASON";
  water_management: "CONTINUOUS_FLOODING" | "SINGLE_AERATION" | "MULTIPLE_AERATION_AWD";
  organic_amendment_type: "NONE" | "STRAW_INCORPORATED_SHORT" | "STRAW_INCORPORATED_LONG" | "COMPOST";
  verified_dry_cycles_count: number; // e.g. 4 cycles where water table reached -15cm
}

export interface CarbonCreditEstimate {
  area_ha: number;
  baseline_ch4_kg: number;
  awd_ch4_kg: number;
  ch4_reduction_kg: number;
  co2e_reduction_tons: number;
  carbon_price_usd_per_ton: number;
  total_value_usd: number;
  total_value_vnd: number;
  methodology: string;
  certificate_id: string;
  standard_compliance: string[];
}

export interface RiceMassBalance {
  lot_id: string;
  wet_paddy_weight_kg: number;
  wet_moisture_pct: number; // e.g. 26%
  target_dry_moisture_pct: number; // 14%
  technical_loss_pct: number; // 1.5%
  expected_dry_paddy_weight_kg: number;
  actual_dry_paddy_weight_kg: number;
  variance_pct: number;
  is_valid: boolean;
  mismatch_reason?: string;
}

export class MrvCarbonCalculator {
  // Constants from IPCC Tier 2
  private readonly EF_BASELINE = 1.3; // kg CH4/ha/day for continuous flooding
  private readonly GWP_CH4 = 27.9; // IPCC AR6 Global Warming Potential (100-year)
  private readonly USD_TO_VND = 25400;

  /**
   * Calculate GHG reduction and Carbon Credit potential
   */
  public calculateAwdReduction(
    log: AwdCultivationLog,
    carbonPriceUsd: number = 20.0
  ): CarbonCreditEstimate {
    // Scaling Factor for Water Regime (SF_w)
    let sf_w = 1.0;
    if (log.water_management === "SINGLE_AERATION") {
      sf_w = 0.71;
    } else if (log.water_management === "MULTIPLE_AERATION_AWD") {
      sf_w = 0.52; // 48% reduction
    }

    // Scaling Factor for Organic Amendment (SF_o)
    let sf_o = 1.0;
    if (log.organic_amendment_type === "STRAW_INCORPORATED_SHORT") {
      sf_o = 1.25;
    } else if (log.organic_amendment_type === "COMPOST") {
      sf_o = 1.1;
    }

    const baseline_ch4_kg =
      this.EF_BASELINE * 1.0 * sf_o * log.area_ha * log.crop_duration_days;
    const awd_ch4_kg =
      this.EF_BASELINE * sf_w * sf_o * log.area_ha * log.crop_duration_days;

    const ch4_reduction_kg = Math.max(0, baseline_ch4_kg - awd_ch4_kg);
    const co2e_reduction_tons = (ch4_reduction_kg * this.GWP_CH4) / 1000.0;

    const total_value_usd = co2e_reduction_tons * carbonPriceUsd;
    const total_value_vnd = total_value_usd * this.USD_TO_VND;

    const certificate_id = `MRV-VN-RICE-${log.farm_id}-${Date.now().toString(36).toUpperCase()}`;

    return {
      area_ha: log.area_ha,
      baseline_ch4_kg,
      awd_ch4_kg,
      ch4_reduction_kg,
      co2e_reduction_tons,
      carbon_price_usd_per_ton: carbonPriceUsd,
      total_value_usd,
      total_value_vnd,
      methodology: "IPCC Tier 2 (2019 Refinement) - Chapter 5: Agriculture",
      certificate_id,
      standard_compliance: [
        "ISO 14064-2:2019",
        "Quyết định 175/2024/QĐ-TTg",
        "Bộ NN&PTNT Đề án 1Mha Lúa Phát Thải Thấp",
      ],
    };
  }

  /**
   * Reconcile paddy mass balance with natural drying moisture reduction
   */
  public reconcilePaddyMoisture(
    wetWeightKg: number,
    wetMoisturePct: number,
    actualDryWeightKg: number,
    lotId: string
  ): RiceMassBalance {
    const targetDryMoisturePct = 14.0;
    const technicalLossPct = 1.5;

    // Formula: DryWeight = WetWeight * ((100 - WetMoisture) / (100 - DryMoisture)) * (1 - TechnicalLoss)
    const moistureRatio = (100.0 - wetMoisturePct) / (100.0 - targetDryMoisturePct);
    const expectedDryWeight = wetWeightKg * moistureRatio * (1.0 - technicalLossPct / 100.0);

    const varianceKg = actualDryWeightKg - expectedDryWeight;
    const variancePct = (varianceKg / expectedDryWeight) * 100.0;

    // Allowed tolerance: +/- 2.5%
    const isValid = Math.abs(variancePct) <= 2.5;

    return {
      lot_id: lotId,
      wet_paddy_weight_kg: wetWeightKg,
      wet_moisture_pct: wetMoisturePct,
      target_dry_moisture_pct: targetDryMoisturePct,
      technical_loss_pct: technicalLossPct,
      expected_dry_paddy_weight_kg: expectedDryWeight,
      actual_dry_paddy_weight_kg: actualDryWeightKg,
      variance_pct: variancePct,
      is_valid: isValid,
      mismatch_reason: isValid
        ? undefined
        : `Chênh lệch khối lượng ${variancePct.toFixed(2)}% vượt ngưỡng cho phép (±2.5%). Có dấu hiệu pha trộn lúa ngoài vùng!`,
    };
  }
}

export const mrvCarbonCalculator = new MrvCarbonCalculator();
