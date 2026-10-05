/**
 * GoTRACE Zalo Mini App "Thư Ký Số HTX"
 * Main App Component orchestrating 3-screen navigation and mobile frame preview.
 */

import React, { useState } from "react";
import { MobileDeviceFrame } from "./components/MobileDeviceFrame.js";
import { ActiveScreen } from "./components/BottomNavBar.js";
import { Screen1Sowing } from "./screens/Screen1Sowing.js";
import { Screen2AwdOcr } from "./screens/Screen2AwdOcr.js";
import { Screen3Harvest } from "./screens/Screen3Harvest.js";

export const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("SOWING");

  return (
    <MobileDeviceFrame
      activeScreen={activeScreen}
      onScreenChange={setActiveScreen}
    >
      {activeScreen === "SOWING" && <Screen1Sowing />}
      {activeScreen === "AWD_OCR" && <Screen2AwdOcr />}
      {activeScreen === "HARVEST" && <Screen3Harvest />}
    </MobileDeviceFrame>
  );
};

export default App;
