# GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng & An Toàn Thực Phẩm ĐBSCL

[![CI/CD Pipeline](https://github.com/huuthongdongthap/GOTRACE/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/huuthongdongthap/GOTRACE/actions/workflows/ci-cd.yml)
[![Live Portal](https://img.shields.io/badge/Live_Portal-gotrace--pmo.pages.dev-emerald?logo=cloudflare)](https://gotrace-pmo.pages.dev)
[![Standard](https://img.shields.io/badge/Standard-GCI_V2.2_%26_QĐ_1246-blue)](https://gotrace-pmo.pages.dev)
[![Compliance](https://img.shields.io/badge/Privacy-Zero--PII_%26_NĐ_13%2F2023-purple)](https://gotrace-pmo.pages.dev)

Hệ thống quản trị và hạ tầng dữ liệu chuỗi cung ứng nông sản - an toàn thực phẩm GOTRACE V2.2, phục vụ triển khai thực chiến tại khu vực Tây Nam Bộ (Đồng Tháp, Cần Thơ, Long An đến Cà Mau) với sở chỉ huy tiền phương tại TP. Sa Đéc.

---

## 🌾 1. Ba Trụ Cột Chuỗi Cung Ứng Nông Sản (Tri-Archetype Balance)

GOTRACE V2.2 giải quyết toàn diện bài toán dữ liệu chuỗi đặc thù vùng Đồng bằng Sông Cửu Long (24 triệu tấn lúa, 6.7 triệu tấn trái cây và hàng nghìn bếp ăn trường học/KCN):

| Trụ Cột | Loại Hình Chuỗi | Trọng Tâm Kỹ Thuật & Giá Trị |
|---|---|---|
| **Lúa Gạo 1 Triệu Hecta** | Tuyến tính (*Linear*) | 29 Canonical Events; Động cơ MRV tính giảm phát thải Metan (AWD) tạo tín chỉ Carbon **$20/tấn CO2e** (ISO 14064-2); Đối soát cân bằng khối lượng ẩm độ lúa sấy (26% → 14%). |
| **Trái Cây & Cold-Chain** | Phân nhánh (*Branching*) | Quản lý Mã số vùng trồng (MSVT GIS Polygon); Giám sát IoT xe container lạnh (2°C – 5°C, độ ẩm 85–90%); Kiểm soát hạn ngạch xuất khẩu Lệnh 248/249/280 GACC; Kiểm nghiệm Cadmium $\le 0.05$ mg/kg, zero Auramine-O. |
| **Bếp Ăn Bán Trú & KCN** | Hội tụ (*Converging*) | Hội tụ 4 Trụ cột Thực phẩm (Tinh bột, Đạm, Trứng, Rau); Mũi khoan chiến lược Trojan Horse thâm nhập qua áp lực QĐ 1246/QĐ-BYT (Kiểm thực 3 bước & Lưu mẫu 24h); 12 Kitchen Rules K01–K12; Diễn tập truy xuất ngộ độc $\le 15$ phút; Kéo theo hệ số nhân **1 : 4.8** nhà cung cấp vệ tinh. |

---

## 🏛️ 2. Kiến Trúc 5 Command Hubs (Web Portal)

Ứng dụng quản hành trung tâm **PMO Web App** (`pmo-web-app`) được cấu trúc thành 5 Hub chỉ huy với nguyên tắc công thái học cấp tiến (Progressive Disclosure):

1. **🌾 Chuỗi Nông Sản ĐBSCL (`supply-chains`):** Bản Đồ 3 Chuỗi, Lúa Gạo 1Mha & Carbon MRV, Trái Cây & Cold-chain GACC, 4 Trụ Cột Bếp Ăn.
2. **🛡️ Hiện Trường & ATTP (`field-ops-hub`):** QĐ 1246 Kiểm Thực 3 Bước & In Biên Bản Bộ Y Tế, 12 Kitchen Rules K01–K12, Traceback Simulator $\le 15$m, Công Cụ Sinh Mã GCI.
3. **🎯 Chiến Lược 90 Ngày (`strategy-hub`):** Lộ trình triển khai P0–P3, Danh bạ 30 Anchor Accounts & Tiêu chí Qualification, Sales Playbook & Gói Dịch vụ Trojan 35M.
4. **⚡ Hạ Tầng & Cổng Đấu Nối (`gateway-hub`):** Core Ledger Gateway, 9 Core Primitives SSOT, Bộ đệm ngoại tuyến Offline Buffer, Cấu hình API Endpoint.
5. **🏛️ B2G & Mở Rộng Vùng (`governance-hub`):** B2G Pháp lý Sở KH&CN / ATVSTP, Mở rộng Cần Thơ & Long An, Sàn Giao dịch Carbon Vùng ĐBSCL.

- **Tiêu chuẩn Mã nguồn:** 100% các tệp giao diện $\le 200$ dòng.
- **Bảo mật Dữ liệu:** Tuân thủ triệt để Nghị định 13/2023/NĐ-CP (Zero-PII), không lưu thông tin cá nhân.
- **Trực tuyến:** Triển khai trên Cloudflare Pages tại [https://gotrace-pmo.pages.dev](https://gotrace-pmo.pages.dev).

---

## 🛠️ 3. Bộ Công Cụ Tích Hợp Kỹ Thuật Thực Địa (Field Integration Toolkit)

Monorepo nằm tại `teamwork_projects/gotrace_field_toolkit` bao gồm 4 packages chuyên dụng đã vượt qua quy trình kiểm toán độc lập **Victory Audit** với 249/249 tests passing (Độ trễ trung bình 78.25ms < 500ms SLA):

- **`@gotrace/edge-bridge`:** Dịch vụ IoT cầu nối trạm cân điện tử qua cổng Serial RS-232/485 (Toledo, CAS, Yaohua), bộ lọc RingBuffer khử nhiễu điện từ, cơ chế phát hiện trọng lượng ổn định và phát hành vé cân mật mã SHA-256.
- **`@gotrace/zalo-mini-app`:** Ứng dụng di động "Thư ký số HTX" tối giản cho nông dân/cán bộ kiểm thực với giao diện 3 nút bấm, định vị GPS GIS polygon, thanh trượt quản lý nước AWD và tính toán tín chỉ carbon MRV.
- **`@gotrace/erp_connector`:** Cổng API hai chiều tích hợp ERP/WMS (Bravo, Misa, SAP) chuẩn OpenAPI 3.0, webhook HMAC-SHA256 chống tấn công phát lại (anti-replay), sinh mã QR ma trận ISO/IEC 18004 và nhãn in công nghiệp ZPL.
- **`@gotrace/test-harness`:** Bộ kịch bản kiểm thử toàn diện 4 tầng kiểm tra tính toàn vẹn mật mã JCS RFC 8785, định danh toàn cầu GCI và hiệu năng trễ.

---

## 🚀 4. Hướng Dẫn Phát Triển & Vận Hành

### Cài đặt và chạy PMO Web App

```bash
cd pmo-web-app
npm install
npm run dev
# Mở trình duyệt tại http://localhost:3000
```

Kiểm tra kiểu dữ liệu và đóng gói bản build tĩnh:
```bash
npm run build
# Bản build tĩnh xuất ra tại thư mục: pmo-web-app/out
```

### Chạy Kiểm Thử Field Toolkit

```bash
cd teamwork_projects/gotrace_field_toolkit
npm install
npm test
# Chạy toàn bộ 249 unit, integration và latency benchmark tests
```

### Deploy Lên Cloudflare Pages

```bash
cd pmo-web-app
wrangler pages deploy out --project-name=gotrace-pmo
```

---

## 🔒 5. Chính Sách Bảo Mật & Pháp Lý

- **Zero-PII Compliance:** Dự án tuân thủ nghiêm ngặt Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân. Toàn bộ mã nguồn, cấu hình, và tài liệu chỉ sử dụng định danh vai trò (*"PMO Lead"*, *"Kỹ thuật viên Hiện Trường"*) hoặc mã hóa mật mã toàn cầu GCI (`GT:VN:<PROV>:<PRIMITIVE>:<CODE>:<ID>`).
- **Pháp lý kiểm thực:** Tuân thủ Quyết định 1246/QĐ-BYT của Bộ Y tế về hướng dẫn thực hiện chế độ kiểm thực 3 bước và lưu mẫu thức ăn đối với cơ sở kinh doanh dịch vụ ăn uống.

---

*Bản quyền © 2026 GOTRACE. Nền tảng Dữ liệu Chuỗi Cung Ứng & An Toàn Thực Phẩm.*
