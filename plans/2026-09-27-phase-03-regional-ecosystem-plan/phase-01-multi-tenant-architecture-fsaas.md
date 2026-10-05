# GIAI ĐOẠN 3 - PHÂN KỲ 01: KIẾN TRÚC MULTI-TENANT & MÔ HÌNH FOOD SAFETY AS A SERVICE (FSaaS)
**Mã Tài Liệu:** `PLN-PHASE3-P01-MULTITENANT-FSAAS`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Nông Sản Tây Nam Bộ  
**Thời Gian:** Tháng 1 – Tháng 8 (2028)  
**Chủ Quản:** Solution Architect, Cloud Infrastructure Specialist, Product Manager  

---

## 1. BỐI CẢNH & THÁCH THỨC VẬN HÀNH

Khi mở rộng quy mô từ 4 Bếp Anchor (Phase 2) lên 300 Bếp Anchor và 500 Nhà cung cấp Tier-2 trên toàn vùng ĐBSCL:
- Không thể duy trì mô hình chia sẻ database đơn lẻ hoặc on-premise riêng rẽ vì chi phí vận hành phình to.
- Dữ liệu giữa các trường học (bảo mật trẻ em theo NĐ 13/2023/NĐ-CP) và các nhà máy may mặc, điện tử nước ngoài (tuân thủ bảo mật ISO 27001) bắt buộc phải phân lập dữ liệu nghiêm ngặt (Strict Data Isolation).
- Độ trễ mạng tại các huyện vùng sâu (Tháp Mười, Hồng Dân, U Minh, Năm Căn) đòi hỏi kiến trúc Edge Computing kết hợp Offline-first.

---

## 2. KIẾN TRÚC KỸ THUẬT NỀN TẢNG (TECHNICAL ARCHITECTURE)

### 2.1 Mô Hình Multi-tenant Subdomain Routing
- Mỗi đơn vị Bếp Anchor được cấp một Tenant ID và không gian quản trị độc lập: `tenant-id.gotrace.vn` (ví dụ: `kcn-tranoc.gotrace.vn`, `thpt-sadec.gotrace.vn`).
- **Phân tách dữ liệu:**
  - Logic phân vùng dữ liệu: Row-Level Security (RLS) trên PostgreSQL kết hợp khóa mã hóa riêng biệt (Tenant-specific KMS Key).
  - Quyền truy cập: Role-Based Access Control (RBAC) với 4 vai trò chuẩn: `KitchenAdmin`, `ReceivingStaff`, `SupplierUser`, `AuditorInspector`.

### 2.2 Kiến Trúc 3 Cụm Edge Computing Nodes
Thiết lập 3 Cụm máy chủ Edge (Edge Cluster) đặt tại các trung tâm hạ tầng viễn thông:
1. **Edge Node Bắc Sông Hậu (Sa Đéc - Đồng Tháp):** Phục vụ Đồng Tháp, Long An, Tiền Giang.
2. **Edge Node Trung Tâm Vùng (Cần Thơ):** Phục vụ TP. Cần Thơ, Hậu Giang, Vĩnh Long.
3. **Edge Node Nam Sông Hậu (Cà Mau):** Phục vụ Sóc Trăng, Bạc Liêu, Cà Mau (chuyên trách Hải sản và Lúa tôm).

**Cơ chế đồng bộ:**
- Thiết bị Gate Kit tại cổng nhận hàng giao tiếp với Edge Node gần nhất qua giao thức WebSocket / gRPC (Độ trễ $< 20\text{ ms}$).
- Edge Node đồng bộ không đồng bộ (Asynchronous Batch Sync) về Master Ledger GOTRACE Cloud qua Kafka/RabbitMQ mỗi 15 phút hoặc ngay khi có sự cố khẩn cấp.

---

## 3. ĐÓNG GÓI MÔ HÌNH DỊCH VỤ FSaaS (FOOD SAFETY AS A SERVICE)

Biến GOTRACE từ giải pháp phần mềm đơn thuần thành dịch vụ ủy thác an toàn vệ sinh thực phẩm trọn gói:

| Gói Dịch Vụ | Đối Tượng | Đơn Giá | Quyền Lợi Kèm Theo |
|:---|:---|:---:|:---|
| **FSaaS Trường Học** | Các trường mầm non & tiểu học bán trú | 8 – 12 Triệu VNĐ/tháng | Phần mềm QĐ 1246 + Tablet tại cổng + Cảm biến tủ lưu mẫu IoT + Báo cáo tự động nộp Phòng GD&ĐT |
| **FSaaS KCN Tiêu Chuẩn** | Nhà máy 1.000 – 3.000 công nhân | 15 – 25 Triệu VNĐ/tháng | Toàn bộ tính năng trường học + Cân điện tử kết nối Gate Rule + Tự động khóa lô vi phạm thú y |
| **FSaaS KCN Cao Cấp** | Nhà máy FDI trên 5.000 công nhân | 35 – 50 Triệu VNĐ/tháng | Tích hợp cổng kiểm tra kim loại / X-quang + Traceback SLA $\le 10$ phút + Bảo hiểm ngộ độc thực phẩm |

---

## 4. KẾ HOẠCH TRIỂN KHAI KỸ THUẬT

1. **Tháng 1 – 3:** Thiết kế Helm Chart Kubernetes & Triển khai cụm PostgreSQL Cluster hỗ trợ Multi-tenant RLS.
2. **Tháng 4 – 5:** Nâng cấp hệ thống Gate Verification hỗ trợ OAuth2 SSO và phân quyền Tenant.
3. **Tháng 6 – 7:** Vận hành thử nghiệm Edge Node Sa Đéc và Edge Node Cần Thơ; đo đạc độ trễ đồng bộ khi ngắt kết nối mạng mô phỏng 72 giờ.
4. **Tháng 8:** Bàn giao tài liệu vận hành FSaaS cho 14 kỹ sư triển khai và đội ngũ Sales B2B Vùng.
