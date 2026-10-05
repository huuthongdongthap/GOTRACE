# 06_PMO MASTER EXECUTION PLAN — GOTRACE MEKONG
## Bản Kế Hoạch Vận Hành PMO Master Toàn Diện: Khung Chiến Lược 44 Chương & Kế Hoạch Tác Chiến Thực Địa 90 Ngày ĐBSCL

---

**Mã tài liệu:** `GT-DOC-06-PMO`  
**Thuộc bộ tài liệu:** [GOTRACE Mekong Strategy & Execution System 2026–2028](./00_MASTER_INDEX.md)  
**Phiên bản:** 2.0 Master Consolidated (Hợp nhất toàn diện)  
**Ngày ban hành:** 25/09/2026  
**Thẩm quyền ban hành:** Founder & Hội đồng Quản trị GOTRACE  
**Chủ quản điều hành:** PMO Lead Mekong (Cần Thơ — Đồng Tháp — An Giang)  
**Phạm vi áp dụng:** Toàn bộ nhân sự PMO, Business Development (BD), Kỹ thuật (Tech/Product), Triển khai thực địa (Field Ops) và các đối tác liên kết tại vùng Đồng bằng sông Cửu Long (ĐBSCL).

---

> [!IMPORTANT]
> ### TUYÊN NGÔN VẬN HÀNH TỐI THƯỢNG (OPERATING MANDATE)
> GOTRACE không phải là công ty phần mềm làm gia công theo yêu cầu (Custom Dev Shop), không phải là nhà cung cấp giải pháp ERP nông nghiệp chung chung, và tuyệt đối **không bán tem nhãn truy xuất QR người tiêu dùng**.
> 
> GOTRACE định vị là **Nền tảng Hạ tầng Dữ liệu Chuỗi Cung ứng & Kích hoạt Mạng lưới (Supply Chain Data Infrastructure + Network Enablement)**. Sứ mệnh duy nhất của chúng tôi tại ĐBSCL là xây dựng và kiểm chứng **Đồ Thị Dữ Liệu Chuỗi Cung Ứng (GOTRACE Supply Chain Data Graph)** thông qua 3 kiến trúc tham chiếu phả hệ:
> 1. **LÚA GẠO (Rice)**: Chứng minh tính Tuyến tính (Linear Genealogy) & Cân bằng Khối lượng (Mass Balance) ở quy mô hàng triệu tấn.
> 2. **TRÁI CÂY (Fruit)**: Chứng minh tính Phân nhánh (Branching Genealogy), Chuỗi lạnh IoT & Kiểm dịch xuất khẩu (GACC/MSVT).
> 3. **BẾP ĂN CÔNG NGHIỆP (Kitchen)**: Chứng minh tính Hội tụ (Converging Genealogy), Định mức thực đơn & Khoanh vùng sự cố vi sinh dưới 60 giây.

---

## MỞ ĐẦU & TUYÊN NGÔN CHIẾN LƯỢC

### 1. Tuyên Ngôn Nhà Sáng Lập (Founder Pitch)
> *"GOTRACE không chỉ số hóa truy xuất nguồn gốc. GOTRACE xây lớp dữ liệu vận hành cho chuỗi cung ứng thực phẩm — kết nối identity, lot, event, evidence, quality, transformation và movement thành một Supply Chain Data Graph.*
> 
> *Rice chứng minh scale. Fruit chứng minh complexity. Kitchen chứng minh downstream food-safety value.*
> 
> *Từ một pilot thực, GOTRACE có thể mở rộng từ một doanh nghiệp → mạng lưới nhà cung cấp → nhiều sản phẩm → nhiều thị trường."*

### 2. Kịch Bản Chào Hàng Thực Chiến (Sales Pitch)
> *"Cho chúng tôi một lô hàng thật. Chúng tôi sẽ cùng anh/chị dựng lại toàn bộ đường đi của lô đó — từ nguồn nguyên liệu, các lần chuyển giao và xử lý, đến bằng chứng chất lượng và nơi hàng đi đến. Sau đó chúng ta xác định phần nào đang mất thời gian, mất dữ liệu hoặc không thể chứng minh.*
> 
> *Nếu GOTRACE giải quyết được pain đó bằng một pilot đo được kết quả, chúng ta mới mở rộng."*

### 3. Ba Quy Tắc Vàng PMO (The 3 Golden Rules)
```text
┌────────────────────────────────────────────────────────────────────────┐
│                        3 QUY TẮC VÀNG BẤT BIẾN                         │
├────────────────────────────────────────────────────────────────────────┤
│  1. KHÔNG SCALE CÁI CHƯA ĐƯỢC VERIFY.                                  │
│  2. KHÔNG PRODUCTIZE CÁI CHƯA ĐƯỢC CUSTOMER VALIDATE.                  │
│  3. KHÔNG BÁN CÁI DELIVERY CHƯA CHỨNG MINH ĐƯỢC.                       │
└────────────────────────────────────────────────────────────────────────┘
```

### 4. Ba Ưu Tiên Cứng Thực Địa ĐBSCL (Field Core Priorities)
1. **ANCHOR FIRST — Không scale trước khi có Anchor đã ký:** Mọi hoạt động khảo sát, thăm hỏi HTX và di chuyển thực địa đều phải tập trung tối đa phục vụ mục tiêu ký kết hợp đồng với Doanh nghiệp Đầu tàu (Anchor Enterprise).
2. **DATA INTEGRITY — Không có dữ liệu còn tốt hơn dữ liệu rác:** Thà triển khai một pilot quy mô nhỏ nhưng dữ liệu sạch, có bằng chứng đối soát sổ sách thực tế, còn hơn chạy pilot hoành tráng nhưng số liệu ảo.
3. **PROVE VALUE TRƯỚC KHI EXPAND — Pilot phải có Business Case cụ thể:** Tuyệt đối không mở phân hệ ngành mới (Vertical) trước khi phân hệ đầu tiên phát sinh tín hiệu doanh thu (Revenue Signal) và đo lường được hiệu quả kinh tế rõ ràng.

---

# PHẦN I: NỀN TẢNG CHIẾN LƯỢC & KIẾN TRÚC HỆ THỐNG
*(Kế thừa & Chuẩn hóa từ Chương 1 đến Chương 12 của Kế hoạch Chiến lược PMO)*

---

## CHƯƠNG 1: SỨ MỆNH & CHU TRÌNH THƯƠNG MẠI 7 NẤC (MISSION & COMMERCIAL LOOP)

Sứ mệnh cốt lõi của chương trình GOTRACE Mekong là hiện thực hóa và thương mại hóa thành công **Lớp Đồ thị Dữ liệu Chuỗi Cung ứng (Supply Chain Data Graph)**. Để đạt được mục tiêu này, PMO thiết lập chu trình thương mại khép kín gồm 7 bước nghiêm ngặt:

```text
  [1. Research] Nghiên cứu thị trường, pháp lý, đối thủ, chuỗi giá trị ĐBSCL
        ↓
  [2. Discovery] Khám phá tài khoản mục tiêu, tiếp cận người ra quyết định
        ↓
  [3. Diagnostic] Bán gói chẩn đoán hiện trạng dữ liệu chuỗi có thu phí (30-50M)
        ↓
  [4. Pilot] Khởi động pilot thực địa trên 1 lô hàng thật của Anchor (50-100M)
        ↓
  [5. Proof] Đo lường chỉ số cải thiện thực tế (Trace Time, Mass Balance, ROI)
        ↓
  [6. Paid Deployment] Chuyển đổi thành hợp đồng SaaS Enterprise nhiều năm
        ↓
  [7. Network Expansion] Kéo toàn bộ mạng lưới HTX, nhà cung ứng vệ tinh vào Data Graph
```

PMO chịu trách nhiệm kiểm soát tốc độ luân chuyển của chu trình này, đảm bảo không có tài khoản nào nhảy cóc từ Discovery sang Paid Deployment mà bỏ qua khâu kiểm chứng bằng chứng thực tế tại bước Diagnostic và Pilot.

---

## CHƯƠNG 2: ĐỊNH VỊ CHIẾN LƯỢC & KHOẢNG TRỐNG TRUY XUẤT CÔNG (STRATEGIC POSITION)

### 2.1 Ma Trận Định Vị: "Không Làm Gì" vs "Tập Trung Vào Cái Gì"

```text
  NHỮNG THỨ GOTRACE TUYỆT ĐỐI KHÔNG LÀM:
  ├── Không in tem mã QR tĩnh dán lên bao bì cho người tiêu dùng quét giải trí
  ├── Không quảng bá công nghệ Blockchain chung chung không giải quyết bài toán nghiệp vụ
  ├── Không cạnh tranh tính năng quét mã đại trà (Consumer scanning app)
  ├── Không xây dựng hệ thống ERP cồng kềnh thay thế hệ thống kế toán doanh nghiệp
  └── Không viết phần mềm quản lý nông trại (Farm management) đại trà thiếu liên kết chuỗi

  GIÁ TRỊ CỐT LÕI GOTRACE TẬP TRUNG XÂY DỰNG:
  ├── Supply Chain Data: Dữ liệu vận hành B2B xuyên suốt các mắt xích
  ├── Evidence: Bằng chứng cấp độ L1 (Self-reported), L2 (Verified doc), L3 (IoT/Third-party)
  ├── Genealogy: Phả hệ lô hàng ngược (Reverse) và xuôi (Forward) không đứt gãy
  ├── Reconciliation: Đối soát cân bằng khối lượng vật chất (Mass Balance)
  ├── Risk Engine: Động cơ cảnh báo sớm gian lận, nhiễm chéo và trễ hạn kiểm định
  └── B2B Sharing: Khả năng chia sẻ dữ liệu có kiểm soát giữa các đối tác thương mại
```

### 2.2 Tận Dụng Bối Cảnh Hạ Tầng Truy Xuất Công (Public Traceability Infrastructure)
Tính đến tháng 06/2026, Cổng thông tin truy xuất nguồn gốc sản phẩm nông nghiệp quốc gia của Bộ Nông nghiệp & PTNT đã kết nối 26 tỉnh, thành phố với hơn 18.500 sản phẩm. Thay vì đối đầu hay sao chép hệ thống nhà nước, GOTRACE định vị là **hạ tầng dữ liệu vận hành tư nhân (Private Operational Data Layer)**:
- Hệ thống nhà nước quản lý ở cấp độ chứng nhận vĩ mô, mã định danh cơ sở và sản phẩm lưu thông.
- GOTRACE xử lý khoảng trống dữ liệu nghiệp vụ vi mô bên trong doanh nghiệp: kiểm soát biến động độ ẩm khi sấy lúa, đối soát tỷ lệ thu hồi gạo, giám sát chuỗi lạnh container xuất khẩu, và quản lý mẫu lưu thực phẩm 24 giờ.
- GOTRACE sẵn sàng đẩy dữ liệu tóm tắt lên cổng quốc gia thông qua API chuẩn hóa khi cơ quan quản lý yêu cầu.

---

## CHƯƠNG 3: KIẾN TRÚC CHƯƠNG TRÌNH ĐIỀU HÀNH (PROGRAM ARCHITECTURE)

Hệ thống điều hành GOTRACE được thiết lập theo cấu trúc ma trận tập trung, trong đó PMO giữ vai trò trung tâm điều phối sự liên kết giữa các bộ phận chức năng:

```text
                         FOUNDER / CEO GOTRACE
                                   │
                           Chiến lược / Vốn
                                   │
                                PMO LEAD
                      (Làm chủ tính nhất quán liên luồng)
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ↓                         ↓                         ↓
   PRODUCT TEAM                SALES TEAM              DELIVERY TEAM
 (Data Graph/Specs)         (Pipeline/Anchor)        (Field Ops/HTX)
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   ↓
                       SUPPLY CHAIN DATA GRAPH
                                   │
              ┌────────────────────┼────────────────────┐
              ↓                    ↓                    ↓
         RICE PILOT           FRUIT PILOT         KITCHEN PILOT
      (Linear Topology)   (Branching Topology)  (Converging Topology)
```

PMO sở hữu **Tính nhất quán liên luồng công việc (Cross-workstream coherence)**: Mọi cam kết mà bộ phận Sales đưa ra với khách hàng phải được Product xác nhận khả thi trên mô hình dữ liệu, và Delivery phải có quy trình kiểm chứng thực địa đo lường được.

---

## CHƯƠNG 4: TRÁCH NHIỆM CỐT LÕI CỦA PMO (PMO RESPONSIBILITIES)

PMO không phải là một tầng trung gian hành chính chỉ biết tổng hợp báo cáo và vẽ biểu đồ tiến độ. PMO được trao quyền kiểm soát toàn diện 11 lĩnh vực:

| STT | Lĩnh Vực Quản Trị | Trách Nhiệm Cụ Thể Của PMO |
|:---:|:---|:---|
| 1 | **Strategy (Chiến lược)** | Bảo vệ luận điểm cốt lõi của GOTRACE, ngăn chặn việc chệch hướng sang làm dự án gia công phần mềm. |
| 2 | **Scope (Phạm vi)** | Đóng băng phạm vi từng pilot; kiên quyết loại bỏ các yêu cầu phát sinh (feature creep) ngoài core graph. |
| 3 | **Research (Nghiên cứu)** | Đảm bảo mọi phân tích thị trường đều có bằng chứng số liệu ĐBSCL, gắn thẻ thông tin minh bạch. |
| 4 | **Pipeline (Đường ống bán hàng)** | Giám sát chất lượng phễu B2B, không cho phép đưa lead rác vào danh sách đánh giá Qualified. |
| 5 | **Pilot (Thực địa thí điểm)** | Quản lý tiến độ triển khai thực tế trên từng lô hàng, đảm bảo đạt tiêu chí Proof trước khi mở rộng. |
| 6 | **Data Model (Mô hình dữ liệu)** | Phối hợp Tech Lead chuẩn hóa schema 12 đối tượng cốt lõi, bảo đảm tính tái sử dụng trên 80%. |
| 7 | **Delivery (Giao hàng thực tế)** | Theo dõi sát sao việc cài đặt, hướng dẫn HTX nhập liệu qua Zalo và kiểm tra đối soát chéo sổ tay. |
| 8 | **Evidence (Kho bằng chứng)** | Quản lý kho bằng chứng nghiệm thu (L1-L3), đảm bảo mọi cột mốc đều có bằng chứng số thực tế. |
| 9 | **Risks (Quản trị rủi ro)** | Chủ động phát hiện rủi ro sớm qua hệ thống RAG, kích hoạt ngay quy trình xử lý khẩn cấp khi có dấu hiệu trễ hạn. |
| 10 | **Metrics (Hệ thống chỉ số)** | Đo lường chính xác các KPI nghiệp vụ cốt lõi (đặc biệt là Flagship Trace Time Before vs After). |
| 11 | **Decision Log (Nhật ký quyết định)** | Lưu trữ toàn bộ các quyết định chiến lược và kỹ thuật dưới dạng văn bản YAML có cấu trúc. |

---

## CHƯƠNG 5: PHÂN CÔNG 8 LUỒNG CÔNG VIỆC CHUYÊN BIỆT (WORKSTREAMS WS01 – WS08)

Toàn bộ hoạt động của dự án GOTRACE Mekong được tổ chức thành 8 luồng công việc chuyên biệt với danh mục đầu ra (Deliverables) cụ thể:

```text
  WS01 — Market Intelligence (Nghiên cứu thị trường & Pháp lý):
         ├── Bản đồ thị trường 13 tỉnh ĐBSCL & Cơ cấu sản xuất lúa, trái cây
         ├── Bản đồ hệ số tác nhân chuỗi (Nông dân, Thương lái, HTX, Nhà máy, Cảng)
         ├── Bản đồ pháp lý động (Thông tư 11, EUDR, Lệnh 248/249 GACC, Mã số vùng trồng)
         └── Bản đồ phân tích đối thủ cạnh tranh & Cơ hội thị trường ngách

  WS02 — Product Architecture (Kiến trúc sản phẩm & Mô hình dữ liệu):
         ├── Khung Đồ thị Dữ liệu Cốt lõi (Core Data Graph v0.1)
         ├── Mô hình 12 Đối tượng Chuỗi Cung ứng Chung (Common Object Model)
         ├── Mô hình Sự kiện (Canonical Event Model) & Bộ quy tắc kiểm soát nghiệp vụ
         ├── Mô hình Bằng chứng (Evidence Model L1–L3) & Cấu trúc gói truy vết (Trace Package)
         └── Kiến trúc API Gateway, cơ chế bảo mật và phân quyền truy cập đa đối tác

  WS03 — Rice Workstream (Kiến trúc chuỗi lúa gạo):
         ├── Kiến trúc tham chiếu lúa gạo tuyến tính (Rice Reference Architecture)
         ├── Mô hình cân bằng khối lượng (Mass Balance) & Thuật toán chống gian lận pha trộn
         └── Bộ dữ liệu tuân thủ canh tác phát thải thấp (MRV) phục vụ Đề án 1Mha lúa ĐBSCL

  WS04 — Fruit Workstream (Kiến trúc chuỗi trái cây):
         ├── Kiến trúc tham chiếu trái cây phân nhánh (Fruit Reference Architecture)
         ├── Cơ chế quản lý Mã số vùng trồng (MSVT) & Cơ sở đóng gói (MSCSĐG)
         └── Mô hình giám sát chuỗi lạnh IoT (Cold Chain) & Hồ sơ kiểm dịch thực vật xuất khẩu

  WS05 — Kitchen Workstream (Kiến trúc chuỗi bếp ăn công nghiệp):
         ├── Kiến trúc tham chiếu bếp ăn hội tụ (Kitchen Reference Architecture)
         ├── Mô hình đối soát Định mức thực đơn (Recipe vs Actual Consumption)
         └── Động cơ quét đồ thị khoanh vùng sự cố an toàn thực phẩm trong thời gian ≤ 60 giây

  WS06 — Sales & Business Development (Kinh doanh & Phát triển khách hàng):
         ├── Hồ sơ chân dung khách hàng lý tưởng (ICP) & Ma trận chấm điểm NVS
         ├── Vũ trụ 100 tài khoản mục tiêu (Target Account Universe) tại ĐBSCL
         ├── Kịch bản tiếp cận khách hàng thực chiến (Sales Discovery Playbook)
         └── Bộ tài liệu chào bán gói Chẩn đoán (Diagnostic Offer) & Hợp đồng thí điểm (Pilot SOW)

  WS07 — Field Delivery & Customer Success (Triển khai thực địa & HTX):
         ├── Quy trình tiếp nhận dữ liệu và hướng dẫn HTX sử dụng Zalo Bot / Biểu mẫu Web
         ├── Kịch bản kiểm tra đối soát thực tế 10% sổ sách (Spot-check accuracy)
         ├── Bộ tài liệu đào tạo hiện trường dành cho nông dân và nhân viên vận hành kho
         └── Hồ sơ thu thập dữ liệu chỉ số ban đầu (Baseline KPI) và nghiệm thu kết quả

  WS08 — PMO & Governance (Quản trị chương trình & Điều hành):
         ├── Sổ đăng ký quyết định chiến lược định dạng YAML (YAML Decision Log)
         ├── Sổ theo dõi rủi ro hợp nhất & Giao thức xử lý khẩn cấp (Escalation Protocol)
         ├── Bảng chỉ số điều hành thời gian thực (Executive, Sales, Delivery Dashboard)
         └── Kho lưu trữ 16 tài liệu PMO chính thức (Artifact Repository)
```

