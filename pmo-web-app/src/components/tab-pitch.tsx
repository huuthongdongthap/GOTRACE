"use client";

import React from "react";
import { Flame, CheckCircle2 } from "lucide-react";
import { SupplyChainsOverview } from "@/components/pitch/supply-chains-overview";
import { RoiCalculator } from "@/components/pitch/roi-calculator";
import { TabKey } from "@/components/pmo-header";

interface TabPitchProps {
  onNavigateTab?: (tab: TabKey) => void;
}

export function TabPitch({ onNavigateTab }: TabPitchProps) {
  const handleSelectChain = (chain: "rice" | "fruit" | "kitchen") => {
    if (!onNavigateTab) return;
    if (chain === "rice") onNavigateTab("rice");
    else if (chain === "fruit") onNavigateTab("fruit");
    else if (chain === "kitchen") onNavigateTab("kitchen-rules");
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Flame className="w-3.5 h-3.5" /> Luận Điểm Dành Cho Founder & Ban Điều Hành GOTRACE
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Chiến Lược Khai Phá Thị Trường Tây Nam Bộ: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Mũi Khoan Bếp Ăn Sa Đéc → Mở Rộng Lúa Gạo & Trái Cây ĐBSCL
            </span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Thay vì tốn nguồn lực khổng lồ cạnh tranh ngách thủy sản xuất khẩu vốn đã bão hòa giải pháp ERP/MES đắt tiền, PMO Tây Nam Bộ triển khai mô hình <strong>Hạ tầng Dữ liệu B2B/B2B2G</strong> đánh trực tiếp vào “nỗi đau tử huyệt” của chuỗi tiêu dùng thực phẩm nội địa: <strong>Áp lực kiểm thực 3 bước theo QĐ 1246/QĐ-BYT</strong> tại bếp ăn học đường và KCN làm bàn đạp, sau đó mở rộng mạng lưới sang <strong>Lúa gạo 1 triệu ha (MRV Carbon)</strong> và <strong>Trái cây xuất khẩu (IoT Cold-chain GACC)</strong>.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Vốn đầu tư: 715 Triệu VNĐ (~$29k USD)
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Thời gian thí điểm: 90 Ngày (12 Tuần)
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pháp lý: Đại diện ủy quyền làm việc Sở KH&CN / ATVSTP
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Điểm hòa vốn: Dự kiến sau 7 tháng
            </div>
          </div>
        </div>
      </div>

      {/* 3 Mekong Agricultural Supply Chain Pillars */}
      <SupplyChainsOverview onSelectChain={handleSelectChain} />

      {/* 3 Execution Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-base font-bold text-white">Lực Kéo Thể Chế (Regulatory Pull)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ký kết thỏa thuận hợp tác với Sở KH&CN và Chi cục ATVSTP Đồng Tháp. Chuyển hóa quy định xử phạt vi phạm an toàn thực phẩm (QĐ 1246/QĐ-BYT) thành động lực bắt buộc nhà thầu bếp ăn phải số hóa hồ sơ kiểm thực và lưu mẫu 24h.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-base font-bold text-white">Lực Kéo Đầu Tàu (Anchor Enterprise Pull)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hợp tác cùng Công ty TNHH Tinh Bột Xanh (biểu tượng kinh tế tuần hoàn, ống hút bột gạo) và Công ty Thực phẩm Bích Chi để tạo “Hộ chiếu số sản phẩm xuất khẩu”, lôi kéo toàn bộ HTX cung ứng bột nguyên liệu tại Sa Đéc nhập cuộc.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-base font-bold text-white">Vũ Khí Bổ Trợ (Media & Storytelling)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kết hợp năng lực sản xuất phim tài liệu 4K chất lượng cao vào gói chốt deal GOTRACE V2.2. Doanh nghiệp vừa có giải pháp tuân thủ truy xuất số, vừa sở hữu video thương hiệu đẳng cấp phục vụ chào thầu suất ăn và xuất khẩu.
          </p>
        </div>
      </div>

      {/* Dynamic Break-even & ROI Calculator */}
      <RoiCalculator />
    </div>
  );
}
