# @gotrace/zalo-mini-app — "Thư Ký Số HTX" (Mobile Field Agent UX)

Ứng dụng di động Zalo Mini App dành cho nông dân và thư ký Hợp tác xã (HTX) tại Đồng bằng Sông Cửu Long (ĐBSCL), phát triển theo chuẩn React + TypeScript và triết lý **"3 nút bấm — Không gõ chữ phức tạp"**.

Module thuộc **Milestone M2 (R2)** của dự án **GoTRACE Field Integration Toolkit**.

---

## 🌾 Triết Lý Thiết Kế: "3 Nút Bấm — Không Gõ Chữ Phức Tạp"

Nông dân và ban quản trị HTX tại ĐBSCL (Đồng Tháp, An Giang, Cần Thơ) thường lao động trực tiếp ngoài ruộng, mắt mờ, tay ướt và rất ngại bàn phím điện thoại nhỏ. Zalo Mini App loại bỏ hoàn toàn các biểu mẫu phức tạp:
1. **Zero-Install & Zero-Password:** Tự động đăng nhập bằng số điện thoại Zalo đã định danh eKYC (`VN.<PROV>.PARTY.FARMER.<PHONE>`).
2. **Kích thước nút bấm cực đại:** Touch target $\ge 64\text{px}$, phông chữ lớn, độ tương phản cao.
3. **3 Màn hình nghiệp vụ nòng cốt:**
   - **Màn hình 1:** 🌾 *BÁO GIEO SẠ / RA HOA*
   - **Màn hình 2:** 💧 *VẬT TƯ & RÚT NƯỚC (AWD)*
   - **Màn hình 3:** 🚜 *YÊU CẦU THU HOẠCH*

---

## 📱 Chi Tiết 3 Màn Hình Nghiệp Vụ

### Màn Hình 1: Báo Gieo Sạ / Ra Hoa (`Screen1Sowing`)
- **Định danh Nông hộ Zalo eKYC:** Tự động nhận diện danh tính nông dân, số CCCD và HTX trực thuộc (VD: *HTX Nông Nghiệp Thắng Lợi - Cao Lãnh, Đồng Tháp*).
- **Khớp Thửa đất GIS & MSVT:** Sử dụng thuật toán Point-in-Polygon (Ray-casting) tự động đối soát tọa độ GPS thực tế của điện thoại với ranh giới đa giác GeoJSON của thửa ruộng.
- **Bộ chọn MSVT & Giống lúa:** Hỗ trợ ST25, OM18, OM5451, DT8, Xoài Cát Chu.
- **1-Tap Action:** Bấm 1 nút tạo ngay sự kiện `EVENT: CROP_PLAN_CREATED` (Mã GCI: `VN.DT.EVENT.CROP_PLAN_CREATED.<UUID>`).

### Màn Hình 2: Vật Tư & Rút Nước Ngập Khô Xen Kẽ (`Screen2AwdOcr`)
- **Thanh trượt Ống đo Nông học AWD:** Điều chỉnh trực quan từ $+10\text{ cm}$ (ngập sâu) $\rightarrow 0\text{ cm}$ (mặt ruộng) $\rightarrow -15\text{ cm}$ (khô nứt chân chim tối ưu ức chế khí $\text{CH}_4$).
- **Bộ đếm đợt rút nước (AWD Cycles):** Theo dõi chu kỳ rút nước ($1, 2, 3$ đợt/vụ).
- **Đo đạc Giảm phát thải MRV Carbon (IPCC Tier 2):**
  - Công thức: $\Delta E = E_{\text{baseline}} (7.20) - E_{\text{project}} (3.85) = 3.35\text{ tCO}_2\text{e/ha}$
  - Tính toán theo thời gian thực lượng giảm phát thải ($\text{tCO}_2\text{e}$) và quy đổi giá trị kinh tế theo đơn giá cam kết **$20/\text{tấn CO}_2\text{e}$** và tỷ giá VNĐ ($25.400\text{ đ/USD}$).
  - Đạt chuẩn Đề án 1 Triệu Hecta Lúa Chất Lượng Cao (QĐ 1490/QĐ-TTg, ISO 14064-2:2019).
- **Mô phỏng AI OCR Vỏ bao Phân thuốc:** Bật camera chụp ảnh quét tự động tên thương phẩm (*Đạm Urê Cà Mau, NPK Bình Điền, Anvil 5SC, Amistar Top*), bóc tách hoạt chất (*Hexaconazole, Azoxystrobin, N-P-K*), kiểm soát thời gian cách ly PHI và sinh mã băm SHA-256 niêm phong `EVIDENCE: GIS_PHOTO`.

### Màn Hình 3: Yêu Cầu Thu Hoạch (`Screen3Harvest`)
- **Ước tính sản lượng:** Thanh trượt trực quan chọn số tấn lúa tươi.
- **Kiểm soát Hạn ngạch (Yield Quota Engine):** Cảnh báo nếu sản lượng ước tính vượt quá $120\%$ năng suất định mức của mã số vùng trồng.
- **Phương tiện gom hàng:** Lựa chọn Ghe/Sà lan thủy nội địa (`WATERWAY_BARGE`) hoặc Xe tải đường bộ (`ROAD_TRUCK`) kèm biển số.
- **1-Tap Harvest Request:** Phát sinh thực thể `LOT: HarvestLot` theo cú pháp GCI chuẩn:
  `VN.<PROV>.LOT.HARVEST.<YYYYMMDD>-<COMMODITY>-<PLOT_ID>`
