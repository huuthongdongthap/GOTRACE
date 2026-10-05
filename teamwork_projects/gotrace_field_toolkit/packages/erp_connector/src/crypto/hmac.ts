/**
 * GoTRACE ERP Connector - HMAC-SHA256 Authentication & Integrity Engine
 * 
 * Implements constant-time signature verification and replay protection
 * for inbound webhooks from Bravo 8, MISA AMIS, SAP S/4HANA.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

export interface HmacVerificationOptions {
  /** Maximum allowable clock skew in seconds (default: 300s = 5 mins) */
  maxClockSkewSeconds?: number;
  /** Custom timestamp string or epoch ms to check against current time */
  timestamp?: string | number;
}

export interface HmacVerificationResult {
  valid: boolean;
  code: 'OK' | 'MISSING_SIGNATURE' | 'INVALID_SIGNATURE' | 'TIMESTAMP_EXPIRED' | 'MALFORMED_HEADER';
  message: string;
}

/**
 * Generate HMAC-SHA256 hexadecimal digest for a string or buffer.
 */
export function generateHmacSha256(payload: string | Buffer, secretKey: string): string {
  const hmac = createHmac('sha256', secretKey);
  hmac.update(payload);
  return hmac.digest('hex');
}

/**
 * Verify inbound webhook HMAC-SHA256 signature using constant-time comparison.
 * 
 * Supports:
 * - `sha256=<hex>` (GitHub / Standard webhook format)
 * - `<hex>` (Plain hex string)
 */
export function verifyHmacSha256(
  rawBody: string | Buffer,
  signatureHeader: string | undefined | null,
  secretKey: string,
  options: HmacVerificationOptions = {}
): HmacVerificationResult {
  if (!signatureHeader || signatureHeader.trim() === '') {
    return {
      valid: false,
      code: 'MISSING_SIGNATURE',
      message: 'Missing signature header (e.g. X-GoTRACE-Signature or X-Signature-SHA256)'
    };
  }

  // Check clock skew if timestamp is provided
  if (options.timestamp !== undefined && options.timestamp !== null) {
    const maxSkew = (options.maxClockSkewSeconds ?? 300) * 1000;
    const now = Date.now();
    let requestTime: number;

    if (typeof options.timestamp === 'number') {
      requestTime = options.timestamp < 1e11 ? options.timestamp * 1000 : options.timestamp;
    } else {
      requestTime = new Date(options.timestamp).getTime();
    }

    if (isNaN(requestTime)) {
      return {
        valid: false,
        code: 'TIMESTAMP_EXPIRED',
        message: 'Invalid timestamp format in webhook header/payload'
      };
    }

    if (Math.abs(now - requestTime) > maxSkew) {
      return {
        valid: false,
        code: 'TIMESTAMP_EXPIRED',
        message: `Request timestamp exceeds maximum allowed clock skew of ${options.maxClockSkewSeconds ?? 300} seconds (Replay attack prevention)`
      };
    }
  }

  // Parse header
  let expectedHex = signatureHeader.trim();
  if (expectedHex.startsWith('sha256=')) {
    expectedHex = expectedHex.slice(7);
  } else if (expectedHex.startsWith('HMAC-SHA256 ')) {
    expectedHex = expectedHex.slice(12);
  }

  if (!/^[a-fA-F0-9]{64}$/.test(expectedHex)) {
    return {
      valid: false,
      code: 'MALFORMED_HEADER',
      message: 'Signature does not match expected 64-hex SHA-256 pattern'
    };
  }

  // Compute calculated signature
  const calculatedHex = generateHmacSha256(rawBody, secretKey);

  // Constant-time comparison
  const expectedBuf = Buffer.from(expectedHex.toLowerCase(), 'utf-8');
  const calculatedBuf = Buffer.from(calculatedHex.toLowerCase(), 'utf-8');

  if (expectedBuf.length !== calculatedBuf.length) {
    return {
      valid: false,
      code: 'INVALID_SIGNATURE',
      message: 'HMAC signature length mismatch'
    };
  }

  const isValid = timingSafeEqual(expectedBuf, calculatedBuf);

  if (!isValid) {
    return {
      valid: false,
      code: 'INVALID_SIGNATURE',
      message: 'HMAC-SHA256 signature mismatch'
    };
  }

  return {
    valid: true,
    code: 'OK',
    message: 'HMAC-SHA256 signature verified successfully'
  };
}
