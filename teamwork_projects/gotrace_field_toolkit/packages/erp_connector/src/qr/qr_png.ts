/**
 * GoTRACE Dynamic QR Code Generator - Ultra-Fast Pure TypeScript PNG Encoder
 * 
 * Uses standard Node.js zlib for deflate compression, generating standard
 * valid PNG images with sub-millisecond latency.
 */

import { deflateSync } from 'node:zlib';
import { QrMatrix } from './qr_matrix.js';

// ============================================================================
// IEEE 802.3 CRC-32 IMPLEMENTATION
// ============================================================================

const CRC_TABLE = new Uint32Array(256);
(() => {
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    CRC_TABLE[i] = c;
  }
})();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type: string, data: Buffer): Buffer {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crcTarget = chunk.subarray(4, 8 + len);
  const crcVal = crc32(crcTarget);
  chunk.writeUInt32BE(crcVal, 8 + len);
  return chunk;
}

export interface PngOptions {
  margin?: number; // Quiet zone modules (default: 4)
  scale?: number; // Pixels per module (default: 6)
}

/**
 * Encode QR Matrix into valid PNG Buffer.
 */
export function renderQrPngBuffer(matrix: QrMatrix, options: PngOptions = {}): Buffer {
  const margin = options.margin ?? 4;
  const scale = options.scale ?? 6;
  const gridDim = matrix.size + margin * 2;
  const pixelDim = gridDim * scale;

  // Scanlines in 8-bit Grayscale (0 = black, 255 = white)
  // Each scanline: [filterByte (0x00)] + [pixelDim bytes]
  const rowBytes = 1 + pixelDim;
  const rawScanlines = Buffer.alloc(rowBytes * pixelDim);

  for (let y = 0; y < pixelDim; y++) {
    const rowOffset = y * rowBytes;
    rawScanlines[rowOffset] = 0; // Filter None

    const gridY = Math.floor(y / scale) - margin;
    const isInsideY = gridY >= 0 && gridY < matrix.size;

    for (let x = 0; x < pixelDim; x++) {
      let isDark = false;
      if (isInsideY) {
        const gridX = Math.floor(x / scale) - margin;
        if (gridX >= 0 && gridX < matrix.size) {
          isDark = matrix.modules[gridY][gridX];
        }
      }
      // 0x00 for dark/black, 0xFF for light/white
      rawScanlines[rowOffset + 1 + x] = isDark ? 0x00 : 0xff;
    }
  }

  // Compress scanlines with deflate
  const compressedData = deflateSync(rawScanlines, { level: 6 });

  // PNG Signature
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR Chunk: 13 bytes
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(pixelDim, 0); // Width
  ihdr.writeUInt32BE(pixelDim, 4); // Height
  ihdr.writeUInt8(8, 8); // Bit depth: 8
  ihdr.writeUInt8(0, 9); // Color type: 0 (Grayscale)
  ihdr.writeUInt8(0, 10); // Compression method: 0
  ihdr.writeUInt8(0, 11); // Filter method: 0
  ihdr.writeUInt8(0, 12); // Interlace method: 0

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
}

/**
 * Render QR Matrix as Base64 Data URL (data:image/png;base64,...).
 */
export function renderQrPngDataUrl(matrix: QrMatrix, options: PngOptions = {}): string {
  const buf = renderQrPngBuffer(matrix, options);
  return `data:image/png;base64,${buf.toString('base64')}`;
}
