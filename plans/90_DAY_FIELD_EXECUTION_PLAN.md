# KẾ HOẠCH TÁC CHIẾN THỰC ĐỊA 90 NGÀY PMO GOTRACE TÂY NAM BỘ
**Dự án:** Triển Khai Hạ Tầng Dữ Liệu Chuỗi Cung Ứng & An Toàn Thực Phẩm GOTRACE V2.2  
**Địa bàn tác chiến:** Vùng Tây Nam Bộ (Long An đến Cà Mau) — Trọng tâm bàn đạp (Beachhead): TP. Sa Đéc (Đồng Tháp)  
**Chủ quản điều hành:** PMO Lead (Người đại diện hợp pháp GOTRACE khu vực Tây Nam Bộ)  
**Ngân sách 90 ngày:** 568.000.000 VNĐ (Baseline) / 715.000.000 VNĐ (Full Equipment) — 6 Headcount  
**Single Source of Truth (SSOT):** [`/docs/00_MASTER_INDEX.md`](../docs/00_MASTER_INDEX.md) | [`docs/06_PMO_Master_Execution_Plan.md`](../docs/06_PMO_Master_Execution_Plan.md) | [`docs/10_PMO_Interview_Playbook.md`](../docs/10_PMO_Interview_Playbook.md)

---

## I. TỔNG QUAN CHIẾN LƯỢC & LUẬN ĐIỂM ĐẦU TƯ

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CHIẾN LƯỢC MŨI KHOAN & HỆ SỐ NHÂN MẠNG LƯỚI                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│     [ MŨI KHOAN TROJAN HORSE ]            [ HỆ SỐ NHÂN 1 : 4.8 ]                       │
│     Tinh bột & Sợi tươi Sa Đéc   ───►     1 Bếp Ăn Tập Thể Kéo Theo:                   │
│     • Hạn dùng 18h                        ├── 1. NCC Tinh bột / Sợi tươi (Hội Bột)     │
│     • Rủi ro vi sinh B. cereus            ├── 2. NCC Đạm (Thịt heo VietGAP, cá tra)    │
│     • Test Tinopal, Formol, Hàn the       ├── 3. NCC Trứng (Gia cầm sạch UV)           │
│     • Nỗi đau pháp lý QĐ 1246             └── 4. NCC Rau củ quả (VietGAP an toàn)      │
│                                                                                        │
│     [ GÓI CHẨN ĐOÁN DIAGNOSTIC ]          [ HỢP ĐỒNG SAAS DÀI HẠN ]                    │
│     30.000.000 – 50.000.000 VNĐ   ───►    120.000.000 – 180.000.000 VNĐ/năm            │
│     (2–4 tuần khảo sát hiện trường)       (Khấu trừ 100% phí Diagnostic)               │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Bối cảnh & Tử huyệt thị trường Tây Nam Bộ
1. **Thực trạng ngành:** ĐBSCL cung ứng 24 triệu tấn lúa gạo, 6.7 triệu tấn trái cây và hàng nghìn bếp ăn trường học/KCN nhưng 90% giải pháp phần mềm thất bại do "bẫy bán lẻ" (bán tem nhãn QR thụ động B2C không giải quyết được tính toàn vẹn dữ liệu chuỗi).
2. **Áp lực pháp lý 2026:**
   - Đợt siết chặt thanh kiểm tra An toàn thực phẩm sau 58 vụ ngộ độc bán trú đầu năm 2026.
   - Bắt buộc thực hiện nghiêm ngặt **Quyết định 1246/QĐ-BYT** về Kiểm thực 3 bước và Lưu mẫu thức ăn 24h.
   - Yêu cầu tuân thủ **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân (phụ huynh, học sinh).
   - Chuẩn hóa theo **Đề án 100/QĐ-TTg & Thông tư 02/2024/TT-BKHCN** kết nối Cổng truy xuất nguồn gốc quốc gia từ ngày 01/07/2026.

