/**
 * OfflineStatusBar Component
 * Displays real-time connectivity status, pending offline events, and manual sync action.
 */

import React, { useEffect, useState } from "react";
import { offlineSyncQueue } from "../services/offlineQueue.js";
import { apiClient } from "../services/api.js";

interface OfflineStatusBarProps {
  onSyncCompleted?: () => void;
}

export const OfflineStatusBar: React.FC<OfflineStatusBarProps> = ({ onSyncCompleted }) => {
  const [isOnline, setIsOnline] = useState(apiClient.isOnline());
  const [pendingCount, setPendingCount] = useState(offlineSyncQueue.getPendingCount());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const unsubscribe = offlineSyncQueue.subscribe((items) => {
      setPendingCount(
        items.filter((i) => i.status === "PENDING" || i.status === "FAILED").length
      );
    });

    const updateOnline = () => setIsOnline(apiClient.isOnline());
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    const interval = setInterval(() => {
      setIsOnline(apiClient.isOnline());
    }, 1000);

    return () => {
      unsubscribe();
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
      clearInterval(interval);
    };
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await offlineSyncQueue.flush();
      if (onSyncCompleted) onSyncCompleted();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div
      className={`offline-banner ${isOnline ? "online" : ""}`}
      data-testid="offline-status-banner"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span>{isOnline ? "🟢 Trực tuyến (4G)" : "🔴 Mất sóng bờ ruộng"}</span>
        {pendingCount > 0 && (
          <span style={{ fontWeight: 700 }} data-testid="pending-queue-badge">
            • Đang chờ đồng bộ: {pendingCount}
          </span>
        )}
      </div>
      {pendingCount > 0 && isOnline && (
        <button
          className="sync-now-btn"
          onClick={handleManualSync}
          disabled={isSyncing}
          data-testid="manual-sync-btn"
        >
          {isSyncing ? "Đang gửi..." : "Đồng bộ ngay"}
        </button>
      )}
    </div>
  );
};
