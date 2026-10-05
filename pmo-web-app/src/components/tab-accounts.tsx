"use client";

import React, { useState } from "react";
import {
  anchorAccounts as initialAnchorAccounts,
  QUALIFICATION_THRESHOLD,
  AnchorAccount,
} from "@/lib/pmo-data";
import { MapPin } from "lucide-react";
import { AccountQualificationSandbox } from "@/components/accounts/account-qualification-sandbox";

export function TabAccounts() {
  const [accounts] = useState<AnchorAccount[]>(initialAnchorAccounts);
  const [selectedAccount, setSelectedAccount] = useState<AnchorAccount>(accounts[0]);

  const calculateTotal = (scores: Record<string, number>) => {
    return Object.values(scores).reduce((a, b) => a + b, 0);
  };

  const criteriaLabels = [
    { key: "networkReach", label: "1. Tầm ảnh hưởng mạng lưới (Network Reach)" },
    { key: "traceabilityPain", label: "2. Nỗi đau tuân thủ truy xuất (Traceability Pain)" },
    { key: "dataComplexity", label: "3. Độ phức tạp dữ liệu hiện hữu (Data Complexity)" },
    { key: "buyerAuthority", label: "4. Thẩm quyền quyết định ngân sách (Buyer Authority)" },
    { key: "digitalReadiness", label: "5. Mức độ sẵn sàng số hóa (Digital Readiness)" },
    { key: "expansionPotential", label: "6. Tiềm năng nhân rộng vùng (Expansion Potential)" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Account List */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            6 Khách Hàng Tiềm Năng Chuỗi Bột – Suất Ăn
          </h3>
          <span className="text-xs text-slate-400">
            Chuẩn: ≥{QUALIFICATION_THRESHOLD}/30đ
          </span>
        </div>

        <div className="space-y-3">
          {accounts.map((acc) => {
            const totalScore = calculateTotal(acc.scores);
            const isQualified = totalScore >= QUALIFICATION_THRESHOLD;
            const isSelected = selectedAccount.id === acc.id;

            return (
              <div
                key={acc.id}
                onClick={() => setSelectedAccount(acc)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-slate-900 border-emerald-500 shadow-md shadow-emerald-500/10"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {acc.segment}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{acc.name}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {acc.location}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className={`text-base font-extrabold ${isQualified ? "text-emerald-400" : "text-amber-400"}`}>
                      {totalScore}/30
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${isQualified ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {isQualified ? "Đạt chuẩn" : "Cần xem xét"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Scorecard Detail & Simulator */}
      <div className="lg:col-span-7 space-y-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {selectedAccount.id} • {selectedAccount.segment}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{selectedAccount.name}</h3>
              <p className="text-xs text-slate-400">Đại diện: {selectedAccount.legalRep}</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Tổng điểm đánh giá</span>
              <div className="text-3xl font-extrabold text-emerald-400">
                {calculateTotal(selectedAccount.scores)}
                <span className="text-sm text-slate-500 font-normal">/30</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-emerald-400">Vai trò trong chuỗi: </span>
            {selectedAccount.role}
          </div>

          {/* 6 Criteria Bars */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Điểm Chi Tiết Theo 6 Tiêu Chí Account Qualification
            </h4>

            {criteriaLabels.map(({ key, label }) => {
              const score = selectedAccount.scores[key as keyof typeof selectedAccount.scores];
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-bold text-emerald-400">{score}/5</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AccountQualificationSandbox />
      </div>
    </div>
  );
}
