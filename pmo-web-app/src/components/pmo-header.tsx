"use client";

import React, { useState, useEffect } from "react";
import {
  CommandHubKey,
  commandHubs,
  findHubByTab,
} from "@/lib/hub-navigation";

export type TabKey =
  | "pitch"
  | "rice"
  | "fruit"
  | "sales"
  | "traceback"
  | "roadmap"
  | "accounts"
  | "kitchen-rules"
  | "food-chain"
  | "tools"
  | "field-ops"
  | "gateway"
  | "phase2"
  | "phase3"
  | "compliance";

interface PMOHeaderProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  doneCount: number;
  totalCount: number;
  progressPercent: number;
}

export function PMOHeader({
  activeTab,
  setActiveTab,
  doneCount,
  totalCount,
  progressPercent,
}: PMOHeaderProps) {
  const currentHubKey = findHubByTab(activeTab);
  const [selectedHub, setSelectedHub] = useState<CommandHubKey>(currentHubKey);

  useEffect(() => {
    setSelectedHub(findHubByTab(activeTab));
  }, [activeTab]);

  const activeHubObj = commandHubs.find((h) => h.key === selectedHub) || commandHubs[0];

  const handleSelectHub = (hubKey: CommandHubKey) => {
    setSelectedHub(hubKey);
    const targetHub = commandHubs.find((h) => h.key === hubKey);
    if (targetHub && targetHub.subTabs.length > 0) {
      if (!targetHub.subTabs.some((s) => s.key === activeTab)) {
        setActiveTab(targetHub.subTabs[0].key);
      }
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3 space-y-3">
      {/* Top Banner & Hub Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
            GT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                GOTRACE V2.2 — PMO TÂY NAM BỘ
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Sở Chỉ Huy Sa Đéc
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Hạ Tầng Dữ Liệu Nông Sản & ATTP ĐBSCL: Lúa Gạo 1Mha • Trái Cây GACC • Bếp Ăn Hội Tụ
            </p>
          </div>
        </div>

        {/* 5 Primary Command Hubs */}
        <nav className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 p-1 rounded-xl">
          {commandHubs.map((hub) => {
            const isHubActive = selectedHub === hub.key;
            return (
              <button
                key={hub.key}
                onClick={() => handleSelectHub(hub.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isHubActive
                    ? `${hub.color} text-white shadow-md shadow-emerald-500/20 scale-[1.02]`
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <span>{hub.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isHubActive ? "bg-black/25 text-white" : "bg-slate-800 text-slate-400"
                }`}>
                  {hub.subTabs.length}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Global Progress */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-[11px] text-slate-400">Tiến độ Thí điểm</div>
            <div className="text-xs font-bold text-white">
              {doneCount}/{totalCount} Cột mốc ({progressPercent}%)
            </div>
          </div>
          <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Secondary Level: Sub-Navigation Pills of Active Hub */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-1">
            Phân hệ:
          </span>
          <div className="flex items-center gap-1">
            {activeHubObj.subTabs.map((sub) => {
              const isSubActive = activeTab === sub.key;
              return (
                <button
                  key={sub.key}
                  onClick={() => setActiveTab(sub.key)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    isSubActive
                      ? "bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <span>{sub.label}</span>
                  {sub.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      {sub.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] text-slate-500 hidden lg:block italic">
          Bản quyền PMO GOTRACE V2.2 — Cập nhật thời gian thực
        </div>
      </div>
    </header>
  );
}
