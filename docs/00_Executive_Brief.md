# 00_EXECUTIVE BRIEF — GOTRACE MEKONG
## Tóm Tắt Chiến Lược Toàn Bộ Bộ Tài Liệu PMO

**Ngày:** Tháng 9/2026
**Chuẩn bị bởi:** PMO Team GOTRACE Mekong
**Trình bày cho:** Ban Giám đốc / Founder GOTRACE
**Thời gian đọc:** 20 phút  
**Thuộc bộ tài liệu:** [GOTRACE Mekong Strategy & Execution System 2026–2028](./00_MASTER_INDEX.md) (Hệ thống 10 tài liệu chuẩn hóa 00–09)

---

## MỘT TRANG — THESIS ĐẦU TƯ GOTRACE TẠI ĐBSCL

> [!IMPORTANT]
> **GOTRACE là hạ tầng dữ liệu chuỗi cung ứng thực phẩm cho Đồng bằng sông Cửu Long.**
>
> Không phải phần mềm quản lý kho. Không phải app in QR code. Không phải thêm một hệ thống truy xuất nữa.
>
> GOTRACE là lớp kết nối dữ liệu xuyên doanh nghiệp — thứ mà hiện tại phải làm bằng điện thoại, Excel, và sổ tay.

**Thị trường:** ĐBSCL sản xuất 56% lúa gạo và 43% trái cây cả nước. Hơn 24 triệu tấn lúa, 6,7 triệu tấn trái cây. 158 thương nhân xuất khẩu gạo được cấp phép. 2.400+ mã số vùng trồng tại Đồng Tháp. 210+ doanh nghiệp đang tham gia Chương trình 1 Triệu Hecta Lúa. Đây là thị trường đủ lớn.

**Timing:** Tháng 9/2026 là thời điểm tốt nhất để vào thị trường:
- Hệ thống truy xuất quốc gia vừa ra mắt 1/7/2026 → Áp lực compliance đang tăng.
- GACC Decree 280 từ 1/6/2026 → Trái cây đang trong khủng hoảng mã số.
- Ngộ độc thực phẩm tập thể tăng 66% trong H1/2026 → Kitchen đang sợ.
- 1Mha Program cần data layer cho MRV Protocol → Cơ hội carbon credit.
- Vụ Đông Xuân bắt đầu tháng 11 → Pilot Rice phải ký Anchor trong tháng 10.

**Competitive moat:** GOTRACE có lợi thế mà đối thủ không có — Founder đã ở bên trong iCheck và hiểu rõ tại sao mô hình đó không giải được bài toán cross-company graph. Đây là lợi thế "born from insight", không phải "born from technology."

---

## 5 PHÁT HIỆN QUAN TRỌNG — KHÔNG CÓ TRONG BLUEPRINT GỐC

*Từ quá trình tự phản biện và research thực tế tháng 9/2026:*

### 🔴 Phát hiện 1: EUDR không áp dụng cho Rice và Fruit

Blueprint gốc đề cập EUDR như một cơ hội chính. **Thực tế:** EUDR hiện tại chỉ áp dụng cho cattle, cocoa, coffee, palm oil, rubber, soy, wood. Gạo và trái cây KHÔNG trong scope.

**Điều chỉnh:** Thay EUDR bằng 3 driver thực sự:
- **Rice:** MRV Protocol 1Mha (carbon credit ~$20/tấn) + Nghị định 37/2026
- **Fruit:** GACC Decree 280 (1/6/2026) + cadmium/Auramine O enforcement
- **Kitchen:** Luật ATTP sửa đổi + TP.HCM công khai thực phẩm hàng ngày

---

### 🔴 Phát hiện 2: Chương trình 1 Triệu Hecta — Cơ Hội Bị Bỏ Sót

421.000 ha đã triển khai (tháng 8/2026), 1.100+ HTX, 210+ doanh nghiệp đang tham gia. MRV Protocol yêu cầu dữ liệu chuỗi đầy đủ để qualify carbon credit từ World Bank/TCAF.

**GOTRACE = Supply Chain Data Layer cho 1Mha** — kết nối từ vùng canh tác → chế biến → xuất khẩu trong một graph duy nhất. Đây là lực kéo dữ liệu lớn nhất hiện tại tại Mekong, và là kênh tiếp cận 210 doanh nghiệp với tên, địa chỉ sẵn có qua Sở NN&PTNT.

