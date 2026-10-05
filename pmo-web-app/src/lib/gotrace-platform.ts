/**
 * GOTRACE Platform API Integration Layer
 * Connects PMO Web App to GOTRACE Core Platform (9 Primitives, GCI, Event Engine, Traceback)
 *
 * Based on: docs/02_Platform_Object_Implementation_Blueprint.md
 * GCI Standard: GT:VN:<Province>.<PrimitiveType>.<EntityCode>.<SubID>
 */

// ============================================================================
// GeoJSON Type Definitions (local to avoid external dependency)
// ============================================================================

interface GeoJSONGeometry {
  type: string;
  coordinates: unknown;
}

interface GeoJSONPoint extends GeoJSONGeometry {
  type: "Point";
  coordinates: [number, number] | [number, number, number];
}

interface GeoJSONPolygon extends GeoJSONGeometry {
  type: "Polygon";
  coordinates: number[][][];
}

interface GeoJSON {
  Point: GeoJSONPoint;
  Polygon: GeoJSONPolygon;
}

// ============================================================================
// 1. GCI (Global Chain Identifier) Standard
// ============================================================================

export interface GCIComponents {
  country: string;           // "VN"
  province: string;          // "DT", "CT", "AG", "LA", etc.
  primitiveType: PrimitiveType;
  entityCode: string;
  subId?: string;
}

export type PrimitiveType =
  | "PARTY"      // 1: Chủ thể tham gia chuỗi
  | "PLACE"      // 2: Địa điểm & Cơ sở vật chất
  | "ITEM"       // 3: Phẩm cấp & Vật phẩm danh mục
  | "LOT"        // 4: Lô hàng vật lý & Mẻ sản xuất
  | "EVENT"      // 5: Sự kiện chuỗi cung ứng
  | "EVIDENCE"   // 6: Bằng chứng số kiểm chứng được
  | "CLAIM"      // 7: Tuyên bố chất lượng & Tuân thủ
  | "VERIFICATION" // 8: Xác thực & Kết quả đối soát
  | "TRANSACTION"; // 9: Giao dịch & Chuyển đổi trạng thái

export function buildGCI(components: GCIComponents): string {
  const parts = [
    `GT:${components.country}`,
    components.province,
    components.primitiveType,
    components.entityCode,
  ];
  if (components.subId) {
    parts.push(components.subId);
  }
  return parts.join(":");
}

export function parseGCI(gci: string): GCIComponents | null {
  const parts = gci.split(":");
  if (parts.length < 5 || parts[0] !== "GT") {
    return null;
  }
  return {
    country: parts[1],
    province: parts[2],
    primitiveType: parts[3] as PrimitiveType,
    entityCode: parts[4],
    subId: parts[5],
  };
}

export function validateGCI(gci: string): boolean {
  return parseGCI(gci) !== null;
}

// ============================================================================
// 2. 9 Core Primitives Schema (TypeScript Types)
// ============================================================================

// --- Primitive 1: PARTY ---
export interface Party {
  party_id: string;                    // GCI
  legal_name: string;
  short_name: string;
  party_type: PartyType;
  tax_code?: string;
  citizen_id?: string;
  address: string;
  contact_person: string;
  phone: string;
  public_key?: string;
  credential_id?: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  created_at: string;
  updated_at: string;
}

export type PartyType =
  | "ENTERPRISE"    // Doanh nghiệp đầu tàu (Anchor)
  | "COOP"          // Hợp tác xã (HTX)
  | "FARMER"        // Nông hộ thành viên
  | "TRADER"        // Thương lái/Cò lúa
  | "LOGISTICS"     // Đơn vị vận chuyển
  | "PORT"          // Cảng xuất khẩu
  | "KITCHEN"       // Bếp ăn công nghiệp
  | "AUDITOR"       // Đơn vị chứng nhận
  | "GOVERNMENT";   // Cơ quan quản lý nhà nước

