# Phase 03: Kiểm Thử Thực Địa, Zero-PII & Triển Khai Cloudflare Pages
**Trạng thái:** Pending  
**Mục tiêu:** Kiểm chứng toàn diện sau khi tái cấu trúc, đảm bảo không có bất kỳ regression bug nào, bảo mật dữ liệu tuyệt đối và xuất bản phiên bản tinh gọn lên Cloudflare Pages.

---

## 1. NỘI DUNG KIỂM THỬ TOÀN DIỆN (TEST MATRIX)

| STT | Phân Lớp | Tiêu Chí Kiểm Thử | Công Cụ / Phương Pháp | Kỳ Vọng Đạt |
|:---:|:---|:---|:---|:---:|
| **T01** | **Type Safety** | Kiểm tra cú pháp và kiểu dữ liệu | `npm run build` | 0 Lỗi TypeScript |
| **T02** | **Static Export** | Xuất bản tĩnh Next.js 14 SSG | `next build` (out/) | Sinh đầy đủ 4/4 route tĩnh |
| **T03** | **Zero-PII Audit** | Quét dữ liệu cá nhân theo NĐ 13/2023 | `grep -rn "Phan Hữu Thông" src/ out/` | 0 kết quả (Hoàn toàn ẩn danh) |
| **T04** | **Line Count Audit** | Định mức mô-đun hóa Codebase | `wc -l src/components/**/*.tsx` | 100% file $\le 200$ dòng |
| **T05** | **Edge Deployment** | Triển khai lên Cloudflare Pages Anycast | `npx wrangler pages deploy out` | HTTP/2 200, Latency $< 0.5\text{s}$ |
| **T06** | **Functional Smoke Test** | Kiểm tra 5 Hubs và Sub-navigation | Automated Curl & DOM assertions | Đủ 5 Hubs, tương tác mượt mà |

---

## 2. QUY TRÌNH TRIỂN KHAI & PHỤC HỒI (DEPLOY & ROLLBACK)
1. **Pre-flight Check:** Build local sạch sẽ trong thư mục `pmo-web-app`.
2. **Deploy Snapshot:** Tạo snapshot deployment riêng biệt trên Cloudflare Pages để đối chiếu.
3. **Verify Canonical:** Kiểm tra domain chính `https://gotrace-pmo.pages.dev`.
4. **Update Reports:** Cập nhật file kết quả nghiệm thu tại `reports/devops/deploy/test-results.md`.

---

## 3. CHECKLIST CÔNG VIỆC CỤ THỂ
- [ ] Chạy `npm run build` xác nhận không có cảnh báo compile.
- [ ] Chạy lệnh quét PII bảo vệ quyền riêng tư.
- [ ] Chạy script deploy Cloudflare Pages.
- [ ] Ghi nhận log kiểm thử vào báo cáo devops.
