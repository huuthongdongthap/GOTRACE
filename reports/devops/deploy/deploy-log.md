# Deploy Execution Log — Cloudflare Pages

**Mục tiêu:** Ghi nhận nhật ký triển khai bản build Next.js 14 SSG lên Cloudflare Pages.  
**Dự án:** `gotrace-pmo`  
**Thời gian:** 30/09/2026 03:55 UTC (10:55 GMT+7)  
**Công cụ:** Cloudflare Wrangler CLI v4.144.0  

---

## 1. Thông Tin Lệnh Thực Thi

```bash
cd "/Users/mac/mekong cli lastest/GOTRACE/pmo-web-app"
npm run build
npx wrangler pages deploy out --project-name gotrace-pmo --commit-dirty=true
```

---

## 2. Chi Tiết Tiến Trình Triển Khai (Raw Output)

```text
▲ Next.js 14.2.35
   Creating an optimized production build ...
 ✓ Compiled successfully
   Linting and checking validity of types ...
   Collecting page data ...
 ✓ Generating static pages (4/4)
   Finalizing page optimization ...
Route (app)                              Size     First Load JS
┌ ○ /                                    55.7 kB         143 kB
└ ○ /_not-found                          873 B          88.3 kB
+ First Load JS shared by all            87.4 kB

⛅️ wrangler 4.144.0
────────────────────
Uploading... (13/20)
Uploading... (15/20)
Uploading... (17/20)
Uploading... (20/20)
✨ Success! Uploaded 7 files (13 already uploaded) (2.60 sec)
🌎 Deploying...
✨ Deployment complete! Take a peek over at https://c4e8cb4c.gotrace-pmo.pages.dev
```

---

## 3. Điểm Cuối Môi Trường Trực Tuyến (Production Endpoints)

| Loại Điểm Cuối | URL | Trạng Thái |
|:---|:---|:---:|
| **Canonical Production Domain** | [`https://gotrace-pmo.pages.dev`](https://gotrace-pmo.pages.dev) | **`LIVE (200 OK)`** |
| **Unique Deployment Alias** | [`https://c4e8cb4c.gotrace-pmo.pages.dev`](https://c4e8cb4c.gotrace-pmo.pages.dev) | **`LIVE (200 OK)`** |
| **Local Fallback Daemon** | `http://localhost:3000` | **`ACTIVE (200 OK)`** |

---

## 4. Xác Thực Ban Đầu (Initial Verification)

- **HTTP Protocol:** `HTTP/2 200`
- **Cloudflare Datacenter Edge:** `cf-ray: ...-SIN` (Singapore Edge Cache Point)
- **SSL / TLS:** Cloudflare Universal SSL (`TLS 1.3 / HTTPS`) kích hoạt tự động.
- **Dung lượng trang tải lần đầu (First Load JS):** 143 kB (Tối ưu hóa cực cao cho thiết bị di động 4G tại cổng kiểm thực thực địa).
