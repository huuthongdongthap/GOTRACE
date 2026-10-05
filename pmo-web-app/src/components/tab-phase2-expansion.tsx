"use client";

import React, { useState } from "react";
import {
  Layers,
  Truck,
  Wheat,
  MapPin,
} from "lucide-react";
import { FruitColdchainSection } from "@/components/phase2/fruit-coldchain-section";
import { RiceCarbonSection } from "@/components/phase2/rice-carbon-section";
import { ClusterExpansionSection } from "@/components/phase2/cluster-expansion-section";

export function TabPhase2Expansion() {
  const [selectedSupplyChain, setSelectedSupplyChain] = useState<"fruit" | "rice" | "cluster">("fruit");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Layers className="w-64 h-64 text-emerald-400" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" /> GIAI ĐOẠN 2: COMPLEXITY PROOF & SCALE-OUT
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Mở Rộng Đa Tỉnh & Chứng Minh Độ Phức Tạp (Phase 2)
          </h2>
          <p className="text-slate-300 mt-2 leading-relaxed">
            Hợp nhất dữ liệu chuỗi đồ thị phân nhánh <strong>Trái Cây Xuất Khẩu (Lệnh 280 GACC)</strong>,
            chuỗi tuyến tính quy mô lớn <strong>Đề Án 1 Triệu Hecta Lúa Gạo (Tín chỉ Carbon MRV)</strong>,
            và mở rộng cụm Bếp ăn Anchor sang <strong>Cần Thơ & Long An</strong>.
          </p>
        </div>

        {/* Tab Navigation inside Phase 2 */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-700/50">
          <button
            onClick={() => setSelectedSupplyChain("fruit")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSupplyChain === "fruit"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <Truck className="w-4 h-4" />
            1. Trái Cây & IoT Cold-chain (GACC)
          </button>
          <button
            onClick={() => setSelectedSupplyChain("rice")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSupplyChain === "rice"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <Wheat className="w-4 h-4" />
            2. Lúa Gạo 1Mha & Carbon MRV ($20/tấn)
          </button>
          <button
            onClick={() => setSelectedSupplyChain("cluster")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSupplyChain === "cluster"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            <MapPin className="w-4 h-4" />
            3. Cụm Bếp Cần Thơ & Long An (Multiplier 1:5)
          </button>
        </div>
      </div>

      {/* RENDER MODULAR SUB-SECTIONS */}
      {selectedSupplyChain === "fruit" && <FruitColdchainSection />}
      {selectedSupplyChain === "rice" && <RiceCarbonSection />}
      {selectedSupplyChain === "cluster" && <ClusterExpansionSection />}
    </div>
  );
}
