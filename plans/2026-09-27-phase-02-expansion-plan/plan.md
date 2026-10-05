# KẾ HOẠCH TRIỂN KHAI GIAI ĐOẠN 2 — MỞ RỘNG ĐA TỈNH & CHỨNG MINH PHỨC TẠP
**Giai đoạn:** Q2/2027 – Q4/2027 (6–12 Tháng)  
**Chủ quản:** PMO Tây Nam Bộ (Cần Thơ Hub)  
**Bối cảnh:** Kết thúc Phase 1 Go-Live tại Sa Đéc (Đồng Tháp), mở rộng ra Cần Thơ & Long An, chuẩn bị cho Phase 3 quy mô vùng.

---

## 1. MỤC TIÊU CHIẾN LƯỢC (PHASE 2 STRATEGIC OBJECTIVES)

| Trục Chiến Lược | Mục Tiêu Cụ Thể | Chỉ Số Đo Lường (KPI) |
|:---|:---|:---|
| **Chứng minh Độ phức tạp (Complexity Proof)** | Triển khai thành công 2 chuỗi **Phân nhánh (Branching)**: Trái cây xuất khẩu (GACC) & Lúa gạo 1Mha | 100% lô hàng trái cây có MSVT GIS Polygon & Cold-chain IoT traceable; Đối soát 1Mha AWD data |
| **Mở rộng Địa lý (Multi-Province Expansion)** | Kích hoạt 3 Cụm Bếp Anchor mới: Trà Nóc (Cần Thơ), Bến Lức, Đức Hòa (Long An) | 4 Bếp Anchor active (1 Sa Đéc + 3 mới); 20 NCC Tier-2 kết nối GCI |
| **Tích hợp Phần cứng Nâng cao** | Triển khai IoT Container Cold-chain & Cổng kiểm tra X-quang/Metal detector tại KCN | 100% container có telemetry real-time; 0 vụ trả hàng cửa khẩu do nhiệt độ |
| **Doanh thu & Quy mô** | Đạt ARR 17.55 tỷ VNĐ (Năm 2), tổng lưới 150 NCC vệ tinh | Breakeven Month 11; 90 Bếp Anchor onboard Năm 2 |

---

## 2. CẤU TRÚC 4 CỘT MỐC TRIỂN KHAI (PHASE 2 MILESTONES)

| Mốc | Tên | Thời Gian | Đầu Ra Chính (Deliverables) | Chi Tiết Kế Hoạch |
|:---|:---|:---:|:---|:---|
| **M1** | **Khai Mạc Mở Rộng Cụm Trà Nóc & Long An** | Tuần 1–4 (Q2/2027) | Ký HĐ Diagnostic 3 Bếp mới; Bàn giao Hardware Kit chuẩn Phase 1 | [`phase-01-cluster-expansion-tra-noc-long-an.md`](./phase-01-cluster-expansion-tra-noc-long-an.md) |
| **M2** | **Triển Khai Chuỗi Trái Cây (Branching) & GACC Compliance** | Tuần 5–12 | MSVT GIS Polygon trên GOTRACE Ledger; Cold-chain IoT Dashboard; Báo cáo Lệnh 280 GACC | [`phase-02-branching-fruit-gacc-compliance.md`](./phase-02-branching-fruit-gacc-compliance.md) |
| **M3** | **Tích Hợp Đề Án 1Mha Lúa Phát Thải Thấp & MRV Carbon** | Tuần 8–20 | Đấu nối API Bộ NN&PTNT; Tích hợp dữ liệu AWD; Tự động phát sinh Tín chỉ CO2e ($20/tấn) | [`phase-03-linear-rice-mrv-carbon.md`](./phase-03-linear-rice-mrv-carbon.md) |
| **M4** | **Nghiệm Thu Phase 2 & Chốt Kế Hoạch Phase 3** | Tuần 21–24 | Báo cáo Phase 2 (`REP-PMO-Phase2-2027`); Kế hoạch Phase 3 Regional Ecosystem; Trình duyệt BOD | [`phase-04-phase2-acceptance-phase3-plan.md`](./phase-04-phase2-acceptance-phase3-plan.md) |

---

## 3. CHI TIẾT TRIỂN KHAI TỪNG CHUỖI CUNG ỨNG (SUPPLY CHAIN DEEP DIVE)

