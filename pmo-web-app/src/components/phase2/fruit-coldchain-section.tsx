"use client";

import React, { useState } from "react";
import { FruitContainerTelemetry } from "./fruit-container-telemetry";
import { FruitGaccAuditWidget } from "./fruit-gacc-audit-widget";

export function FruitColdchainSection() {
  const [selectedContainer, setSelectedContainer] = useState("CONT-VN-SADEC-0927-01");

  const containerProfiles = [
    {
      id: "CONT-VN-SADEC-0927-01",
      cargo: "Sầu Riêng Ri6 (18.5 Tấn)",
      origin: "Vườn Chú Năm, Châu Thành, Đồng Tháp",
      polygonId: "MSVT-DT-CR-7810",
      destination: "Cửa Khẩu Hữu Nghị (Lạng Sơn) -> GACC",
      route: "Đồng Tháp -> TP.HCM -> QL1A -> Hà Nội -> Lạng Sơn",
    },
    {
      id: "CONT-VN-CT-0927-02",
      cargo: "Xoài Cát Chu Cao Lãnh (22.0 Tấn)",
      origin: "HTX Xoài Mỹ Xương, Cao Lãnh",
      polygonId: "MSVT-DT-XOAI-9902",
      destination: "Cảng Cát Lái -> Hải quan Thượng Hải",
      route: "Cao Lãnh -> Cao tốc Trung Lương -> Cát Lái",
    },
  ];

  const currentCont =
    containerProfiles.find((c) => c.id === selectedContainer) ||
    containerProfiles[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FruitContainerTelemetry
            containerProfiles={containerProfiles}
            selectedContainer={selectedContainer}
            onSelectContainer={setSelectedContainer}
          />
        </div>
        <div className="lg:col-span-1">
          <FruitGaccAuditWidget polygonId={currentCont.polygonId} />
        </div>
      </div>
    </div>
  );
}
