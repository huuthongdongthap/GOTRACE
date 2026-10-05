# GOTRACE TÂY NAM BỘ — CHIẾN LƯỢC ĐẤU NỐI DỮ LIỆU THỰC ĐỊA VÀO NỀN TẢNG GOTRACE
## Đề Xuất Hướng Đi Kỹ Thuật — Vận Hành — Thương Mại Hóa Nhằm Hiện Thực Hóa Mục Tiêu Kinh Doanh 2026–2028

- **Mã tài liệu:** `GOTRACE-TNB-DOC-08`
- **Cơ quan chỉ đạo:** Founder & Hội đồng Quản trị (BOD) GOTRACE / ZAM Vietnam
- **Đơn vị lập đề án:** PMO Regional Lead & Solution Architecture Group
- **Địa bàn triển khai:** Đồng Tháp (Beachhead) – Cần Thơ (Hub) – Tiền Giang – An Giang – TP.HCM
- **Ngày ban hành:** 27/09/2026
- **Trạng thái:** Chiến lược Đấu nối & Tác chiến Thực địa (Official Strategic Blueprint)

---

## TỔNG QUAN ĐIỀU HÀNH: VẤN ĐỀ CỐT LÕI CỦA PMO MIỀN TÂY

Văn phòng Điều phối Dự án (PMO) Tây Nam Bộ đối mặt với một câu hỏi sinh tử từ Ban Giám đốc:

> **"Làm thế nào để bộ máy vận hành hiện trường của PMO tại ĐBSCL có thể cắm trực tiếp vào hệ thống dữ liệu GoTRACE (9 Primitives, GCI, Graph Ledger, Risk Engines) một cách khả thi, không bị kháng cự bởi nông dân và HTX, đồng thời tạo ra doanh thu thực tế, tự chủ tài chính và đạt các mục tiêu kinh doanh đã cam kết?"**

Nếu PMO chỉ đơn thuần là đội ngũ "bán hàng phần mềm" hoặc "tuyên truyền nông nghiệp", dự án sẽ rơi vào bẫy thất bại kinh điển của các giải pháp truy xuất nguồn gốc nông thôn:
1. Nông dân và HTX từ chối nhập liệu vì quá phức tạp ("làm nông mệt mỏi, không rảnh gõ app").
2. Doanh nghiệp đầu tàu xem đây là chi phí đối phó, không thấy lợi ích kinh tế trực tiếp.
3. Dữ liệu thu về là "dữ liệu chết", không có bằng chứng chứng thực (Evidence-free), không giải quyết được các đợt thanh tra Lệnh 280 GACC hay khủng hoảng ngộ độc thực phẩm.

Bản đề xuất này vạch rõ **Hướng Đi Toàn Diện Gồm 5 Trụ Cột** để PMO miền Tây đấu nối trơn tru vào hệ thống dữ liệu GoTRACE, biến từng sự kiện tại ruộng lúa, vườn trái cây và bếp ăn thành **tài sản dữ liệu có khả năng sinh lời (Monetizable Data Asset)**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│             HỆ SINH THÁI ĐẤU NỐI DỮ LIỆU PMO MIỀN TÂY ↔ GOTRACE             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. TẦNG THU THẬP THỰC ĐỊA (EDGE INGESTION — ZERO FRICTION)                  │
│    • IoT Trạm cân RS-232/485   • Zalo Mini App HTX    • Kiosk Bếp ăn KCN    │
│    • Barcode Scanner CSDG      • Cold-chain Logger    • ERP Connector API   │
│                                  │                                          │
│                                  ▼                                          │
│ 2. KHẾ ƯỚC DỮ LIỆU & 9 PRIMITIVES (COMMON DATA CONTRACT)                     │
│    • GCI Identity Syntax: VN.DT.[TYPE].[ID]                                 │
│    • Party, Place, Item, Lot, Event, Evidence, Claim, Verify, Transaction   │
│                                  │                                          │
│                                  ▼                                          │
│ 3. ĐỘNG CƠ ĐỐI SOÁT & KIỂM SOÁT RỦI RO (DETERMINISTIC ENGINES)               │
│    • Mass Balance Engine (Lúa 65-68%, Trái cây sai số <2%)                  │
│    • Fruit Risk Engine (10 Rules: GACC 280, Test Cadmium/Auramine O, Quota) │
│    • Kitchen Incident Engine (Khoanh vùng học sinh/công nhân ≤ 60s)         │
│                                  │                                          │
│                                  ▼                                          │
│ 4. MÔ HÌNH THƯƠNG MẠI HÓA DỮ LIỆU (5 REVENUE STREAMS)                        │
│    • Gói Chẩn đoán (45–75M)   • Setup Pilot (150–300M) • SaaS ARR           │
│    • Phí Giao dịch LOT        • Báo cáo Tuân thủ GACC/MRV Carbon ($20/tấn)  │
│                                  │                                          │
│                                  ▼                                          │
│ 5. LỘ TRÌNH 90 NGÀY TỰ CHỦ TÀI CHÍNH (CASH FLOW ACCELERATION)               │
│    • Tháng 1: Kitchen Fast-Track (Chốt nhanh 7–10 ngày, bảo vệ Gate 30)     │
│    • Tháng 2: Rice Anchor + IoT Trạm cân + Lô Thu Đông (Vượt Gate 60)       │
│    • Tháng 3: Sầu riêng nghịch vụ Pilot + Chuẩn bị Đông Xuân (Vượt Gate 90) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## TRỤ CỘT 1: KIẾN TRÚC ĐẤU NỐI THỰC ĐỊA KHÔNG MA SÁT (ZERO-FRICTION EDGE INGESTION)

