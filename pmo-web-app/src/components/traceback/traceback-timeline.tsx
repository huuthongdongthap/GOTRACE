"use client";

import React from "react";
import { Layers } from "lucide-react";
import { TracebackEvent } from "@/lib/pmo-data";

interface TracebackTimelineProps {
  events: TracebackEvent[];
  activeStep: number;
}

export function TracebackTimeline({ events, activeStep }: TracebackTimelineProps) {
  const badgeStyles: Record<string, string> = {
    CRITICAL: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    ALERT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    NORMAL: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          Chuỗi Sự Kiện Traceback (Event Ledger Chain)
        </h4>
        <span className="text-xs text-slate-400">
          Tiến độ: <strong className="text-emerald-400">{activeStep + 1}/{events.length}</strong> bước
        </span>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
        {events.map((evt, idx) => {
          const isPassed = idx <= activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`relative transition-all duration-300 ${
                isPassed ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isCurrent
                    ? "bg-rose-500 border-white ring-4 ring-rose-500/20 animate-pulse"
                    : isPassed
                    ? "bg-emerald-500 border-slate-900"
                    : "bg-slate-800 border-slate-700"
                }`}
              />

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Bước {idx + 1}: {evt.step} • {evt.timestamp}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                      badgeStyles[evt.status] || badgeStyles.NORMAL
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>

                <div className="text-sm font-bold text-white">{evt.entity}</div>
                <div className="text-xs text-slate-300 font-medium">{evt.action}</div>

                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-emerald-400">
                  <span className="text-slate-500">GCI Record:</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {evt.gci}
                  </span>
                </div>

                <p className="text-xs text-slate-400 italic pt-1">{evt.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
