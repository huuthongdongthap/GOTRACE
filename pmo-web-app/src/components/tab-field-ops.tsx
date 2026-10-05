"use client";

import React, { useState, useEffect } from "react";
import {
  ClipboardCheck,
  PackageCheck,
  FileText,
} from "lucide-react";
import { GateInspectionRecord, DEFAULT_RECORDS } from "./field-ops/field-ops-types";
import { GateInspectionForm } from "./field-ops/gate-inspection-form";
import { GateLogHistory } from "./field-ops/gate-log-history";
import { FieldOpsCertificate } from "./field-ops/field-ops-certificate";

export function TabFieldOps() {
  const [records, setRecords] = useState<GateInspectionRecord[]>(DEFAULT_RECORDS);
  const [activeSubTab, setActiveSubTab] = useState<"logger" | "certificate">("logger");
  const [selectedRecord, setSelectedRecord] = useState<GateInspectionRecord>(DEFAULT_RECORDS[0]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gotrace_gate_records");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecords(parsed);
          setSelectedRecord(parsed[0]);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveRecords = (newRecords: GateInspectionRecord[]) => {
    setRecords(newRecords);
    try {
      localStorage.setItem("gotrace_gate_records", JSON.stringify(newRecords));
    } catch {
      // ignore
    }
  };

  const handleAddRecord = (newRecord: GateInspectionRecord) => {
    const updated = [newRecord, ...records];
    saveRecords(updated);
    setSelectedRecord(newRecord);
    alert(`Đã ghi nhận sự kiện tiếp nhận thành công!\nTrạng thái: ${newRecord.status}\nMã GCI: ${newRecord.gciCode}`);
  };

  const handleSelectRecord = (record: GateInspectionRecord) => {
    setSelectedRecord(record);
    setActiveSubTab("certificate");
  };

  const handleResetRecords = () => {
    saveRecords(DEFAULT_RECORDS);
    setSelectedRecord(DEFAULT_RECORDS[0]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <ClipboardCheck className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Vận Hành Hiện Trường & Kiểm Thực 3 Bước</h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE FIELD OPS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Số hóa quy trình Quyết định 1246/QĐ-BYT • Lưu mẫu 24h ở 2–8°C • Rule Engine Tiếp nhận (K01–K12)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab("logger")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === "logger"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              Ghi Nhận Lô Nhập Cổng
            </button>
            <button
              onClick={() => setActiveSubTab("certificate")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === "certificate"
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <FileText className="w-4 h-4" />
              Biên Bản Kiểm Thực QĐ 1246
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">Tổng lô nhập hôm nay</div>
            <div className="text-lg font-black text-white">{records.length} lô</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">Đạt chuẩn tiếp nhận</div>
            <div className="text-lg font-black text-emerald-400">
              {records.filter((r) => r.status === "PASSED").length} / {records.length}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">Lô bị từ chối / cách ly</div>
            <div className="text-lg font-black text-rose-400">
              {records.filter((r) => r.status !== "PASSED").length} lô
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400">Đã kích hoạt lưu mẫu 24h</div>
            <div className="text-lg font-black text-amber-400">
              {records.filter((r) => r.sampleSaved).length} mẫu (2–8°C)
            </div>
          </div>
        </div>
      </div>

      {activeSubTab === "logger" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <GateInspectionForm onAddRecord={handleAddRecord} />
          </div>
          <div className="lg:col-span-5">
            <GateLogHistory
              records={records}
              selectedRecord={selectedRecord}
              onSelectRecord={handleSelectRecord}
              onResetRecords={handleResetRecords}
            />
          </div>
        </div>
      ) : (
        <FieldOpsCertificate
          selectedRecord={selectedRecord}
          onBack={() => setActiveSubTab("logger")}
        />
      )}
    </div>
  );
}