Sai lầm lớn nhất của các dự án GovTech/AgTech là ép người nông dân và thủ kho nhập liệu văn bản thủ công trên các biểu mẫu phức tạp. PMO miền Tây phải tuân thủ nguyên tắc: **"Tự động hóa tại điểm nghẽn vật lý — Người dùng chỉ bấm 1 chạm hoặc không cần làm gì."**

### 1.1 Điểm Đấu Nối 1: Trạm Cân Điện Tử Tự Động (IoT Weighbridge Serial Bridge)
- **Vị trí lắp đặt:** 
  - Đầu cân trạm cân xe tải tại các nhà máy xay xát lúa gạo lớn (Lộc Trời Thoại Sơn, Tân Long Tri Tôn, Trung An Thốt Nốt, Cỏ May Sa Đéc).
  - Bàn cân tiếp nhận quả tươi tại các cơ sở đóng gói (CSĐG) sầu riêng, xoài tại Cai Lậy (Tiền Giang) và Cao Lãnh (Đồng Tháp).
- **Cơ chế kỹ thuật:**
  - Một bo mạch nhúng công nghiệp nhỏ gọn (ESP32/Raspberry Pi Industrial) cắm trực tiếp vào cổng giao tiếp truyền thông chuẩn RS-232 hoặc RS-485 của đầu cân điện tử (như Toledo, CAS, Yaohua).
  - Khi xe tải lúa hoặc xe ba gác chở nông sản chạy lên bàn cân, thiết bị tự động "bắt" chuỗi ký tự trọng lượng thực tế, đính kèm mã định danh nhà cung cấp (`GCI Party`), thời gian thực (NTP Time) và mã trạm cân (`GCI Place`).
  - Dữ liệu được mã hóa băm SHA-256 và truyền thẳng về GoTRACE Cloud qua kết nối SIM 4G LTE độc lập (không phụ thuộc vào mạng Wi-Fi chập chờn của nhà máy).
- **Giá trị kinh tế & Đối soát:**
  - Khởi tạo lập tức 01 sự kiện `EVENT: WEIGHED` và 01 bằng chứng `EVIDENCE: WEIGHT_TICKET`.
  - Triệt tiêu 100% tình trạng "ghi khống số cân", "cò lúa móc ngoặc nâng khối lượng", hoặc "tráo phiếu cân tay". Doanh nghiệp tiết kiệm ngay 2–5% chi phí thất thoát thu mua.

### 1.2 Điểm Đấu Nối 2: Zalo Mini App "Thư Ký Số HTX" Cho Nông Hộ & HTX
- **Đối tượng sử dụng:** Ban Quản trị Hợp tác xã (HTX), Tổ trưởng tổ hợp tác và các nông hộ thành viên.
- **Rào cản giải quyết:** Người miền Tây sử dụng 100% điện thoại thông minh đều có ứng dụng Zalo. Họ từ chối tải app mới từ App Store/Google Play vì tốn bộ nhớ và quên mật khẩu.
- **Cơ chế kỹ thuật:**
  - Tích hợp GoTRACE qua nền tảng Zalo Mini App (Zero-Install). Đăng nhập tự động bằng số điện thoại Zalo đã được xác thực (eKYC).
  - Giao diện thiết kế theo triết lý "3 nút bấm":
    1. *Báo gieo sạ / Ra hoa:* Chọn giống lúa hoặc loại trái cây $\rightarrow$ Hệ thống tự động liên kết với mã số vùng trồng (`GCI Place: GROWING_AREA`) và tọa độ GIS bản đồ địa chính.
    2. *Nhật ký vật tư:* Chụp ảnh vỏ bao phân bón/thuốc BVTV $\rightarrow$ AI OCR tự động trích xuất tên hoạt chất và liều lượng $\rightarrow$ Lưu thành `EVENT: TREATED` và `EVIDENCE: GIS_PHOTO`.
    3. *Báo cắt lúa / Cắt quả:* Bấm nút "Yêu cầu thu hoạch" $\rightarrow$ Phát sinh mã lô gặt `LOT: HarvestLot` kèm dự kiến sản lượng.
