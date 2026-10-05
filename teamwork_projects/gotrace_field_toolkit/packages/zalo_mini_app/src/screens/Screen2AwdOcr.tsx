/**
 * Screen 2: Vật Tư & Rút Nước (AWD)
 * Visual water tube slider (0 to -15 cm), dry cycle counter,
 * chemical bag photo capture / OCR simulation, and real-time 1Mha MRV carbon calculation.
 */

import React, { useState } from "react";
import {
  AwdLogPayload,
  InputAppliedPayload,
  OcrResult,
  SoilStatus,
  generateGci,
} from "../types/index.js";
import { mrvCalculator, MrvCarbonCalculator } from "../services/mrvCalculator.js";
import { ocrSimulator } from "../services/ocrSimulator.js";
import { apiClient } from "../services/api.js";
import { MOCK_FARMER_PROFILE, MOCK_PLOTS } from "../services/gisMatcher.js";
import { OfflineStatusBar } from "../components/OfflineStatusBar.js";

interface Screen2Props {
  onAwdLogged?: (payload: AwdLogPayload) => void;
  onOcrLogged?: (payload: InputAppliedPayload) => void;
}

export const Screen2AwdOcr: React.FC<Screen2Props> = ({
  onAwdLogged,
  onOcrLogged,
}) => {
  const currentPlot = MOCK_PLOTS[0]; // 1.5 ha

  // AWD State
  const [waterLevelCm, setWaterLevelCm] = useState<number>(-15); // Default optimal -15cm
  const [dryCyclesCount, setDryCyclesCount] = useState<number>(3); // Default 3 cycles
  const [isSubmittingAwd, setIsSubmittingAwd] = useState<boolean>(false);
  const [awdFeedback, setAwdFeedback] = useState<string | null>(null);

  // OCR State
  const [ocrCatalogIndex, setOcrCatalogIndex] = useState<number>(0);
  const [currentOcrResult, setCurrentOcrResult] = useState<OcrResult | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [ocrFeedback, setOcrFeedback] = useState<string | null>(null);

  // Real-time MRV Carbon calculation (IPCC Tier 2)
  const mrvResult = mrvCalculator.calculate({
    plotGci: currentPlot.plotGci,
    areaHa: currentPlot.areaHa,
    awdCycles: dryCyclesCount,
    waterLevelMinCm: waterLevelCm,
    carbonPriceUsd: 20.0,
  });

  // Soil status derivation
  let soilStatus: SoilStatus = "MOIST";
  if (waterLevelCm > 0) {
    soilStatus = "FLOODED";
  } else if (waterLevelCm <= -12) {
    soilStatus = "CRACKED_DRY";
  }

  // Handle AWD Water Log Action
  const handleLogAwd = async () => {
    setIsSubmittingAwd(true);
    setAwdFeedback(null);

    const eventId = generateGci(
      MOCK_FARMER_PROFILE.provinceCode,
      "EVENT",
      "AWD_LOG",
      `AWD-${Date.now().toString(36).toUpperCase()}`
    );

    const payload: AwdLogPayload = {
      eventId,
      eventType: "AWD_LOG",
      plotGci: currentPlot.plotGci,
      action: "DRAIN_OUT",
      waterLevelCm,
      soilStatus,
      cycleNumber: dryCyclesCount,
      photoUri: "blob:gotrace/awd_tube_measurement.jpg",
      photoHashSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      gpsCoordinates: { latitude: 10.4582, longitude: 105.6321 },
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await apiClient.submitAwdLog(payload);
      setAwdFeedback(response.message || "Đã lưu nhật ký nước AWD!");
      if (onAwdLogged) onAwdLogged(payload);
    } catch (err) {
      setAwdFeedback("Lỗi khi ghi nhận: " + String(err));
    } finally {
      setIsSubmittingAwd(false);
    }
  };

  // Handle OCR Photo Simulation
  const handleSimulateOcr = async () => {
    setIsScanning(true);
    setOcrFeedback(null);

    // Simulate 300ms OCR scanning
    setTimeout(async () => {
      const result = ocrSimulator.simulateOcrCapture(ocrCatalogIndex);
      setCurrentOcrResult(result);
      setOcrCatalogIndex((prev) => prev + 1);
      setIsScanning(false);

      const eventId = generateGci(
        MOCK_FARMER_PROFILE.provinceCode,
        "EVENT",
        "INPUT_APPLIED",
        `INP-${Date.now().toString(36).toUpperCase()}`
      );

      const payload: InputAppliedPayload = {
        eventId,
        eventType: "INPUT_APPLIED",
        plotGci: currentPlot.plotGci,
        farmerPartyId: MOCK_FARMER_PROFILE.partyId,
        ocrData: result,
        appliedDate: new Date().toISOString().split("T")[0],
        timestamp: new Date().toISOString(),
      };

      try {
        const response = await apiClient.submitInputApplied(payload);
        setOcrFeedback(response.message || "Đã trích xuất & lưu bao bì vật tư!");
        if (onOcrLogged) onOcrLogged(payload);
      } catch (err) {
        setOcrFeedback("Lỗi gửi dữ liệu OCR: " + String(err));
      }
    }, 250);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} data-testid="screen-2-awd-ocr">
      <OfflineStatusBar />

      {/* AWD Water Tube Visual Slider */}
      <div className="water-tube-container" data-testid="water-tube-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ color: "#0369a1", fontSize: "15px" }}>
            Ống Đo Nông Học Thực Địa (AWD)
          </strong>
          <span
            className={`water-status-tag ${
              soilStatus === "CRACKED_DRY"
                ? "status-dry"
                : soilStatus === "MOIST"
                ? "status-moist"
                : "status-flooded"
            }`}
            data-testid="soil-status-badge"
          >
            {soilStatus === "CRACKED_DRY"
              ? "Nứt Chân Chim (Ức chế CH4)"
              : soilStatus === "MOIST"
              ? "Đất Ẩm Ướt"
              : "Ngập Nước"}
          </span>
        </div>

        <div className="water-level-display">
          <div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Mực nước ống đo</div>
            <div className="water-cm-value" data-testid="water-cm-value">
              {waterLevelCm > 0 ? `+${waterLevelCm}` : waterLevelCm} cm
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Khuyến cáo 1Mha</div>
            <div style={{ fontWeight: 700, color: "#059669", fontSize: "14px" }}>
              -15 cm (Tối ưu)
            </div>
          </div>
        </div>

        {/* Visual Slider */}
        <div>
          <input
            type="range"
            min="-15"
            max="10"
            step="1"
            value={waterLevelCm}
            onChange={(e) => setWaterLevelCm(Number(e.target.value))}
            className="water-slider"
            data-testid="water-level-slider"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              color: "#475569",
              marginTop: "4px",
            }}
          >
            <span>-15 cm (Khô nứt)</span>
            <span>0 cm (Mặt ruộng)</span>
            <span>+10 cm (Ngập sâu)</span>
          </div>
        </div>

        {/* Dry Cycle Counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#ffffff",
            padding: "8px 12px",
            borderRadius: "10px",
          }}
        >
          <span style={{ fontSize: "13px", fontWeight: 600 }}>Số Đợt Rút Nước (AWD Cycles):</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => setDryCyclesCount((prev) => Math.max(0, prev - 1))}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#f1f5f9",
                cursor: "pointer",
                fontWeight: 700,
              }}
              data-testid="cycle-decrement-btn"
            >
              -
            </button>
            <strong style={{ fontSize: "16px", minWidth: "20px", textAlign: "center" }} data-testid="cycle-counter-value">
              {dryCyclesCount}
            </strong>
            <button
              onClick={() => setDryCyclesCount((prev) => Math.min(5, prev + 1))}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#f1f5f9",
                cursor: "pointer",
                fontWeight: 700,
              }}
              data-testid="cycle-increment-btn"
            >
              +
            </button>
          </div>
        </div>

        {/* 1-Tap AWD Button */}
        <button
          className="action-btn-giant btn-blue"
          onClick={handleLogAwd}
          disabled={isSubmittingAwd}
          data-testid="btn-log-awd"
          style={{ minHeight: "52px" }}
        >
          <span>{isSubmittingAwd ? "Đang lưu..." : "💧 1 CHẠM: GHI NHẬN RÚT NƯỚC AWD"}</span>
        </button>

        {awdFeedback && (
          <div style={{ fontSize: "12px", color: "#0369a1", fontWeight: 600 }} data-testid="awd-feedback">
            {awdFeedback}
          </div>
        )}
      </div>

      {/* 1Mha MRV Carbon Accounting Card */}
      <div className="mrv-carbon-box" data-testid="mrv-carbon-box">
        <div className="mrv-header">
          <span>Đo Đạc MRV Carbon • Đề Án 1Mha</span>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 6px",
              borderRadius: "4px",
              background: mrvResult.isCompliant ? "#a7f3d0" : "#fef08a",
              color: mrvResult.isCompliant ? "#065f46" : "#854d0e",
            }}
            data-testid="mrv-compliance-badge"
          >
            {mrvResult.isCompliant ? "Đạt Chuẩn IPCC Tier 2" : "Chưa Đủ Chuẩn AWD"}
          </span>
        </div>

        <div className="mrv-numbers">
          <div className="mrv-stat">
            <div className="mrv-stat-label">Giảm phát thải (ΔE)</div>
            <div className="mrv-stat-val" data-testid="mrv-delta-e">
              {`${mrvResult.netReductionTCo2ePerHa} tCO₂e/ha`}
            </div>
          </div>
          <div className="mrv-stat">
            <div className="mrv-stat-label">Tổng giảm ({currentPlot.areaHa} ha)</div>
            <div className="mrv-stat-val" data-testid="mrv-total-reduction">
              {`${mrvResult.totalEmissionReductionTCo2e} tCO₂e`}
            </div>
          </div>
          <div className="mrv-stat">
            <div className="mrv-stat-label">Giá trị Carbon (@ $20/tấn)</div>
            <div className="mrv-stat-val" style={{ color: "#2563eb" }} data-testid="mrv-usd-value">
              {MrvCarbonCalculator.formatUsd(mrvResult.totalValueUsd)}
            </div>
          </div>
          <div className="mrv-stat">
            <div className="mrv-stat-label">Quy đổi thu nhập nông dân</div>
            <div className="mrv-stat-val" style={{ color: "#059669" }} data-testid="mrv-vnd-value">
              {MrvCarbonCalculator.formatVnd(mrvResult.totalValueVnd)}
            </div>
          </div>
        </div>
      </div>

      {/* Chemical Bag Photo & OCR Simulation */}
      <div className="ocr-camera-box" data-testid="ocr-camera-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: "14px" }}>Quét AI Vỏ Bao Phân Bón / Thuốc BVTV</strong>
          <span style={{ fontSize: "11px", color: "#94a3b8" }}>OCR Tự Động</span>
        </div>

        <div className="ocr-viewfinder" data-testid="ocr-viewfinder">
          <div style={{ fontSize: "32px", marginBottom: "6px" }}>📷</div>
          <div style={{ fontSize: "13px", color: "#e2e8f0" }}>
            {isScanning ? "Đang nhận diện ký tự quang học..." : "Bấm nút dưới để chụp quét vỏ bao"}
          </div>
        </div>

        <button
          className="action-btn-giant btn-amber"
          onClick={handleSimulateOcr}
          disabled={isScanning}
          data-testid="btn-simulate-ocr"
          style={{ minHeight: "52px" }}
        >
          <span>{isScanning ? "Đang quét AI..." : "📸 CHỤP ẢNH & OCR BÓC TÁCH HOẠT CHẤT"}</span>
        </button>

        {ocrFeedback && (
          <div style={{ fontSize: "12px", color: "#fef08a" }} data-testid="ocr-feedback">
            {ocrFeedback}
          </div>
        )}

        {/* OCR Extracted Results Card */}
        {currentOcrResult && (
          <div
            style={{
              background: "#334155",
              borderRadius: "10px",
              padding: "10px",
              fontSize: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
            data-testid="ocr-result-display"
          >
            <div>
              <strong>Tên sản phẩm:</strong> {currentOcrResult.productName}
            </div>
            <div>
              <strong>Loại:</strong>{" "}
              {currentOcrResult.category === "FERTILIZER" ? "Phân bón" : "Thuốc BVTV"} |{" "}
              <strong>Độ tin cậy:</strong> {(currentOcrResult.confidenceScore * 100).toFixed(0)}%
            </div>
            <div>
              <strong>Hoạt chất bóc tách:</strong>
              <div style={{ marginTop: "4px" }}>
                {currentOcrResult.activeIngredients.map((ing, i) => (
                  <span key={i} className="ocr-ingredient-pill">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <strong>Thời gian cách ly (PHI):</strong> {currentOcrResult.phiDays} ngày •{" "}
              <span style={{ color: currentOcrResult.safeForExport ? "#4ade80" : "#f87171" }}>
                {currentOcrResult.safeForExport ? "Đạt chuẩn xuất khẩu ✓" : "Cần cách ly thêm ⚠️"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
