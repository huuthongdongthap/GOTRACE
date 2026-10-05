/**
 * GoTRACE Webhook Ingestion Engine
 * 
 * Orchestrates inbound webhooks from Bravo 8, MISA AMIS, and SAP S/4HANA:
 * 1. HMAC-SHA256 signature verification & replay check
 * 2. LOT extraction and normalization
 * 3. TRANSACTION: CUSTODY_TRANSFER mapping
 * 4. Dynamic Traceability QR Code Generation (<30ms)
 * 5. Industrial Zebra ZPL thermal label generation
 * 6. Graph ledger registration & idempotency caching
 */

import { performance } from 'node:perf_hooks';
import { 
  TraceabilityLabelResponse, 
  BravoDeliveryOrderPayload, 
  MisaInvoicePayload, 
  SapDeliveryOrderPayload 
} from '../types/models.js';
import { verifyHmacSha256 } from '../crypto/hmac.js';
import { LotExtractor } from '../services/lot_extractor.js';
import { TransactionMapper } from '../services/transaction_mapper.js';
import { LineageEngine } from '../services/lineage_engine.js';
import { generateTraceabilityQr } from '../qr/qr_generator.js';
import { ZplGenerator } from '../qr/zpl_builder.js';

export interface WebhookReceiverConfig {
  sharedSecret: string;
  defaultLandingUrl?: string; // Default: "https://trace.gotrace.vn/resolve"
  defaultProvince?: string; // Default: "DT"
  maxClockSkewSeconds?: number;
}

export interface IngestionResult {
  statusCode: number;
  success: boolean;
  error?: string;
  data?: TraceabilityLabelResponse;
}

export class WebhookReceiver {
  private config: WebhookReceiverConfig;
  private lineage: LineageEngine;

  constructor(config: WebhookReceiverConfig, lineage?: LineageEngine) {
    this.config = {
      defaultLandingUrl: 'https://trace.gotrace.vn/resolve',
      defaultProvince: 'DT',
      maxClockSkewSeconds: 300,
      ...config
    };
    this.lineage = lineage ?? new LineageEngine();
  }

  public getLineageEngine(): LineageEngine {
    return this.lineage;
  }

  /**
   * Process Delivery Order Webhook (Bravo 8, SAP S/4HANA, or Generic DO).
   */
  public handleDeliveryOrder(
    rawBody: string | Buffer,
    signatureHeader: string | undefined | null,
    parsedPayload: Record<string, unknown>
  ): IngestionResult {
    const startTime = performance.now();

    // 1. Verify HMAC-SHA256 signature
    const hmacRes = verifyHmacSha256(rawBody, signatureHeader, this.config.sharedSecret, {
      maxClockSkewSeconds: this.config.maxClockSkewSeconds,
      timestamp: (parsedPayload.timestamp_utc || parsedPayload.timestampUtc) as string
    });

    if (!hmacRes.valid) {
      return {
        statusCode: 401,
        success: false,
        error: `${hmacRes.code}: ${hmacRes.message}`
      };
    }

    try {
      // 2. Extract LOTs
      const extraction = LotExtractor.extractAuto(parsedPayload);
      const idempotencyKey = `${extraction.erpSource}:${extraction.orderOrInvoiceId}`;

      // Check Idempotency
      const existing = this.lineage.getIdempotentResponse(idempotencyKey);
      if (existing) {
        return {
          statusCode: 200,
          success: true,
          data: {
            ...existing,
            isIdempotent: true
          }
        };
      }

      if (!extraction.normalizedOrder) {
        throw new Error('Could not produce normalized delivery order from payload');
      }

      // 3. Map to TRANSACTION: CUSTODY_TRANSFER
      const tx = TransactionMapper.mapDeliveryOrder(
        extraction.normalizedOrder,
        extraction.lots,
        this.config.defaultProvince
      );

      // 4. Generate Dynamic QR Code (< 30ms SLA)
      const landingUrl = `${this.config.defaultLandingUrl}?tx=${encodeURIComponent(tx.transaction_id)}`;
      const qrResult = generateTraceabilityQr(landingUrl, { level: 'M' });

      // 5. Generate Zebra ZPL Thermal Label
      const primaryLot = extraction.lots[0];
      const zplCode = ZplGenerator.generateCartonLabel({
        productName: primaryLot.metadata?.original_lot_number 
          ? `GAO ST25 CO MAY - ${primaryLot.metadata.original_lot_number}` 
          : 'GAO ST25 XUAT KHAU DONG THAP',
        lotGci: primaryLot.lot_id,
        productionDate: primaryLot.production_date,
        expiryDate: primaryLot.expiry_date,
        weightKg: primaryLot.quantity_net,
        uom: primaryLot.uom,
        originFacility: extraction.normalizedOrder.warehouseCode,
        traceabilityUrl: landingUrl
      });

      // 6. Record to Lineage Graph
      this.lineage.storeLots(extraction.lots);
      this.lineage.storeTransaction(tx);

      const endTime = performance.now();
      const totalLatencyMs = Number((endTime - startTime).toFixed(3));

      const response: TraceabilityLabelResponse = {
        traceabilityId: tx.transaction_id,
        qrPayload: landingUrl,
        qrImageBase64: qrResult.qrImageBase64,
        qrSvg: qrResult.qrSvg,
        zplCode,
        generationLatencyMs: totalLatencyMs,
        extractedLots: extraction.lots,
        transaction: tx,
        isIdempotent: false
      };

      // Register Idempotency
      this.lineage.registerIdempotency(idempotencyKey, response);

      return {
        statusCode: 200,
        success: true,
        data: response
      };
    } catch (err) {
      return {
        statusCode: 422,
        success: false,
        error: (err as Error).message
      };
    }
  }