- **Đòn bẩy Đề án 1 Triệu Hecta (1Mha):**
  - Tích hợp nút báo "Bơm nước / Rút nước" phục vụ kỹ thuật ngập khô xen kẽ (AWD). Mỗi lần rút nước hợp lệ được ghi nhận thành bản ghi chứng thực để tích lũy dữ liệu cấp tín chỉ carbon ($20/tấn CO2e).

### 1.3 Điểm Đấu Nối 3: Máy Quét Cầm Tay & Cảm Biến Chuỗi Lạnh Tại Packhouse
- **Vị trí lắp đặt:** Khu vực phân loại, dán tem và kho lạnh của các Doanh nghiệp Trái cây (Chánh Thu, Vina T&T, Hoàng Phát).
- **Cơ chế kỹ thuật:**
  - Máy quét mã 2D cầm tay không dây (Industrial Handheld Scanner) đọc mã QR/DataMatrix trên sọt quả từ vườn về.
  - Khi công nhân phân loại quả vào từng line:
    - Nhấn phím nóng Grade A $\rightarrow$ Kích hoạt in mã kiện xuất khẩu `PackLot-GradeA`.
    - Nhấn phím nóng Grade B $\rightarrow$ In mã kiện nội địa `PackLot-GradeB`.
  - Cảm biến nhiệt độ BLE / USB Data Logger thả trực tiếp vào từng container lạnh xuất khẩu $\rightarrow$ Tự động đồng bộ đồ thị biến thiên nhiệt độ hải trình vào `EVIDENCE: COLD_CHAIN_LOG`.

### 1.4 Điểm Đấu Nối 4: Kiosk Tablet Bếp Ăn & Kiểm Thực 3 Bước Số Hóa
- **Vị trí lắp đặt:** Khu vực giao nhận nguyên liệu và phòng lưu mẫu của các Bếp ăn công nghiệp, Suất ăn trường học (Aden, The Caterers, Trường liên cấp, Suất ăn KCN Sa Đéc/Trà Nóc).
- **Cơ chế kỹ thuật:**
  - Máy tính bảng chuyên dụng gắn tường tại cửa tiếp nhận thực phẩm.
  - Lúc 05:00 sáng khi nhà cung cấp giao thịt, rau, gạo:
    - Bếp trưởng quét mã QR trên phiếu giao hàng $\rightarrow$ Hệ thống tự động khớp nối với lô gạo từ Đồng Tháp hoặc lô thịt từ Đồng Nai.
    - Chụp ảnh cảm quan và đo nhiệt độ tiếp nhận $\rightarrow$ Lưu tức thì vào biên bản kiểm thực 3 bước điện tử chuẩn Quyết định 1246/QĐ-BYT.
  - Lúc 11:30 trưa: Chụp ảnh niêm phong hủy hũ lưu mẫu 24h $\rightarrow$ Mã băm SHA-256 đóng băng dữ liệu bất biến, bảo vệ trách nhiệm pháp lý cá nhân của Hiệu trưởng và Chủ doanh nghiệp bếp ăn.

### 1.5 Điểm Đấu Nối 5: API Connector Cho ERP/Kế Toán Doanh Nghiệp Đầu Tàu
- **Mục tiêu:** Không thay thế (Not Replace), mà làm giàu (Enrich) hệ thống ERP hiện có (Bravo, Misa, SAP, Fast).
- **Cơ chế kỹ thuật:**
  - GoTRACE cung cấp Webhook và REST API chuẩn OpenAPI 3.0.
  - Khi kế toán nhà máy xuất hóa đơn GTGT hoặc lập Lệnh xuất kho thành phẩm trên phần mềm Bravo/Misa $\rightarrow$ Webhook kích hoạt GoTRACE tự động lấy danh sách `LOT IDs`, ngày sản xuất, hạn sử dụng và cấp phát mã số chứng thư điện tử kèm tem QR xuất xưởng mà nhân viên không phải nhập lại lần hai.

---

## TRỤ CỘT 2: KHẾ ƯỚC DỮ LIỆU CHUẨN HÓA (COMMON DATA CONTRACT & GCI SYNTAX)

Để dòng dữ liệu từ hiện trường của PMO miền Tây không biến thành "dữ liệu rác" phân mảnh, toàn bộ thông tin thu thập được bắt buộc phải ánh xạ vào **9 Core Primitives** thông qua cú pháp định danh duy nhất toàn cầu **GCI (Global Chain Identifier)**.

### 2.1 Cú Pháp Chuẩn GCI Tại Miền Tây
Mọi thực thể thực địa do PMO quản lý đều mang định danh phân giải phân cấp:

$$\textbf{GCI} := \text{VN} \cdot \langle\text{Mã tỉnh}\rangle \cdot \langle\text{Loại Primitive}\rangle \cdot \langle\text{Mã Định danh}\rangle \cdot \langle\text{Phân đoạn Phụ}\rangle$$

*Ví dụ thực tế tại địa bàn Tây Nam Bộ:*
- **Mã Vùng Trồng Xoài Cát Chu Mỹ Xương (Place):**  
  `VN.DT.PLACE.ORCHARD.MSVT-0881`
- **Mã Hợp Tác Xã Nông Nghiệp Thắng Lợi (Party):**  
  `VN.DT.PARTY.COOP.HTX-THANGLOI`
- **Mã Lô Lúa Ướt Thu Hoạch Tại Ruộng (Lot):**  
  `VN.DT.LOT.HARVEST.20261115-OM5451-L01`
- **Mã Phiếu Cân Xe Tải Điện Tử Nhà Máy (Evidence):**  
  `VN.CT.EVIDENCE.WEIGHT_TICKET.TK-99281`
- **Mã Chứng Thư Test Dư Lượng Cadmium Sầu Riêng GACC (Claim):**  
  `VN.TG.CLAIM.LAB_TEST.CADMIUM-PASS-8821`

### 2.2 Ma Trận Ánh Xạ Nghiệp Vụ Hiện Trường Vào 9 Core Primitives

```
┌─────────────────┬──────────────────────────────────┬─────────────────────────────────┐
│ CORE PRIMITIVE  │ DỮ LIỆU THỰC TẾ PMO THU NHẬP     │ CƠ CHẾ SINH BẰNG CHỨNG (EVIDENCE)│
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 1. PARTY        │ Nông hộ, HTX, Thương lái, Miller,│ Đính kèm CCCD, Mã số thuế,      │
│                 │ Packhouse, Doanh nghiệp Bếp ăn   │ Giấy ĐKKD, Chữ ký số Zalo       │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 2. PLACE        │ Tọa độ GIS thửa ruộng, Nhà kho,  │ File GeoJSON ranh giới thửa đất,│
│                 │ Trạm cân, Cơ sở đóng gói         │ Mã số vùng trồng Cục BVTV cấp   │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 3. ITEM         │ Giống lúa ST25, OM5451, Xoài Chu,│ Tiêu chuẩn TCVN, Mã HS Code,    │
│                 │ Sầu riêng Ri6, Suất ăn dinh dưỡng│ Quy cách đóng gói kỹ thuật      │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 4. LOT          │ Lô gặt lúa tươi, Mẻ sấy 50 tấn,  │ Mã vạch 1D/2D, Quy cách phân cấp│
│                 │ Lô xoài Grade A, Mẻ nấu 1.000 s/ă│ chất lượng (Độ Brix, Độ ẩm)     │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 5. EVENT        │ Thu hoạch, Cân xe, Sấy, Xay xát, │ Dấu thời gian bất biến UTC,     │
│                 │ Chiếu xạ, Đóng thùng, Nấu ăn     │ Mã định danh nhân viên thao tác │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 6. EVIDENCE     │ Phiếu cân điện tử, Kết quả Lab,  │ Hash SHA-256 bất biến, Ảnh chụp │
│                 │ Dữ liệu nhiệt độ reefer container│ Exif GPS, PDF ký số C-Level     │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 7. CLAIM        │ Chứng nhận VietGAP, Hạn ngạch MS,│ Ngày hiệu lực, Cơ quan cấp phép,│
│                 │ Chỉ tiêu giảm phát thải AWD 1Mha │ Thẩm định viên độc lập ký xác nhận│
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 8. VERIFICATION │ Kết quả đối soát Mass Balance,   │ Điểm tin cậy (Confidence Score),│
│                 │ Cảnh báo vi phạm Lệnh 280 GACC   │ Cảnh báo đỏ chặn xuất kho       │
├─────────────────┼──────────────────────────────────┼─────────────────────────────────┤
│ 9. TRANSACTION  │ Hợp đồng bao tiêu HTX, Lệnh xuất │ Mã số hợp đồng, Tỷ lệ hao hụt,  │
│                 │ bán gạo, Chuyển quyền sở hữu lô  │ Hóa đơn điện tử e-Invoice       │
└─────────────────┴──────────────────────────────────┴─────────────────────────────────┘
```

---

## TRỤ CỘT 3: VẬN HÀNH BỘ MÁY ĐỐI SOÁT & KIỂM SOÁT RỦI RO (DETERMINISTIC ENGINES)

Dữ liệu đấu nối vào GoTRACE không nhằm mục đích "lưu trữ thụ động" mà phải kích hoạt trực tiếp **3 Động Cơ Phân Tích Xác Thực (Deterministic Engines)**. Đây chính là vũ khí chiến lược để PMO miền Tây thuyết phục Ban Giám đốc các Doanh nghiệp Đầu tàu chi tiền.

