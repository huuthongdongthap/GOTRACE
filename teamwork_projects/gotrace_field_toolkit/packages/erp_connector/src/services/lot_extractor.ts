/**
 * GoTRACE LOT Extraction Engine
 * 
 * Extracts, validates, and normalizes LOT entities from diverse ERP formats:
 * - Bravo 8 Delivery Order
 * - MISA AMIS E-Invoice
 * - SAP S/4HANA Delivery Order / Goods Issue
 */

import { 
  GoTraceLot, 
  BravoDeliveryOrderPayload, 
  MisaInvoicePayload, 
  SapDeliveryOrderPayload, 
  NormalizedDeliveryOrder,
  NormalizedInvoice,
  ErpSource
} from '../types/models.js';
import { GciValidator } from './gci_validator.js';

export interface LotExtractionResult {
  erpSource: ErpSource;
  orderOrInvoiceId: string;
  lots: GoTraceLot[];
  normalizedOrder?: NormalizedDeliveryOrder;
  normalizedInvoice?: NormalizedInvoice;
}

export class LotExtractor {
  /**
   * Extract LOTs from Bravo 8 Delivery Order Webhook payload.
   */
  public static extractFromBravoDo(payload: BravoDeliveryOrderPayload): LotExtractionResult {
    if (!payload.order_id || !payload.items || !Array.isArray(payload.items) || payload.items.length === 0) {
      throw new Error('Invalid Bravo 8 DO payload: order_id and non-empty items array are required');
    }

    const now = new Date().toISOString();
    const lots: GoTraceLot[] = [];
    const normalizedItems: NormalizedDeliveryOrder['lineItems'] = [];

    for (const item of payload.items) {
      if (!item.lot_number || item.quantity <= 0) {
        throw new Error(`Invalid line item in Bravo DO: lot_number and positive quantity required (${JSON.stringify(item)})`);
      }

      const lotGci = GciValidator.canonicalizeLotGci(item.lot_number, 'DT', 'FINISHED');
      const itemGci = GciValidator.isValid(item.item_code)
        ? item.item_code
        : `VN.DT.ITEM.GRAIN.${item.item_code.replace(/[^A-Za-z0-9_-]/g, '-')}`;

      const netWeight = item.net_weight_kg ?? item.quantity;
      const grossWeight = item.gross_weight_kg ?? (netWeight * 1.01);
      const prodDate = item.mfg_date ?? payload.delivery_date.slice(0, 10);
      const expDate = item.exp_date;

      const lotEntity: GoTraceLot = {
        lot_id: lotGci,
        item_id: itemGci,
        parent_lot_ids: [],
        quantity_net: netWeight,
        quantity_gross: grossWeight,
        uom: (item.uom || 'KG').toUpperCase(),
        production_date: prodDate,
        expiry_date: expDate,
        status: 'INSPECTED',
        metadata: {
          original_lot_number: item.lot_number,
          erp_source: 'BRAVO_8',
          delivery_order_id: payload.order_id,
          carrier: payload.carrier_party_gci,
          warehouse: payload.warehouse_gci
        },
        created_at: now,
        updated_at: now
      };

      lots.push(lotEntity);
      normalizedItems.push({
        itemGci,
        lotNumber: item.lot_number,
        lotGci,
        quantity: item.quantity,
        unit: item.uom,
        netWeightKg: netWeight,
        grossWeightKg: grossWeight,
        productionDate: prodDate,
        expiryDate: expDate
      });
    }

    const normalizedOrder: NormalizedDeliveryOrder = {
      orderId: payload.order_id,
      erpSource: 'BRAVO_8',
      warehouseCode: payload.warehouse_gci ?? 'VN.DT.PLACE.WAREHOUSE.DEFAULT',
      carrierPartyGci: payload.carrier_party_gci,
      customerPartyGci: payload.customer_party_gci ?? 'VN.SG.PARTY.BUYER.COOPMART',
      issueDate: payload.delivery_date,
      deliveryDate: payload.delivery_date,
      vehiclePlate: payload.vehicle_plate,
      lineItems: normalizedItems,
      originalPayload: payload,
      timestampUtc: payload.timestamp_utc || now
    };

    return {
      erpSource: 'BRAVO_8',
      orderOrInvoiceId: payload.order_id,
      lots,
      normalizedOrder
    };
  }

