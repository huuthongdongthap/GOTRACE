"use client";

import React, { useState } from "react";
import {
  milestones as initialMilestones,
  Milestone,
} from "@/lib/pmo-data";

import { PMOHeader, TabKey } from "@/components/pmo-header";
import { TabPitch } from "@/components/tab-pitch";
import { RiceCarbonSection } from "@/components/phase2/rice-carbon-section";
import { FruitColdchainSection } from "@/components/phase2/fruit-coldchain-section";
import { TabSalesPlaybook } from "@/components/tab-sales-playbook";
import { TabTracebackSimulator } from "@/components/tab-traceback-simulator";
import { TabRoadmap } from "@/components/tab-roadmap";
import { TabAccounts } from "@/components/tab-accounts";
import { TabKitchenRules } from "@/components/tab-kitchen-rules";
import { TabFoodChain } from "@/components/tab-food-chain";
import { TabTools } from "@/components/tab-tools";
import { TabFieldOps } from "@/components/tab-field-ops";
import { TabPlatformGateway } from "@/components/tab-platform-gateway";
import { TabPhase2Expansion } from "@/components/tab-phase2-expansion";
import { TabPhase3RegionalEcosystem } from "@/components/tab-phase3-regional-ecosystem";
import { TabCompliance } from "@/components/tab-compliance";

export default function PMODashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("pitch");

  // State for milestones interactivity
  const [milestoneList, setMilestoneList] = useState<Milestone[]>(initialMilestones);

  // Toggle milestone status
  const toggleMilestoneStatus = (id: string) => {
    setMilestoneList((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus: Record<string, Milestone["status"]> = {
            pending: "in_progress",
            in_progress: "done",
            done: "pending",
            blocked: "in_progress",
          };
          return { ...m, status: nextStatus[m.status] || "pending" };
        }
        return m;
      })
    );
  };

  const doneCount = milestoneList.filter((m) => m.status === "done").length;
  const totalCount = milestoneList.length;
  const progressPercent = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PMOHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        doneCount={doneCount}
        totalCount={totalCount}
        progressPercent={progressPercent}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* TAB 1: LUẬN ĐIỂM CHIẾN LƯỢC */}
        {activeTab === "pitch" && <TabPitch onNavigateTab={setActiveTab} />}

        {/* TAB 1B: LÚA GẠO 1MHA & MRV CARBON */}
        {activeTab === "rice" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">🌾</span> Chuỗi Tuyến Tính: Đề Án 1 Triệu Héc-Ta Lúa Gạo & MRV Carbon
                </h2>
                <p className="text-xs text-slate-300">
                  Chuẩn hóa 29 Canonical Events, đối soát cân bằng ẩm độ lúa (Mass Balance 26% → 14%) và sàn tín chỉ Carbon AWD $20/tấn.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("pitch")}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                ← Quay lại Tổng quan
              </button>
            </div>
            <RiceCarbonSection />
          </div>
        )}

        {/* TAB 1C: TRÁI CÂY XUẤT KHẨU & IOT COLD-CHAIN */}
        {activeTab === "fruit" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">🥭</span> Chuỗi Phân Nhánh: Trái Cây Xuất Khẩu & IoT Cold-Chain (GACC)
                </h2>
                <p className="text-xs text-slate-300">
                  Mã số vùng trồng MSVT GIS Polygon, giám sát nhiệt độ xe lạnh container thời gian thực và kiểm soát Cadmium Lệnh 280.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("pitch")}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                ← Quay lại Tổng quan
              </button>
            </div>
            <FruitColdchainSection />
          </div>
        )}

        {/* TAB 2: SALES PLAYBOOK */}
        {activeTab === "sales" && <TabSalesPlaybook />}

        {/* TAB 3: TRACEBACK SIMULATOR */}
        {activeTab === "traceback" && <TabTracebackSimulator />}

        {/* TAB 4: ROADMAP 90 NGÀY */}
        {activeTab === "roadmap" && (
          <TabRoadmap
            milestoneList={milestoneList}
            toggleMilestoneStatus={toggleMilestoneStatus}
          />
        )}

        {/* TAB 5: ANCHOR ACCOUNTS & QUALIFICATION */}
        {activeTab === "accounts" && <TabAccounts />}

        {/* TAB 6: 12 QUY TẮC BẾP ĂN (K01–K12) */}
        {activeTab === "kitchen-rules" && <TabKitchenRules />}

        {/* TAB 7: 4 TRỤ CỘT THỰC PHẨM */}
        {activeTab === "food-chain" && <TabFoodChain />}

        {/* TAB 8: CÔNG CỤ VẬN HÀNH THỰC ĐỊA */}
        {activeTab === "tools" && <TabTools />}

        {/* TAB 9: NHẬP LIỆU HIỆN TRƯỜNG (QĐ 1246) */}
        {activeTab === "field-ops" && <TabFieldOps />}

        {/* TAB 10: CỔNG ĐẤU NỐI GOTRACE */}
        {activeTab === "gateway" && <TabPlatformGateway />}

        {/* TAB 11: GIAI ĐOẠN 2: MỞ RỘNG & ĐA TỈNH */}
        {activeTab === "phase2" && <TabPhase2Expansion />}

        {/* TAB 12: GIAI ĐOẠN 3: HỆ SINH THÁI VÙNG & CARBON */}
        {activeTab === "phase3" && <TabPhase3RegionalEcosystem />}

        {/* TAB 13: B2G PHÁP LÝ & QUẢN TRỊ RỦI RO */}
        {activeTab === "compliance" && <TabCompliance />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 p-6 text-center text-xs text-slate-500">
        <div>
          PMO Văn phòng Thí điểm Tây Nam Bộ — Nền tảng Dữ liệu Chuỗi Cung Ứng Thực phẩm GOTRACE V2.2
        </div>
        <div className="mt-1 text-slate-600">
          Văn phòng thực địa: TP. Sa Đéc, Đồng Tháp | Cơ quan bảo trợ: Sở KH&CN và Chi cục ATVSTP Đồng Tháp
        </div>
      </footer>
    </div>
  );
}
