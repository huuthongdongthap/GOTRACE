# BÁO CÁO THỰC THI GIAI ĐOẠN P1: MŨI KHOAN TROJAN HORSE & BÁN GÓI DIAGNOSTIC
**Mã Báo Cáo:** `REP-PMO-P1-20260926`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Thực Phẩm Tây Nam Bộ  
**Thời Gian:** Tuần 3 – Tuần 6 (Ngày 15 – Ngày 45)  
**Điểm Bứt Phá:** Hội Bột Sa Đéc & 2 Bếp Ăn Anchor (Trường học & KCN)  

---

## 1. MỤC TIÊU CHIẾN LƯỢC P1

| KPI | Cơ Sở (Before) | Mục Tiêu P1 (After 30 Ngày) | Trạng Thái |
|:---|:---:|:---:|:---:|
| **Số Anchor Ký Diagnostic** | 0 | **$\ge 1$ Hợp đồng (30–50M VNĐ)** | ⬜ Chờ thực thi |
| **Số NCC Tinh Bột Onboard** | 0 | **3 Lò Bột Sa Đéc (GCI lô 18h)** | ⬜ Chờ thực thi |
| **Kiểm Toán Rủi Ro 4 Trụ Cột** | 0 | **1 Báo cáo Khoảng Trống Dữ Liệu** | ⬜ Chờ thực thi |

---

## 2. CHIẾN THUẬT MŨI KHOAN TINH BỘT SA ĐÉC (TROJAN HORSE WEDGE)

### 2.1 Tham Gia Hội Ngành Bột Sa Đéc & Làng Nghề Tân Phú Đông
- **Mục tiêu:** Ký thỏa thuận hợp tác (MOU) với Ban Quản lý Làng nghề Bột và Hội Ngành Hàng Bột Sa Đéc.
- **Hành động:**
  1. Thuyết trình mô hình "Hộ chiếu số sản phẩm xuất khẩu" cho các lò bột và HTX.
  2. Chuẩn hóa quy trình: **Sản xuất $\rightarrow$ Cấp mã GCI $\rightarrow$ Giao hàng $\le 6$h $\rightarrow$ Quét mã tại cổng bếp ăn**.
  3. Trang bị bộ Kit thử nhanh Tinopal/Formol/Hàn the tại 3 lò hạt nhân (Bột Năm Hòa, Hủ tiếu Sa Giang, Bà Sâm).

### 2.2 3 Lò Bột Hạt Nhân Cấp Mã GCI (`GT:VN:ITEM:SADEC-FD:...`)
| Lò Bột / HTX | Mặt Hàng | Mã GCI Mẫu | Điều Kiện Giao Hàng | Rủi Ro Kiểm Soát |
|:---|:---|:---:|:---|:---|
| **Bột Năm Hòa** | Bột lọc Sa Đéc nguyên chất | `GT:VN:ITEM:SADEC-FD:BN-...` | Giao $\le 4$h sau xay, temp $<30^\circ$C | K10 (Shelf-life 18h), K11 (Tinopal) |
| **Hủ Tiếu Sa Giang** | Sợi hủ tiếu tươi truyền thống | `GT:VN:ITEM:SADEC-FD:SG-...` | Giao $\le 5$h, bao bì không khí | K10, K12 (nếu dùng trứng trong nước sôi) |
| **Bà Sâm / HTX Bún** | Bún tươi Sa Đéc | `GT:VN:ITEM:SADEC-FD:BS-...` | Giao $\le 6$h, temp $<25^\circ$C | K10, K11 |

---

## 3. TIẾP CẬN 2 BẾP ĂN ANCHOR & BÁN GÓI DIAGNOSTIC 30–50M VNĐ

### 3.1 Mẫu Hồ Sơ Bếp Ăn Mục Tiêu (ICP Scoring)

| Bếp Ăn Anchor | Loại Hình | Quy Mô | ICP Score (NVS) | Nỗi Đau Tử Huyệt (Pain Point) |
|:---|:---|:---:|:---:|:---|
| **Trường Tiểu Học A (Sa Đéc)** | Học đường bán trú | 800 suất/ngày | **88/100** | Kiểm thực 3 bước thủ công, sợ thanh tra 1246, không có dữ liệu Mass Balance |
| **Bếp Ăn KCN Sa Đéc (Công Ty X)** | Khu Công Nghiệp | 2.500 suất/ngày | **92/100** | Cung ứng 5+ NCC rời rạc, thất thoát nguyên liệu ~7%, áp lực ISO 22000 |

### 3.2 Quy Trình Bán Hàng 11 Bước (Từ Playbook `docs/08_Sales_Discovery_Playbook.md`)

```
[B1: Sàng Lọc ICP]      → [B2: Giả Thiết Nỗi Đau]  → [B3: Mở Cửa Qua Sở Ngành]
       ↓                        ↓                         ↓
[B4: Cuộc Gọi Khám Phá]   → [B5: Chào Bán Diagnostic]  → [B6: Khảo Sát Hiện Trường 2 Tuần]
       ↓                        ↓                         ↓
[B7: Báo Cáo Khoảng Trống]  → [B8: Đề Xuất Pilot SOW]    → [B9: Kích Hoạt Live Pilot]
       ↓                        ↓                         ↓
[B10: Chứng Minh Giá Trị]   ─────────────────────────────→ [B11: Ký Hợp Đồng SaaS Enterprise]
```

