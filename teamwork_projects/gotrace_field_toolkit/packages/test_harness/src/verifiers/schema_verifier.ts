/**
 * GoTRACE Schema Verifier
 * Validates structural integrity and mandatory fields of payloads without heavy external dependencies.
 */

import type {
  WeighedEventPayload,
  WeightTicketPayload,
  HarvestLotPayload,
  ErpDeliveryOrderWebhook,
  TraceabilityLabelResponse,
} from '../models/contracts.ts';
import {
  isValidWeighedEventGci,
  isValidWeightTicketGci,
  isValidWeighStationGci,
  isValidHarvestLotGci,
  isValidPlotGci,
  validateGciSyntax,
} from './gci_verifier.ts';

export function validateWeighedEvent(obj: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['Payload must be a non-null object'] };
  }

  const evt = obj as Partial<WeighedEventPayload>;

  if (!evt.eventId || !isValidWeighedEventGci(evt.eventId)) {
    errors.push(`Invalid or missing eventId: ${evt.eventId}`);
  }
  if (evt.eventType !== 'WEIGHED') {
    errors.push(`eventType must be 'WEIGHED', got: ${evt.eventType}`);
  }
  if (!evt.placeId || !isValidWeighStationGci(evt.placeId)) {
    errors.push(`Invalid or missing placeId (weigh station): ${evt.placeId}`);
  }
  if (!evt.operatorPartyId || !validateGciSyntax(evt.operatorPartyId).valid) {
    errors.push(`Invalid operatorPartyId: ${evt.operatorPartyId}`);
  }
  if (!Array.isArray(evt.inputLots)) {
    errors.push('inputLots must be an array');
  }
  if (!evt.telemetryData || typeof evt.telemetryData !== 'object') {
    errors.push('Missing telemetryData object');
  } else {
    if (typeof evt.telemetryData.weightKg !== 'number' || evt.telemetryData.weightKg <= 0) {
      errors.push(`Invalid telemetryData.weightKg: ${evt.telemetryData.weightKg}`);
    }
  }
  if (!evt.eventHashSha256 || !/^[a-f0-9]{64}$/.test(evt.eventHashSha256)) {
    errors.push('eventHashSha256 must be a 64-char lowercase hex string');
  }

  return { valid: errors.length === 0, errors };
}

export function validateWeightTicket(obj: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['Payload must be a non-null object'] };
  }

  const ticket = obj as Partial<WeightTicketPayload>;

  if (!ticket.evidenceId || !isValidWeightTicketGci(ticket.evidenceId)) {
    errors.push(`Invalid or missing evidenceId: ${ticket.evidenceId}`);
  }
  if (ticket.evidenceType !== 'WEIGHT_TICKET') {
    errors.push(`evidenceType must be 'WEIGHT_TICKET', got: ${ticket.evidenceType}`);
  }
  if (!ticket.fileHashSha256 || !/^[a-f0-9]{64}$/.test(ticket.fileHashSha256)) {
    errors.push('fileHashSha256 must be a 64-char lowercase hex string');
  }
  if (!ticket.metadataJson || typeof ticket.metadataJson !== 'object') {
    errors.push('Missing metadataJson');
  } else {
    const meta = ticket.metadataJson;
    if (!meta.ticketNumber) errors.push('Missing metadataJson.ticketNumber');
    if (!meta.vehiclePlate) errors.push('Missing metadataJson.vehiclePlate');
    if (!meta.scaleStationGci || !isValidWeighStationGci(meta.scaleStationGci)) {
      errors.push(`Invalid scaleStationGci: ${meta.scaleStationGci}`);
    }
    if (typeof meta.grossWeightKg !== 'number' || meta.grossWeightKg <= 0) {
      errors.push('grossWeightKg must be > 0');
    }
    if (typeof meta.tareWeightKg !== 'number' || meta.tareWeightKg < 0) {
      errors.push('tareWeightKg must be >= 0');
    }
    if (typeof meta.netWeightKg !== 'number' || meta.netWeightKg <= 0) {
      errors.push('netWeightKg must be > 0');
    }
    if (meta.grossWeightKg <= meta.tareWeightKg) {
      errors.push('grossWeightKg must be greater than tareWeightKg');
    }
    if (meta.isStable !== true) {
      errors.push('isStable must be true');
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateHarvestLot(obj: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['Payload must be a non-null object'] };
  }

  const lot = obj as Partial<HarvestLotPayload>;

  if (!lot.lotId || !isValidHarvestLotGci(lot.lotId)) {
    errors.push(`Invalid lotId: ${lot.lotId}`);
  }
  if (!lot.msvt || lot.msvt.trim().length === 0) {
    errors.push('msvt must not be empty');
  }
  if (!lot.plotGci || !isValidPlotGci(lot.plotGci)) {
    errors.push(`Invalid plotGci: ${lot.plotGci}`);
  }
  if (typeof lot.estimatedYieldKg !== 'number' || lot.estimatedYieldKg <= 0) {
    errors.push('estimatedYieldKg must be > 0');
  }
  if (!['REQUESTED', 'CUTTING', 'WEIGHED', 'RECEIVED_AT_MILL'].includes(lot.status || '')) {
    errors.push(`Invalid status: ${lot.status}`);
  }

  return { valid: errors.length === 0, errors };
}

export function validateDeliveryOrderWebhook(obj: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['Payload must be a non-null object'] };
  }

  const doPayload = obj as Partial<ErpDeliveryOrderWebhook>;

  if (!doPayload.orderId) errors.push('Missing orderId');
  if (!doPayload.warehouseGci || !validateGciSyntax(doPayload.warehouseGci).valid) {
    errors.push(`Invalid warehouseGci: ${doPayload.warehouseGci}`);
  }
  if (!Array.isArray(doPayload.lineItems) || doPayload.lineItems.length === 0) {
    errors.push('lineItems must be a non-empty array');
  } else {
    for (let i = 0; i < doPayload.lineItems.length; i++) {
      const item = doPayload.lineItems[i];
      if (!item.lotNumber) errors.push(`lineItems[${i}].lotNumber is required`);
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`lineItems[${i}].quantity must be > 0`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateTraceabilityLabel(obj: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['Payload must be a non-null object'] };
  }

  const label = obj as Partial<TraceabilityLabelResponse>;

  if (!label.traceabilityId) errors.push('Missing traceabilityId');
  if (!label.qrPayload || !label.qrPayload.startsWith('https://')) {
    errors.push('qrPayload must be a valid HTTPS URL');
  }
  if (!label.qrImageBase64) errors.push('Missing qrImageBase64');
  if (!label.zplCode || !label.zplCode.startsWith('^XA') || !label.zplCode.includes('^XZ')) {
    errors.push('zplCode must be valid Zebra ZPL string starting with ^XA and ending with ^XZ');
  }
  if (typeof label.generationLatencyMs !== 'number') {
    errors.push('generationLatencyMs must be a number');
  }

  return { valid: errors.length === 0, errors };
}
