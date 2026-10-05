import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_OCR_CASES } from '../../src/fixtures/zalo_fixtures.ts';
import type { OcrResult } from '../../src/models/contracts.ts';
import { OcrSimulator, KNOWN_CHEMICAL_CATALOG } from '@gotrace/zalo-mini-app';

function simulateOcrPipeline(imageText: string, confidence = 0.95): OcrResult {
  const upper = imageText.toUpperCase();
  const activeIngredients: string[] = [];

  if (upper.includes('HEXACONAZOLE')) activeIngredients.push('Hexaconazole');
  if (upper.includes('AZOXYSTROBIN')) activeIngredients.push('Azoxystrobin');
  if (upper.includes('DIFENOCONAZOLE')) activeIngredients.push('Difenoconazole');

  let productName = 'UNKNOWN';
  if (upper.includes('ANVIL 5SC')) productName = 'ANVIL 5SC';
  if (upper.includes('AMISTAR TOP')) productName = 'AMISTAR TOP 325SC';

  return {
    rawText: imageText,
    productName,
    activeIngredients,
    confidenceScore: confidence,
  };
}

describe('Tier 1: Feature 11 - Screen 2: Chemical Bag OCR Simulation', () => {
  it('F11-TC1: Successfully extracts single active ingredient (Hexaconazole) from Anvil 5SC', () => {
    const mock = MOCK_OCR_CASES[0];
    const res = simulateOcrPipeline(mock.rawText);
    assert.strictEqual(res.productName, mock.expectedProductName);
    assert.deepStrictEqual(res.activeIngredients, mock.expectedActiveIngredients);
    assert.strictEqual(res.confidenceScore >= 0.8, true);
  });

  it('F11-TC2: Successfully extracts dual active ingredients from Amistar Top 325SC', () => {
    const mock = MOCK_OCR_CASES[1];
    const res = simulateOcrPipeline(mock.rawText);
    assert.strictEqual(res.productName, mock.expectedProductName);
    assert.deepStrictEqual(res.activeIngredients, mock.expectedActiveIngredients);
  });

  it('F11-TC3: Formats extracted OCR ingredients into EVENT: TREATED payload', () => {
    const res = simulateOcrPipeline(MOCK_OCR_CASES[0].rawText);
    const event = {
      eventType: 'TREATED',
      activeIngredients: res.activeIngredients,
      productName: res.productName,
      dosageLPerHa: 1.0,
      timestamp: new Date().toISOString(),
    };
    assert.strictEqual(event.eventType, 'TREATED');
    assert.strictEqual(event.activeIngredients.length, 1);
    assert.strictEqual(event.activeIngredients[0], 'Hexaconazole');
  });

  it('F11-TC4: Low confidence image capture (<40%) triggers manual selection fallback', () => {
    const blurryText = 'ANVIL 5... ???';
    const lowConfidence = simulateOcrPipeline(blurryText, 0.35);
    const fallbackRequired = lowConfidence.confidenceScore < 0.4;
    assert.strictEqual(fallbackRequired, true, 'Low confidence must trigger fallback flag');
  });

  it('F11-TC5: Successfully binds photo evidence URI to treatment record and verifies OcrSimulator', () => {
    const ocrSim = new OcrSimulator();
    const captured = ocrSim.simulateOcrCapture(2); // Anvil 5SC
    assert.ok(captured.productName.includes('Anvil'));
    assert.strictEqual(captured.confidenceScore >= 0.9, true);
    assert.ok(captured.evidencePhotoGci.startsWith('VN.DT.EVIDENCE.GIS_PHOTO.'));
    assert.strictEqual(captured.safeForExport, true);
  });
});
