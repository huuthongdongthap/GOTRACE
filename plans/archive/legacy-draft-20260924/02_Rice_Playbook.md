# 02_RICE PLAYBOOK — GOTRACE MEKONG
## Linear Chain · Network Scale · Supply Chain Data Infrastructure

**Version:** 1.0 — September 2026
**Dành cho:** PMO Team tại ĐBSCL — Trình bày Ban Giám đốc / Founder GOTRACE
**Strategic Role:** Prove Network Scale — chứng minh GOTRACE có thể vận hành Data Graph xuyên suốt chuỗi lúa gạo từ vùng nguyên liệu đến xuất khẩu.

---

## PHẦN A — BỐI CẢNH THỊ TRƯỜNG

### A.1 Quy Mô & Cơ Hội

| Chỉ số | Số liệu | Nguồn |
|:---|:---|:---|
| Diện tích lúa ĐBSCL (2026) | ~3,875 triệu ha/năm | Bộ NN&MT |
| Sản lượng lúa ĐBSCL | ~24,63 triệu tấn/năm (~56% cả nước) | Bộ NN&MT |
| Tỷ trọng gạo xuất khẩu từ ĐBSCL | ~90% tổng kim ngạch cả nước | VFA |
| Đồng Tháp (đến 20/8/2026) | 530.677 ha gieo trồng, 2,577 triệu tấn ước | UBND Đồng Tháp |
| Số thương nhân XK gạo được phép | 158 doanh nghiệp (đầu 2025) | Bộ Công Thương |
| Chương trình 1 Triệu Ha | 421.000 ha đã triển khai (tháng 8/2026) | MARD |

**Tại sao Rice là Vertical đầu tiên?**

Lúa gạo không chỉ là ngành hàng lớn nhất — đây là **chuỗi Linear đơn giản nhất để chứng minh mô hình Data Graph**. Khi GOTRACE làm được rice ở quy mô lớn, mọi thứ phức tạp hơn (fruit, kitchen) đều có thể học theo cấu trúc tương tự.

---

### A.2 Hai Loại Anchor — Hai Pain Khác Nhau

Trong ngành lúa gạo Mekong, có **2 loại Anchor Enterprise** với pain và WTP hoàn toàn khác nhau:

```
Loại A: ANCHOR XUẤT KHẨU THÔNG THƯỜNG
─────────────────────────────────────────
Pain: Compliance xuất khẩu (China GACC, Japan FSA, Korea MFDS)
      Bị mất shipment do thiếu truy xuất nguồn gốc
      Đối soát khối lượng giữa HTX và nhà máy mất nhiều tuần
WTP:  Compliance-driven — trả để tránh rủi ro mất lô hàng

Loại B: ANCHOR THAM GIA CHƯƠNG TRÌNH 1 TRIỆU HA
─────────────────────────────────────────────────
Pain: Cần dữ liệu chuỗi đầy đủ để qualify carbon credit (~20 USD/tấn)
      MRV Protocol yêu cầu data từ canh tác → chế biến → xuất khẩu
      Đang nhận hỗ trợ World Bank/TCAF nhưng thiếu data infrastructure
WTP:  Value-driven — trả để unlock carbon credit revenue
```

> **Lưu ý PMO:** Bắt đầu với **Loại B** nếu có thể — pain rõ hơn, funding có sẵn (World Bank/TCAF hỗ trợ chương trình 1Mha), và data requirement bắt buộc tạo urgency thực sự.

---

## PHẦN B — ICP & ACCOUNT QUALIFICATION

### B.1 Ideal Customer Profile (ICP)

**ICP ưu tiên cao nhất:**

```
✅ Nhà máy chế biến/xuất khẩu gạo có:
   • Công suất ≥ 50.000 tấn/năm
   • Ít nhất 5 HTX / nhà cung cấp vùng nguyên liệu
   • Ít nhất 1 thị trường xuất khẩu khó tính (Nhật, Hàn, EU, Trung Quốc)
   • Hoặc đang tham gia chương trình 1 Triệu Ha
   • Có phòng QA/QC và nhân sự chịu trách nhiệm compliance
```

**Danh sách Anchor Candidates tham khảo (cần verify):**

| Công ty | Địa bàn | Lý do ưu tiên |
|:---|:---|:---|
| Lộc Trời Group | An Giang | Có SAP S/4HANA, vùng nguyên liệu lớn, xuất khẩu premium |
| Trung An | Cần Thơ (Thốt Nốt) | Gạo cao cấp, thị trường Nhật/EU, có data readiness |
| Cỏ May | Đồng Tháp | Thương hiệu mạnh, xuất nhiều nước, local anchor |
| Angimex | An Giang | Lâu đời, quy mô lớn, Nhà nước hỗ trợ |
| Vinafood II | Cần Thơ | Nhà máy nhiều tỉnh — network scale cao nhất |
| Gentraco | Cần Thơ + Đồng Tháp | Có kho bãi ở nhiều tỉnh |

