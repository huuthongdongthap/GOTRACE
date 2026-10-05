"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

export function RoiCalculator() {
  const [kitchenCount, setKitchenCount] = useState<number>(30);
  const [subscriptionFee, setSubscriptionFee] = useState<number>(2); // triệu/tháng
  const [diagnosticFee, setDiagnosticFee] = useState<number>(25); // triệu/gói

  // Calculations
  const pilotBudget = 715; // Triệu VNĐ
  const diagnosticRevenue = kitchenCount * diagnosticFee * 0.4; // 40% doanh nghiệp mua gói chẩn đoán
  const monthlyRecurringRevenue = kitchenCount * subscriptionFee; // MRR
  const annualRecurringRevenue = monthlyRecurringRevenue * 12;
  const monthsToBreakEven = Math.max(
    3,
    Math.ceil(pilotBudget / (monthlyRecurringRevenue + diagnosticRevenue / 6))
  );

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Bảng Tính ROI & Điểm Hòa Vốn Động (Interactive Financial Model)
          </h3>
          <p className="text-xs text-slate-400">
            Kéo thanh trượt để kiểm chứng mô hình dòng tiền khi nhân rộng chuỗi bếp ăn tại Đồng Tháp & Tây Nam Bộ
          </p>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
          Dự báo hòa vốn sau ~{monthsToBreakEven} tháng
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Số điểm bếp ăn / cơ sở onboard:</span>
            <span className="font-bold text-emerald-400">{kitchenCount} điểm</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={kitchenCount}
            onChange={(e) => setKitchenCount(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Phí thuê bao phần mềm (SaaS):</span>
            <span className="font-bold text-emerald-400">{subscriptionFee} tr/tháng</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={subscriptionFee}
            onChange={(e) => setSubscriptionFee(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Phí Gói Chẩn Đoán Dữ Liệu (Entry):</span>
            <span className="font-bold text-emerald-400">{diagnosticFee} tr/gói</span>
          </div>
          <input
            type="range"
            min="15"
            max="50"
            step="5"
            value={diagnosticFee}
            onChange={(e) => setDiagnosticFee(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
          <div className="text-[11px] text-slate-400">Doanh thu gói Entry chẩn đoán:</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{diagnosticRevenue.toFixed(0)} Tr</div>
          <div className="text-[10px] text-slate-500">Thu ngay khi ký HĐ dịch vụ</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
          <div className="text-[11px] text-slate-400">Doanh thu định kỳ tháng (MRR):</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{monthlyRecurringRevenue} Tr/tháng</div>
          <div className="text-[10px] text-slate-500">Phí dịch vụ lưu trữ & giám sát</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
          <div className="text-[11px] text-slate-400">Doanh thu năm đầu (ARR):</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{(annualRecurringRevenue + diagnosticRevenue).toFixed(0)} Tr</div>
          <div className="text-[10px] text-slate-500">Bao gồm SaaS + Chẩn đoán</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
          <div className="text-[11px] text-slate-400">Tỷ suất sinh lời sau 1 năm:</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            +{Math.round((((annualRecurringRevenue + diagnosticRevenue) - pilotBudget) / pilotBudget) * 100)}%
          </div>
          <div className="text-[10px] text-slate-500">So với ngân sách 715 Tr ban đầu</div>
        </div>
      </div>
    </div>
  );
}
