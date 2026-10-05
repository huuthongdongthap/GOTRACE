/**
 * GoTRACE 1Mha MRV Low Emission Rice Carbon Engine
 * Implements IPCC Tier 2 AWD (Alternate Wetting and Drying) emission reduction formulas
 * under MARD Decision 1490/QĐ-BNN-TT.
 */

import type { MrvCalculationResult } from '../models/contracts.ts';
import { mrvCalculator, MrvCalculator } from '@gotrace/zalo-mini-app';

export const IPCC_TIER2_AWD_FACTOR_SF_W = 0.52; // 48% reduction vs continuous flooding
export const BASELINE_EMISSION_PER_HA_TCO2E = 7.2;
export const STANDARD_REDUCTION_PER_HA_TCO2E = MrvCalculator.TARGET_NET_REDUCTION_PER_HA; // 3.35 tCO2e/ha for >= 3 dry cycles
export const CARBON_CREDIT_PRICE_USD = MrvCalculator.DEFAULT_CARBON_PRICE_USD; // $20/ton CO2e

export function calculateAwdEmissionReduction(
  plotGci: string,
  hectares: number,
  dryCycles: number
): MrvCalculationResult {
  if (hectares <= 0) {
    throw new Error('Hectares must be greater than 0');
  }

  if (dryCycles < 0) {
    throw new Error('Dry cycles cannot be negative');
  }

  const calc = mrvCalculator.calculate({
    plotGci,
    areaHa: hectares,
    awdCycles: dryCycles,
    waterLevelMinCm: dryCycles > 0 ? -15.0 : 0.0,
    carbonPriceUsd: CARBON_CREDIT_PRICE_USD,
  });

  return {
    plotGci,
    hectares,
    dryCycles,
    emissionReductionTCo2e: Math.round(calc.totalEmissionReductionTCo2e * 100) / 100,
    carbonCreditValueUsd: calc.totalValueUsd,
    formulaDescription: dryCycles === 0
      ? '0 AWD dry cycles recorded: No emission reduction achieved.'
      : `IPCC Tier 2: ${hectares} ha * 3.35 tCO2e/ha (from ${dryCycles} cycles) @ $20/ton`,
  };
}

