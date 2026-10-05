/**
 * Screen 1: Báo Gieo Sạ / Ra Hoa
 * Farmer profile via Zalo eKYC, GIS plot polygon matching, MSVT selector,
 * and 1-tap confirmation creating EVENT: CROP_PLAN_CREATED with GPS coordinates.
 */

import React, { useState } from "react";
import {
  CommodityType,
  CropPlanEventPayload,
  generateGci,
} from "../types/index.js";
import {
  MOCK_FARMER_PROFILE,
  MOCK_MSVT_LIST,
  MOCK_PLOTS,
  GisMatcher,
} from "../services/gisMatcher.js";
import { apiClient } from "../services/api.js";
import { OfflineStatusBar } from "../components/OfflineStatusBar.js";

interface Screen1Props {
  onPlanCreated?: (event: CropPlanEventPayload) => void;
}

export const Screen1Sowing: React.FC<Screen1Props> = ({ onPlanCreated }) => {
  // Pre-loaded eKYC Farmer Profile
  const farmer = MOCK_FARMER_PROFILE;

  // Selected State
  const [selectedMsvtCode, setSelectedMsvtCode] = useState<string>("VN-DTH-0012");
  const [selectedPlotGci, setSelectedPlotGci] = useState<string>(MOCK_PLOTS[0].plotGci);
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityType>("RICE_OM5451");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastCreatedEvent, setLastCreatedEvent] = useState<CropPlanEventPayload | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Field GPS simulation (Center of Plot 1)
  const currentGps = { latitude: 10.4582, longitude: 105.6321 };

  // Current Plot & GIS Matching Check
  const currentPlot =
    MOCK_PLOTS.find((p) => p.plotGci === selectedPlotGci) || MOCK_PLOTS[0];
  const { isInsidePolygon } = GisMatcher.matchPlotByGps(
    currentGps.latitude,
    currentGps.longitude,
    [currentPlot]
  );

  const selectedMsvt =
    MOCK_MSVT_LIST.find((m) => m.code === selectedMsvtCode) || MOCK_MSVT_LIST[0];

  // 1-Tap Action: Báo Gieo Sạ / Ra Hoa
  const handleConfirmSowing = async () => {
    setIsSubmitting(true);
    setFeedbackMessage(null);

    const eventId = generateGci(
      farmer.provinceCode,
      "EVENT",
      "CROP_PLAN_CREATED",
      `CP-${Date.now().toString(36).toUpperCase()}`
    );

    const todayIso = new Date().toISOString().split("T")[0];

    const payload: CropPlanEventPayload = {
      eventId,
      eventType: "CROP_PLAN_CREATED",
      farmerPartyId: farmer.partyId,
      plotGci: currentPlot.plotGci,
      msvt: selectedMsvt.code,
      commodity: selectedCommodity,
      variety: selectedMsvt.variety,
      sowingDate: todayIso,
      gpsCoordinates: currentGps,
      gisMatched: isInsidePolygon,
      mrvEnrolled: true,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await apiClient.submitCropPlan(payload);
      setLastCreatedEvent(payload);
      setFeedbackMessage(response.message || "Đã ghi nhận kế hoạch mùa vụ!");
      if (onPlanCreated) onPlanCreated(payload);
    } catch (err) {
      setFeedbackMessage("Lỗi khi gửi sự kiện: " + String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} data-testid="screen-1-sowing">
      <OfflineStatusBar />

      {/* Farmer Profile eKYC Card */}
      <div className="field-card" data-testid="farmer-ekyc-card">
        <div className="card-title">
          <span>Hồ Sơ Nông Dân (Zalo eKYC)</span>
          <span style={{ color: "var(--primary)", fontSize: "12px" }}>Đã định danh ✓</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px" }}>
          <div>
            <strong>Nông dân:</strong> {farmer.fullName} ({farmer.phone})
          </div>
          <div>
            <strong>CCCD:</strong> {farmer.citizenId}
          </div>
          <div>
            <strong>HTX:</strong> {farmer.cooperativeName}
          </div>
          <div className="gci-badge" style={{ marginTop: "4px" }}>
            Party ID: {farmer.partyId}
          </div>
        </div>
      </div>

      {/* GIS Plot & MSVT Selector Card */}
      <div className="field-card" data-testid="gis-plot-card">
        <div className="card-title">
          <span>Khớp Thửa Đất GIS & MSVT</span>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 6px",
              borderRadius: "4px",
              background: isInsidePolygon ? "#d1fae5" : "#fef3c7",
              color: isInsidePolygon ? "#065f46" : "#b45309",
              fontWeight: 700,
            }}
            data-testid="gis-match-badge"
          >
            {isInsidePolygon ? "GPS Hợp lệ (Trong Thửa)" : "GPS Ngoài Thửa"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>
              Mã số vùng trồng (MSVT):
            </label>
            <select
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
              }}
              value={selectedMsvtCode}
              onChange={(e) => setSelectedMsvtCode(e.target.value)}
              data-testid="msvt-selector"
            >
              {MOCK_MSVT_LIST.map((m) => (
                <option key={m.code} value={m.code}>
                  {m.code} • {m.name} ({m.variety})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>
              Thửa ruộng canh tác:
            </label>
            <select
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
              }}
              value={selectedPlotGci}
              onChange={(e) => setSelectedPlotGci(e.target.value)}
              data-testid="plot-selector"
            >
              {MOCK_PLOTS.map((p) => (
                <option key={p.plotGci} value={p.plotGci}>
                  {p.plotName} (Diện tích: {p.areaHa} ha)
                </option>
              ))}
            </select>
          </div>

          <div style={{ background: "#f8fafc", padding: "8px", borderRadius: "8px", fontSize: "12px" }}>
            <div>
              <strong>Tọa độ thực địa:</strong> {currentGps.latitude}, {currentGps.longitude}
            </div>
            <div>
              <strong>Thị trường xuất khẩu:</strong> {selectedMsvt.approvedMarkets.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* Commodity Type Chips */}
      <div className="field-card" data-testid="commodity-selector-card">
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 700, fontSize: "14px" }}>
          Chọn Loại Cây Trồng / Giống Lúa:
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[
            { id: "RICE_OM5451", label: "🌾 Lúa OM5451" },
            { id: "RICE_ST25", label: "🌾 Lúa ST25" },
            { id: "RICE_OM18", label: "🌾 Lúa OM18" },
            { id: "MANGO_CAT_CHU", label: "🥭 Xoài Cát Chu" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCommodity(item.id as CommodityType)}
              data-testid={`commodity-chip-${item.id}`}
              style={{
                padding: "8px 12px",
                borderRadius: "20px",
                border: selectedCommodity === item.id ? "2px solid #10b981" : "1px solid #cbd5e1",
                background: selectedCommodity === item.id ? "#d1fae5" : "#ffffff",
                color: selectedCommodity === item.id ? "#065f46" : "#334155",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1-Tap Giant Action Button */}
      <button
        className="action-btn-giant btn-green"
        onClick={handleConfirmSowing}
        disabled={isSubmitting}
        data-testid="btn-confirm-sowing"
      >
        <span>{isSubmitting ? "Đang ghi nhận..." : "🌾 1 CHẠM: BÁO GIEO SẠ / RA HOA"}</span>
      </button>

      {/* Feedback & Result Display */}
      {feedbackMessage && (
        <div
          style={{
            padding: "12px",
            borderRadius: "12px",
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#065f46",
            fontSize: "13px",
          }}
          data-testid="sowing-feedback-message"
        >
          {feedbackMessage}
        </div>
      )}

      {lastCreatedEvent && (
        <div className="field-card" style={{ background: "#f0fdf4" }} data-testid="last-event-card">
          <div className="card-title">
            <span style={{ color: "#166534" }}>Sự Kiện Đã Khởi Tạo</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px" }}>
            <div>
              <strong>Mã Event GCI:</strong>
              <div className="gci-badge" style={{ marginTop: "2px" }}>
                {lastCreatedEvent.eventId}
              </div>
            </div>
            <div>
              <strong>Mã vùng trồng:</strong> {lastCreatedEvent.msvt}
            </div>
            <div>
              <strong>Thửa đất:</strong> {lastCreatedEvent.plotGci}
            </div>
            <div>
              <strong>Ngày sạ:</strong> {lastCreatedEvent.sowingDate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
