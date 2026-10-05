/**
 * GoTRACE ERP Connector - Core Data Models & Type Definitions
 * 
 * Based on GoTRACE Platform Object Implementation Blueprint & 
 * GCI (Global Chain Identifier) Specification.
 */

// ============================================================================
// 1. GCI & PROVINCIAL CONSTANTS
// ============================================================================

export type MekongProvinceCode = 
  | 'DT' // Đồng Tháp
  | 'AG' // An Giang
  | 'CT' // Cần Thơ
  | 'TG' // Tiền Giang
  | 'BT' // Bến Tre
  | 'LA' // Long An
  | 'SG' // TP. Hồ Chí Minh
  | 'BL' // Bạc Liêu
  | 'CM' // Cà Mau
  | 'KG' // Kiên Giang
  | 'ST' // Sóc Trăng
  | 'TV' // Trà Vinh
  | 'HG' // Hậu Giang
  | 'VL'; // Vĩnh Long

export const MEKONG_PROVINCE_CODES: readonly string[] = [
  'DT', 'AG', 'CT', 'TG', 'BT', 'LA', 'SG', 'BL', 'CM', 'KG', 'ST', 'TV', 'HG', 'VL'
] as const;

export type CorePrimitiveType = 
  | 'PARTY'
  | 'PLACE'
  | 'ITEM'
  | 'LOT'
  | 'EVENT'
  | 'EVIDENCE'
  | 'CLAIM'
  | 'VERIFY'
  | 'TRANSACTION';

export const GCI_REGEX = /^VN\.(DT|AG|CT|TG|BT|LA|BL|CM|KG|ST|TV|HG|VL|SG|DN|BD|LD|TN)\.(PARTY|PLACE|ITEM|LOT|EVENT|EVIDENCE|CLAIM|VERIFY|TRANSACTION)\.[A-Z0-9_-]+\.[A-Z0-9._-]+$/;
export const LOT_GCI_REGEX = /^VN\.[A-Z]{2,3}\.LOT\.[A-Z0-9_-]+\.[A-Z0-9._-]+$/;
export const TRANSACTION_GCI_REGEX = /^VN\.[A-Z]{2,3}\.TRANSACTION\.[A-Z0-9_-]+\.[A-Z0-9._-]+$/;

// ============================================================================
// 2. CORE PRIMITIVES INTERFACES
// ============================================================================