// --- Primitive 2: PLACE ---
export interface Place {
  place_id: string;                    // GCI
  place_name: string;
  place_type: PlaceType;
  geo_polygon?: GeoJSONPolygon;
  coordinates?: GeoJSONPoint;
  province_code: string;
  capacity_max?: number;
  managing_party_id: string;           // GCI of Party
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  created_at: string;
  updated_at: string;
}

export type PlaceType =
  | "GROWING_AREA"        // Vùng trồng định danh GIS Polygon
  | "PLOT"                // Mảnh vườn thành viên
  | "WAREHOUSE"           // Kho bãi
  | "MILLING_FACILITY"    // Nhà máy xay xát/chế biến
  | "PACKING_HOUSE"       // Cơ sở đóng gói (CSDG)
  | "WEIGH_STATION"       // Trạm cân điện tử
  | "BORDER_PORT"         // Cửa khẩu cảng biển
  | "KITCHEN_SITE";       // Bếp ăn chế biến

// --- Primitive 3: ITEM / COMMODITY ---
export interface Item {
  item_id: string;                     // GCI
  commodity_name: string;
  commodity_code: string;
  botanical_name?: string;
  standard_spec?: string;
  hs_code?: string;
  category: ItemCategory;
  unit_of_measure: UnitOfMeasure;
  shelf_life_days?: number;
  storage_condition_spec?: string;
  created_at: string;
  updated_at: string;
}

export type ItemCategory =
  | "GRAIN"
  | "FRUIT"
  | "MEAT"
  | "VEGETABLE"
  | "PROCESSED_FOOD"
  | "PACKAGING"
  | "SEED"
  | "FERTILIZER"
  | "CHEMICAL";

export type UnitOfMeasure = "KG" | "TON" | "BAG" | "MEAL" | "PIECE" | "LITER" | "M2" | "HECTARE";

// --- Primitive 4: LOT / BATCH ---
export interface Lot {
  lot_id: string;                      // GCI
  item_id: string;                     // GCI of Item
  parent_lot_ids: string[];            // GCI Array (Genealogy)
  quantity_net: number;
  quantity_gross: number;
  uom: UnitOfMeasure;
  production_date: string;
  expiry_date?: string;
  moisture_pct?: number;               // Lúa
  brix_degree?: number;                // Trái cây
  quality_grade?: "GRADE_1" | "GRADE_2" | "OUT_OF_SPEC";
  status: LotStatus;
  created_at: string;
  updated_at: string;
}

export type LotStatus =
  | "CREATED"
  | "IN_PROCESS"
  | "INSPECTED"
  | "BLENDED"
  | "CONSUMED"
  | "RECALLED"
  | "DISPOSED";

// --- Primitive 5: EVENT ---
export interface Event {
  event_id: string;                    // GCI
  event_type: EventType;
  timestamp_utc: string;
  place_id: string;                    // GCI of Place
  operator_party_id: string;           // GCI of Party
  input_lots: string[];                // GCI Array
  output_lots: string[];               // GCI Array
  telemetry_data?: TelemetryData;
  event_hash_sha256: string;
  created_at: string;
}

export type EventType =
  | "PLANTED"           // Gieo cấy
  | "FERTILIZED"        // Bón phân/Phun thuốc
  | "HARVESTED"         // Thu hoạch
  | "WEIGHED"           // Cân xe
  | "RECEIVED"          // Tiếp nhận
  | "DRIED"             // Sấy
  | "MILLED"            // Xay xát
  | "IRRADIATED"        // Chiếu xạ
  | "PACKED"            // Đóng gói
  | "SHIPPED"           // Vận chuyển
  | "COOKED"            // Nấu
  | "SAMPLED"           // Lưu mẫu
  | "DISPOSED"          // Tiêu hủy
  | "INSPECTED"         // Kiểm tra
  | "TRANSFORMED";      // Chuyển đổi

export interface TelemetryData {
  temperature_celsius?: number;
  humidity_percent?: number;
  weight_kg?: number;
  ph?: number;
  conductivity?: number;
  gps_latitude?: number;
  gps_longitude?: number;
  sensor_id?: string;
  readings?: Record<string, number>;
}

