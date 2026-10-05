/**
 * GoTRACE MRV Carbon Accounting Engine (1Mha Low-Emission Rice)
 * Implements IPCC Tier 2 methodology for calculating methane emission reduction
 * and carbon credit revenue via Alternate Wetting and Drying (AWD).
 *
 * References:
 * - IPCC 2019 Refinement to 2006 Guidelines (Agriculture - Rice Cultivation)
 * - Đề án 1 Triệu Hecta Lúa Chất Lượng Cao, Phát Thải Thấp Vùng ĐBSCL (QĐ 1490/QĐ-TTg)
 * - GoTRACE Rice Playbook Chapter 22 & 23
 */

import { MrvCarbonCalculation } from "../types/index.js";

export interface AwdCalculationInput {
  plotGci: string;
  areaHa: number;
  cropDurationDays?: number; // default 95 days
  awdCycles: number; // count of completed dry cycles where water reached -15cm
  waterLevelMinCm: number; // minimum water depth recorded, e.g. -15
  carbonPriceUsd?: number; // default $20/tCO2e
  strawCollectedOffField?: boolean; // default true
  nitrogenReducedPct?: number; // default 30%
}

export class MrvCarbonCalculator {
  // IPCC Tier 2 Constants
  public static readonly BASELINE_EMISSION_PER_HA = 7.2; // tCO2e/ha/crop
  public static readonly TARGET_NET_REDUCTION_PER_HA = 3.35; // tCO2e/ha/crop
  public static readonly FULL_PROJECT_EMISSION_PER_HA = 3.85; // 7.20 - 3.35 = 3.85 tCO2e/ha
  public static readonly DEFAULT_CARBON_PRICE_USD = 20.0; // $20/ton CO2e
  public static readonly USD_TO_VND_RATE = 25400; // Exchange rate
  public static readonly OPTIMAL_DRY_WATER_LEVEL_CM = -15.0; // Water level threshold
  public static readonly RECOMMENDED_AWD_CYCLES = 3; // 3 dry cycles per season

  /**
   * Calculates IPCC Tier 2 net emission reduction and economic carbon credit valuation.
   * Delta E = 3.35 tCO2e/ha for complete 3-cycle AWD regime.
   */
  public calculate(input: AwdCalculationInput): MrvCarbonCalculation {
    const {
      plotGci,
      areaHa,
      cropDurationDays = 95,
      awdCycles,
      waterLevelMinCm,
      carbonPriceUsd = MrvCarbonCalculator.DEFAULT_CARBON_PRICE_USD,
      strawCollectedOffField = true,
      nitrogenReducedPct = 30,
    } = input;

    // Validate inputs
    const validArea = Math.max(0.1, Number(areaHa) || 1.0);
    const validCycles = Math.max(0, Math.floor(Number(awdCycles) || 0));
    const validWaterLevel = Number(waterLevelMinCm) || 0;

    // Scaling fraction based on verified dry cycles (capped at 3 cycles for full 3.35 tCO2e/ha)
    // Water level must reach at least -10cm to be counted as effective aeration
    let effectiveCyclesRatio = 0;
    if (validWaterLevel <= -10.0) {
      effectiveCyclesRatio = Math.min(
        1.0,
        validCycles / MrvCarbonCalculator.RECOMMENDED_AWD_CYCLES
      );
    } else if (validWaterLevel < 0) {
      // Partial aeration (e.g. between 0 and -10cm)
      effectiveCyclesRatio =
        (Math.min(1.0, validCycles / MrvCarbonCalculator.RECOMMENDED_AWD_CYCLES) *
          Math.abs(validWaterLevel)) /
        15.0;
    }

    const netReductionPerHa = Number(
      (MrvCarbonCalculator.TARGET_NET_REDUCTION_PER_HA * effectiveCyclesRatio).toFixed(3)
    );

    const projectEmissionPerHa = Number(
      (MrvCarbonCalculator.BASELINE_EMISSION_PER_HA - netReductionPerHa).toFixed(3)
    );

    const totalEmissionReductionTCo2e = Number(
      (netReductionPerHa * validArea).toFixed(3)
    );

    const totalValueUsd = Number(
      (totalEmissionReductionTCo2e * carbonPriceUsd).toFixed(2)
    );

    const totalValueVnd = Math.round(
      totalValueUsd * MrvCarbonCalculator.USD_TO_VND_RATE
    );

    const isCompliant =
      validCycles >= 2 &&
      validWaterLevel <= -10.0 &&
      strawCollectedOffField &&
      nitrogenReducedPct >= 20;

    return {
      plotGci,
      areaHa: validArea,
      cropDurationDays,
      awdCycles: validCycles,
      waterLevelMinCm: validWaterLevel,
      baselineEmissionTCo2ePerHa: MrvCarbonCalculator.BASELINE_EMISSION_PER_HA,
      projectEmissionTCo2ePerHa: projectEmissionPerHa,
      netReductionTCo2ePerHa: netReductionPerHa,
      totalEmissionReductionTCo2e,
      carbonPriceUsdPerTon: carbonPriceUsd,
      totalValueUsd,
      totalValueVnd,
      methodology: "IPCC Tier 2 (2019 Refinement) - Chapter 5: Agriculture",
      isCompliant,
    };
  }

  /**
   * Helper to format currency in Vietnamese Dong (e.g. "1.701.800 đ")
   */
  public static formatVnd(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  /**
   * Helper to format USD (e.g. "$67.00")
   */
  public static formatUsd(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
}

export const mrvCalculator = new MrvCarbonCalculator();
export const MrvCalculator = MrvCarbonCalculator;
export type MrvCalculator = MrvCarbonCalculator;
