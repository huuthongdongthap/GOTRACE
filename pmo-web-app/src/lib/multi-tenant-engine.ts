/**
 * GOTRACE Phase 3: Multi-tenant & Regional Ecosystem Engine
 * Manages tenant isolation, multi-province deployment (7 Mekong Provinces),
 * and Food Safety as a Service (FSaaS) service subscriptions.
 *
 * References:
 * - plans/2026-09-27-phase-03-regional-ecosystem-plan/phase-01-multi-tenant-architecture-fsaas.md
 * - plans/2026-09-27-phase-03-regional-ecosystem-plan/phase-03-7-provinces-rollout-cadence.md
 */

export type MekongProvince =
  | "LONG_AN"
  | "DONG_THAP"
  | "CAN_THO"
  | "HAU_GIANG"
  | "SOC_TRANG"
  | "BAC_LIEU"
  | "CA_MAU";

export interface TenantProfile {
  tenant_id: string; // e.g. "kcn-tranoc"
  tenant_name: string; // e.g. "Cụm Bếp KCN Trà Nóc"
  province: MekongProvince;
  subdomain: string; // "kcn-tranoc.gotrace.vn"
  fsaas_tier: "SCHOOL_STANDARD" | "KCN_STANDARD" | "KCN_ENTERPRISE";
  daily_meals_capacity: number;
  active_tier2_suppliers_count: number;
  monthly_saas_fee_vnd: number;
  status: "ACTIVE" | "PROVISIONING" | "SUSPENDED";
  edge_node_cluster: "BAC_SONG_HAU" | "TRUNG_TAM_VUNG" | "NAM_SONG_HAU";
  registered_at: string;
}

export interface ProvinceRolloutSummary {
  province: MekongProvince;
  province_name_vn: string;
  target_anchors: number;
  active_anchors: number;
  target_suppliers: number;
  active_suppliers: number;
  target_arr_vnd: number;
  edge_node: string;
}

export class MultiTenantEngine {
  private tenants: Map<string, TenantProfile> = new Map();

  constructor() {
    // Seed representative tenants across key Mekong hubs
    this.registerTenant({
      tenant_id: "bep-sadec-primary",
      tenant_name: "Bếp Ăn Trường Tiểu Học Bán Trú Sa Đéc",
      province: "DONG_THAP",
      subdomain: "tieuhoc-sadec.gotrace.vn",
      fsaas_tier: "SCHOOL_STANDARD",
      daily_meals_capacity: 1500,
      active_tier2_suppliers_count: 4,
      monthly_saas_fee_vnd: 12500000,
      status: "ACTIVE",
      edge_node_cluster: "BAC_SONG_HAU",
      registered_at: "2026-09-01T08:00:00Z",
    });

    this.registerTenant({
      tenant_id: "kcn-tranoc-seafood",
      tenant_name: "Bếp Ăn Công Nghiệp KCN Trà Nóc Cần Thơ",
      province: "CAN_THO",
      subdomain: "kcn-tranoc.gotrace.vn",
      fsaas_tier: "KCN_STANDARD",
      daily_meals_capacity: 4500,
      active_tier2_suppliers_count: 12,
      monthly_saas_fee_vnd: 25000000,
      status: "ACTIVE",
      edge_node_cluster: "TRUNG_TAM_VUNG",
      registered_at: "2027-04-15T08:00:00Z",
    });

    this.registerTenant({
      tenant_id: "kcn-benluc-fdi",
      tenant_name: "Tổ Hợp Suất Ăn Công Nhân May Mặc Bến Lức",
      province: "LONG_AN",
      subdomain: "kcn-benluc.gotrace.vn",
      fsaas_tier: "KCN_ENTERPRISE",
      daily_meals_capacity: 6000,
      active_tier2_suppliers_count: 15,
      monthly_saas_fee_vnd: 45000000,
      status: "ACTIVE",
      edge_node_cluster: "BAC_SONG_HAU",
      registered_at: "2027-07-20T08:00:00Z",
    });

    this.registerTenant({
      tenant_id: "kcn-an-nghiep-shrimp",
      tenant_name: "Bếp Ăn Chế Biến Thủy Sản KCN An Nghiệp",
      province: "SOC_TRANG",
      subdomain: "kcn-annghiep.gotrace.vn",
      fsaas_tier: "KCN_STANDARD",
      daily_meals_capacity: 3200,
      active_tier2_suppliers_count: 9,
      monthly_saas_fee_vnd: 20000000,
      status: "ACTIVE",
      edge_node_cluster: "NAM_SONG_HAU",
      registered_at: "2028-02-10T08:00:00Z",
    });
  }

