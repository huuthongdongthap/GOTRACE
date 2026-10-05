# GIAI ĐOẠN 2 - PHÂN KỲ 04: NGHIỆM THU GIAI ĐOẠN 2 & CHỐT KẾ HOẠCH GIAI ĐOẠN 3 (M4)
**Mã Tài Liệu:** `PLN-PHASE2-P04-ACCEPTANCE-PHASE3`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Nông Sản Tây Nam Bộ  
**Thời Gian Thực Hiện:** Tuần 21 – Tuần 24 (Q4/2027)  
**Địa Bàn:** Toàn vùng Tây Nam Bộ (Long An, Đồng Tháp, Cần Thơ, Hậu Giang, Sóc Trăng, Bạc Liêu, Cà Mau)  
**Chủ Quản:** PMO Lead, Solution Architect, BOD Representative, Strategy Officer  

---

## 1. MỤC TIÊU CHIẾN LƯỢC CỦA PHÂN KỲ (OBJECTIVES)

1. **Nghiệm Thu Toàn Diện Kết Quả Phase 2:**
   - Xác nhận 4 Bếp Anchor (1 Sa Đéc + 3 mới) Go-Live 100% Rule Engine K01–K12.
   - Xác nhận 2 Chuỗi cung ứng phức tạp (Trái cây Branching + Lúa 1Mha Linear) có dữ liệu Ledger hoàn chỉnh, không vi phạm GACC.
   - Tổng hợp báo cáo tài chính: ARR thực tế đạt $\ge 15\text{ tỷ VNĐ}$, 150 NCC Tier-2 active.
2. **Xây Dựng Kế Hoạch Phase 3 (Regional Ecosystem & Platform Scale):**
   - Kiến trúc Multi-tenant, Multi-region, Multi-commodity cho toàn vùng Tây Nam Bộ 7 tỉnh/thành.
   - Chuẩn bị hạ tầng Cloud bản sản xuất (Production Cloud Infrastructure) và quy trình vận hành 24/7.
   - Định hướng mở rộng sang mô hình **Food Safety as a Service (FSaaS)** và **Carbon Trading Platform**.
3. **Trình Duyệt Hội Đồng Quản Trị (BOD Review) & Mở Rộng Quyền Hạn (Scale-out Authorization):**
   - Thuyết trình Báo cáo Phase 2 (`REP-PMO-Phase2-2027`).
   - Xin phê duyệt ngân sách Scale-out Fund Phase 3 và nhân sự mở rộng.

---

## 2. NỘI DUNG BÁO CÁO NGHIỆM THU PHASE 2 (DELIVERABLES)

### 2.1 Báo Cáo Kỹ Thuật & Vận Hành (Technical & Operations Report)
- **Gate Verification Dashboard:** Tỷ lệ tuân thủ Gate Rules K01–K12 tại 4 Bếp Anchor (mục tiêu $\ge 99.5\%$).
- **Cold-chain IoT Uptime:** 99.9% thiết bị gửi dữ liệu liên tục, độ trễ trung bình $< 2\text{ phút}$.
- **GACC Quota Compliance:** 0 vụ vi phạm hạn ngạch xuất khẩu trái cây trong 6 tháng vận hành.
- **MRV Carbon Ledger Integrity:** 100% lô lúa có đủ 29 sự kiện chuẩn hóa, 0 lô bị gắn cờ `MASS_BALANCE_MISMATCH`.