**ROI argument:** 1.000 ha liên kết → ~3.500–4.000 tấn gạo → ~$70.000–$80.000 carbon credit/vụ → Chi phí GOTRACE nhỏ hơn 5% số đó.

---

### 🔴 Phát hiện 3: Data Trust — "Recorded" ≠ "Verified"

Blueprint không có mô hình rõ ràng về chất lượng dữ liệu. Đây là rủi ro lớn nhất: Anchor tin vào dữ liệu GOTRACE nhưng dữ liệu đó được nhập tay không kiểm chứng.

**4-Tier Progressive Trust Model được đề xuất:**
- **Tier 1 — Recorded 🔵**: Nhập tay, chưa kiểm chứng
- **Tier 2 — Reviewed 🟢**: Có actor xác nhận hoặc rule check
- **Tier 3 — Cross-checked 🟡**: Đối chiếu nguồn độc lập (cân điện tử, hóa đơn)
- **Tier 4 — Intact 💎**: Hash anchored, không thể thay đổi

Quy tắc quan trọng nhất: Màn hình GOTRACE luôn hiển thị Trust Level của từng data point. "Lot được GOTRACE ghi nhận" ≠ "Lot được GOTRACE xác minh."

---

### 🟠 Phát hiện 4: Kitchen Economic Buyer Không Phải Quản Lý Bếp

Blueprint và tài liệu gốc tiếp cận Kitchen như một bài toán vận hành (quản lý nguyên liệu, recipe). **Thực tế:** H1/2026 có 58 vụ ngộ độc tập thể, 1.573 người bị ảnh hưởng, 10 người tử vong — tăng 66% so với H1/2025.

Economic Buyer thật sự là đơn vị chịu trách nhiệm **hình sự** khi xảy ra ngộ độc: TGĐ Catering, Hiệu trưởng, Giám đốc Bệnh viện, Ban Quản lý KCN. Sales motion phải là **liability shield** + **compliance enablement**, không phải ROI efficiency.

---

### 🟠 Phát hiện 5: Chiến Lược 4 Trụ Cột Thực Phẩm & Trojan Horse — Bột Sa Đéc Là Mũi Khoan Thâm Nhập

**Thiếu sót Blueprint:** Tài liệu gốc chỉ tập trung vào tinh bột Sa Đéc. Thực tế chiến lược 4 Trụ cột hội tụ tại Cổng tiếp nhận Bếp ăn: (1) **Tinh bột** (Bột lọc, Hủ tiếu, Bún, Phở, Gạo ST25) — rủi ro *Bacillus cereus*, Tinopal/Formol/Hàn the; (2) **Đạm** (Thịt heo VietGAP/ASF-free, Gà sạch, Cá tra phi lê) — rủi ro chuỗi lạnh >5°C, dịch tả; (3) **Trứng** (Trứng gà tiệt trùng UV, Trứng vịt kiểm dịch) — rủi ro Salmonella vỏ trứng; (4) **Rau & Gia vị** (Rau lá VietGAP, Củ quả, Dầu/Nước mắm) — rủi ro dư lượng thuốc BVTV, kim loại nặng.

**Trojan Horse Mechanism:** Lấy **Tinh bột & Sợi tươi Sa Đéc** làm mũi khoan (wedge) vì rủi ro cao nhất (hạn dùng 18h, phụ gia cấm), buộc trường học/bệnh viện/KCN yêu cầu dữ liệu số hóa → kéo tự động 4.8 NCC/trụ cột vào GOTRACE (1 Bếp → ~5 NCC Tinh bột + 5 NCC Đạm + 3 NCC Trứng + 5 NCC Rau = 18 NCC upstream).

**Thống kê thực địa:** Làng nghề Bột Sa Đéc sản xuất ~15–20 tấn sợi tươi/ngày phục vụ trường học, KCN tại Đồng Tháp, Cần Thơ, TP.HCM. Tinh bột tươi hạn dùng <18h ở nhiệt độ thường, nguy cơ *Bacillus cereus* + Tinopal/Formol/Hàn the.

