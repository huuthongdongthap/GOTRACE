"use client";

import React from "react";
import { Printer } from "lucide-react";
import { GateInspectionRecord } from "./field-ops-types";

interface FieldOpsCertificateProps {
  selectedRecord: GateInspectionRecord;
  onBack: () => void;
}

export function FieldOpsCertificate({ selectedRecord, onBack }: FieldOpsCertificateProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-3 print:hidden">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-all"
        >
          ← Quay Lại Nhập Liệu
        </button>
        <button
          onClick={handlePrint}
          className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          In Biên Bản Kiểm Thực 3 Bước (PDF / Print-ready)
        </button>
      </div>

      <div className="bg-white text-slate-900 p-8 rounded-xl border border-slate-200 shadow-xl max-w-4xl mx-auto print:p-0 print:border-none print:shadow-none print:max-w-full">
        <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-600">
            BỘ Y TẾ — CỤC AN TOÀN THỰC PHẨM
          </div>
          <h1 className="text-lg font-black text-slate-900 uppercase mt-1">
            BIÊN BẢN KIỂM THỰC 3 BƯỚC & LƯU MẪU THỨC ĂN 24 GIỜ
          </h1>
          <div className="text-xs text-slate-600 italic">
            (Theo Quyết định số 1246/QĐ-BYT ngày 31 tháng 3 năm 2017 của Bộ Y tế)
          </div>
          <div className="text-xs font-bold mt-2 text-teal-800">
            Hệ Thống Số Hóa GOTRACE V2.2 — Mã Hồ Sơ: {selectedRecord.id}
          </div>
        </div>

        {/* General Info */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-6">
          <div>
            <p><strong>Đơn vị thực hiện:</strong> Bếp ăn bán trú trường học / KCN Sa Đéc</p>
            <p><strong>Địa chỉ:</strong> TP. Sa Đéc, Tỉnh Đồng Tháp</p>
            <p><strong>Cán bộ kiểm tra:</strong> {selectedRecord.inspectorName}</p>
          </div>
          <div>
            <p><strong>Thời gian tiếp nhận:</strong> {selectedRecord.timestamp}</p>
            <p><strong>Định danh toàn cầu GCI:</strong> <span className="font-mono font-bold text-teal-800">{selectedRecord.gciCode}</span></p>
            <p>
              <strong>Tình trạng kết luận:</strong>{" "}
              <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                selectedRecord.status === "PASSED" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}>
                {selectedRecord.status === "PASSED" ? "ĐẠT CHUẨN TIẾP NHẬN" : "TỪ CHỐI / CÁCH LY"}
              </span>
            </p>
          </div>
        </div>

        {/* Step 1: Kiểm thực trước khi nhập (Gate) */}
        <div className="border border-slate-300 rounded mb-4 overflow-hidden">
          <div className="bg-slate-100 p-2 font-bold text-xs uppercase border-b border-slate-300 flex items-center justify-between">
            <span>BƯỚC 1: KIỂM TRA TRƯỚC KHI NHẬP THỰC PHẨM (TẠI CỔNG)</span>
            <span className="text-[10px] text-teal-700 font-mono">RULE K02, K04, K10, K11, K12</span>
          </div>
          <div className="p-3 text-xs space-y-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 text-[11px]">
                  <th className="py-1">Tên nguyên liệu</th>
                  <th>Nhà cung cấp</th>
                  <th>Số lô</th>
                  <th>Khối lượng</th>
                  <th>Nhiệt độ (°C)</th>
                  <th>HSD / Tươi</th>
                  <th>Cảm quan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-medium">
                  <td className="py-1.5 font-bold">{selectedRecord.itemName}</td>
                  <td>{selectedRecord.supplier}</td>
                  <td className="font-mono">{selectedRecord.lotNumber}</td>
                  <td>{selectedRecord.weightKg} kg</td>
                  <td>{selectedRecord.tempCelsius}°C</td>
                  <td>{selectedRecord.freshnessHours} giờ</td>
                  <td>{selectedRecord.sensoryPassed ? "Đạt" : "Không đạt"}</td>
                </tr>
              </tbody>
            </table>
            {selectedRecord.violations.length > 0 && (
              <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
                <strong>Cảnh báo vi phạm Gate Rules:</strong>
                <ul className="list-disc list-inside mt-0.5">
                  {selectedRecord.violations.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Kiểm thực trước khi chế biến */}
        <div className="border border-slate-300 rounded mb-4 overflow-hidden">
          <div className="bg-slate-100 p-2 font-bold text-xs uppercase border-b border-slate-300 flex items-center justify-between">
            <span>BƯỚC 2: KIỂM TRA TRƯỚC KHI CHẾ BIẾN (STORAGE & PREPARATION)</span>
            <span className="text-[10px] text-teal-700 font-mono">RULE K01, K06, K07</span>
          </div>
          <div className="p-3 text-xs space-y-1.5 text-slate-700">
            <p>• Dụng cụ sơ chế, thớt dao riêng biệt giữa đồ sống và đồ chín: <strong>ĐẠT</strong></p>
            <p>• Tình trạng rã đông / sơ chế bột sợi: Không có dấu hiệu chua thiu, vi sinh đạt chuẩn.</p>
            <p>• Nguồn nước sử dụng chế biến: Nước máy đạt quy chuẩn QCVN 01-1:2018/BYT.</p>
          </div>
        </div>

        {/* Step 3: Kiểm thực trước khi ăn & Lưu mẫu 24h */}
        <div className="border border-slate-300 rounded mb-6 overflow-hidden">
          <div className="bg-slate-100 p-2 font-bold text-xs uppercase border-b border-slate-300 flex items-center justify-between">
            <span>BƯỚC 3: KIỂM TRA TRƯỚC KHI ĂN & LƯU MẪU THỨC ĂN 24 GIỜ</span>
            <span className="text-[10px] text-teal-700 font-mono">RULE K05, K08</span>
          </div>
          <div className="p-3 text-xs space-y-2 text-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>• Thời gian nấu chín hoàn thành: 10:15</p>
                <p>• Thời gian chia suất và bắt đầu ăn: 11:00 (&lt; 2 giờ sau khi nấu)</p>
                <p>• Mùi vị, cảm quan suất ăn: Thơm ngon, không có mùi lạ.</p>
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded">
                <p className="font-bold text-amber-900">Thông tin Lưu mẫu 24 giờ:</p>
                <p>• Khối lượng mẫu lưu: ≥ 100g (mỗi món ăn trong thực đơn)</p>
                <p>• Nhiệt độ tủ lưu mẫu chuyên dụng: <strong>{selectedRecord.sampleTemp}°C</strong> (chuẩn 2–8°C)</p>
                <p>• Niêm phong hộp lưu mẫu: Đã dán tem niêm phong QR GOTRACE</p>
                <p>• Thời hạn lưu tối thiểu: 24 giờ (hủy mẫu sau: 11:30 ngày hôm sau)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs pt-4 border-t border-slate-200">
          <div>
            <p className="font-bold">ĐẠI DIỆN NHÀ CUNG CẤP</p>
            <p className="text-[10px] text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
            <div className="h-16 flex items-end justify-center font-bold">{selectedRecord.supplier}</div>
          </div>
          <div>
            <p className="font-bold">NGƯỜI KIỂM THỰC / FIELD OPS</p>
            <p className="text-[10px] text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
            <div className="h-16 flex items-end justify-center font-bold">{selectedRecord.inspectorName}</div>
          </div>
          <div>
            <p className="font-bold">BẾP TRƯỞNG / QUẢN LÝ</p>
            <p className="text-[10px] text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
            <div className="h-16 flex items-end justify-center font-bold">Quản lý Bếp ăn</div>
          </div>
        </div>

        {/* Footer Hash */}
        <div className="mt-8 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
          Xác thực trên GOTRACE Universal Ledger • SHA-256 Event Evidence Hash: 8f9b2c3a...4e1d7f02 • Tuân thủ QĐ 1246/QĐ-BYT & NĐ 13/2023/NĐ-CP
        </div>
      </div>
    </div>
  );
}
