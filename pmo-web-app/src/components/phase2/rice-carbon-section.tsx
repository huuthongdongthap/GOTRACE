"use client";

import React from "react";
import { RiceCarbonEngine } from "./rice-carbon-engine";
import { RiceMassBalanceWidget } from "./rice-mass-balance-widget";

export function RiceCarbonSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiceCarbonEngine />
        </div>
        <div className="lg:col-span-1">
          <RiceMassBalanceWidget />
        </div>
      </div>
    </div>
  );
}