**ROI argument:** 1 Anchor Kitchen triển khai QĐ 1246 (3 bước + Lưu mẫu 24h) → đòi hỏi 4 Trụ cột NCC số hóa → Network Multiplier 1:4.8 → hạ thấp CAC, tăng switching cost, tạo Residual Revenue từ toàn chuỗi hội tụ.

---

### 🟡 Phát hiện 6: Fruit Pilot — Setup Ngay Từ Bây Giờ, Cơ Hội Kích Hoạt Sầu Riêng Trái Vụ Cuối Năm 2026

* **Thực tế mùa vụ & Cơ hội trái vụ:** Vụ chính sầu riêng ĐBSCL rơi vào tháng 5–6/2027, xoài Cát Chu vào tháng 3–5/2027. Tuy nhiên, ĐBSCL có thế mạnh đặc thù về **Sầu riêng nghịch vụ (trái vụ)** thu hoạch rộ vào **cuối năm (tháng 10–12/2026 kéo dài đến tháng 1/2027)** tại Tiền Giang, Bến Tre và Đồng Tháp với giá trị xuất khẩu rất cao.
* **Chiến lược hành động:**
  1. **Setup hệ thống ngay từ bây giờ (Q3/2026):** Khủng hoảng kiểm dịch GACC (Cadmium, Auramine O, Lệnh 280) đang xảy ra ngay lúc này — đây là thời điểm vàng để tiếp cận các cơ sở đóng gói (Packhouse Anchors) và chuẩn hóa dữ liệu vùng trồng.
  2. **Kích hoạt vận hành cuối năm nếu kịp chuẩn bị:** Nếu PMO và đối tác hoàn tất sớm công tác chuẩn bị (onboarding packhouse, liên kết mã MSVT và dữ liệu test lab), GOTRACE hoàn toàn có thể **bấm nút kích hoạt Pilot thực địa ngay cuối năm 2026** với lô sầu riêng nghịch vụ xuất khẩu.
  3. **Đòn bẩy trọn vẹn cho vụ chính 2027:** Toàn bộ data model và hạ tầng đã sẵn sàng từ trước sẽ giúp GOTRACE đón đầu trọn vẹn vụ thuận lớn 2027 (xoài tháng 3–5, sầu riêng tháng 5–6) mà không bị động hay trễ nhịp.

---

## THE BIG PICTURE — GOTRACE LÀ GÌ?

```
                    NATIONAL FOOD SAFETY ARCHITECTURE
                           (Vietnam 2026–2030)
    ┌──────────────────────────────────────────────────────────────┐
    │                    GOVERNMENT LAYER                           │
    │    traceviet.mae.gov.vn / verigoods.vn / GACC Portal         │
    │         (Compliance reporting, national oversight)           │
    └────────────────────────┬─────────────────────────────────────┘
                             │ Data feeds from ↓
    ┌────────────────────────▼─────────────────────────────────────┐
    │               GOTRACE — ENTERPRISE DATA LAYER                 │
    │   Cross-company Supply Chain Graph · LOT Identity             │
    │   Evidence Linkage · Mass Balance · Incident Trace            │
    │        (Operational data management — B2B layer)             │
    └──────┬───────────────────────────────────────┬───────────────┘
           │ Pulls data from                       │ Pushes data to
    ┌──────▼──────────┐                   ┌────────▼──────────────┐
    │  FIELD LAYER    │                   │  BUYER/MARKET LAYER   │
    │ HTX / Vườn trồng│                   │ Japan FSA, China GACC │
    │ Packhouse / Bếp │                   │ Korea MFDS, EU FIC    │
    │ (Data producers)│                   │ 1Mha MRV / Carbon     │
    └─────────────────┘                   └───────────────────────┘
```

GOTRACE không cạnh tranh với hệ thống nhà nước — GOTRACE là lớp giúp doanh nghiệp **có đủ dữ liệu vận hành** để đồng bộ lên hệ thống nhà nước và đáp ứng yêu cầu buyer quốc tế.

---

## 3 ARCHETYPE — TẠI SAO THỨ TỰ NÀY?

