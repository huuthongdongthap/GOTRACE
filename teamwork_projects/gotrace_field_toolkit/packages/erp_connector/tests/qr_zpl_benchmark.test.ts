/**
 * Test Suite: Dynamic QR Code Generator Latency Benchmark (<30ms) & Zebra ZPL Builder
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { generateTraceabilityQr, benchmarkQrGeneration } from '../src/qr/qr_generator.js';
import { ZplGenerator } from '../src/qr/zpl_builder.js';

describe('Dynamic QR Code Generator & Latency Benchmark', () => {
  const sampleUrl = 'https://trace.gotrace.vn/resolve?tx=VN.DT.TRANSACTION.CUSTODY_TRANSFER.DO-20260930-0012';

  test('generates valid dynamic QR Code with SVG and PNG Base64', () => {
    const res = generateTraceabilityQr(sampleUrl, { level: 'M' });

    assert.strictEqual(res.qrPayload, sampleUrl);
    assert.ok(res.version >= 1 && res.version <= 10);
    assert.ok(res.sizeModules > 20);

    // Verify SVG markup
    assert.ok(res.qrSvg.startsWith('<svg'));
    assert.ok(res.qrSvg.endsWith('</svg>'));
    assert.ok(res.qrSvg.includes('<path d='));

    // Verify PNG Buffer format
    assert.ok(Buffer.isBuffer(res.qrPngBuffer));
    // PNG signature: 0x89 50 4E 47 0D 0A 1A 0A
    const pngSig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (let i = 0; i < pngSig.length; i++) {
      assert.strictEqual(res.qrPngBuffer[i], pngSig[i], `PNG signature mismatch at byte ${i}`);
    }

    // Verify Base64 Data URL
    assert.ok(res.qrImageBase64.startsWith('data:image/png;base64,'));
    const base64Data = res.qrImageBase64.replace('data:image/png;base64,', '');
    const decodedBuf = Buffer.from(base64Data, 'base64');
    assert.strictEqual(decodedBuf.length, res.qrPngBuffer.length);
  });

  test('QR code generation latency SLA benchmark (< 30ms over 100 iterations)', () => {
    const benchmark = benchmarkQrGeneration(sampleUrl, 100);

    console.log(`\n=== Dynamic QR Latency Benchmark (100 iterations) ===`);
    console.log(`Min Latency: ${benchmark.minMs.toFixed(3)} ms`);
    console.log(`Max Latency: ${benchmark.maxMs.toFixed(3)} ms`);
    console.log(`Avg Latency: ${benchmark.avgMs.toFixed(3)} ms`);
    console.log(`P95 Latency: ${benchmark.p95Ms.toFixed(3)} ms`);
    console.log(`SLA (< 30ms): ${benchmark.success ? 'PASSED ✅' : 'FAILED ❌'}\n`);

    assert.strictEqual(benchmark.success, true, `P95 latency (${benchmark.p95Ms}ms) exceeded 30ms SLA`);
    assert.ok(benchmark.avgMs < 10, `Average latency should be comfortably under 10ms, got ${benchmark.avgMs}ms`);
  });
});

describe('Zebra ZPL Industrial Label Generator', () => {
  const sampleUrl = 'https://trace.gotrace.vn/resolve?gci=VN.DT.LOT.FINISHED.20260928-ST25-5K-01';

  test('formats valid Zebra ZPL carton thermal label commands', () => {
    const zpl = ZplGenerator.generateCartonLabel({
      productName: 'GAO ST25 CO MAY DONG THAP',
      lotGci: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01',
      productionDate: '2026-09-28',
      expiryDate: '2027-09-28',
      weightKg: 5.0,
      uom: 'KG',
      originFacility: 'NHA MAY CO MAY SA DEC',
      traceabilityUrl: sampleUrl
    });

    // Mandatory ZPL boundaries
    assert.ok(zpl.startsWith('^XA'));
    assert.ok(zpl.endsWith('^XZ'));

    // Print configurations
    assert.ok(zpl.includes('^PW800'), 'Should declare print width 800 dots');
    assert.ok(zpl.includes('^BQN,2,5^FDQA,' + sampleUrl), 'Should include QR code command with URL');
    assert.ok(zpl.includes('^BCN,'), 'Should include Code 128 barcode command');
    assert.ok(zpl.includes('GAO ST25 CO MAY DONG THAP'), 'Should include product title');
    assert.ok(zpl.includes('VN.DT.LOT.FINISHED.20260928-ST25-5K-01'), 'Should include lot GCI');
    assert.ok(zpl.includes('TRONG LUONG: 5 KG'), 'Should include net weight');
  });

  test('formats valid Zebra ZPL pallet master shipping label commands', () => {
    const zpl = ZplGenerator.generatePalletLabel({
      sscc: '089350010000000124',
      sellerName: 'CONG TY CP CO MAY',
      buyerName: 'SAIGON CO.OP - KHO BINH DUONG',
      deliveryOrderNumber: 'DO-20260930-0012',
      primaryLotGci: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01',
      totalCartons: 200,
      totalNetWeightKg: 10000,
      totalGrossWeightKg: 10100,
      traceabilityUrl: sampleUrl,
      dispatchDate: '2026-09-30'
    });

    assert.ok(zpl.startsWith('^XA'));
    assert.ok(zpl.endsWith('^XZ'));
    assert.ok(zpl.includes('^PW800'));
    assert.ok(zpl.includes('^LL1200'));
    assert.ok(zpl.includes('GOTRACE LOGISTICS PALLET LABEL'));
    assert.ok(zpl.includes('SO LENH XUAT KHO (DO): DO-20260930-0012'));
    assert.ok(zpl.includes('(00) 089350010000000124'));
    assert.ok(zpl.includes('SO THUNG: 200 THUNG'));
    assert.ok(zpl.includes('KHOI LUONG RONG: 10000 KG'));
  });

  test('sanitizes input strings against ZPL command corruption', () => {
    const zpl = ZplGenerator.generateCartonLabel({
      productName: 'ST25 ^XZ ^XA HACKED NAME ~JA',
      lotGci: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01',
      productionDate: '2026-09-28',
      traceabilityUrl: sampleUrl
    });

    // Substrings with ^XZ or ~JA inside product title must be stripped
    const lines = zpl.split('\n');
    const headerLine = lines.find(l => l.includes('HACKED NAME'));
    assert.ok(headerLine);
    assert.ok(!headerLine.includes('^XZ ^XA'), 'Carrot command chars must be removed');
  });
});
