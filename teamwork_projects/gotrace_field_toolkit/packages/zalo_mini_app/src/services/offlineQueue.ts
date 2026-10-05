/**
 * GoTRACE Offline-First Sync Queue
 * FIFO LocalStorage queue for buffering agricultural events during network outages in rural canal-side fields.
 */

import { OfflineQueueItem, OfflineQueueEventType } from "../types/index.js";

export type SyncHandler = (item: OfflineQueueItem) => Promise<boolean>;

export class OfflineSyncQueue {
  private static readonly STORAGE_KEY = "gotrace_zalo_offline_sync_queue_v1";
  private static readonly MAX_RETRIES = 3;
  private isSyncing = false;
  private syncHandler: SyncHandler | null = null;
  private listeners: Array<(items: OfflineQueueItem[]) => void> = [];

  constructor() {
    this.initNetworkListeners();
  }

  private getStorage(): Storage | null {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
    // In-memory fallback if localStorage is unavailable
    return (globalThis as unknown as { _mockLocalStorage?: Storage })._mockLocalStorage || null;
  }

  /**
   * Set custom API sync handler callback
   */
  public setSyncHandler(handler: SyncHandler): void {
    this.syncHandler = handler;
  }

  /**
   * Subscribe to queue state mutations
   */
  public subscribe(listener: (items: OfflineQueueItem[]) => void): () => void {
    this.listeners.push(listener);
    listener(this.getItems());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    const items = this.getItems();
    for (const listener of this.listeners) {
      try {
        listener(items);
      } catch (err) {
        console.error("Queue listener error:", err);
      }
    }
  }

  /**
   * Retrieve all items stored in FIFO order
   */
  public getItems(): OfflineQueueItem[] {
    const storage = this.getStorage();
    if (!storage) return [];
    try {
      const raw = storage.getItem(OfflineSyncQueue.STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Failed to read offline queue from storage:", err);
      return [];
    }
  }

  /**
   * Overwrite queue items in storage
   */
  private saveItems(items: OfflineQueueItem[]): void {
    const storage = this.getStorage();
    if (!storage) return;
    try {
      storage.setItem(OfflineSyncQueue.STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save offline queue to storage:", err);
    }
    this.notify();
  }

  /**
   * Enqueue a new event to the tail of the FIFO queue
   */
  public enqueue<T = unknown>(
    type: OfflineQueueEventType,
    payload: T
  ): OfflineQueueItem<T> {
    const items = this.getItems();
    const newItem: OfflineQueueItem<T> = {
      id: `QUE-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      type,
      payload,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      retryCount: 0,
    };

    items.push(newItem as OfflineQueueItem);
    this.saveItems(items);
    return newItem;
  }

  /**
   * Peek next pending item at head of FIFO queue
   */
  public peek(): OfflineQueueItem | null {
    const items = this.getItems();
    return items.find((i) => i.status === "PENDING" || i.status === "FAILED") || null;
  }

  /**
   * Dequeue item by ID after successful sync
   */
  public dequeue(id: string): OfflineQueueItem | null {
    const items = this.getItems();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const [removed] = items.splice(index, 1);
    this.saveItems(items);
    return removed;
  }

  /**
   * Get count of pending unsynced items
   */
  public getPendingCount(): number {
    return this.getItems().filter(
      (item) => item.status === "PENDING" || item.status === "FAILED"
    ).length;
  }

  /**
   * Flush/sync all items sequentially in FIFO order
   */
  public async flush(): Promise<{ synced: number; failed: number }> {
    if (this.isSyncing) {
      return { synced: 0, failed: 0 };
    }

    this.isSyncing = true;
    let synced = 0;
    let failed = 0;

    try {
      const items = this.getItems();
      for (const item of items) {
        if (item.status === "SYNCED") continue;

        item.status = "SYNCING";
        this.saveItems(items);

        let success = false;
        try {
          if (this.syncHandler) {
            success = await this.syncHandler(item);
          } else {
            // Default mock sync logic: resolves successfully
            success = true;
          }
        } catch (err) {
          success = false;
          item.lastError = err instanceof Error ? err.message : String(err);
        }

        if (success) {
          item.status = "SYNCED";
          synced++;
        } else {
          item.retryCount += 1;
          item.status =
            item.retryCount >= OfflineSyncQueue.MAX_RETRIES ? "FAILED" : "PENDING";
          failed++;
        }
        this.saveItems(items);
      }

      // Purge items that have been successfully synced
      const remaining = this.getItems().filter((i) => i.status !== "SYNCED");
      this.saveItems(remaining);
    } finally {
      this.isSyncing = false;
    }

    return { synced, failed };
  }

  /**
   * Clear all items from queue
   */
  public clear(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem(OfflineSyncQueue.STORAGE_KEY);
    }
    this.notify();
  }

  /**
   * Setup auto-sync trigger on browser 'online' event
   */
  private initNetworkListeners(): void {
    if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
      window.addEventListener("online", () => {
        console.log("[OfflineSyncQueue] Network restored. Flushing pending queue...");
        this.flush().catch((err) =>
          console.error("[OfflineSyncQueue] Flush error:", err)
        );
      });
    }
  }

  /**
   * Check current online status safely
   */
  public isOnline(): boolean {
    if (typeof navigator !== "undefined" && "onLine" in navigator) {
      return navigator.onLine;
    }
    return true;
  }
}

export const offlineSyncQueue = new OfflineSyncQueue();
