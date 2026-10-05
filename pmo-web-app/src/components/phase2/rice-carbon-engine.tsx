"use client";

import React, { useState } from "react";
import { Leaf, CheckCircle2, RefreshCw } from "lucide-react";
import {
  mrvCarbonCalculator,
  AwdCultivationLog,
  CarbonCreditEstimate,
} from "@/lib/mrv-carbon";

export function RiceCarbonEngine() {
  const [areaHa, setAreaHa] = useState(150);
  const [cropDuration, setCropDuration] = useState(95);
  const [waterManagement, setWaterManagement] = useState<
    "CONTINUOUS_FLOODING" | "SINGLE_AERATION" | "MULTIPLE_AERATION_AWD"
  >("MULTIPLE_AERATION_AWD");
  const [carbonPriceUsd, setCarbonPriceUsd] = useState(20);
  const [estimate, setEstimate] = useState<CarbonCreditEstimate>(() => {
    return mrvCarbonCalculator.calculateAwdReduction({
      farm_id: "HTX-THAP-MUOI-01",
      polygon_id: "POLY-RICE-TM-4412",
      farmer_group: "HTX Lúa Vàng Đồng Tháp",
      season_crop: "DONG_XUAN",
      area_ha: 150,
      crop_duration_days: 95,
      pre_season_water_regime: "NON_FLOODED_PRE_SEASON",
      water_management: "MULTIPLE_AERATION_AWD",
      organic_amendment_type: "STRAW_INCORPORATED_SHORT",
      verified_dry_cycles_count: 4,
    });
  });

  const handleRecalculateCarbon = () => {
    const log: AwdCultivationLog = {
      farm_id: "HTX-THAP-MUOI-01",
      polygon_id: "POLY-RICE-TM-4412",
      farmer_group: "HTX Lúa Vàng Đồng Tháp",
      season_crop: "DONG_XUAN",
      area_ha: areaHa,
      crop_duration_days: cropDuration,
      pre_season_water_regime: "NON_FLOODED_PRE_SEASON",
      water_management: waterManagement,
      organic_amendment_type: "STRAW_INCORPORATED_SHORT",
      verified_dry_cycles_count: 4,
    };
    const res = mrvCarbonCalculator.calculateAwdReduction(log, carbonPriceUsd);
    setEstimate(res);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Động Cơ Tính Toán Tín Chỉ Carbon MRV (IPCC Tier 2)</h3>
            <p className="text-xs text-slate-400">
              Đề Án 1 Triệu Hecta Lúa Chất Lượng Cao, Phát Thải Thấp Vùng ĐBSCL (Bộ NN&PTNT)
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" /> ISO 14064-2 Compliant
        </span>
      </div>

      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Diện Tích (Ha):</span>
              <span className="font-bold font-mono text-emerald-400">{areaHa} Ha</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={areaHa}
              onChange={(e) => setAreaHa(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Thời Gian Vụ (Ngày):</span>
              <span className="font-bold font-mono text-cyan-400">{cropDuration} Ngày</span>
            </div>
            <input
              type="range"
              min="80"
              max="120"
              step="5"
              value={cropDuration}
              onChange={(e) => setCropDuration(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Giá Carbon (USD/tấn):</span>
              <span className="font-bold font-mono text-amber-400">${carbonPriceUsd}</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="2"
              value={carbonPriceUsd}
              onChange={(e) => setCarbonPriceUsd(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Chế Độ Quản Lý Nước:</span>
            <select
              value={waterManagement}
              onChange={(e) =>
                setWaterManagement(e.target.value as "CONTINUOUS_FLOODING" | "SINGLE_AERATION" | "MULTIPLE_AERATION_AWD")
              }
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1 text-xs"
            >
              <option value="MULTIPLE_AERATION_AWD">AWD Ngập Khô Xen Kẽ Nhiều Lần (SFw = 0.52)</option>
              <option value="SINGLE_AERATION">Rút Nước 1 Lần Giữa Vụ (SFw = 0.71)</option>
              <option value="CONTINUOUS_FLOODING">Ngập Liên Tục (Baseline SFw = 1.00)</option>
            </select>
          </div>

          <button
            onClick={handleRecalculateCarbon}
            className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-all shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Tính Lại Tín Chỉ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Giảm Phát Thải CO2e</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {estimate.co2e_reduction_tons.toFixed(1)} <span className="text-sm font-normal">tấn</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Baseline: {estimate.baseline_ch4_kg.toFixed(0)} kg → AWD: {estimate.awd_ch4_kg.toFixed(0)} kg CH4
          </div>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Giá Trị Tín Chỉ (USD)</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">
            ${estimate.total_value_usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Đơn giá: ${estimate.carbon_price_usd_per_ton}/tấn CO2e</div>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400">Quy Đổi Doanh Thu (VNĐ)</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">
            {(estimate.total_value_vnd / 1000000).toFixed(1)} <span className="text-sm font-normal">Triệu</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Tỷ giá: 25.400 VNĐ/USD</div>
        </div>
      </div>

      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          <div className="text-slate-400">Mã Chứng Thư Phát Hành:</div>
          <div className="font-mono font-bold text-emerald-400">{estimate.certificate_id}</div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          Phương pháp: <span className="text-white font-medium">{estimate.methodology}</span>
        </div>
      </div>
    </div>
  );
}
