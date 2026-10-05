/**
 * GoTRACE Cryptographic Module — RFC 8785 JSON Canonicalization Scheme (JCS) & SHA-256 Hashing
 */

import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { WeightTicketMetadata, WeightTicketPayload } from '../types/index.ts';

/**
 * Canonicalizes any JavaScript value into RFC 8785 Canonical JSON string.
 * - Object keys are sorted lexicographically by UTF-16 code units.
 * - No whitespace around separators.
 * - Undefined/function/symbol properties are omitted.
 */
export function canonicalizeJson(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    const items = value.map((item) => canonicalizeJson(item));
    return `[${items.join(',')}]`;
  }

  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  const pairs: string[] = [];

  for (const key of keys) {
    const val = obj[key];
    if (val !== undefined && typeof val !== 'function' && typeof val !== 'symbol') {
      pairs.push(`${JSON.stringify(key)}:${canonicalizeJson(val)}`);
    }
  }

  return `{${pairs.join(',')}}`;
}

/**
 * Computes a SHA-256 hex hash from string, Buffer, or object (via JCS).
 */
export function sha256Hex(data: string | Buffer | object): string {
  const hash = createHash('sha256');
  if (typeof data === 'string') {
    hash.update(data, 'utf8');
  } else if (Buffer.isBuffer(data)) {
    hash.update(data);
  } else {
    hash.update(canonicalizeJson(data), 'utf8');
  }
  return hash.digest('hex');
}

/**
 * Computes the immutable SHA-256 hash for a WeightTicketMetadata object according to RFC 8785.
 */
export function computeTicketHash(metadataJson: WeightTicketMetadata): string {
  const canonical = canonicalizeJson(metadataJson);
  return sha256Hex(canonical);
}

/**
 * Verifies that a WeightTicketPayload's fileHashSha256 strictly matches its canonical metadata.
 */
export function verifyTicketHash(ticket: WeightTicketPayload): {
  valid: boolean;
  calculatedHash: string;
  expectedHash: string;
} {
  const calculatedHash = computeTicketHash(ticket.metadataJson);
  const expectedHash = ticket.fileHashSha256;
  return {
    valid: calculatedHash === expectedHash,
    calculatedHash,
    expectedHash,
  };
}

/**
 * Generates an attestation digital signature for a ticket hash using an edge key.
 */
export function signTicketHash(ticketHash: string, secretKey: string): string {
  const hmac = createHmac('sha256', secretKey);
  hmac.update(ticketHash, 'utf8');
  return hmac.digest('hex');
}

/**
 * Verifies an attestation digital signature for a ticket hash.
 */
export function verifyTicketSignature(
  ticketHash: string,
  signature: string,
  secretKey: string
): boolean {
  if (!signature || !secretKey) return false;
  const expectedHex = signTicketHash(ticketHash, secretKey);
  if (signature.length !== expectedHex.length) return false;
  return timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedHex, 'hex'));
}

/**
 * Unified JcsHasher class adhering to RFC 8785 canonicalization and SHA-256 hashing.
 */
export class JcsHasher {
  public static canonicalize(value: unknown): string {
    return canonicalizeJson(value);
  }

  public static hash(data: string | Buffer | object): string {
    return sha256Hex(data);
  }

  public static computeTicketHash(metadataJson: WeightTicketMetadata): string {
    return computeTicketHash(metadataJson);
  }

  public static verifyTicketHash(ticket: WeightTicketPayload) {
    return verifyTicketHash(ticket);
  }

  public static sign(ticketHash: string, secretKey: string): string {
    return signTicketHash(ticketHash, secretKey);
  }

  public static verifySignature(ticketHash: string, signature: string, secretKey: string): boolean {
    return verifyTicketSignature(ticketHash, signature, secretKey);
  }
}

