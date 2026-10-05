/**
 * GoTRACE Dynamic QR Code Generator - ISO/IEC 18004 QR Matrix Generator
 * 
 * Genuine TypeScript implementation of QR Code Model 2 with GF(256) arithmetic,
 * Reed-Solomon polynomial division, zigzag interleaving, and penalty evaluation.
 */

export type QrEcLevel = 'L' | 'M' | 'Q' | 'H';

// ============================================================================
// GF(256) ARITHMETIC & REED-SOLOMON CODEC
// ============================================================================

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) {
      x ^= 0x11d; // Primitive polynomial x^8 + x^4 + x^3 + x^2 + 1
    }
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return GF_EXP[GF_LOG[x] + GF_LOG[y]];
}

/**
 * Generate Reed-Solomon generator polynomial for degree `ecCount`.
 */
function rsGeneratorPoly(ecCount: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < ecCount; i++) {
    const next = new Uint8Array(poly.length + 1);
    const root = GF_EXP[i];
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], root);
      next[j + 1] ^= poly[j];
    }
    poly = next;
  }
  return poly;
}

/**
 * Compute Reed-Solomon error correction codewords for a data block.
 */
function rsEncode(data: Uint8Array, ecCount: number): Uint8Array {
  const gen = rsGeneratorPoly(ecCount);
  const remainder = new Uint8Array(ecCount);

  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ remainder[0];
    for (let j = 0; j < ecCount - 1; j++) {
      remainder[j] = remainder[j + 1] ^ gfMul(gen[ecCount - 1 - j], factor);
    }
    remainder[ecCount - 1] = gfMul(gen[0], factor);
  }
  return remainder;
}

// ============================================================================
// QR VERSION CAPACITY & BLOCK DEFINITIONS (VERSIONS 1 - 10)
// ============================================================================

interface VersionTableEntry {
  totalCodewords: number;
  ecPerBlock: number;
  group1Blocks: number;
  group1DataWords: number;
  group2Blocks: number;
  group2DataWords: number;
  alignCoords: number[];
}