### 2. Mũi khoan Trojan Horse & Hệ số nhân mạng lưới 1 : 4.8
- **Điểm đột phá (Trojan Horse Wedge):** Tinh bột & Sợi tươi Sa Đéc (hủ tiếu, bún tươi, bánh canh). Đây là nhóm mặt hàng có rủi ro cao nhất: hạn sử dụng ngắn (<18 giờ ở nhiệt độ phòng), nguy cơ nhiễm độc vi sinh *Bacillus cereus*, và nỗi sợ hóa chất phụ gia (Tinopal, Formol, Hàn the).
- **Hội tụ 4 Trụ cột Thực phẩm:** Khi GOTRACE thâm nhập thành công vào 1 Bếp ăn tập thể hạt nhân (Anchor Kitchen), hệ thống tự động kéo theo trung bình **4.8 Nhà cung cấp vệ tinh** thuộc 4 Trụ cột:
  1. *Trụ cột 1 (Starch):* Bột lọc Sa Đéc, hủ tiếu, bún, gạo ST25 Cỏ May.
  2. *Trụ cột 2 (Protein):* Thịt heo VietGAP, gà sạch, cá tra phi lê đông lạnh.
  3. *Trụ cột 3 (Egg):* Trứng gà tiệt trùng UV, trứng vịt kiểm dịch.
  4. *Trụ cột 4 (Veg):* Rau lá VietGAP, củ quả Đà Lạt/Cần Thơ, gia vị chuẩn.
- **Mô hình Doanh thu kép:**
  - **Gói Chẩn đoán Dữ liệu Chuỗi (Diagnostic Service):** 30–50 triệu VNĐ (2–4 tuần khảo sát hiện trạng, đo lường điểm nghẽn, kiểm toán rủi ro K01–K12).
  - **Chuyển đổi Hợp đồng SaaS:** 120–180 triệu VNĐ/năm/Bếp ăn (khấu trừ 100% phí Diagnostic đã thu).
  - **Phí kết nối dữ liệu NCC Tier-2:** 5–15 triệu VNĐ/năm/NCC.

---

## II. LỘ TRÌNH TRIỂN KHAI 4 PHÂN KỲ TÁC CHIẾN (P0 – P3)

```
┌─────────────────────┬─────────────────────┬─────────────────────┬───────────────────────┐
│  P0: THIẾT LẬP      │  P1: MŨI KHOAN      │  P2: LIVE PILOT     │  P3: CONVERT SAAS     │
│  Tuần 1 - Tuần 2    │  Tuần 3 - Tuần 6    │  Tuần 7 - Tuần 10   │  Tuần 11 - Tuần 12    │
├─────────────────────┼─────────────────────┼─────────────────────┼───────────────────────┤
│ • VP Tiền phương    │ • Hội Bột Sa Đéc    │ • Cấp GCI 4 Trụ cột │ • Bàn giao Audit      │
│ • Ủy quyền Pháp lý  │ • 2 Bếp ăn Anchor   │ • Chạy Rules K01-K12│ • Ký Hợp đồng SaaS    │
│ • Onboard 6 NV      │ • Bán Diagnostic    │ • QĐ 1246 số hóa    │ • Kéo 4.8 NCC Tier-2  │
│ • Vận hành Portal   │ • Rà soát 12 rủi ro │ • Fire Drill ≤ 15m  │ • Mở Cần Thơ, Long An │
└─────────────────────┴─────────────────────┴─────────────────────┴───────────────────────┘
```

### Phân kỳ P0: Thiết Lập Bộ Máy Tiền Phương & Kích Hoạt Pháp Lý (Tuần 1 – Tuần 2)
- **Mục tiêu:** 100% cơ sở vật chất, ủy quyền pháp lý người đại diện và hạ tầng PMO sẵn sàng tại Sa Đéc.
- **Nhiệm vụ cụ thể:**
  1. Ban hành Quyết định Ủy quyền Người đại diện hợp pháp GOTRACE khu vực Tây Nam Bộ cho PMO Lead.
  2. Thuê và thiết lập Văn phòng Tiền phương PMO tại TP. Sa Đéc (vị trí kết nối KCN Sa Đéc và Làng bột Tân Phú Đông).
  3. Tuyển dụng và onboard 6 nhân sự nòng cốt:
     - 01 PMO Lead (Chỉ huy chung, B2G, chốt deal Anchor).
     - 01 Solution Architect / Tech Ops (Đấu nối API, cấu hình Rule Engine K01–K12, IoT gateway).
     - 02 Field Operations Specialist (Kiểm thực tại cổng, đào tạo nhân sự bếp, thu thập dữ liệu).
     - 02 Business Development Reps (Tiếp cận NCC Hội bột, thịt, trứng, rau; chào bán gói Diagnostic).
  4. Triển khai nội bộ `pmo-web-app` trên tablet/mobile cho đội ngũ hiện trường.

