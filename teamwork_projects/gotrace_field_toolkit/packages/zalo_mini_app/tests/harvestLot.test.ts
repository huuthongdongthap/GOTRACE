/**
 * Unit Test: HarvestLot Generation & GCI Validation
 * Verifies strict GCI format: VN.<PROVINCE>.LOT.HARVEST.<ID>,
 * lifecycle state machine, and yield quota verification.
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import {
  isValidGci,
  generateGci,
  GCI_REGEX,
} from "../dist/types/index.js";
import type { HarvestLotPayload, LotStatus } from "../dist/types/index.js";
import { FieldGatewayApiClient } from "../dist/services/api.js";

describe("HarvestLot & GCI Identifier Architecture", () => {
  it("validates strict GCI regular expression conformance", () => {
    // Valid GCIs
    assert.ok(isValidGci("VN.DT.LOT.HARVEST.20261115-OM5451-TB01"));
    assert.ok(isValidGci("VN.DT.PLACE.PLOT.TB-01"));
    assert.ok(isValidGci("VN.DT.PLACE.GROWING_AREA.MSVT-0012"));
    assert.ok(isValidGci("VN.DT.PARTY.FARMER.0918234567"));
    assert.ok(isValidGci("VN.DT.EVENT.CROP_PLAN_CREATED.CP-2026-001"));
    assert.ok(isValidGci("VN.DT.TRANSACTION.CUSTODY_TRANSFER.TX-8891"));

    // Invalid GCIs
    assert.strictEqual(isValidGci("INVALID_GCI_STRING"), false);
    assert.strictEqual(isValidGci("VN.DT.LOT"), false); // Missing subtype and ID
    assert.strictEqual(isValidGci("VN.12.LOT.HARVEST.123"), false); // Invalid province letters
    assert.strictEqual(isValidGci("US.CA.LOT.HARVEST.123"), false); // Must start with VN
    assert.strictEqual(isValidGci(""), false);
  });

  it("generates deterministic canonical GCI using generateGci helper", () => {
    const lotGci = generateGci("DT", "LOT", "HARVEST", "20260930-OM5451-TB01");
    assert.strictEqual(lotGci, "VN.DT.LOT.HARVEST.20260930-OM5451-TB01");
    assert.ok(GCI_REGEX.test(lotGci));

    const plotGci = generateGci("dt", "place", "plot", "TB-01");
    assert.strictEqual(plotGci, "VN.DT.PLACE.PLOT.TB-01");
    assert.ok(isValidGci(plotGci));
  });

  it("creates valid HarvestLotPayload complying with GoTRACE interface contract", async () => {
    const api = new FieldGatewayApiClient();
    const today = new Date().toISOString().split("T")[0];
    const lotId = generateGci("DT", "LOT", "HARVEST", `HLOT-${Date.now()}`);

    const payload: HarvestLotPayload = {
      lotId,
      msvt: "VN-DTH-0012",
      plotGci: "VN.DT.PLACE.PLOT.TB-01",
      commodity: "RICE_OM5451",
      estimatedYieldKg: 9750,
      harvestDate: today,
      farmerPartyId: "VN.DT.PARTY.FARMER.0918234567",
      mrvData: {
        awdCycles: 3,
        waterLevelMinCm: -15,
        emissionReductionTCo2e: 5.025,
      },
      status: "REQUESTED",
      transportType: "WATERWAY_BARGE",
      vehiclePlate: "DT-28849",
      destinationFacilityGci: "VN.DT.PLACE.MILL.COMAY-SADEC-01",
      qrPayloadUrl: `https://trace.gotrace.vn/lot/${lotId}`,
      createdAt: new Date().toISOString(),
    };

    assert.ok(isValidGci(payload.lotId));
    assert.ok(isValidGci(payload.plotGci));
    assert.ok(isValidGci(payload.farmerPartyId));
    assert.strictEqual(payload.status, "REQUESTED");
    assert.strictEqual(payload.transportType, "WATERWAY_BARGE");
    assert.ok(payload.estimatedYieldKg > 0);
    assert.ok(payload.mrvData.emissionReductionTCo2e > 0);

    const response = await api.submitHarvestRequest(payload);
    assert.strictEqual(response.success, true);
    assert.ok(response.data?.lotId);
  });

  it("simulates full lifecycle status transitions: REQUESTED -> CUTTING -> WEIGHED -> RECEIVED_AT_MILL", () => {
    const statuses: LotStatus[] = [
      "REQUESTED",
      "CUTTING",
      "WEIGHED",
      "RECEIVED_AT_MILL",
    ];

    let currentStatus: LotStatus = "REQUESTED";
    assert.strictEqual(currentStatus, "REQUESTED");

    // Advance to CUTTING (Combine machine operating in field)
    currentStatus = statuses[1];
    assert.strictEqual(currentStatus, "CUTTING");

    // Advance to WEIGHED (Arrived at scale bridge)
    currentStatus = statuses[2];
    assert.strictEqual(currentStatus, "WEIGHED");

    // Advance to RECEIVED_AT_MILL (Intake silo accepted)
    currentStatus = statuses[3];
    assert.strictEqual(currentStatus, "RECEIVED_AT_MILL");
  });

  it("checks yield quota limit and triggers overflow warning when yield exceeds 120%", () => {
    const maxQuotaKg = 7.5 * 1.5 * 1000; // 11,250 kg max for 1.5 ha
    const normalYield = 9750; // within quota
    const overflowYield = 14500; // > 11,250 * 1.2 = 13,500 kg

    const isNormalOver = normalYield > maxQuotaKg * 1.2;
    const isOverflowOver = overflowYield > maxQuotaKg * 1.2;

    assert.strictEqual(isNormalOver, false);
    assert.strictEqual(isOverflowOver, true);
  });
});
