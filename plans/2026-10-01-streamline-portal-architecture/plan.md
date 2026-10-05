# KẾ HOẠCH TINH GIẢN & TỐI ƯU HÓA CỔNG ĐIỀU HÀNH PMO GOTRACE V2.2
**Mục tiêu:** Tinh giản cấu trúc giao diện, gom nhóm 15 tabs thành 5 Trung Tâm Tác Chiến (Command Hubs) trực quan, mô-đun hóa triệt để file >200 dòng, giữ nguyên 100% dữ liệu chiều sâu.  
**Thời gian thực hiện:** 01/10/2026  
**Chủ trì:** PMO Lead & Solution Architect  

---

## I. HIỆN TRẠNG & NỖI ĐAU CẦN TINH GIẢN
1. **Thanh điều hướng quá tải:** 15 tab nằm ngang làm tràn thanh menu, người dùng khó định vị tổng thể.
2. **File mã nguồn vượt chuẩn 200 dòng:**
   - `tab-field-ops.tsx` (791 dòng)
   - `tab-platform-gateway.tsx` (652 dòng)
   - `tab-food-chain.tsx` (286 dòng)
   - `tab-kitchen-rules.tsx` (300 dòng)
3. **Mục tiêu tối ưu:** "Tinh giản nhưng không cắt giảm thông tin" — gom nhóm có thứ bậc (Hierarchy & Progressive Disclosure), giúp nắm bắt toàn cảnh trong 15s và đi sâu vào chi tiết trong 1 click.

---

## II. LỘ TRÌNH TRIỂN KHAI 3 PHÂN KỲ (PHASES)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               LỘ TRÌNH TINH GIẢN & TỐI ƯU CỔNG ĐIỀU HÀNH GOTRACE                       │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ PHÂN KỲ 1: KIẾN TRÚC HUB │ PHÂN KỲ 2: MÔ-ĐUN HÓA    │ PHÂN KỲ 3: KIỂM THỬ & DEPLOY     │
│ (Information Hierarchy)  │ (Refactor Codebase ≤200L)│ (Smoke Test & Cloudflare Deploy) │
│                          │                          │                                  │
│ • Gom 15 Tab thành 5 Hub │ • Tách tab-field-ops     │ • Next.js 14 SSG static export   │
│ • Sub-navigation Pills   │ • Tách tab-gateway       │ • Quét Zero-PII NĐ 13/2023       │
│ • Quick-switch 3 Chuỗi   │ • Tách tab-food-chain    │ • Deploy Edge Cloudflare Pages   │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

### [Phase 01: Tái Cấu Trúc Điều Hướng — 5 Command Hubs](./phase-01-information-architecture.md)
- **Hub 1: Chuỗi Nông Sản ĐBSCL** (Tổng quan 3 trụ cột, Lúa gạo 1Mha, Trái cây GACC, Bếp ăn Sa Đéc).
- **Hub 2: Hiện Trường & An Toàn Thực Phẩm** (12 Quy tắc K01–K12, QĐ 1246 số hóa, Traceback < 15m).
- **Hub 3: Chiến Lược 90 Ngày & Khai Thác** (Roadmap P0–P3, 30 Anchor Accounts, Sales Playbook).
- **Hub 4: Hạ Tầng Kỹ Thuật & Cổng API** (Chuẩn GCI, REST API/Webhooks, Edge Bridge cân điện tử).
- **Hub 5: B2G Pháp Lý & Mở Rộng Vùng** (Biên bản ghi nhớ liên ngành, Zero-PII, Hệ sinh thái Carbon).

### [Phase 02: Mô-Đun Hóa Toàn Diện Codebase Dưới 200 Dòng](./phase-02-modularization-under-200-lines.md)
- Tách `tab-field-ops.tsx` thành: `field-ops-form-step1`, `field-ops-form-step2`, `field-ops-form-step3`, `field-ops-sample-log`.
- Tách `tab-platform-gateway.tsx` thành: `gateway-rest-api`, `gateway-offline-sync`, `gateway-edge-bridge`.
- Tách `tab-kitchen-rules.tsx` & `tab-food-chain.tsx` thành các card component độc lập.

### [Phase 03: Kiểm Thử Thực Địa & Phát Hành Toàn Cầu](./phase-03-ux-density-and-verification.md)
- Kiểm tra biên dịch TypeScript nghiêm ngặt, đảm bảo không lỗi type.
- Quét tự động rà soát dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP (0 match).
- Triển khai lên Cloudflare Pages (`https://gotrace-pmo.pages.dev`) và chạy 9/9 Smoke Tests.

---

## III. TIÊU CHÍ HOÀN THÀNH (ACCEPTANCE CRITERIA)
- [ ] Thanh Header có tối đa 5 Tab chính + Sub-pills tinh gọn, không bị tràn cuộn ngang.
- [ ] 100% các file component và page trong `pmo-web-app` đều $\le 200$ dòng code.
- [ ] 100% dữ liệu chi tiết của 15 module cũ được bảo toàn nguyên vẹn.
- [ ] Build static export thành công không cảnh báo lỗi.
- [ ] Triển khai live trên Cloudflare Pages đạt HTTP/2 200 và độ trễ $< 0.5\text{s}$.
