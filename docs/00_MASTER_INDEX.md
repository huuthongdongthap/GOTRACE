# 00_MASTER INDEX — HỆ SINH THÁI TÀI LIỆU GOTRACE MEKONG
## Cổng Điều Hướng Trung Tâm & Single Source of Truth (SSOT)

> [!IMPORTANT]
> **Hệ thống Tài liệu GOTRACE Mekong** được tổ chức theo cấu trúc phẳng cấp 1 (Single-Tier Flat Hierarchy), chuẩn hóa mã số từ `00` đến `09`. Toàn bộ tri thức chiến lược thâm nhập Đồng bằng Sông Cửu Long (ĐBSCL), kiến trúc hạ tầng dữ liệu chuỗi cung ứng (Supply Chain Data Infrastructure), 3 Playbook ngành thực chiến và kế hoạch vận hành PMO 90 ngày đã được quy tụ đồng nhất, đảm bảo tính toàn vẹn 100% không liên kết gãy.

---

## 1. TRIẾT LÝ NỀN TẢNG & SỨ MỆNH GOTRACE MEKONG

GOTRACE không định vị là một ứng dụng phần mềm đóng gói (SaaS app) hay một cổng tem nhãn thụ động. GOTRACE là **Hạ tầng Dữ liệu Chuỗi Cung ứng (Supply Chain Data Infrastructure)** kết nối mạng lưới nông sản - thực phẩm ĐBSCL theo 4 nguyên tắc bất biến:

1. **Connect, Not Replace (Kết nối, không thay thế)**: Tôn trọng và tích hợp liền mạch với hệ thống ERP, WMS, cân điện tử, cảm biến IoT hiện hữu của doanh nghiệp, không buộc đối tác đập bỏ quy trình cũ.
2. **Anchor-First Dynamics (Mô hình Mỏ neo)**: Thay vì phân tán nguồn lực vào 87.8% cơ sở siêu nhỏ, GOTRACE tập trung số hóa các Doanh nghiệp Đầu tàu (Anchor Enterprises) để tự động kéo theo toàn bộ mạng lưới Hợp tác xã (HTX), Thương lái và Nông hộ liên kết.
3. **Audit-Ready Evidence Integrity (Bằng chứng kiểm chứng đa cấp)**: Chuyển dịch từ việc "tự khai báo" (self-declaration) sang cơ chế đối soát cân bằng khối lượng (Mass Balance), lưu vết thời gian thực (Time-series IoT), và kiểm thực độc lập chuẩn hóa quốc tế (EUDR, GACC, QĐ 1246/QĐ-BYT).
4. **Actionable Commercial Value (Giá trị thương mại khả thi)**: Truy xuất nguồn gốc phải mang lại ROI hữu hình: bảo vệ hạn ngạch xuất khẩu, chống gian lận thương hiệu, mở khóa tín chỉ carbon ($20/tấn lúa phát thải thấp), và ngăn chặn khủng hoảng ngộ độc thực phẩm trong vòng 60 giây.

---

## 2. BẢNG TRA CỨU TÀI LIỆU CHÍNH THỨC (MASTER CATALOG)

