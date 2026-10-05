# QUY TRÌNH KIỂM THỰC 3 BƯỚC & LƯU MẪU 24H (QĐ 1246/QĐ-BYT)
**Cơ quan chủ quản:** Ban Quản Trị Dự Án (PMO) GOTRACE Vùng Tây Nam Bộ  
**Căn cứ pháp lý:** Quyết định số 1246/QĐ-BYT ngày 31/03/2017 của Bộ Y tế  
**Mục tiêu:** Chuyển hóa 100% sổ ghi chép kiểm thực thủ công dễ bị làm giả thành Hồ sơ Dữ liệu Điện tử (Audit-Ready Immutable Ledger) tại Cổng Bếp ăn Bán trú & Suất ăn Công nghiệp.

---

## I. NGUYÊN TẮC VẬN HÀNH THỰC ĐỊA DÀNH CHO FIELD OPS

Đội ngũ Chuyên viên Hiện trường (Field Operations Specialists) trực tiếp giám sát tại Cổng tiếp nhận nguyên liệu tuân thủ **Quy tắc 3 Không — 3 Phải**:
- **3 KHÔNG:**
  1. Không cho phép nhập hàng vào kho nếu không có tem mã hóa GCI hoặc mã QR định danh lô.
  2. Không nhận thịt tươi sống nếu nhiệt độ xe lạnh $> 5^\circ\text{C}$ hoặc thiếu Giấy kiểm dịch thú y hợp lệ (Quy tắc K02, K04).
  3. Không cấp dưỡng thức ăn cho học sinh/công nhân khi chưa hoàn tất thủ tục Niêm phong mẫu lưu 24h (Quy tắc K05, K08).
- **3 PHẢI:**
  1. Phải quét mã và cân đối soát khối lượng thực tế qua cân điện tử tích hợp Bluetooth vào Web App.
  2. Phải chụp ảnh cảm quan mẫu thức ăn và ghi nhận nhiệt độ tủ lưu mẫu ($2^\circ\text{C} – 8^\circ\text{C}$) thời gian thực.
  3. Phải sẵn sàng trích xuất Biên bản Kiểm thực điện tử cho Đoàn thanh tra ATTP trong vòng dưới 60 giây.

---

## II. BIỂU MẪU ĐIỆN TỬ SỐ 01: KIỂM THỰC BƯỚC 1 (TIẾP NHẬN TẠI CỔNG)

**Thời điểm thực hiện:** 05:30 – 07:00 sáng hàng ngày tại Khu vực Tiếp nhận Cổng.

| Chỉ Tiêu Kiểm Tra | Tiêu Chuẩn Kỹ Thuật Chấp Nhận | Phương Pháp Đo / Bằng Chứng | Trạng Thái | Xử Lý Khi Vi Phạm |
|:---|:---|:---|:---:|:---|
| **1. Mã định danh lô** | Có mã GCI hợp lệ (`GT:VN:ITEM:...`) | Quét Camera / Barcode Scanner | ĐẠT / KHÔNG | Từ chối tiếp nhận (K03) |
| **2. Tinh bột / Sợi tươi** | Sợi dẻo dai tự nhiên, không mùi chua nồng, xuất xưởng $\le 18\text{h}$ | Cảm quan + Giấy xuất xưởng HTX | ĐẠT / KHÔNG | Kích hoạt cảnh báo K10 |
| **3. Phụ gia cấm** | Âm tính với Tinopal, Formol, Hàn the | Test kit nhanh tại chỗ (ngẫu nhiên) | ÂM TÍNH | Niêm phong hủy lô (K11) |
| **4. Thịt tươi (Heo, Gà)** | Đàn hồi tốt, màu hồng tươi, xe lạnh $\le 5^\circ\text{C}$ | Cảm biến que đo nhiệt độ tâm thịt | ĐẠT / KHÔNG | Trả về NCC ngay tại cổng (K02) |
| **5. Giấy kiểm dịch thú y** | Có mộc đỏ thú y vùng hoặc mã QR điện tử | Đối chiếu số hiệu trên cổng thú y | HỢP LỆ | Chặn nhập kho vĩnh viễn (K04) |
| **6. Trứng gà / Trứng vịt** | Vỏ sạch, không nứt vỡ rỉ dịch, tỷ lệ dập $\le 2\%$ | Đếm ngẫu nhiên khay 30 quả | ĐẠT / KHÔNG | Trả hàng nếu nứt $> 2\%$ (K12) |
| **7. Rau củ quả lá** | Tươi non, không dập úng, có tem VietGAP/Truy xuất | Đối chiếu mã cơ sở vùng trồng | ĐẠT / KHÔNG | Lập biên bản hạ cấp/loại bỏ |

---

## III. BIỂU MẪU ĐIỆN TỬ SỐ 02: KIỂM THỰC BƯỚC 2 (CHẾ BIẾN TẠI BẾP)

