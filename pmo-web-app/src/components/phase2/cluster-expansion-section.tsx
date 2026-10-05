"use client";

import React, { useState } from "react";
import {
  MapPin,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Building,
  Users,
} from "lucide-react";

export function ClusterExpansionSection() {
  const [activeCluster, setActiveCluster] = useState<"sadec" | "cantho" | "longan">("cantho");

  const clusters = [
    {
      id: "sadec" as const,
      name: "Bàn Đạp Sa Đéc (Đồng Tháp)",
      badge: "ACTIVE • LIVE",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      description: "Trung tâm thực nghiệm & Làng nghề Bột Tân Phú Đông",
      anchor: "1 Bếp Trường Bán Trú (1.500 suất/ngày)",
      suppliers: "4 NCC (Bột Năm Hòa, Thịt heo, Trứng, Rau)",
      arr: "196 Triệu VNĐ/năm",
      sla: "12 phút 40 giây (Fire Drill verified)",
      multiplier: "1 : 4.8",
      readiness: "100% Hoàn Tất",
    },
    {
      id: "cantho" as const,
      name: "Cụm KCN Trà Nóc (Cần Thơ)",
      badge: "EXPANSION HUB (Q2/2027)",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      description: "Trụ sở điều hành Vùng Tây Nam Bộ & Cảng Logistics Trái Cây",
      anchor: "2 Bếp Công Nghiệp Thủy Sản (4.500 suất/ngày)",
      suppliers: "12 NCC (Chuỗi Lạnh, Đạm, Rau An Toàn)",
      arr: "420 Triệu VNĐ/năm",
      sla: "≤ 15 phút cam kết",
      multiplier: "1 : 6.0",
      readiness: "Kế hoạch M1 Sẵn Sàng (375.5M VNĐ)",
    },
    {
      id: "longan" as const,
      name: "Cụm Long An (Bến Lức / Đức Hòa)",
      badge: "INDUSTRIAL GATE (Q3/2027)",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      description: "Cửa ngõ tiếp giáp TP. Hồ Chí Minh & Cụm Bếp Công Nhân May Mặc",
      anchor: "3 Bếp May Mặc & Điện Tử (6.000 suất/ngày)",
      suppliers: "15 NCC Chuỗi Lạnh & Gia vị",
      arr: "650 Triệu VNĐ/năm",
      sla: "≤ 15 phút cam kết",
      multiplier: "1 : 5.0",
      readiness: "Khảo Sát Địa Bàn Hoàn Tất",
    },
  ];

  const selected = clusters.find((c) => c.id === activeCluster) || clusters[1];

  return (
    <div className="space-y-6">
      {/* Cluster Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clusters.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCluster(c.id)}
            className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden ${
              activeCluster === c.id
                ? "bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${c.badgeColor}`}>
                {c.badge}
              </span>
              <span className="text-xs font-mono text-slate-500">{c.multiplier}</span>
            </div>
            <h4 className="font-bold text-white text-base mt-2">{c.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{c.description}</p>
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Doanh Thu Dự Phóng:</span>
              <span className="font-bold text-cyan-400">{c.arr}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Deep Dive Panel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Chi Tiết Vận Hành: {selected.name}</h3>
              <p className="text-xs text-slate-400">{selected.description}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> {selected.readiness}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">Bếp Ăn Anchor</div>
            <div className="text-sm font-bold text-white mt-1.5">{selected.anchor}</div>
            <div className="text-[11px] text-slate-500 mt-1">Đấu nối Rule Engine K01–K12</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">Nhà Cung Cấp Vệ Tinh (GCI)</div>
            <div className="text-sm font-bold text-indigo-400 mt-1.5">{selected.suppliers}</div>
            <div className="text-[11px] text-slate-500 mt-1">Hệ số nhân {selected.multiplier}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">Doanh Thu Thuê Bao ARR</div>
            <div className="text-sm font-bold text-cyan-400 mt-1.5">{selected.arr}</div>
            <div className="text-[11px] text-slate-500 mt-1">Khấu trừ 100% Diagnostic</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">SLA Phản Ứng Sự Cố</div>
            <div className="text-sm font-bold text-emerald-400 mt-1.5">{selected.sla}</div>
            <div className="text-[11px] text-slate-500 mt-1">Truy vết ngược Traceback</div>
          </div>
        </div>

        {/* Operational Deployment Plan Steps */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Hạ Tầng Triển Khai Thực Địa Chuẩn Hóa:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="font-semibold text-white">1. Cổng Tiếp Nhận (Gate Kit):</div>
              <div className="text-slate-400 mt-1">
                01 Tablet Samsung Rugged + 01 Cân điện tử RS-232 + 01 Máy quét QR không dây.
              </div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="font-semibold text-white">2. Quy Trình QĐ 1246/QĐ-BYT:</div>
              <div className="text-slate-400 mt-1">
                Kiểm thực 3 bước số hóa, tủ lưu mẫu 24h có cảm biến IoT nhiệt độ 2°C – 8°C.
              </div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="font-semibold text-white">3. Đào Tạo Vận Hành Bếp:</div>
              <div className="text-slate-400 mt-1">
                2 Chuyên viên Field Ops trực tiếp tại cổng 05:00 – 07:30 sáng trong 14 ngày đầu.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