| Mã | Tài liệu Chính thức | Đường dẫn Liên kết | Đối tượng Độc giả | Mục đích Cốt lõi & Đầu ra Chủ chốt |
|:---:|:---|:---|:---|:---|
| **00** | **Master Index & Navigator** | [`./00_MASTER_INDEX.md`](./00_MASTER_INDEX.md) | Toàn bộ Dự án & Stakeholders | Cổng điều hướng Single Source of Truth, ma trận phụ thuộc, sơ đồ cây thư mục và lộ trình đọc theo vai trò. |
| **00** | **Executive Brief & Investment Thesis** | [`./00_Executive_Brief.md`](./00_Executive_Brief.md) | Founder, BOD, Ban Điều hành | Bản tóm tắt điều hành 1 trang: Luận điểm đầu tư ĐBSCL, 5 phát hiện cốt lõi, bảng tài chính hòa vốn (Tháng 14–16), 5 quyết định phê duyệt. |
| **01** | **Market Intelligence & GTM Strategy (2026–2030)** | [`./01_Mekong_Market_Intelligence_GTM_2026_2030.md`](./01_Mekong_Market_Intelligence_GTM_2026_2030.md) | Founder, PMO Lead, Strategy Lead | 21 chương khảo sát thực địa ĐBSCL: Số liệu vĩ mô (24M tấn lúa, 6.7M tấn trái cây), cơ cấu "Missing Middle", 3 archetypes, chiến lược 3 địa bàn trọng điểm. |
| **02** | **Platform & Object Blueprint** | [`./02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md) | Solution Architect, Tech Lead, Dev | Kiến trúc kỹ thuật nền tảng: 9 Primitives phổ quát, định danh toàn cầu GCI, 3 cơ chế truy xuất (Forward, Reverse, Mass Balance), gói bàn giao Diagnostic. |
| **03** | **Rice Playbook (Ngành Lúa gạo)** | [`./03_Rice_Playbook.md`](./03_Rice_Playbook.md) | BD Team, Field Ops, Kỹ sư Lúa gạo | Chuỗi tuyến tính (Linear Chain), 29 Canonical Events, thuật toán Mass Balance & hiệu chỉnh độ ẩm, quy trình onboarding HTX, tích hợp Đề án 1Mha lúa ($20/tấn CO2e). |
| **04** | **Fruit Playbook (Ngành Trái cây)** | [`./04_Fruit_Playbook.md`](./04_Fruit_Playbook.md) | BD Team, Field Ops, Kỹ sư Trái cây | Chuỗi rẽ nhánh (Branching Chain), Mã số vùng trồng (MSVT) First-Class GIS/Quota, Cold-chain IoT, ma trận kiểm dịch GACC/Úc/Hàn/Mỹ, 10 Fruit Risk Engine Rules, Schema YAML. |
| **05** | **Kitchen Playbook (Bếp ăn Tập thể)** | [`./05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md) | BD Team, Field Ops, An toàn Thực phẩm | Chuỗi hội tụ (Converging Chain), Recipe vs Actual, Incident Impact Analysis Engine (phản ứng ≤ 60s), lưu mẫu 24h QĐ 1246/QĐ-BYT, 12 Kitchen Risk Rules (K01–K12), 4 Trụ cột Thực phẩm, Schema tiếp nhận. |
| **06** | **PMO Master Execution Plan** | [`./06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md) | PMO Lead, Operations Manager, BOD | Hợp nhất 44 chương chiến lược & Kế hoạch tác nghiệp 90 ngày: 8 Workstreams, RACI 7 quyết định, cơ cấu 6 nhân sự, ngân sách 568M VND, 12 rủi ro & lịch mùa vụ. |
| **07** | **Target Account Map & ICP Database** | [`./07_Target_Account_Map.md`](./07_Target_Account_Map.md) | Sales/BD Team, PMO Lead | Danh bạ 100 Anchor Accounts ĐBSCL, công thức Network Value Scoring (6 trọng số), hồ sơ chi tiết Top 30 Priority (Lộc Trời, Trung An, Cỏ May, Chánh Thu, Aden...). |
| **08** | **Sales Discovery & Diagnostic Playbook** | [`./08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md) | Sales Lead, BD Reps, Tư vấn viên | Cẩm nang thương mại: Bộ câu hỏi Discovery theo ngành, 15 kịch bản bẻ gãy phản đối, gói chẩn đoán Diagnostic (2–4 tuần), demo kịch bản khủng hoảng, bộ kit 22 ấn phẩm. |
| **09** | **Strategic Gap Analysis & Risk Governance** | [`./09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md) | Founder, Ban Chiến lược, PMO | Báo cáo phản biện chiến lược: Giải mã đối thủ iCheck, bản đồ cạnh tranh 3 lớp, cập nhật Cổng truy xuất quốc gia (1/7/2026), Nghị định 37/2026, xử lý 7 GAP sống còn. |
| **10** | **PMO Interview & Executive Presentation Playbook** | [`./10_PMO_Interview_Playbook.md`](./10_PMO_Interview_Playbook.md) | PMO Lead, Founder, BOD, Sales Team | Cẩm nang thực chiến cho phỏng vấn vị trí PMO: Luận điểm chiến lược, Kịch bản Pitch 4 Slide bảo vệ dự án trước Founder/BOD, Bộ câu hỏi phản biện chuyên sâu 4 câu, Cẩm nang Huấn luyện Sales 11 bước & Gói Diagnostic Trojan Horse, Ma trận RACI & Cam kết chất lượng PMO. |

---

## 3. EXECUTIVE SUMMARY TỪNG TÀI LIỆU (TỪ 00 ĐẾN 09)

### [00] Executive Brief & Investment Thesis
Bản đúc kết cô đọng 1 trang dành riêng cho Founder và Hội đồng Quản trị: Luận giải vì sao ĐBSCL là "mặt trận vàng" nhưng 90% giải pháp phần mềm thất bại do bẫy bán lẻ; làm rõ 5 phát hiện cốt lõi (tiềm năng 1Mha MRV, lỗ hổng của iCheck, WTP thật của doanh nghiệp, cơ chế sửa lỗi EUDR, và làn sóng siết chặt bếp ăn công nghiệp); công bố bảng phân tích tài chính 2 kịch bản (kịch bản cơ sở đạt điểm hòa vốn sau 16 tháng với 14 khách hàng trả phí) và đệ trình 5 quyết định chiến lược cần phê duyệt ngay.

### [01] Market Intelligence & GTM Strategy (2026–2030)
Tài liệu tình báo thị trường toàn diện gồm 21 chương phân tích sâu hiện trạng ĐBSCL: Quy mô sản lượng vĩ mô (24 triệu tấn lúa, 6.7 triệu tấn rau quả, 4.79 triệu tấn thủy sản), cấu trúc thắt nút cổ chai "Missing Middle" với 87.8% cơ sở quy mô siêu nhỏ, phân loại 3 archetypes khách hàng trọng tâm; xác lập mô hình Doanh nghiệp Đầu tàu (Anchor Model) tại 3 địa bàn bàn đạp (Đồng Tháp, Cần Thơ, TP.HCM) và cấu trúc mô hình doanh thu 5 tầng bền vững.

### [02] Platform & Object Blueprint
Bản thiết kế kỹ thuật kiến trúc đối tượng nền tảng của GOTRACE: Chuẩn hóa 9 Primitives trừu tượng phổ quát (`PARTY`, `PLACE`, `ITEM`, `EVENT`, `TRANSFORMATION`, `CERTIFICATE`, `POLICY`, `EVIDENCE`, `BATCH`), xây dựng cơ chế định danh toàn cầu GCI (Global Chain Identifier), định nghĩa thuật toán cho 3 hình thái truy xuất (Forward Trace, Backward Trace, Mass Balance Reconciliation) và cấu trúc hóa các gói kết quả chuyển giao dịch vụ Diagnostic.

### [03] Rice Playbook (Linear Supply Chain)
Cẩm nang vận hành chuỗi Lúa gạo: Mô hình hóa chuỗi cung ứng tuyến tính từ cánh đồng đến cảng biển thông qua 29 Canonical Events chuẩn hóa; tích hợp thuật toán Cân bằng Khối lượng (Mass Balance) kết hợp công thức hiệu chỉnh độ ẩm khi sấy lúa nhằm ngăn chặn triệt để hành vi gian lận pha trộn gạo cấp thấp; xây dựng quy chuẩn số hóa Hợp tác xã (HTX) và quy trình kết nối giao thức MRV phục vụ Đề án 1 Triệu Hecta lúa chất lượng cao phát thải thấp để thương mại hóa tín chỉ carbon ($20/tấn).

### [04] Fruit Playbook (Branching Supply Chain)
Cẩm nang vận hành chuỗi Trái cây: Giải quyết bài toán chuỗi rẽ nhánh (1 lô thu hoạch phân tách thành nhiều cấp chất lượng và thị trường xuất khẩu khác nhau); nâng cấp Mã số Vùng trồng (MSVT) thành Thực thể Hạng nhất (First-Class Entity) có gắn tọa độ GIS Polygon và hạn ngạch sản lượng chống gian lận cấp mã; tích hợp giám sát chuỗi lạnh Cold-chain IoT thời gian thực; mã hóa ma trận luật kiểm dịch khắt khe (GACC Lệnh 248/249/280 của Trung Quốc, BICON Úc, PLS Hàn Quốc, Chiếu xạ Mỹ); vận hành 10 Fruit Risk Engine Rules và 4 bộ Schema YAML chi tiết.

### [05] Kitchen Playbook (Converging Supply Chain)
Cẩm nang vận hành chuỗi Bếp ăn Tập thể: Xử lý chuỗi cung ứng hội tụ phức tạp (nhiều nguyên liệu từ 4 Trụ cột Tinh bột/Đạm/Trứng/Rau gộp vào 1 suất ăn) trong bối cảnh báo động 58 vụ ngộ độc thực phẩm H1/2026; chiến lược Trojan Horse lấy Bột & Sợi tươi Sa Đéc làm mũi khoan thâm nhập mạng lưới; thiết lập cơ chế đối soát nghiêm ngặt giữa Định lượng Chuẩn (Recipe Definition) và Tiêu thụ Thực tế (Actual Consumption); trang bị Động cơ Phân tích Bán kính Tác động Sự cố (Incident Impact Engine) khoanh vùng toàn bộ học sinh/công nhân bị phơi nhiễm trong vòng ≤ 60 giây; chuẩn hóa quy trình kiểm thực 3 bước và lưu mẫu 24h theo Quyết định 1246/QĐ-BYT kèm 12 Kitchen Risk Rules (K01–K12).

### [06] PMO Master Execution Plan
Kế hoạch điều hành tác nghiệp tối thượng của PMO: Hợp nhất toàn diện 44 chương chiến lược chương trình và kế hoạch thực thi 90 ngày; phân bổ chi tiết 8 Workstreams qua 4 phân kỳ (P0 Chuẩn bị đến P3 Mở rộng); xác lập ma trận RACI cho 7 quyết định trọng yếu; thiết kế sơ đồ nhân sự thực chiến 6 headcount tinh gọn; kiểm soát chặt chẽ ngân sách 568 triệu VND nhằm đạt doanh thu mục tiêu 200–300 triệu VND; thiết lập Risk Register 12 rủi ro thực địa kèm quy trình leo thang sự cố và bảng đồng bộ lịch mùa vụ nông nghiệp ĐBSCL.

### [07] Target Account Map & ICP Database
Bản đồ tài khoản mục tiêu và cơ sở dữ liệu khách hàng lý tưởng: Danh bạ 100 Doanh nghiệp Đầu tàu (Anchor Accounts) trọng điểm tại ĐBSCL được tuyển chọn khắt khe; xây dựng thuật toán tính điểm Giá trị Mạng lưới (Network Value Scoring — NVS) dựa trên 6 trọng số chiến lược; hồ sơ thẩm định chi tiết Top 30 Priority Accounts (Lộc Trời, Trung An, Cỏ May, Chánh Thu, Hoàng Phát Fruit, Suất ăn Công nghiệp Aden, Ba Huân...); phân bổ chiến lược tiếp cận theo 3 cụm địa bàn Đồng Tháp, Cần Thơ, TP.HCM.

### [08] Sales Discovery & Diagnostic Playbook
Vũ khí thương mại thực chiến dành cho lực lượng Sales & Business Development: Bộ câu hỏi khám phá (Discovery Question Framework) sắc bén bóc trần "nỗi đau ngầm" của từng ngành; 15 kịch bản xử lý phản đối gai góc nhất (giá cao, đã có ERP, ngại minh bạch, sợ bị cơ quan thuế chú ý...); hướng dẫn đóng gói và bán dịch vụ Chẩn đoán Chuỗi cung ứng (Diagnostic Service 2–4 tuần có thu phí); kịch bản demo đối đầu khủng hoảng trong 10 phút; danh mục bộ kit 22 ấn phẩm thương mại hỗ trợ chốt deal.

### [09] Strategic Gap Analysis & Risk Governance
Báo cáo phân tích khoảng trống chiến lược và đối chuẩn độc lập: Giải mã toàn diện kiến trúc kinh doanh của đối thủ trực tiếp iCheck, chỉ rõ vì sao mô hình tem B2C thất bại khi giải quyết bài toán chuỗi cung ứng B2B; thiết lập bản đồ cạnh tranh 3 lớp; cập nhật biến động pháp lý nóng (Cổng thông tin truy xuất nguồn gốc quốc gia từ 1/7/2026, Nghị định 37/2026/NĐ-CP, Thông tư 02/2024/TT-BKHCN, lộ trình điều chỉnh EUDR); giải pháp triệt để xử lý 7 khoảng trống chiến lược sống còn của GOTRACE.

### [10] PMO Interview & Executive Presentation Playbook
Cẩm nang thực chiến dành cho PMO bảo vệ đề án trước Founder, Hội đồng Quản trị và đào tạo lực lượng Sales: Hệ thống hóa luận điểm chiến lược B2B vs B2C; kịch bản Pitch Deck 4 Slide chi tiết với công thức Hệ số nhân mạng lưới 1 : 4.8 và chiến lược Mũi khoan Trojan Horse (Tinh bột Sa Đéc); bộ kịch bản phản biện 4 câu hỏi gai góc của BOD (ngân sách 568M–715M, đối thủ tem nhãn rẻ tiền, rủi ro pháp lý người đại diện); cẩm nang huấn luyện Sales 11 bước đóng gói dịch vụ Diagnostic 30–50M và ma trận phân nhiệm RACI bảo đảm cam kết chất lượng.

---

## 4. SƠ ĐỒ CÂY THƯ MỤC TRỰC QUAN (VISUAL DIRECTORY TREE)

Toàn bộ hệ sinh thái tài liệu GOTRACE Mekong được tổ chức phẳng gọn gàng trong thư mục `docs/`:

```text
GOTRACE/docs/
├── 00_MASTER_INDEX.md                              <-- [Cổng Điều Hướng Trung Tâm & Single Source of Truth]
├── 00_Executive_Brief.md                           <-- [Tóm tắt Điều hành & Luận điểm Đầu tư BOD]
├── 01_Mekong_Market_Intelligence_GTM_2026_2030.md  <-- [Tình báo Thị trường ĐBSCL & Chiến lược GTM 21 Chương]
├── 02_Platform_Object_Implementation_Blueprint.md  <-- [Bản thiết kế 9 Primitives & Kiến trúc Đối tượng Dữ liệu]
├── 03_Rice_Playbook.md                             <-- [Playbook Lúa gạo: Chuỗi Tuyến tính, 29 Events, 1Mha MRV]
├── 04_Fruit_Playbook.md                            <-- [Playbook Trái cây: Chuỗi Rẽ nhánh, MSVT First-Class, IoT]
├── 05_Kitchen_Playbook.md                          <-- [Playbook Bếp ăn: Chuỗi Hội tụ, Incident 60s, QĐ 1246]
├── 06_PMO_Master_Execution_Plan.md                 <-- [Kế hoạch PMO Master: 44 Chương Chiến lược + 90 Ngày 568M]
├── 07_Target_Account_Map.md                        <-- [Bản đồ 100 Anchor Accounts & Network Value Scoring]
├── 08_Sales_Discovery_Playbook.md                  <-- [Cẩm nang Sales Discovery, 15 Xử lý Phản đối & Gói Diagnostic]
├── 09_Strategic_Gap_Analysis.md                    <-- [Phân tích Khoảng trống Chiến lược, Đối thủ iCheck & Pháp lý]
└── 10_PMO_Interview_Playbook.md                    <-- [Cẩm nang Phỏng vấn PMO Lead, Kịch bản Pitch BOD & Sales Training]
```

---

## 5. BẢN ĐỒ MA TRẬN LIÊN KẾT CHÉO & PHỤ THUỘC (CROSS-REFERENCE MATRIX)

Hệ thống tài liệu được thiết kế thành một mạng lưới tri thức đan kết chặt chẽ (Knowledge Graph), trong đó mỗi tài liệu đóng vai trò mắt xích không thể tách rời:

```
+---------------------------------------------------------------------------------------------------+
|                                      00_MASTER_INDEX.md                                           |
|                 (Single Source of Truth - Điều hướng toàn bộ 10 tài liệu 00-09)                   |
+---------------------------------------------------------------------------------------------------+
                                                  │
                 ┌────────────────────────────────┴──────────────────────────────┐
                 ▼                                                               ▼
   +----------------------------+                                  +----------------------------+
   |   00_Executive_Brief.md    | ◄─────────────────────────────── | 01_Market_Intelligence.md |
   |   (Investment Thesis BOD)  |                                  |   (Cơ sở Thị trường GTM)   |
   +----------------------------+                                  +----------------------------+
                 │                                                               │
                 │ Kế thừa định hướng chiến lược                                 │ Cung cấp bối cảnh
                 ▼                                                               ▼
   +----------------------------+                                  +----------------------------+
   | 09_Strategic_Gap_Analysis  |                                  |    07_Target_Account_Map   |
   | (iCheck, Pháp lý, Gaps)    |                                  |   (100 Anchor Accounts)    |
   +----------------------------+                                  +----------------------------+
                 │                                                               │
                 │ Thẩm định kiến trúc                                           │ Cung cấp Target List
                 ▼                                                               ▼
   +----------------------------+                                  +----------------------------+
   | 02_Platform_Blueprint      | ───────────────────────────────► | 08_Sales_Discovery_Playbook|
   | (9 Primitives, GCI, Trace) |                                  | (Discovery, Objection, Kit)|
   +----------------------------+                                  +----------------------------+
                 │                                                               │
                 │ Quy định chuẩn dữ liệu hạ tầng                                │ Vũ khí thương mại
                 ▼                                                               ▼
   ┌────────────────────────────────────────────────────────────────────────────────────────────┐
   │                                  3 PLAYBOOK NGÀNH THỰC CHIẾN                               │
   │  ┌───────────────────────┐    ┌───────────────────────┐    ┌──────────────────────────┐   │
   │  │  03_Rice_Playbook.md  │    │  04_Fruit_Playbook.md │    │  05_Kitchen_Playbook.md  │   │
   │  │ (29 Events, Mass Bal.)│    │ (MSVT, Cold-Chain IoT)│    │(Incident 60s, QĐ 1246)   │   │
   │  └───────────────────────┘    └───────────────────────┘    └──────────────────────────┘   │
   └────────────────────────────────────────────────────────────────────────────────────────────┘
                                                  │
                                                  │ Điều phối thực thi & kiểm soát nguồn lực
                                                  ▼
                                 +--------------------------------+
                                 | 06_PMO_Master_Execution_Plan   |
                                 |  (44 Chương + 90 Ngày 568M)    |
                                 +--------------------------------+
```

### Chi tiết Ma trận Trích dẫn & Phụ thuộc:

| File Nguồn | Tài liệu Phụ thuộc Trực tiếp | Mục đích & Mối quan hệ Nghiệp vụ |
|:---|:---|:---|
| [`00_Executive_Brief.md`](./00_Executive_Brief.md) | [`01_Mekong_Market_Intelligence_GTM_2026_2030.md`](./01_Mekong_Market_Intelligence_GTM_2026_2030.md)<br>[`06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md)<br>[`09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md) | Rút trích số liệu vĩ mô, kế hoạch ngân sách 568M và căn cứ phản biện pháp lý để bảo vệ luận điểm đầu tư trước Hội đồng Quản trị. |
| [`01_Mekong_Market_Intelligence_GTM_2026_2030.md`](./01_Mekong_Market_Intelligence_GTM_2026_2030.md) | [`07_Target_Account_Map.md`](./07_Target_Account_Map.md)<br>[`06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md) | Chuyển hóa chiến lược địa bàn (Đồng Tháp, Cần Thơ, TP.HCM) thành danh bạ tài khoản mục tiêu và lộ trình thực thi PMO. |
| [`02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md) | [`03_Rice_Playbook.md`](./03_Rice_Playbook.md)<br>[`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md)<br>[`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md) | Thiết lập khế ước kiến trúc dữ liệu (9 Primitives, mã định danh GCI, cơ chế đối soát) cho cả 3 chuỗi cung ứng thực địa. |
| [`03_Rice_Playbook.md`](./03_Rice_Playbook.md) | [`02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md)<br>[`07_Target_Account_Map.md`](./07_Target_Account_Map.md)<br>[`06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md) | Ánh xạ 29 Canonical Events vào 9 Primitives; triển khai thí điểm tại các Anchor Rice Mills (Lộc Trời, Trung An, Cỏ May) theo tiến độ Gate PMO. |
| [`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md) | [`02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md)<br>[`07_Target_Account_Map.md`](./07_Target_Account_Map.md)<br>[`09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md) | Ứng dụng Primitives cho MSVT và Cold-chain IoT; tiếp cận các nhà đóng gói lớn (Chánh Thu, Hoàng Phát); tuân thủ tiêu chuẩn kiểm dịch quốc tế. |
| [`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md) | [`02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md)<br>[`03_Rice_Playbook.md`](./03_Rice_Playbook.md)<br>[`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md)<br>[`07_Target_Account_Map.md`](./07_Target_Account_Map.md) | Kết nối chuỗi hội tụ tiêu thụ gạo và trái cây đầu vào; triển khai động cơ 60s Incident Engine tại các nhà thầu bếp ăn lớn (Aden, Suất ăn KCN...). |
| [`06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md) | [`01_Mekong_Market_Intelligence_GTM_2026_2030.md`](./01_Mekong_Market_Intelligence_GTM_2026_2030.md)<br>[`03_Rice_Playbook.md`](./03_Rice_Playbook.md)<br>[`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md)<br>[`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md)<br>[`07_Target_Account_Map.md`](./07_Target_Account_Map.md)<br>[`08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md) | Quản trị tiến độ, kiểm soát ngân sách 568M, phân bổ nhân sự và giải quyết rủi ro cho toàn bộ các mũi nhọn kỹ thuật và thương mại. |
| [`07_Target_Account_Map.md`](./07_Target_Account_Map.md) | [`03_Rice_Playbook.md`](./03_Rice_Playbook.md)<br>[`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md)<br>[`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md)<br>[`08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md) | Cung cấp danh sách 100 tài khoản cho Sales Team tiến hành chiến dịch Discovery và mời tham gia chương trình Pilot. |
| [`08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md) | [`03_Rice_Playbook.md`](./03_Rice_Playbook.md)<br>[`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md)<br>[`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md)<br>[`07_Target_Account_Map.md`](./07_Target_Account_Map.md)<br>[`09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md) | Tận dụng kịch bản demo sự cố của 3 ngành và luận điểm bóc mẽ điểm yếu iCheck để thuyết phục khách hàng ký kết hợp đồng Diagnostic/Pilot. |
| [`09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md) | [`01_Mekong_Market_Intelligence_GTM_2026_2030.md`](./01_Mekong_Market_Intelligence_GTM_2026_2030.md)<br>[`02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md)<br>[`06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md) | Bảo vệ dự án trước các rủi ro pháp lý nhà nước (Cổng truy xuất quốc gia, Nghị định 37/2026) và đảm bảo hạ tầng dữ liệu đáp ứng chuẩn kiểm định. |

---

## 6. LỘ TRÌNH TIẾP CẬN THEO VAI TRÒ (ROLE-BASED READING PATHS)

Để tối ưu hóa thời gian và năng lực tiếp thu thông tin, mỗi bên liên quan (stakeholder) được khuyến nghị tiếp cận hệ tài liệu theo lộ trình chuyên biệt sau:

### Lộ trình 1: Founder, Ban Quản trị (BOD) & Hội đồng Đầu tư
*Mục tiêu: Đánh giá tính khả thi kinh tế, tiềm năng thị trường, hiệu quả sử dụng vốn và phê duyệt các quyết sách chiến lược.*
1. [`00_Executive_Brief.md`](./00_Executive_Brief.md): Nắm trọn luận điểm đầu tư, 5 phát hiện cốt lõi, bảng tài chính hòa vốn và 5 quyết định cần duyệt.
2. [`01_Mekong_Market_Intelligence_GTM_2026_2030.md`](./01_Mekong_Market_Intelligence_GTM_2026_2030.md): Nắm vững quy mô thị trường ĐBSCL, cấu trúc Missing Middle và chiến lược Anchor Model.
3. [`09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md): Đánh giá bức tranh cạnh tranh với iCheck và môi trường pháp lý nhà nước (Nghị định 37/2026).
4. [`06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md) *(Đọc Chương 2 Ngân sách & Chương 3 RACI)*: Kiểm soát ngân sách 568M và phân quyền phê duyệt.

### Lộ trình 2: Giám đốc PMO & Quản lý Vận hành Thực địa (Field Ops Lead)
*Mục tiêu: Tổ chức bộ máy nhân sự 6 người, kiểm soát ngân sách 568M VND, giám sát 8 workstreams và điều phối xử lý 12 rủi ro thực địa.*
1. [`06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md): Làm chủ toàn bộ 44 chương chiến lược, kế hoạch 90 ngày, Gates P0–P3 và quy trình leo thang sự cố.
2. [`07_Target_Account_Map.md`](./07_Target_Account_Map.md): Nắm danh mục 100 Anchor Accounts và tiến độ tiếp cận khách hàng trọng điểm.
3. [`03_Rice_Playbook.md`](./03_Rice_Playbook.md), [`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md), [`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md): Hiểu sâu các mốc sự kiện thực địa và yêu cầu kỹ thuật của từng chuỗi để điều phối nhân sự.
4. [`08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md): Phối hợp chặt chẽ với Sales Team trong việc cung cấp dịch vụ Diagnostic (2–4 tuần).

### Lộ trình 3: Giám đốc Thương mại & Đội ngũ Kinh doanh (Sales / BD Team)
*Mục tiêu: Tiếp cận 100 tài khoản mỏ neo, thực hiện chẩn đoán nỗi đau, bẻ gãy 15 tình huống phản đối và chốt hợp đồng Diagnostic/Pilot.*
1. [`07_Target_Account_Map.md`](./07_Target_Account_Map.md): Tra cứu danh bạ 100 Anchor Accounts, điểm số NVS và chiến lược tiếp cận Top 30 Priority.
2. [`08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md): Rèn luyện bộ câu hỏi Discovery, thuần thục 15 kịch bản xử lý phản đối và quy trình bán gói Diagnostic.
3. [`03_Rice_Playbook.md`](./03_Rice_Playbook.md), [`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md), [`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md): Nắm vững các kịch bản demo (Mass balance chống pha trộn gạo, demo nhiễm độc trái cây 15 phút, demo thanh tra bếp ăn 10 phút).
4. [`00_Executive_Brief.md`](./00_Executive_Brief.md): Sử dụng thông điệp Investment Thesis làm bài thuyết trình mở đầu (Executive Pitch) cho các C-Level của khách hàng.