### 3.1 Chuỗi Trái Cây Xuất Khẩu — Đồ Thị Phân Nhánh (Branching Graph) & GACC Compliance
**Nỗi đau cốt lõi:** Lệnh 280 GACC (Trung Quốc) yêu cầu truy xuất hoàn chỉnh từ vườn (MSVT) đến cửa khẩu. Rủi ro Cadmium/Vàng ô (Durian) & Residue (Mango).

| Hành Động Triển Khai | Công Cụ GOTRACE | KPI |
|:---|:---|:---|
| Số hóa Mã Số Vùng Trồng (MSVT) thành **GIS Polygon** trên Primitive `PLACE` | `GotraceApiClient.createPlace({geometry: GeoJSONPolygon})` | 100% vườn có tọa độ Polygon validated |
| Gắn cảm biến **IoT Cold-chain** (Nhiệt độ, Độ ẩm, GPS) vào Container | `TelemetryData` stream qua WebSocket | Real-time alert nếu $> 5^\circ\text{C}$ hoặc lệch tuyến đường |
| Tự động đối soát **Hạn ngạch xuất khẩu** (Quota) vs Lô hàng thực tế | `Transaction` primitive + Smart Contract logic | 0% lô hàng vượt ngạch / thiếu giấy phép |
| Tích hợp **Cổng X-quang/Metal Detector** tại KCN Trà Nóc | Edge Gateway + Rule Engine K01-K12 mở rộng | Phát hiện dị vật vật lý trước khi xuất kho |

### 3.2 Chuỗi Lúa Gạo 1 Triệu Hecta — Tích Hợp MRV Carbon (Linear Chain at Scale)
**Nỗi đau cốt lõi:** Đo lường, Báo cáo, Xác minh (MRV) canh tác AWD (Alternate Wetting and Drying) để nhận Tín chỉ Carbon.

| Hành Động Triển Khai | Công Cụ GOTRACE | KPI |
|:---|:---|:---|
| Thu thập dữ liệu **Canh tác AWD** qua App nông dân / Drone / IoT nước | `Event` chain: `IRRIGATION_START` $\rightarrow$ `IRRIGATION_END` $\rightarrow$ `WATER_LEVEL_LOG` | 100% lô lúa có chuỗi sự kiện nước đầy đủ |
| Tự động tính toán **Giảm phát thải CH4** theo phương pháp IPCC | `VerificationEngine` + External MRV API | Xuất báo cáo MRV chuẩn ISO 14064-2 |
| Phát hành **Tín chỉ Carbon** ($20/tấn CO2e) gắn vào `LOT` lúa/gạo | `Claim` (Carbon Credit) + `Verification` (3rd party) | Doanh thu phụ từ Carbon Credit cho Tổng công ty Lúa hạt nhân |

### 3.3 Mở Rộng Mô Hình Bếp Ăn Tập Thể (Converging Chain) — Nhân Rộng 1:5
**Cơ chế:** Mỗi Bếp Anchor mới ký SaaS $\rightarrow$ Kéo 5 NCC Tier-2 (Thịt, Trứng, Rau, Bột, Dầu/Gia vị).

| Cụm Mới | Bếp Anchor Mục Tiêu | NCC Tier-2 Dự Kiến | Ghi Chú |
|:---|:---|:---|:---|
| **Trà Nóc (Cần Thơ)** | Bếp ăn KCN Trà Nóc (3.000 suất) + 2 Trường THPT | 15 NCC | Trung tâm Logistics trái cây $\rightarrow$ Cold-chain IoT quan trọng |
| **Bến Lức (Long An)** | Bếp ăn KCN Bến Lức (2.500 suất) | 12 NCC | Gần TP.HCM, chuỗi đạm & rau ngắn |
| **Đức Hòa (Long An)** | Bếp ăn KCN Đức Hòa + Trường học huyện | 8 NCC | Kết nối chuỗi bột Sa Đéc qua đường bộ |

---

## 4. NÂNG CẤP KỸ THUẬT NỀN TẢNG (PLATFORM UPGRADES FOR PHASE 2)

| Module | Mô Tả Nâng Cấp | File/Module Liên Quan |
|:---|:---|:---|
| **GIS Polygon Engine** | Hỗ trợ `GeoJSONPolygon` validation, tính diện tích, kiểm tra chồng lấn MSVT | `src/lib/gotrace-platform.ts` → `PLACE` primitive |
| **Cold-chain IoT Gateway** | Ingest telemetry MQTT/HTTPS từ 100+ container đồng thời, alert real-time | New: `src/lib/iot-gateway.ts` |
| **GACC Quota Engine** | Smart contract logic kiểm soát hạn ngạch theo HS Code & Quốc gia nhập | New: `src/lib/gacc-quota-engine.ts` |
| **MRV Carbon Calculator** | Tích hợp phương pháp IPCC Tier 2, xuất báo cáo JSON cho Verra/Gold Standard | New: `src/lib/mrv-carbon.ts` |
| **Multi-tenant SaaS Billing** | Hệ thống thanh toán theo Bếp Anchor + Tier-2 NCC (Usage-based pricing) | Extend: `src/lib/billing.ts` |