### Phân kỳ P1: Mũi Khoan Trojan Horse & Bán Gói Diagnostic (Tuần 3 – Tuần 6)
- **Mục tiêu:** Ký ít nhất 1 Hợp đồng Diagnostic (30–50M VNĐ) với Bếp ăn Anchor và onboard 3 NCC Tinh bột Sa Đéc.
- **Nhiệm vụ cụ thể:**
  1. Làm việc với Hội Ngành Bột Sa Đéc và 3 nhà sản xuất nòng cốt (Bột Năm Hòa, Hủ tiếu Sa Giang/Bà Sâm) để chuẩn hóa định danh lô sợi tươi 18h.
  2. Tiếp cận 2 Cụm Bếp ăn Hội tụ: Bếp ăn trường tiểu học bán trú Sa Đéc và Bếp ăn công nghiệp KCN Sa Đéc (1.500 – 3.000 suất/ngày).
  3. Triển khai quy trình Bán hàng 11 bước; ký kết Hợp đồng Dịch vụ Diagnostic 2–4 tuần (30–50 triệu VNĐ).
  4. Thực hiện kiểm toán rủi ro dữ liệu chuỗi hội tụ 4 Trụ cột theo chuẩn Kitchen Rules K01–K12.

### Phân kỳ P2: Triển Khai Live Pilot 1 Chuỗi Hội Tụ & Đấu Nối Ledger (Tuần 7 – Tuần 10)
- **Mục tiêu:** Vận hành live 1 chuỗi cung ứng thực phẩm hoàn chỉnh trên GOTRACE V2.2; kiểm chứng 12 Kitchen Rules và diễn tập Traceback $\le 15$ phút.
- **Nhiệm vụ cụ thể:**
  1. Cấp mã định danh toàn cầu GCI (`GT:VN:ITEM:...`) cho 4 NCC đại diện (Tinh bột, Thịt heo, Trứng, Rau).
  2. Thiết lập Cổng tiếp nhận (Gate Verification) với Rule Engine tự động: Quét QR/mã vạch tại cân điện tử cổng bếp, tự động chặn nhập kho nếu nhiệt độ thịt >5°C hoặc thiếu chứng nhận thú y.
  3. Số hóa 100% Quy trình Kiểm thực 3 bước và Lưu mẫu 24h theo QĐ 1246/QĐ-BYT trên Web App/Tablet.
  4. Tổ chức Diễn tập Phản ứng Sự cố Thực địa (Fire Drill Simulation): Giả lập ngộ độc, khoanh vùng đối tượng phơi nhiễm và xác định chính xác lô nguyên liệu gốc trong vòng $\le 15$ phút (thay vì 24–48h thủ công). Mời Ban Giám hiệu, Phòng GD&ĐT, Đại diện BQL KCN và Sở Y tế thị sát.

### Phân kỳ P3: Nghiệm Thu Giá Trị, Ký SaaS & Kích Hoạt Nhân Rộng 1:4.8 (Tuần 11 – Tuần 12)
- **Mục tiêu:** Ký Hợp đồng SaaS Thường niên (120–180 triệu/năm), nghiệm thu đối soát Mass Balance và nhân rộng ra 5 NCC vệ tinh.
- **Nhiệm vụ cụ thể:**
  1. Bàn giao Báo cáo Kiểm toán Cân bằng Khối lượng (Mass Balance Reconciliation Report): Đối chiếu định mức thực đơn vs khối lượng thực tế tiêu thụ, triệt tiêu thất thoát và rủi ro pháp lý.
  2. Ký Hợp đồng Thuê bao Thường niên (SaaS Contract) 120–180 triệu/năm (khấu trừ 30–50M Diagnostic).
  3. Kích hoạt Network Multiplier 1:4.8: Bếp ăn yêu cầu 5 NCC vệ tinh kết nối tài khoản Tier-2 trên GOTRACE Portal.
  4. Đóng gói Case Study Bếp ăn Sa Đéc chuẩn GOTRACE làm tiền đề mở rộng sang KCN Trà Nóc (Cần Thơ) và Long An (KCN Bến Lức/Đức Hòa).

---

## III. MA TRẬN PHÂN NHIỆM RACI 90 NGÀY

| Hạng mục Tác chiến | PMO Lead | Tech Ops | Field Ops (x2) | BD Reps (x2) | BOD / Founder |
|:---|:---:|:---:|:---:|:---:|:---:|
| Thành lập VP Tiền phương & Kích hoạt Pháp lý Sa Đéc | **A / R** | C | C | I | **A (Duyệt)** |
| Khảo sát & Ký kết Gói Diagnostic Bếp ăn | **A / R** | C | C | **R** | I |
| Chuẩn hóa GCI Lô Bột/Sợi tươi 18h Sa Đéc | A | **R** | **R** | C | I |
| Số hóa Kiểm thực 3 bước & Gate Rules K01-K12 | A | **R** | **R** | I | I |
| Tổ chức Diễn tập Truy xuất Khẩn cấp $\le 15$ phút | **A / R** | **R** | **R** | C | I (Thị sát) |
| Ký kết Hợp đồng SaaS & Thu tiền Bếp ăn Anchor | **A / R** | I | I | **R** | **A (Duyệt)** |
| Onboard 4.8 NCC Vệ tinh (Network Multiplier) | A | C | **R** | **R** | I |