> ⚠️ **Lưu ý:** Lộc Trời đã có SAP S/4HANA — integration sẽ phức tạp hơn nhưng data readiness cao hơn. Trung An và Cỏ May có thể receptive hơn vì chưa đầu tư hệ thống lớn.

---

### B.2 Account Qualification Checklist

Trước khi đưa vào pipeline, mỗi account phải qua bộ câu hỏi sàng lọc này:

```
QUALIFY (Tối thiểu phải có 4/6):

[ ] Có ≥ 5 HTX / nhà cung cấp nguyên liệu lúa
[ ] Có ít nhất 1 thị trường xuất khẩu yêu cầu truy xuất
[ ] Hoặc tham gia chương trình 1 Triệu Ha
[ ] Có hoặc sẽ có áp lực từ buyer về dữ liệu nguồn gốc
[ ] Không có hệ thống cross-company LOT tracking hiện tại
[ ] Có decision-maker (GĐ/TGĐ/CFO) có thể tiếp cận trong 30 ngày

DISQUALIFY ngay nếu:
[ ] Chỉ bán nội địa, không có áp lực compliance
[ ] <3 HTX/nhà cung cấp (không đủ network effect)
[ ] Đã ký hợp đồng dài hạn với competitor truy xuất
```

---

## PHẦN C — BẢN ĐỒ NGƯỜI MUA

### C.1 Buyer Map — 7 Vai Trò

| Vai trò | Vị trí điển hình | Câu hỏi họ quan tâm | Mức ảnh hưởng |
|:---|:---|:---|:---:|
| **Economic Buyer** | Chủ tịch / TGĐ / CFO | Chi bao nhiêu? ROI khi nào? Có ảnh hưởng xuất khẩu không? | ⭐⭐⭐⭐⭐ |
| **Business Owner** | GĐ Kinh doanh / XNK | Tôi có thêm được khách hàng/thị trường không? | ⭐⭐⭐⭐ |
| **Operational Owner** | GĐ Nhà máy / GĐ Thu mua | Quy trình thay đổi thế nào? Team tôi mất bao nhiêu effort? | ⭐⭐⭐⭐ |
| **Data Owner** | Trưởng vùng nguyên liệu / Kế toán vật tư | Dữ liệu từ HTX tôi phải làm gì với nó? | ⭐⭐⭐ |
| **IT Owner** | Trưởng phòng IT / Quản trị hệ thống | Tích hợp với ERP/phần mềm hiện tại thế nào? | ⭐⭐⭐ |
| **Compliance Owner** | Trưởng QA-QC / Phụ trách xuất khẩu | Đáp ứng được China GACC / Japan FSA / MFDS không? | ⭐⭐⭐⭐ |
| **Network Owner** | GĐ Thu mua / Trưởng vùng NL | Có quyền yêu cầu HTX cung cấp dữ liệu không? | ⭐⭐⭐⭐⭐ |

> **Nguyên tắc:** Bắt đầu bằng **Compliance Owner** hoặc **Network Owner** (champion dễ tiếp cận nhất). Escalate lên Economic Buyer khi đã có pain map và ROI case.

---

### C.2 Bản Đồ Kháng Cự Nội Bộ

| Vai trò | Lý do kháng cự tiềm ẩn | Cách xử lý |
|:---|:---|:---|
| **GĐ Thu mua** | Sợ lộ nguồn HTX cho đối thủ | Giải thích data được mã hóa, chỉ Anchor mới thấy detail |
| **HTX** | Sợ bị ép giá nếu Anchor biết chi phí SX | Cam kết data của HTX là của HTX — Anchor chỉ thấy LOT-level data |
| **Kế toán nhà máy** | Ngại thêm việc nhập liệu | Demo quy trình tự động từ cân điện tử, giảm bớt không tăng thêm |
| **IT** | ERP integration phức tạp | Bắt đầu với import file, không cần API ngay |

---

## PHẦN D — CHUỖI CUNG ỨNG & DATA MODEL

### D.1 Rice Supply Chain — Linear Chain Map

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        RICE LINEAR CHAIN                                       │
│                                                                                │
│  VÙNG SẢN XUẤT           THU HOẠCH         THU GOM           NHÀ MÁY          │
│  ─────────────           ──────────         ──────           ───────          │
│  • Nông hộ              • Harvest LOT       • Collection     • Milling Batch  │
│  • HTX                  • Ngày thu hoạch    • Lot            • Mass Balance   │
│  • Mã vùng trồng        • Giống             • Điểm cân       • Sấy/Xay/Lau   │
│  • VietGAP/1Mha         • Sản lượng (tấn)  • Phân loại      • Finished LOT  │
│                          • Ẩm độ đầu vào    • Độ ẩm          • Đóng gói      │
│                                             • Tạp chất       │               │
│         ↓                    ↓                  ↓             ↓               │
│                                                                                │
│  KHO / LOGISTICS                    XUẤT KHẨU / PHÂN PHỐI                    │
│  ─────────────                      ──────────────────────                   │
│  • Storage LOT                      • Export Shipment                         │
│  • Kho bãi                          • Container LOT                          │
│  • Bảo quản nhiệt độ               • B/L + C/O                              │
│  • Xuất nhập kho                    • Certificate of Origin                  │
│  • Kiểm định chất lượng            • Phytosanitary Cert                      │
│                                     • Buyer                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### D.2 Core Data Objects — Rice Playbook