### Lộ trình 4: Kiến trúc sư Giải pháp (Solution Architect) & Kỹ sư Phần mềm (Tech Lead / Dev)
*Mục tiêu: Xây dựng hạ tầng dữ liệu Supply Chain Data Infrastructure, hiện thực hóa 9 Primitives, chuẩn GCI, động cơ rủi ro và các Schema tiếp nhận.*
1. [`02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md): Nắm vững kiến trúc 9 Core Primitives, chuẩn định danh GCI và các thuật toán truy xuất Forward / Backward.
2. [`03_Rice_Playbook.md`](./03_Rice_Playbook.md): Triển khai bảng ánh xạ 29 Canonical Events, thuật toán Mass Balance hiệu chỉnh độ ẩm và giao thức kết nối dữ liệu MRV 1Mha.
3. [`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md): Cài đặt mô hình dữ liệu GIS Polygon cho MSVT, pipeline dữ liệu chuỗi lạnh Cold-chain IoT và 10 Fruit Risk Engine Rules.
4. [`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md): Hiện thực hóa Động cơ Incident Impact Analysis Engine (phản hồi ≤ 60s), quy trình lưu mẫu QĐ 1246 và 4 bộ Schema tiếp nhận YAML.
5. [`09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md): Đảm bảo giao thức tích hợp API tương thích hoàn toàn với Cổng thông tin truy xuất nguồn gốc quốc gia.

