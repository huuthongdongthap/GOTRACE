"use client";

import React from "react";
import { Thermometer } from "lucide-react";

interface GateParameterInputsProps {
  pillar: "Starch" | "Protein" | "Egg" | "Veg";
  tempCelsius: number;
  setTempCelsius: (v: number) => void;
  freshnessHours: number;
  setFreshnessHours: (v: number) => void;
  eggCrackRatePercent: number;
  setEggCrackRatePercent: (v: number) => void;
  hasVetCert: boolean;
  setHasVetCert: (v: boolean) => void;
  sensoryPassed: boolean;
  setSensoryPassed: (v: boolean) => void;
}

export function GateParameterInputs({
  pillar,
  tempCelsius,
  setTempCelsius,
  freshnessHours,
  setFreshnessHours,
  eggCrackRatePercent,
  setEggCrackRatePercent,
  hasVetCert,
  setHasVetCert,
  sensoryPassed,
  setSensoryPassed,
}: GateParameterInputsProps) {
  return (
    <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
        <Thermometer className="w-3.5 h-3.5 text-teal-400" />
        Thông Số Kiểm Định Tại Cổng (Kích Hoạt Rule Engine K01–K12)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-slate-400 text-[11px] mb-1">Nhiệt độ giao nhận (°C):</label>
          <input
            type="number"
            step="0.1"
            value={tempCelsius}
            onChange={(e) => setTempCelsius(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-bold"
          />
          <span className="text-[10px] text-slate-500">{pillar === "Protein" ? "≤ 5°C (K02)" : "Bình thường"}</span>
        </div>

        <div>
          <label className="block text-slate-400 text-[11px] mb-1">Thời gian sau sản xuất (Giờ):</label>
          <input
            type="number"
            value={freshnessHours}
            onChange={(e) => setFreshnessHours(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-bold"
          />
          <span className="text-[10px] text-slate-500">{pillar === "Starch" ? "Sợi tươi: ≤ 18h (K10)" : "Theo HSD"}</span>
        </div>

        {pillar === "Egg" ? (
          <div>
            <label className="block text-slate-400 text-[11px] mb-1">Tỷ lệ nứt vỡ (%):</label>
            <input
              type="number"
              step="0.1"
              value={eggCrackRatePercent}
              onChange={(e) => setEggCrackRatePercent(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-bold"
            />
            <span className="text-[10px] text-slate-500">Chuẩn: ≤ 2% (K12)</span>
          </div>
        ) : (
          <div>
            <label className="block text-slate-400 text-[11px] mb-1">Chứng nhận Kiểm dịch / VietGAP:</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="hasVet"
                checked={hasVetCert}
                onChange={(e) => setHasVetCert(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="hasVet" className="text-slate-300">
                {pillar === "Protein" ? "Giấy thú y (K04)" : "Giấy kiểm nghiệm"}
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sensory"
            checked={sensoryPassed}
            onChange={(e) => setSensoryPassed(e.target.checked)}
            className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
          />
          <label htmlFor="sensory" className="text-slate-300">
            Đạt cảm quan chuẩn (Màu tươi, không mùi ôi, không nhớt, bao bì nguyên vẹn)
          </label>
        </div>
      </div>
    </div>
  );
}
