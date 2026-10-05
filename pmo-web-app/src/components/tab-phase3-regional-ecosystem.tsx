"use client";

import React, { useState } from "react";
import { Globe2, MapPin, Server, Coins } from "lucide-react";
import { RegionalProvincesSection } from "@/components/phase3/regional-provinces-section";
import { RegionalMultiTenantSection } from "@/components/phase3/regional-multitenant-section";
import { RegionalCarbonSection } from "@/components/phase3/regional-carbon-section";

export function TabPhase3RegionalEcosystem() {
  const [selectedSubTab, setSelectedSubTab] = useState<"provinces" | "multitenant" | "carbon">("provinces");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-emerald-950/80 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Globe2 className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe2 className="w-3.5 h-3.5" /> GIAI ĐOẠN 3: REGIONAL ECOSYSTEM (2028 – 2029)
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Hạ Tầng Dữ Liệu Vùng Tây Nam Bộ (7 Tỉnh ĐBSCL)
          </h2>
          <p className="text-slate-300 mt-2 leading-relaxed">
            Mở rộng quy mô toàn diện đến <strong>300 Bếp ăn Anchor</strong>, <strong>500+ Nhà cung cấp Tier-2</strong>,
            vận hành kiến trúc <strong>Multi-tenant Cloud & Edge Computing</strong>, và sàn giao dịch
            <strong> Tín Chỉ Carbon MRV Nông Nghiệp</strong> ($20/tấn CO2e).
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-700/50">
          <button
            onClick={() => setSelectedSubTab("provinces")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSubTab === "provinces"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <MapPin className="w-4 h-4" />
            1. Bản Đồ Mở Rộng 7 Tỉnh (300 Bếp Anchor)
          </button>
          <button
            onClick={() => setSelectedSubTab("multitenant")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSubTab === "multitenant"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <Server className="w-4 h-4" />
            2. Multi-tenant Cloud & 3 Edge Nodes
          </button>
          <button
            onClick={() => setSelectedSubTab("carbon")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSubTab === "carbon"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <Coins className="w-4 h-4" />
            3. Sàn Giao Dịch Tín Chỉ Carbon ($20/tấn)
          </button>
        </div>
      </div>

      {/* Render subcomponents */}
      {selectedSubTab === "provinces" && <RegionalProvincesSection />}
      {selectedSubTab === "multitenant" && <RegionalMultiTenantSection />}
      {selectedSubTab === "carbon" && <RegionalCarbonSection />}
    </div>
  );
}
