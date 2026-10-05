# PHASE 01: HẠ TẦNG CLOUD & PRODUCTION DOMAIN GATEWAY

## 1. MỤC TIÊU
- Chuyển đổi ứng dụng từ môi trường Localhost (`http://localhost:3000`) sang môi trường Production Cloud có chứng chỉ bảo mật SSL/TLS.
- Tên miền chính thức đề xuất: `pmo.gotrace.vn` hoặc `sadec.gotrace.vn`.
- Kết nối Cổng Đấu Nối (`src/lib/gotrace-platform.ts`) tới Production Gateway `https://api.gotrace.vn/v1`.

## 2. HẠNG MỤC CÔNG VIỆC (CHECKLIST)
- [ ] Cấu hình biến môi trường production (`.env.production`):
  - `NEXT_PUBLIC_GOTRACE_API_URL=https://api.gotrace.vn/v1`
  - `NEXT_PUBLIC_GOTRACE_WS_URL=wss://api.gotrace.vn/v1/stream`
  - `GOTRACE_API_KEY=gt_live_sec_...`
- [ ] Triển khai CI/CD tự động qua GitHub Actions / Vercel Enterprise / Docker container.
- [ ] Cấu hình Cloudflare WAF bảo vệ phòng chống tấn công DDoS và tối ưu CDN caching tại Việt Nam (VNPT, Viettel, FPT edge nodes).
- [ ] Thiết lập hệ thống giám sát sức khỏe dịch vụ UptimeRobot / Sentry cảnh báo qua Telegram/Zalo nhóm PMO Lead.
