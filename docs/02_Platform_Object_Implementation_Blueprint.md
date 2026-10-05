# 02_PLATFORM & OBJECT IMPLEMENTATION BLUEPRINT — GOTRACE MEKONG
## Bản Thiết Kế Đối Tượng Kỹ Thuật, 9 Primitives & Kiến Trúc Nền Tảng

**Phiên bản:** Master Edition 2026  
**Mã tài liệu:** `GT-DOC-02-BLP`  
**Thuộc bộ tài liệu:** [GOTRACE Mekong Strategy & Execution System 2026–2028](./00_MASTER_INDEX.md)  
**Dành cho:** Solution Architect, Tech Lead, Product Engineers & Dev Team  
**Mục tiêu:** Khung chiến lược kỹ thuật chuyển Market Intelligence thành 3 playbook triển khai thực chiến.

---

## 1. Mục tiêu

Chuyển phân tích thị trường thành kế hoạch triển khai có thể:

- xác định đúng đối tượng mua;
- xác định economic pain;
- xác định data owner và operational owner;
- mô hình hóa supply-chain data;
- thiết kế pilot nhỏ nhưng chứng minh được business value;
- tạo reference architecture;
- mở rộng từ Anchor Enterprise thành network;
- tạo sales motion có thể lặp lại.

### Ba hồ sơ cần xây dựng

1. **Rice Playbook** — Linear Chain / Network Scale
2. **Fruit Playbook** — Branching Chain / Data Complexity
3. **Kitchen Playbook** — Converging Chain / Downstream Demand

---

# 2. Strategic Model

## 2.1 Ba đối tượng = ba kiểu Supply Chain Graph

| Object | Chain Pattern | Core Problem | Strategic Value |
|---|---|---|---|
| Rice | Linear | Continuity / genealogy / mass balance | Scale |
| Fruit | Branching | Split / merge / quality state / evidence | Complexity |
| Kitchen | Converging | Multi-ingredient genealogy / incident impact | Downstream demand |

## 2.2 Core GOTRACE Position

Không định vị GOTRACE như:

- QR generator;
- tem truy xuất;
- ERP replacement;
- hệ thống thay thế cơ quan quản lý.

Định vị:

> **Supply Chain Data Infrastructure + Network Enablement**

Core value:

> **Connect fragmented supply-chain data into a verifiable, operational data graph.**

---

# 3. Kiến Trúc Dữ Liệu Chung & 9 Core Primitives (Common Data Architecture)

Hệ thống GOTRACE chuẩn hóa toàn bộ dữ liệu chuỗi cung ứng nông sản - thực phẩm ĐBSCL dựa trên đồ thị tri thức (Knowledge Graph) được xây dựng từ **9 Core Primitives** phổ quát và cơ chế định danh duy nhất toàn cầu **GCI (Global Chain Identifier)**.

---

## 3.1 Bảng Đặc Tả Chi Tiết 9 Core Primitives của GOTRACE

9 Primitives này đóng vai trò là "ngôn ngữ chung" (Common Data Contract) liên kết xuyên suốt giữa 3 chuỗi cung ứng: Chuỗi tuyến tính Lúa gạo ([`03_Rice_Playbook.md`](./03_Rice_Playbook.md)), Chuỗi rẽ nhánh Trái cây ([`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md)), và Chuỗi hội tụ Bếp ăn tập thể ([`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md)).

