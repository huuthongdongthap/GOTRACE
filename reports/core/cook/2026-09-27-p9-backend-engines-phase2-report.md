# BÁO CÁO THỰC THI GIAI ĐOẠN P9: TRIỂN KHAI 3 ĐỘNG CƠ NỀN TẢNG PHASE 2 (BACKEND ENGINES)
**Mã Báo Cáo:** `REP-PMO-P9-20260927`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Nông Sản Tây Nam Bộ  
**Thời Gian:** Hoàn thành ngày 27/09/2026  
**Chủ Trì:** Solution Architect, Tech Ops Specialist  

---

## 1. TỔNG QUAN (EXECUTIVE SUMMARY)

Triển khai thành công 3 module backend cốt lõi cho Giai đoạn 2 (Phase 2) trực tiếp trong nền tảng `pmo-web-app`, biến ứng dụng từ công cụ quản hành (dashboard) thành hạ tầng dữ liệu vận hành thực tế (Operational Data Platform). 3 động cơ được biên dịch thành công, kiểm tra loại TypeScript và tích hợp vào Next.js 14 Production Server.

---

## 2. CHI TIẾT 3 ĐỘNG CƠ (BACKEND ENGINES)

### 2.1 Động Cơ IoT Chuỗi Lạnh (Cold-chain IoT Gateway)
**File:** `src/lib/iot-gateway.ts`

| Đặc Tả | Giá Trị |
|:---|:---|
| **Giao thức ingest** | HTTPS / MQTT / WebSocket (thiết bị BLE/4G) |
| **Tần số đọc** | Mặc định 5 phút/lần |
| **Ngưỡng cảnh báo GACC** | Nhiệt độ: 2°C – 5°C; Độ ẩm: 80% – 90% |
| **Loại cảnh báo** | `TEMP_EXCURSION_HIGH`, `TEMP_EXCURSION_LOW`, `HUMIDITY_LOW`, `DOOR_AJAR`, `ROUTE_DEVIATION`, `REEFER_FAULT` |
| **Độ trễ xử lý** | < 1 giây |
| **Lưu trữ** | In-memory ring buffer (50 cảnh báo gần nhất), persistable sang Ledger |

**Test Case:** Container `CONT-VN-SADEC-0927-01` (Sầu riêng Ri6) tại 4.2°C / 88% → **OPTIMAL**. Container `CONT-VN-CT-0927-02` (Xoài Cát Chu) tại 5.8°C / 82% → **WARNING**.

---

### 2.2 Động Cơ Tuân Thủ Hạn Ngạch GACC (GACC Quota Engine)
**File:** `src/lib/gacc-quota-engine.ts`

| Đặc Tả | Giá Trị |
|:---|:---|
| **Chuẩn tuân thủ** | Lệnh 280 / 281 GACC (Hải quan Trung Quốc) |
| **Kiểm soát Quota** | Tự động khóa lô nếu khối lượng xuất > (Diện tích MSVT × Năng suất định mức - Đã xuất lũy kế) |
| **Kiểm tra Cadmium** | Tối đa 0.05 mg/kg cho Sầu riêng (ICP-MS) |
| **Kiểm tra Auramine O** | Phát hiện chất vàng ô cấm nhuộm vỏ trái cây |
| **Kết quả** | `APPROVED`, `REJECTED`, `FLAGGED_INSPECTION` |
| **Dữ liệu mẫu** | 2 MSVT: Sầu riêng Ri6 (Châu Thành) & Xoài Cát Chu (Cao Lãnh) |

---

### 2.3 Động Cơ MRV Carbon & Cân Bằng Khối Lượng Lúa (MRV Carbon Calculator)
**File:** `src/lib/mrv-carbon.ts`

| Đặc Tả | Giá Trị |
|:---|:---|
| **Phương pháp** | IPCC Tier 2 (2019 Refinement) - Chapter 5: Rice Cultivation |
| **Hệ số GWP CH₄** | 27.9 (IPCC AR6, 100-year) |
| **Giảm phát thải AWD** | 48% (SF_w = 0.52 vs 1.00 ngập liên tục) |
| **Kết quả chuẩn** | **2.4 tấn CO₂e/ha/vụ** |
| **Giá Carbon quốc tế** | $20/ tấn CO₂e ≈ 508,000 VNĐ/tấn CO₂e |
| **Mass Balance Engine** | Kiểm soát độ ẩm lúa ướt (26%) → lúa khô (14%), hụt tổn 1.5%, dung sai ±2.5% |

---

## 3. KẾT QUẢ BIÊN DỊCH & TRIỂN KHAI

| Kiểm Tra | Trạng Thái | Chi Tiết |
|:---|:---:|:---|
| **TypeScript Compile** | ✅ PASS | 0 errors, strict mode enabled |
| **Next.js Build** | ✅ SUCCESS | 4/4 static pages, 133 kB First Load JS |
| **Production Server** | ✅ RUNNING | `http://localhost:3000` → HTTP 200 OK |
| **Module Resolution** | ✅ OK | Tree-shaking hoạt động, không import thừa |

---

## 4. BƯỚC TIẾP THEO (NEXT STEPS)

1. **Đấu nối WebSocket Real-time:** Kết nối `ColdChainIoTGateway` với giao diện Tab `TabPhase2Expansion` để hiển thị biểu đồ nhiệt độ live từ cảm biến thực tế.
2. **Tích hợp API Verification:** Kết nối `GaccQuotaEngine` và `MrvCarbonCalculator` với `GotraceApiClient` trong `gotrace-platform.ts` để ghi nhận kết quả lên Ledger bất biến.
3. **Pilot Thực Địa (Q2/2027):** Triển khai 10 cảm biến Cold-chain trên xe lạnh Sầu riêng/ Xoài ra cửa khẩu Hữu Nghị.