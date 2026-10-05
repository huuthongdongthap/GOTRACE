import { TabKey } from "@/components/pmo-header";

export type CommandHubKey =
  | "supply-chains"
  | "field-ops-hub"
  | "strategy-hub"
  | "gateway-hub"
  | "governance-hub";

export interface SubTabItem {
  key: TabKey;
  label: string;
  badge?: string;
}

export interface HubDefinition {
  key: CommandHubKey;
  label: string;
  shortLabel: string;
  color: string;
  subTabs: SubTabItem[];
}

export const commandHubs: HubDefinition[] = [
  {
    key: "supply-chains",
    label: "🌾 Chuỗi Nông Sản ĐBSCL",
    shortLabel: "Nông Sản",
    color: "bg-emerald-600",
    subTabs: [
      { key: "pitch", label: "Bản Đồ 3 Chuỗi" },
      { key: "rice", label: "Lúa Gạo 1Mha & Carbon", badge: "$20/tấn" },
      { key: "fruit", label: "Trái Cây & Cold-Chain", badge: "GACC" },
      { key: "food-chain", label: "4 Trụ Cột Bếp Ăn" },
    ],
  },
  {
    key: "field-ops-hub",
    label: "🛡️ Hiện Trường & ATTP (QĐ 1246)",
    shortLabel: "Hiện Trường",
    color: "bg-teal-600",
    subTabs: [
      { key: "field-ops", label: "Kiểm Thực QĐ 1246 & Mẫu 24h" },
      { key: "kitchen-rules", label: "12 Quy Tắc Bếp (K01-K12)" },
      { key: "traceback", label: "Traceback < 15 Phút", badge: "Khẩn" },
      { key: "tools", label: "Công Cụ Sinh Mã GCI" },
    ],
  },
  {
    key: "strategy-hub",
    label: "🎯 Chiến Lược 90 Ngày",
    shortLabel: "Chiến Lược",
    color: "bg-blue-600",
    subTabs: [
      { key: "roadmap", label: "Roadmap 4 Phân Kỳ (P0-P3)" },
      { key: "accounts", label: "30 Anchor Accounts" },
      { key: "sales", label: "Sales Playbook & Trojan 35M" },
    ],
  },
  {
    key: "gateway-hub",
    label: "⚡ Hạ Tầng & Cổng Đấu Nối",
    shortLabel: "Kỹ Thuật",
    color: "bg-indigo-600",
    subTabs: [
      { key: "gateway", label: "Cổng API, Webhooks & Offline Sync" },
    ],
  },
  {
    key: "governance-hub",
    label: "🏛️ B2G & Mở Rộng Vùng",
    shortLabel: "B2G & Vùng",
    color: "bg-purple-600",
    subTabs: [
      { key: "compliance", label: "B2G Pháp Lý & Rủi Ro" },
      { key: "phase2", label: "Giai Đoạn 2: Mở Rộng Đa Tỉnh" },
      { key: "phase3", label: "Giai Đoạn 3: Hệ Sinh Thái Carbon" },
    ],
  },
];

export function findHubByTab(tab: TabKey): CommandHubKey {
  for (const hub of commandHubs) {
    if (hub.subTabs.some((s) => s.key === tab)) {
      return hub.key;
    }
  }
  return "supply-chains";
}
