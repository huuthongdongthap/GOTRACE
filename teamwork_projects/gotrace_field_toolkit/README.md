# GoTRACE Field Integration Toolkit

Comprehensive technical integration toolkit connecting physical agricultural touchpoints in the Mekong Delta (Tây Nam Bộ) into the GoTRACE data infrastructure platform.

## Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        GoTRACE FIELD INTEGRATION TOOLKIT ARCHITECTURE                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [TOUCHPOINT 1: WEIGHBRIDGE]           [TOUCHPOINT 2: COOPERATIVE FARMER]              │
│  ┌───────────────────────────────┐     ┌──────────────────────────────────────────┐    │
│  │ Virtual Weighbridge Simulator │     │ Zalo Mini App "Thư ký số HTX"            │    │
│  │ (Toledo / CAS / Yaohua PTY)   │     │ (3-button UX, Zero-typing, Mobile Web)   │    │
│  └───────────────┬───────────────┘     └────────────────────┬─────────────────────┘    │
│                  │ Serial Stream                            │ OfflineSyncQueue / HTTP  │
│                  ▼                                          ▼                          │
│  ┌───────────────────────────────┐     ┌──────────────────────────────────────────┐    │
│  │ IoT Weighbridge Edge Bridge   │     │ Mobile Field Gateway                     │    │
│  │ • Ring Buffer & Noise Filter  │     │ • Screen 1: Sowing / GIS MSVT            │    │
│  │ • Stable Weight Engine (2.5s) │     │ • Screen 2: AWD Water & OCR / 1Mha MRV   │    │
│  │ • EVENT: WEIGHED Packaging    │     │ • Screen 3: Harvest Request & HarvestLot │    │
│  │ • EVIDENCE: WEIGHT_TICKET     │     └────────────────────┬─────────────────────┘    │
│  │   (Canonical JCS + SHA-256)   │                          │                          │
│  └───────────────┬───────────────┘                          │                          │
│                  │                                          │                          │
│                  └────────────────────┬─────────────────────┘                          │
│                                       ▼                                                │
│                 ┌───────────────────────────────────────────┐                          │
│                 │ Common Data Contract & GCI Validator      │                          │
│                 │ (VN.<PROVINCE>.<PRIMITIVE>.<SUBTYPE>.<ID>)│                          │
│                 └─────────────────────┬─────────────────────┘                          │
│                                       ▼                                                │
│  [TOUCHPOINT 3: ENTERPRISE ERP/WMS]                                                    │
│  ┌──────────────────────────────────────────────────────────┐                          │
│  │ Two-Way ERP/WMS Connector API (Bravo / MISA / SAP)       │                          │
│  │ • OpenAPI 3.0 RESTful Endpoints & Webhook Ingestion      │                          │
│  │ • Delivery Order / E-invoice LOT Extraction Engine       │                          │
│  │ • TRANSACTION: CUSTODY_TRANSFER Mapper                   │                          │
│  │ • Dynamic QR Code (PNG/SVG) & Zebra ZPL Label Generator  │                          │
│  └────────────────────────────────────┬─────────────────────┘                          │
│                                       ▼                                                │
│  [INTEGRATION & VERIFICATION]                                                          │
│  ┌──────────────────────────────────────────────────────────┐                          │
│  │ End-to-End Test Harness & Benchmark Suite (< 500ms)      │                          │
│  │ (45,000kg Intake Flow, Cryptographic & GCI Cert)         │                          │
│  └──────────────────────────────────────────────────────────┘                          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

## Monorepo Packages

1. **`packages/edge_bridge`** (Milestone M1):
   - Industrial serial parsers: Mettler Toledo IND570 (18B continuous), CAS CI-200A (22B streaming), Yaohua XK3190 (12/16B reverse).
   - RingBuffer circular stream filter rejecting mechanical jitter & packet noise.
   - Sliding-window weight stabilizer ($T_w = 2.5\text{s}$, $N = 25$ samples at 10Hz, $\Delta W \le 5\text{ kg}$).
   - RFC 8785 Canonical JSON (JCS) serializer and SHA-256 immutable ticket hasher.
   - `EVENT: WEIGHED` and `EVIDENCE: WEIGHT_TICKET` packaging.
   - Global Chain Identifier (GCI) validator and generator (`VN.<PROV>.PLACE.WEIGH_STATION.<ID>`).
   - Virtual Weighbridge Simulator (TCP socket, EventEmitter, CLI).

2. **`packages/zalo_mini_app`** (Milestone M2):
   - Mobile web app with 3-button UX ("Zero typing").
   - Screen 1: Sowing / GIS MSVT mapping.
   - Screen 2: AWD water level logger & chemical bag OCR & 1Mha MRV Carbon calculation.
   - Screen 3: Harvest request & `LOT: HarvestLot` generation.
   - Offline-first FIFO sync queue.

3. **`packages/erp_connector`** (Milestone M3):
   - OpenAPI 3.0 RESTful API service.
   - Delivery Order & E-invoice webhook ingestion with HMAC-SHA256 authentication.
   - LOT extraction & lineage verification.
   - `TRANSACTION: CUSTODY_TRANSFER` mapping.
   - Dynamic QR Code (PNG/SVG) and Zebra ZPL industrial label generator.

4. **`packages/test_harness`** (Milestone M4):
   - End-to-End integration test suite (Tiers 1–5).
   - Cryptographic and GCI certification verifiers.
   - Latency benchmark suite asserting $< 500\text{ms}$ SLA across complete 45,000kg intake flow.

## Getting Started

### Prerequisites
- Node.js >= 22.0.0
- TypeScript >= 5.0.0

### Running Tests
```bash
# Run edge bridge tests
npm run test:edge

# Or directly with Node 22 native test runner
node --experimental-strip-types --test packages/edge_bridge/tests/**/*.test.ts
```

### Running Virtual Weighbridge Simulator CLI
```bash
# Start TCP streaming server at port 9100 with Yaohua protocol for 45,000kg truck
node --experimental-strip-types packages/edge_bridge/src/simulator/cli.ts --protocol YAOHUA --weight 45000 --port 9100
```