// --- Primitive 6: EVIDENCE ---
export interface Evidence {
  evidence_id: string;                 // GCI
  evidence_type: EvidenceType;
  file_hash_sha256: string;
  storage_uri: string;
  captured_at: string;
  issuer_party_id: string;             // GCI of Party
  verifier_party_id?: string;          // GCI of Party
  digital_signature?: string;
  metadata_json?: Record<string, unknown>;
  created_at: string;
}

export type EvidenceType =
  | "WEIGHT_TICKET"       // Phiếu cân điện tử
  | "LAB_REPORT"          // Phiếu kiểm nghiệm Lab (COA, MRLs)
  | "GIS_PHOTO"           // Ảnh chụp thực địa GPS/Exif
  | "E_INVOICE"           // Hóa đơn điện tử
  | "COLD_CHAIN_LOG"      // Dữ liệu chuỗi lạnh IoT
  | "SAMPLE_RECORD"       // Biên bản lưu mẫu thực phẩm QĐ 1246
  | "CONTRACT"            // Hợp đồng
  | "CERTIFICATE"         // Chứng chỉ
  | "PERMIT";             // Giấy phép

// --- Primitive 7: CLAIM / ASSERTION ---
export interface Claim {
  claim_id: string;                    // GCI
  claim_type: ClaimType;
  standard_code: string;               // VIETGAP, GLOBALGAP, GACC_248, EUDR, DECISION_1246, MRV_LOW_EMISSION
  issuer_authority_party_id: string;   // GCI of Party
  beneficiary_party_id: string;        // GCI of Party
  target_place_id?: string;            // GCI of Place
  target_lot_id?: string;              // GCI of Lot
  valid_from: string;
  valid_to: string;
  carbon_co2e_reduction_ton?: number;
  audit_status: "PENDING" | "VALID" | "EXPIRED" | "REVOKED";
  created_at: string;
  updated_at: string;
}

export type ClaimType =
  | "CERTIFICATE"
  | "POLICY"
  | "MRV_CARBON_CLAIM"
  | "FOOD_SAFETY_CLAIM"
  | "QUOTA_ALLOCATION"
  | "EXPORT_ELIGIBILITY";

// --- Primitive 8: VERIFICATION ---
export interface Verification {
  verification_id: string;             // GCI
  engine_type: EngineType;
  target_lot_id?: string;              // GCI of Lot
  target_event_id?: string;            // GCI of Event
  evaluated_at: string;
  status: VerificationStatus;
  variance_pct?: number;
  confidence_score: number;            // 0-100
  discrepancy_details_json?: Record<string, unknown>;
  enforced_rules: string[];            // Rule IDs (K01-K12, etc.)
  created_at: string;
}

export type EngineType =
  | "MASS_BALANCE_ENGINE"        // Đối soát Cân bằng Khối lượng
  | "YIELD_QUOTA_ENGINE"         // Kiểm soát Hạn ngạch Vùng trồng
  | "EXPORT_REGULATION_CHECK"    // Thẩm tra điều kiện kiểm dịch
  | "KITCHEN_INCIDENT_ENGINE";   // Phân tích Bán kính Tác động Sự cố Ngộ độc (≤60s)

export type VerificationStatus =
  | "PASSED"
  | "WARNING"
  | "BLOCKED_FRAUD_DETECTED"
  | "FAILED"
  | "PENDING";

// --- Primitive 9: TRANSACTION / TRANSFORMATION ---
export interface Transaction {
  transaction_id: string;              // GCI
  transaction_type: TransactionType;
  seller_party_id: string;             // GCI of Party
  buyer_party_id: string;              // GCI of Party
  contract_ref?: string;
  input_lots: TransactionLot[];        // Array with weights
  output_lots: TransactionLot[];       // Array with yields
  conversion_ratio?: number;
  financial_value_vnd?: number;
  status: TransactionStatus;
  executed_at?: string;
  created_at: string;
  updated_at: string;
}

export type TransactionType =
  | "PURCHASE_CONTRACT"           // Hợp đồng bao tiêu
  | "CUSTODY_TRANSFER"            // Biên bản bàn giao hàng hóa
  | "BILL_OF_LADING"              // Vận đơn
  | "PROCESSING_TRANSFORMATION"   // Chuyển hóa vật lý
  | "COOKING_CONVERSION";         // Chế biến nguyên liệu thành suất ăn

