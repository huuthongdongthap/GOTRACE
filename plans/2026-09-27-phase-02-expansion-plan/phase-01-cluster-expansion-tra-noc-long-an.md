# GIAI ĐOẠN 2 - PHÂN KỲ 01: KHAI MẠC MỞ RỘNG CỤM TRÀ NÓC & LONG AN (M1)
**Mã Tài Liệu:** `PLN-PHASE2-P01-CLUSTER-EXPANSION`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Thực Phẩm Tây Nam Bộ  
**Thời Gian Thực Hiện:** Tuần 1 – Tuần 4 (Q2/2027)  
**Địa Bàn:** TP. Cần Thơ (KCN Trà Nóc) $\rightarrow$ Long An (KCN Bến Lức, KCN Đức Hòa)  
**Chủ Quản:** PMO Lead (Người đại diện hợp pháp), Field Ops Specialist, Solution Architect, BD Reps  

---

## 1. MỤC TIÊU CHIẾN LƯỢC CỦA PHÂN KỲ (OBJECTIVES)

1. **Thành Lập & Đi Vào Hoạt Động Cần Thơ Regional Hub:** 
   - Đặt văn phòng điều phối khu vực tại TP. Cần Thơ, kết nối trực tiếp Cụm Logistics Trà Nóc và Ban Quản lý các Khu Chế xuất & Công nghiệp Cần Thơ (CEPIZA).
2. **Ký Hợp Đồng Dịch Vụ Chẩn Đoán (Diagnostic Service) 3 Bếp Mới:**
   - 1 Bếp ăn công nghiệp KCN Trà Nóc (quy mô 3.000 suất/ngày).
   - 1 Bếp ăn công nhân KCN Bến Lức (quy mô 2.500 suất/ngày).
   - 1 Bếp ăn KCN Đức Hòa kết hợp cụm trường học bán trú (quy mô 2.000 suất/ngày).
   - Tổng giá trị doanh thu chẩn đoán: $3 \times 40.000.000\text{ VNĐ} = 120.000.000\text{ VNĐ}$ (khấu trừ vào HĐ SaaS).
3. **Bàn Giao & Lắp Đặt Hardware Kit Chuẩn Phase 1 Tại 3 Cổng Bếp:**
   - Cung cấp và cấu hình 3 bộ Hardware Kit (Máy tính bảng PWA IP67, Cân điện tử kết nối BLE, Máy in tem nhiệt Bluetooth, Tủ lưu mẫu chuyên dụng $2^\circ\text{C} - 8^\circ\text{C}$).
4. **Kích Hoạt Mạng Lưới Đấu Nối 20 Nhà Cung Cấp (NCC) Tier-2:**
   - Cấp mã GCI định danh cho các nhà cung cấp đạm (thịt heo, gà), trứng gia cầm, rau củ và tinh bột liên tỉnh.

---

