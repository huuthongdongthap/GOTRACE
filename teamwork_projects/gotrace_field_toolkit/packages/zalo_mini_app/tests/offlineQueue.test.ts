/**
 * Unit Test: OfflineSyncQueue
 * Verifies LocalStorage FIFO queue, enqueue/dequeue order, reconnection auto-sync, and retry management.
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { OfflineSyncQueue } from "../dist/services/offlineQueue.js";
import type { OfflineQueueItem } from "../dist/types/index.js";

// In-memory mock localStorage implementation
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

describe("OfflineSyncQueue (FIFO Resilience in Rural Fields)", () => {
  let mockStorage: MockLocalStorage;
  let queue: OfflineSyncQueue;

  beforeEach(() => {
    mockStorage = new MockLocalStorage();
    (globalThis as unknown as { _mockLocalStorage?: Storage })._mockLocalStorage =
      mockStorage;
    (globalThis as unknown as { window?: { localStorage: Storage } }).window = {
      localStorage: mockStorage,
    };
    queue = new OfflineSyncQueue();
    queue.clear();
  });

  it("enqueues items to tail and preserves FIFO order", () => {
    const item1 = queue.enqueue("CROP_PLAN_CREATED", { code: "EVENT_01" });
    const item2 = queue.enqueue("AWD_LOG", { code: "EVENT_02" });
    const item3 = queue.enqueue("HARVEST_REQUEST", { code: "EVENT_03" });

    assert.strictEqual(queue.getPendingCount(), 3);

    // Peek should return the first enqueued item (FIFO head)
    const head = queue.peek();
    assert.ok(head);
    assert.strictEqual(head.id, item1.id);
    assert.strictEqual(head.type, "CROP_PLAN_CREATED");

    const allItems = queue.getItems();
    assert.strictEqual(allItems[0].id, item1.id);
    assert.strictEqual(allItems[1].id, item2.id);
    assert.strictEqual(allItems[2].id, item3.id);
  });

  it("dequeues items by ID and updates pending count", () => {
    const item1 = queue.enqueue("CROP_PLAN_CREATED", { code: "EVENT_01" });
    const item2 = queue.enqueue("AWD_LOG", { code: "EVENT_02" });

    assert.strictEqual(queue.getPendingCount(), 2);

    const removed = queue.dequeue(item1.id);
    assert.ok(removed);
    assert.strictEqual(removed.id, item1.id);
    assert.strictEqual(queue.getPendingCount(), 1);

    // Head should now be item2
    assert.strictEqual(queue.peek()?.id, item2.id);
  });

  it("persists queue items to storage and recovers across instances", () => {
    queue.enqueue("INPUT_APPLIED", { product: "Anvil 5SC" });
    assert.strictEqual(queue.getPendingCount(), 1);

    // Create a new queue instance reading from the same storage
    const newQueueInstance = new OfflineSyncQueue();
    assert.strictEqual(newQueueInstance.getPendingCount(), 1);
    const recovered = newQueueInstance.peek();
    assert.strictEqual(recovered?.type, "INPUT_APPLIED");
    assert.deepStrictEqual((recovered?.payload as { product: string }).product, "Anvil 5SC");
  });

  it("flushes queue items sequentially in FIFO order using custom sync handler", async () => {
    const syncedOrder: string[] = [];

    queue.enqueue("CROP_PLAN_CREATED", { step: 1 });
    queue.enqueue("AWD_LOG", { step: 2 });
    queue.enqueue("HARVEST_REQUEST", { step: 3 });

    queue.setSyncHandler(async (item: OfflineQueueItem) => {
      const payload = item.payload as { step: number };
      syncedOrder.push(String(payload.step));
      return true;
    });

    const result = await queue.flush();
    assert.strictEqual(result.synced, 3);
    assert.strictEqual(result.failed, 0);
    assert.deepStrictEqual(syncedOrder, ["1", "2", "3"]); // Strict FIFO order verified!
    assert.strictEqual(queue.getPendingCount(), 0);
  });

  it("handles sync errors by incrementing retry count without dropping queue", async () => {
    let callCount = 0;
    queue.enqueue("AWD_LOG", { test: "failing_event" });

    queue.setSyncHandler(async () => {
      callCount++;
      throw new Error("503 Gateway Timeout");
    });

    const result = await queue.flush();
    assert.strictEqual(result.synced, 0);
    assert.strictEqual(result.failed, 1);
    assert.strictEqual(callCount, 1);

    // Item should remain in queue with retryCount incremented
    const pendingItem = queue.peek();
    assert.ok(pendingItem);
    assert.strictEqual(pendingItem.retryCount, 1);
    assert.ok(pendingItem.lastError?.includes("503 Gateway Timeout"));
  });

  it("notifies subscribers when items are added or removed", () => {
    let notifyCallCount = 0;
    const unsubscribe = queue.subscribe(() => {
      notifyCallCount++;
    });

    queue.enqueue("AWD_LOG", { test: "notify" });
    assert.ok(notifyCallCount >= 2); // Initial subscribe call + enqueue call

    queue.clear();
    assert.ok(notifyCallCount >= 3);
    unsubscribe();
  });
});