```yaml
# IDENTITY OBJECTS
ProductionArea:
  - area_id (mã vùng trồng)
  - province / district / commune
  - gps_polygon
  - certification: [VietGAP, GlobalGAP, 1Mha_certified, SRP]
  - season: [dong_xuan, he_thu, thu_dong]
  - variety: [ST25, ST24, Jasmine, OM5451...]

Actor:
  - actor_id
  - type: [farmer, HTX, trader, processor, exporter]
  - tax_code
  - GLN (GS1 Location Number nếu có)

# LOT OBJECTS
HarvestLot:
  - lot_id
  - production_area_id (FK)
  - actor_id (HTX / farmer)
  - harvest_date
  - variety
  - quantity_gross_kg
  - moisture_content_%
  - impurity_%
  - season
  - method: [hand, mechanical]

CollectionLot:
  - lot_id
  - source_harvest_lots: [HarvestLot IDs] # 1-to-many merge
  - collection_point_id
  - weigh_date
  - quantity_received_kg
  - moisture_after_drying_%
  - collector_actor_id

MillingBatch:
  - batch_id
  - source_collection_lots: [CollectionLot IDs]
  - mill_id
  - start_datetime
  - end_datetime
  - input_quantity_kg
  - output_quantity_kg          # Mass Balance check
  - output_ratio_%              # Tỷ lệ thu hồi gạo
  - broken_ratio_%
  - by_products_kg              # Trấu, cám

FinishedLot:
  - lot_id
  - milling_batch_id (FK)
  - product_type: [white_rice, fragrant, parboiled, brown]
  - variety
  - grade
  - quantity_kg
  - moisture_%
  - quality_test_results

ExportShipment:
  - shipment_id
  - finished_lots: [FinishedLot IDs]
  - container_numbers
  - booking_date
  - loading_date
  - destination_country
  - buyer_name
  - quantity_kg
  - documents: [BL, CO, Phytosanitary, COA, Certificate]
```

### D.3 Mass Balance — Bài Toán Trọng Tâm

**Mass Balance** là cơ chế kiểm tra gian lận phổ biến nhất: nhà máy khai nhận 100 tấn lúa VietGAP nhưng thực tế trộn 30% lúa thường.

```
CÔNG THỨC MASS BALANCE:

Input LOT (lúa đầu vào):
  Σ(HarvestLot.quantity) = Tổng lúa thu mua theo từng nguồn/HTX/mùa vụ

Processing Loss:
  Hao hụt sấy: ~5–8%
  Hao hụt xay xát: ~25–35% (trấu, cám)
  Tỷ lệ thu hồi gạo nguyên: ~65–70%

Output LOT (gạo thành phẩm):
  Σ(FinishedLot.quantity) ≤ Σ(Input) × yield_ratio

RED FLAG nếu:
  Output/Input > expected_yield + 5%  →  Nghi ngờ pha trộn lúa ngoài vùng
  Output/Input < expected_yield - 10% →  Nghi ngờ khai sai sản lượng đầu vào
```

> GOTRACE tự động tính Mass Balance mỗi Milling Batch và alert nếu lệch ngưỡng.

---

## PHẦN E — EVIDENCE MODEL & DATA TRUST

### E.1 Evidence cần liên kết với từng Object

| Object | Evidence bắt buộc | Evidence nâng cao |
|:---|:---|:---|
| **ProductionArea** | Giấy chứng nhận VietGAP / 1Mha, GPS tọa độ | Ảnh vùng trồng, nhật ký canh tác |
| **HarvestLot** | Phiếu cân thu mua (có chữ ký HTX) | Ảnh thu hoạch, kết quả kiểm tra dư lượng BVTV |
| **CollectionLot** | Hóa đơn / phiếu giao hàng, cân điện tử | Ảnh phân loại, kết quả đo ẩm độ |
| **MillingBatch** | Nhật ký sản xuất, Mass Balance record | Thông số máy, ca làm việc |
| **FinishedLot** | Phiếu kiểm phẩm, kết quả lab | Ảnh đóng gói, thông số kho |
| **ExportShipment** | B/L, C/O, Phytosanitary Certificate | COA, lab result tại cảng |

### E.2 4-Tier Data Trust Model

Mỗi data point trong GOTRACE Graph được gán Trust Level:

```
TIER 1 — RECORDED (Có ghi nhận)
  • Nhập tay từ form web/Zalo Mini App
  • Chưa được xác minh độc lập
  • Icon: 🔵 (Blue)
  • Dùng cho: Pilot ban đầu, HTX chưa có cân điện tử

TIER 2 — REVIEWED (Có xác nhận)
  • Đã được actor khác (Anchor/Giám sát) confirm
  • Hoặc automated rule check (quantity range check)
  • Icon: 🟢 (Green)
  • Dùng cho: Sau khi Anchor verify từng Collection Lot

TIER 3 — CROSS-CHECKED (Có đối chiếu)
  • Dữ liệu đối chiếu với nguồn độc lập (cân điện tử API, hóa đơn VAT)
  • Hoặc field spot-check của GOTRACE Field Agent
  • Icon: 🟡 (Gold)
  • Dùng cho: LOT xuất khẩu sang thị trường khó tính

TIER 4 — CRYPTOGRAPHICALLY INTACT (Bảo toàn mật mã)
  • Hash anchored (blockchain hoặc timestamp server)
  • Không thể thay đổi sau khi commit
  • Icon: 💎 (Diamond)
  • Dùng cho: Carbon Credit MRV, export documentation pháp lý
```

> **Rule:** Lô gạo phục vụ MRV Protocol 1Mha cần tối thiểu TIER 3. Lô thường xuất khẩu thông thường: TIER 2 là đủ.

---

## PHẦN F — PAIN MAP & RISK MAP

### F.1 Pain Map

```
PAIN CẤP ĐỘ 🔴 CRITICAL (Gây mất tiền / mất hợp đồng):

1. Bị reject lô hàng xuất khẩu vì không có truy xuất nguồn gốc đầy đủ
   → Thiệt hại: Chi phí vận chuyển + lưu kho + giá trị lô hàng (tỷ đồng/lô)

2. Không qualify được MRV Protocol 1Mha → mất carbon credit
   → Thiệt hại: ~20 USD × sản lượng tấn gạo qualify

3. Bị cơ quan nhà nước phát hiện pha trộn lúa ngoài vùng chứng nhận
   → Thiệt hại: Phạt hành chính + thu hồi chứng nhận xuất khẩu

PAIN CẤP ĐỘ 🟠 HIGH (Tốn nhân lực / chậm quy trình):

4. Đối soát khối lượng giữa Anchor và từng HTX mất 3–7 ngày/tháng
   (Phải gọi điện từng HTX, đối chiếu sổ sách tay)

5. Chuẩn bị hồ sơ chứng từ xuất khẩu mất 2–5 ngày/lô
   (Thu thập C/O, phytosanitary, COA từ nhiều phòng ban)

6. Khi buyer quốc tế yêu cầu truy xuất ngay → không có dữ liệu real-time
   → Mất 3–5 ngày để tổng hợp thủ công

PAIN CẤP ĐỘ 🟡 MEDIUM (Rủi ro tiềm ẩn):

7. Không biết chính xác lô gạo nào đang ở đâu trong kho/vận chuyển
8. Không thể trace ngược nếu buyer báo lỗi chất lượng
9. Mùa vụ mới không có dữ liệu baseline từ mùa trước để so sánh
```

### F.2 Risk Map

| Rủi ro | Xác suất | Tác động | Cách GOTRACE giảm thiểu |
|:---|:---:|:---:|:---|
| Lô hàng bị từ chối tại cảng đến | Trung bình | Rất cao | Forward trace ngay khi có cảnh báo → thu hồi nhanh |
| Gian lận Mass Balance | Cao (thị trường gạo) | Cao | Auto alert khi output/input lệch ngưỡng |
| HTX cung cấp dữ liệu sai | Cao | Cao | Cross-check với hóa đơn VAT + spot-check |
| Mất chứng nhận vùng trồng | Thấp-Trung | Rất cao | Quản lý ngày hết hạn certification |
| Giá gạo biến động, buyer cancel | Thấp | Cao | Forward trace ngay để biết LOT chưa giao |

---

## PHẦN G — CURRENT SYSTEM MAP & INTEGRATION

### G.1 Hệ Thống Hiện Có Tại Anchor Enterprise

| Hệ thống | Phổ biến | API | Độ khó tích hợp GOTRACE | Ghi chú |
|:---|:---:|:---:|:---:|:---|
| SAP S/4HANA (Lộc Trời) | Thấp | Có (SAP API) | 🔴 Cao | Cần vendor agreement, tốn thời gian |
| Bravo ERP | Trung bình | Hạn chế | 🟠 Cao | Phải thỏa thuận với vendor Bravo |
| Misa AMIS | Cao (vừa nhỏ) | Có (Partner API) | 🟡 Trung bình | Misa có chương trình partner |
| Excel/Google Sheet | Rất cao | N/A | ✅ Thấp | CSV import/export |
| Phần mềm kho nội địa | Trung bình | Không có | 🔴 Rất cao | Cần custom connector |
| Cân điện tử | Cao (nhà máy lớn) | RS232/Serial | 🟠 Cao | Cần hardware bridge (Raspberry Pi/Arduino) |
| Máy đo ẩm độ | Cao (cân + ẩm) | Manual/Serial | 🟠 Cao | Tích hợp sau |

