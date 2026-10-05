"use client";

import React from "react";
import { Clock, RotateCcw, AlertTriangle, Wheat, Beef, Egg, Carrot } from "lucide-react";
import { GateInspectionRecord, DEFAULT_RECORDS } from "./field-ops-types";

interface GateLogHistoryProps {
  records: GateInspectionRecord[];
  selectedRecord: GateInspectionRecord;
  onSelectRecord: (record: GateInspectionRecord) => void;
  onResetRecords: () => void;
}

export function GateLogHistory({
  records,
  selectedRecord,
  onSelectRecord,
  onResetRecords,
}: GateLogHistoryProps) {
  const pillarIcon = {
    Starch: <Wheat className="w-3.5 h-3.5 text-amber-400" />,
    Protein: <Beef className="w-3.5 h-3.5 text-rose-400" />,
    Egg: <Egg className="w-3.5 h-3.5 text-yellow-400" />,
    Veg: <Carrot className="w-3.5 h-3.5 text-emerald-400" />,
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          Lịch Sử Tiếp Nhận Cổng (Real-time Ledger)
        </h3>
        <button
          onClick={() => {
            if (confirm("Đặt lại dữ liệu mẫu ban đầu?")) {
              onResetRecords();
            }
          }}
          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
        {records.map((rec) => (
          <div
            key={rec.id}
            onClick={() => onSelectRecord(rec)}
            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
              selectedRecord?.id === rec.id
                ? "bg-slate-800/80 border-teal-500/60 shadow"
                : "bg-slate-950/60 border-slate-800 hover:bg-slate-900/80"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400">{rec.id}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  rec.status === "PASSED"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : rec.status === "REJECTED"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}
              >
                {rec.status}
              </span>
            </div>

            <div className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
              {pillarIcon[rec.pillar]}
              <span>{rec.itemName}</span>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{rec.supplier}</span>
              <span className="font-bold text-slate-300">{rec.weightKg} kg</span>
            </div>

            {rec.violations.length > 0 && (
              <div className="mt-2 p-2 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-400 space-y-0.5">
                {rec.violations.map((v, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
              <span>{rec.timestamp}</span>
              <span className="text-teal-400 hover:underline">Xem biên bản QĐ 1246 →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
