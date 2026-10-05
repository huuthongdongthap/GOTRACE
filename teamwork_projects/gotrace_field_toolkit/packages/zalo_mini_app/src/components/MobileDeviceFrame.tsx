/**
 * MobileDeviceFrame Component
 * Preview wrapper simulating a physical smartphone running the Zalo Mini App.
 */

import React, { useState } from "react";
import { BottomNavBar, ActiveScreen } from "./BottomNavBar.js";
import { apiClient } from "../services/api.js";
import { MOCK_FARMER_PROFILE } from "../services/gisMatcher.js";

interface MobileDeviceFrameProps {
  activeScreen: ActiveScreen;
  onScreenChange: (screen: ActiveScreen) => void;
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  activeScreen,
  onScreenChange,
  children,
}) => {
  const [isOnline, setIsOnline] = useState(apiClient.isOnline());

  const toggleNetwork = () => {
    const nextState = !isOnline;
    apiClient.setNetworkStatus(nextState);
    setIsOnline(nextState);
    // Dispatch native event for listeners
    window.dispatchEvent(new Event(nextState ? "online" : "offline"));
  };

  return (
    <div className="simulator-wrapper" data-testid="mobile-simulator-wrapper">
      {/* Top simulation control toolbar */}
      <div className="simulator-controls" data-testid="simulator-controls">
        <span>Mô Phỏng Trải Nghiệm Thực Địa (Zalo Mini App):</span>
        <button
          className={`network-toggle-btn ${!isOnline ? "offline" : ""}`}
          onClick={toggleNetwork}
          data-testid="toggle-network-btn"
        >
          {isOnline ? "Đổi sang Mất sóng (Offline)" : "Đổi sang Có 4G (Online)"}
        </button>
      </div>

      {/* Mobile Device Frame */}
      <div className="device-frame" data-testid="device-frame">
        {/* Notch */}
        <div className="phone-notch" />

        {/* Status Bar */}
        <div className="phone-status-bar">
          <span>09:41</span>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span>{isOnline ? "LTE 4G" : "No Service ⚠️"}</span>
            <span>100% 🔋</span>
          </div>
        </div>

        {/* Zalo Header */}
        <header className="zalo-header" data-testid="zalo-mini-app-header">
          <div className="zalo-title">
            <h1>Thư ký số HTX • GoTRACE</h1>
            <span>{MOCK_FARMER_PROFILE.fullName} ({MOCK_FARMER_PROFILE.phone})</span>
          </div>
          <div className="coop-badge" title={MOCK_FARMER_PROFILE.cooperativeName}>
            HTX Thắng Lợi
          </div>
        </header>

        {/* Dynamic Screen Content */}
        <main className="app-content">{children}</main>

        {/* 3-Button Bottom Navigation */}
        <BottomNavBar
          activeScreen={activeScreen}
          onScreenChange={onScreenChange}
        />
      </div>
    </div>
  );
};