export type TransactionStatus =
  | "PENDING"
  | "EXECUTED"
  | "SETTLED"
  | "CANCELLED"
  | "DISPUTED";

export interface TransactionLot {
  lot_id: string;                    // GCI
  weight: number;
  uom: UnitOfMeasure;
  yield_pct?: number;
}

// ============================================================================
// 3. API Client Configuration
// ============================================================================

export interface GotraceApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export const defaultGotraceConfig: GotraceApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_GOTRACE_API_URL || "https://api.gotrace.vn/v1",
  apiKey: process.env.NEXT_PUBLIC_GOTRACE_API_KEY || "",
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// ============================================================================
// 4. Core API Client Class
// ============================================================================

class GotraceApiClient {
  private config: GotraceApiConfig;
  private authToken: string | null = null;

  constructor(config: Partial<GotraceApiConfig> = {}) {
    this.config = { ...defaultGotraceConfig, ...config };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(this.authToken && { "Authorization": `Bearer ${this.authToken}` }),
      ...(this.config.apiKey && { "X-API-Key": this.config.apiKey }),
      ...options.headers,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new GotraceApiError(
            response.status,
            errorData.message || response.statusText,
            errorData
          );
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;
        if (attempt < this.config.retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * (attempt + 1)));
        }
      }
    }

    throw lastError || new Error("Unknown API error");
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  // ========================================================================
  // PARTY API
  // ========================================================================
  async getParty(partyId: string): Promise<Party> {
    return this.request<Party>(`/parties/${partyId}`);
  }

  async listParties(filters?: Partial<Party>): Promise<Party[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Party[]>(`/parties?${params.toString()}`);
  }

  async createParty(party: Omit<Party, "party_id" | "created_at" | "updated_at">): Promise<Party> {
    return this.request<Party>("/parties", {
      method: "POST",
      body: JSON.stringify(party),
    });
  }

  async updateParty(partyId: string, updates: Partial<Party>): Promise<Party> {
    return this.request<Party>(`/parties/${partyId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  // ========================================================================
  // PLACE API
  // ========================================================================
  async getPlace(placeId: string): Promise<Place> {
    return this.request<Place>(`/places/${placeId}`);
  }

  async listPlaces(filters?: Partial<Place>): Promise<Place[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Place[]>(`/places?${params.toString()}`);
  }

  async createPlace(place: Omit<Place, "place_id" | "created_at" | "updated_at">): Promise<Place> {
    return this.request<Place>("/places", {
      method: "POST",
      body: JSON.stringify(place),
    });
  }

  // ========================================================================
  // ITEM API
  // ========================================================================
  async getItem(itemId: string): Promise<Item> {
    return this.request<Item>(`/items/${itemId}`);
  }

  async listItems(filters?: Partial<Item>): Promise<Item[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Item[]>(`/items?${params.toString()}`);
  }

  async createItem(item: Omit<Item, "item_id" | "created_at" | "updated_at">): Promise<Item> {
    return this.request<Item>("/items", {
      method: "POST",
      body: JSON.stringify(item),
    });
  }

  // ========================================================================
  // LOT API
  // ========================================================================
  async getLot(lotId: string): Promise<Lot> {
    return this.request<Lot>(`/lots/${lotId}`);
  }

  async listLots(filters?: { item_id?: string; status?: LotStatus; place_id?: string }): Promise<Lot[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Lot[]>(`/lots?${params.toString()}`);
  }

  async createLot(lot: Omit<Lot, "lot_id" | "created_at" | "updated_at">): Promise<Lot> {
    return this.request<Lot>("/lots", {
      method: "POST",
      body: JSON.stringify(lot),
    });
  }

  async updateLot(lotId: string, updates: Partial<Lot>): Promise<Lot> {
    return this.request<Lot>(`/lots/${lotId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  // ========================================================================
  // EVENT API (Core of Traceability)
  // ========================================================================
  async getEvent(eventId: string): Promise<Event> {
    return this.request<Event>(`/events/${eventId}`);
  }

  async listEvents(filters?: {
    lot_id?: string;
    place_id?: string;
    event_type?: EventType;
    from_date?: string;
    to_date?: string;
  }): Promise<Event[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Event[]>(`/events?${params.toString()}`);
  }

  async createEvent(event: Omit<Event, "event_id" | "created_at" | "event_hash_sha256">): Promise<Event> {
    // Hash is computed server-side
    return this.request<Event>("/events", {
      method: "POST",
      body: JSON.stringify(event),
    });
  }

  async getEventChain(lotId: string): Promise<Event[]> {
    return this.request<Event[]>(`/events/chain/${lotId}`);
  }

  // ========================================================================
  // EVIDENCE API
  // ========================================================================
  async getEvidence(evidenceId: string): Promise<Evidence> {
    return this.request<Evidence>(`/evidence/${evidenceId}`);
  }

  async listEvidence(filters?: { event_id?: string; lot_id?: string; evidence_type?: EvidenceType }): Promise<Evidence[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Evidence[]>(`/evidence?${params.toString()}`);
  }

  async uploadEvidence(evidence: Omit<Evidence, "evidence_id" | "created_at" | "file_hash_sha256">, file: File): Promise<Evidence> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", JSON.stringify(evidence));

    const response = await fetch(`${this.config.baseUrl}/evidence/upload`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.authToken}`,
        "X-API-Key": this.config.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new GotraceApiError(response.status, "Upload failed");
    }
    return response.json();
  }

  // ========================================================================
  // CLAIM API
  // ========================================================================
  async getClaim(claimId: string): Promise<Claim> {
    return this.request<Claim>(`/claims/${claimId}`);
  }

  async listClaims(filters?: { party_id?: string; lot_id?: string; claim_type?: ClaimType }): Promise<Claim[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Claim[]>(`/claims?${params.toString()}`);
  }

  // ========================================================================
  // VERIFICATION API (Rules Engine)
  // ========================================================================
  async getVerification(verificationId: string): Promise<Verification> {
    return this.request<Verification>(`/verifications/${verificationId}`);
  }

  async runVerification(engineType: EngineType, targetLotId: string, targetEventId?: string): Promise<Verification> {
    return this.request<Verification>("/verifications/run", {
      method: "POST",
      body: JSON.stringify({ engine_type: engineType, target_lot_id: targetLotId, target_event_id: targetEventId }),
    });
  }

  async runKitchenRulesCheck(lotId: string, gateData: KitchenGateInput): Promise<Verification> {
    return this.request<Verification>("/verifications/kitchen-rules", {
      method: "POST",
      body: JSON.stringify({ lot_id: lotId, gate_data: gateData }),
    });
  }

  // ========================================================================
  // TRANSACTION API
  // ========================================================================
  async getTransaction(transactionId: string): Promise<Transaction> {
    return this.request<Transaction>(`/transactions/${transactionId}`);
  }

  async listTransactions(filters?: { party_id?: string; lot_id?: string; status?: TransactionStatus }): Promise<Transaction[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<Transaction[]>(`/transactions?${params.toString()}`);
  }

  async createTransaction(transaction: Omit<Transaction, "transaction_id" | "created_at" | "updated_at">): Promise<Transaction> {
    return this.request<Transaction>("/transactions", {
      method: "POST",
      body: JSON.stringify(transaction),
    });
  }

  // ========================================================================
  // TRACEBACK ENGINE (Incident Impact ≤ 15 min)
  // ========================================================================
  async tracebackIncident(lotId: string, options?: TracebackOptions): Promise<TracebackResult> {
    const params = new URLSearchParams();
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return this.request<TracebackResult>(`/traceback/${lotId}?${params.toString()}`);
  }

  async tracebackMassBalance(lotId: string): Promise<MassBalanceResult> {
    return this.request<MassBalanceResult>(`/traceback/mass-balance/${lotId}`);
  }

  async tracebackRecipeReconciliation(mealBatchId: string): Promise<RecipeReconciliationResult> {
    return this.request<RecipeReconciliationResult>(`/traceback/recipe/${mealBatchId}`);
  }

  // ========================================================================
  // REAL-TIME SUBSCRIPTIONS (WebSocket)
  // ========================================================================
  createEventSubscription(lotIds: string[], callback: (event: Event) => void): WebSocketSubscription {
    // In production, this would connect to GOTRACE WebSocket endpoint
    // For now, return a mock subscription handler
    return new MockWebSocketSubscription(lotIds, callback);
  }

  createVerificationSubscription(lotIds: string[], callback: (verification: Verification) => void): WebSocketSubscription {
    return new MockWebSocketSubscription(lotIds, callback);
  }
}

// ============================================================================
// 5. Specialized Types for Kitchen/PMO Operations
// ============================================================================

export interface KitchenGateInput {
  timestamp: string;
  supplier_gci: string;
  lot_gci: string;
  weight_kg: number;
  temperature_celsius: number;
  has_vet_cert: boolean;
  vet_cert_gci?: string;
  freshness_hours: number;
  egg_crack_rate_pct?: number;
  sensory_passed: boolean;
  test_kit_results?: TestKitResult[];
}

export interface TestKitResult {
  test_name: "TINOPAL" | "FORMOL" | "HAN_THE" | "SALMONELLA" | "BVTV_QUICK" | "HEAVY_METALS";
  result: "POSITIVE" | "NEGATIVE";
  threshold?: string;
  kit_batch?: string;
}

export interface TracebackOptions {
  max_depth?: number;
  include_evidence?: boolean;
  include_verification?: boolean;
  time_limit_seconds?: number;
}

export interface TracebackResult {
  trace_id: string;
  root_lot_id: string;
  trace_path: TracebackNode[];
  total_latency_ms: number;
  impacted_parties: ImpactedParty[];
  generated_at: string;
}

export interface TracebackNode {
  event_id: string;
  event_type: EventType;
  timestamp_utc: string;
  place_name: string;
  party_name: string;
  input_lots: string[];
  output_lots: string[];
  telemetry?: TelemetryData;
  evidence?: Evidence[];
  verification?: Verification;
}

export interface ImpactedParty {
  party_id: string;
  party_name: string;
  party_type: PartyType;
  affected_quantity: number;
  affected_meals?: number;
  contact_info: string;
}

export interface MassBalanceResult {
  lot_id: string;
  input_quantity: number;
  output_quantity: number;
  variance_pct: number;
  variance_kg: number;
  status: "BALANCED" | "VARIANCE_WARNING" | "VARIANCE_CRITICAL" | "FRAUD_SUSPECTED";
  details: MassBalanceDetail[];
}

export interface MassBalanceDetail {
  stage: string;
  expected: number;
  actual: number;
  variance: number;
  explanation?: string;
}

export interface RecipeReconciliationResult {
  meal_batch_id: string;
  recipe_ingredients: RecipeIngredient[];
  actual_ingredients: ActualIngredient[];
  discrepancies: RecipeDiscrepancy[];
  compliance_score: number;
}

export interface RecipeIngredient {
  item_id: string;
  item_name: string;
  planned_weight_kg: number;
  planned_uom: UnitOfMeasure;
}

export interface ActualIngredient {
  lot_id: string;
  item_id: string;
  item_name: string;
  actual_weight_kg: number;
  actual_uom: UnitOfMeasure;
  lot_gci: string;
}

export interface RecipeDiscrepancy {
  item_name: string;
  planned_kg: number;
  actual_kg: number;
  variance_kg: number;
  variance_pct: number;
  severity: "MINOR" | "MAJOR" | "CRITICAL";
  possible_causes: string[];
}

// ============================================================================
// 6. WebSocket Subscription (Real-time)
// ============================================================================

export interface WebSocketSubscription {
  unsubscribe: () => void;
  isConnected: () => boolean;
}

class MockWebSocketSubscription<T = unknown> implements WebSocketSubscription {
  private connected = true;
  private interval: NodeJS.Timeout | null = null;

  constructor(
    private lotIds: string[],
    private callback: (data: T) => void
  ) {
    // Simulate real-time updates
    this.interval = setInterval(() => {
      if (this.connected && Math.random() > 0.7) {
        this.callback({
          type: "SIMULATED_UPDATE",
          lot_id: this.lotIds[Math.floor(Math.random() * this.lotIds.length)],
          timestamp: new Date().toISOString(),
        } as unknown as T);
      }
    }, 5000);
  }

  unsubscribe() {
    this.connected = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// ============================================================================
// 7. Error Classes
// ============================================================================

export class GotraceApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "GotraceApiError";
  }
}

export class GotraceValidationError extends Error {
  constructor(
    message: string,
    public fieldErrors: Record<string, string>
  ) {
    super(message);
    this.name = "GotraceValidationError";
  }
}

// ============================================================================
// 8. Singleton Instance & Helper Functions
// ============================================================================

let apiClientInstance: GotraceApiClient | null = null;

export function getGotraceApiClient(config?: Partial<GotraceApiConfig>): GotraceApiClient {
  if (!apiClientInstance) {
    apiClientInstance = new GotraceApiClient(config);
  }
  return apiClientInstance;
}

export function resetGotraceApiClient(): void {
  apiClientInstance = null;
}

// Helper: Create GCI for PMO Field Ops (Kitchen context)
export function createKitchenLotGCI(
  province: string,
  itemCode: string,
  batchNumber: string
): string {
  return buildGCI({
    country: "VN",
    province,
    primitiveType: "LOT",
    entityCode: `KITCHEN-${itemCode}`,
    subId: batchNumber,
  });
}

export function createKitchenEventGCI(
  province: string,
  eventType: EventType,
  timestamp: string
): string {
  const timePart = timestamp.replace(/[-:T.]/g, "").slice(0, 14);
  return buildGCI({
    country: "VN",
    province,
    primitiveType: "EVENT",
    entityCode: eventType,
    subId: timePart,
  });
}

export function createSampleRecordGCI(
  province: string,
  mealBatchId: string,
  sampleNumber: number
): string {
  return buildGCI({
    country: "VN",
    province,
    primitiveType: "EVIDENCE",
    entityCode: `SAMPLE-${mealBatchId}`,
    subId: `S${sampleNumber.toString().padStart(3, "0")}`,
  });
}

// ============================================================================
// 9. Offline-First Support (LocalStorage Sync Queue)
// ============================================================================

export interface SyncQueueItem {
  id: string;
  type: "CREATE_EVENT" | "CREATE_EVIDENCE" | "UPDATE_LOT" | "RUN_VERIFICATION";
  payload: unknown;
  created_at: string;
  retry_count: number;
  max_retries: number;
}

export class OfflineSyncQueue {
  private static STORAGE_KEY = "gotrace_pmo_sync_queue";
  private queue: SyncQueueItem[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.load();
    }
  }

  private load() {
    try {
      const stored = localStorage.getItem(OfflineSyncQueue.STORAGE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch {
      this.queue = [];
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem(OfflineSyncQueue.STORAGE_KEY, JSON.stringify(this.queue));
    }
  }

  enqueue(item: Omit<SyncQueueItem, "id" | "created_at" | "retry_count">): string {
    const newItem: SyncQueueItem = {
      ...item,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      retry_count: 0,
    };
    this.queue.push(newItem);
    this.save();
    return newItem.id;
  }

  dequeue(): SyncQueueItem | null {
    const item = this.queue.shift();
    if (item) this.save();
    return item || null;
  }

  requeue(item: SyncQueueItem) {
    if (item.retry_count < item.max_retries) {
      item.retry_count++;
      this.queue.unshift(item);
      this.save();
    }
  }

  getAll(): SyncQueueItem[] {
    return [...this.queue];
  }

  clear() {
    this.queue = [];
    this.save();
  }

  get length(): number {
    return this.queue.length;
  }
}

export const offlineSyncQueue = new OfflineSyncQueue();

// ============================================================================
// 10. Export All
// ============================================================================

export const gotraceApi = getGotraceApiClient();