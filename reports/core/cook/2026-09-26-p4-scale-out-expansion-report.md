# BÁO CÁO THỰC THI GIAI ĐOẠN P4: KẾ HOẠCH NHÂN RỘNG QUY MÔ (SCALE-OUT), PHỦ SÓNG TÂY NAM BỘ & CHUYỂN GIAO PMO
**Mã Báo Cáo:** `REP-PMO-P4-20260926`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Thực Phẩm Tây Nam Bộ  
**Thời Gian:** Tháng 4 – Tháng 6 (Sau 90 ngày thiết lập nền móng P0–P3)  
**Địa Bàn Mở Rộng:** Sa Đéc $\rightarrow$ Cụm KCN Trà Nóc & Thốt Nốt (Cần Thơ) $\rightarrow$ Cụm KCN Bến Lức & Đức Hòa (Long An) $\rightarrow$ Toàn vùng Tây Nam Bộ (13 Tỉnh ĐBSCL)  
**Chủ Trì:** PMO Lead (Người đại diện hợp pháp), Solution Architect & BD Lead  

---

## 1. MỤC TIÊU CHIẾN LƯỢC GIAI ĐOẠN P4 (SCALE-OUT TÂY NAM BỘ)

Sau khi hoàn thành xuất sắc 90 ngày thí điểm hạt nhân tại "Bàn đạp Sa Đéc" (P0 $\rightarrow$ P3) với doanh thu ARR đạt **196.000.000 VNĐ** từ 1 Bếp Anchor và 5 NCC vệ tinh, Giai đoạn P4 tập trung vào việc **nhân rộng theo mô hình vết dầu loang (Oil Spill Network Expansion)**:

| Chỉ Số Chiến Lược | Mục Tiêu P4 (Quý Tiếp Theo) | Tầm Nhìn Năm 1 (2026–2027) | Đơn Vị Đo Lường |
|:---|:---:|:---:|:---:|
| **Số Lượng Bếp Ăn Anchor Mới** | **8 Bếp Ăn** (3 Cần Thơ + 5 Long An) | **30 Bếp Ăn Anchor** | Điểm bếp ký hợp đồng SaaS |
| **Nhà Cung Cấp Đấu Nối GCI (Multiplier)** | **40 NCC Tier-2** (Tỷ lệ 1 : 5) | **150+ Nhà Cung Cấp Tier-2** | Tài khoản định danh GCI |
| **Doanh Thu Thuê Bao Thường Niên (ARR)** | **1.800.000.000 VNĐ** | **5.880.000.000 VNĐ** | VNĐ / Năm |
| **Thời Gian Traceback Toàn Mạng Lưới** | $\le 15$ Phút (Chuẩn hóa tự động) | $\le 60$ Giây (Zero-latency query) | Thời gian truy xuất rủi ro |
| **Chuyển Giao Nhân Sự Thực Địa** | **100% Tự Động Hóa** qua Web App | Chuyển giao hoàn toàn cho BQL Bếp | Tỷ lệ giảm tải Field Ops tại chỗ |

---

## 2. CHIẾN LƯỢC NHÂN RỘNG THEO CỤM ĐỊA BÀN (CLUSTER ROLLOUT STRATEGY)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   CHIẾN LƯỢC VẾT DẦU LOANG MỞ RỘNG TÂY NAM BỘ                          │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│  CỤM 1: BÀN ĐẠP SA ĐÉC   │  CỤM 2: TRÀ NÓC - CẦN THƠ│  CỤM 3: LONG AN (CỬA NGÕ TP.HCM) │
│  (Thực hiện xong P0-P3)  │  (Tháng 4 - Tháng 5)     │  (Tháng 5 - Tháng 6)             │
│                          │                          │                                  │
│ • 1 Bếp Anchor Sa Đéc    │ • 3 Bếp KCN Trà Nóc      │ • 5 Bếp Tập Đoàn FDI Long An     │
│ • 5 NCC Vệ tinh (GCI)    │ • 15 NCC Vệ tinh         │ • 25 NCC Vệ tinh                 │
│ • ARR: 196.000.000 đ     │ • Mục tiêu ARR: ~600M đ  │ • Mục tiêu ARR: ~1.2 Tỷ đ        │
│ • Trọng tâm: Tinh bột/Sợi│ • Trọng tâm: Thủy sản/Thịt│ • Trọng tâm: Suất ăn sạch FDI   │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