| Archetype | Supply Chain Type | Pilot Timing | Strategic Role |
|:---|:---|:---|:---|
| **🌾 Rice** | Linear Chain | **Tháng 11/2026** (Đông Xuân) | Prove Network Scale — nhiều HTX, nhiều lô, mass balance |
| **🫖 Kitchen** | Converging Chain | **Tháng 10/2026** (ngay) | Prove Downstream Demand — bếp ăn kéo toàn chuỗi supplier |
| **🍈 Fruit** | Branching Chain | **Tháng 3/2027** (Xoài vụ chính) | Prove Data Complexity — split/merge, lab linkage, cold chain |

**Tại sao Kitchen song song với Rice, không đợi sau?**
- Kitchen không phụ thuộc mùa vụ → bắt đầu ngay.
- Kitchen Anchor (bệnh viện, catering KCN) quyết định nhanh hơn doanh nghiệp gạo lớn.
- Kitchen pilot chứng minh "Downstream Demand" — khi hạ nguồn cần data, thượng nguồn buộc phải cung cấp.

---

## 90-DAY EXECUTION SUMMARY

```
THÁNG 10/2026 — FOUNDATION:
  → Ký ≥ 1 Anchor Agreement (ưu tiên: Rice hoặc Kitchen)
  → Team 6 người vào vị trí (PMO, BD×2, Tech, Field×2)
  → Tiếp cận 10 Tier-1 Accounts
  → Request danh sách 210 DN 1Mha từ Sở NN&PTNT

THÁNG 11/2026 — PILOT LAUNCH:
  → Rice Pilot Go-Live (Vụ Đông Xuân bắt đầu)
  → Kitchen Pilot đang vận hành (6-8 tuần)
  → 5+ HTX onboarded và nhập dữ liệu
  → ≥ 1 LOT traced đầy đủ có thể demo

THÁNG 12/2026 — PROVE VALUE:
  → Business Case với số liệu thực (trace time before/after)
  → Expansion Proposal cho Anchor đang pilot
  → Board Report 90 ngày
  → Pipeline ≥ 5 Tier-1 Accounts đang thương lượng
```

---

## BUDGET & REVENUE PROJECTION

### Budget 90 Ngày

| Hạng mục | Tổng |
|:---|:---|
| Nhân sự (6 người × 3 tháng) | ~396 triệu |
| Vận hành + Di chuyển | ~95 triệu |
| Kỹ thuật (cloud, tools) | ~24 triệu |
| Dự phòng 10% | ~52 triệu |
| **Tổng** | **~567 triệu VND** |

### Revenue Target

| Nguồn | Target Q4/2026 |
|:---|:---|
| Diagnostic Fees (2–3 contracts) | ~100–150 triệu |
| Pilot Contracts (1–2 contracts) | ~100–200 triệu |
| **Tổng Revenue** | **~200–350 triệu** |
| **Net Investment (Budget − Revenue)** | **~220–370 triệu** |

### Bảng Phân Tích Tài Chính 2 Kịch Bản (Financial Scenarios & Breakeven Model)

| Chỉ Số Tài Chính & Tăng Trưởng | Kịch Bản Thận Trọng (Conservative Case) | Kịch Bản Cơ Sở (Base Case) |
|:---|:---|:---|
| **Thời gian đạt điểm hòa vốn (Breakeven Point)** | **18–20 tháng** (Dự kiến Tháng 04–06/2028) | **14–16 tháng** (Dự kiến Tháng 12/2027 – 02/2028) |
| **Số lượng khách hàng trả phí tại điểm hòa vốn** | **10 khách hàng trả phí** (Anchor Enterprise + Diagnostic) | **14 khách hàng trả phí** (Anchor Enterprise + Diagnostic) |
| **Doanh thu tích lũy Năm 1 (Year 1 Revenue)** | ~450–600 triệu VND | ~750–950 triệu VND |
| **ARR Năm 2 (Annual Recurring Revenue Year 2)** | **1.2–1.5 tỷ VND** | **1.8–2.5 tỷ VND** |
| **Tỷ lệ chuyển đổi Pipeline Account (100 Accounts)** | - Tier 1: 40% (5/13 accounts)<br>- Tier 2: 25% (5/20 accounts)<br>- Tier 3: 15% (4/30 accounts) | - Tier 1: 60% (8/13 accounts)<br>- Tier 2: 40% (8/20 accounts)<br>- Tier 3: 25% (7/30 accounts) |
| **Doanh thu Pilot ban đầu (24 tháng đầu)** | ~1.0–1.2 tỷ VND | ~1.2–1.5 tỷ VND |
| **Chuyển đổi Full Anchor SaaS Contract sau Pilot** | 30% khách hàng pilot chuyển đổi sang gói thường niên (80–120M/năm) | 65% khách hàng pilot chuyển đổi sang gói thường niên (120–200M/năm) |
| **Chu kỳ bán hàng B2B (Sales Cycle)** | 5–6 tháng (độ trễ thẩm định ngân sách doanh nghiệp lớn) | 3–4 tháng (chốt nhanh nhờ gói Diagnostic 2–4 tuần) |
| **Điểm bùng phát mạng lưới (Network Inflection)** | Chậm; phụ thuộc vào tài trợ hoặc yêu cầu hành chính địa phương | Nhanh; hiệu ứng mỏ neo kéo theo 50+ HTX và 30+ nhà cung cấp vệ tinh |