---

## CHƯƠNG 6: CĂN CHỈNH CHIẾN LƯỢC & ĐỊNH NGHĨA THÀNH CÔNG 90 NGÀY (ALIGNMENT & SUCCESS CRITERIA)

### 6.1 Giai Đoạn 0 (Phase 0 — Align): Cổng Phê Duyệt Của Founder
Trước khi triển khai ra thực địa, PMO và Founder phải ký biên bản đóng băng 5 câu hỏi căn chỉnh chiến lược (The 5 Alignment Questions):
1. **WHO (Ai là khách hàng mục tiêu?):** Doanh nghiệp chế biến/xuất khẩu gạo, đóng gói trái cây hoặc chuỗi suất ăn công nghiệp quy mô vừa và lớn tại ĐBSCL có vùng liên kết HTX.
2. **PROBLEM (Vấn đề nhức nhối là gì?):** Mất từ 3–7 ngày để truy vết hồ sơ 1 lô hàng khi bị đối tác ngoại chất vấn hoặc khi có sự cố chất lượng; tỷ lệ hao hụt và pha trộn không kiểm soát được.
3. **WEDGE (Mũi nhọn thâm nhập là gì?):** Bắt đầu bằng gói Chẩn đoán Dữ liệu Chuỗi Cung ứng (Diagnostic) thu phí 30–50 triệu VND trên đúng 1 lô hàng thực tế.
4. **PRODUCT (Sản phẩm cung cấp là gì?):** Không bán phần mềm đóng gói sẵn; cung cấp lớp dữ liệu kết nối (Data Graph) kèm báo cáo phân tích khoảng trống và bảng điều khiển chỉ số.
5. **PROOF (Bằng chứng thành công là gì?):** Thời gian truy xuất 1 lô hàng giảm từ 3–7 ngày xuống dưới 30 phút; đối soát cân bằng khối lượng sai số dưới 1%; khách hàng ký xác nhận nghiệm thu.

### 6.2 Khung Định Nghĩa Thành Công 90 Ngày Tại ĐBSCL (90-Day Success Criteria)

```text
┌────────────────────────────────────────────────────────────────────────┐
│               KHUNG CHỈ TIÊU THÀNH CÔNG 90 NGÀY THỰC CHIẾN             │
├────────────────────────────────────────────────────────────────────────┤
│  MUST HAVE (Bắt buộc đạt — Không đạt = DỪNG DỰ ÁN & Đánh giá lại):     │
│  ├── ✅ Ký kết tối thiểu ≥ 1 Hợp đồng Doanh nghiệp Đầu tàu (Anchor)    │
│  ├── ✅ Pilot vận hành trên dữ liệu thực: ≥ 1 LOT được trace đầy đủ    │
│  └── ✅ Tối thiểu 1 chỉ số KPI cải thiện đo lường được so với baseline│
│                                                                        │
│  SHOULD HAVE (Mục tiêu phấn đấu cao):                                  │
│  ├── 🎯 Ký kết ≥ 2 Hợp đồng Anchor (Ưu tiên kết hợp: Lúa gạo + Bếp ăn) │
│  ├── 🎯 ≥ 5 HTX / Nhà cung ứng vệ tinh onboarded và nhập liệu đều đặn  │
│  └── 🎯 Đóng gói hoàn chỉnh 1 bản Business Case chứng thực số liệu thực│
│                                                                        │
│  NICE TO HAVE (Kỳ vọng đột phá mở rộng):                               │
│  ├── 💡 Có 1 lời mời hợp tác tự nhiên (Inbound) từ Anchor ngoài danh mục│
│  ├── 💡 Nhận được 1 lời giới thiệu (Referral) từ chính Anchor đang chạy│
│  └── 💡 Ký Biên bản ghi nhớ (MOU) với Sở NN&PTNT hoặc UBND tỉnh        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## CHƯƠNG 7: NGHIÊN CỨU HIỆN TRƯỜNG & QUY TẮC GẮN THẺ THÔNG TIN (PHASE 1 RESEARCH & TAGGING)

### 7.1 Phạm Vi Nghiên Cứu Thực Địa (2 – 4 Tuần Đầu)
Đội ngũ PMO và Field Ops khảo sát chuyên sâu tại 3 tỉnh trọng điểm ĐBSCL (Đồng Tháp, Cần Thơ, An Giang) tập trung vào 7 khía cạnh:
1. Thị trường: Cơ cấu sản xuất lúa (Đồng Tháp 530.677 ha), diện tích cây ăn trái và hệ thống bếp ăn KCN.
2. Quy định pháp lý: Thông tư 11/2026/TT-BCT, Lệnh 248/249 GACC, tiêu chuẩn kiểm dịch thực vật của Mỹ/Hàn/Úc.
3. Hạ tầng công: Khảo sát thực tế các HTX đang dùng phần mềm gì của tỉnh hoặc Bộ NN&PTNT.
4. Đối thủ cạnh tranh: Các công ty bán tem QR (iCheck, SmartLife...) và các hệ thống ERP nội địa.
5. Tác nhân chuỗi: Thói quen ghi chép sổ sách của nông dân, thương lái ghe cào, trạm cân, nhà máy sấy.
6. Nhu cầu người mua: Yêu cầu của các nhà nhập khẩu EU, Mỹ, Nhật Bản về hồ sơ giải trình chuỗi.
7. Phần mềm hiện hữu: Mức độ ứng dụng Excel, Zalo, phần mềm kế toán (MISA, FAST) tại các nhà máy chế biến.

### 7.2 Quy Tắc Bắt Buộc Gắn Thẻ Thông Tin (Information Tagging Rule)
Mọi phát biểu, nhận định đưa vào tài liệu chiến lược và báo cáo PMO bắt buộc phải gắn 1 trong 4 nhãn:
- `[FACT]`: Sự thật hiển nhiên đã được kiểm chứng bằng số liệu văn bản nhà nước hoặc hợp đồng thực tế.
- `[ASSUMPTION]`: Giả định chiến lược cần phải được kiểm chứng qua các cuộc gặp Discovery hoặc Pilot.
- `[UNKNOWN]`: Khoảng trống thông tin chưa có lời giải, cần ưu tiên điều tra thực địa.
- `[DECISION]`: Quyết định điều hành chính thức đã được phê duyệt và ghi nhận vào Decision Log.

---

## CHƯƠNG 8: KHÁM PHÁ KHÁCH HÀNG & VŨ TRỤ TÀI KHOẢN 12 THUỘC TÍNH (ACCOUNT UNIVERSE)

Xây dựng kho dữ liệu vũ trụ tài khoản mục tiêu (Target Account Universe) cho 3 ngành Lúa gạo, Trái cây, Bếp ăn. Đối với mỗi tài khoản trong danh sách 100 Anchor tiềm năng tại ĐBSCL, đội ngũ BD bắt buộc phải thu thập và điền đủ 12 thuộc tính:

```text
┌────────────────────────────────────────────────────────────────────────┐
│           12 THUỘC TÍNH BẮT BUỘC CỦA MỘT TÀI KHOẢN MỤC TIÊU (ICP)      │
├────────────────────────────────────────────────────────────────────────┤
│  1. Organization (Tên doanh nghiệp, mã số thuế, loại hình sở hữu)      │
│  2. Location (Trụ sở chính, vị trí nhà máy, kho bãi, vùng nguyên liệu) │
│  3. Network (Số lượng HTX liên kết, số hộ nông dân, đội ghe vận chuyển)│
│  4. Volume (Sản lượng thu mua, chế biến, xuất khẩu hàng năm)           │
│  5. Product (Chủng loại sản phẩm: Lúa ST25, Jasmine, Xoài Cát Chu...) │
│  6. Market (Thị trường tiêu thụ: Xuất khẩu EU/Mỹ/Trung Quốc hay nội địa)│
│  7. Existing System (Phần mềm đang dùng: Sổ tay, Excel, MISA, SAP...)  │
│  8. Operational Pain (Nỗi đau cụ thể: Trộn giống, gian lận cân, trễ trace)│
│  9. Decision Maker (Họ tên, chức vụ, Zalo của Economic Buyer/Chủ DN)   │
│  10. Data Owner (Người nắm giữ dữ liệu: Trưởng phòng KCS, Trưởng kho)  │
│  11. Network Owner (Người quản lý liên kết HTX: Trưởng phòng Thu mua)  │
│  12. Budget Hypothesis (Khả năng chi trả: Ngân sách CNTT hàng năm)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## CHƯƠNG 9: PHỄU BÁN HÀNG B2B 9 TẦNG (SALES FUNNEL ARCHITECTURE)

Quy trình chuyển đổi khách hàng của GOTRACE tại ĐBSCL được vận hành qua phễu 9 tầng nghiêm ngặt:

```text
  [1. TARGET]        Vũ trụ 100 tài khoản tiềm năng tại ĐBSCL
        ↓
  [2. CONTACT]       Tiếp cận qua điện thoại, giới thiệu quen biết, kết nối Zalo
        ↓
  [3. DISCOVERY]     Cuộc gặp trực tiếp tại nhà máy/văn phòng khách hàng
        ↓
  [4. QUALIFIED]     Thẩm định đạt đủ 6 tiêu chuẩn cứng của Cổng Discovery Gate
        ↓
  [5. DIAGNOSTIC]    Ký hợp đồng chẩn đoán chuỗi có thu phí (30–50 triệu VND)
        ↓
  [6. PILOT]         Ký hợp đồng triển khai thí điểm thực địa (50–100 triệu VND)
        ↓
  [7. PROOF]         Báo cáo cải thiện chỉ số Before vs After được đối tác nghiệm thu
        ↓
  [8. PAID]          Ký kết hợp đồng thuê bao nền tảng Enterprise SaaS dài hạn
        ↓
  [9. EXPAND]        Mở rộng sang các nhà máy mới, chi nhánh mới và nhà cung cấp
```

> [!WARNING]
> **Quy định kỷ luật bán hàng:** Đội ngũ Sales/BD tuyệt đối không được tính các đầu mối thô (Raw Leads) mới dừng lại ở bước Contact là "Pipeline". Chỉ những tài khoản đã vượt qua bước Qualified mới được tính vào giá trị dự phóng thương mại.

---

## CHƯƠNG 10: CỔNG KIỂM DUYỆT KHÁM PHÁ (DISCOVERY GATE)

Một tài khoản chỉ được phép chuyển trạng thái từ Discovery sang **Qualified** khi và chỉ khi thỏa mãn đồng thời 6 điều kiện thực tế:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                 6 TIÊU CHUẨN CỨNG ĐỂ ĐẠT CHUẨN QUALIFIED               │
├────────────────────────────────────────────────────────────────────────┤
│  1. Real Supply Chain: Có chuỗi cung ứng vật chất thật, có nhà máy/kho │
│  2. Real Operational Pain: Có nỗi đau nghiệp vụ đo đếm được bằng tiền  │
│  3. Decision Maker Identified: Đã gặp trực tiếp người có quyền chi tiền│
│  4. Data Exists: Có dữ liệu ghi nhận (dù là sổ tay hoặc file Excel)   │
│  5. Network Can Participate: HTX hoặc nông dân có khả năng dùng Zalo/SMS│
│  6. Potential Budget: Doanh nghiệp có khả năng chi trả phí dịch vụ SaaS│
└────────────────────────────────────────────────────────────────────────┘
```

Nếu thiếu bất kỳ điều kiện nào trong 6 điều kiện trên, tài khoản bắt buộc phải được chuyển về trạng thái **Nuôi dưỡng (Nurture)**, không được lãng phí nguồn lực kỹ thuật để làm demo tùy biến.

---

## CHƯƠNG 11: SẢN PHẨM GÓI CHẨN ĐOÁN DỮ LIỆU CHUỖI (DIAGNOSTIC PRODUCT)

GOTRACE kiên quyết chấm dứt tình trạng "tư vấn kỹ thuật miễn phí kéo dài". Thay vào đó, chúng tôi đóng gói hoạt động khảo sát thành một sản phẩm thương mại có thu phí mang tên:  
**"Supply Chain Traceability & Data Diagnostic"** (Thời lượng: 2 – 4 tuần; Chi phí: 30 – 50 triệu VND).

### Danh Mục 10 Đầu Ra Tiêu Chuẩn Của Gói Diagnostic:
1. **Current-State Map:** Sơ đồ hiện trạng dòng vật chất và dòng chứng từ của doanh nghiệp.
2. **Actor Map:** Bản đồ các chủ thể tham gia chuỗi và quyền hạn ghi nhận dữ liệu.
3. **Lot Map:** Quy tắc chia tách, gộp lô và định danh lô hàng hiện tại của khách hàng.
4. **Event Map:** Ma trận các sự kiện chuỗi diễn ra từ thu hoạch đến xuất xưởng.
5. **Evidence Map:** Danh mục các loại bằng chứng (phiếu cân, biên bản KCS, ảnh chụp).
6. **System Map:** Đánh giá các phần mềm hiện có và khả năng tích hợp API.
7. **Gap Map:** Báo cáo chỉ rõ các điểm đứt gãy thông tin, nơi dễ xảy ra thất thoát/pha trộn.
8. **One Real-Lot Live Trace:** Báo cáo truy vết thực nghiệm trên đúng 1 lô hàng thật của khách.
9. **Pilot Architecture:** Bản thiết kế kiến trúc kỹ thuật chi tiết cho giai đoạn pilot tiếp theo.
10. **ROI & Value Hypothesis:** Bản dự toán hiệu quả đầu tư và lợi ích kinh tế cụ thể.

Gói Diagnostic đóng vai trò kép: Vừa là một **sản phẩm thương mại tạo doanh thu sớm**, vừa là **khâu chuẩn bị kỹ thuật thực địa** để đảm bảo pilot chắc chắn thành công.

---

## CHƯƠNG 12: CỔNG PHÊ DUYỆT KHỞI ĐỘNG PILOT (PILOT GATE)

Một dự án thí điểm (Pilot) chỉ được phép bấm nút khởi động khi đạt đủ 7 tiêu chí kiểm duyệt:

```text
  [1] Anchor Sponsor: Có người bảo trợ cấp cao (Tổng Giám đốc/Phó TGĐ) cam kết chỉ đạo
  [2] Real Chain: Chuỗi cung ứng vật chất đang vận hành thực tế, không dùng dữ liệu dựng
  [3] Real Data: Các bên tham gia cam kết cung cấp dữ liệu sổ sách, phiếu cân thật
  [4] Real Lot: Xác định rõ mã định danh của 1 lô hàng cụ thể để theo dõi xuyên suốt
  [5] Real Use Case: Bài toán nghiệp vụ rõ ràng (ví dụ: truy vết xuất khẩu gạo sang EU)
  [6] Measurable Success Criteria: Tiêu chí nghiệm thu được định lượng bằng con số cụ thể
  [7] Data Access: Kỹ thuật GOTRACE được quyền truy cập dữ liệu để cấu hình hệ thống
```

> [!CAUTION]
> **Nguyên tắc bất biến:** Tuyệt đối không khởi chạy bất kỳ pilot nào nếu không có điều kiện nghiệm thu đo lường được (No pilot without a measurable proof condition).

---

# PHẦN II: KIẾN TRÚC DỮ LIỆU ĐA NGÀNH, 3 KIẾN TRÚC THAM CHIẾU & TIẾN HÓA SẢN PHẨM
*(Kế thừa & Chuẩn hóa từ Chương 13 đến Chương 18, Chương 40 và Chương 41)*

---

## CHƯƠNG 13: KIẾN TRÚC THAM CHIẾU LÚA GẠO — CHỨNG MINH TÍNH TUYẾN TÍNH (RICE PILOT)

### 13.1 Dòng Chảy Vật Chất Tuyến Tính (Linear Supply Chain Flow)
Chuỗi giá trị lúa gạo ĐBSCL đại diện cho cấu trúc phả hệ tuyến tính điển hình:

```text
  [Vùng Trồng / HTX]  →  [Ghe Cào / Thu Gom]  →  [Lò Sấy / Nhà Máy Xay]
       (Ruộng lúa)            (Vận chuyển ghe)         (Lúa ướt → Lúa khô)
                                                          ↓
  [Cảng Xuất Khẩu]     ←  [Kho Thành Phẩm]     ←  [Nhà Máy Tách Màu / Đóng Gói]
    (Container/Tàu)       (Bao 5kg/50kg)              (Gạo lứt → Gạo trắng)
