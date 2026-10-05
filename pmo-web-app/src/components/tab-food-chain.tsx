"use client";

import React, { useState } from "react";
import { foodSupplyChainAnchors, AnchorAccount } from "@/lib/pmo-data";
import {
  Wheat,
  Beef,
  Egg,
  Carrot,
  ShieldCheck,
  Building2,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { AnchorDetailCard } from "@/components/food-chain/anchor-detail-card";

export function TabFoodChain() {
  const [selectedAnchor, setSelectedAnchor] = useState<AnchorAccount>(foodSupplyChainAnchors[0]);

  const pillars = [
    {
      id: "Starch",
      title: "1. Sản Phẩm Tinh Bột (Starch)",
      subtitle: "Trojan Horse Wedge — Mũi khoan chiến lược",
      icon: <Wheat className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/30 bg-amber-500/10 text-amber-400",
      items: ["Bột lọc Sa Đéc", "Hủ tiếu Sa Đéc", "Bún tươi", "Phở tươi", "Bánh canh", "Gạo ST25 Cỏ May"],
      criticalRisk: "Hạn dùng 18h vi sinh (Bacillus cereus), tồn dư hóa chất cấm (Tinopal, Formol, Hàn the)",
      gotraceValue: "Chứng thư mẻ bột số hóa + Cảnh báo hết hạn tự động theo thời gian thực",
    },
    {
      id: "Protein",
      title: "2. Thịt Cá & Nguồn Đạm (Protein)",
      subtitle: "Volume & Compliance — Trọng lượng chi tiêu cao nhất",
      icon: <Beef className="w-5 h-5 text-rose-400" />,
      color: "border-rose-500/30 bg-rose-500/10 text-rose-400",
      items: ["Thịt heo VietGAP", "Thịt gà đùi sạch", "Cá tra / Ba sa phi lê đông lạnh"],
      criticalRisk: "Dịch tả lợn châu Phi (ASF), đứt gãy chuỗi lạnh vận chuyển (>5°C) gây ôi thiu",
      gotraceValue: "Liên kết giấy kiểm dịch thú y điện tử + Giám sát nhiệt độ thùng lạnh IoT",
    },
    {
      id: "Egg",
      title: "3. Trứng & Đạm Phụ Trợ (Egg & Auxiliary)",
      subtitle: "Daily Kitchen Staple — Tần suất tiêu thụ liên tục",
      icon: <Egg className="w-5 h-5 text-yellow-400" />,
      color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
      items: ["Trứng gà tiệt trùng UV", "Trứng vịt sạch kiểm dịch", "Đậu hũ miếng tươi"],
      criticalRisk: "Vi khuẩn Salmonella từ vỏ bẩn/dập nứt, đậu hũ nhiễm thạch cao công nghiệp",
      gotraceValue: "Truy xuất lô đóng vỉ tiệt trùng UV + Kiểm tra cảm quan & tỷ lệ dập vỡ tại Gate",
    },
    {
      id: "Veg",
      title: "4. Rau Củ Tươi & Gia Vị (Veg & Spices)",
      subtitle: "Chemical Residue Shield — Khiên chắn hóa chất BVTV",
      icon: <Carrot className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      items: ["Rau lá VietGAP", "Củ quả Đà Lạt/Cần Thơ", "Nấm rơm", "Dầu ăn tinh luyện", "Nước mắm truyền thống"],
      criticalRisk: "Dư lượng thuốc bảo vệ thực vật, kim loại nặng, nấm mốc aflatoxin trong gia vị",
      gotraceValue: "Gắn tọa độ vùng trồng HTX + Nhật ký bón phân cách ly trước thu hoạch",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Strategic Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                Mô hình Chuỗi Hội Tụ (Converging Supply Chain)
              </span>
              <span className="text-xs text-slate-400">Tây Nam Bộ WIDE: Sa Đéc → Long An → Cà Mau</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Chiến Lược 4 Trụ Cột Thực Phẩm Bếp Ăn & Chuỗi Bột Sa Đéc
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Thay vì dàn trải toàn bộ nông nghiệp hoặc đối đầu trực diện xuất khẩu thủy sản nặng chi phí, GOTRACE triển khai chiến thuật <strong>Trojan Horse (Con Ngựa Thành Troy)</strong>: Lấy <strong>Tinh Bột & Sợi Tươi Sa Đéc</strong> làm mũi khoan tiếp cận rủi ro cao nhất, sau đó tự động hội tụ cả 4 dòng thực phẩm (Đạm, Trứng, Rau) vào <strong>Cổng tiếp nhận Bếp ăn tập thể</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-[180px]">
            <div className="text-xs text-slate-400">Tỷ lệ hội tụ mạng lưới</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">1 : 4.8</div>
            <div className="text-[11px] text-slate-500 mt-1">1 Bếp kéo theo ~5 NCC vào GOTRACE</div>
          </div>
        </div>

        {/* Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          {pillars.map((pillar) => (
            <div key={pillar.id} className={`p-4 rounded-xl border space-y-3 transition-all ${pillar.color}`}>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-slate-950/80">{pillar.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{pillar.title}</h3>
                  <p className="text-[11px] text-slate-400">{pillar.subtitle}</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Mặt hàng chính:</div>
                <div className="flex flex-wrap gap-1">
                  {pillar.items.map((item, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/70 border border-slate-800 text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-rose-400 font-semibold flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="w-3 h-3" /> Nỗi đau rủi ro:
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{pillar.criticalRisk}</p>
              </div>

              <div className="space-y-1 text-xs pt-1 border-t border-slate-800/80">
                <div className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3 h-3" /> Giải pháp GOTRACE:
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">{pillar.gotraceValue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upstream Food Anchors Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Anchors List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              6 Đầu Mối Cung Ứng Chuỗi Thực Phẩm (S01–S06)
            </h3>
            <span className="text-xs text-slate-500 font-mono">Đồng Tháp • Tiền Giang • Cần Thơ</span>
          </div>

          <div className="space-y-3">
            {foodSupplyChainAnchors.map((acc) => {
              const isSelected = selectedAnchor.id === acc.id;
              const totalScore = Object.values(acc.scores).reduce((a, b) => a + b, 0);

              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAnchor(acc)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                          {acc.id}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300">
                          {acc.segment}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1.5">{acc.name}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                        <span className="truncate">{acc.location}</span>
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-black text-emerald-400">{totalScore}/30</div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {acc.stage}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Anchor Detail Card */}
        <div className="lg:col-span-7">
          <AnchorDetailCard selectedAnchor={selectedAnchor} />
        </div>
      </div>
    </div>
  );
}
