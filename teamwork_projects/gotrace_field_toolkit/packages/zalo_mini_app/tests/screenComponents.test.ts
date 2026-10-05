/**
 * Component Tests: Screen 1, Screen 2, Screen 3 & OfflineStatusBar
 * Verifies component rendering, field values, OCR simulation, AWD slider state, and 1-tap event packaging.
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Screen1Sowing } from "../dist/screens/Screen1Sowing.js";
import { Screen2AwdOcr } from "../dist/screens/Screen2AwdOcr.js";
import { Screen3Harvest } from "../dist/screens/Screen3Harvest.js";
import { OfflineStatusBar } from "../dist/components/OfflineStatusBar.js";
import { ocrSimulator, KNOWN_CHEMICAL_CATALOG } from "../dist/services/ocrSimulator.js";
import { GisMatcher, MOCK_PLOTS } from "../dist/services/gisMatcher.js";
import { apiClient } from "../dist/services/api.js";
import type { CropPlanEventPayload } from "../dist/types/index.js";

// Mock environment setup
class MockLocalStorage implements Storage {
  private store: Record<string, string> = {};
  get length(): number {
    return Object.keys(this.store).length;
  }
  clear(): void {
    this.store = {};
  }
  getItem(key: string): string | null {
    return this.store[key] || null;
  }
  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
}

globalThis.localStorage = new MockLocalStorage();
(globalThis as unknown as { window?: unknown }).window = {
  localStorage: globalThis.localStorage,
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
};
try {
  Object.defineProperty(globalThis.navigator, "onLine", {
    value: true,
    configurable: true,
    writable: true,
  });
} catch {
  // Ignore
}

describe("Screen Components & Field Agent UX", () => {
  it("Screen 1: renders farmer eKYC profile, GIS plot matching, and MSVT selector", () => {
    let capturedPlan: CropPlanEventPayload | null = null;
    const html = ReactDOMServer.renderToString(
      React.createElement(Screen1Sowing, {
        onPlanCreated: (p) => (capturedPlan = p),
      })
    );

    assert.ok(html.includes("Nguyễn Văn Nam"));
    assert.ok(html.includes("HTX Nông Nghiệp Thắng Lợi"));
    assert.ok(html.includes("VN-DTH-0012"));
    assert.ok(html.includes("Thửa 4 - Lung Lớn"));
    assert.ok(html.includes("GPS Hợp lệ (Trong Thửa)"));
    assert.ok(html.includes("1 CHẠM: BÁO GIEO SẠ / RA HOA"));
  });

  it("GisMatcher: matches point inside plot polygon accurately using ray-casting", () => {
    const plot = MOCK_PLOTS[0]; // center: 10.4582, 105.6321
    const inside = GisMatcher.isPointInPolygon(10.4582, 105.6321, plot.polygon);
    assert.strictEqual(inside, true);

    const outside = GisMatcher.isPointInPolygon(11.0, 106.0, plot.polygon);
    assert.strictEqual(outside, false);
  });

  it("Screen 2: renders AWD water tube slider and 1Mha MRV carbon numbers", () => {
    const html = ReactDOMServer.renderToString(React.createElement(Screen2AwdOcr));

    assert.ok(html.includes("Ống Đo Nông Học Thực Địa (AWD)"));
    assert.ok(html.includes("-15 cm (Tối ưu)"));
    assert.ok(html.includes("Nứt Chân Chim (Ức chế CH4)"));
    assert.ok(html.includes("Đo Đạc MRV Carbon • Đề Án 1Mha"));
    assert.ok(html.includes("3.35 tCO₂e/ha")); // Delta E
    assert.ok(html.includes("5.025 tCO₂e")); // Total reduction for 1.5 ha
    assert.ok(html.includes("Quét AI Vỏ Bao Phân Bón / Thuốc BVTV"));
  });

  it("OcrSimulator: extracts active ingredients, category, PHI, and photo hash from chemical catalog", () => {
    assert.ok(KNOWN_CHEMICAL_CATALOG.length >= 4);

    // Scan Item 0: Urea Dam Ca Mau
    const ureaResult = ocrSimulator.simulateOcrCapture(0);
    assert.strictEqual(ureaResult.category, "FERTILIZER");
    assert.ok(ureaResult.activeIngredients.some((i) => i.includes("Nitrogen")));
    assert.strictEqual(ureaResult.phiDays, 0);
    assert.strictEqual(ureaResult.safeForExport, true);
    assert.strictEqual(ureaResult.confidenceScore, 0.96);
    assert.strictEqual(ureaResult.photoHashSha256.length, 64);

    // Scan Item 2: Anvil 5SC
    const anvilResult = ocrSimulator.simulateOcrCapture(2);
    assert.strictEqual(anvilResult.category, "PESTICIDE");
    assert.ok(anvilResult.activeIngredients.some((i) => i.includes("Hexaconazole")));
    assert.strictEqual(anvilResult.phiDays, 14); // 14-day pre-harvest interval
  });

  it("Screen 3: renders harvest plot summary, yield estimation slider, and barge/truck buttons", () => {
    const html = ReactDOMServer.renderToString(React.createElement(Screen3Harvest));

    assert.ok(html.includes("Kế Hoạch Thu Hoạch Ruộng Lúa"));
    assert.ok(html.includes("Ước Tính Sản Lượng Tươi"));
    assert.ok(html.includes("Ghe / Sà Lan Thủy"));
    assert.ok(html.includes("Xe Tải Đường Bộ"));
    assert.ok(html.includes("1 CHẠM: PHÁT LỆNH THU HOẠCH"));
  });

  it("OfflineStatusBar: displays online/offline status correctly", () => {
    apiClient.setNetworkStatus(true);
    const onlineHtml = ReactDOMServer.renderToString(
      React.createElement(OfflineStatusBar)
    );
    assert.ok(onlineHtml.includes("Trực tuyến (4G)"));

    apiClient.setNetworkStatus(false);
    const offlineHtml = ReactDOMServer.renderToString(
      React.createElement(OfflineStatusBar)
    );
    assert.ok(offlineHtml.includes("Mất sóng bờ ruộng"));

    // Reset back
    apiClient.setNetworkStatus(true);
  });
});
