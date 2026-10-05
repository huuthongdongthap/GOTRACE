"use client";

import React, { useState } from "react";
import { Milestone } from "@/lib/pmo-data";
import { Calendar, CheckCircle2 } from "lucide-react";

interface TabRoadmapProps {
  milestoneList: Milestone[];
  toggleMilestoneStatus: (id: string) => void;
}

export function TabRoadmap({ milestoneList, toggleMilestoneStatus }: TabRoadmapProps) {
  const [phaseFilter, setPhaseFilter] = useState<number | "all">("all");

  return (
    <div className="space-y-6">
      {/* Filter by phase */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Lọc Theo Giai Đoạn:
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPhaseFilter("all")}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                phaseFilter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Tất cả (9)
            </button>
            <button
              onClick={() => setPhaseFilter(1)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                phaseFilter === 1
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Phase 1: Nền tảng (Ngày 1–30)
            </button>
            <button
              onClick={() => setPhaseFilter(2)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                phaseFilter === 2
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Phase 2: Đấu nối (Tuần 5–8)
            </button>
            <button
              onClick={() => setPhaseFilter(3)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                phaseFilter === 3
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Phase 3: Thực chứng (Tuần 9–12)
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-400 italic">
          * Nhấp vào nhãn trạng thái để thay đổi tiến độ trực tiếp
        </div>
      </div>

      {/* Milestones Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {milestoneList
          .filter((m) => phaseFilter === "all" || m.phase === phaseFilter)
          .map((m) => {
            const statusColors = {
              done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
              in_progress: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              pending: "bg-slate-800 text-slate-400 border-slate-700",
              blocked: "bg-rose-500/10 text-rose-400 border-rose-500/20",
            };

            const statusLabels = {
              done: "Hoàn thành",
              in_progress: "Đang thực hiện",
              pending: "Chờ triển khai",
              blocked: "Đang nghẽn",
            };

            return (
              <div
                key={m.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {m.id} • {m.window}
                    </span>
                    <button
                      onClick={() => toggleMilestoneStatus(m.id)}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium cursor-pointer transition-all hover:scale-105 ${
                        statusColors[m.status]
                      }`}
                    >
                      {statusLabels[m.status]}
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    {m.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.detail}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Chủ trì:</span>
                    <span className="font-medium text-slate-200">{m.owner}</span>
                  </div>
                  <div className="flex items-start justify-between text-slate-400 gap-2">
                    <span>Bằng chứng:</span>
                    <span className="text-right text-slate-300 font-mono text-[11px] line-clamp-1">
                      {m.evidence}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