| STT | Core Primitive | Phân Loại & Khái Niệm | Mô Tả Thực Thể & Thành Phần Thực Tế ĐBSCL | Thuộc Tính Cốt Lõi (Mandatory Schema Attributes) | Quan Hệ Đồ Thị (Graph Edges / Relations) | Chuỗi Ứng Dụng Thực Địa (Rice / Fruit / Kitchen) |
|:---:|:---|:---|:---|:---|:---|:---|
| **1** | **`PARTY`** | Chủ thể tham gia chuỗi | Thực thể pháp lý hoặc cá nhân sở hữu, vận hành, kiểm tra hoặc giao dịch trong chuỗi: Doanh nghiệp đầu tàu (Anchor Enterprises), Hợp tác xã (HTX), Nông hộ thành viên, Thương lái/Cò lúa, Đơn vị vận chuyển (Logistics/Chành xe), Cảng xuất khẩu, Bếp ăn công nghiệp, Đơn vị chứng nhận (ViRiCert, SGS, Bureau Veritas). | `party_id` (GCI), `legal_name`, `short_name`, `party_type` (ENTERPRISE, COOP, FARMER, TRADER, LOGISTICS, PORT, KITCHEN, AUDITOR), `tax_code / citizen_id`, `address`, `contact_person`, `phone`, `public_key / credential_id`, `status` | `OWNS_PLACE`, `OPERATES_SITE`, `TRANSACTS_WITH`, `CONTRACTED_TO`, `CERTIFIED_BY`, `EMPLOYS` | - **Rice:** Lộc Trời, Trung An, Cỏ May, HTX Tân Bình, 210 DN 1Mha.<br>- **Fruit:** Chánh Thu, Vina T&T, HTX Xoài Mỹ Xương.<br>- **Kitchen:** Aden Services, The Caterers, Trường liên cấp, KCN Trà Nóc. |
| **2** | **`PLACE`** | Địa điểm & Cơ sở vật chất | Vị trí địa lý cố định nơi diễn ra các hoạt động chuỗi cung ứng: Vùng trồng định danh GIS Polygon (Growing Area), Mảnh vườn thành viên (Plot), Kho bãi (Warehouse), Nhà máy xay xát/chế biến, Cơ sở đóng gói (Packhouse - CSDG), Trạm cân điện tử, Cửa khẩu cảng biển (Port/Border), Bếp ăn chế biến (Kitchen Site). | `place_id` (GCI), `place_name`, `place_type` (GROWING_AREA, PLOT, WAREHOUSE, MILLING_FACILITY, PACKING_HOUSE, WEIGH_STATION, BORDER_PORT, KITCHEN_SITE), `geo_polygon / coordinates` (GeoJSON EPSG:4326), `province_code` (DT, AG, CT...), `capacity_max`, `managing_party_id`, `status` | `LOCATED_IN`, `MANAGED_BY`, `ADJACENT_TO`, `CONTAINS_FACILITY`, `GROWN_AT`, `STORED_AT` | - **Rice:** 530.677 ha lúa Đồng Tháp, 1.147 vùng trồng, Kho gạo Thốt Nốt.<br>- **Fruit:** 2.758 MSVT ĐBSCL, 496 cơ sở đóng gói (308 hoạt động), Chiếu xạ Sơn Sơn.<br>- **Kitchen:** Bếp trung tâm KCN Sa Đéc, kho lưu trữ lạnh thực phẩm. |
| **3** | **`ITEM` / `COMMODITY`** | Phẩm cấp & Vật phẩm danh mục | Danh mục định nghĩa loại nông sản, vật tư, thực phẩm hoặc thành phẩm được chuẩn hóa: Lúa tươi (OM5451, Jasmine 85, ST25, ĐT8), Gạo thành phẩm (xát trắng, gạo lứt, bao bì 5kg/10kg/Jumbo), Xoài Cát Chu, Sầu riêng Ri6, Bột gạo Sa Đéc, Suất ăn dinh dưỡng, Phụ phẩm (tấm, cám, trấu). | `item_id` (GCI), `commodity_name`, `commodity_code`, `botanical_name / standard_spec`, `hs_code`, `category` (GRAIN, FRUIT, MEAT, VEGETABLE, PROCESSED_FOOD, PACKAGING), `unit_of_measure` (KG, TON, BAG, MEAL), `shelf_life_days`, `storage_condition_spec` | `CLASSIFIED_AS`, `INPUT_OF`, `OUTPUT_OF`, `SUBSTITUTES_FOR`, `MEASURED_IN` | - **Rice:** Giống lúa OM5451, Jasmine 85, ST25, Phụ phẩm cám/tấm.<br>- **Fruit:** Xoài Cát Chu Cao Lãnh, Xoài Cát Hòa Lộc, Sầu riêng Ri6 Chợ Lách.<br>- **Kitchen:** Thịt heo VietGAP, Rau củ Đà Lạt, Suất ăn công nhân 35k. |
| **4** | **`LOT` / `BATCH`** | Lô hàng vật lý & Mẻ sản xuất | Thực thể định danh đại diện cho một khối lượng vật phẩm cụ thể, đồng nhất về điều kiện thu hoạch, chế biến hoặc đóng gói: Harvest Lot (lô gặt đồng ruộng), Drying Batch (mẻ sấy lúa), Milling Batch (mẻ xay xát), Packing Lot (lô đóng thùng/bao), Finished Lot (lô thành phẩm sẵn sàng xuất), Cooking Meal Batch (mẻ nấu). | `lot_id` (GCI), `item_id`, `parent_lot_ids` (Genealogy Array), `quantity_net`, `quantity_gross`, `uom`, `production_date`, `expiry_date`, `moisture_pct` (Lúa), `brix_degree` (Trái cây), `quality_grade` (Grade 1/2/Out), `status` (CREATED, IN_PROCESS, INSPECTED, BLENDED, CONSUMED, RECALLED) | `DERIVED_FROM`, `CONTAINS`, `PART_OF_BATCH`, `STORED_AT`, `ASSIGNED_TO_SHIPMENT` | - **Rice:** Lô lúa tươi gặt ngày 15/11, Mẻ sấy lò vỉ ngang 50 tấn, Lô gạo xuất khẩu đi Philippines.<br>- **Fruit:** Lô xoài thu hoạch MSVT-0881, Lô đóng gói xuất Úc.<br>- **Kitchen:** Lô thịt nạc dăm tiếp nhận sáng 25/09, Lô 1.200 suất ăn ca trưa. |
| **5** | **`EVENT`** | Sự kiện chuỗi cung ứng | Bản ghi lịch sử bất biến theo trục thời gian (Time-series Immutable Record) ghi lại hành động cụ thể diễn ra với lô hàng tại một địa điểm do một tác nhân chịu trách nhiệm: Gieo cấy, Bón phân/Phun thuốc, Thu hoạch (Harvest), Cân xe (Weigh), Tiếp nhận (Receive), Sấy (Dry), Xay xát (Mill), Chiếu xạ (Irradiate), Đóng gói (Pack), Vận chuyển (Ship), Nấu (Cook), Lưu mẫu (Sample). | `event_id` (GCI), `event_type` (HARVESTED, WEIGHED, RECEIVED, DRIED, MILLED, PACKED, SHIPPED, COOKED, SAMPLED, DISPOSED), `timestamp_utc`, `place_id`, `operator_party_id`, `input_lots` (List), `output_lots` (List), `telemetry_data` (IoT temp, humidity, weight), `event_hash_sha256` | `OCCURRED_AT`, `TRIGGERED_BY`, `CONSUMED_LOT`, `PRODUCED_LOT`, `SUPPORTED_BY_EVIDENCE` | - **Rice:** 29 Canonical Events (Gặt → Cân ghe → Cân trạm → Sấy → Xát → Đóng bao → Xuất cảng).<br>- **Fruit:** Sự kiện chiếu xạ kiểm dịch, sự kiện dán tem MSVT.<br>- **Kitchen:** Tiếp nhận nguyên liệu 05:00 AM, Nấu xong 10:30 AM, Lưu mẫu 24h. |
| **6** | **`EVIDENCE`** | Bằng chứng số kiểm chứng được | Dữ liệu chứng thực số đính kèm trực tiếp vào Sự kiện hoặc Lô hàng nhằm bảo đảm tính toàn vẹn (Audit-Ready Evidence Integrity): Phiếu cân điện tử (Weight Scale Ticket), Phiếu kiểm nghiệm Lab (COA, MRLs tồn dư hóa chất), Ảnh chụp thực địa gắn tọa độ GPS/Exif, Hóa đơn điện tử e-Invoice, Dữ liệu chuỗi lạnh IoT (Cold-chain Data Logger), Biên bản lưu mẫu thực phẩm QĐ 1246/QĐ-BYT. | `evidence_id` (GCI), `evidence_type` (WEIGHT_TICKET, LAB_REPORT, GIS_PHOTO, E_INVOICE, COLD_CHAIN_LOG, SAMPLE_RECORD, CONTRACT), `file_hash_sha256`, `storage_uri`, `captured_at`, `issuer_party_id`, `verifier_party_id`, `digital_signature`, `metadata_json` | `ATTESTS_EVENT`, `VALIDATES_LOT`, `ISSUED_BY`, `CONFIRMED_BY` | - **Rice:** Phiếu cân xe tải điện tử tại Nhà máy Thốt Nốt, Phiếu phân tích dư lượng thuốc BVTV.<br>- **Fruit:** Báo cáo nhiệt độ container reefer -0.5°C đến 2°C suốt hải trình đi Mỹ, Ảnh quét MSVT.<br>- **Kitchen:** Biên bản kiểm thực 3 bước, Niêm phong mẫu lưu 24h tủ bảo quản. |
| **7** | **`CLAIM` / `ASSERTION`** *(CERTIFICATE & POLICY)* | Tuyên bố chất lượng & Tuân thủ | Cam kết hoặc chứng chỉ về tiêu chuẩn chất lượng, an toàn, sinh thái hoặc phát thải carbon được gán cho Chủ thể, Địa điểm hoặc Lô hàng: Chứng nhận VietGAP, GlobalGAP, Organic; Chứng nhận Vùng trồng/Cơ sở đóng gói đủ điều kiện xuất khẩu; Tuyên bố không dư lượng hóa chất cấm; Tuyên bố Tín chỉ Carbon MRV Đề án 1Mha lúa chất lượng cao phát thải thấp ($20/tấn CO2e); Giấy chứng nhận cơ sở đủ điều kiện VSATTP. | `claim_id` (GCI), `claim_type` (CERTIFICATE, POLICY, MRV_CARBON_CLAIM, FOOD_SAFETY_CLAIM, QUOTA_ALLOCATION), `standard_code` (VIETGAP, GLOBALGAP, GACC_248, EUDR, DECISION_1246, MRV_LOW_EMISSION), `issuer_authority_party_id`, `beneficiary_party_id`, `target_place_id / target_lot_id`, `valid_from`, `valid_to`, `carbon_co2e_reduction_ton`, `audit_status` | `APPLIES_TO_PLACE`, `CERTIFIES_PARTY`, `CONFERS_TO_LOT`, `ACCREDITED_BY` | - **Rice:** Xác nhận cắt nước ngập khô xen kẽ (AWD) giảm phát thải, Bằng chứng chứng minh tuân thủ chống phá rừng EUDR.<br>- **Fruit:** Hạn ngạch MSVT GACC Lệnh 248/249, Tiêu chuẩn BICON Úc.<br>- **Kitchen:** Chứng nhận cơ sở đủ điều kiện ATTP theo Luật ATTP 2010. |
| **8** | **`VERIFICATION`** | Xác thực & Kết quả đối soát | Kết quả kiểm tra, đối soát tự động hoặc bán tự động được thực hiện bởi Rules Engine để kiểm định tính hợp lệ của dữ liệu trước khi cấp chứng thư hoặc cảnh báo vi phạm: Đối soát Cân bằng Khối lượng (Mass Balance Reconciliation Engine ngăn gian lận pha trộn), Kiểm soát Hạn ngạch Vùng trồng (Yield Quota Engine chống mượn mã), Thẩm tra điều kiện kiểm dịch nước nhập khẩu, Phân tích Bán kính Tác động Sự cố Ngộ độc (Incident Impact Engine ≤ 60s). | `verification_id` (GCI), `engine_type` (MASS_BALANCE_ENGINE, YIELD_QUOTA_ENGINE, EXPORT_REGULATION_CHECK, KITCHEN_INCIDENT_ENGINE), `target_lot_id / target_event_id`, `evaluated_at`, `status` (PASSED, WARNING, BLOCKED_FRAUD_DETECTED), `variance_pct`, `confidence_score`, `discrepancy_details_json`, `enforced_rules` (List) | `VERIFIES_EVENT`, `EVALUATES_CLAIM`, `AUDITS_BATCH`, `FLAGS_DISCREPANCY` | - **Rice:** Đối soát khối lượng lúa ướt vào lò sấy với lúa khô ra lò theo công thức hiệu chỉnh độ ẩm.<br>- **Fruit:** Chặn xuất xưởng lô xoài vượt quá năng suất định mức của MSVT (15 tấn/ha/vụ).<br>- **Kitchen:** Đối soát Recipe vs Actual Consumption, khoanh vùng 100% học sinh/công nhân phơi nhiễm sự cố ≤ 60s. |
| **9** | **`TRANSACTION` / `TRANSFORMATION`** | Giao dịch & Chuyển đổi trạng thái | Hành vi chuyển giao quyền sở hữu (Change of Custody) hoặc chuyển đổi trạng thái vật lý/kỹ thuật của dòng sản phẩm: Hợp đồng bao tiêu nông sản giữa Doanh nghiệp và HTX, Biên bản bàn giao hàng hóa (Delivery Order), Chuyển quyền sở hữu lô hàng qua cảng, Quá trình chuyển hóa nguyên liệu sang thành phẩm (Transformation Recipe: Lúa tươi → Gạo trắng + Tấm + Cám; Xoài tươi → Xoài sấy dẻo; Nguyên liệu thô → Suất ăn hoàn chỉnh). | `transaction_id` (GCI), `transaction_type` (PURCHASE_CONTRACT, CUSTODY_TRANSFER, BILL_OF_LADING, PROCESSING_TRANSFORMATION, COOKING_CONVERSION), `seller_party_id`, `buyer_party_id`, `contract_ref`, `input_lots` (List with weights), `output_lots` (List with yields), `conversion_ratio`, `financial_value_vnd`, `status` (PENDING, EXECUTED, SETTLED) | `TRANSFERS_CUSTODY`, `TRANSFORMS_INPUT_TO_OUTPUT`, `SETTLES_CONTRACT`, `INVOICED_BY` | - **Rice:** Hợp đồng thu mua lúa tươi tại ruộng, Biến đổi vật lý xay xát (Tỷ lệ thu hồi gạo 66–68%).<br>- **Fruit:** Hợp đồng phân loại xuất khẩu vs nội địa, Thu mua xô tại vườn.<br>- **Kitchen:** Nhập kho từ nhà cung cấp, Chế biến chuyển đổi 15 nguyên liệu thành 1 thực đơn hoàn chỉnh. |