  public registerTenant(tenant: TenantProfile): void {
    this.tenants.set(tenant.tenant_id, tenant);
  }

  public getTenant(tenantId: string): TenantProfile | undefined {
    return this.tenants.get(tenantId);
  }

  public listTenants(provinceFilter?: MekongProvince): TenantProfile[] {
    const list = Array.from(this.tenants.values());
    if (provinceFilter) {
      return list.filter((t) => t.province === provinceFilter);
    }
    return list;
  }

  public getRegionalSummary(): ProvinceRolloutSummary[] {
    const provinceConfig: Record<
      MekongProvince,
      { name: string; targetAnchors: number; targetSuppliers: number; targetArr: number; edge: string }
    > = {
      LONG_AN: {
        name: "Long An",
        targetAnchors: 60,
        targetSuppliers: 110,
        targetArr: 21000000000,
        edge: "Edge Node Bắc Sông Hậu (Sa Đéc)",
      },
      CAN_THO: {
        name: "TP. Cần Thơ",
        targetAnchors: 65,
        targetSuppliers: 125,
        targetArr: 24500000000,
        edge: "Edge Node Trung Tâm Vùng (Cần Thơ)",
      },
      DONG_THAP: {
        name: "Đồng Tháp",
        targetAnchors: 45,
        targetSuppliers: 80,
        targetArr: 15200000000,
        edge: "Edge Node Bắc Sông Hậu (Sa Đéc)",
      },
      HAU_GIANG: {
        name: "Hậu Giang",
        targetAnchors: 30,
        targetSuppliers: 50,
        targetArr: 9800000000,
        edge: "Edge Node Trung Tâm Vùng (Cần Thơ)",
      },
      SOC_TRANG: {
        name: "Sóc Trăng",
        targetAnchors: 35,
        targetSuppliers: 60,
        targetArr: 11500000000,
        edge: "Edge Node Nam Sông Hậu (Cà Mau)",
      },
      BAC_LIEU: {
        name: "Bạc Liêu",
        targetAnchors: 30,
        targetSuppliers: 45,
        targetArr: 8900000000,
        edge: "Edge Node Nam Sông Hậu (Cà Mau)",
      },
      CA_MAU: {
        name: "Cà Mau",
        targetAnchors: 35,
        targetSuppliers: 55,
        targetArr: 12100000000,
        edge: "Edge Node Nam Sông Hậu (Cà Mau)",
      },
    };

    return Object.entries(provinceConfig).map(([key, cfg]) => {
      const provKey = key as MekongProvince;
      const provTenants = Array.from(this.tenants.values()).filter((t) => t.province === provKey);
      const activeSuppliers = provTenants.reduce((acc, t) => acc + t.active_tier2_suppliers_count, 0);

      return {
        province: provKey,
        province_name_vn: cfg.name,
        target_anchors: cfg.targetAnchors,
        active_anchors: provTenants.length,
        target_suppliers: cfg.targetSuppliers,
        active_suppliers: activeSuppliers,
        target_arr_vnd: cfg.targetArr,
        edge_node: cfg.edge,
      };
    });
  }
}

export const multiTenantEngine = new MultiTenantEngine();
