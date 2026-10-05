"use client";

import React, { useState } from "react";
import { Building, CheckCircle2 } from "lucide-react";
import { multiTenantEngine, TenantProfile } from "@/lib/multi-tenant-engine";

export function RegionalMultiTenantSection() {
  const [tenants] = useState<TenantProfile[]>(() => multiTenantEngine.listTenants());
  const [selectedTenantId, setSelectedTenantId] = useState<string>("kcn-tranoc-seafood");
  const selectedTenant = tenants.find((t) => t.tenant_id === selectedTenantId) || tenants[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Tenant Directory */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-white">Danh Mục Multi-tenant</h3>
            <span className="text-xs text-indigo-400 font-mono">Row-Level Security</span>
          </div>
          <div className="space-y-2.5">
            {tenants.map((t) => (
              <button
                key={t.tenant_id}
                onClick={() => setSelectedTenantId(t.tenant_id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  selectedTenantId === t.tenant_id
                    ? "bg-slate-800 border-indigo-500 shadow-md shadow-indigo-500/10"
                    : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{t.tenant_name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-400">
                    {t.province}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyan-400 mt-1">{t.subdomain}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Công suất: {t.daily_meals_capacity.toLocaleString()} suất • {t.active_tier2_suppliers_count} NCC Tier-2
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Tenant Active Detail & Edge Node Routing */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{selectedTenant.tenant_name}</h3>
                <p className="text-xs text-slate-400">Mã Tenant: {selectedTenant.tenant_id}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              {selectedTenant.fsaas_tier}
            </span>
          </div>

          {/* Edge Node Cluster Latency Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400">Cụm Edge Phục Vụ</div>
              <div className="text-sm font-bold text-indigo-400 mt-1">{selectedTenant.edge_node_cluster}</div>
              <div className="text-[10px] text-slate-500 mt-1">Độ trễ cổng Gate Kit: 18 ms</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400">Phí Dịch Vụ FSaaS Tháng</div>
              <div className="text-sm font-bold text-cyan-400 mt-1">
                {(selectedTenant.monthly_saas_fee_vnd / 1000000).toFixed(1)} Triệu / tháng
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Bao gồm Tablet + Cảm biến tủ mẫu</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400">Tên Miền Quản Trị Độc Lập</div>
              <div className="text-xs font-mono font-bold text-emerald-400 mt-1 truncate">
                {selectedTenant.subdomain}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">SSL Certificate & SSO Enabled</div>
            </div>
          </div>

          {/* Security & Isolation Features */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Chế Độ Bảo Mật & Phân Lập Dữ Liệu Thực Địa:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-start gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">PostgreSQL RLS:</strong> Mã khóa tenant riêng biệt, cô lập dữ liệu tuyệt đối giữa các trường học và nhà máy.
                </div>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Offline-First Gate Sync:</strong> Khi mất mạng Internet tại cổng, dữ liệu kiểm thực lưu bộ nhớ đệm và tự đồng bộ khi có 4G.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
