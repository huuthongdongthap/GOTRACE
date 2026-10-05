"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { multiTenantEngine, ProvinceRolloutSummary } from "@/lib/multi-tenant-engine";

export function RegionalProvincesSection() {
  const [provinces] = useState<ProvinceRolloutSummary[]>(() =>
    multiTenantEngine.getRegionalSummary()
  );

  return (
    <div className="space-y-6">
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Mục Tiêu Bếp Anchor</div>
          <div className="text-2xl font-bold text-white mt-1">300 Bếp</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Trường học bán trú & KCN 7 tỉnh</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Mạng Lưới NCC Tier-2 (1:4.8)</div>
          <div className="text-2xl font-bold text-indigo-400 mt-1">525 NCC</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Tinh bột, Đạm, Trứng, Rau, Chuỗi lạnh</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Doanh Thu Thường Niên (ARR)</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">103.0 Tỷ VNĐ</div>
          <div className="text-[10px] text-slate-500 mt-0.5">SaaS + Diagnostic + Carbon fees</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Đội Ngũ Tác Chiến Hiện Trường</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">35 FTEs</div>
          <div className="text-[10px] text-slate-500 mt-0.5">5 nhân sự / trạm tỉnh tại 7 địa bàn</div>
        </div>
      </div>

      {/* Provincial Matrix Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <h3 className="font-semibold text-white">Chỉ Số Phân Bổ Theo 7 Tỉnh / Thành Phố</h3>
          <span className="text-xs font-mono text-slate-400">Kế Hoạch Rollout 2028 – 2029</span>
        </div>
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Tỉnh / Thành Phố</th>
              <th className="py-3 px-4">Cụm Edge Phụ Trách</th>
              <th className="py-3 px-4 text-center">Bếp Anchor</th>
              <th className="py-3 px-4 text-center">NCC Tier-2</th>
              <th className="py-3 px-4 text-right">Mục Tiêu ARR</th>
              <th className="py-3 px-4 text-center">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {provinces.map((p) => (
              <tr key={p.province} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {p.province_name_vn}
                </td>
                <td className="py-3 px-4 text-slate-400">{p.edge_node}</td>
                <td className="py-3 px-4 text-center font-mono">
                  <span className="text-emerald-400 font-bold">{p.active_anchors}</span>
                  <span className="text-slate-500"> / {p.target_anchors}</span>
                </td>
                <td className="py-3 px-4 text-center font-mono">
                  <span className="text-indigo-400 font-bold">{p.active_suppliers}</span>
                  <span className="text-slate-500"> / {p.target_suppliers}</span>
                </td>
                <td className="py-3 px-4 text-right font-mono font-semibold text-cyan-400">
                  {(p.target_arr_vnd / 1000000000).toFixed(1)} Tỷ
                </td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.active_anchors > 0
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {p.active_anchors > 0 ? "KÍCH HOẠT" : "QUY HOẠCH"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
