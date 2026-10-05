/**
 * GoTRACE GCI (Global Chain Identifier) Generator & Validator
 * Authoritative syntax: VN.<PROVINCE>.<PRIMITIVE>.<SUBTYPE>.<ID>
 */

import {
  VALID_PROVINCES,
  CORE_PRIMITIVES,
} from '../types/index.ts';
import type {
  GciComponents,
  CorePrimitive,
  ProvinceCode,
} from '../types/index.ts';

export const GCI_GENERAL_REGEX =
  /^VN\.(DT|AG|CT|TG|BT|LA|BL|CM|KG|ST|TV|HG|VL|SG|DN|BD|LD|TN)\.(PARTY|PLACE|ITEM|LOT|EVENT|EVIDENCE|CLAIM|VERIFY|TRANSACTION)\.[A-Z0-9_-]+\.[A-Z0-9._-]+$/;

export const GCI_WEIGH_STATION_REGEX =
  /^VN\.[A-Z]{2,3}\.PLACE\.WEIGH_STATION\.[A-Z0-9_-]+$/;

export const GCI_WEIGHT_TICKET_REGEX =
  /^VN\.[A-Z]{2,3}\.EVIDENCE\.WEIGHT_TICKET\.[A-Z0-9._-]+$/;

export const GCI_WEIGHED_EVENT_REGEX =
  /^VN\.[A-Z]{2,3}\.EVENT\.WEIGHED\.[A-Z0-9._-]+$/;

export function validateGci(gci: string): {
  valid: boolean;
  error?: string;
  components?: GciComponents;
} {
  if (typeof gci !== 'string' || gci.trim().length === 0) {
    return { valid: false, error: 'INVALID_GCI_SYNTAX: Empty GCI string' };
  }

  if (/\s/.test(gci)) {
    return { valid: false, error: 'INVALID_GCI_SYNTAX: GCI must not contain whitespace' };
  }

  const match = gci.match(GCI_GENERAL_REGEX);
  if (!match) {
    const parts = gci.split('.');
    if (parts.length >= 2 && parts[0] === 'VN') {
      const province = parts[1];
      if (!VALID_PROVINCES.includes(province as ProvinceCode)) {
        return {
          valid: false,
          error: `INVALID_PROVINCE_CODE: Unknown province '${province}'`,
        };
      }
    }
    return {
      valid: false,
      error: 'INVALID_GCI_SYNTAX: Does not match general GCI regex format',
    };
  }

  const parts = gci.split('.');
  const country = parts[0] as 'VN';
  const province = parts[1];
  const primitive = parts[2] as CorePrimitive;
  const subtype = parts[3];
  const id = parts.slice(4).join('.');

  return {
    valid: true,
    components: { country, province, primitive, subtype, id },
  };
}

export function parseGci(gci: string): GciComponents {
  const result = validateGci(gci);
  if (!result.valid || !result.components) {
    throw new Error(result.error || 'INVALID_GCI_SYNTAX: Failed to parse GCI');
  }
  return result.components;
}

export function buildGci(comp: {
  province: string;
  primitive: CorePrimitive;
  subtype: string;
  id: string;
}): string {
  const province = comp.province.toUpperCase();
  if (!VALID_PROVINCES.includes(province as ProvinceCode)) {
    throw new Error(`INVALID_PROVINCE_CODE: Invalid province ${province}`);
  }
  if (!CORE_PRIMITIVES.includes(comp.primitive)) {
    throw new Error(`INVALID_GCI_SYNTAX: Invalid primitive ${comp.primitive}`);
  }
  const cleanSubtype = comp.subtype.trim().toUpperCase();
  const cleanId = comp.id.trim();
  const gci = `VN.${province}.${comp.primitive}.${cleanSubtype}.${cleanId}`;
  const validation = validateGci(gci);
  if (!validation.valid) {
    throw new Error(validation.error || 'INVALID_GCI_SYNTAX: Resulting GCI is invalid');
  }
  return gci;
}

export function buildWeighStationGci(province: string, stationId: string): string {
  const cleanId = stationId.replace(/[^A-Z0-9_-]/gi, '-').toUpperCase();
  return buildGci({
    province,
    primitive: 'PLACE',
    subtype: 'WEIGH_STATION',
    id: cleanId,
  });
}

export function isValidWeighStationGci(gci: string): boolean {
  return GCI_WEIGH_STATION_REGEX.test(gci) && validateGci(gci).valid;
}

export function buildWeightTicketGci(province: string, ticketId: string): string {
  const cleanId = ticketId.replace(/[^A-Z0-9._-]/gi, '-').toUpperCase();
  return buildGci({
    province,
    primitive: 'EVIDENCE',
    subtype: 'WEIGHT_TICKET',
    id: cleanId,
  });
}

export function isValidWeightTicketGci(gci: string): boolean {
  return GCI_WEIGHT_TICKET_REGEX.test(gci) && validateGci(gci).valid;
}

export function buildWeighedEventGci(province: string, eventId: string): string {
  const cleanId = eventId.replace(/[^A-Z0-9._-]/gi, '-').toUpperCase();
  return buildGci({
    province,
    primitive: 'EVENT',
    subtype: 'WEIGHED',
    id: cleanId,
  });
}

export function isValidWeighedEventGci(gci: string): boolean {
  return GCI_WEIGHED_EVENT_REGEX.test(gci) && validateGci(gci).valid;
}

export function toUrn(gci: string): string {
  const comp = parseGci(gci);
  return `GT:VN:${comp.primitive}:${comp.subtype}:${comp.id}`;
}