**Thời điểm thực hiện:** 07:30 – 10:30 sáng hàng ngày tại Khu vực Chế biến & Nấu chín.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BIÊN BẢN GIÁM SÁT CHẾ BIẾN BƯỚC 2 (NHIỆT ĐỘ & AN TOÀN NHÂN SỰ)                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Tên món ăn / Thực đơn ngày: ........................................................ │
│ • Mẻ chế biến số: ............. Khối lượng thành phẩm dự kiến: ................. (kg)  │
│                                                                                        │
│ 1. Thời gian bắt đầu gia nhiệt: [___:___]  -  Thời gian kết thúc: [___:___]             │
│ 2. Nhiệt độ sôi tâm món ăn (Thịt/Nước dùng): [.......] °C (Yêu cầu: ≥ 100°C trong ≥15p)│
│ 3. Dầu chiên / Nước gia vị: [ ] Dầu mới  [ ] Đạt chuẩn độ trong  [ ] Không cháy khét   │
│ 4. Trang phục nhân viên bếp:                                                           │
│    [x] Mũ trùm tóc     [x] Khẩu trang y tế     [x] Tạp dề sạch     [x] Găng tay thực phẩm│
│ 5. Tình trạng sức khỏe nhân sự: 100% không mắc bệnh ngoài da, hô hấp, tiêu hóa.        │
│                                                                                        │
│ Xác nhận Trưởng ca Bếp: ......................  Chuyên viên GOTRACE: ................. │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## IV. BIỂU MẪU ĐIỆN TỬ SỐ 03: KIỂM THỰC BƯỚC 3 & LƯU MẪU 24H

**Thời điểm thực hiện:** 10:30 – 11:30 sáng hàng ngày (Trước giờ ăn 15–30 phút).

### 1. Bảng Thông Số Kỹ Thuật Lưu Mẫu Thực Phẩm
- **Quy cách hộp chứa:** Hộp Inox chuyên dụng hoặc thủy tinh chịu nhiệt đã được tiệt trùng bằng tia cực tím (UV) hoặc nước sôi $> 100^\circ\text{C}$ sấy khô.
- **Định lượng mẫu tối thiểu:**
  - Thức ăn đặc (cơm, bún, sợi hủ tiếu, thịt, rau): $\ge 100\text{g} – 150\text{g}$/mẫu.
  - Thức ăn lỏng (canh, súp, nước dùng): $\ge 150\text{ml}$/mẫu.
- **Thiết bị bảo quản:** Tủ lạnh chuyên dụng lưu mẫu, khóa cơ an toàn và niêm phong điện tử.
- **Nhiệt độ bảo quản chuẩn:** **$2^\circ\text{C} – 8^\circ\text{C}$** có thiết bị giám sát nhiệt độ tự động (IoT Temperature Logger) ghi nhận 15 phút/lần.
- **Thời gian lưu bắt buộc:** Tối thiểu **24 giờ** tính từ thời điểm niêm phong. Chỉ được hủy mẫu sau khi có chữ ký xác nhận của Cán bộ Y tế học đường / Quản lý An toàn lao động KCN và không có biểu hiện ngộ độc thực phẩm phát sinh.

### 2. Mẫu Thẻ Niêm Phong Mẫu Lưu Điện Tử (GCI Sample Tag)
```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                      GOTRACE V2.2 — THẺ NIÊM PHONG MẪU LƯU 24H                       ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║ Mã GCI Mẫu Lưu: GT:VN:SAMPLE:SADEC-20261001-001                                      ║
║ Tên món ăn: Hủ tiếu thịt heo tươi Sa Đéc (Suất ăn học sinh Khối 1-5)                 ║
║ Bữa ăn: [x] Bữa trưa      [ ] Bữa phụ chiều      [ ] Bữa sáng                        ║
║ Thời điểm lấy mẫu: 10 giờ 45 phút, Ngày 01 / 10 / 2026                               ║
║ Nhiệt độ lúc lấy mẫu: 78°C  →  Nhiệt độ tủ bảo quản lưu: 3.8°C                      ║
║ Người lấy mẫu: Nguyễn Văn A (Nhân viên Y tế) - Chữ ký: ............................  ║
║ Người chứng kiến: Lê Thị B (Đại diện GOTRACE Field Ops) - Chữ ký: .................. ║
║ Mã Hash xác thực Blockchain: 8f3b2a1c...9e4d01 (Đã đồng bộ Ledger)                  ║
║ Hạn hủy mẫu dự kiến: 11 giờ 00 phút, Ngày 02 / 10 / 2026                             ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## V. BIÊN BẢN XỬ LÝ VI PHẠM TẠI CHỖ (EXCEPTION HANDLING PROTOCOL)

Khi hệ thống Rule Engine hoặc Field Ops phát hiện bất kỳ vi phạm nào trong 12 Kitchen Rules (K01–K12):
1. **Lập tức dừng nhập kho / cô lập lô hàng:** Không cho phép di chuyển nguyên liệu vào kho bảo quản chung.
2. **Kích hoạt trạng thái Quarantined trên Hệ thống:** Cập nhật trạng thái lô hàng thành `ISOLATED_RISK_Kxx` trên ứng dụng di động.
3. **Phát hành Biên bản Cảnh báo:** Gửi thông báo khẩn qua tin nhắn SMS/Zalo OA cho Đại diện Ban Giám Hiệu, Trưởng Ban Quản lý Bếp và Nhà cung ứng liên quan.
4. **Lưu vết bằng chứng (Evidence L3):** Chụp ảnh thực trạng, lưu chỉ số đo nhiệt độ và ghi âm thỏa thuận giải quyết tại cổng phục vụ thanh tra.
