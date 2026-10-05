"use client";

import React, { useState } from "react";
import { PackageCheck, PlusCircle, Wheat, Beef, Egg, Carrot } from "lucide-react";
import { GateInspectionRecord } from "./field-ops-types";
import { GateParameterInputs } from "./gate-parameter-inputs";

interface GateInspectionFormProps {
  onAddRecord: (record: GateInspectionRecord) => void;
}

const PILLAR_CONFIG = {
  Starch: { supplier: "HTX Bột Tân Phú Đông Sa Đéc", item: "Bột lọc / Hủ tiếu tươi Sa Đéc", temp: 25, icon: <Wheat className="w-4 h-4 text-amber-400" /> },
  Protein: { supplier: "Cty Thực phẩm VietGAP Cần Thơ", item: "Thịt heo nạc / Gà làm sạch", temp: 3.5, icon: <Beef className="w-4 h-4 text-rose-400" /> },
  Egg: { supplier: "Trang trại Trứng Sạch Ba Huân", item: "Trứng gà tươi tiệt trùng UV", temp: 22, icon: <Egg className="w-4 h-4 text-yellow-400" /> },
  Veg: { supplier: "HTX Rau sạch Cần Thơ / Đà Lạt", item: "Rau củ quả tươi VietGAP", temp: 20, icon: <Carrot className="w-4 h-4 text-emerald-400" /> },
};

export function GateInspectionForm({ onAddRecord }: GateInspectionFormProps) {
  const [pillar, setPillar] = useState<"Starch" | "Protein" | "Egg" | "Veg">("Starch");
  const [supplier, setSupplier] = useState(PILLAR_CONFIG.Starch.supplier);
  const [itemName, setItemName] = useState(PILLAR_CONFIG.Starch.item);
  const [lotNumber, setLotNumber] = useState(`LOT-${new Date().toISOString().slice(5, 10).replace("-", "")}-01`);
  const [weightKg, setWeightKg] = useState(60);
  const [tempCelsius, setTempCelsius] = useState(25.0);
  const [hasVetCert, setHasVetCert] = useState(true);
  const [freshnessHours, setFreshnessHours] = useState(5);
  const [eggCrackRatePercent, setEggCrackRatePercent] = useState(0);
  const [sensoryPassed, setSensoryPassed] = useState(true);
  const [inspectorName, setInspectorName] = useState("Kỹ thuật viên Hiện Trường PMO");

  const handlePillarChange = (p: "Starch" | "Protein" | "Egg" | "Veg") => {
    setPillar(p);
    const cfg = PILLAR_CONFIG[p];
    setSupplier(cfg.supplier);
    setItemName(cfg.item);
    setTempCelsius(cfg.temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const violations: string[] = [];

    if (pillar === "Protein" && tempCelsius > 5.0) violations.push("K02: Đứt gãy chuỗi lạnh thịt tươi (Nhiệt độ > 5°C)");
    if (pillar === "Protein" && !hasVetCert) violations.push("K04: Thiếu Giấy chứng nhận kiểm dịch động vật");
    if (pillar === "Starch" && freshnessHours > 18 && tempCelsius > 15) violations.push("K10: Bột/Sợi tươi Sa Đéc > 18h ở nhiệt độ thường");
    if (!sensoryPassed) violations.push("K11: Không đạt cảm quan/Nghi ngờ tồn dư hóa chất cấm");
    if (pillar === "Egg" && eggCrackRatePercent > 2.0) violations.push("K12: Tỷ lệ trứng dập vỡ > 2%");

    const isFatal = violations.some((v) => v.startsWith("K02") || v.startsWith("K04") || v.startsWith("K11"));
    const status: "PASSED" | "REJECTED" | "QUARANTINED" = violations.length === 0 ? "PASSED" : isFatal ? "REJECTED" : "QUARANTINED";

    const gciCode = `GT:VN:ITEM:${pillar.toUpperCase()}:${lotNumber}`;
    onAddRecord({
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString("vi-VN", { hour12: false }),
      pillar, supplier, itemName, gciCode, lotNumber, weightKg, tempCelsius,
      hasVetCert, freshnessHours, eggCrackRatePercent, sensoryPassed, violations, status,
      sampleSaved: status === "PASSED", sampleTemp: status === "PASSED" ? 4.0 : 0, inspectorName,
    });
    setLotNumber(`LOT-${pillar.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-teal-400" />
          Phiếu Thẩm Định & Tiếp Nhận Nguyên Liệu Cổng Bếp
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">BẾP ĂN BÁN TRÚ SA ĐÉC</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-bold mb-1.5">1. Chọn Trụ Cột Thực Phẩm Hội Tụ:</label>
          <div className="grid grid-cols-4 gap-2">
            {(["Starch", "Protein", "Egg", "Veg"] as const).map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => handlePillarChange(p)}
                className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                  pillar === p ? "bg-teal-500/20 border-teal-500/50 text-white font-bold" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40"
                }`}
              >
                {PILLAR_CONFIG[p].icon}
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 mb-1">Nhà Cung Cấp:</label>
            <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium" required />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Tên Nguyên Liệu:</label>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 mb-1">Số Lô Hàng (Lot):</label>
            <input type="text" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-emerald-400 font-mono font-bold" required />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">Khối Lượng (Kg):</label>
            <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold" min={1} required />
          </div>
        </div>

        <GateParameterInputs
          pillar={pillar} tempCelsius={tempCelsius} setTempCelsius={setTempCelsius}
          freshnessHours={freshnessHours} setFreshnessHours={setFreshnessHours}
          eggCrackRatePercent={eggCrackRatePercent} setEggCrackRatePercent={setEggCrackRatePercent}
          hasVetCert={hasVetCert} setHasVetCert={setHasVetCert}
          sensoryPassed={sensoryPassed} setSensoryPassed={setSensoryPassed}
        />

        <div>
          <label className="block text-slate-300 mb-1">Cán bộ Kiểm thực:</label>
          <input type="text" value={inspectorName} onChange={(e) => setInspectorName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" required />
        </div>

        <button type="submit" className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 text-xs">
          <PackageCheck className="w-4 h-4" />
          Thẩm Định & Ghi Nhận Sự Kiện Vào Ledger (QĐ 1246)
        </button>
      </form>
    </div>
  );
}