### 3.1 Động Cơ 1: Mass Balance Reconciliation Engine (Ngành Lúa Gạo)
- **Nỗi đau khách hàng:** Thương lái hoặc quản đốc nhà máy lén lút pha trộn 30–40% gạo trắng rẻ tiền trôi nổi ngoài thị trường vào lô gạo thơm đặc sản (ST25, Jasmine 85) hoặc lúa đạt chuẩn phát thải thấp Đề án 1Mha để trục lợi chênh lệch giá.
- **Thuật toán đối soát tự động:**
  Hệ thống tính toán tỷ lệ thu hồi gạo thành phẩm thực tế dựa trên công thức cân bằng khối lượng có hiệu chỉnh độ ẩm tiêu chuẩn:
  
  $$\text{Tỷ lệ Thu hồi Chuẩn} = \frac{\sum \text{Khối lượng Gạo Thành phẩm}}{\sum \text{Khối lượng Lúa Khô Vào Xát}} \approx 65\% - 68\%$$
  
- **Cơ chế phản ứng:**
  - Nếu tỷ lệ thu hồi vượt ngưỡng **$> 70\%$**: Hệ thống lập tức phát cảnh báo đỏ `MASS_BALANCE_MISMATCH`.
  - Khóa quyền phát hành chứng thư xuất xứ số cho lô hàng, yêu cầu kiểm toán vật lý kho bãi.
  - Giúp Tổng Giám đốc nhà máy phát hiện ngay lập tức hành vi gian lận kho nội bộ mà hệ thống ERP thông thường không thể nhận biết.

### 3.2 Động Cơ 2: Fruit Risk Engine & Cửa Khẩu GACC (Ngành Trái Cây)
- **Nỗi đau khách hàng:** Tổng cục Hải quan Trung Quốc (GACC) áp dụng Lệnh 280, kiểm tra gắt gao tình trạng mượn mã số vùng trồng và tồn dư kim loại nặng Cadmium, phẩm màu Auramine O trên sầu riêng. Nếu bị phát hiện vi phạm, toàn bộ container bị tiêu hủy tại cửa khẩu Hữu Nghị/Tân Thanh, doanh nghiệp bị tước mã đóng gói.
- **10 Quy Tắc Kiểm Soát Tự Động (10 Fruit Risk Rules):**
  1. *Rule R01:* Cảnh báo trước 30 ngày khi MSVT hoặc MSCSĐG sắp hết hạn bảo chứng.
  2. *Rule R03 (Yield Quota Enforcer):* Giám sát sản lượng thu hoạch tích lũy theo từng hecta. Nếu 1 vùng trồng 10 ha đăng ký năng suất 15 tấn/ha/vụ mà doanh nghiệp đã thu gom đến 180 tấn $\rightarrow$ Tự động chặn cấp mã QR cho tấn thứ 181 (chống triệt để việc thương lái mua sầu riêng trôi nổi về gắn mác vùng trồng chuẩn).
  3. *Rule R06 (Lab Verification Check):* Khóa quy trình niêm phong container nếu chưa đính kèm phiếu kết quả xét nghiệm âm tính với Cadmium và Auramine O từ phòng kiểm nghiệm hợp chuẩn.
  4. *Rule R09 (Cold Chain Anomaly):* Kích hoạt cờ đỏ nếu dữ liệu nhiệt độ kho container lạnh vượt ngưỡng $> 4^\circ\text{C}$ kéo dài quá 180 phút trong quá trình vận chuyển đường bộ ra cửa khẩu phía Bắc.

### 3.3 Động Cơ 3: Incident Impact Engine $\le 60$ Giây (Ngành Bếp Ăn Thể Chế)
- **Nỗi đau khách hàng:** Khi xảy ra ngộ độc tập thể tại trường học hoặc khu công nghiệp, chủ cơ sở suất ăn và Ban Giám hiệu mất 2–4 ngày lục tìm hóa đơn giấy, không thể chứng minh nguồn gốc nguyên liệu trước cơ quan thanh tra, đối diện nguy cơ bị khởi tố hình sự.
- **Thuật toán quét ngược đồ thị:**
  - Nhập mã mẻ ăn nghi vấn (`Meal Batch ID`) vào hệ thống.
  - Trong vòng **$< 60$ giây**, đồ thị GoTRACE quét ngược toàn bộ phả hệ phân tán:
    - Định danh chính xác nhà cung cấp lô thịt, mẻ rau, lô gạo đã dùng cho mẻ nấu đó.
    - Trích xuất ảnh chụp mẫu lưu thực phẩm 24h và biên bản bàn giao nhiệt độ tiếp nhận.
    - **Khoanh vùng khẩn cấp:** Hệ thống lập tức liệt kê còn bao nhiêu kg nguyên liệu thuộc lô đó đang nằm trong kho mát/kho đông của các bếp ăn khác trong cùng hệ thống $\rightarrow$ Phát lệnh niêm phong khẩn cấp trước ca nấu buổi chiều, ngăn chặn sự cố lan rộng.