### 2.1 Cụm 2: KCN Trà Nóc & Thốt Nốt (Cần Thơ)
- **Đặc thù địa bàn:** Trung tâm công nghiệp chế biến cá tra, tôm và may mặc lớn nhất Tây Nam Bộ với mật độ công nhân tập trung cao (>30.000 công nhân).
- **Hồ sơ Anchor mục tiêu:**
  1. *Bếp ăn Nhà máy Chế biến Thủy sản Nam Việt (Navico) - Cần Thơ*: 3.500 suất/ngày.
  2. *Bếp ăn Cụm May Mặc Vinatex Cần Thơ*: 2.800 suất/ngày.
  3. *Nhà thầu Dịch vụ Suất ăn Công nghiệp Đại Chúng (Cung cấp cho KCN Thốt Nốt)*: 4.000 suất/ngày.
- **Mũi khoan tiếp cận:** Tận dụng quy định siết chặt kiểm dịch thú y và nguồn gốc thịt heo, thủy sản tươi sống theo QĐ 1246/QĐ-BYT kết hợp gói chẩn đoán 40M VND.

### 2.2 Cụm 3: Cụm KCN Bến Lức & Đức Hòa (Long An)
- **Đặc thù địa bàn:** Cửa ngõ kết nối Tây Nam Bộ và TP.HCM, quy tụ các tập đoàn đa quốc gia và doanh nghiệp FDI có yêu cầu khắt khe về ESG, tiêu chuẩn an toàn thực phẩm quốc tế và minh bạch chuỗi cung ứng.
- **Hồ sơ Anchor mục tiêu:**
  1. *Bếp ăn Tập đoàn Ching Luh (KCN Thuận Đạo, Bến Lức)*: >10.000 suất/ngày.
  2. *Bếp ăn Cụm Nhà máy Sản xuất Thực phẩm San Ha Food (Bến Lức)*: 2.500 suất/ngày.
  3. *Nhà thầu Quốc tế Aden Services / Sodexo tại KCN Đức Hòa III*: 5.000 suất/ngày.
- **Mũi khoan tiếp cận:** Khả năng tích hợp API sâu vào hệ thống ERP của các tập đoàn FDI qua Cổng Đấu Nối GOTRACE Platform (`/api/v1`) và tính năng truy vết tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu phụ huynh/người lao động.

---

## 3. ĐÓNG GÓI BÀN GIAO VẬN HÀNH TỰ ĐỘNG (AUTOMATED OPERATION HANDOVER)

Để đội ngũ PMO tiền phương có thể rút dần khỏi hiện trường Sa Đéc và mở rộng sang Cần Thơ – Long An mà chất lượng kiểm soát tại Sa Đéc không bị suy giảm, quy trình bàn giao 3 bước được thiết lập:

```
[BƯỚC 1: ĐÀO TẠO KCS NỘI BỘ] ──→ [BƯỚC 2: GIÁM SÁT ONLINE TỪ XA] ──→ [BƯỚC 3: TỰ ĐỘNG HÓA HOÀN TOÀN]
 (Cầm tay chỉ việc 1 tuần)           (PMO kiểm tra log tự động)           (KCS bếp ăn độc lập 100%)
```

### 3.1 Chuyển giao vai trò nhân sự tại cơ sở hạt nhân Sa Đéc
- **KCS / Thủ kho Bếp ăn:** Trở thành `Operator Party` độc lập trên `pmo-web-app`. Hàng ngày từ 05:00 – 07:00 sáng tự quét mã QR GCI trên cân điện tử, kiểm tra ngoại quan và ký biên bản điện tử.
- **Field Ops GOTRACE:** Chuyển đổi từ trực tiếp chốt cổng sang vai trò **Quality Assurance Officer (QAO)** từ xa. Hàng tuần chỉ kiểm tra xác suất và hỗ trợ kỹ thuật khi Rule Engine K01–K12 kích hoạt cảnh báo vi phạm.
- **Tiết kiệm định phí nhân sự PMO:** Cho phép 1 nhân sự Field Ops phụ trách đồng thời 5–8 bếp ăn anchor trong bán kính 30km.

