"use client";

import React, { useState } from "react";
import { Thermometer, Zap, Send, AlertTriangle, CheckCircle2, MapPin } from "lucide-react";
import { coldChainIoTGateway, TelemetryReading, TelemetryAlert } from "@/lib/iot-gateway";

interface ContainerProfile {
  id: string;
  cargo: string;
  origin: string;
  polygonId: string;
  destination: string;
  route: string;
}

interface FruitContainerTelemetryProps {
  containerProfiles: ContainerProfile[];
  selectedContainer: string;
  onSelectContainer: (id: string) => void;
}

export function FruitContainerTelemetry({
  containerProfiles,
  selectedContainer,
  onSelectContainer,
}: FruitContainerTelemetryProps) {
  const [liveTemp, setLiveTemp] = useState(4.2);
  const [liveHumidity, setLiveHumidity] = useState(88);
  const [doorOpen, setDoorOpen] = useState(false);
  const [reeferFault, setReeferFault] = useState(false);
  const [latestAlert, setLatestAlert] = useState<TelemetryAlert | null>(null);

  const currentCont =
    containerProfiles.find((c) => c.id === selectedContainer) ||
    containerProfiles[0];

  const handlePushTelemetry = () => {
    const reading: TelemetryReading = {
      container_id: currentCont.id,
      timestamp: new Date().toISOString(),
      temperature: liveTemp,
      humidity: liveHumidity,
      location: {
        latitude: 10.3021,
        longitude: 105.7482,
        address_marker: currentCont.route,
      },
      door_status: doorOpen ? "OPEN" : "CLOSED",
      battery_pct: 94,
      reefer_power_status: reeferFault ? "FAULT" : "ACTIVE",
    };

    const alert = coldChainIoTGateway.ingestReading(reading);
    setLatestAlert(alert);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Giám Sát IoT Cold-chain Thời Gian Thực</h3>
            <p className="text-xs text-slate-400">
              Engine Ingest: Cảm biến nhiệt, độ ẩm & rơ le lạnh (Lệnh 280 GACC 2°C - 5°C)
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          MQTT Live Engine
        </span>
      </div>

      {/* Container Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {containerProfiles.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              onSelectContainer(c.id);
              setLatestAlert(null);
            }}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              selectedContainer === c.id
                ? "bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-500/10"
                : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">{c.id}</span>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                MSVT VALID
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-200 mt-1">{c.cargo}</div>
            <div className="text-xs text-slate-400 mt-0.5 truncate">{c.origin}</div>
          </button>
        ))}
      </div>

      {/* Sensor Injector */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400" /> Giả Lập Tín Hiệu Cảm Biến Hiện Trường
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-[11px] text-slate-400">Nhiệt Độ Thùng ({liveTemp}°C):</label>
            <input
              type="range"
              min="0.5"
              max="9.0"
              step="0.1"
              value={liveTemp}
              onChange={(e) => setLiveTemp(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 mt-1 cursor-pointer"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Độ Ẩm ({liveHumidity}%):</label>
            <input
              type="range"
              min="60"
              max="98"
              step="1"
              value={liveHumidity}
              onChange={(e) => setLiveHumidity(parseInt(e.target.value))}
              className="w-full accent-indigo-500 mt-1 cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={doorOpen}
                onChange={(e) => setDoorOpen(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              Cửa Mở (Door Ajar)
            </label>
          </div>
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={reeferFault}
                onChange={(e) => setReeferFault(e.target.checked)}
                className="accent-rose-500 rounded"
              />
              Máy Lạnh Lỗi (Fault)
            </label>
          </div>
        </div>

        <button
          onClick={handlePushTelemetry}
          className="w-full py-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Send className="w-3.5 h-3.5" /> Gửi Gói Dữ Liệu Sang Động Cơ IoT Gateway
        </button>
      </div>

      {latestAlert ? (
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-3 animate-fadeIn ${
            latestAlert.severity === "CRITICAL"
              ? "bg-rose-950/40 border-rose-500/50 text-rose-300"
              : "bg-amber-950/40 border-amber-500/50 text-amber-300"
          }`}
        >
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-bold uppercase tracking-wider">{latestAlert.code} [{latestAlert.severity}]</div>
            <div>{latestAlert.message}</div>
            <div className="text-[10px] opacity-75 font-mono">
              Container: {latestAlert.container_id} • Thời gian: {latestAlert.timestamp}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Nhiệt độ hiện tại {liveTemp}°C trong giới hạn chuẩn GACC (2.0°C – 5.0°C). Trạng thái tối ưu!</span>
        </div>
      )}

      <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Lộ trình: {currentCont.route}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">Tọa độ: 10.3021°N, 105.7482°E</span>
      </div>
    </div>
  );
}