---

## 3.2 Quy Chuẩn Định Danh Toàn Cầu GCI (Global Chain Identifier)

Mọi đỉnh (Node) và cạnh (Edge) trên đồ thị dữ liệu GOTRACE đều bắt buộc phải mang mã định danh toàn cầu **GCI (Global Chain Identifier)**. Chuẩn GCI bảo đảm tính định danh duy nhất (Globally Unique), có khả năng phân giải phân cấp (Hierarchically Resolvable) và tương thích hoàn toàn với hệ thống mã hóa GS1 / URN / GeoJSON hiện hữu.

### 3.2.1 Cú Pháp Chuẩn GCI (Formal Grammar)

Chuẩn định danh GCI tuân thủ quy tắc định dạng bất biến:

```text
GCI := <Country:VN>.<Province:DT>.<PrimitiveType:PLACE>.<EntityCode>.<SubID>
```

Trong đó:

1. **`<Country>`**: Mã quốc gia theo chuẩn ISO 3166-1 alpha-2 gồm 2 ký tự in hoa (Mặc định: `VN` - Việt Nam).
2. **`<Province>`**: Mã tỉnh/thành phố hành chính tại Việt Nam gồm 2–3 ký tự:
   - `DT`: Đồng Tháp
   - `AG`: An Giang
   - `CT`: Cần Thơ
   - `TG`: Tiền Giang
   - `BT`: Bến Tre
   - `SG`: TP. Hồ Chí Minh
   - `LA`: Long An