### G.2 Integration Roadmap cho Pilot

```
GIAI ĐOẠN PILOT (Tháng 1–3):
  ✅ Excel import (dữ liệu lịch sử)
  ✅ Web form / Zalo Mini App (nhập liệu thực thời)
  ✅ Manual document upload (chụp ảnh chứng từ)

GIAI ĐOẠN MỞ RỘNG (Tháng 4–9):
  🟡 Cân điện tử bridge (hardware adapter)
  🟡 Misa AMIS API connector
  🟡 Export CSV sang cổng truy xuất quốc gia (traceviet.mae.gov.vn)

GIAI ĐOẠN MATURE (Năm 2):
  🔴 SAP/Bravo API integration (negotiation required)
  🔴 IoT sensor (nhiệt độ kho, moisture)
  🔴 ViRiCert data exchange (MRV Protocol 1Mha)
```

---

## PHẦN H — CƠ HỘI 1 TRIỆU HECTA LÚA (CHƯƠNG RIÊNG)

> **Đây là cơ hội chiến lược lớn nhất của GOTRACE tại Rice Vertical — không có trong Blueprint gốc.**

### H.1 Bối Cảnh

Chương trình "1 Triệu Hecta Lúa Chất Lượng Cao Phát Thải Thấp" (1Mha):
- **421.000 ha** đã triển khai đến tháng 8/2026 (vượt mục tiêu 180.000 ha giai đoạn 1).
- **1.100+ HTX** và **210+ doanh nghiệp** tham gia.
- MRV Protocol (Measurement, Reporting, Verification) đã được ban hành → yêu cầu data đầy đủ từ canh tác đến xuất khẩu.
- World Bank + TCAF đang đàm phán giá carbon credit ~**20 USD/credit**.
- ViRiCert đang làm phần **đo lường khí thải** (GHG measurement).

### H.2 Vai Trò GOTRACE trong 1Mha Ecosystem

```
WORLD BANK / TCAF                GOVERNMENT (MARD)
       |                               |
   Carbon Credit              MRV Protocol Standards
   Financing                          |
       |                              ↓
ViRiCert ─────────────────► GHG Measurement Data
                                      |
                                      ↓
                            GOTRACE ◄─────────────────
                         Supply Chain Data Graph       |
                         (LOT → Batch → Shipment)     |
                                      |               |
                                      ↓               |
Anchor Enterprise ──────────► Verified Data Package    |
       |                      (Farm → Export)          |
       ↓                             |                 |
HTX / Production Areas               ↓                 |
                             Carbon Credit Claim ──────►TCAF Registry
```

### H.3 Data GOTRACE cần cung cấp cho MRV

| Data Point | Đối tượng | Trust Level yêu cầu |
|:---|:---|:---:|
| Vùng canh tác GPS | ProductionArea | Tier 3 (cross-checked với GIS) |
| Giống lúa / Input sử dụng | HarvestLot | Tier 2 |
| Ngày thu hoạch, sản lượng | HarvestLot | Tier 3 |
| Tỷ lệ rơm rạ xử lý (không đốt) | HarvestLot | Tier 2 (ảnh + xác nhận) |
| Hành trình từ vùng trồng đến XK | Full LOT Chain | Tier 3 |

### H.4 Pricing Argument cho 1Mha Anchor

```
GIẢ THUYẾT ROI (cần validate với Anchor):

Anchor tham gia 1Mha với 1.000 ha canh tác liên kết:
  → Sản lượng lúa ≈ 5.500–6.000 tấn/vụ
  → Gạo thành phẩm ≈ 3.500–4.000 tấn
  → Carbon credit potential ≈ 1 tín chỉ/tấn gạo phát thải thấp
  → Revenue tiềm năng: 3.500–4.000 tín chỉ × $20 = $70.000–$80.000/vụ

Chi phí GOTRACE Data Infrastructure:
  → Implementation: X triệu VND (cần định giá)
  → Platform subscription: Y triệu VND/tháng

ROI argument: 
  "GOTRACE giúp Anchor qualify carbon credit.
   1 vụ Đông Xuân = ~$75.000 carbon credit value.
   Chi phí GOTRACE nhỏ hơn 1 container gạo reject."
```

---

## PHẦN I — PILOT DESIGN

### I.1 Pilot Scope

```
PILOT TIÊU CHUẨN — RICE:

1 Anchor Enterprise (Nhà máy chế biến / xuất khẩu)
    +
5–10 HTX / Nhà cung cấp nguyên liệu
    +
1 Giống lúa chủ lực (VD: ST25 hoặc OM5451)
    +
1 Mùa vụ thực tế (khuyến nghị: Đông Xuân 2026–2027)
    +
1 Quy trình sản xuất đầy đủ (từ thu mua → chế biến → xuất kho)
    +
1 Lô xuất khẩu hoặc 1 Lô đăng ký 1Mha

THỜI GIAN: 8–12 tuần (sau khi ký Diagnostic Agreement)
```