```

### 13.2 Sáu Năng Lực Cốt Lõi Bắt Buộc Kiểm Chứng Trong Rice Pilot:
1. **Trace-Back (Truy xuất ngược):** Từ 1 bao gạo thành phẩm tại cảng truy ngược chính xác về lò sấy, trạm cân, ghe vận chuyển và danh sách các hộ nông dân trong HTX đã gặt lúa.
2. **Trace-Forward (Truy xuất xuôi):** Khi phát hiện một thửa ruộng bị nhiễm dư lượng thuốc BVTV, hệ thống tự động quét xuôi toàn bộ các lô lúa khô và lô gạo xuất khẩu có chứa nguyên liệu từ thửa ruộng đó.
3. **Mass Balance & Moisture Correction (Cân bằng khối lượng có bù trừ độ ẩm):** Kiểm soát chính xác phương trình sấy và xay xát:
   $$\text{Khối lượng lúa khô chuẩn (14\%)} = \text{Khối lượng lúa ướt} \times \frac{100 - \text{Độ ẩm vào}}{100 - 14}$$
   Cảnh báo ngay lập tức nếu tỷ lệ thu hồi gạo thành phẩm vượt quá ngưỡng kỹ thuật lý thuyết (dấu hiệu gian lận pha trộn gạo cấp thấp).
4. **Evidence Linking (Gắn kết bằng chứng):** Mọi sự kiện đều đính kèm phiếu cân điện tử, phiếu đo độ ẩm, biên bản nghiệm thu KCS và ảnh chụp container tại cảng.
5. **Quality Verification (Kiểm soát chất lượng):** Giám sát các chỉ tiêu: tỷ lệ tấm, độ bạc bụng, tạp chất và dư lượng thuốc BVTV theo tiêu chuẩn xuất khẩu.
6. **Export Shipment Package (Đóng gói hồ sơ xuất khẩu số hóa):** Xuất toàn bộ lịch sử lô hàng thành một bộ hồ sơ số hóa duy nhất (PDF/JSON) phục vụ thông quan hải quan và kiểm tra của khách hàng quốc tế.

---

## CHƯƠNG 14: KIẾN TRÚC THAM CHIẾU TRÁI CÂY — CHỨNG MINH TÍNH PHÂN NHÁNH (FRUIT PILOT)

### 14.1 Dòng Chảy Phân Nhánh (Branching Supply Chain Flow)
Khác với lúa gạo, trái cây (đặc biệt là Xoài Cát Chu Đồng Tháp, Sầu riêng Tiền Giang/Bến Tre) sau khi thu hoạch sẽ bị phân nhánh mạnh mẽ tại cơ sở đóng gói:

```text
                                       ┌→ [Grade 1: Xuất khẩu EU/Mỹ] (Chiếu xạ/Xử lý nhiệt VHT)
                                       │
  [Mã Số Vùng Trồng] → [Cơ Sở Đóng Gói] ┼→ [Grade 2: Xuất khẩu Trung Quốc] (Kiểm dịch GACC)
    (MSVT First-Class)   (MSCSĐG)      │
                                       └→ [Grade Cull: Bán chợ nội địa / Chế biến nước ép]
```

### 14.2 Sáu Năng Lực Cốt Lõi Bắt Buộc Kiểm Chứng Trong Fruit Pilot:
1. **Branching Genealogy (Phả hệ phân nhánh):** Khả năng phân tách 1 lô thu hoạch 10 tấn quả tươi thành 3 lô con với các cấp chất lượng (Grade) khác nhau mà vẫn duy trì toàn vẹn mối liên kết nguồn gốc.
2. **Market Eligibility Rules (Quy tắc thị trường):** Tự động đối chiếu mã số vùng trồng (MSVT) và mã cơ sở đóng gói (MSCSĐG) với danh sách được phê duyệt của Tổng cục Hải quan Trung Quốc (GACC) hoặc Bộ Nông nghiệp Hoa Kỳ (USDA).
3. **Packing Evidence (Bằng chứng đóng gói):** Ghi nhận dữ liệu sục rửa ozone, xử lý nhiệt hơi nước (VHT), kích thước quả và quy cách thùng carton.
4. **Quality Grading (Phân cấp chất lượng):** Bằng chứng kiểm tra độ ngọt (Brix), độ cứng và tỷ lệ khuyết tật vỏ.
5. **Phytosanitary Evidence (Bằng chứng kiểm dịch):** Lưu trữ chứng thư kiểm dịch thực vật điện tử do Chi cục Trồng trọt & BVTV cấp.
6. **Cold-Chain IoT Monitoring (Giám sát chuỗi lạnh):** Thu thập dữ liệu nhiệt độ và độ ẩm time-series từ cảm biến gắn trong container lạnh; cảnh báo sự cố sốc nhiệt làm hỏng trái cây trong quá trình vận chuyển đường biển.

---

## CHƯƠNG 15: KIẾN TRÚC THAM CHIẾU BẾP ĂN — CHỨNG MINH TÍNH HỘI TỤ (KITCHEN PILOT)

### 15.1 Dòng Chảy Hội Tụ (Converging Supply Chain Flow)
Bếp ăn công nghiệp phục vụ hàng chục ngàn suất ăn tại các KCN Cần Thơ, Sa Đéc là môi trường dữ liệu hội tụ phức tạp nhất:

```text
  [NCC Gạo] ──────┐
  [NCC Thịt Heo] ──┼→ [Kho Tiếp Nhận] → [Sơ Chế / Nấu] → [Mẻ Suất Ăn] → [Bàn Ăn / Nhà Máy KCN]
  [NCC Rau Củ] ───┘   (Kiểm thực 3 bước)  (Định mức Recipe) (Lưu mẫu 24h)   (10.000 công nhân)
```

### 15.2 Năm Năng Lực Cốt Lõi Bắt Buộc Kiểm Chứng Trong Kitchen Pilot:
1. **Ingredient Genealogy (Phả hệ nguyên liệu đầu vào):** Ghi nhận nguồn gốc toàn bộ các lô nguyên liệu thô từ nhiều nhà cung cấp khác nhau hội tụ vào kho bếp trong ngày.
2. **Meal Batch Genealogy (Phả hệ mẻ nấu):** Liên kết công thức thực đơn (Recipe) với các lô nguyên liệu thực tế được xuất kho đưa vào nồi nấu.
3. **Reverse Trace (Truy xuất ngược nguyên liệu):** Từ một khay thức ăn trên bàn ăn công nhân, truy ngược tức thì trong vòng 5 phút ra nguồn gốc miếng thịt, bó rau được giao từ nhà cung cấp nào vào lúc mấy giờ.
4. **Forward Incident Blast Radius (Khoanh vùng bán kính sự cố ≤ 60 giây):** Khi có cảnh báo ngộ độc thực phẩm từ 1 lô thịt heo, hệ thống quét đồ thị chỉ ra chính xác những mẻ ăn nào, phân phối đến ca làm việc nào, tại phân xưởng nào đã ăn phải lô thịt đó trong vòng 60 giây.
5. **Compliance Evidence (Bằng chứng tuân thủ Quyết định 1246/QĐ-BYT):** Số hóa quy trình kiểm thực 3 bước (trước khi nhập, trước khi nấu, trước khi ăn) và biên bản niêm phong mẫu lưu thức ăn 24 giờ.

---

## CHƯƠNG 16: KIẾN TRÚC DỮ LIỆU DÙNG CHUNG LIÊN NGÀNH (CROSS-PILOT ARCHITECTURE)

Để ngăn chặn nguy cơ xây dựng 3 hệ thống rời rạc làm phân mảnh nguồn lực, GOTRACE thiết kế kiến trúc dùng chung: **9 lõi chung (Core Graph) + 3 lớp mở rộng đặc thù (Industry Extensions)**.

```text
┌────────────────────────────────────────────────────────────────────────┐
│             12 ĐỐI TƯỢNG DỮ LIỆU CỐT LÕI DÙNG CHUNG LIÊN NGÀNH         │
├────────────────────────────────────────────────────────────────────────┤
│  1. Identity (Định danh chủ thể: Nông dân, HTX, Nhà máy, NCC)         │
│  2. Product (Định danh danh mục sản phẩm, quy cách kỹ thuật)           │
│  3. Location (Tọa độ địa lý GPS, mã số vùng trồng, mã nhà kho)        │
│  4. Lot (Mã định danh lô hàng duy nhất theo chuẩn GCI)                 │
│  5. Event (Sự kiện diễn ra trong chuỗi: Thu hoạch, Giao nhận, Chế biến)│
│  6. Movement (Hành trình di chuyển: Ghe cào, xe tải, container)        │
│  7. Transformation (Chuyển đổi vật chất: Tách vỏ, sấy, nấu, phối trộn) │
│  8. Evidence (Bằng chứng: Phiếu cân, phiếu KCS, ảnh chụp, file PDF)    │
│  9. Quality (Chỉ tiêu chất lượng: Độ ẩm, Brix, vi sinh, dư lượng)      │
│  10. Incident (Sự cố: Lỗi chất lượng, nghi vấn gian lận, cảnh báo ngộ độc)│
│  11. Order (Đơn đặt hàng, hợp đồng thương mại liên kết)                │
│  12. Trace Package (Gói dữ liệu truy xuất đóng gói hoàn chỉnh)         │
└────────────────────────────────────────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ↓                         ↓                         ↓
  PHẦN MỞ RỘNG LÚA GẠO      PHẦN MỞ RỘNG TRÁI CÂY     PHẦN MỞ RỘNG BẾP ĂN
  - Cân bằng khối lượng     - Phân cấp chất lượng     - Định mức thực đơn
    (Mass Balance Equation)   (Grade 1/2/Cull)          (Recipe Definition)
  - Bù trừ độ ẩm khi sấy    - Quản lý MSVT/MSCSĐG     - Đối soát thực tế xuất kho
  - Tỷ lệ thu hồi gạo lứt   - Giám sát chuỗi lạnh IoT - Khoanh vùng sự cố 60s
  - Đo đạc giảm phát thải   - Quy tắc kiểm dịch GACC  - Kiểm thực & Lưu mẫu 24h
```

Nhờ kiến trúc này, nền tảng đạt tỷ lệ tái sử dụng mã nguồn và mô hình dữ liệu trên **80%**, chỉ cần cấu hình thêm 20% nghiệp vụ đặc thù cho từng ngành.

---

## CHƯƠNG 17: LỘ TRÌNH TIẾN HÓA SẢN PHẨM P0 – P4 (PRODUCT ROADMAP)

Lộ trình phát triển sản phẩm của GOTRACE được cấu trúc thành 5 phiên bản tiến hóa liên tục:

```text
  [P0 — Core Graph] (Tháng 1/2026):
  └── Xây dựng các đối tượng nền tảng: Identity, Lot, Event, Evidence, Movement.

  [P1 — Rice Specialty] (Tháng 2–3/2026):
  └── Bổ sung Transformation, Mass Balance Engine, Quality Check và Export Shipment Pack.

  [P2 — Fruit Specialty] (Tháng 4–5/2026):
  └── Bổ sung Branching Logic, Grading Module, Packing Management, Rule GACC và Cold Chain IoT.

  [P3 — Kitchen Specialty] (Tháng 6/2026):
  └── Bổ sung Consumption Tracking, Recipe vs Actual Engine, Incident Blast Radius Scanner.

  [P4 — Enterprise Platform] (Quý 3–4/2026):
  └── Mở rộng API Gateway, Buyer Verification Portal, Advanced Analytics và Automated Risk Engine.
```

---

## CHƯƠNG 18: LUẬN ĐIỂM KIẾN TRÚC HỢP NHẤT (UNIFIED TOPOLOGY THEORY)

3 Playbook ngành (Lúa gạo, Trái cây, Bếp ăn công nghiệp) **không phải là 3 sản phẩm phần mềm riêng biệt**. Chúng là 3 phép thử chứng minh cho một luận điểm kiến trúc duy nhất:
- **Lúa gạo** chứng minh năng lực xử lý phả hệ **Tuyến tính (Linearity)** và cân bằng khối lượng ở quy mô cực lớn.
- **Trái cây** chứng minh năng lực xử lý phả hệ **Phân nhánh (Branching)** và sự phức tạp của thị trường xuất khẩu.
- **Bếp ăn** chứng minh năng lực xử lý phả hệ **Hội tụ (Convergence)** và giá trị khoanh vùng bảo vệ an toàn sức khỏe người tiêu dùng.

Ba bằng chứng này khẳng định năng lực tối thượng của GOTRACE: **Có thể mô hình hóa, vận hành, kiểm chứng và chia sẻ dữ liệu chuỗi cung ứng thực phẩm đa dạng cấu trúc phả hệ mà không cần phải viết lại hệ thống lõi cho từng ngành hàng.**

---

# PHẦN III: KẾ HOẠCH VẬN HÀNH THỰC ĐỊA 90 NGÀY TẠI ĐBSCL
*(Kế thừa & Tích hợp trọn vẹn Chương 31 và Toàn bộ Phần A, C, F, L của Bản 90 Ngày)*

---

## CHƯƠNG 19: LỘ TRÌNH TÁC CHIẾN 13 TUẦN CHI TIẾT (TUẦN 1 ĐẾN TUẦN 13)

Kế hoạch tác chiến 90 ngày tại vùng ĐBSCL được phân bổ thành 3 giai đoạn liên hoàn, mỗi tuần đều có phân công trách nhiệm rõ ràng cho từng vị trí trong đội ngũ PMO:

```text
========================================================================================
             GIAI ĐOẠN 1: THIẾT LẬP NỀN TẢNG (FOUNDATION — NGÀY 1 ĐẾN NGÀY 30)
  Mục tiêu: Đóng băng danh sách Anchor, hoàn tất bộ Demo, ký ≥ 1 Hợp đồng Diagnostic
========================================================================================
```

### TUẦN 1 (Ngày 1 – 7): Khởi Động Nội Bộ & Thiết Lập Công Cụ (Internal Setup)
- **PMO Lead & BD Lead:**
  - Tổ chức cuộc họp Kickoff toàn diện với Founder để thống nhất mục tiêu chiến lược và hạn mức chi tiêu.
  - Rà soát và chốt danh sách Top 10 Doanh nghiệp Đầu tàu (Anchor Candidates) ưu tiên tại Đồng Tháp và Cần Thơ.
  - Thiết lập công cụ quản trị tập trung: Hệ thống CRM (Airtable/Notion), Nhóm thông tin tác chiến Zalo và Mẫu báo cáo tuần.
  - Phê duyệt và in ấn bộ tài liệu chào hàng gói Diagnostic Offer và bản tóm tắt Playbook ngành.
- **Technical Lead:**
  - Khởi tạo môi trường GOTRACE Demo Sandbox trên hạ tầng điện toán đám mây.
  - Cấu hình sẵn 3 kịch bản dữ liệu mẫu (Rice Linear, Fruit Branching, Kitchen Converging).
- **Field Agents (2 nhân sự):**
  - Tiếp nhận tài liệu Playbook, học thuộc lòng các thuộc tính của chân dung khách hàng lý tưởng (ICP).
  - Lập bản đồ địa bàn phụ trách: Đồng Tháp (vùng Cao Lãnh, Sa Đéc, Châu Thành) và An Giang (vùng Thoại Sơn, Tri Tôn).
  - Xác định các đầu mối liên lạc (Contact Points) tại các HTX mục tiêu thông qua mạng lưới cá nhân.

### TUẦN 2 (Ngày 8 – 14): Tiếp Xúc Ban Đầu & Khảo Sát Nông Thôn (First Contact)
- **BD Lead & BD Support:**
  - Thực hiện tối thiểu 10 cuộc gọi/thư tiếp cận trực tiếp với các ứng viên Anchor trong danh sách Top 10.
  - Mục tiêu: Chốt tối thiểu $\ge 3$ cuộc gặp mặt trực tiếp với người có thẩm quyền quyết định (Chủ tịch HĐQT/Tổng Giám đốc).
  - Sử dụng kịch bản mở đầu sắc bén: *"Thưa anh/chị, khi đối tác quốc tế hoặc cơ quan chức năng yêu cầu đối soát, doanh nghiệp mình mất bao lâu để truy xuất được nguồn gốc của 1 lô hàng?"*
- **Field Agents:**
  - Trực tiếp đến khảo sát 5 HTX lúa gạo tại Đồng Tháp đang cung ứng cho các doanh nghiệp xuất khẩu.
  - Ghi chép chi tiết: Hiện tại nông dân và ban chủ nhiệm ghi chép mùa vụ bằng gì? Sổ tay, bảng kê hay Excel? Điểm nghẽn lớn nhất trong việc thu gom lúa là gì?
  - Lập bản ghi chép thực địa (Field Research Note) gửi về cho PMO Lead vào chiều Thứ Sáu.
- **Technical Lead:**
  - Chuẩn bị sẵn kịch bản Demo trực tiếp: Mô phỏng bài toán "Truy xuất ngược 1 lô gạo trong 5 phút" và "Cảnh báo gian lận cân bằng khối lượng lúa sấy".

### TUẦN 3 (Ngày 15 – 21): Chào Bán Gói Chẩn Đoán Dữ Liệu (Diagnostic Pitch)
- **BD Lead:**
  - Tiến hành thuyết trình gói "Supply Chain Traceability & Data Diagnostic" cho tối thiểu $\ge 3$ ứng viên Anchor.
  - Mục tiêu: Có ít nhất $\ge 1$ Anchor đồng ý xem xét hợp đồng Diagnostic (có thu phí dịch vụ từ 30–50 triệu VND).
  - Cập nhật liên tục tiến độ thương lượng lên CRM, xác định rõ các rào cản tâm lý của khách hàng.
- **Technical Lead:**
  - Trực tiếp chạy demo trên hệ thống Sandbox cho các khách hàng tham dự buổi thuyết trình.
  - Ghi nhận toàn bộ câu hỏi kỹ thuật, thắc mắc về bảo mật và khả năng kết nối phần mềm kế toán.

### TUẦN 4 (Ngày 22 – 30): Đàm Phán & Chốt Hợp Đồng Chẩn Đoán (Close Diagnostic)
- **BD Lead & PMO Lead:**
  - Hoàn tất đàm phán các điều khoản thương mại, tiến hành ký kết chính thức tối thiểu $\ge 1$ Thỏa thuận Chẩn đoán (Diagnostic Agreement).
  - Nếu gặp khó khăn chưa ký được: Tiến hành họp khẩn đánh giá lại pitch deck và điều chỉnh gói dịch vụ (Xem Giao thức Escalation tại Chương 30).
- **CỔNG KIỂM SOÁT NGÀY 30 (GATE REVIEW 30):**
  - **Điều kiện GO:** Ký được $\ge 1$ Thỏa thuận Diagnostic $\rightarrow$ Bấm nút chuyển sang Giai đoạn 2.
  - **Điều kiện STOP:** Chưa ký được thỏa thuận nào $\rightarrow$ Dừng mọi hoạt động thực địa, họp khẩn với Founder để rà soát lại tệp khách hàng hoặc thay đổi gói chào hàng.
- **Sản phẩm bàn giao Giai đoạn 1:** Pipeline CRM với $\ge 10$ Anchor; $\ge 3$ buổi Demo hoàn tất; $\ge 1$ Hợp đồng Diagnostic đã ký; 1 Báo cáo nghiên cứu 5 HTX; Môi trường Demo hoàn chỉnh.

```text
========================================================================================
            GIAI ĐOẠN 2: KHỞI ĐỘNG PILOT THỰC TẾ (PILOT LAUNCH — NGÀY 31 ĐẾN NGÀY 60)
  Mục tiêu: Hoàn tất Diagnostic, ký hợp đồng Pilot, Onboard 5 HTX, Trace thành công 1 LOT
