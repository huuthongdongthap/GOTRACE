/**
 * GoTRACE Dynamic QR Code Generator - SVG Renderer
 */

import { QrMatrix } from './qr_matrix.js';

export interface SvgOptions {
  margin?: number; // Quiet zone modules (default: 4)
  foregroundColor?: string; // Default: "#000000"
  backgroundColor?: string; // Default: "#FFFFFF"
}

export function renderQrSvg(matrix: QrMatrix, options: SvgOptions = {}): string {
  const margin = options.margin ?? 4;
  const fg = options.foregroundColor ?? '#000000';
  const bg = options.backgroundColor ?? '#FFFFFF';
  const sizeWithMargin = matrix.size + margin * 2;

  let pathData = '';
  for (let r = 0; r < matrix.size; r++) {
    for (let c = 0; c < matrix.size; c++) {
      if (matrix.modules[r][c]) {
        const x = c + margin;
        const y = r + margin;
        pathData += `M${x},${y}h1v1h-1z `;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${sizeWithMargin} ${sizeWithMargin}" shape-rendering="crispEdges">` +
    `<rect width="${sizeWithMargin}" height="${sizeWithMargin}" fill="${bg}"/>` +
    `<path d="${pathData.trim()}" fill="${fg}"/>` +
    `</svg>`;
}
