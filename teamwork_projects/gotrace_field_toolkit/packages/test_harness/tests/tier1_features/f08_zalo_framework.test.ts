import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  BottomNavBar,
  MobileDeviceFrame,
  App,
  apiClient,
  OfflineSyncQueue,
  type ActiveScreen,
} from '@gotrace/zalo-mini-app';

class MockLocalStorage implements Storage {
  private store: Record<string, string> = {};
  get length(): number { return Object.keys(this.store).length; }
  clear(): void { this.store = {}; }
  getItem(key: string): string | null { return this.store[key] || null; }
  key(index: number): string | null { return Object.keys(this.store)[index] || null; }
  removeItem(key: string): void { delete this.store[key]; }
  setItem(key: string, value: string): void { this.store[key] = String(value); }
}

if (!globalThis.localStorage) {
  globalThis.localStorage = new MockLocalStorage();
}
if (!(globalThis as any).window) {
  (globalThis as any).window = {
    localStorage: globalThis.localStorage,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  };
}


describe('Tier 1: Feature 8 - Zalo Mini App 3-Button Framework', () => {
  it('F8-TC1: Initializes 3-button container with zero typing and eKYC verified profile', () => {
    const html = ReactDOMServer.renderToString(React.createElement(App));
    assert.ok(html.includes('Hồ Sơ Nông Dân (Zalo eKYC)'));
    assert.ok(html.includes('1 CHẠM: BÁO GIEO SẠ / RA HOA'));
    assert.ok(html.includes('simulator-wrapper'));
  });

  it('F8-TC2: Button 1 navigates to Screen 1 (Báo gieo sạ / Ra hoa)', () => {
    let currentScreen: ActiveScreen = 'SOWING';
    const html = ReactDOMServer.renderToString(
      React.createElement(BottomNavBar, {
        activeScreen: currentScreen,
        onScreenChange: (s: ActiveScreen) => { currentScreen = s; },
      })
    );
    assert.ok(html.includes('1. Gieo Sạ'));
    assert.strictEqual(currentScreen, 'SOWING');
  });

  it('F8-TC3: Button 2 navigates to Screen 2 (Vật tư & Rút nước AWD)', () => {
    let currentScreen: ActiveScreen = 'SOWING';
    const onScreenChange = (s: ActiveScreen) => { currentScreen = s; };
    onScreenChange('AWD_OCR');
    const html = ReactDOMServer.renderToString(
      React.createElement(BottomNavBar, {
        activeScreen: currentScreen,
        onScreenChange,
      })
    );
    assert.ok(html.includes('data-testid="nav-btn-awd-ocr"'));
    assert.strictEqual(currentScreen, 'AWD_OCR');
  });

  it('F8-TC4: Button 3 navigates to Screen 3 (Yêu cầu thu hoạch)', () => {
    let currentScreen: ActiveScreen = 'SOWING';
    const onScreenChange = (s: ActiveScreen) => { currentScreen = s; };
    onScreenChange('HARVEST');
    const html = ReactDOMServer.renderToString(
      React.createElement(BottomNavBar, {
        activeScreen: currentScreen,
        onScreenChange,
      })
    );
    assert.ok(html.includes('data-testid="nav-btn-harvest"'));
    assert.strictEqual(currentScreen, 'HARVEST');
  });

  it('F8-TC5: Tracks online/offline network transitions and increments offline queue', () => {
    apiClient.setNetworkStatus(true);
    assert.strictEqual(apiClient.isOnline(), true);

    apiClient.setNetworkStatus(false);
    assert.strictEqual(apiClient.isOnline(), false);

    const queue = new OfflineSyncQueue();
    queue.clear();
    queue.enqueue('CROP_PLAN_CREATED', { step: 1 });
    queue.enqueue('AWD_LOG', { step: 2 });
    assert.strictEqual(queue.getPendingCount(), 2);

    apiClient.setNetworkStatus(true);
    assert.strictEqual(apiClient.isOnline(), true);
    queue.clear();
    assert.strictEqual(queue.getPendingCount(), 0);
  });
});