========================================================================================
```

### TUẦN 5 – 6 (Ngày 31 – 44): Thực Hiện Chẩn Đoán Chuỗi & Thử Nghiệm Live LOT Test
- **Technical Lead & Field Agents:**
  - Đóng chốt tại nhà máy của khách hàng để tiến hành chẩn đoán dòng chảy dữ liệu thực tế.
  - Thực hiện bài kiểm tra thực nghiệm "Live LOT Test": Lấy đúng 1 lô hàng đang sản xuất của khách hàng và yêu cầu nhân viên của họ truy vết ngược bằng quy trình sổ sách cũ để bấm giờ đo: Mất bao nhiêu ngày? Cần bao nhiêu người phối hợp? Những dữ liệu nào bị thiếu?
  - Khảo sát hạ tầng công nghệ: Khả năng kết nối API của cân điện tử, hệ thống camera giám sát và phần mềm kho.
- **BD Lead:**
  - Tiếp tục duy trì phễu bán hàng: Tiếp cận thêm 5 ứng viên Anchor mới nhằm duy trì đường ống luôn có $> 3$ cơ hội tích cực.

### TUẦN 7 (Ngày 45 – 51): Trình Bày Báo Cáo Khoảng Trống & Ký Hợp Đồng Pilot
- **PMO Lead & Technical Lead:**
  - Trình bày Báo cáo Phân tích Khoảng trống Dữ liệu (Diagnostic Gap Report) trước Hội đồng Quản trị và Economic Buyer của Anchor.
  - Đệ trình Đề xuất Hợp đồng Thí điểm (Pilot Proposal): Xác định rõ phạm vi (1 luồng chuỗi), thời gian (60–90 ngày), chỉ số đo lường thành công và mức phí dịch vụ (50–100 triệu VND).
  - Ký kết chính thức Hợp đồng Triển khai Pilot (Pilot Agreement).
- **Field Agents:**
  - Khởi động quy trình Onboarding tại 5 HTX vệ tinh thuộc vùng liên kết của Anchor.
  - Đào tạo ban giám đốc HTX và thư ký cách thức gửi dữ liệu thu hoạch, phiếu cân qua Zalo Bot.
  - Cấp phát bảng mã QR cho từng tổ hợp tác và biểu mẫu biên bản giao nhận chuẩn hóa.

### TUẦN 8 (Ngày 52 – 58): Bấm Nút Go-Live Hệ Thống Pilot
- **Technical Lead:**
  - Chính thức kích hoạt hệ thống GOTRACE cho Anchor và 5 HTX bắt đầu đẩy dữ liệu vận hành thực tế.
  - Giám sát luồng dữ liệu 24/7: Theo dõi tỷ lệ nộp dữ liệu (Submission Rate) và điểm số chất lượng dữ liệu.
  - Tự động kích hoạt tin nhắn cảnh báo nếu một HTX không nộp dữ liệu quá 48 giờ.
- **Field Agents:**
  - Có mặt trực tiếp tại các HTX 3 buổi/tuần trong giai đoạn đầu thu hoạch để "cầm tay chỉ việc".
  - Thực hiện kiểm tra đối soát ngẫu nhiên 10% dữ liệu điện tử so với sổ tay thực tế tại ruộng lúa/vườn cây.

### TUẦN 9 (Ngày 59 – 60): Đánh Giá Cột Mốc Đầu Tiên (First Milestone Check)
- **PMO Lead:**
  - Rà soát bảng điều khiển Dashboard: Đã có ít nhất 1 LOT hàng hóa được truy xuất hoàn chỉnh xuyên suốt chuỗi chưa? Tỷ lệ nộp dữ liệu của các HTX có vượt mức $50\%$ không?
  - Lập Báo cáo cột mốc gửi Founder và Ban Giám đốc Anchor.
- **CỔNG KIỂM SOÁT NGÀY 60 (GATE REVIEW 60):**
  - **Điều kiện GO:** Pilot đang vận hành trơn tru với dữ liệu thật $\rightarrow$ Bấm nút chuyển sang Giai đoạn 3.
  - **Điều kiện CẢNH BÁO:** Nếu chất lượng dữ liệu đạt dưới $30\%$ $\rightarrow$ Lập tức tăng cường Field Agent cắm chốt xử lý tại chỗ, đóng băng tuyệt đối không nhận thêm Anchor mới.
- **Sản phẩm bàn giao Giai đoạn 2:** Báo cáo Diagnostic Gap Report; Hợp đồng Pilot đã ký; 5 HTX đã vận hành trên hệ thống; $\ge 1$ LOT hàng hóa được truy vết thành công; Hồ sơ chỉ số nền (Baseline KPI) được xác lập.

```text
========================================================================================
            GIAI ĐOẠN 3: CHỨNG MINH GIÁ TRỊ (PROVE VALUE — NGÀY 61 ĐẾN NGÀY 90)
  Mục tiêu: Đo lường Before/After, xây dựng Business Case, ký Hợp đồng Enterprise dài hạn
========================================================================================
```

### TUẦN 10 – 11 (Ngày 61 – 77): Vận Hành Ổn Định & Tự Động Hóa Đối Soát
- **Technical Lead:**
  - Tinh chỉnh giao diện phần mềm dựa trên phản hồi của nông dân và thủ kho nhà máy; khắc phục triệt để các lỗi phát sinh.
  - Kích hoạt tính năng tự động xuất Báo cáo Cân bằng Khối lượng (Mass Balance Report).
  - Xây dựng Bảng điều khiển KPI dành riêng cho Ban Lãnh đạo Anchor.
- **Field Agents:**
  - Tiến hành mở rộng thêm 5–10 HTX vệ tinh mới nếu chất lượng dữ liệu của đợt 1 đạt trên $70\%$.
  - Tăng cường mật độ kiểm tra chéo độ chính xác dữ liệu trước khi đóng gói báo cáo cuối kỳ.
- **BD Lead:**
  - Tiếp cận song song Doanh nghiệp Đầu tàu ngành Bếp ăn công nghiệp (Kitchen Anchor) nhằm tận dụng đặc tính không bị phụ thuộc mùa vụ.

### TUẦN 12 (Ngày 78 – 84): Đóng Gói Hồ Sơ Chứng Thực Giá Trị (Business Case Build)
- **PMO Lead & Technical Lead:**
  - Thu thập toàn bộ số liệu thực tế, lập bảng so sánh Before vs After:
    * Thời gian truy xuất hồ sơ lô hàng: Giảm từ bao nhiêu ngày xuống bao nhiêu phút?
    * Tỷ lệ hao hụt nguyên liệu và sai lệch khối lượng: Giảm được bao nhiêu phần trăm?
    * Chi phí nhân sự phục vụ đối soát giấy tờ: Tiết kiệm được bao nhiêu giờ làm việc?
  - Xây dựng bản phân tích lợi ích kinh tế (ROI Calculation) dựa trên dữ liệu thật của khách hàng.
  - Soạn thảo bản Đề xuất Hợp đồng Thương mại Mở rộng (Expansion Proposal) chuyển đổi từ Pilot sang hợp đồng SaaS nhiều năm.

### TUẦN 13 (Ngày 85 – 90): Đánh Giá Pilot & Báo Cáo Hội Đồng Quản Trị
- **PMO Lead & BD Lead:**
  - Tổ chức cuộc họp đánh giá kết quả Pilot với Chủ tịch/Tổng Giám đốc Anchor; trình bày Business Case và chốt hợp đồng thương mại chính thức.
- **PMO Lead:**
  - Lập Báo cáo Tổng kết 90 Ngày trình bày trước Founder và Ban Giám đốc GOTRACE:
    * Báo cáo tiến độ ký kết và số lượng pilot đang chạy.
    * Đánh giá kết quả KPI thực tế đạt được so với mục tiêu.
    * Báo cáo đối soát ngân sách thực tế (Actuals vs Budget).
    * Kiến nghị kế hoạch phân bổ nguồn lực cho Giai đoạn 2 (Tháng 4 – 9/2027).
- **Sản phẩm bàn giao Giai đoạn 3:** Báo cáo kết quả Pilot Before/After; Bản Business Case có số liệu thực chứng; Đề xuất hợp đồng mở rộng; Báo cáo Tổng kết 90 ngày trình Founder/BOD; Lộ trình chi tiết cho Phase 2.

---

## CHƯƠNG 20: ĐIỀU PHỐI TIẾN ĐỘ THEO LỊCH MÙA VỤ ĐBSCL (AGRICULTURAL CALENDAR)

Triển khai công nghệ tại ĐBSCL bắt buộc phải thuận theo quy luật tự nhiên và lịch nông vụ. Nếu lệch mùa vụ, dự án sẽ rơi vào tình trạng "chờ lúa chín" gây lãng phí ngân sách và phân tán nhân lực.

### 20.1 Đặc Điểm 4 Chu Kỳ Mùa Vụ ĐBSCL (Tháng 9/2026 – Tháng 3/2027)

```text
┌────────────────────────────────────────────────────────────────────────┐
│             LỊCH ĐỒNG BỘ NÔNG VỤ & TIẾN ĐỘ VẬN HÀNH PMO                │
├────────────────────────────────────────────────────────────────────────┤
│  THÁNG 9–10/2026 (Foundation — 30 Ngày Đầu):                          │
│  ├── Lúa: Đang cuối vụ Thu Đông → Cơ hội thu thập mẫu dữ liệu cuối vụ  │
│  ├── Trái cây: Setup ngay packhouse Sầu riêng nghịch vụ & xoài        │
│  └── Bếp ăn: Chạy quanh năm → MŨI NHỌN DỰ PHÒNG NẾU LÚA GẠO CHẬM TIẾN ĐỘ│
│                                                                        │
│  THÁNG 11/2026 (Pilot Launch — Ngày 31–60):                            │
│  ├── Lúa: Bắt đầu gieo sạ vụ ĐÔNG XUÂN (Vụ lúa lớn nhất, đẹp nhất năm) │
│  │   → THỜI ĐIỂM VÀNG BẤM NÚT GO-LIVE PILOT LÚA GẠO TẠI ĐỒNG THÁP       │
│  ├── Trái cây: Hoàn tất data model đóng gói; thẩm định MSVT sầu riêng │
│  └── Bếp ăn: Pilot đang chạy thu thập dữ liệu hàng ngày                │
│                                                                        │
│  THÁNG 12/2026 – THÁNG 1/2027 (Prove Value — Ngày 61–90):              │
│  ├── Lúa: Lúa Đông Xuân đẻ nhánh & làm đòng → Field Agent đo vật tư    │
│  ├── Trái cây: CƠ HỘI KÍCH HOẠT PILOT SẦU RIÊNG NGHỊCH VỤ CUỐI NĂM     │
│  │   (Tiền Giang/Bến Tre/Đồng Tháp) nếu kịp chuẩn bị với Anchor        │
│  └── Bếp ăn: Đã tích lũy đủ 8 tuần dữ liệu → Chốt Business Case ký HĐ │
│                                                                        │
│  THÁNG 2–3/2027 (Scale Phase — Sau 90 Ngày):                           │
│  ├── Lúa: ĐÔNG XUÂN THU HOẠCH RỘ → Bắt trọn chu trình từ ruộng đến cảng│
│  └── Xoài Cát Chu & Sầu riêng: VÀO VỤ CHÍNH (Mar–May) → BẤM NÚT FRUIT  │
│      PILOT TOÀN DIỆN TẠI ĐỒNG THÁP & TIỀN GIANG                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 20.2 Ma Trận Phối Hợp Đa Ngành — Không Để Tháng Nào Bị Rơi Vào "Thời Gian Chết"

| Tháng | Hoạt Động Lúa Gạo (Rice) | Hoạt Động Trái Cây (Fruit) | Hoạt Động Bếp Ăn (Kitchen) | Trọng Tâm Kinh Doanh (BD) |
|:---:|:---|:---|:---|:---|
| **09/2026** | Khảo sát 5 HTX, setup demo | Khảo sát cơ sở đóng gói | Setup kịch bản ngộ độc 60s | 10 outreach, $\ge 3$ demo |
| **10/2026** | Onboard 5 HTX, chuẩn bị giống | Cấu hình quy tắc GACC | Vận hành thử nghiệm bếp ăn | Chốt $\ge 1$ Thỏa thuận Diagnostic |
| **11/2026** | **Go-live vụ Đông Xuân** | Chờ mùa vụ chính | Thu thập dữ liệu thực tế | Chốt Anchor thứ hai |
| **12/2026** | Theo dõi bón phân, đo phát thải | Chuẩn bị mã số vùng trồng | Đóng gói Business Case | Thuyết trình mở rộng Enterprise |
| **01/2027** | Kiểm soát phun xịt, nhật ký | Kết nối cảm biến container | Ký hợp đồng SaaS chính thức | Lập kế hoạch mở rộng Cần Thơ |
| **02/2027** | **Thu hoạch rộ, trace trọn vẹn** | Tập huấn HTX xoài Sa Đéc | Mở rộng chi nhánh bếp mới | Ký Full Contract Lúa gạo |
| **03/2027** | Tổng kết Business Case vụ lúa | **Bấm nút Go-live Pilot Xoài**| Vận hành ổn định | Khởi động Giai đoạn 2 toàn diện |

---

## CHƯƠNG 21: CƠ HỘI CHIẾN LƯỢC: ĐỀ ÁN 1 TRIỆU HA LÚA & ĐỐI TÁC ViRiCert

Đề án *"Phát triển bền vững một triệu héc-ta chuyên canh lúa chất lượng cao và phát thải thấp gắn với tăng trưởng xanh vùng ĐBSCL đến năm 2030"* của Chính phủ là đòn bẩy thị trường lớn nhất cho GOTRACE.

### 21.1 Nguồn Khách Hàng Mục Tiêu Đã Được Lọc Sẵn
- Hiện có hơn **1.100 HTX** và hơn **210 doanh nghiệp** đầu ngành tham gia Đề án.
- Đây chính là tệp khách hàng tiềm năng lý tưởng nhất vì họ **bắt buộc phải có hệ thống số hóa quy trình canh tác** để chứng minh tiêu chí giảm phát thải.

### 21.2 Kịch Bản Tiếp Cận & Hợp Tác ViRiCert
- **Thông điệp tiếp cận (Sales Hook):** *"GOTRACE cung cấp hạ tầng dữ liệu số hóa chuỗi cung ứng, giúp doanh nghiệp hoàn thiện hồ sơ đo đạc, báo cáo và thẩm định (MRV) để đủ điều kiện nhận chi trả tín chỉ carbon từ Quỹ TCAF của Ngân hàng Thế giới (ước tính 20 USD/tấn CO2 tương đương)."*
- **Chiến lược hợp tác dữ liệu với ViRiCert:**
  - ViRiCert là đơn vị khoa học chuyên trách đo đạc nồng độ phát thải khí nhà kính (GHG) ngoài đồng ruộng.
  - GOTRACE cung cấp nền tảng số hóa quản lý dòng lúa, nhật ký rút nước ngập khô xen kẽ (AWD) và quản lý rơm rạ.
  - Sự kết hợp giữa **Dữ liệu Chuỗi GOTRACE + Dữ liệu Khoa học ViRiCert** tạo thành bộ hồ sơ xuất khẩu xanh hoàn hảo, không có đối thủ cạnh tranh nào tại ĐBSCL có thể cung cấp được.

### 21.3 Lộ Trình Hành Động 4 Tuần Khai Thác Đề Án 1Mha:
- **Tuần 1:** Làm việc với Sở NN&PTNT Đồng Tháp và Cần Thơ để tiếp nhận danh sách 210 doanh nghiệp tham gia Đề án.
- **Tuần 2–3:** Sàng lọc và tiếp cận 10 doanh nghiệp quy mô lớn nhất đóng trên địa bàn Đồng Tháp, An Giang, Cần Thơ.
- **Tuần 4:** Thiết lập cuộc gặp gỡ cấp cao với ít nhất 2 doanh nghiệp dẫn đầu Đề án.

---

## CHƯƠNG 22: KHUNG QUYẾT ĐỊNH ƯU TIÊN MỞ NGÀNH & CHỐNG SCALE SỚM

### 22.1 Cây Quyết Định Dành Cho PMO Lead

```text
  CÂU HỎI 1: Anchor đầu tiên ký kết thuộc ngành hàng nào?
  ├── Nếu là LÚA GẠO: Kích hoạt ngay Rice Playbook, bám sát lịch gieo sạ vụ Đông Xuân.
  ├── Nếu là BẾP ĂN: Kích hoạt ngay Kitchen Playbook (không phụ thuộc mùa vụ).
  └── Nếu là TRÁI CÂY: Tiến hành setup packhouse, nhưng full pilot lùi về tháng 03/2027.

  CÂU HỎI 2: Nếu có ≥ 2 Anchor thuộc 2 ngành khác nhau ký cùng lúc?
  └── Ưu tiên triển khai song song: Kitchen (quanh năm) + Rice (vụ Đông Xuân).
      TUYỆT ĐỐI KHÔNG mở Fruit cùng lúc nếu đội ngũ kỹ thuật chưa mở rộng!

  CÂU HỎI 3: Điều kiện để mở ngành hàng tiếp theo sau 90 ngày là gì?
  └── Chỉ mở ngành tiếp theo khi ngành hiện tại đã có 1 khách hàng ký hợp đồng trả phí chính thức.
```

### 22.2 Nguyên Tắc Kỷ Luật: Tuyệt Đối Chống Mở Rộng Sớm (Anti-Premature Scaling)