---

## 5. NGÂN SÁCH & NGUỒN VỐN (PHASE 2 BUDGET)

| Hạng Mục | Chi Phí Ước Tính (VNĐ) | Nguồn Vốn |
|:---|:---:|:---:|
| **Hạ tầng Cloud & IoT Gateway Scale-up** | 1.200.000.000 | Scale-out Fund (Quyết nghị 3 BOD) |
| **Hardware 3 Cụm Mới (Tablet, Cân, IoT, X-quang)** | 850.000.000 | Scale-out Fund |
| **Nhân sự Mở rộng (12 FTE: Tech, Field, BD, GIS, IoT)** | 3.600.000.000 | Doanh thu Phase 1 + Series A Bridge |
| **Tích hợp MRV Carbon & GACC API (Dev + Legal)** | 1.500.000.000 | Strategic Partnership Fund |
| **Marketing, PR, Workshop Onboard NCC** | 600.000.000 | Operating Budget |
| **Dự phòng (15%)** | 1.162.500.000 | — |
| **TỔNG CỘNG** | **8.912.500.000** | — |

---

## 6. MA TRẬN RACI PHASE 2 (KEY ROLES)

| Hoạt Động | PMO Lead | Tech Lead | GIS/IoT Specialist | Field Ops (x4) | BD Reps (x4) | Legal/Compliance |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| Triển khai MSVT GIS Polygon | A | R | **R** | C | I | C |
| Lắp đặt & vận hành Cold-chain IoT | A | **R** | **R** | R | I | I |
| Tích hợp GACC Quota API | A | **R** | C | I | C | **R** |
| Onboard 3 Bếp Anchor mới | **A/R** | C | I | **R** | **R** | C |
| Ký SaaS & Thu tiền Bếp mới | **A/R** | I | I | I | **R** | **A** |
| Báo cáo MRV Carbon cho Tổng công ty Lúa | A | **R** | C | I | C | C |

---

## 7. TIÊU CHÍ NGHIỆM THU PHASE 2 (GATE 2 SUCCESS CRITERIA)

1. **Kỹ thuật:** 3 Bếp Anchor mới Go-Live 100% Rule Engine; 2 Chuỗi Branching (Trái cây, Lúa) có dữ liệu Ledger hoàn chỉnh.
2. **Pháp lý:** 0 vi phạm Lệnh 280 GACC; 100% lô trái cây có MSVT Polygon + Cold-chain log.
3. **Thương mại:** ARR đạt ≥ 15 tỷ VNĐ; 90 Bếp Anchor trong pipeline; 150 NCC Tier-2 active.
4. **Tài chính:** Dòng tiền hoạt động dương từ Tháng 5 Phase 2; Hoàn vốn Scale-out Fund.
5. **Sẵn sàng Phase 3:** Kiến trúc Multi-tenant, Multi-region, Multi-commodity đã ổn định.

---

## 8. RỦI RO CHÍNH & GIẢI PHÁP (RISK MITIGATION)

| Rủi Ro | Mức Độ | Giảm Thiểu (Mitigation) |
|:---|:---:|:---|
| **GACC thay đổi quy định bất ngờ** | Cao | Duy trì kênh liên lạc trực tiếp với Cục Quản lý chất lượng NN (NAFIQAD); Thiết kế Quota Engine cấu hình linh hoạt |
| **Nông dân không hợp tác thu thập dữ liệu AWD** | Trung Bình | An bài toán lợi ích: Tín chỉ Carbon = Tiền mặt; Hỗ trợ App miễn phí + Đào tạo tại xã |
| **Mất kết nối Internet tại vườn/KCN vùng sâu** | Trung Bình | IoT Gateway có chế độ Edge Computing (xử lý cục bộ, sync khi có mạng); LoRaWAN backup |
| **Cạnh tranh từ ERP lớn (VinERP, FPT.eFactory)** | Thấp | Tập trung vào **Niche An toàn Thực phẩm + Truy xuất nguồn gốc** — ERP không có Ledger bất biến & GCI chuẩn |