3. **`<PrimitiveType>`**: 1 trong 9 mã Core Primitives viết hoa chuẩn:
   - `PARTY`: Chủ thể pháp lý, tổ chức, cá nhân.
   - `PLACE`: Địa điểm, vùng trồng, cơ sở đóng gói, kho, bếp.
   - `ITEM`: Danh mục phẩm cấp, hàng hóa chuẩn hóa.
   - `LOT`: Lô hàng vật lý, mẻ sản xuất, thành phẩm.
   - `EVENT`: Sự kiện chuỗi cung ứng trên dòng thời gian.
   - `EVIDENCE`: Bằng chứng số, phiếu cân, chứng thư kiểm nghiệm, ảnh GIS.
   - `CLAIM`: Tuyên bố chất lượng, chứng chỉ, chính sách hạn ngạch.
   - `VERIFY`: Kết quả kiểm định, biên bản đối soát động cơ rủi ro.
   - `TX`: Giao dịch thương mại, chuyển quyền sở hữu hoặc chuyển hóa chế biến.
4. **`<EntityCode>`**: Mã định danh tổ chức mỏ neo, doanh nghiệp, mã cơ quan quản lý hoặc danh mục kỹ thuật:
   - Ví dụ: `LTG` (Lộc Trời Group), `COMAY` (Công ty Cỏ May), `TRUNGAN` (Trung An), `MARD` (Bộ NN&PTNT), `MSVT-0881` (Mã số vùng trồng 0881), `CSDG-0496` (Cơ sở đóng gói 0496), `ADEN` (Aden Services).
5. **`<SubID>`**: Mã định danh phân cấp con, số sê-ri nội bộ, mã mẻ (batch code), mã mảnh vườn (plot code), timestamp hoặc UUID rút gọn:
   - Ví dụ: `PLOT-MX-001`, `FIN-OM5451-20261115-0891`, `SCALE-88219`, `POLYGON`.

### 3.2.2 Bảng Mã Ví Dụ Thực Địa Của GCI Theo 3 Ngành Trọng Điểm

| Chuỗi Ngành | Core Primitive | Mã Định Danh GCI Chuẩn Hóa | Đối Tượng Thực Tế Tương Ứng ĐBSCL |
|:---|:---:|:---|:---|
| **Lúa gạo (Rice)** | `PARTY` | `VN.DT.PARTY.COMAY.001` | Công ty Cổ phần Cỏ May (Đồng Tháp) — Doanh nghiệp Đầu tàu. |
| | `PLACE` | `VN.AG.PLACE.LTG-FARM.T-SON-01` | Vùng nguyên liệu mẫu 10.000 ha Thoại Sơn (Lộc Trời, An Giang). |
| | `LOT` | `VN.DT.LOT.RIC-OM5451-20261115.0891` | Lô lúa tươi OM5451 thu hoạch ngày 15/11/2026 tại HTX Tân Bình. |
| | `EVENT` | `VN.CT.EVENT.MILLING.TRUNGAN-M02` | Sự kiện xay xát gạo xuất khẩu tại Nhà máy Thốt Nốt (Trung An). |
| | `EVIDENCE` | `VN.DT.EVIDENCE.SCALE-TICKET.ST-88219` | Phiếu cân điện tử trạm cân ghe lúa Cỏ May (chống gian lận cân). |
| | `CLAIM` | `VN.AG.CLAIM.MRV-CARBON.1MHA-2026-01` | Báo cáo MRV giảm phát thải lúa chất lượng cao 1Mha ($20/tấn CO2e). |
| **Trái cây (Fruit)** | `PLACE` | `VN.DT.PLACE.MSVT-0881.POLYGON` | Tọa độ ranh giới GIS Vùng trồng Xoài Mỹ Xương (MARD cấp mã 0881). |
| | `PARTY` | `VN.DT.PARTY.FARMER-NVA.PLOT01` | Nông hộ Nguyễn Văn A, thành viên tổ hợp tác xoài Cát Chu. |
| | `LOT` | `VN.DT.LOT.FRU-MANGO-AUS-20260925.01` | Lô xoài đóng gói hoàn tất chiếu xạ xuất khẩu sang Australia. |
| | `EVIDENCE` | `VN.DT.EVIDENCE.COLD-REEFER.CSNU882910` | Chuỗi dữ liệu IoT nhiệt độ container lạnh trên hành trình xuất cảng. |
| | `VERIFY` | `VN.DT.VERIFY.YIELD-QUOTA.YQ-0881-2026` | Kết quả động cơ kiểm soát hạn ngạch ngăn chặn hành vi "mượn mã". |
| **Bếp ăn (Kitchen)** | `PLACE` | `VN.CT.PLACE.KITCHEN-ADEN-TRAOC.K01` | Bếp ăn công nghiệp Aden Services phục vụ KCN Trà Nóc (Cần Thơ). |
| | `LOT` | `VN.CT.LOT.ING-PORK-20261012.L09` | Lô thịt heo mảnh VietGAP nhập kho buổi sáng từ Ba Huân. |
| | `EVIDENCE` | `VN.CT.EVIDENCE.QD1246-INSPECT.20261012-AM` | Biên bản kiểm thực 3 bước và ảnh chụp niêm phong mẫu lưu 24h. |
| | `LOT` | `VN.CT.LOT.MEAL-BATCH-CA1.20261012` | Mẻ 1.500 suất ăn công nhân ca 1 tại nhà máy chế biến thủy sản. |
| | `VERIFY` | `VN.CT.VERIFY.INCIDENT-TRACE.INC-0042` | Động cơ phân tích bán kính khoanh vùng sự cố thực phẩm trong 60 giây. |