> [!WARNING]
> ### LỆNH ĐÓNG BĂNG MỞ RỘNG (FREEZE RULE)
> **PMO Lead tuyệt đối KHÔNG ĐƯỢC PHÉP ký thêm Anchor mới khi:**
> 1. Tỷ lệ nộp dữ liệu của Anchor hiện tại đạt dưới $50\%$.
> 2. Đội ngũ Kỹ thuật đang phải gồng mình sửa lỗi nghiêm trọng (Critical Bug) trên môi trường thực tế.
> 3. Chưa có biên bản nghiệm thu pilot đầu tiên được khách hàng ký xác nhận.
> 
> *Mở rộng quy mô khi dữ liệu đang rác đồng nghĩa với việc tự sát thương hiệu và đánh mất niềm tin của toàn bộ mạng lưới doanh nghiệp ĐBSCL cùng một lúc!*

---

## CHƯƠNG 23: CHUẨN BỊ CHO GIAI ĐOẠN 2 & KẾT QUẢ 12 THÁNG BÁNH ĐÀ (PHASE 2 & FLYWHEEL)

### 23.1 Điều Kiện Tiên Quyết Để Bước Vào Giai Đoạn 2 (Tháng 4 – 9/2027)
Để được Founder và Hội đồng Quản trị phê duyệt ngân sách mở rộng Phase 2, PMO bắt buộc phải đạt đủ 5 tiêu chuẩn:
- [x] Có ít nhất $\ge 2$ Hợp đồng Doanh nghiệp Đầu tàu đang vận hành và trả phí thuê bao hàng tháng.
- [x] Có ít nhất $\ge 1$ Bản Business Case chứng thực số liệu thực tế về giảm thời gian và chi phí.
- [x] Quy trình Onboarding HTX đã được đóng gói chuẩn hóa (thời gian hướng dẫn $< 2$ ngày/HTX).
- [x] Nền tảng kỹ thuật vận hành ổn định, tỷ lệ sự cố gián đoạn đạt mức $< 1$ lỗi/tuần.
- [x] Nhận được tối thiểu $\ge 1$ tài khoản giới thiệu (Referral) từ chính khách hàng hiện hữu.

### 23.2 Mục Tiêu Giai Đoạn 2 (Phase 2 Targets):
- Mở rộng chi nhánh hoạt động sang thành phố Cần Thơ và tỉnh An Giang.
- Nâng tổng số Anchor ký kết lên $\ge 5$ doanh nghiệp.
- Kết nối tối thiểu $\ge 50$ HTX và nhà cung ứng vào hệ thống dữ liệu.
- Đạt mốc doanh thu định kỳ tối thiểu $\ge 1$ tỷ VND/quý.
- Khởi chạy thành công Fruit Pilot trong vụ chính Xoài Cát Chu.

### 23.3 Bánh Đà Hiệu Ứng Mạng Lưới Sau 12 Tháng (The 12-Month Network Flywheel)

```text
                 [ANCHOR ENTERPRISES]
             (Doanh nghiệp đầu tàu tham gia)
                          │
                          ↓
               [SUPPLIER NETWORKS]
            (Kéo hàng trăm HTX/nhà vườn)
                          │
                          ↓
                 [MORE DATA OBJECTS]
           (Gia tăng thực thể, lô hàng số)
                          │
                          ↓
               [MORE VERIFIED EVENTS]
          (Hàng triệu sự kiện được đối soát)
                          │
                          ↓
                [HIGH SWITCHING COST]
        (Chi phí chuyển đổi cực cao, độc quyền dữ liệu)
                          │
                          ↓
              [POWERFUL NETWORK EFFECT]
           (Doanh nghiệp mới tự tìm đến tham gia)
```

Trạng thái đích sau 12 tháng: GOTRACE sở hữu 1 Đồ thị Dữ liệu Cốt lõi dùng chung + 3 Kiến trúc tham chiếu hoàn chỉnh + 3 Quy trình thí điểm được kiểm chứng + 1 Bộ sản phẩm Diagnostic nhân bản được + Doanh thu thuê bao hàng năm (ARR) bền vững.

---

# PHẦN IV: TỔ CHỨC NHÂN SỰ, MA TRẬN RACI & DỰ TOÁN NGÂN SÁCH
*(Kế thừa & Tích hợp trọn vẹn Chương 19 đến Chương 22 và Toàn bộ Phần B, D của Bản 90 Ngày)*

---

## CHƯƠNG 24: SƠ ĐỒ TỔ CHỨC ĐỘI NGŨ PMO THỰC ĐỊA 6 HEADCOUNT

Để đảm bảo bộ máy tinh gọn, hiệu quả và tối ưu hóa ngân sách trong 90 ngày đầu, GOTRACE thiết lập định biên đội ngũ thực địa đúng **6 headcount** cắm chốt tại các địa bàn trọng điểm ĐBSCL:

```text
                          FOUNDER / CEO GOTRACE
                    (Chỉ đạo chiến lược & Phê duyệt vốn)
                                    │
                             PMO LEAD (1 người)
                         (Cần Thơ / Đồng Tháp)
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
      BD LEAD                 TECHNICAL LEAD             FIELD OPS LEAD
     (1 người)                   (1 người)               (PMO kiêm nhiệm)
    (Đồng Tháp)              (Remote / Cần Thơ)                │
         │                                               FIELD AGENTS
     BD SUPPORT                                           (2 người)
     (1 người)                                       (1 Đồng Tháp + 1 An Giang)
 (Cần Thơ / An Giang)
```

### Bản Mô Tả Công Việc & Tiêu Chuẩn Nhân Sự Chi Tiết:

#### 1. PMO Lead (01 Người — Đặt tại Cần Thơ / Đồng Tháp)
- **Báo cáo trực tiếp:** Founder / CEO GOTRACE.
- **Trách nhiệm chính:** Điều hành toàn diện tiến độ 90 ngày, quản lý ngân sách 568M, chủ trì các cuộc họp giao ban tuần, làm cầu nối giữa Sales – Product – Delivery, bảo vệ các nguyên tắc vàng.
- **Chỉ số đo lường hiệu quả (KPI):** Số Anchor ký kết, số pilot vận hành ổn định, tỷ lệ phương sai ngân sách (Budget Variance $\le 5\%$), tỷ lệ hoàn thành cột mốc Gate Reviews.
- **Tiêu chuẩn tuyển dụng:** Có tối thiểu 3–5 năm kinh nghiệm quản lý dự án công nghệ B2B hoặc chuỗi cung ứng nông nghiệp tại miền Tây; kỹ năng giải quyết xung đột và quản trị rủi ro xuất sắc.

#### 2. Business Development Lead (01 Người — Cắm chốt tại Đồng Tháp)
- **Báo cáo trực tiếp:** PMO Lead / Founder.
- **Trách nhiệm chính:** Tiếp cận các Chủ tịch HĐQT/Tổng Giám đốc Doanh nghiệp Đầu tàu; dẫn dắt các buổi gặp Discovery; thuyết trình gói Diagnostic; thương lượng và chốt hợp đồng.
- **KPI cá nhân:** $\ge 15$ cuộc gặp cấp cao, $\ge 6$ buổi pitch Diagnostic, $\ge 3$ hợp đồng Diagnostic ký kết, $\ge 1$ hợp đồng Pilot chính thức.
- **Tiêu chuẩn:** Có mối quan hệ sâu rộng trong ngành gạo và cây ăn trái tại ĐBSCL; am hiểu văn hóa thương trường miền Tây; tác phong quyết liệt, cam kết số liệu trung thực.

#### 3. BD Support (01 Người — Đặt tại Cần Thơ / An Giang)
- **Báo cáo trực tiếp:** BD Lead.
- **Trách nhiệm chính:** Thu thập thông tin 12 thuộc tính tài khoản mục tiêu; cập nhật hệ thống CRM; chuẩn bị hồ sơ năng lực, đề xuất thương mại và hợp đồng mẫu; hậu cần tiếp khách.
- **KPI cá nhân:** Dữ liệu CRM được cập nhật 100% trước 17h00 Thứ Sáu; tài liệu thầu được chuẩn bị chính xác, không sai sót lỗi thể thức.
- **Tiêu chuẩn:** Tốt nghiệp Đại học Cần Thơ hoặc Đại học An Giang chuyên ngành Kinh tế/Nông nghiệp; thành thạo công cụ số; cẩn thận, chu đáo.

#### 4. Technical Lead (01 Người — Làm việc Remote / Cần Thơ / TP.HCM)
- **Báo cáo trực tiếp:** PMO Lead.
- **Trách nhiệm chính:** Quản trị kiến trúc Core Graph; cấu hình mô hình dữ liệu cho từng pilot; dựng kịch bản demo; tích hợp API cân điện tử/hệ thống kho; đào tạo kỹ thuật.
- **KPI cá nhân:** Thời gian phản hồi xử lý sự cố $< 2$ giờ; độ sẵn sàng hệ thống (Uptime) $\ge 99.5\%$; bảo đảm tính toàn vẹn phả hệ dữ liệu.
- **Tiêu chuẩn:** Kỹ sư phần mềm có kinh nghiệm thiết kế hệ thống dữ liệu phân tán; hiểu biết về logistics/nông nghiệp; khả năng độc lập tác chiến cao.

#### 5. Field Agents (02 Người — 01 người tại Đồng Tháp, 01 người tại An Giang)
- **Báo cáo trực tiếp:** PMO Lead (khối Field Ops).
- **Trách nhiệm chính:** Trực tiếp bám sát hiện trường tại các HTX, vùng trồng, trạm cân, nhà máy sấy; hướng dẫn nông dân và thư ký HTX nhập liệu qua Zalo; kiểm tra đối soát 10% sổ sách thực tế; phản ánh kịp thời các vướng mắc của cơ sở về PMO.
- **KPI cá nhân:** Số lượng HTX onboard thành công; tỷ lệ nộp dữ liệu của HTX phụ trách $\ge 70\%$; độ chính xác đối soát sổ tay $\ge 85\%$.
- **Tiêu chuẩn:** Người bản địa, có xe máy di chuyển độc lập; tốt nghiệp Cao đẳng/Đại học Nông nghiệp; nói năng chất phác, hòa đồng, được bà con nông dân tin tưởng.

---

## CHƯƠNG 25: MA TRẬN PHÂN NHIỆM RACI CHO 7 QUYẾT ĐỊNH SỐNG CÒN

Nhằm chấm dứt tình trạng đùn đẩy trách nhiệm hoặc chậm trễ trong việc phê duyệt, ma trận RACI được thiết lập cụ thể cho 7 quyết định sống còn của dự án:

| STT | Các Quyết Định Sống Còn Của Dự Án | PMO Lead | BD Lead | Tech Lead | Field Agent | Founder / CEO |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 1 | **Chọn Anchor mục tiêu để tiếp cận** | **A** | **R** | **I** | **I** | **C** |
| 2 | **Thỏa thuận điều khoản Anchor Agreement** | **C** | **R** | **I** | — | **A** |
| 3 | **Xác định phạm vi Pilot Scope & KPI** | **R** | **C** | **C** | **I** | **A** |
| 4 | **Phân bổ và phê duyệt giải ngân ngân sách**| **R** | **I** | **I** | **I** | **A** |
| 5 | **Mở rộng sang Anchor hoặc địa bàn mới** | **C** | **R** | **I** | **I** | **A** |
| 6 | **Đánh giá Go/No-Go sau các giai đoạn** | **R** | **C** | **C** | **I** | **A** |
| 7 | **Chính sách giá và phí dịch vụ Pilot** | **C** | **R** | — | — | **A** |

*Ý nghĩa ký hiệu:*
- **R (Responsible):** Người trực tiếp thực hiện công việc và chịu trách nhiệm hoàn thành.
- **A (Accountable):** Người sở hữu quyền quyết định tối hậu và chịu trách nhiệm cao nhất về kết quả.
- **C (Consulted):** Người cần được tham vấn ý kiến chuyên môn trước khi đưa ra quyết định.
- **I (Informed):** Người được thông báo kết quả sau khi quyết định đã được phê chuẩn.

---

## CHƯƠNG 26: PHÂN ĐỊNH VAI TRÒ SALES & CỔNG THẨM ĐỊNH PMO (SALES GOVERNANCE)

### 26.1 Vai Trò Bán Hàng Của Nhà Sáng Lập (Founder Sales Role)
Founder là "vũ khí tối thượng" trong bán hàng B2B cấp doanh nghiệp lớn, nhưng nguồn lực thời gian của Founder có hạn. Do đó, quy định phân định rõ:
- **Những việc Founder TRỰC TIẾP LÀM:** Tiếp cận Top 10 khách hàng chiến lược cấp tập đoàn; xây dựng quan hệ với lãnh đạo Tỉnh ủy, UBND và Sở NN&PTNT; tham gia chốt các hợp đồng Anchor đầu tàu; phê duyệt các trường hợp ngoại lệ về giá; đưa ra các quyết định thương mại lớn.
- **Những việc Founder TUYỆT ĐỐI KHÔNG LÀM:** Đi gặp các đầu mối manh mún; trực tiếp demo kỹ thuật phần mềm; tự tay giải quyết các lỗi triển khai chi tiết; xử lý khiếu nại hỗ trợ người dùng vụn vặt.

### 26.2 Ranh Giới Cam Kết Của Đội Ngũ Kinh Doanh (Sales Role & Boundaries)
Đội ngũ Sales chịu trách nhiệm xây dựng đường ống khách hàng, thực hiện khám phá, trình bày giải pháp và đàm phán thương mại.  
**Quy tắc kỷ luật:** Sales tuyệt đối **không được phép hứa hẹn bất kỳ tính năng sản phẩm nào chưa có sẵn trong tài liệu đặc tả kỹ thuật** để chiều lòng khách hàng.

### 26.3 Cổng Thẩm Định Tính Khả Thi Của PMO (PMO Feasibility Gate)
Mọi bản Đề xuất Thương mại (Proposal) hoặc Hợp đồng trước khi gửi khách hàng bắt buộc phải tuân theo luồng phê duyệt:

```text
  [SALES TEAM] (Dự thảo nội dung thương mại & yêu cầu của khách hàng)
       ↓
  [PMO LEAD] (Kiểm tra tính khả thi & đối chiếu với kiến trúc Core Graph)
       ↓
  [PRODUCT / DELIVERY] (Đánh giá năng lực đáp ứng kỹ thuật và nguồn lực thực địa)
       ↓
  [FEASIBILITY SIGN-OFF] (PMO phê duyệt) → [CHÍNH THỨC GỬI CHO KHÁCH HÀNG]
```

Không một điều khoản kỹ thuật nào được đưa vào hợp đồng nếu chưa xác định rõ 6 yếu tố: **Phạm vi (Scope), Nguồn dữ liệu (Data), Khả năng tích hợp (Integration), Thời gian bàn giao (Timeline), Nhân sự phụ trách (Owner) và Tiêu chí nghiệm thu (Acceptance Criteria).**

---

## CHƯƠNG 27: CẤU TRÚC ĐỀ XUẤT THƯƠNG MẠI CHUẨN HÓA 13 MỤC (PROPOSAL STRUCTURE)

Tất cả các bản Đề xuất Thương mại (Commercial Proposal) gửi cho Doanh nghiệp Đầu tàu tại ĐBSCL bắt buộc phải tuân thủ cấu trúc chuẩn mực gồm 13 phần:

```text
┌────────────────────────────────────────────────────────────────────────┐
│           CẤU TRÚC 13 PHẦN BẮT BUỘC CỦA MỘT BẢN PROPOSAL ENTERPRISE    │
├────────────────────────────────────────────────────────────────────────┤
│  1. Current Operational Problem (Vấn đề và nỗi đau thực tế của khách)  │
│  2. Target Supply Chain (Đoạn chuỗi cung ứng mục tiêu được số hóa)    │
│  3. Project Scope (Phạm vi dự án: Số lượng nhà máy, kho, HTX liên kết) │
│  4. Common Data Model (Mô hình dữ liệu và các thực thể áp dụng)        │
│  5. Pilot Implementation Methodology (Phương pháp triển khai thí điểm) │
│  6. Concrete Deliverables (Danh mục sản phẩm bàn giao định lượng)      │
│  7. Success Metrics & Target KPIs (Chỉ số KPI đo lường trước và sau)   │
│  8. Acceptance Criteria & DoD (Tiêu chuẩn và biên bản nghiệm thu)      │
│  9. Detailed Timeline & Milestones (Lộ trình thời gian chi tiết)       │
│  10. Customer Responsibilities (Trách nhiệm và nguồn lực từ phía khách)│
│  11. GOTRACE Responsibilities (Trách nhiệm và cam kết từ phía GOTRACE) │
│  12. Commercial Terms & Pricing (Điều khoản tài chính, phí dịch vụ)    │
│  13. Long-Term Expansion Path (Lộ trình mở rộng mạng lưới sau pilot)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## CHƯƠNG 28: DỰ TOÁN NGÂN SÁCH 90 NGÀY 568 TRIỆU VND & KẾ HOẠCH DOANH THU THU HỒI

### 28.1 Bảng Dự Toán Chi Phí 90 Ngày Chi Tiết Từng Tháng (Đơn vị: Triệu VND)

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                             DỰ TOÁN NGÂN SÁCH VẬN HÀNH 90 NGÀY                              │
├────────────────────────────────────┬──────────────┬─────────┬─────────┬─────────┬───────────┤
│  Hạng Mục Chi Phí                  │ Định Mức     │ Tháng 1 │ Tháng 2 │ Tháng 3 │ Tổng Cộng │
├────────────────────────────────────┼──────────────┼─────────┼─────────┼─────────┼───────────┤
│  1. CHI PHÍ NHÂN SỰ (PERSONNEL)    │              │         │         │         │           │
│  - PMO Lead                        │ 30 tr/tháng  │   30    │   30    │   30    │    90     │
│  - Business Development Lead       │ 25 tr/tháng  │   25    │   25    │   25    │    75     │
│  - BD Support                      │ 12 tr/tháng  │   12    │   12    │   12    │    36     │
│  - Technical Lead                  │ 30 tr/tháng  │   30    │   30    │   30    │    90     │
│  - Field Agents (02 người)         │ 35 tr/tháng  │   35    │   35    │   35    │   105     │
│  CỘNG CHI PHÍ NHÂN SỰ              │              │  132    │  132    │  132    │   396     │
├────────────────────────────────────┼──────────────┼─────────┼─────────┼─────────┼───────────┤
│  2. CHI PHÍ VẬN HÀNH THỰC ĐỊA      │              │         │         │         │           │
│  - Di chuyển (Xăng xe máy, đò phà) │ Thực tế địa bàn│ 15    │   15    │   15    │    45     │
│  - Lưu trú thực địa Field Agents   │ Cần Thơ/ĐTháp│    5    │    5    │    5    │    15     │
│  - Thiết bị hiện trường (Tablet,   │ Mua sắm 1 lần│   20    │    0    │    0    │    20     │
│    sim 4G, máy in nhãn test)       │              │         │         │         │           │
│  - Tài liệu, in ấn biểu mẫu,       │ Định kỳ      │    5    │    5    │    5    │    15     │
│    quà ngoại giao tiếp xúc HTX     │              │         │         │         │           │
│  CỘNG CHI PHÍ VẬN HÀNH             │              │   45    │   25    │   25    │    95     │
├────────────────────────────────────┼──────────────┼─────────┼─────────┼─────────┼───────────┤
│  3. CHI PHÍ KỸ THUẬT & HẠ TẦNG     │              │         │         │         │           │
│  - Cloud Server, Database, Backup  │ Điện toán đám mây 5    │    5    │    5    │    15     │
│  - Công cụ phần mềm (CRM, Zalo OA, │ Bản quyền    │    3    │    3    │    3    │     9     │
│    SMS OTP, Google Workspace)      │              │         │         │         │           │
│  CỘNG CHI PHÍ KỸ THUẬT             │              │    8    │    8    │    8    │    24     │
├────────────────────────────────────┼──────────────┼─────────┼─────────┼─────────┼───────────┤
│  4. QUỸ DỰ PHÒNG RỦI RO (10%)      │ Dự phòng sự cố│  19    │   17    │   17    │    52     │
├────────────────────────────────────┴──────────────┼─────────┼─────────┼─────────┼───────────┤
│  TỔNG CỘNG TOÀN BỘ NGÂN SÁCH ĐẦU TƯ               │ ~204    │ ~182    │ ~182    │  568 TRIỆU│
└───────────────────────────────────────────────────┴─────────┴─────────┴─────────┴───────────┘
```