### 2.2 Báo Cáo Thương Mại & Tài Chính (Commercial & Financial Report)
| Chỉ Số | KPI Mục Tiêu Phase 2 | Thực Tế (Dự Kiến) | Ghi Chú |
|:---|:---:|:---:|:---|
| **ARR (Doanh thu thường niên)** | $\ge 15\text{ tỷ VNĐ}$ | 15.5 – 16.2 tỷ VNĐ | Bao gồm SaaS Bếp + Kết nối NCC + Carbon Credit Fee |
| **Số Bếp Anchor Onboard** | 4 Bếp | 4 Bếp | Sa Đéc, Trà Nóc, Bến Lức, Đức Hòa |
| **NCC Tier-2 Active** | 150 NCC | 152 NCC | Đạm, Trứng, Rau, Tinh bột, Dầu/Gia vị |
| **Dòng tiền hoạt động** | Dương từ Tháng 5 | Tháng 4 dương | 120M Diag + SaaS advance + Carbon service fee |
| **EBITDA Margin** | $\ge 25\%$ | 28 – 32% | Hiệu ứng nhân rộng 1:4.8 giảm CAC |

### 2.3 Báo Cáo Pháp Lý & Tuân Thủ (Legal & Compliance Report)
- **Quyết định 1246/QĐ-BYT:** 100% biên bản kiểm thực 3 bước và lưu mẫu 24h số hóa có hiệu lực pháp lý tại 4 bếp.
- **Nghị định 13/2023/NĐ-CP:** Tuân thủ 100% bảo vệ dữ liệu phụ huynh học sinh (không lưu trữ tên/hình ảnh học sinh).
- **Lệnh 280 GACC:** Hạ tầng dữ liệu sẵn sàng xuất báo cáo tuân thủ hàng quý cho NAFIQAD.

---

## 3. KẾ HOẠCH GIAI ĐOẠN 3 — HỆ SINH THÁI VÙNG TÂY NAM BỘ (PHASE 3 STRATEGIC BLUEPRINT)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PHASE 3: REGIONAL ECOSYSTEM (2028 – 2029)                        │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                │
│  1. MỞ RỘNG ĐẾN 7 TỈNH/THÀNH: Long An, Đồng Tháp, Cần Thơ, Hậu Giang, Sóc Trăng, Bạc Liêu,   │
│     Cà Mau — Tổng 24 triệu dân, 4.5M lô lúa/năm, 8M tấn trái cây.                              │
│                                                                                                │
│  2. KIẾN TRÚC NỀN TẢNG (PLATFORM ARCHITECTURE):                                                │
│     • Multi-tenant SaaS: Mỗi Bếp Anchor = 1 Tenant độc lập (Data isolation, RBAC).             │
│     • Multi-region Deployment: Edge Node tại Sa Đéc, Cần Thơ, Cà Mau (Latency < 50ms).         │
│     • Multi-commodity: Lúa gạo, Trái cây, Hải sản, Rau củ, Đạm, Gà.                            │
│     • API Gateway Federation: Khả năng đấu nối ERP lớn (SAP, Oracle, FPT.eFactory) thông qua   │
│       chuẩn GCI Protocol (GT:VN:...).                                                          │
│                                                                                                │
│  3. MÔ HÌNH KINH DOANH MỚI (NEW BUSINESS MODELS):                                              │
│     • FSaaS (Food Safety as a Service): Gói thuê bao an toàn thực phẩm cho BQL KCN/Trường học │
│       (Công cụ QĐ 1246 + IoT + Báo cáo tự động cho Sở Y tế).                                   │
│     • Carbon Trading Platform: Sàn giao dịch Tín chỉ Carbon nội địa ($20/tấn CO2e) kết nối      │
│       Nông dân AWD $\leftrightarrow$ Doanh nghiệp cần Offset (Vinamilk, Masan, Heineken...).    │
│     • Traceability Insurance: Hợp đồng bảo hiểm rủi ro truy xuất nguồn gốc (Traced Loss) với    │
│       các công ty bảo hiểm (Bảo Việt, PVI, PTI).                                                │
│                                                                                                │
│  4. MỤC TIÊU TÀI CHÍNH PHASE 3:                                                                │
│     • ARR Target: 85 – 120 tỷ VNĐ/Năm 3.                                                       │
│     • 300 Bếp Anchor, 500 NCC Tier-2.                                                          │
│     • 500.000 héc-ta lúa AWD tích hợp MRV tự động.                                             │
│                                                                                                │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. NÂNG CẤP KỸ THUẬT NÂNG CAO CHO PHASE 3 (PLATFORM UPGRADES)

