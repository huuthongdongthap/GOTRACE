"use client";

import React, { useState } from "react";
import { Code2, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";
import { buildGCI, parseGCI, PrimitiveType } from "@/lib/gotrace-platform";

export function GatewayGciCodec() {
  const [gciCountry] = useState("VN");
  const [gciProvince, setGciProvince] = useState("DT");
  const [gciPrimitive, setGciPrimitive] = useState<PrimitiveType>("LOT");
  const [gciEntity, setGciEntity] = useState("KITCHEN-SADEC-STARCH");
  const [gciSubId, setGciSubId] = useState("LOT-20260926-001");
  const [generatedGci, setGeneratedGci] = useState("");
  const [parseInput, setParseInput] = useState("GT:VN:DT:LOT:KITCHEN-SADEC-STARCH:LOT-20260926-001");
  const [parsedResult, setParsedResult] = useState<ReturnType<typeof parseGCI> | undefined>(undefined);

  const handleGenerateGci = () => {
    const code = buildGCI({
      country: gciCountry,
      province: gciProvince,
      primitiveType: gciPrimitive,
      entityCode: gciEntity,
      subId: gciSubId,
    });
    setGeneratedGci(code);
    setParseInput(code);
  };

  const handleParseGci = () => {
    const res = parseGCI(parseInput);
    setParsedResult(res);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Code2 className="w-5 h-5 text-teal-400" />
        <h3 className="font-bold text-white text-base">
          Bộ Sinh & Phân Giải Mã Chuỗi GCI Chuẩn Hóa V2.2
        </h3>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase">Tỉnh Thành</label>
            <select
              value={gciProvince}
              onChange={(e) => setGciProvince(e.target.value)}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="DT">DT — Đồng Tháp (Sa Đéc)</option>
              <option value="CT">CT — Cần Thơ (Trà Nóc)</option>
              <option value="AG">AG — An Giang (Long Xuyên)</option>
              <option value="LA">LA — Long An (Bến Lức)</option>
              <option value="CM">CM — Cà Mau</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase">Primitive Type</label>
            <select
              value={gciPrimitive}
              onChange={(e) => setGciPrimitive(e.target.value as PrimitiveType)}
              className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="LOT">LOT (Lô hàng/mẻ)</option>
              <option value="EVENT">EVENT (Sự kiện)</option>
              <option value="PARTY">PARTY (Chủ thể)</option>
              <option value="PLACE">PLACE (Địa điểm)</option>
              <option value="ITEM">ITEM (Vật phẩm)</option>
              <option value="EVIDENCE">EVIDENCE (Bằng chứng)</option>
              <option value="CLAIM">CLAIM (Chứng nhận)</option>
              <option value="VERIFICATION">VERIFICATION (Kiểm định)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase">Mã Thực Thể (Entity Code)</label>
          <input
            type="text"
            value={gciEntity}
            onChange={(e) => setGciEntity(e.target.value)}
            className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            placeholder="KITCHEN-SADEC-STARCH"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase">Mã Phân Đoạn (Sub-ID)</label>
          <input
            type="text"
            value={gciSubId}
            onChange={(e) => setGciSubId(e.target.value)}
            className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            placeholder="LOT-20260926-001"
          />
        </div>

        <button
          onClick={handleGenerateGci}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-teal-400" /> Sinh Mã Định Danh Toàn Cầu GCI
        </button>

        {/* Preview Code */}
        <div className="p-3 bg-indigo-950/40 border border-indigo-900/60 rounded-xl space-y-1">
          <div className="text-[11px] text-indigo-300 font-medium flex items-center justify-between">
            <span>MÃ GCI CHUẨN ĐÃ SINH:</span>
            <span className="text-[10px] bg-indigo-900/80 px-1.5 py-0.5 rounded text-indigo-200">HỢP LỆ</span>
          </div>
          <div className="font-mono text-xs font-bold text-white break-all select-all bg-slate-950 p-2 rounded-lg border border-indigo-950">
            {generatedGci || "GT:VN:DT:LOT:KITCHEN-SADEC-STARCH:LOT-20260926-001"}
          </div>
        </div>

        {/* Parser Form */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={parseInput}
              onChange={(e) => setParseInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-teal-500"
              placeholder="GT:VN:..."
            />
            <button
              onClick={handleParseGci}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg transition"
            >
              Giải Mã
            </button>
          </div>

          {parsedResult !== undefined && (
            <div
              className={`p-2.5 rounded-lg text-xs ${
                parsedResult
                  ? "bg-emerald-950/40 border border-emerald-800 text-emerald-300"
                  : "bg-rose-950/40 border border-rose-800 text-rose-300"
              }`}
            >
              {parsedResult ? (
                <div className="space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mã GCI Cấu Trúc Hợp Lệ
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Primitive: <strong>{parsedResult.primitiveType}</strong> | Tỉnh: <strong>{parsedResult.province}</strong> | Thực thể: <strong>{parsedResult.entityCode}</strong> {parsedResult.subId ? `| Sub-ID: ${parsedResult.subId}` : ""}
                  </div>
                </div>
              ) : (
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Mã GCI không đúng định dạng chuẩn (Cần dạng GT:VN:PROV:PRIMITIVE:ENTITY[:SUBID])
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