> [!NOTE]
> Tổng ngân sách 90 ngày được phê duyệt trần là **568 triệu VND** (nằm trong biên độ an toàn 550 – 600 triệu VND). Quỹ dự phòng $10\%$ (52 triệu VND) do PMO Lead quản lý và chỉ được giải ngân khi có văn bản phê duyệt của Founder đối với các tình huống khẩn cấp ngoài hiện trường.

### 28.2 Kế Hoạch Doanh Thu Thu Hồi Vốn Trong 90 Ngày
Mặc dù giai đoạn 90 ngày đầu là giai đoạn đầu tư xây dựng nền tảng và kiểm chứng sản phẩm, PMO vẫn đặt mục tiêu kinh doanh quyết liệt nhằm thu hồi một phần chi phí:

| Nguồn Doanh Thu Mục Tiêu | Số Lượng Dự Kiến | Đơn Giá / Doanh Thu | Tổng Thu Dự Kiến | Ý Nghĩa Chiến Lược |
|:---|:---:|:---:|:---:|:---|
| **Phí Dịch vụ Chẩn đoán Chuỗi (Diagnostic Fees)** | $2 – 3$ hợp đồng | $30 – 50$ triệu VND | **$90 – 150$ triệu** | Thu phí khảo sát; sàng lọc khách hàng nghiêm túc. |
| **Phí Triển khai Pilot (Pilot Contracts)** | $1 – 2$ hợp đồng | $50 – 100$ triệu VND | **$100 – 150$ triệu**| Khách hàng trả tiền để kiểm chứng giá trị thực. |
| **TỔNG DOANH THU THU HỒI DỰ KIẾN** | — | — | **~200 – 300 TRIỆU** | **Bù đắp 35% – 50% tổng chi phí đầu tư.** |

*Dự báo điểm hòa vốn (Breakeven):* Doanh thu thu hồi 200–300M VND giúp giảm áp lực dòng tiền cho Founder; dự án dự kiến đạt điểm hòa vốn vận hành định kỳ từ Quý 2/2027 khi các Anchor chuyển đổi sang gói hợp đồng thuê bao Enterprise dài hạn ($300 – 500$ triệu VND/năm/Anchor).

---

# PHẦN V: QUẢN TRỊ RỦI RO, GIÁM SÁT PHÁP LÝ & TIÊU CHUẨN NGHIỆM THU
*(Kế thừa & Tích hợp trọn vẹn Chương 23 đến Chương 30 và Toàn bộ Phần E của Bản 90 Ngày)*

---

## CHƯƠNG 29: SỔ ĐĂNG KÝ RỦI RO HỢP NHẤT (CONSOLIDATED RISK REGISTER)

Hệ thống quản trị rủi ro của PMO tích hợp toàn diện 7 rủi ro chiến lược vĩ mô và 12 rủi ro thực địa ĐBSCL thành bảng ma trận 14 hạng mục trọng yếu:

| Mã | Rủi Ro Nhận Diện | Xác Suất | Tác Động | Chủ Sở Hữu | Biện Pháp Giảm Thiểu & Kế Hoạch Dự Phòng |
|:---:|:---|:---:|:---:|:---:|:---|
| **R01** | Không ký được hợp đồng Anchor nào trong 30 ngày đầu | Trung bình | **Rất cao** | BD Lead / Founder | Kích hoạt ngay Quy trình leo thang 3 mốc (Ngày 15, 21, 30); rà soát lại ICP; Founder hỗ trợ tiếp khách. |
| **R02** | Anchor ký hợp đồng nhưng nhân viên nội bộ tẩy chay, không dùng | **Cao** | **Cao** | Field Ops / PMO Lead | Cử Field Agent cắm chốt tại văn phòng/kho khách hàng 3 buổi/tuần "cầm tay chỉ việc"; đào tạo khen thưởng nội bộ. |
| **R03** | HTX và nông dân từ chối hợp tác nộp dữ liệu sổ sách | **Cao** | **Cao** | Field Agents | Đơn giản hóa nhập liệu tối đa qua Zalo Bot (chỉ 3 thao tác bấm chọn); Field Agent đối soát tận tay. |
| **R04** | Chất lượng dữ liệu quá thấp, sai lệch nhiều, không có giá trị | Trung bình | **Rất cao** | Tech Lead / Field Ops | Quy định kiểm tra ngẫu nhiên 10% sổ tay; dừng ngay việc mở rộng nếu tỷ lệ sai lệch vượt quá $30\%$. |
| **R05** | Technical Lead nghỉ việc đột xuất hoặc quá tải công việc | Thấp | **Rất cao** | PMO Lead / Founder | Tài liệu hóa 100% kiến trúc dữ liệu và API; chuẩn bị sẵn mạng lưới chuyên gia outsource dự phòng theo task. |
| **R06** | Doanh nghiệp Anchor gặp biến động tài chính hoặc đổi lãnh đạo | Thấp | **Cao** | BD Lead | Luôn duy trì đường ống song song tối thiểu $\ge 3$ ứng viên Anchor; không để phụ thuộc vào 1 khách hàng duy nhất. |
| **R07** | Bị cạnh tranh từ các đơn vị in tem QR giá rẻ (iCheck, SmartLife...)| Trung bình | Trung bình | BD Lead | Tuyên ngôn định vị sắc bén: GOTRACE làm hạ tầng dữ liệu và đối soát cân bằng khối lượng, không cạnh tranh bán tem QR. |
| **R08** | Quy định xuất khẩu (GACC, kiểm dịch) thay đổi đột ngột | Thấp | Trung bình | PMO Lead | Đa dạng hóa danh mục: Lúa gạo và Bếp ăn công nghiệp nội địa hoàn toàn không phụ thuộc vào Lệnh kiểm dịch Trung Quốc. |
| **R09** | Field Agent hoạt động kém hiệu quả, không hòa nhập địa phương | Trung bình | **Cao** | PMO Lead | Tuyển dụng đúng người bản địa am hiểu văn hóa nông nghiệp; thiết lập KPI tuần và đánh giá lại tại Ngày 30/60. |
| **R10** | Bội chi ngân sách vận hành thực địa | Trung bình | Trung bình | PMO Lead | Duy trì quỹ dự phòng 10% cố định; kiểm soát giải ngân hàng tuần; không duyệt chi ngoài phạm vi cam kết. |
| **R11** | Lệch lịch mùa vụ nông nghiệp làm chậm tiến độ pilot lúa | Thấp | Trung bình | PMO Lead | Bám sát lịch nông vụ: Vụ lúa Đông Xuân bắt đầu từ tháng 11, khớp hoàn hảo với thời điểm bấm nút Go-live. |
| **R12** | Sản phẩm phần mềm chưa đủ tính năng theo đòi hỏi của Anchor | Trung bình | **Rất cao** | Tech Lead | Đóng băng phạm vi pilot ở 1 luồng giá trị cốt lõi; kiên quyết từ chối phát triển tính năng tùy biến ngoài core graph. |
| **R13** | Bẫy gia công phần mềm theo yêu cầu (Custom-Project Trap) | Trung bình | **Rất cao** | PMO Lead | Giữ vững nguyên tắc: Chỉ phát triển tính năng có thể cấu hình và tái sử dụng cho toàn mạng lưới trên $80\%$. |
| **R14** | Bất ổn từ việc thay đổi quy định truy xuất nhà nước | Trung bình | Trung bình | PMO Lead | Xem quy định pháp lý là động cơ Rule Engine động; không mã hóa cứng quy định vào mã nguồn phần mềm. |

---

## CHƯƠNG 30: GIAO THỨC LEO THANG KHẨN CẤP CHO RỦI RO R01 (ESCALATION PROTOCOL)

Rủi ro lớn nhất trong 30 ngày đầu là **không ký được hợp đồng với Doanh nghiệp Đầu tàu (R01)**. Để không rơi vào thế bị động, PMO thiết lập quy trình phản ứng khẩn cấp tại 3 mốc thời gian:

```text
┌────────────────────────────────────────────────────────────────────────┐
│             QUY TRÌNH XỬ LÝ KHỦNG HOẢNG KÝ KẾT ANCHOR (R01)            │
├────────────────────────────────────────────────────────────────────────┤
│  NGÀY 15: CHƯA CÓ CUỘC GẶP VỚI NGƯỜI CÓ QUYỀN RA QUYẾT ĐỊNH            │
│  ├── Đánh giá: Chân dung khách hàng (ICP) đã chuẩn chưa? Kênh tiếp cận │
│  │   qua điện thoại có bị chặn bởi bảo vệ/thư ký không?                │
│  └── Hành động khẩn cấp: Founder GOTRACE trực tiếp kích hoạt các mối    │
│      quan hệ cá nhân cấp cao để cùng BD Lead đi gặp 1–2 lãnh đạo Anchor.│
│                                                                        │
│  NGÀY 21: ĐÃ GẶP NHƯNG CHƯA KHÁCH HÀNG NÀO CHẤP THUẬN DIAGNOSTIC       │
│  ├── Đánh giá: Bài thuyết trình có bị nặng về kỹ thuật không? Mức phí  │
│  │   30–50 triệu có bị xem là rào cản quá lớn không?                   │
│  └── Hành động khẩn cấp: Điều chỉnh ngay cấu trúc gói Diagnostic; cam   │
│      kết hoàn tiền $100\%$ nếu không chỉ ra được điểm nghẽn chuỗi;      │
│      đồng thời mở rộng tiếp cận thêm 5 ứng viên Anchor mới.            │
│                                                                        │
│  NGÀY 30: ĐÃ HẾT THÁNG MÀ VẪN CHƯA KÝ ĐƯỢC THỎA THUẬN NÀO              │
│  ├── BẤM NÚT DỪNG DỰ ÁN (STOP). Triệu tập cuộc họp bất thường với Founder.│
│  └── LỰA CHỌN 1 TRONG 3 NGẢ RẼ CHIẾN LƯỢC:                             │
│      ┌─ HƯỚNG A: Chuyển trọng tâm ngay sang Bếp ăn công nghiệp (Kitchen)│
│      │  (Ngành có nỗi đau ngộ độc thực phẩm bức thiết, không chờ mùa vụ).│
│      ├─ HƯỚNG B: Miễn phí gói Diagnostic đầu tiên để lấy chứng thực     │
│      │  (Chấp nhận mất doanh thu 50M ban đầu để đổi lấy một case-study).│
│      └─ HƯỚNG C: Thay đổi nhân sự phụ trách vị trí BD Lead nếu nguyên   │
│         nhân nằm ở năng lực giao tiếp và quan hệ thực tế.              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## CHƯƠNG 31: BẢNG TIÊU CHÍ ĐI TIẾP / DỪNG LẠI (GO / NO-GO GATES)

Quyền kiểm soát vận mệnh dự án được phân định minh bạch qua 5 cổng quyết định (Decision Gates):

| Cột Mốc Thời Gian | Tiêu Chuẩn Phê Duyệt ĐI TIẾP (GO) | Kịch Bản DỪNG LẠI & HÀNH ĐỘNG KHẮC PHỤC (NO-GO) |
|:---:|:---|:---|
| **Cổng Ngày 30** | Ký kết được $\ge 1$ Hợp đồng Diagnostic chính thức. | **DỪNG HỌP KHẨN:** Rà soát lại ICP, điều chỉnh giá chào bán hoặc kích hoạt Hướng A (chuyển sang Bếp ăn). |
| **Cổng Ngày 45** | Khảo sát thực tế và Live LOT Test đang chạy tại nhà máy. | **ĐÓNG BĂNG:** Tìm nguyên nhân gây nghẽn, tập trung gỡ khó tại nhà máy, tuyệt đối không nhận thêm khách mới. |
| **Cổng Ngày 60** | Có ít nhất $\ge 1$ LOT hàng hóa được truy xuất hoàn chỉnh. | **DỒN LỰC KỸ THUẬT:** Cử Tech Lead trực tiếp xuống nhà máy xử lý dứt điểm dữ liệu đứt gãy trong 7 ngày. |
| **Cổng Ngày 75** | Tỷ lệ nộp dữ liệu của các HTX đạt $\ge 50\%$. | **CHẤN CHỈNH FIELD OPS:** Kiểm điểm Field Agent, tổ chức đào tạo lại HTX, tạm hoãn mở rộng thêm HTX mới. |
| **Cổng Ngày 90** | Có ít nhất $\ge 1$ Pilot có kết quả cải thiện KPI đo được. | **GIA HẠN CÓ ĐIỀU KIỆN:** Cho phép chạy thêm 30 ngày chấn chỉnh trước khi Founder quyết định cấp vốn Phase 2. |

---

## CHƯƠNG 32: GIÁM SÁT PHÁP LÝ ĐỘNG HIỆN HÀNH (DYNAMIC REGULATORY WATCH)

Môi trường pháp lý tại Việt Nam luôn vận động không ngừng. PMO thiết lập cơ chế giám sát pháp lý động nhằm bảo vệ sản phẩm không bị lỗi thời:
- **Trường hợp điển hình của Thông tư 11/2026/TT-BCT:** Bộ Công Thương ban hành Thông tư 11/2026/TT-BCT quy định về truy xuất nguồn gốc thực phẩm, nhưng sau đó đã ban hành các quyết định tạm đình chỉ thi hành để lấy ý kiến sửa đổi và dự kiến công bố dự thảo thay thế trong giai đoạn cuối năm 2026.
- **Nguyên tắc thiết kế sản phẩm của PMO:** Tuyệt đối không mã hóa cứng (hard-code) các quy định pháp lý cụ thể vào mã nguồn lõi. Thay vào đó, toàn bộ quy định pháp lý được tách thành một lớp **Động cơ Quy tắc Thị trường có thể cấu hình (Configurable Market Rule Engine)**.
- **Vòng lặp phản ứng pháp lý của PMO:**
  $$\text{Theo dõi Pháp lý} \rightarrow \text{Cập nhật Rule Model} \rightarrow \text{Cập nhật Lời hứa Sales} \rightarrow \text{Cập nhật Đặc tả Sản phẩm}$$

---

## CHƯƠNG 33: GIÁM SÁT THỊ TRƯỜNG QUỐC TẾ & QUY ĐỊNH EUDR

Đối với các mặt hàng xuất khẩu chủ lực của ĐBSCL sang thị trường Liên minh Châu Âu (EU), Hoa Kỳ và Trung Quốc:
- **Cập nhật quy định chống phá rừng EUDR:** Ủy ban Châu Âu (EC) đã công bố công cụ hướng dẫn cập nhật vào tháng 07/2026, và quy định chính thức áp dụng từ cuối tháng 12/2026.
- **Định vị của GOTRACE:** GOTRACE không bán "chứng chỉ pháp lý EUDR", mà xây dựng **lớp dữ liệu số hóa thẩm định giải trình chuỗi cung ứng (Due Diligence Data Layer)** nhằm cung cấp tọa độ địa lý GPS polygon của từng thửa ruộng, bằng chứng không gây mất rừng và lịch sử canh tác hợp pháp.
- **Quy tắc chuyển tải pháp lý của PMO:**
  $$\text{Yêu cầu Pháp lý} \rightarrow \text{Yêu cầu Dữ liệu} \rightarrow \text{Yêu cầu Bằng chứng} \rightarrow \text{Yêu cầu Quy trình vận hành}$$
  *(Tuyệt đối cấm biến quy định pháp lý quốc tế thành khẩu hiệu tiếp thị rỗng tuếch).*

---

## CHƯƠNG 34: QUY CHUẨN ĐIỀU HÀNH GIAO HÀNG & BÁO CÁO RAG (DELIVERY & RAG PROTOCOL)

### 34.1 Bảy Nội Dung Đánh Giá Hàng Tuần (The 7 Weekly Delivery Checks)
Trong mỗi buổi họp giao ban triển khai Thứ Hai, PMO Lead kiểm tra nghiêm ngặt 7 yếu tố:
1. Tiến độ hoàn thành các công việc cam kết trong tuần trước.
2. Các rủi ro tiềm ẩn mới xuất hiện tại địa bàn.
3. Các vấn đề sự cố đang phát sinh ngoài hiện trường.
4. Chất lượng và độ đầy đủ của dữ liệu do HTX nộp.
5. Các điểm nghẽn xuất phát từ phía khách hàng (chưa ký giấy tờ, chưa cử người).
6. Các điểm nghẽn kỹ thuật từ phía đội ngũ sản phẩm (lỗi phần mềm, thiếu server).
7. Kế hoạch hành động cụ thể cho tuần tiếp theo.

Mọi điểm nghẽn (Blocker) bắt buộc phải có: **Người chịu trách nhiệm (Owner), Hạn chót xử lý (Due Date) và Quyết định can thiệp cần thiết (Decision Required).**

### 34.2 Tiêu Chuẩn Đèn Giao Thông RAG — Tuyệt Đối Không Giấu Rủi Ro Đỏ

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        QUY CHUẨN TRẠNG THÁI RAG                        │
├────────────────────────────────────────────────────────────────────────┤
│  🟢 GREEN (XANH): Đúng tiến độ cam kết; không có điểm nghẽn nguy hiểm. │
│  🟡 AMBER (VÀNG): Có rủi ro đe dọa cột mốc; cần hành động khắc phục ngay│
│  🔴 RED (ĐỎ):     Cột mốc bị đình trệ; BẮT BUỘC Founder/PMO can thiệp. │
└────────────────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Quy định đạo đức nghề nghiệp PMO:** Tuyệt đối nghiêm cấm việc che giấu trạng thái ĐỎ (RED) để làm đẹp báo cáo gửi Founder. Thà dũng cảm giơ cờ Đỏ vào Thứ Sáu để toàn đội dồn lực tháo gỡ vào Thứ Hai, còn hơn ôm sự cố ngấm ngầm dẫn đến việc vỡ trận pilot tại các Cổng Gate Review.

---

## CHƯƠNG 35: ĐỊNH NGHĨA HOÀN THÀNH — 6 TRỤ CỘT THỰC TẾ (DEFINITION OF DONE)

Một dự án thí điểm (Pilot) không thể được công nhận là **HOÀN THÀNH (DONE)** chỉ vì đã bàn giao xong app, in xong mấy cái mã QR hay giao diện bảng điều khiển nhìn bắt mắt.  
Pilot chỉ được công nhận là **DONE** khi thỏa mãn đồng thời **6 Trụ Cột Thực Tế**:

```text
  [1] Real Object: Có vật thể vật chất thật đang tồn tại (bao gạo, thùng xoài, khay cơm)
  [2] Real Data: Có dữ liệu ghi nhận thực từ các chủ thể chuỗi, không có dữ liệu mẫu tạo sẵn
  [3] Real Genealogy: Có liên kết phả hệ thông suốt từ nguồn nguyên liệu đến thành phẩm xuất xưởng
  [4] Real Evidence: Có bằng chứng số kiểm chứng được (phiếu cân, phiếu KCS, ảnh hiện trường)
  [5] Real Workflow: Quy trình vận hành thực tế đã chạy trơn tru qua bàn tay công nhân/nông dân
  [6] Acceptance Pass: Khách hàng ký vào biên bản kiểm thử nghiệm thu thực tế đạt yêu cầu