---

## TRỤ CỘT 4: MÔ HÌNH THƯƠNG MẠI HÓA DỮ LIỆU & ĐẠT MỤC TIÊU KINH DOANH

PMO miền Tây không phải là trung tâm chi phí (Cost Center) mà là **cỗ máy tạo dòng tiền (Revenue Generator)**. Bằng cách đấu nối dữ liệu thực địa vào GoTRACE, PMO khai mở **5 Tầng Doanh Thu Bổ Trợ Lẫn Nhau**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   MÔ HÌNH 5 TẦNG DOANH THU GOTRACE MEKONG                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ TẦNG 5: TÀI SẢN DỮ LIỆU & CARBON INTELLIGENCE                               │
│ • Bán gói dữ liệu MRV Đề án 1Mha phục vụ phát hành tín chỉ carbon ($20/tấn) │
│ • Báo cáo dữ liệu tuân thủ GACC, EUDR phục vụ thông quan luồng xanh         │
├─────────────────────────────────────────────────────────────────────────────┤
│ TẦNG 4: PHÍ GIAO DỊCH MẠNG LƯỚI (NETWORK TRANSACTION FEES)                 │
│ • 1.000 – 3.000 VNĐ / Verified Traceable LOT phát hành                      │
│ • 5.000 – 10.000 VNĐ / tấn nông sản được chứng thực dòng chảy dữ liệu       │
├─────────────────────────────────────────────────────────────────────────────┤
│ TẦNG 3: THUÊ BAO NỀN TẢNG ĐỊNH KỲ (PLATFORM SAAS ARR)                       │
│ • Enterprise License: 15 – 35 triệu VNĐ/tháng/Anchor Enterprise             │
│ • Packhouse / Kitchen License: 5 – 12 triệu VNĐ/tháng/cơ sở                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ TẦNG 2: TRIỂN KHAI THÍ ĐIỂM & ĐẤU NỐI KỸ THUẬT (PILOT SETUP & SOW)          │
│ • Lắp đặt IoT trạm cân, tích hợp API ERP, cấu hình 9 Primitives             │
│ • Phí trọn gói: 150 – 300 triệu VNĐ / hợp đồng thí điểm (Pilot SOW)        │
├─────────────────────────────────────────────────────────────────────────────┤
│ TẦNG 1: DỊCH VỤ CHẨN ĐOÁN DỮ LIỆU CHUỖI (SUPPLY CHAIN DATA DIAGNOSTIC)     │
│ • Gói tư vấn khảo sát hiện trường 2–4 tuần, bàn giao 12 sản phẩm báo cáo   │
│ • Phí thu ngay: 45 – 75 triệu VNĐ / gói (Hoàn lại nếu ký hợp đồng Pilot)    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Cơ Chế "Gói Chẩn Đoán Dữ Liệu" — Bước Đi Đột Phá Mở Phễu Bán Hàng
- Doanh nghiệp ĐBSCL rất dị ứng với việc nghe chào bán "hệ thống phần mềm tiền tỷ".
- PMO tiếp cận bằng câu hỏi Hook duy nhất: **"Mất bao lâu để doanh nghiệp truy vết xong 1 lô hàng khi bị đối tác ngoại chất vấn?"**
- Sau đó đề xuất **Gói Chẩn đoán Dữ liệu Chuỗi Cung ứng (Data Diagnostic)**:
  - Thời gian: 2 đến 3 tuần thực địa.
  - Chi phí: **45 – 75 triệu VNĐ** (Thu tiền mặt ngay).
  - Bàn giao 12 sản phẩm chuẩn hóa: Bản đồ dòng chảy dữ liệu, Báo cáo điểm mù thất thoát, Báo cáo rủi ro Lệnh 280 GACC/Cadmium, Kết quả chạy thử nghiệm truy vết 01 container thực tế.
  - **Cam kết hoàn tiền 100%:** Nếu sau chẩn đoán, doanh nghiệp quyết định ký hợp đồng triển khai phần mềm chính thức, toàn bộ phí chẩn đoán sẽ được trừ vào chi phí triển khai.
  - *Ý nghĩa kinh doanh:* Tạo dòng tiền mặt tức thì để nuôi bộ máy PMO, đồng thời biến GoTRACE thành "chuyên gia kiểm toán dữ liệu" thay vì "nhân viên tiếp thị phần mềm".

