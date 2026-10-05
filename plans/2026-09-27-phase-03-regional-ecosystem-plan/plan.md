# KẾ HOẠCH CHIẾN LƯỢC GIAI ĐOẠN 3 — HỆ SINH THÁI DỮ LIỆU VÙNG TÂY NAM BỘ
**Giai đoạn thực hiện:** 2028 – 2029 (24 Tháng)  
**Địa bàn:** 7 Tỉnh/Thành ĐBSCL (Long An, Đồng Tháp, Cần Thơ, Hậu Giang, Sóc Trăng, Bạc Liêu, Cà Mau)  
**Chủ trì:** PMO Regional Directorate (Cần Thơ Regional Command Hub)  

---

## 1. MỤC TIÊU CHIẾN LƯỢC (OBJECTIVES & KPIs)

| Trọng Tâm | Mục Tiêu Cụ Thể | Chỉ Số Đo Lường (KPI 2028-2029) |
|:---|:---|:---|
| **Độ phủ Địa lý** | Phủ kín 7 tỉnh/thành trọng điểm Tây Nam Bộ | 7 Văn phòng Điều phối Tỉnh; 3 Edge Computing Data Centers |
| **Quy mô Mạng lưới** | Mở rộng mô hình Bếp ăn Anchor và NCC vệ tinh | 300 Bếp Anchor (KCN/Trường học); 500 Nhà cung cấp Tier-2 |
| **Hạ tầng Dữ liệu Lúa & Carbon** | Tích hợp Đề án 1Mha Lúa chất lượng cao, phát thải thấp | 500.000 Ha lúa canh tác AWD có số hóa MRV; 1.2M tín chỉ Carbon/năm |
| **Chuỗi Trái cây & Thủy sản** | Mở rộng sang Tôm Cà Mau, Cá Tra Cần Thơ, Trái cây | 100% lô xuất khẩu GACC có GIS Polygon và Telemetry Cold-chain |
| **Chỉ số Tài chính** | Khẳng định vị thế Hạ tầng Dữ liệu Chuỗi Cung ứng số 1 | ARR: 85 – 120 Tỷ VNĐ; EBITDA Margin $\ge 35\%$ |

---

## 2. CẤU TRÚC PHÂN KỲ THỰC THI (PHASE STRUCTURE)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        LỘ TRÌNH 24 THÁNG PHASE 3: REGIONAL ECOSYSTEM                   │
├────────────────────────────┬────────────────────────────┬──────────────────────────────┤
│ PHÂN KỲ 01 (Tháng 1 – 8)   │ PHÂN KỲ 02 (Tháng 9 – 16)  │ PHÂN KỲ 03 (Tháng 17 – 24)   │
│ Multi-Tenant & FSaaS       │ Carbon Trading Platform    │ 7 Provinces Network Scale    │
│                            │                            │                              │
│ • Cloud Multi-tenant K8s   │ • Sàn Giao Dịch Carbon ĐBSCL│ • Onboard 300 Bếp Anchor     │
│ • Subdomain per tenant     │ • Kết nối Masan, Vinamilk  │ • Kích hoạt 500 NCC Tier-2   │
│ • Gói FSaaS chuẩn QĐ 1246  │ • Tích hợp Verra Registry  │ • Doanh thu ARR 100+ Tỷ VNĐ  │
│ • Edge Nodes Cần Thơ/Cà Mau│ • ISO 14064-2 Verification │ • Chuẩn bị IPO / Series B    │
└────────────────────────────┴────────────────────────────┴──────────────────────────────┘
```

1. **Phân kỳ 01:** [`phase-01-multi-tenant-architecture-fsaas.md`](./phase-01-multi-tenant-architecture-fsaas.md) — Kiến trúc Multi-tenant Cloud & Mô hình Food Safety as a Service (FSaaS).
2. **Phân kỳ 02:** [`phase-02-mekong-carbon-trading-platform.md`](./phase-02-mekong-carbon-trading-platform.md) — Sàn Giao Dịch Tín Chỉ Carbon MRV Nông Nghiệp Tây Nam Bộ.
3. **Phân kỳ 03:** [`phase-03-7-provinces-rollout-cadence.md`](./phase-03-7-provinces-rollout-cadence.md) — Kế Hoạch Đổ Bộ 7 Tỉnh, Quy Mô 300 Bếp Anchor & Tự Chủ Tài Chính.

---

## 3. TỔNG HỢP NGUỒN LỰC & NGÂN SÁCH

| Hạng Mục Đầu Tư | Dự Toán (VNĐ) | Nguồn Tài Trợ |
|:---|:---:|:---|
| **Hạ Tầng Cloud Multi-region & Edge Computing** | 3.500.000.000 | Series A Equity |
| **Phát Triển Sàn Giao Dịch Carbon & IoT Registry** | 2.800.000.000 | Quỹ Đổi Mới Sáng Tạo Xanh |
| **Thiết Lập 7 Trạm Điều Phối Tỉnh & Đội Ngũ Hiện Trường (35 FTE)** | 9.600.000.000 | Dòng tiền hoạt động (Re-invested ARR) |
| **Marketing B2B, Hội Thảo Chuỗi & Pháp Lý Quốc Tế** | 1.800.000.000 | Ngân sách Vận hành |
| **Dự Phòng Rủi Ro Thị Trường (10%)** | 1.770.000.000 | Quỹ Dự phòng |
| **TỔNG CỘNG** | **19.470.000.000** | Hoàn vốn sau 14 tháng |
