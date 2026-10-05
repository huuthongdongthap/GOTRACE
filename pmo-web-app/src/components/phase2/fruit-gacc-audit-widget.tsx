"use client";

import React, { useState } from "react";
import { ShieldCheck, RefreshCw } from "lucide-react";
import {
  gaccQuotaEngine,
  GaccAuditResult,
  GaccLotInspection,
} from "@/lib/gacc-quota-engine";

interface FruitGaccAuditWidgetProps {
  polygonId: string;
}

export function FruitGaccAuditWidget({ polygonId }: FruitGaccAuditWidgetProps) {
  const [auditWeightTons, setAuditWeightTons] = useState(18.5);
  const [cadmiumLevel, setCadmiumLevel] = useState(0.03); // Threshold: 0.05
  const [auramineDetected, setAuramineDetected] = useState(false);
  const [auditResult, setAuditResult] = useState<GaccAuditResult | null>(null);

  const areaInfo = gaccQuotaEngine.getPlantingArea(polygonId);
  const quotaUsedPct = areaInfo
    ? Math.round((areaInfo.exported_tons_ytd / areaInfo.max_authorized_quota_tons) * 100)
    : 68;

  const handleRunGaccAudit = () => {
    const inspection: GaccLotInspection = {
      lot_id: `LOT-GACC-${Date.now().toString(36).toUpperCase()}`,
      msvt_code: polygonId,
      hs_code: polygonId.includes("CR") ? "0810.60.00" : "0804.50.20",
      shipment_weight_tons: auditWeightTons,
      cadmium_level_mg_kg: cadmiumLevel,
      auramine_o_detected: auramineDetected,
      residue_compliant: true,
      packing_house_gci: "VN-DTPH-008",
    };

    const result = gaccQuotaEngine.evaluateShipment(inspection);
    setAuditResult(result);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Kiểm Soát Hạn Ngạch GACC</h3>
            <p className="text-xs text-slate-400">Lệnh 280/281 & Smart Contract Quota</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">Hạn Ngạch MSVT {polygonId}</span>
            <span className="text-emerald-400 font-bold">
              {quotaUsedPct}% ({areaInfo?.exported_tons_ytd.toFixed(1)} / {areaInfo?.max_authorized_quota_tons} Tấn)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
              style={{ width: `${Math.min(100, quotaUsedPct)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
          <div className="text-[11px] font-bold text-slate-300 uppercase">
            Thông Số Kiểm Nghiệm Lô Hàng:
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Khối Lượng Lô:</span>
              <input
                type="number"
                value={auditWeightTons}
                onChange={(e) => setAuditWeightTons(parseFloat(e.target.value) || 0)}
                className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-white font-mono text-xs"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Cadmium (mg/kg, max 0.05):</span>
              <input
                type="number"
                step="0.01"
                value={cadmiumLevel}
                onChange={(e) => setCadmiumLevel(parseFloat(e.target.value) || 0)}
                className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right text-white font-mono text-xs"
              />
            </div>
            <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer pt-1">
              <span>Chất Vàng Ô (Auramine O):</span>
              <input
                type="checkbox"
                checked={auramineDetected}
                onChange={(e) => setAuramineDetected(e.target.checked)}
                className="accent-rose-500 rounded"
              />
            </label>
          </div>

          <button
            onClick={handleRunGaccAudit}
            className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Kiểm Định Bằng GaccQuotaEngine
          </button>
        </div>

        {auditResult && (
          <div
            className={`p-3.5 rounded-xl border animate-fadeIn text-xs space-y-2 ${
              auditResult.verdict === "APPROVED"
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                : auditResult.verdict === "REJECTED"
                ? "bg-rose-950/40 border-rose-500/50 text-rose-300"
                : "bg-amber-950/40 border-amber-500/50 text-amber-300"
            }`}
          >
            <div className="flex justify-between items-center font-bold">
              <span>KẾT QUẢ KIỂM TOÁN GACC:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 border border-current">
                {auditResult.verdict}
              </span>
            </div>
            <div className="text-[11px] opacity-90">
              Hạn ngạch còn lại: {auditResult.quota_remaining_after_tons.toFixed(1)} tấn
            </div>
            {auditResult.rejection_reasons.length > 0 && (
              <div className="space-y-1 text-rose-300 font-semibold pt-1 border-t border-rose-500/30">
                {auditResult.rejection_reasons.map((r, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800">
        Smart Contract Engine tuân thủ Tiêu chuẩn Lệnh 280 / 281 GACC
      </div>
    </div>
  );
}