| Module | Mô Tả Nâng Cấp | Ưu Tiên |
|:---|:---|:---|
| **Multi-tenant Auth & Billing** | OAuth2/OIDC, Sub-domain routing (`tenant.gotrace.vn`), Usage-based billing engine | P0 (Foundation) |
| **Edge Computing Node** | Kubernetes K3s cluster tại 3 Edge Node, Offline-first sync tối ưu cho vùng sâu vùng xa | P0 |
| **GraphQL Federation Gateway** | Single GraphQL schema 연합 các service: Ledger, IoT, Billing, MRV, Compliance | P1 |
| **AI Anomaly Detection** | ML model phát hiện bất thường chuỗi lạnh, gian lận GCI, Mass Balance mismatch tự động | P1 |
| **Carbon Registry Integration** | API trực tiếp Verra, Gold Standard, Việt Nam Carbon Registry (VNCR) | P2 |

---

## 5. LỊCH TRÌNH TRÌNH DUYỆT BOD & KÍCH HOẠT PHASE 3

| Tuần | Hoạt Động | Người Tham Dự | Đầu Ra |
|:---:|:---|:---|:---|
| **Tuần 21** | Hội đồng nhân sự xem xét báo cáo & đề xuất Phase 3 | PMO Lead, CTO, CFO, Founder | Văn bản đồng thuận nhân sự & ngân sách |
| **Tuần 22** | Workshop chiến lược với Cụm KCN & Sở NN&PTNT 7 tỉnh | PMO Lead, BD Reps, Local Gov | Cam kết hợp tác & dữ liệu pilot tỉnh mới |
| **Tuần 23** | Thuyết trình BOD: "Từ Thí điểm Sa Đéc → Hệ sinh thái Tây Nam Bộ" | PMO Lead, Solution Architect | **Quyết nghị BOD Phase 3 Authorization** |
| **Tuần 24** | Ban hành Kế hoạch Triển khai Phase 3 chi tiết | PMO Office | `PLN-PHASE3-2028-EXECUTION` (Full Plan) |

---

## 6. TIÊU CHÍ CHUYỂN GIAI ĐOẠN (PHASE TRANSITION GATE)

**Phase 2 được coi là THÀNH CÔNG và chuyển sang Phase 3 khi:**
1. ✅ Báo cáo `REP-PMO-Phase2-2027` được BOD duyệt.
2. ✅ Quyết định phê duyệt ngân sách Scale-out Fund Phase 3 (ước tính $25 - 35\text{ tỷ VNĐ}$).
3. ✅ Ký cam kết hợp tác (MOU) từ $\ge 3$ Sở NN&PTNT tỉnh mới (Hậu Giang, Sóc Trăng, Cà Mau).
4. ✅ Hạ tầng Multi-tenant Cloud triển khai thành công trên môi trường Staging.

---

## 7. RỦI RO CHIẾN LƯỢC CHUYỂN GIAI ĐOẠN & GIẢI PHÁP

| Rủi Ro | Mức Độ | Giải Pháp |
|:---|:---:|:---|
| **BOD không phê duyệt ngân sách Phase 3 đúng hạn** | Cao | Chuẩn bị Option B: Tự tài chủ từ dòng tiền Carbon Credit & FSaaS (Bootstrap Revenue) |
| **Cạnh tranh từ ERP lớn xâm nhập ngách An toàn thực phẩm** | Trung Bình | Xây dựng "Lũy gỗ" (Moat) bằng Tín chỉ Carbon & Bảo hiểm truy xuất — ERP không có Ledger bất biến |
| **Quy định Carbon Credit nội địa (Đề án 175/2024/QĐ-TTg) thay đổi** | Trung Bình | Thiết kế MRV Engine cấu hình linh hoạt (Config-driven), không hardcode logic pháp lý |