## 2. KẾ HOẠCH HÀNH ĐỘNG TUẦN TỰ (WEEK-BY-WEEK ACTIONS)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        LỘ TRÌNH 4 TUẦN KHAI MẠC MỞ RỘNG (M1)                           │
├────────────────────┬────────────────────┬─────────────────────┬────────────────────────┤
│  TUẦN 1: HUB SETUP │  TUẦN 2: B2B SALES │  TUẦN 3: HARDWARE   │  TUẦN 4: GATE GO-LIVE  │
├────────────────────┼────────────────────┼─────────────────────┼────────────────────────┤
│ • Khai trương Cần  │ • Làm việc CEPIZA  │ • Lắp Tablet, Cân,  │ • Đào tạo thủ kho      │
│   Thơ Regional Hub │   và BQL Long An   │   Máy in BLE 3 Gate │ • Chạy Gate Verification│
│ • Họp điều phối    │ • Khảo sát 3 Bếp   │ • Cấu hình Wi-Fi /  │ • Ký biên bản bàn giao │
│   Field Ops đa tỉnh│ • Ký 3 HĐ Diag     │   Sim 4G Fallback   │   bước kiểm thực QĐ1246│
└────────────────────┴────────────────────┴─────────────────────┴────────────────────────┘
```

### Tuần 1: Thiết Lập Cần Thơ Hub & Kiện Toàn Nhân Sự Đa Tỉnh
- Thuê mặt bằng văn phòng điều phối Cần Thơ Hub (đường 30/4 hoặc KDC Nam Long, Cái Răng, thuận tiện di chuyển QL91 đi Trà Nóc và QL1A đi Hậu Giang, Sóc Trăng).
- Tiếp nhận 6 nhân sự mới (1 Tech Ops Lead, 1 GIS/IoT Specialist, 2 Field Ops Cần Thơ, 2 BD Reps Long An).
- Phân luồng dữ liệu PMO Web App thành 3 Node độc lập: Sa Đéc Node, Cần Thơ Node, Long An Node trên nền tảng Gateway.

### Tuần 2: Tiếp Cận B2B/B2G & Ký Kết Hợp Đồng Diagnostic
- Trình bày giải pháp GOTRACE V2.2 và báo cáo thành công tại Bếp Sa Đéc với BQL KCN Trà Nóc và BQL KCN Bến Lức.
- Ký 3 Hợp đồng Dịch vụ Khảo sát & Chẩn đoán Rủi ro Chuỗi Tiếp Nhận Thực Phẩm (40.000.000 VNĐ/Hợp đồng).
- Cử Field Ops vào bếp thực hiện đợt audit ban đầu: đánh giá quy trình tiếp nhận, kiểm thực 3 bước thực tế, lưu mẫu 24h và kiểm tra cảm quan.

### Tuần 3: Cung Ứng & Lắp Đặt Hardware Kit Đồng Bộ
- Bàn giao 3 bộ thiết bị tiêu chuẩn tại 3 cổng tiếp nhận:
  - Máy tính bảng chuyên dụng Galaxy Tab Active4 Pro (Chuẩn quân đội IP68, chống va đập, màn hình cảm ứng khi đeo găng tay ướt).
  - Cân điện tử Ohaus Defender 3000 (Giao tiếp Bluetooth Low Energy, truyền khối lượng tự động lên App).
  - Máy in tem nhiệt cầm tay Bixolon SPP-R310 (Chống nước nhẹ, in nhãn GCI dán hộp mẫu lưu).
  - 4 Cảm biến nhiệt độ BLE Inkbird IBS-TH2 gắn trong xe lạnh của NCC và tủ lưu mẫu.
- Cấu hình mạng nội bộ và kích hoạt cơ chế `OfflineSyncQueue` trên thiết bị tablet của nhân viên kiểm thực.

### Tuần 4: Đào Tạo Nhân Sự Bếp & Kích Hoạt Gate Verification Live
- Huấn luyện 3 ca làm việc (05:00 – 07:00 sáng) của nhân viên bếp:
  - Kỹ thuật quét mã QR GCI từ phiếu giao hàng của NCC.
  - Đọc tự động khối lượng từ cân BLE và nhiệt độ xe lạnh.
  - Xử lý các tình huống vi phạm Gate Rules (nhiệt độ thịt > $5^\circ\text{C}$, thiếu giấy thú y, bột có mùi chua).
- Kích hoạt quy trình Kiểm thực 3 bước số hóa và in biểu mẫu nghiệm thu theo Quyết định 1246/QĐ-BYT.

---

## 3. ĐỊNH MỨC TÀI CHÍNH & DỰ TOÁN NGÂN SÁCH M1

| Hạng Mục Chi Tiết | Đơn Vị Tính | Số Lượng | Đơn Giá (VNĐ) | Thành Tiền (VNĐ) | Ghi Chú |
|:---|:---:|:---:|:---:|:---:|:---|
| **Thuê văn phòng Cần Thơ Hub (6 tháng)** | Tháng | 6 | 20.000.000 | 120.000.000 | Cọc 2 tháng, thanh toán 4 tháng |
| **Setup bàn ghế, mạng cáp quang, biển hiệu** | Gói | 1 | 45.000.000 | 45.000.000 | Tiêu chuẩn văn phòng tiền phương |
| **Hardware Kit Bếp Trà Nóc** | Bộ | 1 | 38.500.000 | 38.500.000 | Tablet IP68, Cân BLE, Máy in, Sensor |
| **Hardware Kit Bếp Bến Lức** | Bộ | 1 | 38.500.000 | 38.500.000 | Chuẩn đồng bộ |
| **Hardware Kit Bếp Đức Hòa** | Bộ | 1 | 38.500.000 | 38.500.000 | Chuẩn đồng bộ |
| **Công tác phí, di chuyển đa tỉnh (4 tuần)** | Tuần | 4 | 15.000.000 | 60.000.000 | Đội ngũ Field Ops & BD |
| **Chi phí Workshop & B2G Engagement** | Gói | 1 | 35.000.000 | 35.000.000 | Làm việc với Chi cục ATTP & BQL KCN |
| **TỔNG CỘNG M1** | — | — | — | **375.500.000** | Trích từ Scale-out Fund |

---

## 4. MA TRẬN PHÂN CÔNG TRÁCH NHIỆM (RACI)

| Nhiệm Vụ | PMO Lead | Solution Architect | Field Ops Trà Nóc | Field Ops Long An | BD Lead |
|:---|:---:|:---:|:---:|:---:|:---:|
| Thuê và thiết lập Cần Thơ Hub | **A/R** | C | I | I | C |
| Đàm phán và ký HĐ Diagnostic 3 Bếp | **A** | I | I | I | **R** |
| Phân bổ tài khoản Multi-tenant trên Gateway | A | **R** | I | I | I |
| Bàn giao & cài đặt Hardware Kit | A | C | **R** | **R** | I |
| Huấn luyện trực tiếp nhân viên bếp | A | I | **R** | **R** | I |
| Đối soát dữ liệu tuần đầu tiên | A | **R** | R | R | I |

---

## 5. TIÊU CHÍ NGHIỆM THU CỘT MỐC M1 (GATE 1 PASS CRITERIA)

1. **Hợp đồng & Doanh thu:** Ký kết thành công 3 HĐ Diagnostic với tổng doanh thu $\ge 120.000.000\text{ VNĐ}$.
2. **Kỹ thuật:** 3 Cổng Bếp kích hoạt thành công tài khoản trên `pmo-web-app` và truyền dữ liệu telemetry về hệ thống.
3. **Vận hành:** 100% các chuyến giao hàng sáng sớm (05:00 – 07:30) trong tuần thứ 4 được quét mã và kiểm tra theo 12 Kitchen Rules.
4. **Pháp lý:** 100% biên bản kiểm thực 3 bước và lưu mẫu 24h xuất trình được bản PDF/In ấn có mã xác thực Ledger khi cơ quan y tế kiểm tra đột xuất.