### 4.2 Lộ Trình Chuyển Đổi Hợp Đồng Lên ARR Dài Hạn
Sau khi hoàn thành Pilot thành công:
- Chuyển đổi sang hợp đồng thuê bao nền tảng định kỳ (Platform Subscription) kéo dài 1–3 năm.
- Mỗi Doanh nghiệp Đầu tàu đóng phí duy trì kết nối đồ thị dữ liệu 200 – 400 triệu VNĐ/năm.
- Với mục tiêu 10 Anchor trong Giai đoạn 2 và 35–50 Anchor trong Giai đoạn 3, nguồn thu ARR định kỳ sẽ đạt từ **4,5 tỷ đến trên 18 tỷ VNĐ/năm**, bảo đảm tỷ suất lợi nhuận ròng $>40\%$.

---

## TRỤ CỘT 5: KẾ HOẠCH TÁC CHIẾN 90 NGÀY CỦA PMO — BẢO TOÀN DÒNG TIỀN VÀ MỤC TIÊU MÙA VỤ

Để hiện thực hóa kế hoạch này, PMO miền Tây triển khai chiến dịch 90 ngày theo cơ chế **Đường Đua Song Song (Dual-Track)** kết hợp chặt chẽ với lịch mùa vụ nông nghiệp ĐBSCL:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 LỊCH TRÌNH TÁC CHIẾN ĐẤU NỐI DỮ LIỆU 90 NGÀY                │
├─────────────────────────────────────────────────────────────────────────────┤
│ THÁNG 1 (NGÀY 1 – 30): KÍCH HOẠT NHANH ĐƯỜNG ĐUA BẾP ĂN THỂ CHẾ (FAST-TRACK)│
│ • Thiết lập trạm PMO tại Cần Thơ & Sa Đéc (Đồng Tháp).                     │
│ • Chốt 01 Gói Chẩn đoán & Kiosk Tablet Bếp ăn KCN trong 7–10 ngày.          │
│ • Thu tiền mặt ngay 45–75M VNĐ $\rightarrow$ Đạt chỉ tiêu Cổng Kiểm soát Ngày 30. │
│ • Khảo sát 15 Anchor Lúa gạo & Trái cây (bắt đầu chu kỳ phê duyệt 4–6 tuần).│
├─────────────────────────────────────────────────────────────────────────────┤
│ THÁNG 2 (NGÀY 31 – 60): ĐẤU NỐI TRẠM CÂN IOT & CHẨN ĐOÁN LÚA THU ĐÔNG       │
│ • Ký kết Gói Chẩn đoán với 01 Anchor Lúa gạo lớn (Lộc Trời/Trung An/Cỏ May).│
│ • Lắp đặt thí điểm 01 IoT Serial Bridge tại trạm cân xe tải nhà máy.        │
│ • Chạy thực nghiệm Mass Balance trên lô lúa Thu Đông & kho lưu trữ hiện hữu.│
│ • Đạt Cổng Kiểm soát Ngày 60: Doanh thu thực thu tích lũy đạt $\ge 150M VNĐ$.│
├─────────────────────────────────────────────────────────────────────────────┤
│ THÁNG 3 (NGÀY 61 – 90): CHỚP CƠ HỘI SẦU RIÊNG NGHỊCH VỤ & CHUẨN BỊ ĐÔNG XUÂN│
│ • Kích hoạt pilot sớm trên vựa sầu riêng nghịch vụ cuối năm tại Cai Lậy/TG. │
│ • Onboard 10 HTX lúa gạo qua Zalo Mini App, số hóa sự kiện gieo sạ Đông Xuân│
│ • Ký kết Hợp đồng Triển khai Pilot chính thức (Anchor Pilot Contract).      │
│ • Đạt Cổng Kiểm soát Ngày 90: Doanh thu tích lũy đạt 200–350M VNĐ;           │
│   Kết nối $\ge 10$ HTX, vận hành $\ge 1.000$ LOTs thực địa.                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ HẬU 90 NGÀY (DAY 150 — THÁNG 3/2027): NGHIỆM THU TRỌN VẸN PHẢ HỆ ĐÔNG XUÂN   │
│ • Thu hoạch rộ lúa Đông Xuân $\rightarrow$ Đóng kín phả hệ hạt lúa từ ruộng đến cảng.│
│ • Đo đạc Trace Time Latency $< 30$ phút với Evidence Completeness $> 80\%$.  │
│ • Kích hoạt mở rộng sang chính vụ Trái cây 2027 (Xoài Cát Chu & Sầu riêng). │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## BỘ CHỈ SỐ ĐO LƯỜNG ĐỒNG THỜI KỸ THUẬT & KINH DOANH (TECH-COMMERCIAL CO-KPIS)

