# Rollback Plan — Cloudflare Pages

**Mục tiêu:** Kế hoạch phục hồi tức thì trong trường hợp bản triển khai mới gặp sự cố hoặc cần đảo ngược phiên bản trên Cloudflare Pages.  
**Dự án:** `gotrace-pmo` (`gotrace-pmo.pages.dev`)  
**RTO (Recovery Time Objective):** $\le 60\text{ giây}$  
**RPO (Recovery Point Objective):** 0 dữ liệu mất mát (Static Application)  

---

## 1. Cơ Chế Rollback Của Cloudflare Pages

Mỗi lần triển khai qua Wrangler CLI, Cloudflare Pages đều lưu trữ một bản snapshot bất biến (Immutable Deployment Hash). Các bản triển khai trước đó không bị xóa mà luôn duy trì trạng thái khả dụng.

- **Bản triển khai hiện tại:** `https://c4e8cb4c.gotrace-pmo.pages.dev`
- **Bản triển khai trước đó (Healthy Baseline):** Được liệt kê qua lệnh danh sách deployments.

---

## 2. Quy Trình Khôi Phục Nhanh (Instant Rollback Procedures)

### Phương án 1: Rollback qua Cloudflare Dashboard (GUI)
1. Đăng nhập [dash.cloudflare.com](https://dash.cloudflare.com/) $\rightarrow$ Chọn tài khoản $\rightarrow$ **Workers & Pages**.
2. Chọn dự án **`gotrace-pmo`** $\rightarrow$ Tab **Deployments**.
3. Tìm bản triển khai ổn định gần nhất trong danh sách.
4. Bấm vào dấu `...` ở góc phải của bản ghi đó $\rightarrow$ Chọn **Rollback to this deployment**.
5. Xác nhận: Cloudflare sẽ lập tức trỏ `gotrace-pmo.pages.dev` về bản snapshot được chọn trong vòng **10 giây**.

### Phương án 2: Rollback qua Wrangler CLI (Terminal)
Nếu cần khôi phục qua dòng lệnh từ máy trạm:
```bash
# 1. Liệt kê các deployments gần nhất để lấy ID
npx wrangler pages deployment list --project-name gotrace-pmo

# 2. Hoặc triển khai lại từ bản build git commit trước đó
cd "pmo-web-app"
git checkout <commit_hash_an_toan>
npm run build
npx wrangler pages deploy out --project-name gotrace-pmo --commit-dirty=true
```

### Phương án 3: Fallback tức thời sang máy chủ nội bộ (Local Fallback Daemon)
Trong tình huống mạng Internet quốc tế cáp quang biển bị gián đoạn:
- Máy chủ nội bộ cổng 3000 luôn được duy trì sẵn sàng:
  ```bash
  cd "pmo-web-app"
  npx serve -s out -l 3000
  ```
- Đội ngũ tiền phương tại TP. Sa Đéc có thể truy cập qua mạng LAN nội bộ hoặc VPN: `http://<local-ip>:3000`.

---

## 3. Danh Sách Liên Hệ Khẩn Cấp

| Vai Trò | Trách Nhiệm | Kênh Liên Lạc |
|:---|:---|:---|
| **Tech Ops Lead** | Trực tiếp kích hoạt lệnh rollback | Nội bộ PMO |
| **PMO Lead** | Phê duyệt quyết định dừng hoặc khôi phục bản phát hành | Chỉ huy trưởng |
| **Field Ops Agent** | Báo cáo lỗi phát sinh thực địa từ máy tính bảng Gate Kit | Hiện trường Sa Đéc |
