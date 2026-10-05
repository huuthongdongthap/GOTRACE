"use client";

import React, { useState } from "react";
import { Server, Shield } from "lucide-react";

export function GatewayCredentials() {
  const [environment, setEnvironment] = useState<"production" | "staging" | "sandbox">("production");
  const [apiUrl, setApiUrl] = useState("https://api.gotrace.vn/v1");
  const [apiKey, setApiKey] = useState("gt_live_sec_mekong_pmo_2026_9df8a3");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
      <h4 className="font-bold text-white text-sm flex items-center gap-2">
        <Server className="w-4 h-4 text-indigo-400" />
        Cấu Hình Đấu Nối Cổng (Gateway Credentials)
      </h4>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-slate-400 block mb-1">Môi Trường Vận Hành</label>
          <div className="grid grid-cols-3 gap-2">
            {(["production", "staging", "sandbox"] as const).map((env) => (
              <button
                key={env}
                onClick={() => setEnvironment(env)}
                className={`py-1.5 rounded-lg border text-center font-medium capitalize transition ${
                  environment === env
                    ? "bg-indigo-600/30 border-indigo-500 text-white font-semibold"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {env}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-400 block mb-1">Core API Base URL</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-slate-400 block mb-1">API Key (X-API-Key Secret)</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 font-mono text-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>Ủy quyền pháp lý bởi PMO Tây Nam Bộ theo Quyết định số 01/2026/QĐ-GOTRACE.</span>
        </div>
      </div>
    </div>
  );
}