```

---

## CHƯƠNG 36: KHUNG NGHIỆM THU PMO 6 BƯỚC & 5 BẰNG CHỨNG BẮT BUỘC (ACCEPTANCE FRAMEWORK)

Mọi sản phẩm bàn giao (Deliverable) trong dự án GOTRACE bắt buộc phải vượt qua đường ống nghiệm thu 6 giai đoạn:

```text
  [1. SPEC]            Xác định rõ bản mô tả kỹ thuật và tiêu chí nghiệm thu
        ↓
  [2. BUILD]           Đội ngũ Kỹ thuật xây dựng tính năng / cấu hình dữ liệu
        ↓
  [3. TEST]            Chạy kiểm thử nội bộ trên môi trường Sandbox
        ↓
  [4. DEMO]            Trình diễn trực tiếp luồng nghiệp vụ trước sự chứng kiến của khách
        ↓
  [5. CUSTOMER VERIFY] Khách hàng tự tay thực hiện thao tác trên dữ liệu thực của họ
        ↓
  [6. ACCEPT]          Hai bên ký biên bản bàn giao nghiệm thu chính thức (Sign-off)
```

### Năm Loại Bằng Chứng Nghiệm Thu Bắt Buộc:
1. **Screenshot:** Ảnh chụp màn hình giao diện hệ thống thể hiện kết quả truy vết thành công.
2. **Test Result:** Báo cáo ghi nhận kết quả kiểm thử tự động và kiểm thử đối soát khối lượng.
3. **Data Sample:** Tệp dữ liệu mẫu được trích xuất từ database chứng minh cấu trúc schema chuẩn.
4. **Signed Acceptance:** Bản scan biên bản nghiệm thu có chữ ký và đóng dấu của Economic Buyer.
5. **System Log:** Bản ghi nhật ký hệ thống (Audit Trail) chứng minh thời gian và chủ thể thao tác.

---

# PHẦN VI: NHỊP VẬN HÀNH, HỆ THỐNG OKRs & HỆ SINH THÁI DASHBOARD
*(Kế thừa & Tích hợp trọn vẹn Chương 34 đến 39, Chương 42 đến 44 và Toàn bộ Phần G, H, I, J, K)*

---

## CHƯƠNG 37: NHỊP SINH HOẠT CỐ ĐỊNH & MẪU BÁO CÁO TUẦN 6 MỤC (WEEKLY CADENCE)

### 37.1 Lịch Họp Cố Định Của Đội Ngũ PMO Mekong

| Tên Cuộc Họp | Thời Gian & Tần Suất | Thành Phần Tham Dự | Thời Lượng | Đầu Ra Bắt Buộc |
|:---|:---|:---|:---:|:---|
| **Daily Standup** | 08h00 hàng ngày (Zalo) | PMO Lead + Field Agents | 15 phút | 3 câu hỏi: Hôm qua làm gì? Hôm nay làm gì? Đang kẹt gì? |
| **Weekly Review** | 08h30 sáng Thứ Hai | PMO + BD + Tech Lead | 60 phút | Đánh giá KPI tuần, rà soát tiến độ, gỡ bỏ các Blocker. |
| **Field Debrief** | 16h30 chiều Thứ Sáu | PMO Lead + Field Agents | 30 phút | Thu nhận phản ánh thực tế từ nông dân, HTX và thủ kho. |
| **Founder Update**| 17h30 chiều Thứ Sáu | PMO Lead + Founder | 30 phút | Báo cáo Dashboard, giải ngân ngân sách, xin ý kiến duyệt. |
| **Monthly Review**| Ngày cuối cùng của tháng | Toàn thể nhân sự + Founder | 90 phút | Đánh giá cột mốc tháng, bình xét Gate Review, lập kế hoạch mới. |

### 37.2 Mẫu Báo Cáo Tuần Chuẩn Hóa (Weekly Report Template)

```markdown
GOTRACE PMO WEEKLY REPORT — TUẦN [X] / THÁNG [M]
Thời gian: DD/MM/2026 | Người lập: PMO Lead Mekong

1. KPI SNAPSHOT (Tổng quan chỉ số tuần):
   • Số Hợp đồng Anchor đã ký: X / Chỉ tiêu
   • Số gói Chẩn đoán (Diagnostic) đang chạy: X
   • Số Pilot thực địa đang vận hành: X
   • Số HTX / Nhà cung ứng đã onboarded: X
   • Số LOT hàng hóa đã truy vết thành công: X

2. WINS TUẦN NÀY (Thành tích tiêu biểu — tối đa 3 gạch đầu dòng):
   → [Ghi rõ kết quả đạt được cụ thể, có số liệu minh chứng]

3. BLOCKERS & ISSUES (Điểm nghẽn cần tháo gỡ — ghi rõ Người phụ trách & Hạn chót):
   → Blocker 1: [Mô tả chi tiết] | Owner: [Họ tên] | Deadline: [Ngày/Giờ]
   → Blocker 2: [Mô tả chi tiết] | Owner: [Họ tên] | Deadline: [Ngày/Giờ]

4. NEXT WEEK PRIORITIES (3 Ưu tiên sống còn trong tuần tới):
   → Ưu tiên 1: [Mục tiêu cụ thể]
   → Ưu tiên 2: [Mục tiêu cụ thể]
   → Ưu tiên 3: [Mục tiêu cụ thể]

5. BUDGET STATUS (Kiểm soát ngân sách lũy kế đến hiện tại):
   • Đã giải ngân (Spent to date): X triệu VND
   • Cam kết chi (Committed): X triệu VND
   • Hạn mức khả dụng (Available): X triệu VND
   • Tỷ lệ phương sai ngân sách: +/- X% so với kế hoạch

6. TRAFFIC LIGHT SIGNAL (Tín hiệu cảnh báo sớm toàn dự án):
   → 🟢 ON TRACK (Tiến độ tốt) / 🟡 AMBER WATCH (Cần chú ý) / 🔴 RED ALERT (Khẩn cấp)
```

---

## CHƯƠNG 38: HỆ THỐNG OKRs 3 CẤP QUÝ 4/2026 (GOVERNANCE OKRs)

Hệ thống Mục tiêu & Kết quả Then chốt (OKRs) cho giai đoạn 90 ngày (Tháng 10 – 12/2026):

### 38.1 OKR Cấp PMO (Chỉ Huy Trưởng)
- **Objective:** Chứng minh GOTRACE tạo ra giá trị kinh tế thực tế đo lường được cho tối thiểu $\ge 1$ Doanh nghiệp Đầu tàu tại ĐBSCL trong 90 ngày.
  - *KR1:* Ký kết thành công $\ge 2$ Thỏa thuận Anchor Enterprise (Ưu tiên: Lúa gạo + Bếp ăn).
  - *KR2:* Khởi chạy thành công $\ge 1$ Pilot vận hành trên dữ liệu chuỗi thật.
  - *KR3 (Flagship KPI):* **Giảm thời gian truy vết hồ sơ 1 lô hàng từ 3–7 ngày xuống $< 30$ phút** tại ít nhất 1 khách hàng.
  - *KR4:* Onboard thành công $\ge 10$ HTX/Nhà cung ứng chủ động nhập liệu trên hệ thống.
  - *KR5:* Đạt doanh thu thu hồi tối thiểu $\ge 200$ triệu VND từ phí Diagnostic và Pilot.

### 38.2 OKR Cấp Kinh Doanh (Business Development)
- **Objective:** Xây dựng đường ống khách hàng B2B vững chắc, bảo đảm tỷ lệ chuyển đổi chốt thầu cao.
  - *KR1:* Thực hiện tối thiểu $\ge 15$ cuộc gặp trực tiếp với người có thẩm quyền chi tiền (Economic Buyer).
  - *KR2:* Thuyết trình gói Diagnostic Offer cho tối thiểu $\ge 6$ doanh nghiệp tiềm năng.
  - *KR3:* Ký kết chính thức tối thiểu $\ge 3$ hợp đồng Diagnostic có thu phí.
  - *KR4:* Tỷ lệ chuyển đổi từ gói Diagnostic sang Hợp đồng Pilot đạt tối thiểu $\ge 50\%$.

### 38.3 OKR Cấp Triển Khai Thực Địa (Field Operations)
- **Objective:** Đảm bảo dữ liệu hiện trường từ nông dân và HTX đạt chất lượng sạch, không có dữ liệu ảo.
  - *KR1:* Hoàn tất quy trình cài đặt và hướng dẫn cho tối thiểu $\ge 10$ HTX/nhà cung cấp vệ tinh.
  - *KR2:* Tỷ lệ nộp dữ liệu định kỳ của các HTX đạt $\ge 70\%$ (ít nhất 7/10 ngày có phát sinh dữ liệu).
  - *KR3:* Độ chính xác khi đối soát ngẫu nhiên so với sổ tay thực tế đạt $\ge 85\%$.
  - *KR4:* Tổ chức tối thiểu $\ge 20$ buổi tập huấn và hỗ trợ trực tiếp ngoài đồng ruộng/nhà kho.

---

## CHƯƠNG 39: BẢNG ĐIỀU KHIỂN GIÁM SÁT PMO THỰC ĐỊA (PMO ASCII DASHBOARD)

Bảng điều khiển trực quan cập nhật hàng tuần giúp PMO Lead và Founder nắm bắt toàn cảnh dự án trong 60 giây:

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    GOTRACE MEKONG PMO REAL-TIME DASHBOARD                       │
├─────────────────────────┬─────────────────────────┬─────────────────────────────┤
│  PIPELINE B2B (WS06)    │  PILOTS RUNNING (WS07)  │  FIELD OPS & HTX (WS07)     │
│  ─────────────────────  │  ─────────────────────  │  ─────────────────────────  │
│  • Total Prospects: 100 │  • Active Pilots: 01    │  • HTX Onboarded: 05        │
│  • Qualified Deals: 08  │  • Vertical: Rice 01    │  • Data Submission: 74%     │
│  • Diagnostic Signed: 02│  • Mass Balance: Active │  • Spot-Check Acc: 89%      │
│  • Enterprise Pilot: 01 │  • Target LOT: L26-R09  │  • Field Visits/Wk: 12      │
├─────────────────────────┼─────────────────────────┼─────────────────────────────┤
│  REVENUE TRACKER (VND)  │  BUDGET CONTROL (568M)  │  CONSOLIDATED RISKS (WS08)  │
│  ─────────────────────  │  ─────────────────────  │  ─────────────────────────  │
│  • Diagnostic: 80M      │  • Spent to Date: 185M  │  • R01 (No Anchor): 🟢 GREEN │
│  • Pilot Fees: 70M      │  • Committed: 95M       │  • R02 (User Reject): 🟡 AMBER│
│  • Invoiced Total: 150M │  • Available: 288M      │  • R03 (HTX Data): 🟢 GREEN  │
│  • 90-Day Target: 200M  │  • Variance: +2.1% (OK) │  • R12 (Feature Trap): 🟢 GREEN│
├─────────────────────────┴─────────────────────────┴─────────────────────────────┤
│  CHỈ SỐ CỜ ĐẦU (FLAGSHIP METRIC): THỜI GIAN TRUY XUẤT 1 LÔ HÀNG (TRACE TIME)    │
│  [Trước khi làm GOTRACE: 5.5 Ngày]  ───→  [Hiện tại trên GOTRACE: 18 Phút]       │
│  HIỆU QUẢ CẢI THIỆN: GIẢM 99.7% THỜI GIAN ĐỐI SOÁT HỒ SƠ LÔ HÀNG               │
├─────────────────────────────────────────────────────────────────────────────────┤
│  TIẾN ĐỘ CỔNG KIỂM SOÁT (MILESTONE GATES):                                      │
│  [x] Ngày 30: Ký Diagnostic Agreement   [x] Ngày 45: Live LOT Test thành công  │
│  [x] Ngày 60: Trace 1 LOT hoàn chỉnh    [ ] Ngày 75: Submission Rate > 70%     │
│  [ ] Ngày 90: Đóng gói Business Case & Trình duyệt Hội đồng Quản trị            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## CHƯƠNG 40: BẢNG ĐIỀU KHIỂN CẤP CAO DÀNH CHO FOUNDER (FOUNDER DASHBOARD)

### 40.1 Chín Chỉ Số Cấp Cao Dành Cho Nhà Sáng Lập
Founder không cần đọc báo cáo dài hàng chục trang. Founder chỉ cần nhìn 9 chỉ số vĩ mô:
1. **Pipeline Value:** Tổng giá trị có trọng số của các giao dịch trong phễu bán hàng.
2. **Top Strategic Accounts:** Tiến độ đàm phán với 3 Doanh nghiệp Đầu tàu lớn nhất.
3. **Pilot Status:** Tình trạng vận hành của pilot (Đạt tiến độ hay bị trễ hạn).
4. **Revenue Invoiced:** Tổng doanh thu thực tế đã xuất hóa đơn thu tiền.
5. **Cash Burn Rate:** Tốc độ tiêu tiền thực tế hàng tháng so với định mức ngân sách.
6. **Product Readiness:** Mức độ hoàn thiện của Core Graph và các phân hệ ngành.
7. **Top 3 Risks:** Ba rủi ro nguy hiểm nhất đang đe dọa sự sống còn của dự án.
8. **Decisions Pending:** Các quyết định chiến lược đang chờ Founder phê chuẩn.
9. **Network Reach:** Tổng số HTX, diện tích đất canh tác và sản lượng đã kết nối vào đồ thị dữ liệu.

### 40.2 Sáu Câu Hỏi Chất Vấn Hàng Tuần Của Founder (Weekly Provocative Questions)
Trong cuộc họp chiều Thứ Sáu, Founder chất vấn PMO Lead bằng 6 câu hỏi cốt lõi:
1. *Tuần này có thay đổi quan trọng nào xảy ra ở địa bàn ĐBSCL không?*
2. *Điều gì chúng ta đã KIỂM CHỨNG BẰNG DỮ LIỆU THẬT chứ không phải bằng giả định?*
3. *Đâu là điểm nghẽn lớn nhất đang chặn đứng tiến độ của toàn đội?*
4. *Cần tôi phải đưa ra quyết định hoặc can thiệp nguồn lực gì ngay bây giờ?*
5. *Những bằng chứng cụ thể nào ủng hộ cho quyết định đó?*
6. *Chúng ta NÊN DỪNG LÀM ĐIỀU GÌ để không lãng phí thời gian và tiền bạc?*

---

## CHƯƠNG 41: BẢNG ĐIỀU KHIỂN QUẢN TRỊ BÁN HÀNG B2B (SALES DASHBOARD)

Giám sát chuyển động của phễu bán hàng B2B qua 10 nấc và đo lường 5 tỷ lệ chuyển đổi cốt lõi (Conversion Velocity):

```text
  [Universe: 100 Accounts] 
       ↓ 
  [Contacted: 45] 
       ↓ 
  [Discovery Meetings: 18] 
       ↓ (Tỷ lệ Discovery → Qualified: Target ≥ 50%)
  [Qualified: 09] 
       ↓ (Tỷ lệ Qualified → Diagnostic: Target ≥ 40%)
  [Diagnostic Pitched: 06] 
       ↓ (Tỷ lệ Pitch → Signed Diagnostic: Target ≥ 50%)
  [Diagnostic Signed: 03] 
       ↓ (Tỷ lệ Diagnostic → Enterprise Pilot: Target ≥ 50%)
  [Pilot Agreement: 02] 
       ↓ (Tỷ lệ Pilot → Paid Long-term Contract: Target ≥ 75%)
  [Full Enterprise Contract: 01]