> [!NOTE]
> **Đồng bộ hóa Khế ước Tài chính:**  
> - **Kịch bản Cơ sở (Base Case):** Hòa vốn dòng tiền vận hành sau **14–16 tháng** với **14 khách hàng trả phí**, tạo bàn đạp đưa ARR đạt **1.8–2.5 tỷ VND** trong năm thứ 2 khi các Anchor mở rộng từ pilot sang toàn bộ mạng lưới cung ứng.  
> - **Kịch bản Thận trọng (Conservative Case):** Đảm bảo an toàn vốn tối đa ngay cả trong kịch bản chu kỳ chốt hợp đồng nông nghiệp kéo dài, điểm hòa vốn dịch chuyển về mốc **18–20 tháng** với **10 khách hàng trả phí**, ARR năm 2 đạt **1.2–1.5 tỷ VND**.  
> Cả 2 kịch bản đều bảo toàn nguyên tắc không "đốt tiền" vào cơ sở siêu nhỏ, mà dùng doanh thu Diagnostic và Pilot tài trợ cho bộ máy vận hành tinh gọn 6 nhân sự. Số liệu này khớp 100% với công bố tại [`00_MASTER_INDEX.md`](./00_MASTER_INDEX.md) (dòng 25 và 41).

---

## 5 QUYẾT ĐỊNH FOUNDER CẦN LÀM NGAY

```
QUYẾT ĐỊNH 1 — NHÂN SỰ (Tuần 1):
  Xác nhận hoặc điều chỉnh cấu trúc team 6 người.
  Ưu tiên thuê: PMO Lead và Field Agent × 2 ngay.
  → Không có Field Agent = không có HTX data = không có pilot.

QUYẾT ĐỊNH 2 — ANCHOR ĐẦU TIÊN (Tuần 1–2):
  Founder tham gia trực tiếp ít nhất 2 cuộc gặp Tier-1 Anchor đầu tiên.
  Founder có network trong ngành — đây là lợi thế lớn nhất.
  → Ai là Anchor đầu tiên: Cỏ May? Trung An? Catering KCN Cần Thơ?

QUYẾT ĐỊNH 3 — PRICING (Tuần 1):
  Xác nhận dải giá Diagnostic (30–50 triệu?) và Pilot (80–150 triệu?).
  KHÔNG làm free pilot — paid diagnostic tạo commitment từ 2 phía.
  → Founder có thể linh hoạt giá cho Anchor đầu tiên nhưng cần floor.

QUYẾT ĐỊNH 4 — GOVERNMENT RELATIONS (Tuần 2):
  GOTRACE cần Letter of Introduction từ Sở NN&PTNT hoặc UBND Đồng Tháp.
  Founder tiếp cận kênh chính quyền để xin danh sách 210 DN 1Mha.
  → Kênh chính quyền mở rất nhiều cửa tại ĐBSCL.

QUYẾT ĐỊNH 5 — VIRICERT PARTNERSHIP (Tháng 1/2027):
  ViRiCert đang làm GHG measurement cho 1Mha.
  GOTRACE làm supply chain data layer.
  Không cạnh tranh — bổ sung nhau.
  → Explore MOU data exchange: cùng phục vụ 1Mha Program.
```

---

## NHỮNG GÌ CHƯA BIẾT — CẦN VALIDATE

Bộ tài liệu này dựa trên desk research và strategic analysis. Một số giả định cần xác nhận thực địa:

| Giả định | Cần validate với | Deadline |
|:---|:---|:---|
| HTX sẵn sàng nhập liệu qua Zalo | Field Agent thực địa | Tuần 3 |
| Anchor WTP 50–150 triệu cho pilot | BD Discovery meeting | Tuần 4 |
| Lab result có thể export digital | Lab kiểm nghiệm tại ĐT | Tuần 2 |
| ViRiCert có interest hợp tác | Cuộc gặp trực tiếp | Tháng 11/2026 |
| Carbon credit $20/tấn là khả thi | TCAF/World Bank documentation | Tháng 11/2026 |
| Misa API partner program available | Misa partner contact | Tháng 11/2026 |

---

## INDEX — BỘ TÀI LIỆU ĐẦY ĐỦ

| File | Mô tả | Dành cho | Thời gian đọc |
|:---|:---|:---|:---:|
| [**00_MASTER_INDEX.md**](./00_MASTER_INDEX.md) | Single Source of Truth & Cổng điều hướng toàn diện | Toàn bộ dự án | 15 phút |
| [**00_Executive_Brief.md**](./00_Executive_Brief.md) | Tài liệu này — tóm tắt toàn bộ & Investment Thesis | Board / Founder | 20 phút |
| [**01_Mekong_Market_Intelligence_GTM_2026_2030.md**](./01_Mekong_Market_Intelligence_GTM_2026_2030.md) | Báo cáo thị trường ĐBSCL & Chiến lược GTM 2026–2030 | Founder / PMO | 60 phút |
| [**02_Platform_Object_Implementation_Blueprint.md**](./02_Platform_Object_Implementation_Blueprint.md) | Bản thiết kế đối tượng kỹ thuật & 9 Primitives | Tech Lead / Dev | 50 phút |
| [**03_Rice_Playbook.md**](./03_Rice_Playbook.md) | ICP, Data Model, 29 Events & Pilot Design cho gạo | BD + Field + Tech | 45 phút |
| [**04_Fruit_Playbook.md**](./04_Fruit_Playbook.md) | ICP, MSVT First-Class, Cold-chain & Branching Chain trái cây | BD + Field | 45 phút |
| [**05_Kitchen_Playbook.md**](./05_Kitchen_Playbook.md) | Food Safety, Converging Chain, Incident Engine 60s & QĐ 1246 | BD + Ops | 40 phút |
| [**06_PMO_Master_Execution_Plan.md**](./06_PMO_Master_Execution_Plan.md) | Kế hoạch PMO Master 44 chương + 90 ngày (568M VND) | PMO Lead / Ops | 60 phút |
| [**07_Target_Account_Map.md**](./07_Target_Account_Map.md) | 100 Accounts + NVS Scoring + Territory | BD + PMO | 30 phút |
| [**08_Sales_Discovery_Playbook.md**](./08_Sales_Discovery_Playbook.md) | Discovery Questions, 15 Objections, Demo Flows & Kit 22 | BD Team | 30 phút |
| [**09_Strategic_Gap_Analysis.md**](./09_Strategic_Gap_Analysis.md) | Self-critique, bóc tách iCheck + cập nhật pháp lý | PMO + BD Lead | 30 phút |

**Tổng: 11 tài liệu · ~450 KB · ~425 phút đọc đầy đủ**

---

## THÔNG ĐIỆP CUỐI — CHO FOUNDER

> Chuỗi cung ứng thực phẩm ĐBSCL đang đứng trước 3 áp lực đồng thời:
> compliance quốc tế siết chặt, khủng hoảng an toàn thực phẩm trong nước leo thang,
> và chương trình 1Mha đòi hỏi hạ tầng dữ liệu mà chưa ai xây.
>
> GOTRACE có lợi thế timing, lợi thế insight (Founder biết iCheck từ bên trong),
> và lợi thế positioning rõ ràng (không phải QR — là Supply Chain Data Graph).
>
> **Cửa sổ cơ hội: 6–12 tháng.**
> Khi các platform quốc gia ổn định và doanh nghiệp đã tự giải quyết xong —
> GOTRACE không còn là "đến đúng lúc" nữa.
>
> Tháng 10/2026 — bắt đầu.

---

*Prepared by: GOTRACE PMO Team*
*Date: September 2026*
*Confidential — Internal Use Only*
