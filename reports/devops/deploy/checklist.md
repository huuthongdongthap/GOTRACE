# Pre-Flight Deployment Checklist — Cloudflare Pages

**Mục tiêu:** Kiểm tra điều kiện triển khai Web App PMO GOTRACE V2.2 lên Cloudflare Pages (Free Domain: `gotrace-pmo.pages.dev`).  
**Thời gian:** 30/09/2026  
**Chủ trì:** DevOps Engineer & Tech Ops  

---

## 1. Trạng Thái Môi Trường & Mã Nguồn

| Tiêu Chí | Trạng Thái | Chi Tiết Kiểm Tra |
|:---|:---:|:---|
| **TypeScript Typecheck** | PASS | Không có lỗi compile nào (`tsc --noEmit`) |
| **Next.js 14 Build** | PASS | `npm run build` hoàn tất (Next.js 14.2.35 SSG) |
| **Static Export Assets** | PASS | Thư mục `out/` sẵn sàng (`index.html`, `404.html`, `_next/`) |
| **Kích thước file mã** | PASS | Toàn bộ components & libs tuân thủ nghiêm ngặt $\le 200$ dòng |
| **Bảo mật dữ liệu** | PASS | Lược bỏ 100% dữ liệu cá nhân theo chỉ thị bắt buộc |

---

## 2. Trạng Thái Cloudflare & Wrangler CLI

| Tiêu Chí | Trạng Thái | Chi Tiết Kiểm Tra |
|:---|:---:|:---|
| **Wrangler Version** | PASS | `wrangler 4.144.0` |
| **Tài khoản CF** | PASS | `Huuthong.dongthap@gmail.com's Account` |
| **Account ID** | PASS | `b69fee03bdd94234eea8e4114cfc36ab` |
| **Token Permissions** | PASS | `pages (write)` được cấp quyền đầy đủ |
| **Cloudflare Project** | PASS | Dự án `gotrace-pmo` tồn tại trên hệ thống |
| **Target Production URL** | PASS | `https://gotrace-pmo.pages.dev` |

---

## 3. Phán Quyết Pre-Flight

- **Kết luận:** ĐỦ ĐIỀU KIỆN TIẾN HÀNH TRIỂN KHAI (GO FOR DEPLOYMENT).
- **Lệnh thực thi dự kiến:** `npx wrangler pages deploy out --project-name gotrace-pmo --commit-dirty=true`