### 3.2.3 Ánh Xạ Tương Thích Ngược Mã Vạch & Tem Nhãn (Physical Representation Mapping)

Để tương thích với các thiết bị quét mã vạch công nghiệp cầm tay, máy quét trạm cân, và chuẩn QR người tiêu dùng quy định tại [`03_Rice_Playbook.md`](./03_Rice_Playbook.md), [`04_Fruit_Playbook.md`](./04_Fruit_Playbook.md) và [`05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md), mã GCI được chuyển đổi tương thích 1:1 qua 2 hình thức biểu diễn:

1. **Biểu diễn chuẩn URN / IoT Graph Node:**
   - Cú pháp: `GT:<Country>:<PrimitiveType>:<EntityCode>:<SubID>`
   - Ví dụ: `GT:VN:PLACE:MARD:VN-DTP-OR-2026-0881`, `GT:VN:LOT:DTHAP:HLOT-20260925-CC01`, `GT:VN:SHIPMENT:REEFER:CSNU882910-4`.
2. **Biểu diễn nhãn Barcode / RFID / Serial GS1:**
   - Cú pháp: `GT-[Country]-[Sector]-[Type]-[Date]-[Serial]`
   - Ví dụ: `GT-VN-RIC-LOT-20261115-0891`, `GT-VN-FRU-MSVT-20260601-0496`.
3. **Quy tắc phân giải URL Tra Cứu Công Khai (Public Resolver URL):**
   - Mọi mã GCI đều có thể phân giải trực tiếp qua cổng thông tin truy xuất:  
     `https://trace.gotrace.vn/resolve?gci=VN.DT.LOT.RIC-OM5451-20261115.0891`

---

## 3.3 Đồ Thị Quan Hệ Cốt Lõi Giữa 9 Primitives (Graph Relationships)

Mối liên kết giữa 9 Primitives được biểu diễn dưới dạng cạnh có hướng (Directed Edges), phản ánh dòng vận động của vật chất, thông tin và pháp lý:

```text
       ┌───────────┐           OWNS / OPERATES           ┌───────────┐
       │   PARTY   ├────────────────────────────────────►│   PLACE   │
       └─────┬─────┘                                     └─────┬─────┘
             │                                                 │
             │ TRANSACTS_WITH / CONTRACTED_TO                  │ GROWN_AT / STORED_AT
             ▼                                                 ▼
       ┌───────────┐             PRODUCED_LOT            ┌───────────┐
       │TRANSACTION│◄────────────────────────────────────┤ LOT/BATCH │◄──┐
       └─────┬─────┘                                     └─────┬─────┘   │
             │                                                 │         │ DERIVED_FROM /
             │ TRANSFORMS_INPUT_TO_OUTPUT                      │         │ CONSUMED_LOT
             ▼                                                 │         │
       ┌───────────┐             APPLIED_TO_LOT                │         │
       │   EVENT   ├───────────────────────────────────────────┘         │
       └─────┬─────┘                                                     │
             │                                                           │
             │ SUPPORTED_BY_EVIDENCE                                     │
             ▼                                                           │
       ┌───────────┐             VALIDATES_LOT                           │
       │ EVIDENCE  ├─────────────────────────────────────────────────────┤
       └─────┬─────┘                                                     │
             │                                                           │
             │ AUDITED_BY_ENGINE                                         │
             ▼                                                           │
       ┌──────────────┐          EVALUATES_CLAIM         ┌───────────┐   │
       │ VERIFICATION ├─────────────────────────────────►│   CLAIM   ├───┘
       └──────────────┘                                  └───────────┘
```

### Danh Mục Cạnh Kết Nối Chuẩn Hóa:

```text
PRODUCED_BY        : Lô hàng [LOT] được sản xuất bởi Chủ thể [PARTY]
GROWN_AT           : Lô thu hoạch [LOT] được trồng tại Vị trí/Vùng trồng [PLACE]
HARVESTED_FROM     : Nông sản [ITEM] được thu hoạch từ Mảnh vườn [PLACE]
SOLD_BY            : Lô hàng [LOT] được bán bởi [PARTY] theo Giao dịch [TRANSACTION]
DELIVERED_TO       : Lô vận chuyển được giao đến Cơ sở [PLACE]
RECEIVED_BY        : Hàng hóa được tiếp nhận bởi Nhân sự/Bộ phận [PARTY]
STORED_AT          : Lô hàng lưu kho tại Kho bãi/Bảo quản [PLACE]
PROCESSED_IN       : Mẻ sản xuất được thực hiện tại Nhà máy [PLACE]
TRANSFORMED_TO     : Nguyên liệu [LOT_IN] chuyển đổi thành Thành phẩm [LOT_OUT]
PACKED_AS          : Quy cách đóng gói vật phẩm [ITEM] thành Lô đóng gói [LOT]
USED_IN            : Lô nguyên liệu được sử dụng trong Thực đơn/Sản phẩm [ITEM]
SERVED_AS          : Suất ăn được phân phối tới Bếp ăn/Người dùng [PLACE/PARTY]
SHIPPED_AS         : Lô thành phẩm được đóng vào Container [LOT/SHIPMENT]
TESTED_BY          : Mẫu phân tích được kiểm nghiệm bởi Phòng Lab [PARTY]
CERTIFIED_BY       : Chứng chỉ/Tiêu chuẩn [CLAIM] được cấp bởi Cơ quan [PARTY]
ATTESTED_BY        : Sự kiện [EVENT] được bảo chứng bởi Bằng chứng số [EVIDENCE]
AUDITED_BY         : Quá trình đối soát tuân thủ thực hiện bởi Động cơ [VERIFICATION]
```

---

## 3.4 Bốn Cơ Chế & Thuật Toán Truy Xuất Nguồn Gốc (Core Trace Modes & Engines)

Kiến trúc dữ liệu GOTRACE vận hành 4 thuật toán truy xuất tương ứng với các tình huống nghiệp vụ thực tế tại ĐBSCL:

### 3.4.1 Reverse Trace (Truy Xuất Ngược Phả Hệ)
- **Mục tiêu:** Từ thành phẩm cuối cùng truy vết toàn bộ lịch sử ngược về đầu nguồn nông trại.
- **Dòng chảy đồ thị:**
  $$\text{Finished Lot} \xrightarrow{\text{Genealogy}} \text{Batch / Mẻ xát} \xrightarrow{\text{Receiving}} \text{Source Lot / Lúa tươi} \xrightarrow{\text{Field}} \text{Growing Area / Nông hộ} \xrightarrow{\text{Legal}} \text{Supplier / HTX}$$
- **Ứng dụng:** Đáp ứng kiểm tra hải quan EUDR (truy ngược tọa độ ranh giới rừng không bị phá sau 31/12/2020), xử lý khiếu nại dư lượng thuốc BVTV của thị trường Nhật Bản/Hàn Quốc.

### 3.4.2 Forward Trace (Truy Xuất Xuôi Dòng Phân Phối)
- **Mục tiêu:** Từ một cảnh báo tại nguồn nguyên liệu truy vết toàn bộ điểm đến của các lô thành phẩm liên quan.
- **Dòng chảy đồ thị:**
  $$\text{Source Lot / Lô bệnh} \xrightarrow{\text{Process}} \text{Batches} \xrightarrow{\text{Packing}} \text{Finished Lots} \xrightarrow{\text{Logistics}} \text{Shipments} \xrightarrow{\text{Dispatch}} \text{Customers / Điểm tiêu thụ}$$
- **Ứng dụng:** Khi phát hiện một mẻ xoài nhiễm ruồi đục quả tại cơ sở đóng gói, hệ thống tự động khóa ngay các pallet đang trên đường vận chuyển, ngăn chặn hàng cập cảng bị tiêu hủy.

### 3.4.3 Mass Balance Reconciliation Engine (Động Cơ Đối Soát Cân Bằng Khối Lượng)
- **Mục tiêu:** Ngăn chặn hành vi gian lận pha trộn gạo cấp thấp hoặc mua gom trái cây trôi nổi để "mượn mã".
- **Công thức hiệu chỉnh độ ẩm chuỗi Lúa gạo:**
  $$M_{\text{dry\_actual}} \le M_{\text{wet}} \times \left(\frac{100 - W_{\text{wet}}}{100 - W_{\text{dry}}}\right) \times (1 - L_{\text{process}})$$
- **Công thức kiểm soát hạn ngạch chuỗi Trái cây (Yield Quota):**
  $$\sum \text{Yield}_{\text{harvested}} \le \text{Area}_{\text{polygon}} \times \text{YieldMax}_{\text{standard}}$$
- **Cơ chế xử lý:** Nếu lượng xuất bán vượt ngưỡng tính toán, hệ thống tự động kích hoạt trạng thái `BLOCKED_FRAUD_DETECTED` và từ chối cấp chứng thư số truy xuất.

### 3.4.4 Incident Impact Analysis Engine (Động Cơ Phân Tích Bán Kính Tác Động Sự Cố ≤ 60s)
- **Mục tiêu:** Khoanh vùng chính xác mọi đối tượng phơi nhiễm trong các vụ ngộ độc thực phẩm bếp ăn tập thể.
- **Thuật toán đồ thị:** Thực hiện duyệt theo chiều rộng (BFS traversal) từ Lô nguyên liệu nghi nhiễm qua các mẻ nấu, danh sách thực đơn, ca ăn và địa điểm phục vụ:
  $$\text{Contaminated Lot} \xrightarrow{\text{Recipe Graph}} \{\text{Meal Batches}\} \xrightarrow{\text{Distribution}} \{\text{Kitchen Sites}\} \xrightarrow{\text{Serving Log}} \{\text{Affected Workers / Students}\}$$
- **Hiệu năng:** Hoàn tất báo cáo khoanh vùng và lệnh triệu hồi trong thời gian $\le 60\text{ giây}$, bảo đảm tuân thủ quy chuẩn kiểm thực 3 bước và lưu mẫu 24h theo Quyết định 1246/QĐ-BYT.

---

# 4. Common Evidence Model

Evidence should be attached to an object or event, not stored as isolated documents.

Examples:

- purchase order;
- delivery note;
- receiving record;
- QC result;
- laboratory result;
- certificate;
- production record;
- harvest record;
- packing record;
- temperature record;
- shipment record;
- photo;
- location evidence;
- inspection record.

Target:

> **Identity + Event + Relation + Evidence = Verified Traceable Lot**

---

# 5. Common Buyer Architecture

Mỗi account phải map ít nhất:

| Role | Question |
|---|---|
| Economic Buyer | Ai quyết định ngân sách? |
| Business Owner | Ai chịu trách nhiệm business outcome? |
| Operational Owner | Ai vận hành quy trình? |
| Data Owner | Ai sở hữu dữ liệu? |
| IT Owner | Ai quản lý hệ thống/tích hợp? |
| Compliance Owner | Ai chịu trách nhiệm hồ sơ/rủi ro? |
| Network Owner | Ai có quyền yêu cầu supplier tham gia? |

Không mặc định Data Owner = Economic Buyer.

---

# 6. Common Discovery Framework

Mỗi account phải trả lời:

```text
WHO pays?
WHO owns data?
WHO operates?
WHO suffers?
WHO can require suppliers to provide data?

WHAT systems exist?
WHAT data exists?
WHAT is manual?
WHAT LOT is difficult to trace?
WHAT evidence is missing?
WHAT incident is expensive?
WHAT integration is required?

WHY now?
WHY GOTRACE?
WHAT is the smallest useful pilot?
HOW does the pilot expand?
```

---

# 7. Common Sales Funnel

```text
Market Mapping
      ↓
Account Qualification
      ↓
Executive Discovery
      ↓
Supply Chain Data Diagnostic
      ↓
Traceability Proof
      ↓
Pilot
      ↓
Business Case
      ↓
Contract
      ↓
Supplier Network Expansion
      ↓
Regional Network
```

Không lấy Demo → Quote → Contract làm mặc định.

---

# 8. Common Entry Offer

## Supply Chain Data Diagnostic

**Thời lượng:** 2–4 tuần.

### Scope

1. Map supply chain
2. Map actors
3. Map sites
4. Map current systems
5. Identify LOT/BATCH
6. Identify EVENTS
7. Identify EVIDENCE
8. Trace one real LOT
9. Measure manual effort
10. Identify data gaps
11. Identify integration points
12. Produce pilot blueprint

### Deliverables

- Current-state process map
- Actor/network map
- Data map
- Evidence map
- Traceability gap map
- Integration map
- Pilot scope
- KPI baseline
- Business-value hypothesis

---

# 9. Common Pilot Principle

Pilot phải đủ nhỏ để triển khai nhanh nhưng đủ thật để chứng minh giá trị.

```text
1 Anchor
+
1 Critical Process
+
1 Product / Commodity
+
1 Real LOT
+
1 Real Evidence Chain
```

### Không lấy số QR làm primary KPI.

Primary KPI:

- Trace time
- Evidence completeness
- Data reconciliation effort
- Supplier onboarding effort
- Incident impact analysis
- Manual steps removed
- Data reuse

---

# 10. Common Expansion Model

```text
Pilot
  ↓
1 Site
  ↓
Supplier Network
  ↓
Multiple Sites
  ↓
Multiple Products
  ↓
Multiple Partners
  ↓
Regional Network
```

### Network Value

Khung phân tích:

> **Network Value = Anchor Value × Network Reach × Data Criticality × Expansion Potential**

Đây là framework nội bộ để ưu tiên account, không phải công thức định giá cố định.

---

# 11. RICE PLAYBOOK — DESIGN BRIEF

## Strategic role

> **Prove Network Scale**

### Chain

```text
Production Area
→ Producer / HTX
→ Harvest LOT
→ Collection LOT
→ Warehouse
→ Processing Batch
→ Finished LOT
→ Shipment
→ Buyer
```

### Core data problem

- LOT continuity;
- genealogy;
- mass balance;
- supplier aggregation;
- processing genealogy;
- export evidence.

### Likely Anchor

- rice processor;
- rice exporter;
- enterprise organizing source areas;
- enterprise controlling procurement network.

### Pilot shape

```text
1 Plant
+
5–10 HTX / supplier groups
+
1 rice product
+
real harvest LOTs
+
1 processing flow
+
1 shipment
```

### Primary proof

Finished LOT → source production areas.

Source LOT → affected finished products.

---

# 12. FRUIT PLAYBOOK — DESIGN BRIEF

## Strategic role

> **Prove Data Complexity**

### Chain

```text
Production Area
→ Harvest LOT
→ Collection
→ Packhouse
→ Grade / Split
→ Pack LOT
→ Cold Storage
→ Shipment
→ Buyer / Export
```

### Core data problem

- LOT split;
- LOT merge;
- grade/state;
- quality evolution;
- cold-chain events;
- certification;
- residue/lab evidence;
- packing/export evidence.

### Likely Anchor

- exporter;
- packhouse;
- fruit processor;
- enterprise organizing production areas.

### Pilot shape

```text
1 Crop
+
1 Packhouse
+
3–5 Production Areas
+
real Harvest LOT
+
1 Export Shipment
```

### Primary proof

Shipment → Pack LOT → Grade → Harvest LOT → Production Area.

---

# 13. KITCHEN PLAYBOOK — DESIGN BRIEF

## Strategic role

> **Prove Downstream Demand Network**

### Chain

```text
Supplier
→ Ingredient LOT
→ Receiving
→ QC
→ Storage
→ Issue
→ Preparation
→ Recipe
→ Cooking
→ Meal Batch
→ Portion
→ Consumer
```

### Core data problem

- multi-supplier;
- ingredient LOT genealogy;
- receiving evidence;
- storage conditions;
- recipe consumption;
- meal-batch genealogy;
- incident impact.

### Likely Anchor

- institutional kitchen operator;
- school kitchen network;
- hospital kitchen;
- factory kitchen;
- catering / central kitchen;
- food-service operator.

### Pilot shape

```text
1 Kitchen
+
1 Menu Cycle
+
5–10 Ingredient Categories
+
Real Ingredient LOTs
+
1 Meal Batch
```

### Primary proof

Ingredient LOT → Meal Batch → Served population.

Meal Batch → all ingredient LOTs.

Incident → affected meal batches / sites.

---

# 14. Three Reference Architectures

Sau khi triển khai đủ 3 pilot:

```text
                 GOTRACE DATA GRAPH
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
        RICE           FRUIT         KITCHEN
       Linear         Branching      Converging
          │              │              │
       Scale          Complexity      Demand
          └──────────────┼──────────────┘
                         ↓
                   FOOD NETWORK
```

Ba pilot không chỉ tạo doanh thu.

Chúng tạo:

> **3 reusable reference architectures cho thị trường Mekong.**

---

# 15. PMO 90-Day Framework

## Days 1–30 — Market Mapping

Target:

- 100 accounts
- 30 priority accounts
- 15 discovery meetings
- 5 diagnostic candidates

Phân bổ ban đầu:

- Rice: 30
- Fruit: 25
- Kitchen: 15
- Processor: 10
- Logistics: 10
- Others: 10

## Days 31–60 — Discovery / Diagnostic

Mục tiêu:

- 5 deep diagnostics;
- 3 pilot candidates;
- xác định economic buyer;
- xác định data owner;
- xác định operational pain;
- xác định ROI hypothesis.

## Days 61–90 — Pilot

Mục tiêu:

- 1 Rice pilot;
- 1 Fruit pilot;
- 1 Kitchen pilot.

Output:

- real LOT trace;
- evidence graph;
- KPI baseline;
- business case;
- expansion plan.

---

# 16. Sales Enablement Package

Mỗi vertical playbook hoàn chỉnh phải có:

1. ICP
2. Account qualification
3. Buyer map
4. Stakeholder map
5. Process map
6. Data model
7. Evidence model
8. Pain map
9. Risk map
10. Current-system map
11. Integration map
12. Entry offer
13. Pilot design
14. KPI
15. ROI hypothesis
16. Objection handling
17. Sales discovery questions
18. Demo scenario
19. Proposal structure
20. Expansion model
21. Reference architecture
22. Account-selection criteria

---

# 17. Research Requirements for the Three Full Playbooks

Mỗi hồ sơ phải phân tích đa chiều:

### Market

- market size;
- production;
- trade;
- geographic concentration;
- growth;
- regulatory direction.

### Supply Chain

- actors;
- process;
- transaction;
- material flow;
- information flow;
- evidence flow.

### Business

- buyer;
- economic pain;
- cost;
- risk;
- decision process;
- willingness-to-pay hypothesis.

### Technology

- ERP;
- WMS;
- MES;
- POS;
- IoT;
- lab;
- API;
- manual data;
- integration barriers.

### Governance

- data ownership;
- data custody;
- authority;
- verification;
- accountability.

### Sales

- entry point;
- champion;
- economic buyer;
- sales cycle;
- objections;
- pilot trigger.

### Implementation

- scope;
- timeline;
- dependencies;
- onboarding;
- data migration;
- integration;
- training;
- KPI.

### Expansion

- supplier network;
- multiple sites;
- multiple products;
- downstream buyers;
- regional network.

---

# 18. Required Output Standard

Ba playbook cuối cùng phải trả lời được:

> **Ai mua?**

> **Vì sao họ phải mua?**

> **GOTRACE giải quyết chính xác bước nào?**

> **Dữ liệu nào phải có?**

> **Dữ liệu hiện nằm ở đâu?**

> **Bằng chứng nào cần liên kết?**

> **Pilot nhỏ nhất là gì?**

> **Trong bao lâu có thể chứng minh?**

> **Đo giá trị bằng gì?**

> **Ai là người quyết định?**

> **Ai có thể phản đối?**

> **Sau pilot mở rộng thế nào?**

> **Tại sao mô hình này có thể nhân rộng ở Mekong?**

---

# 19. Final Deliverables

Bộ tài liệu hệ thống chuẩn hóa (Single-Tier Flat Hierarchy):

- [**00_MASTER_INDEX.md**](./00_MASTER_INDEX.md) — Single Source of Truth & Điều hướng trung tâm
- [**00_Executive_Brief.md**](./00_Executive_Brief.md) — Tóm tắt điều hành & Investment Thesis
- [**01_Mekong_Market_Intelligence_GTM_2026_2030.md**](./01_Mekong_Market_Intelligence_GTM_2026_2030.md) — Báo cáo thị trường & Chiến lược GTM ĐBSCL
- [**02_Platform_Object_Implementation_Blueprint.md**](./02_Platform_Object_Implementation_Blueprint.md) — Bản thiết kế đối tượng kỹ thuật (Tài liệu này)
- [**03_Rice_Playbook.md**](./03_Rice_Playbook.md) — Cẩm nang thực thi chuỗi Lúa gạo (Linear Chain & 29 Events)
- [**04_Fruit_Playbook.md**](./04_Fruit_Playbook.md) — Cẩm nang thực thi chuỗi Trái cây (Branching Chain, MSVT & Cold-chain)
- [**05_Kitchen_Playbook.md**](./05_Kitchen_Playbook.md) — Cẩm nang thực thi chuỗi Bếp ăn (Converging Chain & Incident 60s)
- [**06_PMO_Master_Execution_Plan.md**](./06_PMO_Master_Execution_Plan.md) — Kế hoạch vận hành PMO Master 44 chương + 90 ngày
- [**07_Target_Account_Map.md**](./07_Target_Account_Map.md) — Danh bạ 100 Anchor Accounts & Network Value Scoring
- [**08_Sales_Discovery_Playbook.md**](./08_Sales_Discovery_Playbook.md) — Cẩm nang Sales Discovery, Xử lý phản đối & Chẩn đoán
- [**09_Strategic_Gap_Analysis.md**](./09_Strategic_Gap_Analysis.md) — Phân tích khoảng trống chiến lược, bóc tách iCheck & Pháp lý

Trong đó:
- `03–05`: 3 hồ sơ triển khai trọng tâm ngành (Lúa gạo, Trái cây, Bếp ăn).
- `06`: Kế hoạch PMO tổng thể điều phối nguồn lực & ngân sách.
- `07`: Danh sách 100 Anchor Accounts thực tế tại ĐBSCL.
- `08`: Bộ công cụ để Sales triển khai discovery và bán gói Diagnostic.

---

# 20. Strategic End State

Mục tiêu cuối cùng không phải chứng minh:

> “GOTRACE có thể làm truy xuất cho 3 ngành.”

Mà chứng minh:

> [!IMPORTANT]
> **GOTRACE có một Supply Chain Data Graph đủ linh hoạt để xử lý ba cấu trúc chuỗi khác nhau của Mekong:**
> - **Rice** $\rightarrow$ Scale (Quy mô mạng lưới & Cân bằng khối lượng)
> - **Fruit** $\rightarrow$ Complexity (Độ phức tạp phân nhánh & Giám sát kiểm dịch IoT)
> - **Kitchen** $\rightarrow$ Accountability (Trách nhiệm giải trình hội tụ & Phản ứng sự cố ≤ 60s)

```text
Rice
→ Scale

Fruit
→ Complexity

Kitchen
→ Demand

        ↓

GOTRACE
        ↓

Supply Chain Data Graph
        ↓
Traceability
+
Evidence
+
Risk
+
Accountability
        ↓
Regional Food Network
```

**End state:**

> **Đồng Tháp = Supply/Data Beachhead**  
> **Cần Thơ = Regional Commercial & Logistics Hub**  
> **TP.HCM = Commercial Gateway**  
> **Mekong = Network Market**
