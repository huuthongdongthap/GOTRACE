"use client";

import React, { useState } from "react";
import { Scale, Calculator, ShieldAlert } from "lucide-react";
import { mrvCarbonCalculator, RiceMassBalance } from "@/lib/mrv-carbon";

export function RiceMassBalanceWidget() {
  const [wetWeightKg, setWetWeightKg] = useState(10000);
  const [wetMoisturePct, setWetMoisturePct] = useState(26.0);
  const [actualDryWeightKg, setActualDryWeightKg] = useState(8475);
  const [massBalanceResult, setMassBalanceResult] = useState<RiceMassBalance | null>(null);

  const handleReconcileMassBalance = () => {
    const res = mrvCarbonCalculator.reconcilePaddyMoisture(
      wetWeightKg,
      wetMoisturePct,
      actualDryWeightKg,
      `LOT-PADDY-${Date.now().toString(36).toUpperCase()}`
    );
    setMassBalanceResult(res);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Đối Soát Cân Bằng Khối Lượng</h3>
            <p className="text-xs text-slate-400">Kiểm soát sấy lúa ẩm → khô & chống pha trộn</p>
          </div>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="text-[11px] font-bold text-slate-300 uppercase">
            Thông Số Sấy Lúa Tại Nhà Máy:
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Lúa Ướt Ban Đầu (kg):</span>
              <input
                type="number"
                value={wetWeightKg}
                onChange={(e) => setWetWeightKg(parseFloat(e.target.value) || 0)}
                className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-white font-mono"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Độ Ẩm Lúa Ướt (%):</span>
              <input
                type="number"
                step="0.5"
                value={wetMoisturePct}
                onChange={(e) => setWetMoisturePct(parseFloat(e.target.value) || 0)}
                className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-white font-mono"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Lúa Khô Thực Cân (kg):</span>
              <input
                type="number"
                value={actualDryWeightKg}
                onChange={(e) => setActualDryWeightKg(parseFloat(e.target.value) || 0)}
                className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleReconcileMassBalance}
            className="w-full mt-2 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow"
          >
            <Calculator className="w-3.5 h-3.5" /> Kiểm Tra Độ Hụt Khối Lượng
          </button>
        </div>

        {massBalanceResult && (
          <div
            className={`p-3.5 rounded-xl border animate-fadeIn text-xs space-y-2 ${
              massBalanceResult.is_valid
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                : "bg-rose-950/40 border-rose-500/50 text-rose-300"
            }`}
          >
            <div className="flex justify-between items-center font-bold">
              <span>KẾT QUẢ ĐỐI SOÁT ĐỘ ẨM:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 border border-current">
                {massBalanceResult.is_valid ? "HỢP LỆ (PASS)" : "CẢNH BÁO (FAIL)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>Kỳ vọng: {massBalanceResult.expected_dry_paddy_weight_kg.toFixed(0)} kg</div>
              <div>Chênh lệch: {massBalanceResult.variance_pct > 0 ? "+" : ""}{massBalanceResult.variance_pct.toFixed(2)}%</div>
            </div>
            {massBalanceResult.mismatch_reason && (
              <div className="pt-2 border-t border-rose-500/30 text-rose-300 font-semibold flex items-start gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{massBalanceResult.mismatch_reason}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800">
        Dung sai cho phép: ±2.5% (Tổn thất kỹ thuật bay hơi & vụn sấy 1.5%)
      </div>
    </div>
  );
}
