"use client";

import React, { useState } from "react";
import { tracebackScenarios } from "@/lib/pmo-data";
import { Clock, CheckCircle2, ShieldAlert, Sparkles, Filter } from "lucide-react";
import { TracebackTimeline } from "@/components/traceback/traceback-timeline";

export function TabTracebackSimulator() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(tracebackScenarios[0].id);
  const currentScenario = tracebackScenarios.find((s) => s.id === selectedScenarioId) || tracebackScenarios[0];

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setActiveStep(0);
    setIsRunning(false);
  };

  const startSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < currentScenario.events.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1400);
  };

  const pillarColorMap: Record<string, { bg: string; text: string; border: string }> = {
    Starch: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
    Protein: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
    Egg: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
    Veg: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selector */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            Chọn Kịch Bản Giả Lập Traceback 4 Trụ Cột Thực Phẩm
          </div>
          <span className="text-[11px] text-slate-500">Mô phỏng thực địa Bếp ăn tập thể</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tracebackScenarios.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            const style = pillarColorMap[sc.pillar] || pillarColorMap.Starch;
            return (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(sc.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                    : "bg-slate-950/70 border-slate-800/80 hover:border-slate-700 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${style.bg} ${style.text} ${style.border}`}>
                    Trụ cột: {sc.pillar}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    ⏱ {sc.timeElapsed}
                  </span>
                </div>
                <div className="text-xs font-bold text-white line-clamp-2">{sc.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulation Control Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              {currentScenario.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Target Lot: <code className="text-emerald-400 font-mono">{currentScenario.targetLot}</code> — Thực chứng chỉ số <strong>Traceback Latency ≤ 15 phút</strong> (so với 24–48 giờ theo sổ sách).
            </p>
          </div>
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 text-white text-xs font-bold shadow-lg shadow-rose-600/20 hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                Đang truy vết Event Ledger...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Kích Hoạt Traceback Khẩn Cấp
              </>
            )}
          </button>
        </div>

        {/* Latency Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Phương pháp truyền thống (Sổ giấy & Hóa đơn)
            </div>
            <div className="text-2xl font-black text-rose-300">24 – 48 Giờ</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Phải lật tìm hóa đơn viết tay, gọi điện thoại cho nhà thầu, gọi cho vựa bỏ mối. Đến khi tìm ra nguyên nhân, cơ sở đã bị đình chỉ và tổn hại thương hiệu nghiêm trọng.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Nền tảng GOTRACE V2.2 (Universal Core Ledger)
            </div>
            <div className="text-2xl font-black text-emerald-300">{currentScenario.timeElapsed}</div>
            <p className="text-xs text-slate-400 leading-relaxed">{currentScenario.conclusion}</p>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Ledger Timeline */}
      <TracebackTimeline events={currentScenario.events} activeStep={activeStep} />
    </div>
  );
}
