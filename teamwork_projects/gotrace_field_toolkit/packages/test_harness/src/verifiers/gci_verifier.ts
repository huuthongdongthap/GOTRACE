/**
 * GoTRACE GCI (Global Chain Identifier) Verifier
 * Strict syntax validation, decomposition, and URN mapping.
 */

import {
  GCI_GENERAL_REGEX,
  GCI_WEIGH_STATION_REGEX,
  GCI_HARVEST_LOT_REGEX,
  GCI_FINISHED_LOT_REGEX,
  GCI_WEIGHT_TICKET_REGEX,
  GCI_WEIGHED_EVENT_REGEX,
  GCI_GROWING_AREA_REGEX,
  GCI_PLOT_REGEX,
  GCI_CUSTODY_TRANSFER_REGEX,
  VALID_PROVINCES,
  CORE_PRIMITIVES,
  ERROR_CODES,
  type GciComponents,
  type CorePrimitive,
} from '../models/contracts.ts';

export function validateGciSyntax(gci: string): {
  valid: boolean;
  error?: string;
  components?: GciComponents;
} {
  if (typeof gci !== 'string' || gci.trim().length === 0) {
    return { valid: false, error: `${ERROR_CODES.INVALID_GCI_SYNTAX}: Empty GCI string` };
  }

  if (/\s/.test(gci)) {
    return {
      valid: false,
      error: `${ERROR_CODES.INVALID_GCI_SYNTAX}: GCI must not contain whitespace`,
    };
  }

  const match = gci.match(GCI_GENERAL_REGEX);
  if (!match) {
    // Check if province code is invalid
    const parts = gci.split('.');
    if (parts.length >= 2 && parts[0] === 'VN') {
      const province = parts[1];
      if (!VALID_PROVINCES.includes(province as any)) {
        return {
          valid: false,
          error: `${ERROR_CODES.INVALID_PROVINCE_CODE}: Unknown province '${province}'`,
        };
      }
    }
    return {
      valid: false,
      error: `${ERROR_CODES.INVALID_GCI_SYNTAX}: Does not match general regex`,
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
  const result = validateGciSyntax(gci);
  if (!result.valid || !result.components) {
    throw new Error(result.error || `${ERROR_CODES.INVALID_GCI_SYNTAX}: Unable to parse GCI`);
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
  if (!VALID_PROVINCES.includes(province as any)) {
    throw new Error(`${ERROR_CODES.INVALID_PROVINCE_CODE}: Invalid province ${province}`);
  }
  if (!CORE_PRIMITIVES.includes(comp.primitive)) {
    throw new Error(`${ERROR_CODES.INVALID_GCI_SYNTAX}: Invalid primitive ${comp.primitive}`);
  }
  const gci = `VN.${province}.${comp.primitive}.${comp.subtype}.${comp.id}`;
  const validation = validateGciSyntax(gci);
  if (!validation.valid) {
    throw new Error(validation.error || 'Failed to construct valid GCI');
  }
  return gci;
}

export function toUrn(gci: string): string {
  const comp = parseGci(gci);
  return `GT:VN:${comp.primitive}:${comp.subtype}:${comp.id}`;
}

export function isValidWeighStationGci(gci: string): boolean {
  return GCI_WEIGH_STATION_REGEX.test(gci) && validateGciSyntax(gci).valid;
}

export function isValidHarvestLotGci(gci: string): boolean {
  return GCI_HARVEST_LOT_REGEX.test(gci) && validateGciSyntax(gci).valid;
}

export function isValidFinishedLotGci(gci: string): boolean {
  return GCI_FINISHED_LOT_REGEX.test(gci) && validateGciSyntax(gci).valid;
}

export function isValidWeightTicketGci(gci: string): boolean {
  return GCI_WEIGHT_TICKET_REGEX.test(gci) && validateGciSyntax(gci).valid;
}

export function isValidWeighedEventGci(gci: string): boolean {
  return GCI_WEIGHED_EVENT_REGEX.test(gci) && validateGciSyntax(gci).valid;
}

export function isValidGrowingAreaGci(gci: string): boolean {
  return GCI_GROWING_AREA_REGEX.test(gci) && validateGciSyntax(gci).valid;
}

export function isValidPlotGci(gci: string): boolean {
  return GCI_PLOT_REGEX.test(gci) && validateGciSyntax(gci).valid;
}

export function isValidCustodyTransferGci(gci: string): boolean {
  return GCI_CUSTODY_TRANSFER_REGEX.test(gci) && validateGciSyntax(gci).valid;
}
