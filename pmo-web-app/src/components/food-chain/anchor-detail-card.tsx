"use client";

import React from "react";
import { AnchorAccount } from "@/lib/pmo-data";
import { MapPin, Sparkles } from "lucide-react";

interface AnchorDetailCardProps {
  selectedAnchor: AnchorAccount;
}

export function AnchorDetailCard({ selectedAnchor }: AnchorDetailCardProps) {
  const totalScore = Object.values(selectedAnchor.scores).reduce((a, b) => a + b, 0);

  const scoreItems = [
    { label: "Tầm ảnh hưởng mạng lưới", score: selectedAnchor.scores.networkReach },
    { label: "Nỗi đau truy xuất nguồn gốc", score: selectedAnchor.scores.traceabilityPain },
    { label: "Độ phức tạp dữ liệu chuỗi", score: selectedAnchor.scores.dataComplexity },
    { label: "Thẩm quyền phê duyệt ngân sách", score: selectedAnchor.scores.buyerAuthority },
    { label: "Mức độ sẵn sàng số hóa", score: selectedAnchor.scores.digitalReadiness },
    { label: "Tiềm năng nhân rộng Tây Nam Bộ", score: selectedAnchor.scores.expansionPotential },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
      <div className="flex items-start justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {selectedAnchor.id} • PHÂN KHÚC: {selectedAnchor.segment}
          </span>
          <h3 className="text-lg font-bold text-white mt-1">{selectedAnchor.name}</h3>
          <p className="text-xs text-slate-400 mt-1">
            Đại diện pháp lý / Chức vụ: <strong className="text-slate-200">{selectedAnchor.legalRep}</strong>
          </p>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-500" />
            {selectedAnchor.location}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400">Điểm Qualification</span>
          <div className="text-3xl font-extrabold text-emerald-400">
            {totalScore}
            <span className="text-sm text-slate-500 font-normal">/30</span>
          </div>
        </div>
      </div>

      {/* Strategic Role & Value Proposition */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Vai Trò Trọng Yếu Trong Chuỗi Cung Ứng
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{selectedAnchor.role}</p>
      </div>

      {/* 6 Score Dimensions */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Đánh Giá Năng Lực & Tầm Ảnh Hưởng Dữ Liệu
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {scoreItems.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span>{item.label}</span>
                <strong className="text-emerald-400 font-mono">{item.score}/5</strong>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trojan Horse Offer */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-950 border border-emerald-800/40 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-400">
            Gói Chẩn Đoán Dữ Liệu Chuỗi Cung Ứng (Trojan Horse Entry)
          </div>
          <div className="text-[11px] text-slate-400 leading-snug">
            Đánh giá 2–4 tuần (30–50 triệu VNĐ) giúp đơn vị hoàn thiện hồ sơ đấu thầu bếp ăn học đường và KCN.
          </div>
        </div>
        <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold whitespace-nowrap transition-all shadow-md">
          Tạo Đề Xuất Khảo Sát
        </button>
      </div>
    </div>
  );
}
