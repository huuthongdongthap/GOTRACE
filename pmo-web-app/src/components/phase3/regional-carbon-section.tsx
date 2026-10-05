"use client";

import React, { useState } from "react";
import { Coins, Send, FileCheck } from "lucide-react";
import {
  carbonTradingEngine,
  CarbonCreditListing,
  CarbonTradeOrder,
} from "@/lib/carbon-trading-engine";

export function RegionalCarbonSection() {
  const [listings, setListings] = useState<CarbonCreditListing[]>(() => carbonTradingEngine.getAllListings());
  const [tradeHistory, setTradeHistory] = useState<CarbonTradeOrder[]>(() => carbonTradingEngine.getTradeHistory());
  const [selectedListingId, setSelectedListingId] = useState<string>("LIST-RICE-TM-01");
  const [buyerName, setBuyerName] = useState("Tập Đoàn Masan Consumer (ESG Offset)");
  const [purchaseTons, setPurchaseTons] = useState(50);
  const [tradeMessage, setTradeMessage] = useState<string | null>(null);

  const selectedListing = listings.find((l) => l.listing_id === selectedListingId) || listings[0];

  const handleExecuteTrade = () => {
    const res = carbonTradingEngine.executeTrade(selectedListingId, buyerName, purchaseTons);
    if ("error" in res) {
      setTradeMessage(`❌ ${res.error}`);
    } else {
      const payoutVnd = ((res.farmer_payout_usd * 25400) / 1000000).toFixed(1);
      setTradeMessage(`✅ Bù trừ: ${res.retirement_certificate_hash}. Nông dân nhận: $${res.farmer_payout_usd.toLocaleString()} (~${payoutVnd}M VNĐ)`);
      setListings([...carbonTradingEngine.getAllListings()]);
      setTradeHistory([...carbonTradingEngine.getTradeHistory()]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Trading Execution Box */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Sàn Khớp Lệnh Tín Chỉ Carbon MRV ĐBSCL</h3>
                <p className="text-xs text-slate-400">Nông dân AWD ↔ Doanh nghiệp mua tín chỉ Net Zero</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              $20.0 / Tấn CO2e
            </span>
          </div>

          {/* Verified Listings Selector */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">
              Lô Tín Chỉ Lúa AWD Đã Kiểm Định (ISO 14064-2):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {listings.map((l) => (
                <button
                  key={l.listing_id}
                  onClick={() => setSelectedListingId(l.listing_id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    selectedListingId === l.listing_id
                      ? "bg-slate-800 border-emerald-500 shadow-md shadow-emerald-500/10"
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{l.seller_cooperative}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                      {l.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 mt-1">{l.certificate_id}</div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                    <span>Khả dụng: <strong className="text-emerald-400">{l.available_credits_tons} Tấn</strong></span>
                    <span>{l.verification_body}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-emerald-400" /> Khớp Lệnh Mua & Tiêu Hủy (Retirement)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400">Tổ Chức / Doanh Nghiệp Mua:</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium"
                />
              </div>
              <div>
                <label className="text-slate-400">
                  Khối Lượng Mua (Tối đa {selectedListing.available_credits_tons} tấn):
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedListing.available_credits_tons}
                  value={purchaseTons}
                  onChange={(e) => setPurchaseTons(parseInt(e.target.value) || 0)}
                  className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 text-[10px]">Tổng Giá Trị:</span>
                <div className="font-bold text-cyan-400 text-sm">
                  ${(purchaseTons * 20).toLocaleString()} USD
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">Nông Dân (75%):</span>
                <div className="font-bold text-emerald-400 text-sm">
                  ${(purchaseTons * 20 * 0.75).toLocaleString()} USD
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">Phí GOTRACE (25%):</span>
                <div className="font-bold text-amber-400 text-sm">
                  ${(purchaseTons * 20 * 0.25).toLocaleString()} USD
                </div>
              </div>
            </div>

            <button
              onClick={handleExecuteTrade}
              disabled={selectedListing.available_credits_tons === 0}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Coins className="w-4 h-4" /> Khớp Lệnh & Phát Hành Chứng Thư Tiêu Hủy
            </button>

            {tradeMessage && (
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs leading-relaxed">
                {tradeMessage}
              </div>
            )}
          </div>
        </div>

        {/* Right: Settled Trade Orders History */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Lịch Sử Giao Dịch</h3>
                <p className="text-xs text-slate-400">Chứng thư tiêu hủy chống Double-counting</p>
              </div>
            </div>

            <div className="space-y-3 mt-4 overflow-y-auto max-h-[460px] pr-1">
              {tradeHistory.map((th) => (
                <div
                  key={th.order_id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white truncate max-w-[160px]">{th.buyer_entity}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                      {th.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>{th.purchased_tons} tấn</span>
                    <span className="text-cyan-400 font-mono">${th.gross_value_usd.toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 truncate pt-1 border-t border-slate-800">
                    {th.retirement_certificate_hash}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800">
            Chứng thư được băm SHA-256 trên Ledger GOTRACE
          </div>
        </div>
      </div>
    </div>
  );
}
