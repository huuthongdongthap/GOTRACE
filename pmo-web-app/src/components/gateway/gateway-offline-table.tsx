"use client";

import React from "react";
import { Terminal, CheckCircle2, RefreshCw, AlertTriangle } from "lucide-react";
import { SyncQueueItem } from "@/lib/gotrace-platform";

interface GatewayOfflineTableProps {
  queueItems?: SyncQueueItem[];
}

export function GatewayOfflineTable({ queueItems = [] }: GatewayOfflineTableProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <h4 className="font-bold text-white text-sm">
            Nhật Ký Hàng Đợi Ngoại Tuyến (Offline Sync Buffer)
          </h4>
        </div>
        <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-900/60 px-2 py-0.5 rounded">
          Bảo Vệ Khi Mất Sóng Tại Cổng Bếp
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Khi Field Ops tiếp nhận nguyên liệu lúc 05:00 sáng tại khu vực tầng hầm hoặc góc khuất không có 4G/WiFi,
        mọi sự kiện kiểm thực, ảnh chụp cảm quan và phiếu cân sẽ được lưu trữ an toàn trong LocalStorage và tự động đồng bộ khi có kết nối trở lại.
      </p>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 text-[11px]">
          <span>ID SỰ KIỆN / THỜI ĐIỂM</span>
          <span>LOẠI ĐỐI TƯỢNG</span>
          <span>TRẠNG THÁI CORE</span>
        </div>

        <div className="flex items-center justify-between text-slate-300 py-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>EVT-20260926-0530-GATEIN-01</span>
          </div>
          <span className="text-indigo-400">EVENT / RECEIVED</span>
          <span className="text-emerald-400 font-semibold">SYNCED (Block #1849)</span>
        </div>

        <div className="flex items-center justify-between text-slate-300 py-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>EVI-20260926-VETCERT-PORK-08</span>
          </div>
          <span className="text-amber-400">EVIDENCE / LAB_VET</span>
          <span className="text-emerald-400 font-semibold">SYNCED (Block #1850)</span>
        </div>

        <div className="flex items-center justify-between text-slate-300 py-1">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
            <span>EVT-20260926-1030-SAMPLE-S001</span>
          </div>
          <span className="text-purple-400">EVENT / SAMPLED</span>
          <span className="text-amber-400 font-semibold">IN QUEUE (Retry #1)</span>
        </div>
      </div>
    </div>
  );
}
