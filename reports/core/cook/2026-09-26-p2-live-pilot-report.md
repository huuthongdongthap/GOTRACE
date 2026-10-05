# BÁO CÁO THỰC THI GIAI ĐOẠN P2: TRIỂN KHAI LIVE PILOT & ĐẤU NỐI LEDGER
**Mã Báo Cáo:** `REP-PMO-P2-20260926`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Thực Phẩm Tây Nam Bộ  
**Thời Gian:** Tuần 7 – Tuần 10 (Ngày 46 – Ngày 75)  
**Địa Bàn Thí Điểm:** Bếp Ăn Anchor Sa Đéc (Quy mô 1.500–2.500 suất/ngày)  
**Chủ Trì:** PMO Lead, Tech Lead / Solution Architect & 2 Field Ops  

---

## 1. MỤC TIÊU CHIẾN LƯỢC P2

| KPI | Cơ Sở (Baseline) | Mục Tiêu P2 | Đơn Vị Đo Lường |
|:---|:---:|:---:|:---:|
| **Số NCC 4 Trụ Cột Đấu Nối GCI** | 0 | **4 NCC Hạt Nhân** (Bột, Thịt, Trứng, Rau) | Mã GCI chuẩn hóa |
| **Tỷ Lệ Kiểm Thực Số Hóa (QĐ 1246)** | 0% (Sổ giấy) | **100% Lô Hàng Nhập Cổng** | Bản ghi trên Web App |
| **Thời Gian Traceback Diễn Tập (Fire Drill)** | 24–48 Giờ | **$\le 15$ Phút** | Phút (Bấm giờ thực địa) |
| **Tỷ Lệ Chặn Tự Động Vi Phạm (K01–K12)** | 0% (Cảm tính) | **100% Vi phạm được Flag & Chặn** | Rule Engine Logs |

---

## 2. ĐẤU NỐI 4 NHÀ CUNG CẤP HẠT NHÂN VÀO HỆ THỐNG GCI

Hệ thống định danh toàn cầu GOTRACE cấp phát mã định danh chuỗi hội tụ 4 Trụ cột thực phẩm cung ứng hàng ngày vào bếp ăn:

```
[Lò Bột Năm Hòa / Sa Giang]  ──(GCI Lô Bột 18h)──┐
[Trại Heo / Lò Mổ Cần Thơ]    ──(GCI Thịt Lạnh)───┼──→ [CỔNG BẾP ĂN ANCHOR]
[Trại Gà Trứng Ba Huân]      ──(GCI Trứng UV)────┤    (Cân điện tử + Rule Engine)
[HTX Rau An Toàn Sa Đéc]     ──(GCI VietGAP)─────┘
```

### 2.1 Bảng Cấu Hình Mã Định Danh GCI & Tiêu Chuẩn Tiếp Nhận Cổng
| Trụ Cột | Đơn Vị Cung Ứng | Mã GCI Quy Chuẩn | Ngưỡng Kiểm Soát Chặn Cổng (Gate Rule) |
|:---|:---|:---|:---|
| **Tinh Bột** | Lò Bột Năm Hòa (Sa Đéc) | `GT:VN:ITEM:SADEC-FD:BN-BOTLOC-01` | **K10:** Giờ xuất xưởng $\le 18$h; **K11:** Kit thử Formol/Tinopal Âm tính. |
| **Đạm** | Trại Heo CP / Lò Mổ Cần Thơ | `GT:VN:ITEM:CT-MEAT:PORK-THITHEO-01` | **K02:** Nhiệt độ giao hàng $\le 5^\circ$C; **K04:** Có Giấy Kiểm dịch Thú y số hóa. |
| **Trứng** | Trại Trứng Ba Huân ĐBSCL | `GT:VN:ITEM:BH-EGG:GA-TRUNGGA-01` | **K12:** Tỷ lệ nứt dập $\le 2\%$; Có dấu chứng nhận chiếu xạ tiệt trùng UV. |
| **Rau Củ** | HTX Rau An Toàn Tân Khánh Đông | `GT:VN:ITEM:TKD-VEG:RAU-CAIXANH-01` | **K11:** Dư lượng BVTV âm tính test nhanh; Mã VietGAP còn hiệu lực. |

---

## 3. SỐ HÓA KIỂM THỰC 3 BƯỚC & LƯU MẪU 24H (QUYẾT ĐỊNH 1246/QĐ-BYT)

Quy trình vận hành hiện trường của 2 Field Ops tại chốt tiếp nhận cổng (05:00 – 07:30 sáng mỗi ngày):

