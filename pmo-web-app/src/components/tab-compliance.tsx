"use client";

import React from "react";
import { govDocuments, riskRegister } from "@/lib/pmo-data";
import { FileCheck2, AlertTriangle } from "lucide-react";

export function TabCompliance() {
  const statusBadges = {
    signed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    submitted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    drafted: "bg-slate-800 text-slate-300 border-slate-700",
  };

  const statusTexts = {
    signed: "Đã ký kết",
    submitted: "Đã trình phê duyệt",
    drafted: "Đang dự thảo",
  };

  return (
    <div className="space-y-6">
      {/* Government Legal Filings */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              Hồ Sơ Pháp Lý & Thỏa Thuận Liên Ngành B2G
            </h3>
            <p className="text-xs text-slate-400">
              Căn cứ pháp lý xác lập quyền đại diện và bảo trợ dữ liệu của PMO tại Tây Nam Bộ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {govDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  {doc.id}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                    statusBadges[doc.status]
                  }`}
                >
                  {statusTexts[doc.status]}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{doc.name}</h4>
              <p className="text-xs text-emerald-400/90 font-medium">
                Cơ quan: {doc.authority}
              </p>
              <p className="text-xs text-slate-400">{doc.purpose}</p>
              <div className="text-[11px] text-slate-500 pt-1">
                Hạn hoàn tất: {doc.deadline}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Mitigation Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Ma Trận Quản Trị Rủi Ro & Biện Pháp Giảm Thiểu
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Rủi Ro Nhận Diện</th>
                <th className="p-3">Xác Suất</th>
                <th className="p-3">Tác Động</th>
                <th className="p-3">Biện Pháp Ứng Phó (Mitigation)</th>
                <th className="p-3">Chủ Trì</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {riskRegister.map((r, i) => (
                <tr key={i} className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-white">{r.risk}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        r.probability === "Cao"
                          ? "bg-rose-500/10 text-rose-400"
                          : r.probability === "Trung bình"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {r.probability}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        r.impact === "Cao"
                          ? "bg-rose-500/10 text-rose-400"
                          : r.impact === "Trung bình"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {r.impact}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 leading-relaxed max-w-md">
                    {r.mitigation}
                  </td>
                  <td className="p-3 text-slate-200 font-medium whitespace-nowrap">
                    {r.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