- **Mã QR Lô Gặt:** Hiển thị mã QR và đường dẫn phân giải tức thời gửi về Dashboard trạm cân/nhà máy xay xát.
- **Mô phỏng Vòng đời Lô:** Hỗ trợ chuyển trạng thái thực địa: `REQUESTED` $\rightarrow$ `CUTTING` $\rightarrow$ `WEIGHED` $\rightarrow$ `RECEIVED_AT_MILL`.

---

## ⚡ Hàng Đợi Ngoại Tuyến (OfflineSyncQueue)

Khi nông dân làm việc tại các cánh đồng sâu, ven kênh rạch thường xuyên mất sóng 4G:
- **FIFO LocalStorage Buffer:** Toàn bộ sự kiện phát sinh được lưu trữ cục bộ theo thứ tự nhập trước - xuất trước.
- **Tự động đồng bộ khi có mạng:** Lắng nghe sự kiện `online` của trình duyệt và kiểm tra kết nối định kỳ để tự động đẩy hàng đợi lên GoTRACE Field Gateway API.
- **Nút "Đồng bộ ngay":** Cho phép kích hoạt đồng bộ thủ công khi có mạng trở lại.
- **Chống mất mát dữ liệu:** Quản lý số lần thử lại (retries), giữ trạng thái cho đến khi API phản hồi `200 OK`.

---

## 🛠 Cài Đặt & Chạy Thử

### Yêu Cầu Hệ Thống
- Node.js $\ge 18$ (Đã kiểm thử tối ưu trên Node v22.22.0)
- Trình duyệt hiện đại hỗ trợ ES Modules & LocalStorage

### 1. Build TypeScript
```bash
cd packages/zalo_mini_app
npm run build
```
Lệnh trên thực thi `tsc` biên dịch toàn bộ source code từ `src/` sang `dist/` (bao gồm `.js`, `.d.ts`, và `.map`).

### 2. Chạy Bộ Kiểm Thử Tự Động (Test Suite)
```bash
npm test
```
Bộ test tự động kiểm thử 5 test suite với 28 test cases độc lập:
1. `tests/navigation.test.ts`: Điều hướng 3 màn hình, tab bar, mobile device simulator frame, chuyển đổi mạng online/offline.
2. `tests/mrvCalculator.test.ts`: Tính toán MRV Carbon Tier 2, $\Delta E = 3.35\text{ tCO}_2\text{e/ha}$, tỷ lệ đợt rút nước, doanh thu carbon USD/VNĐ.
3. `tests/offlineQueue.test.ts`: Hàng đợi FIFO LocalStorage, thứ tự enqueue/dequeue, tự động flush khi có mạng, cơ chế retry.
4. `tests/harvestLot.test.ts`: Cú pháp định danh chuẩn GCI `VN.<PROV>.LOT.HARVEST.<ID>`, vòng đời lô hàng và kiểm soát hạn ngạch.
5. `tests/screenComponents.test.ts`: Render giao diện Screen 1, Screen 2 (AWD slider + OCR), Screen 3, thẻ eKYC và thanh trạng thái mạng.

---

## 🏛 Cấu Trúc Thư Mục

```
packages/zalo_mini_app/
├── package.json                   # Cấu hình package, build và test script
├── tsconfig.json                  # Cấu hình TypeScript compiler
├── index.html                     # Giao diện web mô phỏng Zalo Mini App
├── README.md                      # Tài liệu kỹ thuật
├── src/
│   ├── types/
│   │   └── index.ts               # Interface TypeScript & GCI regex validator
│   ├── services/
│   │   ├── mrvCalculator.ts       # Động cơ MRV Carbon IPCC Tier 2 (1Mha Rice)
│   │   ├── offlineQueue.ts        # Hàng đợi ngoại tuyến FIFO LocalStorage
│   │   ├── ocrSimulator.ts        # Mô phỏng AI OCR bao bì phân bón & thuốc BVTV
│   │   ├── gisMatcher.ts          # Thuật toán Point-in-Polygon & mock GIS plots
│   │   └── api.ts                 # GoTRACE Field Gateway API client
│   ├── components/
│   │   ├── MobileDeviceFrame.tsx  # Khung mô phỏng điện thoại iPhone/Android
│   │   ├── BottomNavBar.tsx       # Thanh điều hướng 3 nút bấm
│   │   └── OfflineStatusBar.tsx   # Thanh hiển thị trạng thái kết nối & hàng đợi
│   ├── screens/
│   │   ├── Screen1Sowing.tsx      # Màn hình 1: Báo Gieo Sạ / Ra Hoa
│   │   ├── Screen2AwdOcr.tsx      # Màn hình 2: Vật Tư & Rút Nước AWD
│   │   └── Screen3Harvest.tsx     # Màn hình 3: Yêu Cầu Thu Hoạch
│   ├── styles/
│   │   └── app.css                # CSS thiết kế giao diện di động
│   ├── App.tsx                    # Root App Component
│   ├── main.tsx                   # Browser entry point
│   └── index.ts                   # Export thư viện cho monorepo
├── tests/
│   ├── navigation.test.ts         # Test điều hướng & mobile wrapper
│   ├── mrvCalculator.test.ts      # Test công thức MRV carbon 1Mha
│   ├── offlineQueue.test.ts       # Test FIFO queue & offline resilience
│   ├── harvestLot.test.ts         # Test HarvestLot & cú pháp GCI
│   └── screenComponents.test.ts   # Test components & giao diện
└── scripts/
    └── test-runner.js             # Test runner tự động biên dịch & chạy node:test
```