```
┌────────────────────────────────────────────────────────────────────────┐
│                   QUY TRÌNH KIỂM THỰC 3 BƯỚC SỐ HÓA                    │
├────────────────────────────────────────────────────────────────────────┤
│  BƯỚC 1: KIỂM TRA TRƯỚC KHI NHẬP THỰC PHẨM (05:00 - 07:00)             │
│  • Quét QR/Barcode GCI lô hàng trên cân điện tử kết nối máy tính bảng   │
│  • Ghi nhận tự động: Khối lượng, Nhiệt độ giao, Cảm quan, Giấy tờ thú y│
│  • Rule Engine K01-K12 chạy tự động: PASS / QUARANTINE / REJECT        │
├────────────────────────────────────────────────────────────────────────┤
│  BƯỚC 2: KIỂM TRA TRONG QUÁ TRÌNH CHẾ BIẾN (08:00 - 10:30)            │
│  • Ghi nhận nhiệt độ nấu chín tâm thực phẩm (Thịt $\ge 75^\circ$C)     │
│  • Xác nhận điều kiện vệ sinh dụng cụ dao thớt sống/chín riêng biệt    │
├────────────────────────────────────────────────────────────────────────┤
│  BƯỚC 3: KIỂM TRA TRƯỚC KHI ĂN & LƯU MẪU 24H (10:30 - 11:30)           │
│  • Niêm phong hộp lưu mẫu inox vô trùng ($\ge 100g$/món)               │
│  • Nhập tủ lưu mẫu 2–8°C, kích hoạt đồng hồ đếm ngược 24h trên Web App │
│  • Xuất PDF Biên Bản Kiểm Thực 3 Bước có chữ ký điện tử phục vụ thanh tra│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. KẾT QUẢ DIỄN TẬP PHẢN ỨNG SỰ CỐ THỰC ĐỊA (FIRE DRILL SIMULATION)

### 4.1 Kịch Bản Diễn Tập Sự Cố Giả Định
- **Thời điểm kích hoạt:** 13:30 (sau giờ ăn trưa học sinh/công nhân 90 phút).
- **Tình huống:** Y tế trường học báo cáo 3 ca đau bụng, nghi ngờ ngộ độc từ món "Hủ tiếu thịt heo xá xíu" suất ăn trưa.
- **Thành phần chứng kiến:** Ban Giám hiệu, Đại diện Phòng GD&ĐT, Trưởng Bếp ăn, PMO Lead GOTRACE.

### 4.2 Bấm Giờ So Sánh Traceback: Thủ Công vs GOTRACE V2.2

| Bước Truy Vết | Quy Trình Thủ Công (Sổ Giấy) | GOTRACE Incident Engine (Số Hóa) | Đạt Chuẩn SLA |
|:---|:---:|:---:|:---:|
| 1. Tra cứu mẫu lưu 24h & thực đơn | 45–60 phút (tìm sổ lưu, kiểm kho) | **45 giây** (quét mã QR hộp lưu mẫu) | ✅ Vượt trội |
| 2. Truy ngược lô nguyên liệu gốc (Lot ID) | 4–8 giờ (gọi điện các NCC hỏi nguồn) | **2 phút 15 giây** (truy ngược mã GCI lô hủ tiếu & thịt) | ✅ Vượt trội |
| 3. Kiểm tra thông số nhiệt độ & kiểm dịch cổng | 2–4 giờ (lục hóa đơn giấy nhà xe) | **1 phút 10 giây** (trích xuất sensor IoT $4.2^\circ$C & giấy thú y) | ✅ Vượt trội |
| 4. Khoanh vùng số lượng người phơi nhiễm | 12–24 giờ (đối soát danh sách lớp) | **3 phút 30 giây** (phân bổ số lượng suất ăn theo lớp/xưởng) | ✅ Vượt trội |
| 5. Phát lệnh cô lập lô hàng & báo cáo cơ quan | 24–48 giờ (văn bản đóng dấu gửi Sở) | **5 phút 00 giây** (tự động xuất Dossier điều tra số hóa) | ✅ Vượt trội |
| **TỔNG THỜI GIAN TRUY VẾT TOÀN DIỆN** | **24 – 48 GIỜ** | **12 PHÚT 40 GIÂY** | **$\le 15$ PHÚT (PASS)** |

---

## 5. BẰNG CHỨNG NGHIỆM THU (EVIDENCE GATE P2)

1. **Nhật ký 30 ngày Kiểm thực Số hóa:** Lưu trữ đầy đủ trên cơ sở dữ liệu `pmo-web-app` (với 100% dữ liệu đối soát không sai lệch).
2. **Biên bản Diễn tập Fire Drill Traceback $\le 15$ Phút:** Có chữ ký xác nhận của Ban Giám hiệu và BQL Bếp ăn.
3. **Báo cáo Tuân thủ Quy tắc Bếp ăn K01–K12:** Ghi nhận 2 trường hợp chặn nhập cổng thành công (1 lô thịt heo nhiệt độ $7.5^\circ$C $> 5^\circ$C vi phạm K02, 1 lô trứng tỷ lệ nứt $3.5\% > 2\%$ vi phạm K12).
4. **Hồ sơ sẵn sàng chuyển đổi hợp đồng:** Sẵn sàng bước vào Phân kỳ P3 (Ký hợp đồng SaaS chính thức 120–180M/năm).

---

## 6. TÀI LIỆU LIÊN KẾT
- Web App Field Ops: [`pmo-web-app/src/components/tab-field-ops.tsx`](../../pmo-web-app/src/components/tab-field-ops.tsx)
- Simulator Truy Vết $\le 15$ Phút: [`pmo-web-app/src/components/tab-traceback-simulator.tsx`](../../pmo-web-app/src/components/tab-traceback-simulator.tsx)
- Kế hoạch 90 Ngày: [`plans/90_DAY_FIELD_EXECUTION_PLAN.md`](../../plans/90_DAY_FIELD_EXECUTION_PLAN.md)