```

**Nguyên tắc điều hành kinh doanh:** Đội ngũ Sales không được tối ưu số lượng lead rác. Chỉ số đo lường hiệu năng thực sự của BD Lead là **Tốc độ chuyển đổi giữa các nấc phễu (Pipeline Velocity)** và số lượng hợp đồng Diagnostic có thu phí được ký kết.

---

## CHƯƠNG 42: BẢNG ĐIỀU KHIỂN TRIỂN KHAI KỸ THUẬT (DELIVERY DASHBOARD)

Theo dõi mức độ hoàn thiện kỹ thuật và sức khỏe hệ thống qua 8 tiêu chí định lượng:
1. **Data Completeness (%):** Tỷ lệ điền đủ các trường dữ liệu bắt buộc của 12 đối tượng cốt lõi.
2. **Lot Completeness (%):** Tỷ lệ các lô hàng có đầy đủ thông tin xuất xứ và mã định danh duy nhất.
3. **Event Completeness (%):** Tỷ lệ các bước vận chuyển, chế biến được ghi nhận sự kiện đúng hạn.
4. **Evidence Completeness (%):** Tỷ lệ các sự kiện chuỗi có đính kèm file bằng chứng (ảnh, phiếu cân).
5. **Integration Status:** Trạng thái kết nối API với cân điện tử và phần mềm của khách hàng.
6. **Test Pass Rate (%):** Tỷ lệ vượt qua các ca kiểm thử hồi quy và đối soát khối lượng.
7. **Open Critical Issues:** Số lượng sự cố kỹ thuật nghiêm trọng đang mở (Mục tiêu: Luôn bằng 0).
8. **Acceptance Status:** Tiến độ phê duyệt hồ sơ nghiệm thu kỹ thuật theo DoD 6 bước.

---

## CHƯƠNG 43: HỆ THỐNG 16 TÀI LIỆU PMO CỐT LÕI (CORE ARTIFACTS REPOSITORY)

Toàn bộ hệ thống quản trị tri thức của dự án GOTRACE Mekong được tổ chức phẳng tại thư mục `docs/` theo chuẩn mực 00–09 (Single-Tier Flat Hierarchy), kết nối liền mạch với Single Source of Truth [**00_MASTER_INDEX.md**](./00_MASTER_INDEX.md):

### 43.1 Danh Mục 10 Tài Liệu Hệ Thống Chính Thức (Official Core Documents)

| Mã | Tài liệu Chuẩn | Đường dẫn Tương đối | Vai trò trong Khung Quản trị PMO |
|:---:|:---|:---|:---|
| **00** | **Master Index & Navigator** | [`./00_MASTER_INDEX.md`](./00_MASTER_INDEX.md) | Single Source of Truth & Bản đồ điều hướng toàn hệ thống |
| **00** | **Executive Brief & Investment Thesis** | [`./00_Executive_Brief.md`](./00_Executive_Brief.md) | Tóm tắt điều hành cấp cao & Luận điểm đầu tư bảo vệ trước BOD |
| **01** | **Market Intelligence & GTM Strategy** | [`./01_Mekong_Market_Intelligence_GTM_2026_2030.md`](./01_Mekong_Market_Intelligence_GTM_2026_2030.md) | Chiến lược thị trường 21 chương, dữ liệu vĩ mô & Anchor Model |
| **02** | **Platform & Object Blueprint** | [`./02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md) | Kiến trúc nền tảng 9 Primitives & Định danh dữ liệu toàn cầu GCI |
| **03** | **Rice Playbook (Lúa gạo)** | [`./03_Rice_Playbook.md`](./03_Rice_Playbook.md) | Cẩm nang tác chiến chuỗi tuyến tính, 29 Events & 1Mha MRV |
| **04** | **Fruit Playbook (Trái cây)** | [`./04_Fruit_Playbook.md`](./04_Fruit_Playbook.md) | Cẩm nang tác chiến chuỗi rẽ nhánh, MSVT First-Class & Cold-chain |
| **05** | **Kitchen Playbook (Bếp ăn)** | [`./05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md) | Cẩm nang tác chiến chuỗi hội tụ, Incident Engine 60s & QĐ 1246 |
| **06** | **PMO Master Execution Plan** | [`./06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md) | Tài liệu này — Kế hoạch PMO Master 44 chương + 90 ngày (568M) |
| **07** | **Target Account Map** | [`./07_Target_Account_Map.md`](./07_Target_Account_Map.md) | Danh bạ 100 Anchor Accounts ĐBSCL & Điểm Network Value Scoring |
| **08** | **Sales Discovery Playbook** | [`./08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md) | Cẩm nang Discovery, 15 xử lý phản đối & Bộ kit 22 ấn phẩm |
| **09** | **Strategic Gap Analysis** | [`./09_Strategic_Gap_Analysis.md`](./09_Strategic_Gap_Analysis.md) | Phân tích khoảng trống chiến lược, bóc tách iCheck & Pháp lý |

### 43.2 Danh Mục 8 Phân Hệ Nghiệp Vụ Tích Hợp Sâu (Embedded Sub-Artifacts)

Nhằm tối ưu hóa trải nghiệm đọc và tránh phân mảnh tài liệu thành các file rời rạc ("ghost files"), 8 cấu phần nghiệp vụ PMO chuyên biệt đã được tích hợp sâu trực tiếp vào các tài liệu chủ lực tương ứng:

1. **`Diagnostic_Template` (Mẫu hồ sơ chẩn đoán chuỗi)**: Đã tích hợp trọn vẹn tại Phần D & F của [`./08_Sales_Discovery_Playbook.md`](./08_Sales_Discovery_Playbook.md).
2. **`Pilot_SOW_Template` (Mẫu hợp đồng phạm vi pilot)**: Đã chuẩn hóa thành các mục SOW tương ứng tại [`./03_Rice_Playbook.md`](./03_Rice_Playbook.md), [`./04_Fruit_Playbook.md`](./04_Fruit_Playbook.md) và [`./05_Kitchen_Playbook.md`](./05_Kitchen_Playbook.md).
3. **`Data_Dictionary` (Từ điển đối tượng dữ liệu)**: Đã tích hợp tại Mục 3–11 của [`./02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md).
4. **`Event_Model` (Mô hình 29 sự kiện chuỗi cung ứng)**: Đã tích hợp tại Bảng Canonical Events của [`./03_Rice_Playbook.md`](./03_Rice_Playbook.md).
5. **`Evidence_Model` (Mô hình chứng thư L1–L3)**: Đã tích hợp tại [`./02_Platform_Object_Implementation_Blueprint.md`](./02_Platform_Object_Implementation_Blueprint.md) và [`./04_Fruit_Playbook.md`](./04_Fruit_Playbook.md).
6. **`Consolidated_Risk_Register` (Sổ đăng ký 12 rủi ro)**: Đã tích hợp tại Chương 4 & Chương 18 của [`./06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md).
7. **`Decision_Log` (Nhật ký quyết định YAML)**: Đã quy định chuẩn hóa tại Chương 44 của [`./06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md).
8. **`KPI_Dashboard_Spec` (Quy chuẩn kỹ thuật chỉ số)**: Đã tích hợp tại Chương 5 & Chương 19 của [`./06_PMO_Master_Execution_Plan.md`](./06_PMO_Master_Execution_Plan.md).

---

## CHƯƠNG 44: NHẬT KÝ QUYẾT ĐỊNH YAML & VÒNG LẶP LIÊN PHÒNG BAN

### 44.1 Cấu Trúc Nhật Ký Quyết Định Chiến Lược Chuẩn Hóa YAML (YAML Decision Log)
Mọi quyết định chiến lược, kỹ thuật hoặc thương mại quan trọng của dự án bắt buộc phải được lập hồ sơ theo mẫu YAML 10 trường dữ liệu:

```yaml
decision_id: DEC-2026-001
decision: "Lựa chọn ngành Lúa gạo (Rice) làm Kiến trúc Tham chiếu đầu tiên để triển khai Pilot"
date: "2026-09-25"
owner: "Founder & PMO Lead"
context: >
  Dự án cần chứng minh năng lực mở rộng mạng lưới và xử lý dữ liệu khối lượng lớn tại ĐBSCL.
  Cần chọn giữa Lúa gạo, Trái cây hoặc Bếp ăn công nghiệp cho đợt triển khai 90 ngày đầu tiên.
options:
  - option_1: "Triển khai Lúa gạo trước (Quy mô lớn, tuyến tính, vụ Đông Xuân bắt đầu tháng 11)"
  - option_2: "Triển khai Trái cây trước (Giá trị cao, phân nhánh phức tạp nhưng đang trái vụ)"
  - option_3: "Triển khai Bếp ăn công nghiệp trước (Dễ tiếp cận, chạy quanh năm nhưng quy mô nhỏ)"
decision: "Chọn Option 1: Triển khai Lúa gạo làm mũi nhọn chính, kết hợp Bếp ăn làm dự phòng"
reason: >
  Lúa gạo sở hữu sự kết hợp hoàn hảo giữa quy mô thị trường (24 triệu tấn), cấu trúc doanh nghiệp
  rõ ràng, bài toán cân bằng khối lượng sấy lúa đo đếm được bằng tiền và khớp với vụ Đông Xuân.
evidence: >
  Đồng Tháp có 530.677 ha lúa, 133 HTX nông nghiệp và đang tham gia Đề án 1 triệu ha lúa của Bộ.
assumptions: >
  Doanh nghiệp chế biến lúa gạo có nhu cầu cấp bách về hồ sơ giải trình xuất khẩu sang EU/Mỹ.
revisit_trigger: >
  Nếu đến Ngày 30 không ký được hợp đồng Diagnostic nào trong ngành lúa gạo, lập tức chuyển sang Bếp ăn.
```

### 44.2 Vòng Lặp Vận Hành Khép Kín Liên Phòng Ban (Closed-Loop Operational Engine)
Hệ thống vận hành của GOTRACE là một cỗ máy phản hồi khép kín, nơi thông tin luân chuyển liên tục không có điểm nghẽn:

```text
                       [FOUNDER / CEO]
                 (Đưa ra giả thuyết chiến lược)
                              │
                              ↓
                        [SALES TEAM]
            (Thu thập bằng chứng thực tế từ khách hàng)
                              │
                              ↓
                         [PMO LEAD]
          (Thẩm định tính khả thi & chuẩn hóa yêu cầu)
                              │
                              ↓
                       [PRODUCT / TECH]
              (Phát triển tính năng trên Core Graph)
                              │
                              ↓
                        [FIELD OPS]
             (Triển khai thực địa & thu dữ liệu thật)
                              │
                              ↓
                         [PMO LEAD]
           (Đo lường KPI, nghiệm thu và lập báo cáo)
                              │
                              ↓
                       [FOUNDER / CEO]
            (Đánh giá kết quả & quyết định mở rộng)
```

---

# PHỤ LỤC QUẢN TRỊ & MẪU BIỂU VẬN HÀNH CHUẨN

## PHỤ LỤC 1: BẢNG TRA CỨU THUẬT NGỮ CHUYÊN NGHÀNH CHUẨN HÓA

| Thuật Ngữ Quốc Tế | Thuật Ngữ Tiếng Việt Chuẩn Hóa | Định Nghĩa Nghiệp Vụ Trong Hệ Thống GOTRACE |
|:---|:---|:---|
| **Anchor Enterprise** | Doanh nghiệp Đầu tàu | Doanh nghiệp chế biến/xuất khẩu đầu chuỗi có quyền kéo hàng chục HTX vệ tinh tham gia mạng lưới. |
| **Supply Chain Data Graph** | Đồ thị Dữ liệu Chuỗi Cung ứng | Cấu trúc dữ liệu dạng đồ thị kết nối các thực thể, lô hàng, sự kiện và bằng chứng thành mạng lưới liên thông. |
| **Linear Genealogy** | Phả hệ Tuyến tính | Dòng chảy dữ liệu đi thẳng tuần tự (1 nguồn $\rightarrow$ 1 đích), đặc trưng của chuỗi Lúa gạo. |
| **Branching Genealogy** | Phả hệ Phân nhánh | Dòng chảy dữ liệu từ 1 lô gốc tách thành nhiều lô con cấp chất lượng khác nhau, đặc trưng của Trái cây. |
| **Converging Genealogy** | Phả hệ Hội tụ | Dòng chảy dữ liệu từ nhiều nguyên liệu đầu vào gộp thành một mẻ thành phẩm, đặc trưng của Bếp ăn. |
| **Mass Balance** | Cân bằng Khối lượng | Phương trình đối soát vật chất giữa nguyên liệu đầu vào, hao hụt định mức và thành phẩm đầu ra. |
| **Reverse Trace** | Truy xuất Ngược dòng | Truy vết từ thành phẩm cuối chuỗi quay ngược lại nguồn gốc nguyên liệu và các hộ nông dân ban đầu. |
| **Forward Trace** | Truy xuất Xuôi dòng | Quét từ một điểm nghi vấn ô nhiễm ban đầu tỏa ra toàn bộ các lô thành phẩm và người tiêu dùng bị ảnh hưởng. |
| **Incident Blast Radius**| Bán kính Tác động Sự cố | Phạm vi khoanh vùng chính xác những mẻ thức ăn và đối tượng ăn phải lô nguyên liệu bị lỗi trong $\le 60$ giây. |
| **Evidence Hierarchy** | Thứ bậc Bằng chứng L1–L3 | Cấp độ chứng cứ: L1 (Tự khai báo) $\rightarrow$ L2 (Biên bản có chữ ký) $\rightarrow$ L3 (Dữ liệu IoT/Bên thứ ba). |
| **MSVT / MSCSĐG** | Mã số vùng trồng / Cơ sở đóng gói | Mã định danh truy xuất nguồn gốc nông sản do Cục Bảo vệ Thực vật cấp phục vụ xuất khẩu chính ngạch. |
| **GACC** | Tổng cục Hải quan Trung Quốc | Cơ quan ban hành Lệnh 248 và 249 quy định về đăng ký doanh nghiệp và an toàn thực phẩm xuất khẩu. |
| **EUDR** | Quy định Chống phá rừng Châu Âu | Đạo luật bắt buộc cung cấp định vị GPS polygon chứng minh nông sản không canh tác trên đất phá rừng. |
| **Definition of Done (DoD)**| Định nghĩa Hoàn thành | Tiêu chuẩn 6 trụ cột bắt buộc phải vượt qua để một cột mốc pilot được công nhận là hoàn thành thực tế. |

---

## PHỤ LỤC 2: CHECKLIST ĐÁNH GIÁ CỔNG KIỂM SOÁT GATE REVIEW 30 / 60 / 90

```markdown
BIÊN BẢN ĐÁNH GIÁ CỔNG KIỂM SOÁT GATE REVIEW
Dự án: GOTRACE Mekong — 90 Ngày Thâm Nhập Thực Địa

CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập — Tự do — Hạnh phúc
-----o0o-----

I. CỔNG KIỂM SOÁT NGÀY 30 (FOUNDATION GATE):
   [ ] Đã tiếp cận tối thiểu ≥ 10 ứng viên Anchor trong danh sách mục tiêu?
   [ ] Đã thực hiện tối thiểu ≥ 3 buổi Demo trực tiếp kịch bản nghiệp vụ?
   [ ] ĐÃ KÝ ĐƯỢC TỐI THIỂU ≥ 1 HỢP ĐỒNG DIAGNOSTIC CÓ THU PHÍ CHƯA?
   → QUYẾT ĐỊNH CỦA FOUNDER: [  ] BẤM NÚT GO    [  ] BẤM NÚT STOP (HỌP KHẨN)

II. CỔNG KIỂM SOÁT NGÀY 60 (PILOT LAUNCH GATE):
   [ ] Báo cáo Diagnostic Gap Report đã được Economic Buyer phê duyệt?
   [ ] Hợp đồng triển khai Pilot chính thức đã được ký kết?
   [ ] Tối thiểu 5 HTX vệ tinh đã được cấp mã và bắt đầu nộp dữ liệu?
   [ ] ĐÃ CÓ TỐI THIỂU ≥ 1 LOT HÀNG HÓA ĐƯỢC TRACE HOÀN CHỈNH TRÊN DỮ LIỆU THẬT?
   → QUYẾT ĐỊNH CỦA PMO LEAD: [  ] TIẾP TỤC SCALE   [  ] ĐÓNG BĂNG ĐIỀU CHỈNH

III. CỔNG KIỂM SOÁT NGÀY 90 (VALUE PROOF GATE):
   [ ] Chỉ số Flagship Trace Time có giảm từ 3–7 ngày xuống < 30 phút không?
   [ ] Báo cáo Cân bằng Khối lượng có chỉ ra sai lệch thực tế cho khách hàng không?
   [ ] Bản Business Case có số liệu tài chính thực tế đã được ký xác nhận?
   [ ] Doanh thu thu hồi có đạt mốc ≥ 200 triệu VND không?
   [ ] Khách hàng có đồng ý ký kết Hợp đồng Enterprise SaaS dài hạn không?
   → QUYẾT ĐỊNH HỘI ĐỒNG QUẢN TRỊ: [  ] PHÊ DUYỆT CẤP VỐN PHASE 2   [  ] GIA HẠN 30 NGÀY

Chữ ký phê chuẩn:
Founder / CEO GOTRACE                 PMO Lead Mekong                 BD Lead Mekong
(Ký và ghi rõ họ tên)             (Ký và ghi rõ họ tên)           (Ký và ghi rõ họ tên)
```

---

## PHỤ LỤC 3: CAM KẾT CHÍNH THỰC TỪ ĐỘI NGŨ THỰC HIỆN

Bản **Kế hoạch Vận hành PMO Master Toàn diện (06_PMO_Master_Execution_Plan.md)** này là kim chỉ nam điều hành tối cao của dự án GOTRACE tại vùng Đồng bằng sông Cửu Long trong giai đoạn 2026–2028. Mọi cá nhân khi tham gia vào dự án, từ cấp Lãnh đạo sáng lập đến nhân viên thực địa ngoài đồng ruộng, đều có trách nhiệm thấu suốt các triết lý, tuân thủ nghiêm ngặt các quy tắc kỷ luật và nỗ lực hết mình vì sự thành công của sứ mệnh xây dựng hạ tầng dữ liệu chuỗi cung ứng cho nền nông nghiệp Việt Nam.

---
*Tài liệu được hoàn tất tổng hợp và ban hành chính thức vào ngày 25 tháng 09 năm 2026.*  
**BẢN QUYỀN THUỘC VỀ GOTRACE MEKONG PROJECT MANAGEMENT OFFICE (PMO).**
