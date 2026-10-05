"use client";

import React, { useState } from "react";
import { salesBattleCards, SalesBattleCard } from "@/lib/pmo-data";
import { FileCheck2, Zap, ShieldCheck, ExternalLink } from "lucide-react";

export function TabSalesPlaybook() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              Sales Playbook: Trojan Horse Strategy & Objection Handling
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Quy trình bán hàng 11 bước + Kịch bản xử lý từ chối thực chiến cho miền Tây Nam Bộ
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Phase 2: Diagnostic → Pilot
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm leading-relaxed">
          <strong>Lưu ý:</strong> Doanh nghiệp truyền thống miền Tây luôn dị ứng với phần mềm ERP đắt đỏ. Công thức bán hàng của PMO là chào bán gói <strong>“Chẩn đoán dữ liệu chuỗi cung ứng” (2–4 tuần)</strong> như một dịch vụ tư vấn giảm thiểu rủi ro pháp lý, không phải bán phần mềm ngay. Sau khi chỉ ra các lỗ hổng dữ liệu khiến họ có nguy cơ bị đình chỉ bếp ăn hoặc mất hợp đồng thầu, GOTRACE V2.2 xuất hiện như giải pháp khắc phục tự nhiên.
        </div>
      </div>

      {/* Battle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {salesBattleCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => setActiveCard(activeCard === idx ? null : idx)}
            className={`rounded-xl border cursor-pointer transition-all shadow-lg ${
              activeCard === idx
                ? "bg-slate-900 border-emerald-500 shadow-md shadow-emerald-500/20"
                : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
            }`}
          >
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-2">{card.objection}</h4>
                  <p className="text-xs text-slate-400 mt-1">Click để mở chi tiết</p>
                </div>
              </div>

              {activeCard === idx && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                    Khách hàng nghĩ gì:
                  </div>
                  <div className="text-xs text-slate-300 italic bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    “{card.clientPerspective}”
                  </div>

                  <div className="text-[11px] text-emerald-400 uppercase tracking-wider">
                    Chiến thuật Trojan Horse:
                  </div>
                  <div className="text-xs text-slate-300 bg-emerald-950/30 p-3 rounded-lg border border-emerald-500/20">
                    {card.trojanHorseResponse}
                  </div>

                  <div className="text-[11px] text-blue-400 uppercase tracking-wider">
                    Bằng chứng đi kèm:
                  </div>
                  <div className="text-xs text-slate-300 flex items-start gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{card.evidenceToPresent}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Entry Offer Box */}
      <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Entry Offer bắt buộc trong quy trình tiếp cận 11 bước</h4>
            <p className="text-xs text-slate-300">Giai đoạn Market Mapping → Executive Discovery (B2B/B2B2G)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div>
            <div className="text-xs text-slate-400">Thời gian triển khai:</div>
            <div className="text-lg font-bold text-white">2–4 Tuần</div>
            <div className="text-[11px] text-slate-500">Chậm rãi nhưng sâu, không vội vàng bán software</div>
          </div>

          <div>
            <div className="text-xs text-slate-400">Giá trị giao dịch:</div>
            <div className="text-lg font-bold text-white">15–30 Triệu VNĐ</div>
            <div className="text-[11px] text-slate-500">Chỉ trả phí nếu phát hiện lỗ hổng truy xuất & rủi ro pháp lý</div>
          </div>

          <div>
            <div className="text-xs text-slate-400">Deliverables:</div>
            <div className="text-lg font-bold text-white">Báo cáo + GCI Demo</div>
            <div className="text-[11px] text-slate-500">Phát hiện lỗ hổng + Kế hoạch remediation (có thể dùng GOTRACE)</div>
          </div>
        </div>

        <div className="text-xs text-slate-400 italic">
          ⚠️ Tuyệt đối không lấy <em>Demo → Quote → Contract</em> làm quy trình mặc định. Doanh nghiệp miền Tây sẽ từ chối vì sợ tốn thêm chi phí phần mềm. Thay vào đó, hãy biến Gói Chẩn Đoán Dữ Liệu thành "khách mời đặc biệt" mà họ muốn mời bạn vào xem nhà máy trước khi quyết định mua sắm.
        </div>
      </div>
    </div>
  );
}