---

## 4. BẢNG DỰ TOÁN TÀI CHÍNH & DÒNG TIỀN SCALE-OUT (6 THÁNG TIẾP THEO)

| Hạng Mục Tài Chính | Chi Phí Mở Rộng | Doanh Thu Dự Kiến | Dòng Tiền Ròng (Net Cashflow) |
|:---|:---:|:---:|:---:|
| **Tháng 4 (Mở rộng Cần Thơ)** | 120.000.000 VNĐ | 230.000.000 VNĐ | $+110.000.000$ VNĐ |
| **Tháng 5 (Mở rộng Long An Đợt 1)** | 145.000.000 VNĐ | 410.000.000 VNĐ | $+265.000.000$ VNĐ |
| **Tháng 6 (Phủ sóng Long An Đợt 2)** | 160.000.000 VNĐ | 680.000.000 VNĐ | $+520.000.000$ VNĐ |
| **TỔNG CỘNG QUÝ SCALE-OUT** | **425.000.000 VNĐ** | **1.320.000.000 VNĐ** | **$+895.000.000$ VNĐ (LÃI RÒNG)** |

> *Đánh giá Tài chính:* Nhờ cơ chế khấu trừ phí Diagnostic 40M chuyển thành Hợp đồng SaaS 150M và phí kết nối tài khoản NCC Tier-2 (6–12M/NCC), dự án tự tạo dòng tiền thặng dư ngay từ Tháng 4 mà không cần gọi thêm vốn đối ứng từ Ban Quản trị.

---

## 5. HẠ TẦNG KỸ THUẬT SẴN SÀNG CHO SCALE-OUT

Hệ thống công nghệ đã được nghiệm thu và sẵn sàng cho việc nhân rộng đa chi nhánh:
1. **PMO Web App Core:** Đã build production hoàn tất (`npm run build` 100% Green), vận hành ổn định trên nền tảng Next.js 14 với 11 tab chức năng.
2. **Cổng Đấu Nối GOTRACE Platform Gateway:** Đầy đủ API client, WebSocket subscription giả lập thời gian thực, cơ chế `OfflineSyncQueue` lưu trữ cục bộ khi rớt mạng, chuẩn hóa toàn diện 9 Primitives và mã định danh chuỗi toàn cầu GCI.
3. **Module In Ấn Biên Bản Thanh Tra ATTP:** Xuất biểu mẫu kiểm thực 3 bước và hồ sơ lưu mẫu 24h chuẩn hóa theo Quyết định 1246/QĐ-BYT với chữ ký số điện tử.

---

## 6. DANH MỤC HỒ SƠ TỔNG HỢP PMO 90 NGÀY

Toàn bộ chuỗi báo cáo thực thi từ P0 đến P4 đã được hoàn thiện trong kho tri thức dự án:
- `reports/core/cook/2026-09-26-p0-activation-report.md`: Thiết Lập Bộ Máy Tiền Phương & Kích Hoạt Pháp Lý.
- `reports/core/cook/2026-09-26-p1-diagnostic-report.md`: Mũi Khoan Trojan Horse & Bán Gói Diagnostic 40M.
- `reports/core/cook/2026-09-26-p2-live-pilot-report.md`: Triển Khai Live Pilot & Đấu Nối Ledger.
- `reports/core/cook/2026-09-26-p3-saas-conversion-report.md`: Nghiệm Thu Giá Trị, Ký SaaS & Kích Hoạt Hệ Số Nhân 1:4.8.
- `reports/core/cook/2026-09-26-p4-scale-out-expansion-report.md`: Kế Hoạch Nhân Rộng Quy Mô (Scale-Out) & Phủ Sóng Tây Nam Bộ.
