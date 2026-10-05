/**
 * GoTRACE GCI (Global Chain Identifier) Validator & Parser
 * 
 * Syntax: VN.<PROVINCE>.<PRIMITIVE_TYPE>.<SUBTYPE>.<ID>
 */

import { GCI_REGEX, MEKONG_PROVINCE_CODES, CorePrimitiveType } from '../types/models.js';

export interface ParsedGci {
  raw: string;
  country: string; // "VN"
  province: string; // e.g. "DT", "AG", "CT"
  primitive: CorePrimitiveType;
  subtype: string; // e.g. "FINISHED", "HARVEST", "WEIGH_STATION"
  subId: string; // e.g. "20260928-ST25-5K-01"
}

export class GciValidator {
  /**
   * Check if a string is a valid GoTRACE GCI.
   */
  public static isValid(gci: string): boolean {
    if (!gci || typeof gci !== 'string') return false;
    return GCI_REGEX.test(gci.trim());
  }

  /**
   * Parse GCI into structured components.
   * Throws Error if invalid.
   */
  public static parse(gci: string): ParsedGci {
    const trimmed = (gci || '').trim();
    if (!this.isValid(trimmed)) {
      throw new Error(`Invalid GCI syntax: "${gci}". Expected format VN.<PROVINCE>.<TYPE>.<SUBTYPE>.<ID>`);
    }

    const parts = trimmed.split('.');
    return {
      raw: trimmed,
      country: parts[0],
      province: parts[1],
      primitive: parts[2] as CorePrimitiveType,
      subtype: parts[3],
      subId: parts.slice(4).join('.')
    };
  }

  /**
   * Build a standard GCI from parts.
   */
  public static build(
    province: string,
    primitive: CorePrimitiveType,
    subtype: string,
    id: string
  ): string {
    const prov = province.toUpperCase().trim();
    const sub = subtype.toUpperCase().trim().replace(/[^A-Z0-9_-]/g, '_');
    const cleanId = id.trim().replace(/[^A-Za-z0-9._-]/g, '-');

    const result = `VN.${prov}.${primitive}.${sub}.${cleanId}`;
    if (!this.isValid(result)) {
      throw new Error(`Failed to build valid GCI: "${result}"`);
    }
    return result;
  }

  /**
   * Safely canonicalize a raw ERP lot code or GCI into a guaranteed valid LOT GCI.
   * If already a valid GCI, returns it.
   * Otherwise, prefixes with default province (default: 'DT') and subtype 'FINISHED'.
   */
  public static canonicalizeLotGci(
    rawLot: string,
    fallbackProvince = 'DT',
    fallbackSubtype = 'FINISHED'
  ): string {
    const trimmed = (rawLot || '').trim();
    if (this.isValid(trimmed) && trimmed.includes('.LOT.')) {
      return trimmed;
    }

    // Clean characters
    const cleanSubId = trimmed.replace(/[^A-Za-z0-9._-]/g, '-');
    const prov = MEKONG_PROVINCE_CODES.includes(fallbackProvince.toUpperCase()) 
      ? fallbackProvince.toUpperCase() 
      : 'DT';

    return `VN.${prov}.LOT.${fallbackSubtype}.${cleanSubId}`;
  }

  /**
   * Canonicalize an ERP party identifier or tax code into a PARTY GCI.
   */
  public static canonicalizePartyGci(
    rawParty: string | undefined,
    partyType: 'ENTERPRISE' | 'BUYER' | 'COOP' | 'LOGISTICS',
    fallbackProvince = 'DT'
  ): string {
    if (!rawParty || rawParty.trim() === '') {
      return `VN.${fallbackProvince}.PARTY.${partyType}.UNKNOWN`;
    }

    const trimmed = rawParty.trim();
    if (this.isValid(trimmed) && trimmed.includes('.PARTY.')) {
      return trimmed;
    }

    const cleanId = trimmed.replace(/[^A-Za-z0-9._-]/g, '-');
    return `VN.${fallbackProvince}.PARTY.${partyType}.${cleanId}`;
  }
}
