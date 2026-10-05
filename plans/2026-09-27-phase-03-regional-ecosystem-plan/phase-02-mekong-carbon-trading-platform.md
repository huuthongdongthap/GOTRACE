# GIAI ĐOẠN 3 - PHÂN KỲ 02: SÀN GIAO DỊCH TÍN CHỈ CARBON MRV NÔNG NGHIỆP TÂY NAM BỘ
**Mã Tài Liệu:** `PLN-PHASE3-P02-CARBON-TRADING`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Nông Sản Tây Nam Bộ  
**Thời Gian:** Tháng 9 – Tháng 16 (2028 – 2029)  
**Chủ Quản:** Head of Carbon Solutions, Strategy Officer, Fintech Lead  

---

## 1. TỔNG QUAN THỊ TRƯỜNG & CƠ HỘI

- **Đề án 1 Triệu Hecta Lúa Phát Thải Thấp (Bộ NN&PTNT):** Dự kiến tạo ra hàng triệu tấn giảm phát thải $\text{CO}_2\text{e}$ mỗi năm từ kỹ thuật canh tác AWD và xử lý rơm rạ.
- **Thị trường mua Bắt Buộc & Tự Nguyện:** Các tập đoàn xuất khẩu thực phẩm, hàng tiêu dùng (Vinamilk, TH True Milk, Heineken, Unilever) và doanh nghiệp sản xuất FDI tại Việt Nam chịu áp lực trung hòa carbon (Net Zero 2050 và thuế biên giới Carbon CBAM của EU).
- **Vấn đề cốt lõi:** Thị trường thiếu hạ tầng đối soát dữ liệu tin cậy (MRV chống gian lận và chống tính hai lần - Double Counting).

---

## 2. KIẾN TRÚC SÀN GIAO DỊCH CARBON GOTRACE (CARBON EXCHANGE PLATFORM)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        KIẾN TRÚC SÀN GIAO DỊCH TÍN CHỈ CARBON GOTRACE                  │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ 1. DATA INGESTION & MRV  │ 2. VERIFICATION & MINTING   │ 3. TRADING & RETIREMENT       │
│                          │                             │                               │
│ • IoT Mực nước đồng ruộng│ • Smart Contract IPCC Tier 2│ • Sàn giao dịch P2P & B2B     │
│ • Ảnh vệ tinh Sentinel-2 │ • Bureau Veritas / SGS Audit│ • Đơn giá chuẩn: $20/tấn CO2e │
│ • Log nhật ký nông dân   │ • Chống Double-counting     │ • Tiêu hủy tín chỉ (Retire)   │
│ • Primitive CLAIM        │ • Primitive VERIFICATION    │ • Chứng thư bù trừ Net-Zero   │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

### 2.1 Chuẩn Hóa Dữ Liệu MRV Đầu Vào
- Tích hợp động cơ `MrvCarbonCalculator` (đã hoàn thiện tại Phase 2) trực tiếp với dữ liệu cảm biến phao nước IoT ngoài cánh đồng và ảnh viễn thám Sentinel-2 để tự động đối chiếu các chu kỳ khô nước (Water Drawdown Cycles).
- Ghi nhận vào Primitive `CLAIM`: Lưu vết tọa độ Polygon GIS cánh đồng, giống lúa, phân bón và ngày rút nước.

### 2.2 Quy Trình Thẩm Định & Đúc Tín Chỉ (Verification & Issuance)
1. **Kiểm toán bên thứ ba (Third-party Audit):** Dữ liệu được các tổ chức độc lập (SGS, Bureau Veritas, Cục Trồng Trọt) cấp chứng nhận trực tuyến qua API GOTRACE.
2. **Đúc Tín Chỉ (Digital Carbon Certificate):** Mỗi tấn $\text{CO}_2\text{e}$ giảm phát thải được gắn một mã định danh duy nhất (`GT:VN:CARBON:2028:...`).

### 2.3 Cơ Chế Giao Dịch & Bù Trừ (Retirement)
- Doanh nghiệp người mua mua tín chỉ trực tiếp trên Portal GOTRACE.
- 75% giá trị bán tín chỉ được chuyển trực tiếp vào tài khoản ngân hàng của Nông dân / Hợp tác xã thông qua tài khoản liên kết.
- 25% là phí hạ tầng dữ liệu và chi phí kiểm định độc lập của GOTRACE.
- Khi doanh nghiệp dùng tín chỉ để báo cáo kiểm kê khí nhà kính, tín chỉ được gắn cờ `RETIRED` trên sổ cái GOTRACE, triệt tiêu 100% rủi ro gian lận bán trùng.

---

## 3. MỤC TIÊU DOANH THU & TÁC ĐỘNG

| Chỉ Số | Năm 2028 | Năm 2029 |
|:---|:---:|:---:|
| **Diện tích lúa áp dụng MRV** | 150.000 Ha | 500.000 Ha |
| **Sản lượng tín chỉ phát hành** | 360.000 Tấn $\text{CO}_2\text{e}$ | 1.200.000 Tấn $\text{CO}_2\text{e}$ |
| **Giá trị thị trường ($20/tấn)** | 7.200.000 USD | 24.000.000 USD |
| **Phí dịch vụ GOTRACE (25%)** | 1.800.000 USD (~45.7 tỷ VNĐ) | 6.000.000 USD (~152 tỷ VNĐ) |
| **Thu nhập tăng thêm cho Nông dân** | ~137 tỷ VNĐ | ~457 tỷ VNĐ |