PMO miền Tây từ bỏ hoàn toàn việc đánh giá hiệu quả bằng các chỉ số ảo (như số cuộc gọi điện thoại, số buổi hội thảo đông người). Mọi nhân sự từ Trưởng PMO đến Field Agent được đánh giá trên bảng ma trận chỉ số kết hợp giữa **Độ Sạch của Dữ liệu** và **Dòng Tiền Thực Thu**:

| STT | Chỉ Số Đo Lường (Co-KPIs) | Ý Nghĩa Kỹ Thuật (Data Integrity) | Tác Động Kinh Doanh (Commercial Impact) | Mục Tiêu 90 Ngày |
|:---:|:---|:---|:---|:---:|
| **1** | **Trace Time Latency** | Thời gian truy vết ngược từ mã tem thành phẩm về đến tận mảnh vườn/thửa ruộng. | Giúp khách hàng vượt qua các cuộc thanh tra đột xuất của GACC/Sở Y tế trong phút chốc. | **$< 30$ phút** (Mục tiêu dài hạn: $<5$s) |
| **2** | **Evidence Completeness** | Tỷ lệ các sự kiện `EVENT` có gắn kèm bằng chứng số `EVIDENCE` hợp lệ (Phiếu cân, kết quả test lab, ảnh GPS). | Bảo đảm dữ liệu có giá trị pháp lý, không bị chối bỏ (Audit-ready). | **$> 80\%$** tổng số sự kiện |
| **3** | **Automated Ingestion Ratio** | Tỷ lệ dữ liệu thu nhận tự động qua IoT trạm cân, máy quét và API so với nhập tay. | Giảm chi phí vận hành nhập liệu, loại trừ 100% sai sót và gian lận do con người. | **$> 60\%$** tổng dung lượng dữ liệu |
| **4** | **Diagnostic-to-Pilot Conversion** | Tỷ lệ Doanh nghiệp Đầu tàu chuyển đổi từ Gói Chẩn đoán sang Hợp đồng Triển khai dài hạn. | Chứng minh giá trị kinh tế mà GoTRACE mang lại đủ lớn để khách hàng quyết định đầu tư lớn. | **$\ge 40\%$** |
| **5** | **Net Cash Collected** | Tổng dòng tiền mặt thực tế thu về từ các dịch vụ dữ liệu và thuê bao phần mềm. | Bảo toàn ngân sách dự án, giúp bộ máy PMO miền Tây tự chủ tài chính vững vàng. | **200 – 350 Triệu VNĐ** |

---

## KẾT LUẬN & KIẾN NGHỊ TRÌNH HỘI ĐỒNG QUẢN TRỊ

1. **Khẳng định tính đúng đắn của mô hình:** Đấu nối PMO miền Tây vào hệ thống dữ liệu GoTRACE không phải là công việc kỹ thuật đơn thuần, mà là **chiến lược thâm nhập thị trường thông minh nhất**. Dữ liệu chứng thực là công cụ bán hàng mạnh nhất để chinh phục các Tổng Giám đốc doanh nghiệp nông nghiệp lớn tại ĐBSCL.
2. **Hành động ngay lập tức:**
   - Phê duyệt chính thức ngân sách Giai đoạn 1 (**568 triệu VNĐ**) theo [07_Decision_Package_BOD.md](./07_Decision_Package_BOD.md).
   - Cho phép xuất quân đội ngũ 6 FTEs cắm chốt tại Sa Đéc, Cao Lãnh và Cần Thơ từ Tuần 1 Tháng 10/2026.
   - Trang bị ngay 02 bộ thiết bị thử nghiệm IoT Weighbridge Serial Bridge và 05 bộ Kiosk Tablet Bếp ăn để triển khai thực địa ngay trong 30 ngày đầu tiên.

---

### Tài liệu Liên kết trong Hệ thống GOTRACE:
- [00_MASTER_INDEX.md](../../docs/00_MASTER_INDEX.md) — Mục lục Tổng thể & Sơ đồ Điều hướng Toàn bộ Tài liệu.
- [02_Platform_Object_Implementation_Blueprint.md](../../docs/02_Platform_Object_Implementation_Blueprint.md) — Đặc tả Kỹ thuật 9 Core Primitives và Cú pháp GCI.
- [03_Roadmap_3_Phases.md](./03_Roadmap_3_Phases.md) — Lộ trình Triển khai 3 Giai đoạn và Cổng Kiểm soát Stage-Gate.
- [04_GTM_Anchor_Model.md](./04_GTM_Anchor_Model.md) — Chiến lược Tiếp cận Khách hàng Đầu tàu và 3 Ngành hàng Trọng điểm.
- [05_PMO_Organization.md](./05_PMO_Organization.md) — Cơ cấu Tổ chức, Ma trận RACI và Định biên Nhân sự PMO.
- [07_Decision_Package_BOD.md](./07_Decision_Package_BOD.md) — Gói Quyết định Đầu tư Trình Hội đồng Quản trị.