### I.2 Agricultural Calendar — Timing Quan Trọng

```
THỜI GIAN ĐỀ NGHỊ (từ tháng 9/2026):

Tháng 9–10/2026:   Ký Anchor Agreement + Diagnostic
Tháng 10–11/2026:  HTX Thu Đông thu hoạch → Thu thập dữ liệu pilot đầu tiên
Tháng 11/2026:     Gieo mạ Đông Xuân → Pilot đầy đủ nhất trong vụ chính
Tháng 2–3/2027:    Thu hoạch Đông Xuân → FinishedLot + Export Shipment

⭐ Mục tiêu Pilot lý tưởng:
  Ký xong Anchor tháng 10/2026
  → Capture toàn bộ Đông Xuân 2026-2027 (vụ chính, chất lượng cao nhất)
  → Có đủ dữ liệu hoàn chỉnh 1 vòng Linear Chain vào tháng 3/2027
```

### I.3 Pilot Deliverables

Cuối pilot, GOTRACE cung cấp cho Anchor:

1. **Supply Chain Data Graph** — Tất cả LOT từ vùng trồng → xuất khẩu đã được liên kết.
2. **Verified Traceable Lots Report** — Bao nhiêu lô đạt Trust Level ≥ 2.
3. **Mass Balance Report** — Tỷ lệ thu hồi theo từng mẻ, flag các bất thường.
4. **Traceability Time Test** — Demo: Mất bao lâu để trace 1 lô ngược về vùng trồng (mục tiêu: < 5 phút từ vài ngày).
5. **Business Case** — ROI hypothesis dựa trên dữ liệu thực.
6. **Expansion Plan** — Từ pilot → toàn bộ vùng nguyên liệu.

---

## PHẦN J — KPI & ROI HYPOTHESIS

### J.1 KPI Pilot

| KPI | Baseline (trước GOTRACE) | Target sau Pilot | Đo lường |
|:---|:---|:---|:---|
| **Trace time** (1 LOT → nguồn gốc) | 3–7 ngày (thủ công) | < 30 phút | Thực nghiệm live |
| **Evidence completeness** | < 40% LOT có đủ chứng từ | > 80% | Audit sampling |
| **Mass Balance accuracy** | Không có (hoặc Excel thủ công) | Tự động theo batch | System report |
| **HTX data submission rate** | 0% (không có hệ thống) | > 70% HTX submit đúng hạn | System log |
| **Supplier reconciliation time** | 3–7 ngày/tháng | < 4 giờ/tháng | Time tracking |
| **Export document prep time** | 2–5 ngày/lô | < 4 giờ/lô | Time tracking |

### J.2 Không Dùng Những KPI Này

❌ Số lượng QR code in ra
❌ Số lần quét QR
❌ Số nông hộ đăng ký
❌ Số tính năng được dùng

---

## PHẦN K — ENTRY OFFER & SALES MOTION

### K.1 Entry Offer: Supply Chain Data Diagnostic

**Thời gian:** 3 tuần
**Chi phí:** Tính phí (không miễn phí — paid diagnostic tạo commitment)

**Tuần 1 — Mapping:**
- Phỏng vấn GĐ Thu mua + Trưởng QA + Kế toán kho
- Map toàn bộ supply chain hiện tại (vẽ sơ đồ các actor)
- Liệt kê tất cả hệ thống đang dùng (ERP, Excel, sổ tay)

**Tuần 2 — Live LOT Test:**
- Lấy 1 LOT gạo thành phẩm đang có trong kho
- Yêu cầu Anchor trace ngược về vùng trồng bằng hệ thống hiện tại
- Đo: Mất bao nhiêu người, bao nhiêu bước, bao nhiêu thời gian
- Đo: Bao nhiêu % chứng từ có sẵn digital vs. giấy tờ

**Tuần 3 — Gap Report & Pilot Blueprint:**
- Báo cáo: Lỗ hổng dữ liệu, Integration points, Trust Level hiện tại
- Đề xuất: Pilot scope, KPI baseline, ROI hypothesis
- Trình bày với Economic Buyer

### K.2 Sales Motion cho Rice

**Opening questions (đừng bắt đầu bằng demo):**

> *"Tháng vừa rồi buyer Nhật có hỏi về nguồn gốc lô gạo ST25 đã giao. Anh mất bao lâu để tổng hợp thông tin trả lời?"*

> *"Khi nhà máy nhận lúa từ 10 HTX khác nhau vào 1 silo, anh/chị có biết ngay lô gạo thành phẩm chứa tỷ lệ bao nhiêu từ HTX nào không?"*

> *"Công ty mình có tham gia chương trình 1 Triệu Ha không? Nếu có — MRV Protocol yêu cầu data gì từ chuỗi của mình?"*

