"use client";

import React, { useState } from "react";
import { QrCode, ShieldCheck } from "lucide-react";

export function TabTools() {
  // GCI Tool Simulator State
  const [gciBatch, setGciBatch] = useState("LOT-BOT-2026-0925-01");
  const [gciFacility, setGciFacility] = useState("HTX Bột Sa Đéc");
  const [gciItemType, setGciItemType] = useState("Bột gạo tươi lọc nước Sa Đéc");
  const [generatedGCI, setGeneratedGCI] = useState("");
  const [inspectionStep, setInspectionStep] = useState<1 | 2 | 3>(1);
  const [sampleLogged, setSampleLogged] = useState(false);

  const generateGCI = () => {
    const code = `GT:VN:ITEM:SADEC-FD:${btoa(gciBatch).substring(0, 8).toUpperCase()}`;
    setGeneratedGCI(code);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tool 1: GCI Generator & Inspector */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Trình Giả Lập Định Danh Chuẩn GCI V2.2
            </h3>
            <p className="text-xs text-slate-400">
              Cấu trúc định danh: GT:&lt;CC&gt;:&lt;TYPE&gt;:&lt;AUTHORITY&gt;:&lt;LOCAL-ID&gt;
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Mã Lô/Mẻ Sản Xuất</label>
            <input
              type="text"
              value={gciBatch}
              onChange={(e) => setGciBatch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Cơ sở sản xuất / HTX</label>
            <input
              type="text"
              value={gciFacility}
              onChange={(e) => setGciFacility(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Tên mặt hàng</label>
            <input
              type="text"
              value={gciItemType}
              onChange={(e) => setGciItemType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={generateGCI}
            className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-md shadow-emerald-600/20"
          >
            Phát Hành Mã GCI
          </button>
        </div>

        {generatedGCI && (
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
              GCI Chuẩn Đã Sinh:
            </div>
            <div className="font-mono text-sm text-white break-all font-bold">
              {generatedGCI}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-2 border-t border-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Trạng thái: VERIFIED (Đã đối soát biên bản tiếp nhận)
            </div>
          </div>
        )}
      </div>

      {/* Tool 2: QĐ 1246/QĐ-BYT Compliance Simulator */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Kiểm Thực 3 Bước & Lưu Mẫu 24H (QĐ 1246/QĐ-BYT)
            </h3>
            <p className="text-xs text-slate-400">
              Thay thế hoàn toàn sổ ghi chép giấy tại bếp ăn học đường và KCN
            </p>
          </div>
        </div>

        {/* 3 Step Tabs */}
        <div className="flex border-b border-slate-800">
          {[
            { step: 1, title: "Bước 1: Nhập thực phẩm" },
            { step: 2, title: "Bước 2: Chế biến" },
            { step: 3, title: "Bước 3: Trước khi ăn" },
          ].map(({ step, title }) => (
            <button
              key={step}
              onClick={() => setInspectionStep(step as any)}
              className={`flex-1 pb-2 text-xs font-semibold text-center border-b-2 transition-all ${
                inspectionStep === step
                  ? "border-blue-400 text-blue-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
          {inspectionStep === 1 && (
            <div className="space-y-2">
              <div className="font-bold text-slate-200">Kiểm tra thực phẩm ban đầu:</div>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                <li>Hạn sử dụng & Cảm quan: Đạt chuẩn mẻ bột tươi Sa Đéc</li>
                <li>Nhiệt độ giao hàng: &lt; 25°C (Đo bằng cảm biến IoT cầm tay)</li>
                <li>Chứng từ nguồn gốc: GCI liên kết trực tiếp HTX Bột Sa Đéc</li>
              </ul>
            </div>
          )}

          {inspectionStep === 2 && (
            <div className="space-y-2">
              <div className="font-bold text-slate-200">Kiểm tra chế biến tại bếp:</div>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                <li>Thời gian bắt đầu nấu sợi: 08:30 sáng</li>
                <li>Nhiệt độ sôi trung tâm: &gt; 100°C trong ít nhất 15 phút</li>
                <li>Tình trạng nhân sự chế biến: Đầy đủ găng tay, khẩu trang, nón trùm</li>
              </ul>
            </div>
          )}

          {inspectionStep === 3 && (
            <div className="space-y-2">
              <div className="font-bold text-slate-200">Kiểm tra bàn ăn & Lưu mẫu 24h:</div>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                <li>Mẫu thức ăn lưu: Suất bún/hủ tiếu hoàn chỉnh (khối lượng ≥ 150g)</li>
                <li>Hộp đựng chuyên dụng: Inox/thủy tinh đã tiệt trùng, niêm phong tem GCI</li>
                <li>Nhiệt độ tủ lưu mẫu: 2°C – 8°C với cảm biến log nhiệt độ liên tục</li>
              </ul>
            </div>
          )}

          <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
            <span className="text-slate-400">Biên bản số hóa:</span>
            <button
              onClick={() => setSampleLogged(!sampleLogged)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sampleLogged
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {sampleLogged ? "✓ Đã Lưu Hồ Sơ Mẫu Vào Ledger" : "Ghi Nhận & Khóa Sổ Số"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