  /**
   * Extract LOTs from MISA AMIS E-Invoice Webhook payload.
   */
  public static extractFromMisaInvoice(payload: MisaInvoicePayload): LotExtractionResult {
    if (!payload.invoice_number || !payload.lots || !Array.isArray(payload.lots) || payload.lots.length === 0) {
      throw new Error('Invalid MISA AMIS Invoice payload: invoice_number and non-empty lots array are required');
    }

    const now = new Date().toISOString();
    const lots: GoTraceLot[] = [];
    const normalizedItems: NormalizedInvoice['lineItems'] = [];

    const sellerGci = GciValidator.canonicalizePartyGci(payload.seller_tax_code, 'ENTERPRISE', 'DT');
    const buyerGci = GciValidator.canonicalizePartyGci(payload.buyer_tax_code, 'BUYER', 'SG');

    for (const item of payload.lots) {
      const rawLot = item.lot_gci || item.lot_number;
      if (!rawLot || item.quantity <= 0) {
        throw new Error(`Invalid lot in MISA Invoice: lot reference and positive quantity required (${JSON.stringify(item)})`);
      }

      const lotGci = GciValidator.canonicalizeLotGci(rawLot, 'DT', 'FINISHED');
      const itemGci = item.item_code && GciValidator.isValid(item.item_code)
        ? item.item_code
        : `VN.DT.ITEM.PROCESSED_FOOD.GRAIN-STANDARD`;

      const prodDate = payload.issue_date.slice(0, 10);
      const expDate = item.exp_date;

      const lotEntity: GoTraceLot = {
        lot_id: lotGci,
        item_id: itemGci,
        parent_lot_ids: [],
        quantity_net: item.quantity,
        quantity_gross: item.quantity * 1.01,
        uom: (item.uom || 'KG').toUpperCase(),
        production_date: prodDate,
        expiry_date: expDate,
        status: 'INSPECTED',
        metadata: {
          erp_source: 'MISA_AMIS',
          invoice_number: payload.invoice_number,
          invoice_series: payload.invoice_series,
          unit_price_vnd: item.unit_price_vnd
        },
        created_at: now,
        updated_at: now
      };

      lots.push(lotEntity);
      normalizedItems.push({
        lotGci,
        itemGci,
        quantity: item.quantity,
        unit: item.uom,
        unitPriceVnd: item.unit_price_vnd ?? 0,
        expiryDate: expDate
      });
    }

    const normalizedInvoice: NormalizedInvoice = {
      invoiceNumber: payload.invoice_number,
      invoiceSeries: payload.invoice_series,
      erpSource: 'MISA_AMIS',
      issueDate: payload.issue_date,
      sellerTaxId: payload.seller_tax_code,
      buyerTaxId: payload.buyer_tax_code,
      sellerPartyGci: sellerGci,
      buyerPartyGci: buyerGci,
      totalAmountBeforeVat: payload.total_amount_before_vat,
      vatRatePct: payload.vat_rate_pct ?? 5.0,
      totalAmountVnd: payload.total_amount_vnd,
      lineItems: normalizedItems,
      timestampUtc: payload.timestamp_utc || now
    };

    return {
      erpSource: 'MISA_AMIS',
      orderOrInvoiceId: payload.invoice_number,
      lots,
      normalizedInvoice
    };
  }

