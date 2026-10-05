"use client";

import React from "react";
import { KitchenRiskRule } from "@/lib/pmo-data";
import { AlertCircle, AlertTriangle, Search, CheckCircle2, Lock } from "lucide-react";

interface KitchenRuleCardProps {
  rule: KitchenRiskRule;
}

export function KitchenRuleCard({ rule }: KitchenRuleCardProps) {
  const severityStyles: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode; weight: number }> = {
    CRITICAL: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/30",
      icon: <AlertTriangle className="w-3 h-3" />,
      weight: 5,
    },
    HIGH: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
      icon: <AlertCircle className="w-3 h-3" />,
      weight: 4,
    },
    MEDIUM: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
      icon: <Search className="w-3 h-3" />,
      weight: 3,
    },
  };

  const style = severityStyles[rule.severity] || severityStyles.MEDIUM;

  return (
    <div className="p-4 sm:p-5 hover:bg-slate-800/30 transition-colors space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
            {rule.id}
          </span>
          <h4 className="text-sm font-bold text-white">{rule.name}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold flex items-center gap-1 ${style.bg} ${style.text} ${style.border}`}>
            {style.icon} {rule.severity}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Trọng số: {style.weight}/5
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
          <span className="text-slate-400 block text-[11px] font-medium mb-0.5">Tiêu chuẩn logic kiểm thực:</span>
          <span className="text-slate-200 font-mono text-[11px] break-all">{rule.logic}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
          <span className="text-rose-400/80 block text-[11px] font-medium mb-0.5">Hành động tự động xử lý:</span>
          <span className="text-slate-200">{rule.action}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800/40">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Căn cứ: Quyết định 1246/QĐ-BYT & NĐ 15/2018/NĐ-CP
        </span>
        <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-500" /> Hook: LEDGER_RULE_{rule.id}
        </span>
      </div>
    </div>
  );
}