> *"Nếu ngày mai phát hiện 1 lô gạo xuất đi Hàn Quốc có vấn đề dư lượng, mình xác định được ngay HTX nào cung cấp lúa đó không?"*

**Thông điệp cốt lõi:**
> *"GOTRACE không thay ERP hay phần mềm hiện tại. GOTRACE kết nối dữ liệu rời rạc từ HTX, nhà máy và kho thành 1 graph có thể truy xuất được — thứ mà hiện tại phải làm bằng điện thoại và Excel."*

---

## PHẦN L — OBJECTION HANDLING

| Phản đối | Phân tích | Cách trả lời |
|:---|:---|:---|
| *"iCheck làm rồi, sao dùng GOTRACE?"* | iCheck thiết kế cho consumer-facing brand, không có cross-company Supply Chain Graph | *"iCheck rất tốt cho QR consumer. Bài toán của mình khác — khi HTX giao lúa, làm sao kết nối data đó với lô gạo thành phẩm giao cho buyer Nhật? iCheck không giải được."* |
| *"Hệ thống nhà nước đã có (traceviet.mae.gov.vn)"* | Hệ thống nhà nước là compliance portal — không có operational data graph liên doanh nghiệp | *"GOTRACE và hệ thống nhà nước bổ sung nhau. GOTRACE giúp mình có đủ dữ liệu để đồng bộ lên cổng nhà nước — hiện tại mình không có data đó để đẩy lên."* |
| *"HTX không có smartphone / không biết dùng"* | Đây là constraint thực tế | *"GOTRACE có Field Agent hỗ trợ trực tiếp tại điểm thu mua. Giao diện đơn giản qua Zalo — HTX chỉ cần chụp ảnh cân và nhập 2 số."* |
| *"ERP tích hợp phức tạp quá"* | Đúng — nhưng pilot không cần API | *"Pilot bắt đầu bằng import Excel — không cần tích hợp ERP ngay. Khi pilot chứng minh giá trị, mình mới quyết định tích hợp sâu."* |
| *"Biên lợi nhuận gạo mỏng, không có ngân sách"* | Framing sai — nên nói về risk | *"1 lô gạo 300 tấn bị reject tại cảng Hàn Quốc thiệt hại bao nhiêu? Chi phí GOTRACE nhỏ hơn 1% rủi ro đó."* + MRV carbon credit framing |
| *"Sợ lộ nguồn HTX cho đối thủ"* | Lo ngại về data sovereignty | *"Dữ liệu HTX của mình chỉ mình thấy. GOTRACE không aggregate data giữa các Anchor. Mỗi Anchor có data silo riêng."* |

---

## PHẦN M — DEMO SCENARIO

### M.1 Demo: "Truy Xuất Ngược 5 Phút"

**Bối cảnh:** Buyer tại Nhật Bản email báo phát hiện dư lượng thuốc BVTV vượt ngưỡng trong lô gạo ST25.

**Demo flow:**
```
Bước 1 (30 giây): Nhập Shipment ID / Container Number vào GOTRACE
Bước 2 (30 giây): Hệ thống hiển thị FinishedLot → MillingBatch → CollectionLot
Bước 3 (1 phút):  Xem ngay: 7 HTX đóng góp vào lô này, tỷ lệ % mỗi HTX
Bước 4 (1 phút):  Xem HTX nào có kết quả lab BVTV gần nhất
Bước 5 (2 phút):  Forward trace: HTX đó còn giao nguyên liệu cho lô nào khác?
                   → Biết ngay lô nào cần giữ lại / kiểm tra

TỔNG: < 5 phút
So sánh hiện tại: 3–7 ngày gọi điện thủ công
```

### M.2 Demo: "Mass Balance Alert"

**Bối cảnh:** Mẻ xay xát Batch #0234 có tỷ lệ thu hồi gạo = 72.3% — cao bất thường so với benchmark 66–68%.

```
GOTRACE tự động highlight:
  ⚠️ Batch #0234: Output ratio 72.3% > Threshold 70%
  → Possible: Lúa đầu vào khai thấp hơn thực tế
  → Hoặc: Mix lúa từ nguồn không thuộc vùng chứng nhận

Drill down:
  → Xem từng CollectionLot đầu vào
  → Đối chiếu với phiếu cân của HTX
  → Identify discrepancy cụ thể (HTX Tân Thạnh: khai 12 tấn, cân thực 9.8 tấn)
```

---

## PHẦN N — EXPANSION MODEL

### N.1 Từ Pilot Lên Network

```
PILOT (Tháng 1–3):
  1 Nhà máy + 5–10 HTX + 1 Giống lúa + 1 Vụ

       ↓ Chứng minh giá trị → ký hợp đồng

FULL ANCHOR (Tháng 4–9):
  1 Nhà máy + Toàn bộ vùng nguyên liệu (30–100 HTX) + All products

       ↓ Expand từ production sang logistics

MULTI-SITE (Năm 2):
  Anchor mở thêm nhà máy/kho → GOTRACE theo

       ↓ Anchor kéo buyer quan tâm

NETWORK (Năm 2–3):
  Buyer quốc tế muốn data tương tự từ supplier khác
  → GOTRACE mở rộng sang các Anchor khác trong cùng chuỗi
```