### 3.3 Cấu Trúc Gói Diagnostic Dữ Liệu Chuỗi (30–50M VNĐ / 2–4 Tuần)
| Gói Dịch Vụ | Phạm Vi | Bàn Giao (Deliverables) | Cam Kết Khấu Trừ |
|:---|:---|:---|:---|
| **Diagnostic Standard** | 1 Bếp Ăn + 3 NCC Tinh Bột | 1. Live LOT Test (bấm giờ truy vết thủ công vs số)  <br>2. Ma trận 12 rủi ro K01–K12 <br>3. Báo cáo Tuân thủ QĐ 1246 <br>4. Data Gap Analysis Report | **100% phí (30–50M) khấu trừ vào Hợp đồng SaaS 120–180M/năm** |
| **Diagnostic Deep-Dive** | + NCC Đạm, Trứng, Rau | Toàn bộ Standard + đối soát 100% công thức món ăn (Recipe Reconciliation) | **100% phí khấu trừ** |

---

## 4. KIỂM TOÁN RỦI RO 4 TRỤ CỘT TẠI BẾP ĂN ANCHOR (K01–K12)

| Trụ Cột | Rủi Ro Trọng Yếu (Top 3) | Quy Tắc Áp Dụng (K01–K12) | Hành Động Khắc Phục (Remediation) |
|:---|:---|:---|:---|
| **Tinh Bột (Starch)** | 1. Sợi tươi xuất kho >18h <br>2. Phụ gia Tinopal/Formol <br>3. Không có mã lô truy xuất | **K10, K11, K03** | Bắt buộc cấp GCI tại lò, Kit thử nhanh tại cổng, chặn nhập nếu vi phạm |
| **Đạm (Protein)** | 1. Nhiệt độ thịt giao >5°C <br>2. Thiếu Giấy Kiểm Dịch Thú Y <br>3. Cắt đứt chuỗi lạnh kho >-12°C | **K02, K04, K07** | IoT cảm biến nhiệt độ xe lạnh, kiểm tra chứng từ tại cổng, cảnh báo SMS |
| **Trứng (Egg)** | 1. Vỏ nứt vỡ >2% <br>2. Không tiệt trùng UV <br>3. Salmonellosis vỏ trứng | **K12** | Chiếu đèn buồng khí, tiệt trùng vỏ, chặn lô dập vỡ >2% |
| **Rau Củ (Veg)** | 1. Dư lượng BVTV vượt chuẩn <br>2. Thiếu mã VietGAP <br>3. Kim loại nặng (Rau lá) | **K11, K03** | Yêu cầu kết quả xét nghiệm Lab ISO 17025, mã VietGAP bắt buộc |

---

## 5. ĐẦU RA P1 (EVIDENCE ĐỂ VÀO P2)

1. **Hợp đồng Dịch Vụ Diagnostic** đã ký & thu tiền cọc 50% (15–25M VNĐ).
2. **Danh sách 3 NCC Tinh Bột** đã cấp mã GCI và tích hợp Rule Engine K10/K11.
3. **Báo Cáo Khoảng Trống Dữ Liệu (Data Gap Analysis)** trình bày trực tiếp trước HĐQT/Ban Giám Hiệu.
4. **Bản Đề Xuất Triển Khai Thí Điểm (Pilot SOW)** với lộ trình kỹ thuật, SLA Traceback $\le 15$ phút.

---

## 6. CỔNG KIỂM SOÁT NGÀY 30 (GATE 30) — PASS / FAIL CRITERIA

| Tiêu Chí | Ngưỡng PASS | Trạng Thái Hiện Tại |
|:---|:---:|:---:|
| Ký $\ge 1$ Hợp đồng Diagnostic | ✅ Có / ❌ Không | ⬜ Chờ tuần 4–5 |
| Onboard $\ge 3$ NCC Tinh Bột GCI | ✅ $\ge 3$ / ❌ $< 3$ | ⬜ Chờ tuần 3–4 |
| Hoàn tất Data Gap Analysis 4 Trụ cột | ✅ Bàn giao / ❌ Chưa | ⬜ Chờ tuần 5–6 |

---

## 7. TÀI LIỆU LIÊN KẾT
- Kế hoạch 90 Ngày: [`plans/90_DAY_FIELD_EXECUTION_PLAN.md`](../../plans/90_DAY_FIELD_EXECUTION_PLAN.md)
- Sales Playbook 11 Bước: [`docs/08_Sales_Discovery_Playbook.md`](../../docs/08_Sales_Discovery_Playbook.md)
- Kitchen Rules K01–K12: [`docs/05_Kitchen_Playbook.md`](../../docs/05_Kitchen_Playbook.md)