/**
 * BottomNavBar Component
 * 3-button navigation matching "3 buttons - Zero typing" design philosophy.
 */

import React from "react";

export type ActiveScreen = "SOWING" | "AWD_OCR" | "HARVEST";

interface BottomNavBarProps {
  activeScreen: ActiveScreen;
  onScreenChange: (screen: ActiveScreen) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeScreen,
  onScreenChange,
}) => {
  return (
    <nav className="bottom-nav" data-testid="bottom-nav-bar">
      <button
        className={`nav-tab-btn ${activeScreen === "SOWING" ? "active" : ""}`}
        onClick={() => onScreenChange("SOWING")}
        data-testid="nav-btn-sowing"
      >
        <span className="tab-icon">🌾</span>
        <span>1. Gieo Sạ</span>
      </button>

      <button
        className={`nav-tab-btn ${activeScreen === "AWD_OCR" ? "active" : ""}`}
        onClick={() => onScreenChange("AWD_OCR")}
        data-testid="nav-btn-awd-ocr"
      >
        <span className="tab-icon">💧</span>
        <span>2. Vật Tư & AWD</span>
      </button>

      <button
        className={`nav-tab-btn ${activeScreen === "HARVEST" ? "active" : ""}`}
        onClick={() => onScreenChange("HARVEST")}
        data-testid="nav-btn-harvest"
      >
        <span className="tab-icon">🚜</span>
        <span>3. Thu Hoạch</span>
      </button>
    </nav>
  );
};
