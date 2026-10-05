# Phase 01: Tái Cấu Trúc Điều Hướng — 5 Command Hubs
**Trạng thái:** Pending  
**Mục tiêu:** Chuyển đổi 15 tabs dàn hàng ngang thành 5 Trung Tâm Tác Chiến (Command Hubs) phân tầng trực quan, tinh gọn, loại bỏ triệt để tình trạng cuộn ngang trên thiết bị di động và máy tính bảng.  

---

## 1. BẢNG ÁNH XẠ CHUYỂN ĐỔI (TAB MAPPING MATRIX)

| STT | 5 Trung Tâm Điều Hành (Top-Level Hub) | Các Phân Hệ Trực Thuộc (Sub-Pills / Sub-Tabs) | Mã Module Cũ |
|:---:|:---|:---|:---:|
| **H1** | **🌾 3 Trụ Cột Nông Sản ĐBSCL** | 1. Tổng quan Bản đồ 3 Chuỗi<br>2. Lúa Gạo 1Mha & Carbon MRV ($20/tấn)<br>3. Trái Cây & IoT Cold-chain (GACC)<br>4. Bếp Ăn Sa Đéc (Trojan Wedge) | `pitch`<br>`rice`<br>`fruit`<br>`food-chain` |
| **H2** | **🛡️ Hiện Trường & ATTP (QĐ 1246)** | 1. Diễn tập Traceback < 15 Phút<br>2. 12 Quy tắc Bếp ăn (K01–K12)<br>3. Form Số hóa Kiểm thực 3 bước<br>4. Nhật ký Lưu mẫu 24h & Thẻ GCI | `traceback`<br>`kitchen-rules`<br>`field-ops`<br>`tools` |
| **H3** | **🎯 Chiến Lược 90 Ngày & Khai Thác** | 1. Roadmap 4 Phân kỳ P0–P3<br>2. 30 Anchor Accounts (ĐBSCL)<br>3. Sales Playbook & Gói Chẩn đoán 35M<br>4. Mô hình Hòa vốn động (ROI Model) | `roadmap`<br>`accounts`<br>`sales`<br>`pitch:roi` |
| **H4** | **⚡ Hạ Tầng & Cổng Đấu Nối** | 1. Chuẩn Định Danh Toàn Cầu GCI V2.2<br>2. Cổng API & Webhooks B2B<br>3. Offline-First Sync & Trạm Cân Edge Bridge | `gateway`<br>`tools:gci` |
| **H5** | **🏛️ B2G & Mở Rộng Hệ Sinh Thái** | 1. Pháp lý B2G & Quản trị Rủi ro<br>2. Đa Tỉnh Giai đoạn 2 (Cần Thơ, Long An)<br>3. Hệ Sinh Thái Vùng & Sàn Carbon Giai đoạn 3 | `compliance`<br>`phase2:cluster`<br>`phase3` |

---

## 2. THIẾT KẾ TRẢI NGHIỆM GIAO DIỆN (UI/UX SPECIFICATION)

1. **Header Cấp 1 (Top Bar):**
   - Chỉ hiển thị 5 nút Hub chính có icon và nhãn ngắn gọn.
   - Thêm thanh tiến độ hoàn thành các cột mốc dự án (Done/Total).
2. **Sub-Navigation Cấp 2 (Secondary Sub-Pills):**
   - Khi chọn một Hub, thanh Sub-Pill bên dưới tự động hiển thị các tính năng chi tiết tương ứng.
   - Tránh việc nhồi nhét nhiều thông tin cùng lúc, tuân thủ nguyên lý *Progressive Disclosure* (Tiết lộ thông tin lũy tiến).
3. **Responsive Mobile/Tablet Ready:**
   - Hoạt động trơn tru trên màn hình di động hiện trường của Field Ops mà không bị che khuất nút bấm.

---

## 3. CHECKLIST CÔNG VIỆC CỤ THỂ
- [ ] Cập nhật `TabKey` trong `pmo-header.tsx` để hỗ trợ 5 Hub chính (`supply-chains`, `field-inspection`, `strategic-roadmap`, `platform-gateway`, `governance-ecosystem`).
- [ ] Thêm state quản lý `subTab` cho từng Hub để người dùng chuyển đổi mượt mà.
- [ ] Viết sub-header chuyển đổi sub-tab nhẹ nhàng, phong cách dark-mode hiện đại.
- [ ] Bảo lưu khả năng deep-link hoặc jump nhanh giữa các module nghiệp vụ.
