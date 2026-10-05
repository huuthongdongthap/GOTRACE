/**
 * Unit Test: 3-Screen Navigation & Interaction
 * Verifies screen switching between Sowing, AWD/OCR, and Harvest,
 * Bottom navigation active states, and mobile preview simulator wrapper.
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "../dist/App.js";
import { BottomNavBar } from "../dist/components/BottomNavBar.js";
import type { ActiveScreen } from "../dist/components/BottomNavBar.js";
import { MobileDeviceFrame } from "../dist/components/MobileDeviceFrame.js";
import { apiClient } from "../dist/services/api.js";

// Mock localStorage and window for Node environment
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
  // Ignore if already defined
}

describe("3-Screen Navigation & Mobile UX Architecture", () => {
  it("renders BottomNavBar with 3 distinct buttons", () => {
    let currentScreen: ActiveScreen = "SOWING";
    const handleChange = (s: ActiveScreen) => {
      currentScreen = s;
    };

    const html = ReactDOMServer.renderToString(
      React.createElement(BottomNavBar, {
        activeScreen: currentScreen,
        onScreenChange: handleChange,
      })
    );

    assert.ok(html.includes("1. Gieo Sạ"));
    assert.ok(html.includes("2. Vật Tư &amp; AWD") || html.includes("2. Vật Tư & AWD"));
    assert.ok(html.includes("3. Thu Hoạch"));
    assert.ok(html.includes("nav-tab-btn active"));
  });

  it("handles screen change state transitions across all 3 screens", () => {
    let activeScreen: ActiveScreen = "SOWING";

    // Switch to AWD_OCR
    activeScreen = "AWD_OCR";
    const htmlAwd = ReactDOMServer.renderToString(
      React.createElement(BottomNavBar, {
        activeScreen,
        onScreenChange: (s) => (activeScreen = s),
      })
    );
    assert.ok(htmlAwd.includes('data-testid="nav-btn-awd-ocr"'));

    // Switch to HARVEST
    activeScreen = "HARVEST";
    const htmlHarvest = ReactDOMServer.renderToString(
      React.createElement(BottomNavBar, {
        activeScreen,
        onScreenChange: (s) => (activeScreen = s),
      })
    );
    assert.ok(htmlHarvest.includes('data-testid="nav-btn-harvest"'));
  });

  it("renders MobileDeviceFrame with status bar, notch, and header", () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(
        MobileDeviceFrame,
        {
          activeScreen: "SOWING",
          onScreenChange: () => {},
        },
        React.createElement("div", { "data-testid": "child-content" }, "Ruộng lúa")
      )
    );

    assert.ok(html.includes("device-frame"));
    assert.ok(html.includes("phone-notch"));
    assert.ok(html.includes("phone-status-bar"));
    assert.ok(html.includes("zalo-header"));
    assert.ok(html.includes("Thư ký số HTX • GoTRACE"));
    assert.ok(html.includes("Ruộng lúa"));
  });

  it("renders full App component and mounts Sowing screen as initial view", () => {
    const appHtml = ReactDOMServer.renderToString(React.createElement(App));

    assert.ok(appHtml.includes("simulator-wrapper"));
    assert.ok(appHtml.includes("Hồ Sơ Nông Dân (Zalo eKYC)"));
    assert.ok(appHtml.includes("1 CHẠM: BÁO GIEO SẠ / RA HOA"));
  });

  it("toggles network connectivity simulation between online and offline", () => {
    apiClient.setNetworkStatus(true);
    assert.strictEqual(apiClient.isOnline(), true);

    apiClient.setNetworkStatus(false);
    assert.strictEqual(apiClient.isOnline(), false);

    // Reset back to true
    apiClient.setNetworkStatus(true);
    assert.strictEqual(apiClient.isOnline(), true);
  });
});
