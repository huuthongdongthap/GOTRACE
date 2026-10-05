# 00_EXECUTIVE BRIEF — GOTRACE MEKONG
## Tóm Tắt Chiến Lược Toàn Bộ Bộ Tài Liệu PMO

**Ngày:** Tháng 9/2026
**Chuẩn bị bởi:** PMO Team GOTRACE Mekong
**Trình bày cho:** Ban Giám đốc / Founder GOTRACE
**Thời gian đọc:** 20 phút
**Tài liệu chi tiết:** 7 files kèm theo (xem Index cuối tài liệu)

---

## MỘT TRANG — THESIS ĐẦU TƯ GOTRACE TẠI ĐBSCL

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

### 🟠 Phát hiện 5: Fruit Pilot Phải Đợi 2027 — Nhưng Setup Từ Ngay Bây Giờ

Sầu riêng vụ chính ĐBSCL: Tháng 5–6/2027. Xoài Cát Chu: Tháng 3–5/2027. Không có mùa vụ nào phù hợp cho full fruit pilot trong Q4/2026.

**Nhưng:** GACC crisis đang xảy ra ngay bây giờ — đây là thời điểm tốt nhất để tiếp cận Fruit Anchor về compliance, setup hệ thống, và có sẵn data model trước vụ chính 2027.

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

**Investment Period:** Q4/2026 là giai đoạn đầu tư. Breakeven dự kiến Q2/2027 khi Full Anchor Contracts chạy.

**24-Month Revenue Projection:**
- 13 Tier-1 Accounts → 60% conversion → 8 Pilots × 80 triệu = ~640 triệu
- 20 Tier-2 Accounts → 40% conversion → 8 Pilots × 50 triệu = ~400 triệu
- 30 Tier-3 Accounts → 25% conversion → 7 Pilots × 30 triệu = ~210 triệu
- **Tổng 24 tháng: ~1,2–1,5 tỷ VND** (chưa tính Full Anchor sau pilot)

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
| **00_Executive_Brief.md** | Tài liệu này — tóm tắt toàn bộ | Board / Founder | 20 phút |
| **GOTRACE_Strategic_Gap_Analysis.md** | Self-critique + research findings | PMO + BD Lead | 30 phút |
| **02_Rice_Playbook.md** | ICP, Data Model, Pilot Design cho gạo | BD + Field + Tech | 45 phút |
| **03_Fruit_Playbook.md** | ICP, GACC Compliance, Branching Chain cho trái cây | BD + Field | 45 phút |
| **04_Kitchen_Playbook.md** | Food Safety, Converging Chain, Liability Shield | BD | 40 phút |
| **05_PMO_Execution_Plan.md** | 90-day plan, Team, Budget, Risk Register | PMO Lead | 40 phút |
| **06_Target_Account_Map.md** | 100 Accounts + NVS Scoring + Territory | BD + PMO | 30 phút |
| **07_Sales_Discovery_Playbook.md** | Discovery Questions, Objections, Demo Flows | BD Team | 30 phút |

**Tổng: ~8 tài liệu · ~175 KB · ~280 phút đọc đầy đủ**

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