### N.2 Network Value Calculation (Internal Framework)

```
Network Value = Anchor Value × Network Reach × Data Criticality × Expansion Potential

Ví dụ:
  Anchor = Nhà máy 100.000 tấn/năm
  Network Reach = 50 HTX × 500 nông hộ = 25.000 data producers
  Data Criticality = Cao (xuất khẩu Nhật + 1Mha)
  Expansion Potential = 5 nhà máy tiềm năng trong cùng tỉnh

→ Priority Score cao nhất → Allocate resources đầu tiên
```

---

## PHẦN O — REFERENCE ARCHITECTURE

```
                        GOTRACE RICE DATA GRAPH
                              ┌────────┐
                              │GOTRACE │
                         ┌────│  Core  │────┐
                         │    └────────┘    │
                    Ingest                Query
                         │                 │
        ┌────────────────┼─────────────────┼──────────────┐
        │                │                 │              │
   HTX Portal      Anchor ERP         National        MRV/Carbon
   (Zalo/Web)      (Excel/API)        System          Registry
        │                │                 │              │
        ↓                ↓                 ↓              ↓
   HarvestLot    MillingBatch      traceviet.mae    ViRiCert
   CollectionLot FinishedLot       .gov.vn          Data Bridge
        │                │
        └────────────────┘
                 │
         Supply Chain Graph
         ┌───────┴────────┐
    Reverse Trace    Forward Trace
    (Finished→Farm)  (Farm→Buyer)
                 │
         Mass Balance
         Impact Analysis
```

---

## PHẦN P — PHÂN CÔNG & TIMELINE PMO

### P.1 Phân Công Nhân Sự Pilot

| Vai trò | Số lượng | Nhiệm vụ |
|:---|:---:|:---|
| PMO Lead | 1 | Quản lý toàn pilot, báo cáo Founder |
| Business Development | 1 | Tiếp cận Anchor, Discovery meeting |
| Field Agent | 1–2 | Thực địa tại HTX, hỗ trợ nhập liệu, spot-check |
| Technical Lead | 1 | Cấu hình data model, integration, demo |

**Budget ước tính Pilot 90 ngày:**
- Field Agent (2 người × 3 tháng): ~90–120 triệu VND
- Technical setup + travel: ~30–50 triệu VND
- Tổng: ~120–170 triệu VND

### P.2 Milestones Rice Pilot

| Milestone | Timeline | Owner |
|:---|:---|:---|
| Ký Anchor Agreement + kick-off | Tuần 1–2 | BD |
| Hoàn thành Supply Chain Mapping | Tuần 3–4 | Field Agent + Technical |
| Live LOT Test (1 lô thực tế) | Tuần 5–6 | Technical |
| HTX onboarding (5 HTX đầu) | Tuần 6–8 | Field Agent |
| First Mass Balance report | Tuần 8–10 | Technical |
| Pilot Review với Economic Buyer | Tuần 11–12 | PMO Lead |
| Contract negotiation | Tuần 12+ | BD + Founder |

---

## PHẦN Q — CHECKLIST ACCOUNT SELECTION TIÊU CHUẨN

Anchor đạt ≥ **15/20 điểm** → ưu tiên cao:

```
NETWORK (5 điểm):
[ ] ≥ 10 HTX / nhà cung cấp nguyên liệu              (2đ)
[ ] Anchor có quyền ép HTX cung cấp dữ liệu           (2đ)
[ ] Có buyer downstream tại ≥ 1 thị trường khó tính   (1đ)

PAIN (5 điểm):
[ ] Có incident từng xảy ra (reject, cảnh báo)        (2đ)
[ ] Đang tham gia 1Mha / cần MRV data                (2đ)
[ ] Đối soát HTX mất > 2 ngày/tháng                  (1đ)

DIGITAL READINESS (5 điểm):
[ ] Có nhân sự IT hoặc phụ trách hệ thống             (2đ)
[ ] Dùng ERP hoặc phần mềm kế toán có cấu trúc       (2đ)
[ ] GĐ / TGĐ đã nghe về digital traceability         (1đ)

COMMERCIAL (5 điểm):
[ ] Revenue > 200 tỷ VND/năm                         (2đ)
[ ] Có ngân sách IT/compliance hàng năm               (2đ)
[ ] Decision cycle < 3 tháng                          (1đ)
```

---

*Tài liệu này được soạn thảo dựa trên: GOTRACE Market Intelligence GTM 2026–2030, Object Implementation Blueprint, và desk research thực tế tháng 9/2026.*
*Cần validate lại với Founder và Field Team trước khi triển khai.*
*Version 1.0 — Last updated: 2026-09-24*
