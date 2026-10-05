"use client";

import React from "react";
import { Wheat, Apple, Layers, ShieldCheck, ArrowRight } from "lucide-react";

interface SupplyChainsOverviewProps {
  onSelectChain?: (chain: "rice" | "fruit" | "kitchen") => void;
}

export function SupplyChainsOverview({ onSelectChain }: SupplyChainsOverviewProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">✦</span> BẢN ĐỒ 3 TRỤ CỘT CHUỖI CUNG ỨNG NÔNG SẢN ĐBSCL
          </h3>
          <p className="text-xs text-slate-400">
            GOTRACE V2.2 bao phủ toàn diện 3 dạng chuỗi đặc thù Tây Nam Bộ (Quy mô: 24M tấn Lúa • 6.7M tấn Trái cây • Hàng nghìn Bếp ăn)
          </p>
        </div>
        <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
          Chiến lược Trojan Horse: Bếp ăn là Bàn đạp → Mở rộng Lúa & Trái cây
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Chuỗi Tuyến Tính: Lúa Gạo */}
        <div
          onClick={() => onSelectChain && onSelectChain("rice")}
          className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4 space-y-2.5 hover:border-amber-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Chuỗi Tuyến Tính (Linear)
            </span>
            <Wheat className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
            1. Ngành Lúa Gạo 1 Triệu Héc-ta
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            29 Canonical Events từ nông hộ đến cảng xuất khẩu. Chuẩn hóa canh tác ngập khô xen kẽ (AWD) đo đạc giảm phát thải Metan (MRV Carbon) sinh tín chỉ <strong>$20/tấn CO2e</strong> và đối soát cân bằng ẩm độ lúa (26% → 14%).
          </p>
          <div className="pt-1 flex items-center text-xs text-amber-400 font-semibold gap-1">
            Xem Engine Lúa Gạo & Carbon <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2. Chuỗi Phân Nhánh: Trái Cây */}
        <div
          onClick={() => onSelectChain && onSelectChain("fruit")}
          className="rounded-lg border border-purple-500/30 bg-purple-950/10 p-4 space-y-2.5 hover:border-purple-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              Chuỗi Phân Nhánh (Branching)
            </span>
            <Apple className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
            2. Trái Cây Xuất Khẩu & IoT Cold-Chain
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sầu riêng Ri6, Xoài Cát Chu Cao Lãnh. Quản lý Mã số vùng trồng (MSVT GIS Polygon) theo Lệnh GACC 248/249/280, cảm biến IoT giám sát nhiệt độ xe container lạnh và kiểm soát dư lượng kim loại nặng Cadmium.
          </p>
          <div className="pt-1 flex items-center text-xs text-purple-400 font-semibold gap-1">
            Xem Engine Trái Cây & Cold-Chain <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 3. Chuỗi Hội Tụ: Bếp Ăn */}
        <div
          onClick={() => onSelectChain && onSelectChain("kitchen")}
          className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-4 space-y-2.5 hover:border-emerald-500/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Chuỗi Hội Tụ (Converging)
            </span>
            <Layers className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
            3. Bếp Ăn Bán Trú & KCN (Trojan Wedge)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hội tụ 4 Trụ cột Thực phẩm (Tinh bột, Đạm, Trứng, Rau). Mũi khoan chiến thuật 90 ngày thâm nhập bằng nỗi đau tuân thủ QĐ 1246/QĐ-BYT, diễn tập truy vết ngộ độc &lt; 15 phút, kích hoạt hệ số nhân kéo 4.8 nhà cung cấp vệ tinh.
          </p>
          <div className="pt-1 flex items-center text-xs text-emerald-400 font-semibold gap-1">
            Xem 12 Kitchen Rules & QĐ 1246 <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