  /**
   * Extract LOTs from SAP S/4HANA Delivery Order / Goods Issue Webhook payload.
   */
  public static extractFromSapDo(payload: SapDeliveryOrderPayload): LotExtractionResult {
    if (!payload.orderNumber || !payload.lineItems || !Array.isArray(payload.lineItems) || payload.lineItems.length === 0) {
      throw new Error('Invalid SAP S/4HANA DO payload: orderNumber and non-empty lineItems array are required');
    }

    const now = new Date().toISOString();
    const lots: GoTraceLot[] = [];
    const normalizedItems: NormalizedDeliveryOrder['lineItems'] = [];

    const customerGci = GciValidator.canonicalizePartyGci(
      payload.customerCode || payload.partnerTaxId,
      'BUYER',
      'SG'
    );

    for (const item of payload.lineItems) {
      if (!item.lotGci || item.quantity <= 0) {
        throw new Error(`Invalid lineItem in SAP DO: lotGci and positive quantity required (${JSON.stringify(item)})`);
      }

      const lotGci = GciValidator.canonicalizeLotGci(item.lotGci, 'DT', 'FINISHED');
      const itemGci = GciValidator.isValid(item.itemGci) 
        ? item.itemGci 
        : `VN.DT.ITEM.GRAIN.${item.itemGci.replace(/[^A-Za-z0-9_-]/g, '-')}`;

      const netWeight = item.netWeightKg ?? item.quantity;
      const grossWeight = item.grossWeightKg ?? (netWeight * 1.01);
      const prodDate = item.mfgDate ?? payload.issueDate.slice(0, 10);
      const expDate = item.expiryDate;

      const lotEntity: GoTraceLot = {
        lot_id: lotGci,
        item_id: itemGci,
        parent_lot_ids: [],
        quantity_net: netWeight,
        quantity_gross: grossWeight,
        uom: (item.unit || 'KG').toUpperCase(),
        production_date: prodDate,
        expiry_date: expDate,
        status: 'INSPECTED',
        metadata: {
          erp_source: 'SAP_S4HANA',
          order_number: payload.orderNumber,
          warehouse_code: payload.warehouseCode,
          partner_tax_id: payload.partnerTaxId
        },
        created_at: now,
        updated_at: now
      };

      lots.push(lotEntity);
      normalizedItems.push({
        itemGci,
        lotNumber: item.lotGci,
        lotGci,
        quantity: item.quantity,
        unit: item.unit,
        netWeightKg: netWeight,
        grossWeightKg: grossWeight,
        productionDate: prodDate,
        expiryDate: expDate
      });
    }

    const normalizedOrder: NormalizedDeliveryOrder = {
      orderId: payload.orderNumber,
      erpSource: 'SAP_S4HANA',
      warehouseCode: payload.warehouseCode,
      customerPartyGci: customerGci,
      issueDate: payload.issueDate,
      deliveryDate: payload.deliveryDate ?? payload.issueDate,
      lineItems: normalizedItems,
      originalPayload: payload,
      timestampUtc: payload.timestampUtc || now
    };

    return {
      erpSource: 'SAP_S4HANA',
      orderOrInvoiceId: payload.orderNumber,
      lots,
      normalizedOrder
    };
  }

  /**
   * Auto-detect ERP source and extract LOTs.
   */
  public static extractAuto(payload: Record<string, unknown>): LotExtractionResult {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Payload must be a valid JSON object');
    }

    if (payload.erp_source === 'BRAVO_8' || ('order_id' in payload && 'items' in payload)) {
      return this.extractFromBravoDo(payload as unknown as BravoDeliveryOrderPayload);
    }

    if (payload.erp_source === 'MISA_AMIS' || ('invoice_number' in payload && 'lots' in payload)) {
      return this.extractFromMisaInvoice(payload as unknown as MisaInvoicePayload);
    }

    if (payload.erpSource === 'SAP_S4HANA' || ('orderNumber' in payload && 'lineItems' in payload)) {
      return this.extractFromSapDo(payload as unknown as SapDeliveryOrderPayload);
    }

    throw new Error('Unrecognized ERP payload structure. Supported sources: Bravo 8, MISA AMIS, SAP S/4HANA');
  }
}