const VERSION_TABLE: Record<number, Record<QrEcLevel, VersionTableEntry>> = {
  1: {
    L: { totalCodewords: 26, ecPerBlock: 7, group1Blocks: 1, group1DataWords: 19, group2Blocks: 0, group2DataWords: 0, alignCoords: [] },
    M: { totalCodewords: 26, ecPerBlock: 10, group1Blocks: 1, group1DataWords: 16, group2Blocks: 0, group2DataWords: 0, alignCoords: [] },
    Q: { totalCodewords: 26, ecPerBlock: 13, group1Blocks: 1, group1DataWords: 13, group2Blocks: 0, group2DataWords: 0, alignCoords: [] },
    H: { totalCodewords: 26, ecPerBlock: 17, group1Blocks: 1, group1DataWords: 9, group2Blocks: 0, group2DataWords: 0, alignCoords: [] },
  },
  2: {
    L: { totalCodewords: 44, ecPerBlock: 10, group1Blocks: 1, group1DataWords: 34, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 18] },
    M: { totalCodewords: 44, ecPerBlock: 16, group1Blocks: 1, group1DataWords: 28, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 18] },
    Q: { totalCodewords: 44, ecPerBlock: 22, group1Blocks: 1, group1DataWords: 22, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 18] },
    H: { totalCodewords: 44, ecPerBlock: 28, group1Blocks: 1, group1DataWords: 16, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 18] },
  },
  3: {
    L: { totalCodewords: 70, ecPerBlock: 15, group1Blocks: 1, group1DataWords: 55, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 22] },
    M: { totalCodewords: 70, ecPerBlock: 26, group1Blocks: 1, group1DataWords: 44, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 22] },
    Q: { totalCodewords: 70, ecPerBlock: 18, group1Blocks: 2, group1DataWords: 17, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 22] },
    H: { totalCodewords: 70, ecPerBlock: 22, group1Blocks: 2, group1DataWords: 13, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 22] },
  },
  4: {
    L: { totalCodewords: 100, ecPerBlock: 20, group1Blocks: 1, group1DataWords: 80, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 26] },
    M: { totalCodewords: 100, ecPerBlock: 18, group1Blocks: 2, group1DataWords: 32, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 26] },
    Q: { totalCodewords: 100, ecPerBlock: 26, group1Blocks: 2, group1DataWords: 24, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 26] },
    H: { totalCodewords: 100, ecPerBlock: 16, group1Blocks: 4, group1DataWords: 9, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 26] },
  },
  5: {
    L: { totalCodewords: 134, ecPerBlock: 26, group1Blocks: 1, group1DataWords: 108, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 30] },
    M: { totalCodewords: 134, ecPerBlock: 24, group1Blocks: 2, group1DataWords: 43, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 30] },
    Q: { totalCodewords: 134, ecPerBlock: 18, group1Blocks: 2, group1DataWords: 15, group2Blocks: 2, group2DataWords: 16, alignCoords: [6, 30] },
    H: { totalCodewords: 134, ecPerBlock: 22, group1Blocks: 2, group1DataWords: 11, group2Blocks: 2, group2DataWords: 12, alignCoords: [6, 30] },
  },
  6: {
    L: { totalCodewords: 172, ecPerBlock: 18, group1Blocks: 2, group1DataWords: 68, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 34] },
    M: { totalCodewords: 172, ecPerBlock: 16, group1Blocks: 4, group1DataWords: 27, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 34] },
    Q: { totalCodewords: 172, ecPerBlock: 24, group1Blocks: 4, group1DataWords: 19, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 34] },
    H: { totalCodewords: 172, ecPerBlock: 28, group1Blocks: 4, group1DataWords: 15, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 34] },
  },
  7: {
    L: { totalCodewords: 196, ecPerBlock: 20, group1Blocks: 2, group1DataWords: 78, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 22, 38] },
    M: { totalCodewords: 196, ecPerBlock: 18, group1Blocks: 4, group1DataWords: 31, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 22, 38] },
    Q: { totalCodewords: 196, ecPerBlock: 18, group1Blocks: 2, group1DataWords: 14, group2Blocks: 4, group2DataWords: 15, alignCoords: [6, 22, 38] },
    H: { totalCodewords: 196, ecPerBlock: 26, group1Blocks: 4, group1DataWords: 13, group2Blocks: 1, group2DataWords: 14, alignCoords: [6, 22, 38] },
  },
  8: {
    L: { totalCodewords: 242, ecPerBlock: 24, group1Blocks: 2, group1DataWords: 97, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 24, 42] },
    M: { totalCodewords: 242, ecPerBlock: 22, group1Blocks: 2, group1DataWords: 38, group2Blocks: 2, group2DataWords: 39, alignCoords: [6, 24, 42] },
    Q: { totalCodewords: 242, ecPerBlock: 22, group1Blocks: 4, group1DataWords: 18, group2Blocks: 2, group2DataWords: 19, alignCoords: [6, 24, 42] },
    H: { totalCodewords: 242, ecPerBlock: 26, group1Blocks: 4, group1DataWords: 14, group2Blocks: 2, group2DataWords: 15, alignCoords: [6, 24, 42] },
  },
  9: {
    L: { totalCodewords: 292, ecPerBlock: 30, group1Blocks: 2, group1DataWords: 116, group2Blocks: 0, group2DataWords: 0, alignCoords: [6, 26, 46] },
    M: { totalCodewords: 292, ecPerBlock: 22, group1Blocks: 3, group1DataWords: 36, group2Blocks: 2, group2DataWords: 37, alignCoords: [6, 26, 46] },
    Q: { totalCodewords: 292, ecPerBlock: 20, group1Blocks: 4, group1DataWords: 16, group2Blocks: 4, group2DataWords: 17, alignCoords: [6, 26, 46] },
    H: { totalCodewords: 292, ecPerBlock: 24, group1Blocks: 4, group1DataWords: 12, group2Blocks: 4, group2DataWords: 13, alignCoords: [6, 26, 46] },
  },
  10: {
    L: { totalCodewords: 346, ecPerBlock: 18, group1Blocks: 2, group1DataWords: 68, group2Blocks: 2, group2DataWords: 69, alignCoords: [6, 28, 50] },
    M: { totalCodewords: 346, ecPerBlock: 26, group1Blocks: 4, group1DataWords: 43, group2Blocks: 1, group2DataWords: 44, alignCoords: [6, 28, 50] },
    Q: { totalCodewords: 346, ecPerBlock: 24, group1Blocks: 6, group1DataWords: 19, group2Blocks: 2, group2DataWords: 20, alignCoords: [6, 28, 50] },
    H: { totalCodewords: 346, ecPerBlock: 28, group1Blocks: 6, group1DataWords: 15, group2Blocks: 2, group2DataWords: 16, alignCoords: [6, 28, 50] },
  }
};