---

## 7. QUY CHUẨN ĐỊNH DẠNG & BẢO TRÌ LIÊN KẾT (MAINTENANCE PROTOCOL)

1. **Tuyệt đối tuân thủ đường dẫn tương đối (Relative Markdown Links)**: Mọi liên kết giữa các tài liệu chính thức từ `00` đến `09` bắt buộc phải sử dụng cú pháp `./<filename>.md` (ví dụ: `[Tên tài liệu](./03_Rice_Playbook.md)`). Cấm tuyệt đối sử dụng đường dẫn tuyệt đối hoặc đường dẫn trỏ về thư mục con `playbooks/` đã bị phẳng hóa.
2. **Cấu trúc tinh gọn duy nhất**: Toàn bộ hệ thống tài liệu nằm trực tiếp tại cấp 1 `docs/`, các tệp nháp và phiên bản cũ đã được dọn dẹp triệt để nhằm giữ không gian làm việc sạch sẽ, không trùng lặp.
3. **Quy trình cập nhật tài liệu**: Bất kỳ sự thay đổi nào về cấu trúc thư mục hoặc tên file trong tương lai đều bắt buộc phải cập nhật đồng bộ vào `docs/00_MASTER_INDEX.md` và chạy script tự động kiểm tra tính toàn vẹn liên kết (`verify_links.py`) với kết quả 0 broken links trước khi bàn giao.
