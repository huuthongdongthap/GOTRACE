/**
 * Unit Test: MRV Carbon Accounting Engine (1Mha Rice - IPCC Tier 2)
 * Verifies Delta E = 3.35 tCO2e/ha @ $20/ton CO2e, AWD dry cycle scaling, and financial valuations.
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import { MrvCarbonCalculator } from "../dist/services/mrvCalculator.js";

describe("MRV Carbon Accounting Engine (IPCC Tier 2)", () => {
  const calculator = new MrvCarbonCalculator();

  it("calculates exact Delta E = 3.35 tCO2e/ha for full 3-cycle AWD at -15cm", () => {
    const result = calculator.calculate({
      plotGci: "VN.DT.PLACE.PLOT.TB-01",
      areaHa: 1.0,
      awdCycles: 3,
      waterLevelMinCm: -15.0,
      carbonPriceUsd: 20.0,
    });

    assert.strictEqual(result.baselineEmissionTCo2ePerHa, 7.2);
    assert.strictEqual(result.netReductionTCo2ePerHa, 3.35);
    assert.strictEqual(result.projectEmissionTCo2ePerHa, 3.85); // 7.2 - 3.35 = 3.85
    assert.strictEqual(result.totalEmissionReductionTCo2e, 3.35);
    assert.strictEqual(result.totalValueUsd, 67.0); // 3.35 * $20 = $67.00
    assert.strictEqual(result.totalValueVnd, 1701800); // $67 * 25,400 = 1,701,800 VND
    assert.strictEqual(result.isCompliant, true);
  });

  it("scales emission reduction proportionally with plot area", () => {
    const area = 2.5; // 2.5 hectares
    const result = calculator.calculate({
      plotGci: "VN.DT.PLACE.PLOT.TB-02",
      areaHa: area,
      awdCycles: 3,
      waterLevelMinCm: -15.0,
      carbonPriceUsd: 20.0,
    });

    // 2.5 ha * 3.35 tCO2e/ha = 8.375 tCO2e
    assert.strictEqual(result.totalEmissionReductionTCo2e, 8.375);
    // 8.375 * $20 = $167.50
    assert.strictEqual(result.totalValueUsd, 167.5);
    // $167.50 * 25,400 = 4,254,500 VND
    assert.strictEqual(result.totalValueVnd, 4254500);
  });

  it("scales net reduction for partial AWD cycles (e.g. 2 cycles and 1 cycle)", () => {
    // 2 cycles out of 3 = 2/3 ratio
    const result2Cycles = calculator.calculate({
      plotGci: "VN.DT.PLACE.PLOT.TB-01",
      areaHa: 1.0,
      awdCycles: 2,
      waterLevelMinCm: -15.0,
    });

    const expected2Cycles = Number(((3.35 * 2) / 3).toFixed(3));
    assert.strictEqual(result2Cycles.netReductionTCo2ePerHa, expected2Cycles);

    // 1 cycle out of 3 = 1/3 ratio
    const result1Cycle = calculator.calculate({
      plotGci: "VN.DT.PLACE.PLOT.TB-01",
      areaHa: 1.0,
      awdCycles: 1,
      waterLevelMinCm: -15.0,
    });

    const expected1Cycle = Number(((3.35 * 1) / 3).toFixed(3));
    assert.strictEqual(result1Cycle.netReductionTCo2ePerHa, expected1Cycle);
  });

  it("rejects or sets 0 reduction when water level is continuously flooded (> 0cm)", () => {
    const resultFlooded = calculator.calculate({
      plotGci: "VN.DT.PLACE.PLOT.TB-01",
      areaHa: 1.0,
      awdCycles: 3,
      waterLevelMinCm: 5.0, // flooded +5cm
    });

    assert.strictEqual(resultFlooded.netReductionTCo2ePerHa, 0);
    assert.strictEqual(resultFlooded.totalEmissionReductionTCo2e, 0);
    assert.strictEqual(resultFlooded.totalValueUsd, 0);
    assert.strictEqual(resultFlooded.isCompliant, false);
  });

  it("validates compliance rules with Đề án 1Mha (QĐ 1490/QĐ-TTg)", () => {
    // Compliant case: >= 2 cycles, water <= -10cm, straw collected, nitrogen reduced
    const compliant = calculator.calculate({
      plotGci: "VN.DT.PLACE.PLOT.TB-01",
      areaHa: 1.5,
      awdCycles: 3,
      waterLevelMinCm: -14.0,
      strawCollectedOffField: true,
      nitrogenReducedPct: 30,
    });
    assert.strictEqual(compliant.isCompliant, true);

    // Non-compliant case: burning straw on field
    const nonCompliantStraw = calculator.calculate({
      plotGci: "VN.DT.PLACE.PLOT.TB-01",
      areaHa: 1.5,
      awdCycles: 3,
      waterLevelMinCm: -14.0,
      strawCollectedOffField: false,
    });
    assert.strictEqual(nonCompliantStraw.isCompliant, false);
  });

  it("formats VND and USD currency correctly", () => {
    assert.strictEqual(MrvCarbonCalculator.formatUsd(67.0), "$67.00");
    const formattedVnd = MrvCarbonCalculator.formatVnd(1701800);
    assert.ok(formattedVnd.includes("1.701.800") || formattedVnd.includes("1,701,800"));
  });
});
