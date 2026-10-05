# PHASE 02: PHẦN CỨNG & TRANG THIẾT BỊ CỔNG BẾP SA ĐÉC

## 1. MỤC TIÊU
- Bàn giao đủ công cụ cho 2 nhân viên Thủ kho/KCS thực hiện kiểm thực tại cổng (05:00 – 07:30 sáng) hoàn toàn độc lập qua Web App.
- Đảm bảo hoạt động ngoại tuyến (Offline-first) khi mạng chập chờn tại cổng bếp.

## 2. DANH SÁCH TRANG THIẾT BỊ CHUẨN HÓA

| STT | Thiết Bị | Số Lượng | Đặc Thự Kỹ Thuật | Gói Gán Module Web App |
|:---|:---|:---:|:---|:---|
| 1 | Máy tính bảng (Tablet) Android 13+ | 2 | Màn hình 10–11 inch, pin $\ge 8000$ mAh, chống nước IP67 | `tab-field-ops` (Nhập liệu Hiện trường QĐ 1246) |
| 2 | Cân điện tử Bluetooth BLE | 1 | Tải trọng 150kg/500g, in mã QR GCI trên giấy nhiệt | `GotraceApiClient.createEvent()` (Sự kiện WEIGHED) |
| 3 | Máy in mã QR Bluetooth | 1 | In nhanh 80mm/s, giấy nhãn dẻo 50x30mm | In nhãn lô hàng & biên bản lưu mẫu 24h |
| 4 | Bộ kit thử nhanh Formol / Tinopal | 2 bộ | Độ nhạy $\le 1$ ppm, đọc thị giác trong 60s | `KitchenGateInput.test_results` |
| 5 | Cảm biến nhiệt độ IoT (Tuya / Sonoff BLE) | 4 | $-20^\circ C \sim 60^\circ C$, log 5 phút/lần | `TelemetryData.temperature_celsius` |
| 6 | Tủ lưu mẫu Inox 2–8°C có khóa điện tử | 1 | Dung tích 300L, báo động nhiệt độ qua app | `VerificationEngine.sample_retention_24h` |

## 3. KẾT NỐI & CẤU HÌNH EDGE
- Tablet cài đặt PWA (Progressive Web App) của `pmo-web-app` để làm việc Offline ($\ge 24h$).
- Bluetooth LE pairing cân điện tử + máy in mã QR + cảm biến nhiệt độ.
- LocalStorage cache tự động đồng bộ khi có WiFi/4G quay trở lại (`OfflineSyncQueue.flush()`).