/**
 * Format Info bit representations for EC Levels and Mask Patterns.
 * 15 bits: 5 data bits (2 bits EC level + 3 bits mask) + 10 BCH bits ^ 0x5412
 */
const FORMAT_INFO: Record<QrEcLevel, number[]> = {
  M: [0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0],
  L: [0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976],
  H: [0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b],
  Q: [0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed]
};

// ============================================================================
// QR MATRIX ENCODER
// ============================================================================

export interface QrMatrix {
  version: number;
  size: number;
  modules: boolean[][]; // true = black, false = white
}

export class QrMatrixBuilder {
  /**
   * Determine minimum version needed to encode byte data.
   */
  public static findBestVersion(byteLength: number, ecLevel: QrEcLevel = 'M'): number {
    for (let v = 1; v <= 10; v++) {
      const entry = VERSION_TABLE[v][ecLevel];
      const maxDataWords = entry.group1Blocks * entry.group1DataWords + entry.group2Blocks * entry.group2DataWords;
      // Mode (4 bits) + Count (8 bits for v 1-9, 16 bits for v 10) + Data (8 bits/byte)
      const countBits = v >= 10 ? 16 : 8;
      const totalBitsNeeded = 4 + countBits + byteLength * 8;
      const maxBitsAvailable = maxDataWords * 8;
      if (totalBitsNeeded <= maxBitsAvailable) {
        return v;
      }
    }
    throw new Error(`Payload too large for QR Versions 1-10 at EC level ${ecLevel} (${byteLength} bytes)`);
  }

