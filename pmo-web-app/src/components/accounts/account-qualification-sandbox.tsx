"use client";

import React, { useState } from "react";
import { Sliders } from "lucide-react";

export function AccountQualificationSandbox() {
  const [calcScores, setCalcScores] = useState({
    networkReach: 4,
    traceabilityPain: 5,
    dataComplexity: 3,
    buyerAuthority: 4,
    digitalReadiness: 4,
    expansionPotential: 5,
  });

  const total = Object.values(calcScores).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
          Bộ Tính Điểm Nhanh Khách Hàng Mới (Field Qualification)
        </h4>
        <span className="text-xs font-bold text-emerald-400">
          Tổng: {total}/30 {total >= 25 ? "✅ ĐỦ ĐIỀU KIỆN" : "❌ LOẠI"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(calcScores).map(([key, val]) => (
          <div key={key} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <div className="text-slate-400 truncate mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setCalcScores((prev) => ({
                    ...prev,
                    [key]: Math.max(1, val - 1),
                  }))
                }
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-bold"
              >
                -
              </button>
              <span className="font-bold text-white">{val}</span>
              <button
                onClick={() =>
                  setCalcScores((prev) => ({
                    ...prev,
                    [key]: Math.min(5, val + 1),
                  }))
                }
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
