/**
 * Screen 3: Yêu Cầu Thu Hoạch
 * 1-tap harvest request creating LOT: HarvestLot with estimated yield,
 * GCI formatting, yield quota check, and lifecycle status tracking (REQUESTED -> CUTTING -> WEIGHED).
 */

import React, { useState } from "react";
import {
  HarvestLotPayload,
  LotStatus,
  TransportType,
  generateGci,
  isValidGci,
} from "../types/index.js";
import { apiClient } from "../services/api.js";
import { MOCK_FARMER_PROFILE, MOCK_PLOTS, MOCK_MSVT_LIST } from "../services/gisMatcher.js";
import { OfflineStatusBar } from "../components/OfflineStatusBar.js";

interface Screen3Props {
  onHarvestRequested?: (lot: HarvestLotPayload) => void;
}

export const Screen3Harvest: React.FC<Screen3Props> = ({ onHarvestRequested }) => {
  const currentPlot = MOCK_PLOTS[0]; // 1.5 ha
  const currentMsvt = MOCK_MSVT_LIST[0]; // VN-DTH-0012, max 7.5 t/ha = 11,250 kg max for 1.5 ha

  // State
  const [estimatedYieldKg, setEstimatedYieldKg] = useState<number>(9750); // 6.5 t/ha * 1.5 ha
  const [transportType, setTransportType] = useState<TransportType>("WATERWAY_BARGE");
  const [vehiclePlate, setVehiclePlate] = useState<string>("DT-28849");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdLot, setCreatedLot] = useState<HarvestLotPayload | null>(null);
  const [lotStatus, setLotStatus] = useState<LotStatus>("REQUESTED");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Quota calculation
  const maxQuotaKg = currentMsvt.maxYieldTonsPerHa * currentPlot.areaHa * 1000;
  const isOverQuota = estimatedYieldKg > maxQuotaKg * 1.2;

  // 1-Tap Harvest Request Action
  const handleRequestHarvest = async () => {
    setIsSubmitting(true);
    setFeedbackMessage(null);

    const todayStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const lotId = generateGci(
      MOCK_FARMER_PROFILE.provinceCode,
      "LOT",
      "HARVEST",
      `${todayStr}-OM5451-${currentPlot.plotGci.split(".").pop()}`
    );

    const payload: HarvestLotPayload = {
      lotId,
      msvt: currentMsvt.code,
      plotGci: currentPlot.plotGci,
      commodity: currentMsvt.commodity,
      estimatedYieldKg,
      harvestDate: new Date().toISOString().split("T")[0],
      farmerPartyId: MOCK_FARMER_PROFILE.partyId,
      mrvData: {
        awdCycles: 3,
        waterLevelMinCm: -15,
        emissionReductionTCo2e: 5.025, // 1.5 ha * 3.35 tCO2e/ha
      },
      status: "REQUESTED",
      transportType,
      vehiclePlate,
      destinationFacilityGci: "VN.DT.PLACE.MILL.COMAY-SADEC-01",
      qrPayloadUrl: `https://trace.gotrace.vn/lot/${lotId}`,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await apiClient.submitHarvestRequest(payload);
      setCreatedLot(payload);
      setLotStatus("REQUESTED");
      setFeedbackMessage(response.message || "Đã gửi yêu cầu thu hoạch!");
      if (onHarvestRequested) onHarvestRequested(payload);
    } catch (err) {
      setFeedbackMessage("Lỗi khi gửi yêu cầu: " + String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status transition helper for testing and demonstration
  const advanceStatus = (nextStatus: LotStatus) => {
    setLotStatus(nextStatus);
    if (createdLot) {
      setCreatedLot({ ...createdLot, status: nextStatus });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} data-testid="screen-3-harvest">
      <OfflineStatusBar />

      {/* Harvest Plot Summary Card */}
      <div className="field-card" data-testid="harvest-plot-summary-card">
        <div className="card-title">
          <span>Kế Hoạch Thu Hoạch Ruộng Lúa</span>
          <span style={{ color: "#059669", fontSize: "12px", fontWeight: 700 }}>
            Lúa Chín 85% ✓
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
          <div>
            <strong>Thửa ruộng:</strong> {currentPlot.plotName}
          </div>
          <div>
            <strong>Mã số vùng trồng:</strong> {currentMsvt.code} ({currentMsvt.name})
          </div>
          <div>
            <strong>Giống lúa:</strong> {currentMsvt.variety}
          </div>
          <div className="gci-badge">Plot: {currentPlot.plotGci}</div>
        </div>
      </div>

      {/* Yield Estimation Card */}
      <div className="field-card" data-testid="yield-estimation-card">
        <div className="card-title">
          <span>Ước Tính Sản Lượng Tươi</span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#2563eb" }} data-testid="yield-display">
            {(estimatedYieldKg / 1000).toFixed(2)} Tấn ({estimatedYieldKg.toLocaleString()} kg)
          </span>
        </div>

        <input
          type="range"
          min="3000"
          max="15000"
          step="250"
          value={estimatedYieldKg}
          onChange={(e) => setEstimatedYieldKg(Number(e.target.value))}
          className="water-slider"
          data-testid="yield-slider"
        />

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
          <span>3,0 Tấn (Năng suất thấp)</span>
          <span>Định mức: {(maxQuotaKg / 1000).toFixed(1)} Tấn</span>
          <span>15,0 Tấn (Trần)</span>
        </div>

        {/* Quota Warning */}
        {isOverQuota && (
          <div
            style={{
              marginTop: "8px",
              padding: "8px",
              borderRadius: "8px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              fontSize: "12px",
            }}
            data-testid="quota-warning"
          >
            ⚠️ Cảnh báo hạn ngạch: Sản lượng vượt 120% định mức vùng trồng ({maxQuotaKg / 1000} tấn)!
          </div>
        )}
      </div>

      {/* Logistics & Transport Card */}
      <div className="field-card" data-testid="transport-selector-card">
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 700, fontSize: "14px" }}>
          Phương Tiện Gom Nông Sản:
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
          <button
            onClick={() => {
              setTransportType("WATERWAY_BARGE");
              setVehiclePlate("DT-28849");
            }}
            data-testid="transport-btn-barge"
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: transportType === "WATERWAY_BARGE" ? "2px solid #2563eb" : "1px solid #cbd5e1",
              background: transportType === "WATERWAY_BARGE" ? "#eff6ff" : "#fff",
              color: transportType === "WATERWAY_BARGE" ? "#1d4ed8" : "#334155",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🚤 Ghe / Sà Lan Thủy
          </button>

          <button
            onClick={() => {
              setTransportType("ROAD_TRUCK");
              setVehiclePlate("66C-123.45");
            }}
            data-testid="transport-btn-truck"
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: transportType === "ROAD_TRUCK" ? "2px solid #2563eb" : "1px solid #cbd5e1",
              background: transportType === "ROAD_TRUCK" ? "#eff6ff" : "#fff",
              color: transportType === "ROAD_TRUCK" ? "#1d4ed8" : "#334155",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🚚 Xe Tải Đường Bộ
          </button>
        </div>

        <div style={{ fontSize: "13px" }}>
          <strong>Biển số / Số hiệu phương tiện:</strong>
          <input
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              marginTop: "4px",
              fontSize: "14px",
              fontWeight: 600,
            }}
            data-testid="vehicle-plate-input"
          />
        </div>
      </div>

      {/* 1-Tap Giant Action Button */}
      <button
        className="action-btn-giant btn-amber"
        onClick={handleRequestHarvest}
        disabled={isSubmitting}
        data-testid="btn-request-harvest"
      >
        <span>{isSubmitting ? "Đang gửi lệnh..." : "🚜 1 CHẠM: PHÁT LỆNH THU HOẠCH"}</span>
      </button>

      {/* Feedback Message */}
      {feedbackMessage && (
        <div
          style={{
            padding: "12px",
            borderRadius: "12px",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1e40af",
            fontSize: "13px",
          }}
          data-testid="harvest-feedback-message"
        >
          {feedbackMessage}
        </div>
      )}

      {/* Generated HarvestLot Display & Status Tracking */}
      {createdLot && (
        <div className="field-card" style={{ background: "#f8fafc" }} data-testid="created-lot-card">
          <div className="card-title">
            <span>Mã Lô Gặt Thu Hoạch (GCI)</span>
            <span
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "10px",
                background:
                  lotStatus === "RECEIVED_AT_MILL"
                    ? "#dcfce7"
                    : lotStatus === "WEIGHED"
                    ? "#e0e7ff"
                    : lotStatus === "CUTTING"
                    ? "#fef3c7"
                    : "#ffedd5",
                color:
                  lotStatus === "RECEIVED_AT_MILL"
                    ? "#15803d"
                    : lotStatus === "WEIGHED"
                    ? "#3730a3"
                    : lotStatus === "CUTTING"
                    ? "#b45309"
                    : "#c2410c",
                fontWeight: 700,
              }}
              data-testid="lot-status-pill"
            >
              {lotStatus}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px" }}>
            <div>
              <strong>Mã Lô GCI:</strong>
              <div className="gci-badge" style={{ marginTop: "2px" }} data-testid="lot-gci-display">
                {createdLot.lotId}
              </div>
            </div>
            <div>
              <strong>GCI Hợp Lệ:</strong> {isValidGci(createdLot.lotId) ? "✓ Chuẩn GoTRACE GCI" : "❌ Không Hợp Lệ"}
            </div>
            <div>
              <strong>Sản lượng ước tính:</strong> {createdLot.estimatedYieldKg.toLocaleString()} kg
            </div>
            <div>
              <strong>Phương tiện:</strong> {createdLot.transportType} ({createdLot.vehiclePlate})
            </div>
            <div>
              <strong>Giảm phát thải tích lũy:</strong> {createdLot.mrvData.emissionReductionTCo2e} tCO₂e (3 đợt AWD)
            </div>

            {/* Simulated QR Code box */}
            <div
              style={{
                marginTop: "8px",
                background: "#ffffff",
                border: "1px dashed #94a3b8",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
              data-testid="lot-qr-code-box"
            >
              <div style={{ fontSize: "28px" }}>🏁 📱</div>
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
                Mã QR Điều Phối Ghe Đến Trạm Cân Nhà Máy
              </div>
              <div style={{ fontSize: "10px", color: "#0284c7", wordBreak: "break-all" }}>
                {createdLot.qrPayloadUrl}
              </div>
            </div>

            {/* Lifecycle Status Progression Simulation */}
            <div style={{ marginTop: "10px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                Mô Phỏng Tiến Trình Lô Hàng Thực Địa:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                <button
                  onClick={() => advanceStatus("CUTTING")}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: lotStatus === "CUTTING" ? "#fef3c7" : "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  data-testid="advance-status-cutting"
                >
                  1. Đang Cắt
                </button>
                <button
                  onClick={() => advanceStatus("WEIGHED")}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: lotStatus === "WEIGHED" ? "#e0e7ff" : "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  data-testid="advance-status-weighed"
                >
                  2. Đã Cân
                </button>
                <button
                  onClick={() => advanceStatus("RECEIVED_AT_MILL")}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: lotStatus === "RECEIVED_AT_MILL" ? "#dcfce7" : "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  data-testid="advance-status-received"
                >
                  3. Vào Silo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