  /**
   * Process E-Invoice Webhook (MISA AMIS, etc.).
   */
  public handleEInvoice(
    rawBody: string | Buffer,
    signatureHeader: string | undefined | null,
    parsedPayload: Record<string, unknown>
  ): IngestionResult {
    const startTime = performance.now();

    // 1. Verify HMAC-SHA256 signature
    const hmacRes = verifyHmacSha256(rawBody, signatureHeader, this.config.sharedSecret, {
      maxClockSkewSeconds: this.config.maxClockSkewSeconds,
      timestamp: (parsedPayload.timestamp_utc || parsedPayload.issue_date) as string
    });

    if (!hmacRes.valid) {
      return {
        statusCode: 401,
        success: false,
        error: `${hmacRes.code}: ${hmacRes.message}`
      };
    }

    try {
      // 2. Extract LOTs
      const extraction = LotExtractor.extractFromMisaInvoice(parsedPayload as unknown as MisaInvoicePayload);
      const idempotencyKey = `MISA_AMIS:${extraction.orderOrInvoiceId}`;

      // Check Idempotency
      const existing = this.lineage.getIdempotentResponse(idempotencyKey);
      if (existing) {
        return {
          statusCode: 200,
          success: true,
          data: {
            ...existing,
            isIdempotent: true
          }
        };
      }

      if (!extraction.normalizedInvoice) {
        throw new Error('Could not produce normalized invoice from payload');
      }

      // 3. Map to TRANSACTION: CUSTODY_TRANSFER
      const tx = TransactionMapper.mapInvoice(
        extraction.normalizedInvoice,
        extraction.lots,
        this.config.defaultProvince
      );

      // 4. Generate Dynamic QR Code (< 30ms SLA)
      const landingUrl = `${this.config.defaultLandingUrl}?invoice=${encodeURIComponent(extraction.normalizedInvoice.invoiceNumber)}&tx=${encodeURIComponent(tx.transaction_id)}`;
      const qrResult = generateTraceabilityQr(landingUrl, { level: 'M' });

      // 5. Generate Zebra ZPL Label
      const primaryLot = extraction.lots[0];
      const zplCode = ZplGenerator.generateCartonLabel({
        productName: `HOA DON ${extraction.normalizedInvoice.invoiceSeries}-${extraction.normalizedInvoice.invoiceNumber}`,
        lotGci: primaryLot ? primaryLot.lot_id : tx.transaction_id,
        productionDate: extraction.normalizedInvoice.issueDate.slice(0, 10),
        weightKg: primaryLot ? primaryLot.quantity_net : undefined,
        originFacility: extraction.normalizedInvoice.sellerPartyGci,
        traceabilityUrl: landingUrl
      });

      // 6. Record to Lineage Graph
      this.lineage.storeLots(extraction.lots);
      this.lineage.storeTransaction(tx);

      const endTime = performance.now();
      const totalLatencyMs = Number((endTime - startTime).toFixed(3));

      const response: TraceabilityLabelResponse = {
        traceabilityId: tx.transaction_id,
        qrPayload: landingUrl,
        qrImageBase64: qrResult.qrImageBase64,
        qrSvg: qrResult.qrSvg,
        zplCode,
        generationLatencyMs: totalLatencyMs,
        extractedLots: extraction.lots,
        transaction: tx,
        isIdempotent: false
      };

      this.lineage.registerIdempotency(idempotencyKey, response);

      return {
        statusCode: 200,
        success: true,
        data: response
      };
    } catch (err) {
      return {
        statusCode: 422,
        success: false,
        error: (err as Error).message
      };
    }
  }
}

export const WebhookVerifier = WebhookReceiver;

