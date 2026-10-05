import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  MOCK_PLOT_GCI,
  MOCK_GROWING_AREA_GCI,
  MOCK_MSVT_CODE,
  MOCK_FARMER_GCI,
} from '../../src/fixtures/zalo_fixtures.ts';
import { isValidGrowingAreaGci, isValidPlotGci } from '../../src/verifiers/gci_verifier.ts';

import { GisMatcher } from '@gotrace/zalo-mini-app';

// Polygon for Mỹ Xương, Cao Lãnh, Đồng Tháp
const REGISTERED_POLYGON: [number, number][] = [
  [10.450, 105.620],
  [10.465, 105.620],
  [10.465, 105.635],
  [10.450, 105.635],
  [10.450, 105.620],
];

function verifyGpsWithinPlot(lat: number, lng: number): boolean {
  return GisMatcher.isPointInPolygon(lat, lng, REGISTERED_POLYGON);
}

function createSowingEvent(params: {
  lat: number;
  lng: number;
  variety: 'ST25' | 'OM5451' | 'JASMINE_85';
}) {
  const inBounds = verifyGpsWithinPlot(params.lat, params.lng);
  return {
    eventId: `VN.DT.EVENT.PLANTED.EVT-${Date.now()}`,
    eventType: 'PLANTED',
    plotGci: MOCK_PLOT_GCI,
    growingAreaGci: MOCK_GROWING_AREA_GCI,
    msvtCode: MOCK_MSVT_CODE,
    farmerGci: MOCK_FARMER_GCI,
    variety: params.variety,
    coordinates: { lat: params.lat, lng: params.lng },
    inBoundsWarning: !inBounds,
    createdAt: new Date().toISOString(),
  };
}

describe('Tier 1: Feature 9 - Screen 1: Sowing / Flowering & GIS MSVT', () => {
  it('F9-TC1: Successfully resolves MSVT and Plot GCIs from pre-registered cooperative records', () => {
    assert.strictEqual(isValidGrowingAreaGci(MOCK_GROWING_AREA_GCI), true);
    assert.strictEqual(isValidPlotGci(MOCK_PLOT_GCI), true);
  });

  it('F9-TC2: Automatically matches GPS coordinates inside registered plot boundary', () => {
    const fieldLat = 10.455;
    const fieldLng = 105.625;
    assert.strictEqual(verifyGpsWithinPlot(fieldLat, fieldLng), true);
  });

  it('F9-TC3: Emits EVENT: PLANTED with selected rice variety and coordinates', () => {
    const event = createSowingEvent({ lat: 10.455, lng: 105.625, variety: 'OM5451' });
    assert.strictEqual(event.eventType, 'PLANTED');
    assert.strictEqual(event.variety, 'OM5451');
    assert.strictEqual(event.inBoundsWarning, false);
    assert.ok(event.eventId.startsWith('VN.DT.EVENT.PLANTED.'));
  });

  it('F9-TC4: Detects out-of-boundary GPS coordinates (e.g. coffee shop 5km away)', () => {
    const cafeLat = 10.490; // Outside boundary
    const cafeLng = 105.670;
    const event = createSowingEvent({ lat: cafeLat, lng: cafeLng, variety: 'ST25' });
    assert.strictEqual(event.inBoundsWarning, true, 'Must flag out-of-bounds warning');
  });

  it('F9-TC5: Quick variety chips correctly assign standard commodity identifiers', () => {
    const varieties = ['ST25', 'OM5451', 'JASMINE_85'] as const;
    for (const v of varieties) {
      const evt = createSowingEvent({ lat: 10.455, lng: 105.625, variety: v });
      assert.strictEqual(evt.variety, v);
    }
  });
});