export interface GoTraceLot {
  lot_id: string; // GCI
  item_id: string; // GCI
  parent_lot_ids: string[];
  quantity_net: number;
  quantity_gross: number;
  uom: string; // "KG" | "TON" | "BAG" | etc.
  production_date: string; // YYYY-MM-DD
  expiry_date?: string; // YYYY-MM-DD
  moisture_pct?: number;
  brix_degree?: number;
  quality_grade?: 'GRADE_1' | 'GRADE_2' | 'GRADE_3' | 'OUT_OF_SPEC' | 'CULL_REJECT';
  status: 'CREATED' | 'IN_PROCESS' | 'INSPECTED' | 'BLENDED' | 'CONSUMED' | 'RECALLED' | 'DISPOSED';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface GoTraceTransaction {
  transaction_id: string; // GCI: VN.<PROV>.TRANSACTION.CUSTODY_TRANSFER.<ID>
  transaction_type: 'PURCHASE_CONTRACT' | 'CUSTODY_TRANSFER' | 'BILL_OF_LADING' | 'PROCESSING_TRANSFORMATION' | 'COOKING_CONVERSION';
  seller_party_id: string; // GCI
  buyer_party_id: string; // GCI
  contract_ref?: string;
  input_lots: Array<{
    lot_id: string;
    weight: number;
    uom: string;
    yield_pct?: number;
  }>;
  output_lots: Array<{
    lot_id: string;
    weight: number;
    uom: string;
    yield_pct?: number;
  }>;
  conversion_ratio?: number;
  financial_value_vnd?: number;
  status: 'PENDING' | 'EXECUTED' | 'SETTLED' | 'CANCELLED' | 'DISPUTED';
  executed_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// 3. ERP WEBHOOK INGESTION PAYLOADS
// ============================================================================

export type ErpSource = 'BRAVO_8' | 'MISA_AMIS' | 'SAP_S4HANA' | 'GENERIC_ERP';

/**
 * Bravo 8 Delivery Order Webhook (as observed in Mekong rice mills: Cỏ May, Trung An)
 */
export interface BravoDeliveryOrderPayload {
  event_id?: string;
  erp_source: 'BRAVO_8';
  order_id: string;
  warehouse_gci?: string;
  carrier_party_gci?: string;
  customer_party_gci?: string;
  delivery_date: string;
  vehicle_plate?: string;
  items: Array<{
    item_code: string;
    lot_number: string;
    quantity: number;
    uom: string;
    gross_weight_kg?: number;
    net_weight_kg?: number;
    mfg_date?: string;
    exp_date?: string;
  }>;
  issued_by_accountant?: string;
  timestamp_utc: string;
}

/**
 * MISA AMIS E-Invoice Webhook (as observed in agro SMEs and Cooperatives)
 */
export interface MisaInvoicePayload {
  invoice_number: string;
  invoice_series: string;
  erp_source: 'MISA_AMIS';
  issue_date: string;
  seller_tax_code: string;
  seller_name?: string;
  buyer_tax_code: string;
  buyer_name?: string;
  total_amount_before_vat: number;
  vat_rate_pct?: number;
  total_amount_vnd: number;
  lots: Array<{
    lot_gci?: string;
    lot_number?: string;
    item_code?: string;
    quantity: number;
    uom: string;
    unit_price_vnd?: number;
    exp_date?: string;
  }>;
  timestamp_utc?: string;
}

/**
 * SAP S/4HANA Delivery Order / Goods Issue Webhook
 */
export interface SapDeliveryOrderPayload {
  orderNumber: string;
  erpSource?: 'SAP_S4HANA';
  partnerTaxId: string;
  warehouseCode: string;
  issueDate: string;
  deliveryDate?: string;
  customerCode?: string;
  lineItems: Array<{
    itemGci: string;
    lotGci: string;
    quantity: number;
    unit: string;
    expiryDate: string;
    mfgDate?: string;
    netWeightKg?: number;
    grossWeightKg?: number;
  }>;
  timestampUtc?: string;
}

/**
 * Unified Normalized Delivery Order across all ERPs
 */
export interface NormalizedDeliveryOrder {
  orderId: string;
  erpSource: ErpSource;
  warehouseCode: string;
  carrierPartyGci?: string;
  customerPartyGci: string;
  issueDate: string;
  deliveryDate: string;
  vehiclePlate?: string;
  lineItems: Array<{
    itemGci: string;
    lotNumber: string;
    lotGci: string;
    quantity: number;
    unit: string;
    netWeightKg: number;
    grossWeightKg: number;
    productionDate?: string;
    expiryDate?: string;
  }>;
  financialTotalVnd?: number;
  originalPayload: unknown;
  timestampUtc: string;
}

/**
 * Unified Normalized E-Invoice across all ERPs
 */
export interface NormalizedInvoice {
  invoiceNumber: string;
  invoiceSeries: string;
  erpSource: ErpSource;
  issueDate: string;
  sellerTaxId: string;
  buyerTaxId: string;
  sellerPartyGci: string;
  buyerPartyGci: string;
  totalAmountBeforeVat: number;
  vatRatePct: number;
  totalAmountVnd: number;
  lineItems: Array<{
    lotGci: string;
    itemGci: string;
    quantity: number;
    unit: string;
    unitPriceVnd: number;
    expiryDate?: string;
  }>;
  timestampUtc: string;
}

// ============================================================================
// 4. API RESPONSES & QR LABELS
// ============================================================================

export interface TraceabilityLabelResponse {
  traceabilityId: string; // GCI: VN.<PROV>.TRANSACTION.CUSTODY_TRANSFER.<ID>
  qrPayload: string; // URL: https://trace.gotrace.vn/resolve?tx=<GCI> or /t/<GCI>
  qrImageBase64: string; // data:image/png;base64,...
  qrSvg: string; // Raw SVG string
  zplCode: string; // Zebra Programming Language commands
  generationLatencyMs: number;
  extractedLots: GoTraceLot[];
  transaction: GoTraceTransaction;
  isIdempotent?: boolean;
}

export interface QrGenerateRequest {
  targetGci: string; // LOT or TRANSACTION GCI
  commodityName?: string;
  productionDate?: string;
  expiryDate?: string;
  weightNetKg?: number;
  landingBaseUrl?: string; // Default: https://trace.gotrace.vn/resolve
  format?: 'ALL' | 'PNG' | 'SVG' | 'ZPL';
  level?: 'L' | 'M' | 'Q' | 'H'; // Default: 'M'
  sizePx?: number; // Default: 256
}

export interface QrGenerateResponse {
  targetGci: string;
  url: string;
  pngBase64?: string;
  svg?: string;
  zplCarton?: string;
  zplPallet?: string;
  generationLatencyMs: number;
}

export interface LineageReport {
  lotGci: string;
  lot: GoTraceLot;
  parentLots: GoTraceLot[];
  custodyTransactions: GoTraceTransaction[];
  verifications: Array<{
    type: string;
    status: 'PASSED' | 'WARNING' | 'FAILED';
    timestamp: string;
  }>;
}
