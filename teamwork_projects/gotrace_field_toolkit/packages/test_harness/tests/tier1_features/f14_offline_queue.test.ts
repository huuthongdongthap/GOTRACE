import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { OfflineSyncQueue, type OfflineQueueItem } from '@gotrace/zalo-mini-app';

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

describe('Tier 1: Feature 14 - Offline-First Sync Queue', () => {
  let queue: OfflineSyncQueue;

  beforeEach(() => {
    queue = new OfflineSyncQueue();
    queue.clear();
  });

  it('F14-TC1: Successfully enqueues actions into FIFO queue during network outage', () => {
    queue.enqueue('CROP_PLAN_CREATED', { variety: 'ST25' });
    queue.enqueue('AWD_LOG', { waterLevelCm: -15 });
    queue.enqueue('HARVEST_REQUEST', { estimatedYieldKg: 45000 });
    assert.strictEqual(queue.getPendingCount(), 3);
    assert.strictEqual(queue.getItems().length, 3);
  });

  it('F14-TC2: Preserves chronological order (FIFO) of queued events', () => {
    const item1 = queue.enqueue('CROP_PLAN_CREATED', { step: 1 });
    const item2 = queue.enqueue('AWD_LOG', { step: 2 });
    const items = queue.getItems();
    assert.strictEqual(items[0].id, item1.id);
    assert.strictEqual(items[1].id, item2.id);
    assert.strictEqual(queue.peek()?.id, item1.id);
  });

  it('F14-TC3: Flushes all pending items to gateway when network is restored', async () => {
    queue.enqueue('CROP_PLAN_CREATED', { plot: 'TB-01' });
    queue.enqueue('INPUT_APPLIED', { activeIngredient: 'Hexaconazole' });

    queue.setSyncHandler(async () => true);
    const flushResult = await queue.flush();
    assert.strictEqual(flushResult.synced, 2);
    assert.strictEqual(queue.getPendingCount(), 0);
  });

  it('F14-TC4: Retains item in queue with incremented retryCount on transient network error', async () => {
    queue.enqueue('HARVEST_REQUEST', { yieldKg: 45000 });

    queue.setSyncHandler(async () => {
      throw new Error('503 Service Unavailable');
    });

    const flushResult = await queue.flush();
    assert.strictEqual(flushResult.failed, 1);
    assert.strictEqual(queue.getPendingCount(), 1);
    const pendingItem = queue.peek();
    assert.ok(pendingItem);
    assert.strictEqual(pendingItem.retryCount, 1);
    assert.ok(pendingItem.lastError?.includes('503 Service Unavailable'));
  });

  it('F14-TC5: Tracks repeated failures across multiple flush attempts without dropping queue', async () => {
    queue.enqueue('CROP_PLAN_CREATED', { variety: 'OM5451' });

    queue.setSyncHandler(async () => {
      throw new Error('Network Timeout');
    });

    await queue.flush(); // retryCount = 1
    await queue.flush(); // retryCount = 2
    await queue.flush(); // retryCount = 3

    assert.strictEqual(queue.getPendingCount(), 1);
    assert.strictEqual(queue.peek()?.retryCount, 3);
  });
});