*(Ghi chú: A = Accountable / Chịu trách nhiệm tối hậu; R = Responsible / Thực thi chính; C = Consulted / Tham vấn; I = Informed / Nhận thông báo)*

---

## IV. BỘ CÔNG CỤ THỰC ĐỊA PMO WEB APP (10 TABS TÁC CHIẾN)

Ứng dụng `pmo-web-app` (Next.js 14, Dark Theme, Tailwind CSS) được cấu hình 10 module nghiệp vụ hoàn chỉnh:

1. **Tab 1: Luận Điểm Pitch BOD:** Trình bày 4 Slide chiến lược bảo vệ ngân sách 568M/715M trước Founder & Hội đồng Quản trị.
2. **Tab 2: Sales Discovery Playbook:** Quy trình 11 bước bán hàng B2B, 18 Objection Battle Cards và kịch bản chốt gói Diagnostic 30–50M.
3. **Tab 3: Lộ Trình 90 Ngày:** Theo dõi 12 Cột mốc chiến lược P0–P3 và tiến độ hoàn thành theo thời gian thực.
4. **Tab 4: Bản Đồ Anchor Accounts:** 100 Anchor Accounts ĐBSCL với bộ lọc ngành và bộ tính điểm ICP Network Value Score (NVS).
5. **Tab 5: Công Cụ Vận Hành:** Trình tạo mã định danh toàn cầu GCI (`GT:VN:...`) và giả lập quy trình Kiểm thực 3 bước.
6. **Tab 6: Giả Lập Traceback Khẩn Cấp:** Diễn tập truy vết đa chiều bán kính sự cố $\le 15$ phút cho 4 Trụ cột Thực phẩm.
7. **Tab 7: 12 Quy Tắc Bếp Ăn (K01–K12):** Giám sát các cổng tự động chặn vi phạm (Gate, Storage, Prep, Cook, Serve).
8. **Tab 8: 4 Trụ Cột Thực Phẩm:** Mô hình hóa chuỗi cung ứng hội tụ Tinh bột Sa Đéc, Đạm, Trứng, Rau và Network Multiplier 1:4.8.
9. **Tab 9: B2G & Tuân Thủ Pháp Lý:** Quản lý văn bản hành chính (Sở KH&CN, Chi cục ATVSTP, Đề án 100, NĐ 13/2023/NĐ-CP).
10. **Tab 10: Nhập Liệu Hiện Trường (Field Ops QĐ 1246):** Giao diện mobile-ready nhập dữ liệu tại cổng tiếp nhận, tự động kiểm tra vi phạm K01–K12, lưu trữ LocalStorage ngoại tuyến và xuất biên bản in sẵn chuẩn Bộ Y tế.

---

## V. CHỈ SỐ ĐO LƯỜNG HIỆU QUẢ CỐT LÕI (TARGET KPIS)

| Chỉ số Hiệu quả (KPI) | Hiện trạng (Before) | Mục tiêu Cam kết (After 90 Ngày) | Phương pháp Đo lường |
|:---|:---:|:---:|:---|
| **Số Anchor Ký Pilot** | 0 | **$\ge 2$ Khách hàng** | Hợp đồng ký kết & phiếu thu cọc |
| **Doanh thu Thu hồi** | 0 VNĐ | **200M – 350M VNĐ** | Doanh thu dịch vụ Diagnostic + Setup |
| **Network Multiplier** | 1 : 1 | **1 : 4.8 NCC / Bếp** | Số NCC Tier-2 kết nối vào Bếp Anchor |
| **Traceback Latency** | 24 – 48 giờ | **$\le 15$ phút (Demo $\le 60$s)** | Biên bản bấm giờ diễn tập thực tế |
| **Độ chính xác Cân bằng** | Thất thoát ~5–8% | **Sai lệch $\le 1.5\%$** | Báo cáo Mass Balance Reconciliation |
| **Tuân thủ QĐ 1246** | 0% (Sổ giấy thủ công) | **100% Hồ sơ Số hóa** | Nhật ký điện tử Kiểm thực 3 bước & Lưu mẫu 24h |
| **Kiểm soát Ngân sách** | — | **$\le 568.000.000$ VNĐ** | Báo cáo giải ngân PMO định kỳ hàng tuần |
