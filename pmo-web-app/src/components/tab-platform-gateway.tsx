"use client";

import React, { useState } from "react";
import {
  Server,
  RefreshCw,
  CheckCircle2,
  Database,
  Layers,
  Wifi,
  WifiOff,
  UploadCloud,
  Activity,
} from "lucide-react";
import { GatewayPrimitivesCatalog } from "@/components/gateway/gateway-primitives-catalog";
import { GatewayOfflineTable } from "@/components/gateway/gateway-offline-table";
import { GatewayGciCodec } from "@/components/gateway/gateway-gci-codec";
import { GatewayCredentials } from "@/components/gateway/gateway-credentials";

export function TabPlatformGateway() {
  const [connectionStatus, setConnectionStatus] = useState<"CONNECTED" | "CONNECTING" | "OFFLINE">("CONNECTED");
  const [pingLatency, setPingLatency] = useState(42);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Vừa xong (10 giây trước)");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStats, setSyncStats] = useState({
    syncedEvents: 1420,
    syncedLots: 384,
    syncedEvidence: 512,
    pendingQueue: 3,
    syncSuccessRate: 99.8,
  });

  const handleTestConnection = () => {
    setConnectionStatus("CONNECTING");
    setTimeout(() => {
      setConnectionStatus("CONNECTED");
      setPingLatency(Math.floor(Math.random() * 20) + 30);
      setLastSyncTime("Vừa cập nhật (0 giây trước)");
    }, 800);
  };

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStats((prev) => ({
        ...prev,
        syncedEvents: prev.syncedEvents + prev.pendingQueue,
        pendingQueue: 0,
      }));
      setLastSyncTime("Vừa hoàn tất đồng bộ");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 p-6 rounded-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              CỔNG GIAO TIẾP NỀN TẢNG GỐC GOTRACE (CORE LEDGER GATEWAY)
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Đấu Nối Trực Tiếp 9 Primitives & Định Danh GCI Toàn Cầu
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Cổng API đồng bộ thời gian thực giữa Web App Hiện Trường PMO Sa Đéc và Hạ tầng Dữ liệu Gốc GOTRACE.
              Hỗ trợ cơ chế Offline-First, ký số SHA-256 bất biến và chuẩn hóa mã chuỗi GCI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTestConnection}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              Kiểm Tra ({pingLatency}ms)
            </button>
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Đang Đồng Bộ..." : "Đồng Bộ Lên Ledger"}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Connectivity Status & Sync Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Trạng Thái Cổng API</span>
            {connectionStatus === "CONNECTED" ? (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Wifi className="w-3.5 h-3.5" /> Trực Tuyến
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <WifiOff className="w-3.5 h-3.5" /> Ngoại Tuyến
              </span>
            )}
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              api.gotrace.vn
            </div>
            <div className="text-xs text-slate-400 mt-1">Độ trễ: <strong className="text-slate-200">{pingLatency} ms</strong> • TLS 1.3</div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Môi trường: <strong className="text-indigo-400">PRODUCTION</strong></span>
            <span>{lastSyncTime}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sự Kiện Đã Ghi Ledger</span>
            <Database className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{syncStats.syncedEvents.toLocaleString()}</div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% băm SHA-256 bất biến
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Lô hàng: <strong>{syncStats.syncedLots}</strong></span>
            <span>Bằng chứng: <strong>{syncStats.syncedEvidence}</strong></span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Hàng Đợi Ngoại Tuyến</span>
            <UploadCloud className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white">{syncStats.pendingQueue} <span className="text-xs font-normal text-slate-400">bản ghi chờ</span></div>
            <div className="text-xs text-slate-400 mt-1">LocalStorage an toàn</div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Tự động: <strong>Retry 3x</strong></span>
            <span className="text-emerald-400">{syncStats.syncSuccessRate}% thành công</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Độ Phủ 9 Core Primitives</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-cyan-400">9 / 9</div>
            <div className="text-xs text-slate-300 mt-1">SSOT Object Framework</div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Chuẩn: <strong>GT-DOC-02-BLP</strong></span>
            <span className="text-indigo-400">GCI v2.2</span>
          </div>
        </div>
      </div>

      {/* Main 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <GatewayPrimitivesCatalog />
          <GatewayOfflineTable />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <GatewayGciCodec />
          <GatewayCredentials />
        </div>
      </div>
    </div>
  );
}