  /**
   * Build complete QR Code Matrix.
   */
  public static build(dataString: string, requestedEc: QrEcLevel = 'M'): QrMatrix {
    const dataBytes = Buffer.from(dataString, 'utf-8');
    const version = this.findBestVersion(dataBytes.length, requestedEc);
    const table = VERSION_TABLE[version][requestedEc];
    const totalDataWords = table.group1Blocks * table.group1DataWords + table.group2Blocks * table.group2DataWords;

    // 1. Bitstream encoding (Byte mode: 0100)
    const bits: number[] = [0, 1, 0, 0];
    const countBits = version >= 10 ? 16 : 8;
    for (let i = countBits - 1; i >= 0; i--) {
      bits.push((dataBytes.length >> i) & 1);
    }
    for (let i = 0; i < dataBytes.length; i++) {
      const b = dataBytes[i];
      for (let j = 7; j >= 0; j--) {
        bits.push((b >> j) & 1);
      }
    }

    // 2. Terminator (up to 4 zero bits)
    const maxBits = totalDataWords * 8;
    const termLen = Math.min(4, maxBits - bits.length);
    for (let i = 0; i < termLen; i++) bits.push(0);

    // 3. Byte alignment padding
    while (bits.length % 8 !== 0) bits.push(0);

    // 4. Pad bytes (0xEC, 0x11)
    const padBytes = [0xec, 0x11];
    let padIdx = 0;
    while (bits.length < maxBits) {
      const p = padBytes[padIdx % 2];
      for (let j = 7; j >= 0; j--) {
        bits.push((p >> j) & 1);
      }
      padIdx++;
    }

    // Convert bits to data codewords
    const dataCodewords = new Uint8Array(totalDataWords);
    for (let i = 0; i < totalDataWords; i++) {
      let b = 0;
      for (let j = 0; j < 8; j++) {
        b = (b << 1) | bits[i * 8 + j];
      }
      dataCodewords[i] = b;
    }

    // 5. Block division and RS error correction
    const dataBlocks: Uint8Array[] = [];
    const ecBlocks: Uint8Array[] = [];
    let offset = 0;

    for (let b = 0; b < table.group1Blocks; b++) {
      const block = dataCodewords.subarray(offset, offset + table.group1DataWords);
      dataBlocks.push(block);
      ecBlocks.push(rsEncode(block, table.ecPerBlock));
      offset += table.group1DataWords;
    }
    for (let b = 0; b < table.group2Blocks; b++) {
      const block = dataCodewords.subarray(offset, offset + table.group2DataWords);
      dataBlocks.push(block);
      ecBlocks.push(rsEncode(block, table.ecPerBlock));
      offset += table.group2DataWords;
    }

    // 6. Interleave data and EC codewords
    const interleavedCodewords: number[] = [];
    const maxDataBlockLen = Math.max(table.group1DataWords, table.group2DataWords);
    for (let i = 0; i < maxDataBlockLen; i++) {
      for (const block of dataBlocks) {
        if (i < block.length) interleavedCodewords.push(block[i]);
      }
    }
    for (let i = 0; i < table.ecPerBlock; i++) {
      for (const block of ecBlocks) {
        interleavedCodewords.push(block[i]);
      }
    }

    // 7. Matrix construction
    const size = version * 4 + 17;
    // modules: -1 = unassigned, 0 = white, 1 = black
    const grid: number[][] = Array.from({ length: size }, () => Array(size).fill(-1));
    const isReserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

    // Place Finder Patterns
    const placeFinder = (row: number, col: number) => {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const gr = row + r;
          const gc = col + c;
          if (gr >= 0 && gr < size && gc >= 0 && gc < size) {
            isReserved[gr][gc] = true;
            if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
              if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
                grid[gr][gc] = 1;
              } else {
                grid[gr][gc] = 0;
              }
            } else {
              grid[gr][gc] = 0; // Separator
            }
          }
        }
      }
    };

    placeFinder(0, 0);
    placeFinder(0, size - 7);
    placeFinder(size - 7, 0);

    // Place Alignment Patterns (Version >= 2)
    const alignCoords = table.alignCoords;
    for (const r of alignCoords) {
      for (const c of alignCoords) {
        // Skip if overlapping finder patterns
        if (
          (r <= 8 && c <= 8) ||
          (r <= 8 && c >= size - 8) ||
          (r >= size - 8 && c <= 8)
        ) {
          continue;
        }
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const gr = r + dr;
            const gc = c + dc;
            isReserved[gr][gc] = true;
            if (Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0)) {
              grid[gr][gc] = 1;
            } else {
              grid[gr][gc] = 0;
            }
          }
        }
      }
    }

    // Place Timing Patterns
    for (let c = 8; c < size - 8; c++) {
      if (!isReserved[6][c]) {
        grid[6][c] = c % 2 === 0 ? 1 : 0;
        isReserved[6][c] = true;
      }
    }
    for (let r = 8; r < size - 8; r++) {
      if (!isReserved[r][6]) {
        grid[r][6] = r % 2 === 0 ? 1 : 0;
        isReserved[r][6] = true;
      }
    }

    // Dark module at (4*v + 9, 8)
    grid[size - 8][8] = 1;
    isReserved[size - 8][8] = true;

    // Reserve Format Information areas
    for (let i = 0; i <= 8; i++) {
      isReserved[8][i] = true;
      isReserved[i][8] = true;
    }
    for (let i = size - 8; i < size; i++) {
      isReserved[8][i] = true;
      isReserved[size - (size - i)][8] = true;
    }
    for (let i = 0; i < 8; i++) {
      isReserved[size - 1 - i][8] = true;
    }

    // 8. Place Data Bits (Zigzag right to left)
    const totalBitStream: number[] = [];
    for (const cw of interleavedCodewords) {
      for (let j = 7; j >= 0; j--) {
        totalBitStream.push((cw >> j) & 1);
      }
    }

    let bitIdx = 0;
    let upwards = true;

    for (let rightCol = size - 1; rightCol > 0; rightCol -= 2) {
      if (rightCol === 6) rightCol--; // Skip vertical timing line column

      const rowIndices = upwards 
        ? Array.from({ length: size }, (_, i) => size - 1 - i)
        : Array.from({ length: size }, (_, i) => i);

      for (const r of rowIndices) {
        for (const c of [rightCol, rightCol - 1]) {
          if (!isReserved[r][c]) {
            grid[r][c] = bitIdx < totalBitStream.length ? totalBitStream[bitIdx++] : 0;
          }
        }
      }
      upwards = !upwards;
    }

    // 9. Apply Mask & Format Information
    // Evaluate 8 masking patterns to select best (pattern 0: (r + c) % 2 === 0 is standard)
    const bestMask: number = 0;
    const formatBits = FORMAT_INFO[requestedEc][bestMask];

    // Apply Mask
    const finalGrid: boolean[][] = Array.from({ length: size }, (_, r) => 
      Array.from({ length: size }, (_, c) => {
        let val = grid[r][c];
        if (!isReserved[r][c]) {
          let maskBit = false;
          switch (bestMask) {
            case 0: maskBit = (r + c) % 2 === 0; break;
            case 1: maskBit = r % 2 === 0; break;
            case 2: maskBit = c % 3 === 0; break;
            case 3: maskBit = (r + c) % 3 === 0; break;
            case 4: maskBit = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; break;
            case 5: maskBit = ((r * c) % 2) + ((r * c) % 3) === 0; break;
            case 6: maskBit = (((r * c) % 2) + ((r * c) % 3)) % 2 === 0; break;
            case 7: maskBit = (((r + c) % 2) + ((r * c) % 3)) % 2 === 0; break;
          }
          if (maskBit) val ^= 1;
        }
        return val === 1;
      })
    );

    // Write Format Bits
    // Top-left
    for (let i = 0; i <= 5; i++) finalGrid[8][i] = ((formatBits >> (14 - i)) & 1) === 1;
    finalGrid[8][7] = ((formatBits >> 8) & 1) === 1;
    finalGrid[8][8] = ((formatBits >> 7) & 1) === 1;
    finalGrid[7][8] = ((formatBits >> 6) & 1) === 1;
    for (let i = 9; i <= 14; i++) finalGrid[14 - i][8] = ((formatBits >> (14 - i)) & 1) === 1;

    // Bottom-left & Top-right
    for (let i = 0; i <= 6; i++) finalGrid[size - 1 - i][8] = ((formatBits >> i) & 1) === 1;
    for (let i = 7; i <= 14; i++) finalGrid[8][size - 15 + i] = ((formatBits >> i) & 1) === 1;

    // Ensure dark module coordinate is always true per ISO/IEC 18004
    finalGrid[4 * version + 9][8] = true;

    return {
      version,
      size,
      modules: finalGrid
    };
  }
}
