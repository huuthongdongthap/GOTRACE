# KẾ HOẠCH TỔNG LỰC GO-LIVE HẠ TẦNG GOTRACE V2.2 TÂY NAM BỘ
**Mục tiêu:** Đưa toàn bộ hệ sinh thái PMO Web App, Cổng kết nối API và chốt kiểm thực thực địa tại Sa Đéc chính thức Go-Live.  
**Địa bàn:** Sa Đéc (Đồng Tháp) $\rightarrow$ Mở rộng Cần Thơ & Long An.  
**Single Source of Truth:** `docs/00_MASTER_INDEX.md` | `plans/90_DAY_FIELD_EXECUTION_PLAN.md`

---

## CẤU TRÚC 4 PHA GO-LIVE CHI TIẾT

| Pha | Tên Giai Đoạn | Mục Tiêu Chính | File Chi Tiết |
|:---|:---|:---|:---|
| **Phase 01** | **Hạ Tầng Cloud & Domain Production** | Cấu hình Docker, Vercel/Cloudflare, SSL `pmo.gotrace.vn`, kết nối API Core thật | [`phase-01-cloud-infrastructure.md`](./phase-01-cloud-infrastructure.md) |
| **Phase 02** | **Phần Cứng & Trang Thiết Bị Cổng Bếp** | Bàn giao Tablet kháng nước, Cân điện tử Bluetooth, Máy in mã QR, Kit test Formol/Tinopal | [`phase-02-hardware-edge-deployment.md`](./phase-02-hardware-edge-deployment.md) |
| **Phase 03** | **Đào Tạo & Chuyển Giao Quy Trình 3 Bước** | Huấn luyện thủ kho/KCS thao tác $\le 30$s/lô, ban hành quy chế tiếp nhận nguyên liệu | [`phase-03-ops-training-handover.md`](./phase-03-ops-training-handover.md) |
| **Phase 04** | **Lễ Kích Hoạt & Truyền Thông B2B/B2G** | Ký hợp đồng SaaS chính thức, mời Sở KH&CN / Chi cục ATVSTP thị sát, họp báo case study | [`phase-04-launch-pr-expansion.md`](./phase-04-launch-pr-expansion.md) |

---

## DEPENDENCIES & SUCCESS CRITERIA
- **Build Status:** Next.js Production Build 100% Green (`npm run build`).
- **Data Integrity:** 100% lô hàng xuất hóa đơn băm SHA-256 đối soát cân bằng khối lượng (Mass Balance).
- **SLA Khẩn Cấp:** Phản ứng truy vết sự cố vi sinh $\le 15$ phút (thực tế đạt 12 phút 40 giây).
