"use client";

import React from "react";
import { Database, ArrowRight, ShieldCheck } from "lucide-react";

export function GatewayPrimitivesCatalog() {
  const primitivesCatalog = [
    {
      num: 1,
      type: "PARTY",
      name: "Chủ Thể Chuỗi",
      desc: "Doanh nghiệp đầu tàu, HTX, Bếp ăn, NCC thịt/rau/trứng",
      count: "18 Đơn vị",
      status: "Synced",
      badge: "bg-blue-900/40 text-blue-300 border-blue-800",
    },
    {
      num: 2,
      type: "PLACE",
      name: "Địa Điểm & Cơ Sở",
      desc: "Vùng trồng GIS, Kho bảo quản, Bếp ăn Sa Đéc, Cổng tiếp nhận",
      count: "32 Vị trí",
      status: "Synced",
      badge: "bg-teal-900/40 text-teal-300 border-teal-800",
    },
    {
      num: 3,
      type: "ITEM",
      name: "Danh Mục Vật Phẩm",
      desc: "Hủ tiếu Sa Đéc, Thịt heo lạnh, Trứng gà UV, Rau cải VietGAP",
      count: "64 Mặt hàng",
      status: "Synced",
      badge: "bg-emerald-900/40 text-emerald-300 border-emerald-800",
    },
    {
      num: 4,
      type: "LOT",
      name: "Lô Hàng & Mẻ Sản Xuất",
      desc: "Lô sợi tươi 18h, Lô thịt nhập ca sáng, Mẻ nấu trưa 800 suất",
      count: "384 Lô",
      status: "Synced",
      badge: "bg-amber-900/40 text-amber-300 border-amber-800",
    },
    {
      num: 5,
      type: "EVENT",
      name: "Sự Kiện Chuỗi Cung Ứng",
      desc: "Thu hoạch, Tiếp nhận cổng K02, Nấu chín >100°C, Niêm phong mẫu",
      count: "1,420 Sự kiện",
      status: "Synced",
      badge: "bg-purple-900/40 text-purple-300 border-purple-800",
    },
    {
      num: 6,
      type: "EVIDENCE",
      name: "Bằng Chứng Số Hóa",
      desc: "Ảnh chụp cảm quan, Biên bản kiểm thực QĐ 1246, Dữ liệu cân IoT",
      count: "512 Tệp",
      status: "Synced",
      badge: "bg-rose-900/40 text-rose-300 border-rose-800",
    },
    {
      num: 7,
      type: "CLAIM",
      name: "Tuyên Bố Chất Lượng",
      desc: "VietGAP số 441/NN, Giấy kiểm dịch thú y, Không Tinopal",
      count: "48 Khai báo",
      status: "Synced",
      badge: "bg-cyan-900/40 text-cyan-300 border-cyan-800",
    },
    {
      num: 8,
      type: "VERIFICATION",
      name: "Kết Quả Thẩm Tra",
      desc: "Đối soát Gate K01-K12, Cân bằng khối lượng Mass Balance",
      count: "318 Lượt",
      status: "Synced",
      badge: "bg-lime-900/40 text-lime-300 border-lime-800",
    },
    {
      num: 9,
      type: "EXCEPTION",
      name: "Sự Cố & Cảnh Báo",
      desc: "Thịt đứt chuỗi lạnh >5°C, Hàng cận date, Thiếu niêm phong",
      count: "6 Cảnh báo",
      status: "Handled",
      badge: "bg-orange-900/40 text-orange-300 border-orange-800",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">
            Bản Đồ 9 Core Primitives Đấu Nối Vào Ledger Gốc
          </h3>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
          Single Source of Truth (SSOT)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {primitivesCatalog.map((item) => (
          <div
            key={item.num}
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${item.badge}`}>
                  {item.type}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">#{item.num}</span>
              </div>
              <h4 className="text-xs font-bold text-white mb-1">{item.name}</h4>
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{item.desc}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-300">{item.count}</span>
              <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                <ShieldCheck className="w-3 h-3" /> {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
