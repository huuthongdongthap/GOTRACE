"use client";

import React from "react";
import { kitchenRiskRules } from "@/lib/pmo-data";
import {
  AlertCircle,
  Package,
  Truck,
  ChefHat,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Search,
  CheckCircle2,
  Wheat,
  Egg,
  Carrot,
  Beef,
  Layers,
} from "lucide-react";
import { KitchenRuleCard } from "@/components/kitchen/kitchen-rule-card";

export function TabKitchenRules() {
  const stageOrder = ["Gate", "Storage", "Preparation", "Cooking", "Serving"] as const;
  const stageIcons: Record<string, React.ReactNode> = {
    Gate: <Package className="w-4 h-4" />,
    Storage: <Truck className="w-4 h-4" />,
    Preparation: <ChefHat className="w-4 h-4" />,
    Cooking: <Flame className="w-4 h-4" />,
    Serving: <ShieldCheck className="w-4 h-4" />,
  };

  const pillarColorMap: Record<string, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
    Starch: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", icon: <Wheat className="w-3 h-3" /> },
    Protein: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30", icon: <Beef className="w-3 h-3" /> },
    Egg: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30", icon: <Egg className="w-3 h-3" /> },
    Veg: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", icon: <Carrot className="w-3 h-3" /> },
  };

  const rulesByStage = stageOrder.map((stage) => ({
    stage,
    rules: kitchenRiskRules.filter((r) => r.stage === stage),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">12 Quy Tắc Rủi Ro Bếp Ăn Tập Thể (K01–K12)</h2>
              <p className="text-xs text-slate-400 mt-1">
                Căn cứ Quyết định 1246/QĐ-BYT (Kiểm thực 3 bước, Lưu mẫu 24h) & Nghị định 13/2023/NĐ-CP
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-emerald-400">12</div>
            <div className="text-xs text-slate-400">Luật tự động hóa</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-rose-400">CRITICAL (5)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-amber-400">HIGH (4)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-blue-400">MEDIUM (3)</span>
          </div>
          <div className="flex items-center gap-2 text-xs ml-auto">
            <span className="text-slate-400">Tổng mức độ nghiêm trọng:</span>
            <span className="font-bold text-emerald-400">47/60 điểm</span>
          </div>
        </div>
      </div>

      {/* Converging Supply Chain Visual */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-400" />
          Sơ Đồ Chuỗi Hội Tụ (Converging Supply Chain) → Cổng Tiếp Nhận Bếp Ăn
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Starch", "Protein", "Egg", "Veg"].map((pillar) => {
              const style = pillarColorMap[pillar];
              const ruleCount = kitchenRiskRules.filter((r) => {
                if (pillar === "Starch") return ["K01", "K10", "K11"].includes(r.id);
                if (pillar === "Protein") return ["K02", "K04", "K07"].includes(r.id);
                if (pillar === "Egg") return ["K12"].includes(r.id);
                if (pillar === "Veg") return ["K01", "K06"].includes(r.id);
                return false;
              }).length;

              return (
                <div key={pillar} className={`p-4 rounded-xl border transition-all ${style.bg} ${style.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`p-1.5 rounded-lg ${style.bg} ${style.text} ${style.border}`}>{style.icon}</span>
                    <span className="font-bold text-white text-sm">{pillar}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    {pillar === "Starch" && "Bột lọc, hủ tiếu, bún, phở, gạo ST25"}
                    {pillar === "Protein" && "Thịt heo, gà, cá tra/ba sa phi lê"}
                    {pillar === "Egg" && "Trứng gà tiệt trùng UV, trứng vịt"}
                    {pillar === "Veg" && "Rau lá, củ quả, nấm, dầu, nước mắm"}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Quy tắc liên quan:</span>
                    <span className="font-bold text-white">{ruleCount}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-2 py-2">
            <div className="text-slate-500 text-xs font-bold">HỘI TỤ TẠI CỔNG TIẾP NHẬN (Gate K02, K03, K04, K11, K12)</div>
            <div className="w-6 h-6 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-slate-900">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-slate-500 text-xs font-bold">BẾP CHẾ BIẾN & PHÂN PHỐI SUẤT ĂN</div>
          </div>
        </div>
      </div>

      {/* Rules by Stage */}
      <div className="space-y-6">
        {rulesByStage.map(({ stage, rules }) => (
          <div key={stage} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">{stageIcons[stage]}</div>
              <div>
                <h3 className="font-bold text-white capitalize">{stage}</h3>
                <p className="text-xs text-slate-400">{rules.length} quy tắc tự động hóa</p>
              </div>
            </div>
            <div className="divide-y divide-slate-800/60">
              {rules.map((rule) => (
                <KitchenRuleCard key={rule.id} rule={rule} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
