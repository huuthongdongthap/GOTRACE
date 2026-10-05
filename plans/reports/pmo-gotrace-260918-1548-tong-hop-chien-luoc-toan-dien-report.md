# BÁO CÁO TỔNG HỢP TOÀN DIỆN CHIẾN LƯỢC TRIỂN KHAI NỀN TẢNG GOTRACE V2.2
**Đơn vị chủ quản:** Công ty Cổ phần Tư vấn và Công nghệ ZAM Việt Nam  
**Căn cứ tác nghiệp:** Trụ sở PMO Sa Đéc – Quản lý địa bàn Tây Nam Bộ (Long An đến Cà Mau)  
**Thời gian lập:** Tháng 09/2026  
**Định vị:** Hạ tầng dữ liệu dùng chung, truy xuất chuỗi cung ứng, quản trị rủi ro và minh bạch thị trường  

---

## MỤC LỤC ĐIỀU HÀNH
1. [Bản chất kiến trúc & Mô hình dữ liệu GOTRACE V2.2](#1-ban-chat-kien-truc--mo-hinh-du-lieu-gotrace-v22)
2. [Mô hình kinh doanh nền tảng: B2B/B2B2G vs B2C](#2-mo-hinh-kinh-doanh-nen-tang-b2bb2b2g-vs-b2c)
3. [Vị thế & Thẩm quyền của PMO (Đại diện pháp luật ủy quyền)](#3-vi-the--tham-quyen-cua-pmo-dai-dien-phap-luat-uy-quyen)
4. [Lựa chọn ngách thực chiến: Chuỗi Bột & Sợi tươi Sa Đéc](#4-lua-chon-ngach-thuc-chien-chuoi-bot--soi-tuoi-sa-dec)
5. [Bản đồ đối thủ cạnh tranh (Competitors Analysis)](#5-ban-do-doi-thu-canh-tranh-competitors-analysis)
6. [Bản đồ đối tác chiến lược hệ sinh thái (Ecosystem Partners)](#6-ban-do-doi-tac-chien-luoc-he-sinh-thai-ecosystem-partners)
7. [Công thức đóng gói giải pháp: Data Infrastructure + Visual Proof](#7-cong-thuc-dong-goi-giai-phap-data-infrastructure--visual-proof)
8. [Khung chỉ số đánh giá & Tiêu chuẩn chấp nhận (AC / KPIs)](#8-khung-chi-so-danh-gia--tieu-chuan-chap-nhan-ac--kpis)
9. [Lộ trình hành động 90 ngày của PMO Sa Đéc](#9-lo-trinh-hanh-dong-90-ngay-cua-pmo-sa-dec)

---

## 1. BẢN CHẤT KIẾN TRÚC & MÔ HÌNH DỮ LIỆU GOTRACE V2.2

### 1.1. Triết lý thiết kế cốt lõi
* **"Connect, not replace" (Kết nối, không thay thế):** Nền tảng không ép buộc doanh nghiệp loại bỏ ERP, MES, WMS, TMS, LIMS, POS hay IoT hiện có. GOTRACE đóng vai trò lớp định danh, chuẩn hóa và điều phối liên thông dữ liệu.
* **"Append, do not silently rewrite" (Ghi nối tiếp, không ghi đè âm thầm):** Dữ liệu chuỗi sự kiện được ghi nhận bất biến theo thời gian (Event Ledger). Bất kỳ sự điều chỉnh nào đều phải tạo bản ghi hiệu chỉnh kèm bằng chứng kiểm toán (Audit Trail).
* **"Selective Disclosure" (Công bố có chọn lọc):** Minh bạch không đồng nghĩa với phơi bày toàn bộ dữ liệu nội bộ. Dữ liệu công khai cho người quét mã tách biệt hoàn toàn với bí mật kinh doanh (BOM, giá vốn, nhà cung cấp) và thông tin điều hành cơ quan Nhà nước.
* **"Federated by design" (Phân tán theo thiết kế):** Không bắt buộc gom toàn bộ payload về một cơ sở dữ liệu tập trung; GOTRACE quản trị Registry, Graph liên kết, Metadata và Evidence Index.

### 1.2. Hệ 9 Khái niệm nguyên thủy (Universal Core Primitives)
Mọi luồng nghiệp vụ chuỗi cung ứng được mô hình hóa dựa trên 9 primitives chuẩn:
1. `PARTY`: Chủ thể trong chuỗi (nông dân, HTX, nhà máy, đơn vị vận tải, trường học, cơ quan quản lý).
2. `PLACE`: Địa điểm vật lý hoặc định danh logic (vùng trồng lúa, cơ sở nghiền bột, nhà kho, bếp ăn).
3. `ITEM`: Đối tượng quản lý theo phân cấp: Sản phẩm (Product Class) $\rightarrow$ Lô sản xuất (Lot/Batch) $\rightarrow$ Định danh cá thể (Serial/Asset).
4. `EVENT`: Sự kiện chuỗi cung ứng (tương thích EPCIS 2.0): Thu hoạch, Giao nhận, Nghiền bột, Trộn, Đóng gói, Kiểm nghiệm, Vận chuyển, Tiêu thụ, Thu hồi.
5. `BUSINESS_CONTEXT`: Ngữ cảnh kinh doanh của sự kiện (Hợp đồng, Đơn mua hàng PO, Phiếu giao kho, Hồ sơ đấu thầu).
6. `CREDENTIAL`: Chứng nhận, chứng chỉ hoặc giấy phép (OCOP, HACCP, ISO 22000, VietGAP, Giấy chứng nhận cơ sở đủ điều kiện ATTP).
7. `SCOPE`: Phạm vi áp dụng của chứng chỉ hoặc quyền quản lý (theo địa bàn, ngành hàng, thời gian hiệu lực).
8. `EVIDENCE`: Bằng chứng gốc đính kèm (Phiếu kiểm nghiệm vi sinh/hóa lý, Biên bản bàn giao, Ảnh chụp lưu mẫu 24h, Nhật ký IoT).
9. `CASE`: Hồ sơ vụ việc quản lý (Cảnh báo ngộ độc, Khiếu nại của phụ huynh/người tiêu dùng, Lệnh đình chỉ hoặc thu hồi lô hàng).

```
   ┌─────────┐       creates       ┌──────────┐
   │  PARTY  │────────────────────▶│  EVENT   │◀── attaches ──┌────────────┐
   └────┬────┘                     └────┬─────┘               │  EVIDENCE  │
        │ owns/operates                 │ occurs at           │(Lab/Photo) │
        ▼                               ▼                     └────────────┘
   ┌─────────┐                     ┌──────────┐
   │  PLACE  │                     │  PLACE   │
   └─────────┘                     └──────────┘
        │ produces/stores               │ transforms/transfers
        ▼                               ▼
   ┌─────────┐       tracked by    ┌──────────┐
   │  ITEM   │◀────────────────────│ GCI Code │ (Decoupled from QR/RFID)
   └─────────┘                     └──────────┘
```

### 1.3. Cơ chế định danh chuẩn hóa GCI (GOTRACE Canonical Identifier)
* Cấu trúc định danh logic: `GT:<CC>:<TYPE>:<AUTHORITY>:<LOCAL-ID>`
  * Ví dụ mẻ bột gạo Sa Đéc: `GT:VN:LOT:SADEC-STARCH:LOT-20260918-01`
  * Ví dụ bếp ăn trường học: `GT:VN:PLACE:DONGTHAP-DOET:SCHOOL-KIMDONG-KITCHEN`
* **Nguyên tắc phân ly vật mang (Carrier-agnostic):** GCI là định danh dữ liệu logic, độc lập hoàn toàn với vật mang vật lý (QR Code, Barcode, RFID tag, NFC chip, URL Digital Link). Đổi tem nhãn in ấn không làm thay đổi bản ghi định danh GCI trong cơ sở dữ liệu.

### 1.4. Trạng thái tin cậy 3 tầng (Three-Tier Trust State)
1. **REGISTERED (Tự khai báo):** Doanh nghiệp/cơ sở tự đăng ký thông tin vào hệ thống. Chưa qua kiểm chứng.
2. **VERIFIED (Đã xác minh):** Dữ liệu được đối soát chéo với các nguồn dữ liệu tin cậy (hóa đơn điện tử, biên bản giao nhận 2 bên, hình ảnh hiện trường có định vị/thời gian thực).
3. **CERTIFIED (Đã chứng thực):** Dữ liệu được cấp bởi cơ quan có thẩm quyền hoặc tổ chức kiểm nghiệm độc lập đạt chuẩn (ISO/IEC 17025, Giấy chứng nhận ATTP của Chi cục).

---

## 2. MÔ HÌNH KINH DOANH NỀN TẢNG: B2B/B2B2G VS B2C

Phân tích đối chiếu từ tài liệu kiến trúc GOTRACE V2.2 và hạ tầng triển khai thực tế (`gotrace.vn`):

| Tiêu chí | Mô hình B2C (Thương mại điện tử) | Mô hình GOTRACE V2.2 (Data Infrastructure) |
| :--- | :--- | :--- |
| **Bản chất** | Sàn giao dịch mua bán, giỏ hàng, thanh toán online | Hạ tầng dữ liệu dùng chung, chuẩn hóa & liên thông dữ liệu |
| **Khách hàng thanh toán** | Người tiêu dùng cuối lẻ (B2C) | Doanh nghiệp sản xuất, chế biến, nhà thầu suất ăn, Cơ quan Nhà nước (B2B/B2G) |
| **Dữ liệu quản lý** | Giá bán lẻ, tồn kho ảo, đánh giá sao, khuyến mãi | Chuỗi sự kiện lô mẻ, bằng chứng kiểm nghiệm, trạng thái tuân thủ pháp lý |
| **Giao diện công khai** | Cửa hàng trực tuyến, thanh toán giỏ hàng | Cổng thông tin hồ sơ số (Public Digital Product Passport), tra cứu nguồn gốc và gửi phản ánh |
| **Dòng doanh thu** | Phí hoa hồng trên đơn hàng, phí quảng cáo hiển thị | Phí định danh GCI, phí duy trì hạ tầng dữ liệu, phí tích hợp API/Connector, gói giải pháp tuân thủ |

$\rightarrow$ **Kết luận:** GOTRACE là **Hạ tầng Dữ liệu B2B / B2B2G / B2B2C**, hoạt động như một "Đường ray dữ liệu chuẩn hóa" giúp doanh nghiệp phòng vệ pháp lý và giúp Nhà nước giám sát vĩ mô.

---

## 3. VỊ THẾ & THẨM QUYỀN CỦA PMO (ĐẠI DIỆN PHÁP LUẬT ỦY QUYỀN)

Cương vị **PMO kiêm Người đại diện hợp pháp theo ủy quyền của ZAM Việt Nam tại Sa Đéc** mang lại các đòn bẩy chiến lược vượt trội:

```
                      ┌────────────────────────────────────────┐
                      │  HỘI ĐỒNG QUẢN TRỊ / TỔNG GIÁM ĐỐC     │
                      │        CÔNG TY CỔ PHẦN ZAM VIỆT NAM    │
                      └───────────────────┬────────────────────┘
                                          │ Quyết định ủy quyền đại diện pháp luật
                                          │ Giấy ủy quyền tư cách tố tụng & ký kết
                                          ▼
                      ┌────────────────────────────────────────┐
                      │    PMO KEY PERSON / ĐẠI DIỆN HỢP PHÁP   │
                      │   Trụ sở tác nghiệp Sa Đéc (Tây Nam Bộ)│
                      └───────┬────────────────────────┬───────┘
                              │                        │
       Ký kết Thỏa thuận B2G  │                        │  Ký kết Hợp đồng B2B
                              ▼                        ▼
       ┌──────────────────────────────┐       ┌────────────────────────────────┐
       │ - Chi cục ATVSTP Đồng Tháp   │       │ - Nhà máy bột Bích Chi, Sa Giang│
       │ - Sở Khoa học & Công nghệ    │       │ - Tinh Bột Xanh, Hùng Hậu      │
       │ - Sở GD&ĐT / Phòng GD các TP │       │ - Nhà thầu suất ăn tập thể     │
       │ - Ban Giám đốc các Bệnh viện │       │ - HTX Bột Sa Đéc               │
       └──────────────────────────────┘       └────────────────────────────────┘
```

### Thẩm quyền tác nghiệp tại địa bàn:
1. **Ký kết biên bản ghi nhớ (MOU) Công - Tư:** Làm việc ngang hàng với Lãnh đạo Sở, Chi cục và Hiệu trưởng các trường mà không cần chờ đợi thủ tục xin dấu từ Hà Nội.
2. **Ký kết thỏa thuận bảo mật dữ liệu (NDA) & SLA doanh nghiệp:** Cam kết chịu trách nhiệm pháp lý cao nhất về tính toàn vẹn dữ liệu, giải tỏa nỗi lo bị lộ công thức, bí mật khách hàng của các nhà máy sản xuất.
3. **Kích hoạt quy trình xử lý khủng hoảng (Incident Triage):** Khi xảy ra sự cố nghi ngờ ngộ độc thực phẩm tại trường học/bệnh viện, đại diện pháp luật có quyền trích xuất dữ liệu audit trail, niêm phong hồ sơ số và cung cấp bằng chứng giải trình chính thức cho đoàn thanh tra liên ngành.

---

## 4. LỰA CHỌN NGÁCH THỰC CHIẾN: CHUỖI BỘT & SỢI TƯƠI SA ĐÉC

### 4.1. Cấu trúc chuỗi cung ứng khép kín tại Sa Đéc
Thay vì dàn trải vào ngành thủy sản xuất khẩu vốn tiêu tốn nhân lực và phụ thuộc rào cản quốc tế, mô hình tập trung vào **Chuỗi giá trị Bột gạo Sa Đéc $\rightarrow$ Sợi tươi $\rightarrow$ Bếp ăn tập thể & F&B**:

```
[Nông dân lúa gạo] ──▶ [Lò nghiền bột Sa Đéc] ──▶ [Xưởng tráng bún/hủ tiếu] ──▶ [Bếp ăn Trường học/KCN/BV]
 (Nguồn gốc giống)      (Ủ men, kiểm tra ẩm)       (Test Borax/Tinopal)         (Kiểm thực 3 bước QĐ 1246)
                                 │
                                 └──▶ [Chế biến sâu: Tinh Bột Xanh] ──▶ [Kinh tế tuần hoàn / ESG]
                                       (Ống hút gạo, phụ phẩm bã)        (Vật liệu tự hủy, thức ăn chăn nuôi)
```

### 4.2. Điểm nghẽn nghiệp vụ & Đòn bẩy pháp lý
1. **Kiểm soát hóa chất cấm:** Bột và sợi tươi truyền thống thường đối mặt với rủi ro lạm dụng chất tẩy trắng (Tinopal), chất bảo quản chống ôi (Formol) và hàn the (Borax). Nền tảng GOTRACE buộc các mẻ bột phải đính kèm `EVIDENCE` phiếu test nhanh trước khi xuất kho.
2. **Tuân thủ Quyết định 1246/QĐ-BYT:** 
   * Bếp ăn tập thể bắt buộc thực hiện **Kiểm thực ba bước** (Bước 1: Kiểm tra nguồn gốc thực phẩm nhập vào; Bước 2: Kiểm tra quá trình chế biến; Bước 3: Kiểm tra trước khi ăn).
   * **Lưu mẫu thức ăn 24 giờ:** Số hóa toàn bộ tem lưu mẫu thành bản ghi điện tử có timestamp và ảnh chụp niêm phong.
3. **Tuân thủ Nghị định 13/2023/NĐ-CP:** Dữ liệu phụ huynh, học sinh quét mã tra cứu bữa ăn được mã hóa bảo mật, đảm bảo quyền riêng tư người tiêu dùng.

---

## 5. BẢN ĐỒ ĐỐI THỦ CẠNH TRANH (COMPETITORS ANALYSIS)

```
                       ĐỘ PHỨC TẠP CÔNG NGHỆ / HẠ TẦNG
                                     ▲
                                     │
           [Nhóm 3: Phần mềm TXNG]   │      ★ GOTRACE V2.2
             (TraceVerified)         │   (Hạ tầng dữ liệu toàn diện,
         - Chi phí cao, khó nhập liệu│    Event-driven, QĐ 1246,
         - Nông dân dễ bỏ cuộc       │    Data + Media Evidence)
                                     │
─────────────────────────────────────┼──────────────────────────────────▶ KHẢ NĂNG
                                     │                                    ÁP DỤNG
           [Nhóm 1: Tem QR Tĩnh]     │      [Nhóm 2: Big Tech Viễn thông] THỰC CHIẾN
            (In ấn, SmartLife)       │         (VNPT Check, Viettel)
         - Giá rẻ, dữ liệu chết      │   - Triển khai theo chỉ tiêu hành chính
         - Vô giá trị khi có sự cố   │   - Hệ thống silo, thiếu nghiệp vụ ATTP
                                     │
```

### So sánh chi tiết 3 nhóm đối thủ:

| Tiêu chí | Nhóm 1: Tem QR Tĩnh Giá Rẻ | Nhóm 2: Big Tech Viễn Thông | Nhóm 3: TXNG Nông Nghiệp ODA | GOTRACE V2.2 (ZAM) |
| :--- | :--- | :--- | :--- | :--- |
| **Đại diện tiêu biểu** | SmartLife, Wincheck, cty in ấn bao bì | VNPT Check, Viettel v-Mark | TraceVerified, iCheck Trace | **GOTRACE V2.2** |
| **Cơ chế dữ liệu** | Mã tĩnh, trỏ về landing page cố định | Quản lý mã vạch gán theo doanh nghiệp | Nhập liệu nhật ký nông hộ thủ công | **Dynamic Event Ledger + GCI định danh logic** |
| **Khả năng Traceback** | **Không thể** (không có dữ liệu mẻ/lô) | Rất hạn chế (chỉ tới cấp sản phẩm) | Có, nhưng độ trễ nhập liệu cao | **Thời gian thực (< 15 phút truy vết tận mẻ)** |
| **Tích hợp hệ thống** | Không có kết nối | Đóng kín trong hệ sinh thái viễn thông | Cần đội ngũ tư vấn viết adapter riêng | **"Connect, not replace" (REST API, EPCIS 2.0)** |
| **Bảo vệ pháp lý** | Bằng 0 (không được tòa án chấp nhận) | Thấp (chỉ là nhật ký khai báo) | Trung bình (thiếu tích hợp khâu bếp ăn) | **Rất cao (Đầy đủ hồ sơ kiểm thực 3 bước QĐ 1246)** |
| **Chiến thuật vượt qua** | Nhấn mạnh trách nhiệm hình sự khi có ngộ độc | Hợp tác đấu nối dữ liệu, không cạnh tranh đường truyền | Tối giản giao diện 3 chạm, miễn phí dùng thử ban đầu | **Cung cấp giải pháp trọn gói: Dữ liệu + Media 4K** |

---

## 6. BẢN ĐỒ ĐỐI TÁC CHIẾN LƯỢC HỆ SINH THÁI (ECOSYSTEM PARTNERS)

### 6.1. Doanh nghiệp sản xuất & chế biến đầu tàu tại Sa Đéc
1. **Công ty TNHH Tinh Bột Xanh (Green Starch Co., Ltd):**
   * *Đại diện pháp luật:* Ông Phạm Đông Huy.
   * *Vị trí:* Xã Tân Phú Đông, TP. Sa Đéc.
   * *Sản phẩm chủ lực:* Ống hút từ tinh bột gạo (OCHAO), quai xách sinh học, sản phẩm tự hủy.
   * *Vai trò với GOTRACE:* **Đối tác biểu tượng (Flagship Partner) về Kinh tế tuần hoàn & ESG**. GOTRACE cấp Hộ chiếu số sản phẩm (Digital Product Passport) phục vụ thị trường xuất khẩu EU/Mỹ/Nhật.
2. **Công ty Cổ phần Thực phẩm Bích Chi (Bich Chi Food):**
   * *Sản phẩm:* Bột dinh dưỡng, phở, bún gạo, bánh tráng, bánh phồng tôm xuất khẩu.
   * *Vai trò với GOTRACE:* Cố vấn công nghiệp và đối tác tiêu thụ lớn cho mạng lưới bột nguyên liệu đạt chuẩn.
3. **Công ty Cổ phần Xuất nhập khẩu Sa Giang (Sa Giang - Thành viên Vĩnh Hoàn Corp):**
   * *Sản phẩm:* Bánh phồng tôm truyền thống, hủ tiếu Sa Đéc, các sản phẩm sau gạo.
   * *Vai trò với GOTRACE:* Mắt xích kết nối chuỗi cung ứng vào hệ thống phân phối bán lẻ hiện đại.
4. **Hợp tác xã Sản xuất & Cung ứng Bột Sa Đéc:**
   * *Quy mô:* Hàng trăm lò bột ướt truyền thống tại Tân Phú Đông, Tân Quy Đông.
   * *Vai trò với GOTRACE:* Vùng nguyên liệu cơ sở. GOTRACE số hóa việc giao nhận mẻ bột bằng mã GCI dán trên thùng chứa trung gian.

### 6.2. Khối tiêu thụ & Bếp ăn tập thể
1. **Hệ thống Trường mầm non & Tiểu học bán trú (TP. Sa Đéc, TP. Cao Lãnh):**
   * Đối tượng sử dụng trực tiếp sợi tươi (bún, hủ tiếu bánh canh) trong bữa ăn học đường.
   * Chịu áp lực nặng nề nhất từ phụ huynh học sinh và Phòng Giáo dục về an toàn thực phẩm.
2. **Bếp ăn Khu công nghiệp Sa Đéc (KCN Sông Hậu, C1, C2):**
   * Cung cấp hàng chục ngàn suất ăn công nhân mỗi ca. Nhu cầu kiểm soát nguồn gốc thực phẩm để tránh đình công hoặc ngộ độc diện rộng.
3. **Bệnh viện Đa khoa Sa Đéc & Bệnh viện Đa khoa Đồng Tháp:**
   * Cung cấp suất ăn bệnh lý, đòi hỏi tiêu chuẩn vệ sinh và hồ sơ lưu mẫu khắt khe bậc nhất.

### 6.3. Khối quản lý Nhà nước & Đơn vị kiểm nghiệm (Institutional B2G)
1. **Chi cục An toàn vệ sinh thực phẩm Đồng Tháp (Sở Y tế):** Đơn vị thẩm định hồ sơ bếp ăn tập thể và chỉ đạo thanh tra đột xuất.
2. **Chi cục Quản lý Chất lượng Nông Lâm sản và Thủy sản (Sở NN&PTNT):** Đơn vị cấp chứng nhận chuỗi cung ứng thực phẩm an toàn.
3. **Sở Khoa học & Công nghệ Đồng Tháp:** Đơn vị chủ trì thực hiện Đề án 100/QĐ-TTg của Thủ tướng Chính phủ về Cổng thông tin truy xuất nguồn gốc tỉnh.
4. **Trung tâm Kiểm nghiệm Thuốc - Mỹ phẩm - Thực phẩm Đồng Tháp / Quatest 3:** Đơn vị cung cấp `EVIDENCE` độc lập thông qua việc cấp phiếu kết quả thử nghiệm vi sinh/hóa lý.

---

## 7. CÔNG THỨC ĐÓNG GÓI GIẢI PHÁP: DATA INFRASTRUCTURE + VISUAL PROOF

Điểm nghẽn của các giải pháp công nghệ là **quá khô khan**, khiến lãnh đạo doanh nghiệp chỉ nhìn thấy "chi phí phần mềm" mà không thấy "doanh thu tăng thêm". PMO Sa Đéc áp dụng công thức đóng gói độc bản:

$$\text{Gói Giải Pháp Hoàn Hảo} = \text{Nền Tảng Dữ Liệu Tuân Thủ (GOTRACE)} + \text{Tư Liệu Truyền Thông 4K (Visual Proof)}$$

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│       HẠ TẦNG DỮ LIỆU GOTRACE        │     │     TƯ LIỆU TRUYỀN THÔNG 4K CHUỖI    │
│  (Phòng thủ pháp lý - Compliance)    │     │      (Tấn công thị trường - Sales)   │
├──────────────────────────────────────┤     ├──────────────────────────────────────┤
│ - Mã GCI từng lô bột / khay bánh     │     │ - Thước phim 4K điện ảnh quy trình   │
│ - Hồ sơ kiểm thực 3 bước QĐ 1246     │  +  │ - Cận cảnh test vi sinh, kiểm nghiệm │
│ - Bằng chứng số hóa lưu mẫu 24h      │     │ - Phỏng vấn cam kết của Hiệu trưởng/GĐ│
│ - Dashboard giám sát dành cho Sở     │     │ - Video quét mã hiển thị minh bạch   │
└──────────────────┬───────────────────┘     └──────────────────┬───────────────────┘
                   │                                            │
                   └─────────────────────┬──────────────────────┘
                                         │
                                         ▼
                   ┌───────────────────────────────────────────┐
                   │    BỘ HỒ SƠ THẦU & BÁN HÀNG BẤT KHẢ CHIẾN  │
                   │  - Nhà thầu dễ dàng trúng thầu suất ăn    │
                   │  - Cơ sở bột bán giá cao hơn thị trường  │
                   │  - Phụ huynh học sinh tuyệt đối an tâm    │
                   └───────────────────────────────────────────┘
```

* **Chiến thuật triển khai:**
  * Cung cấp phần mềm GOTRACE V2.2 với mức phí hạ tầng tối thiểu để xóa bỏ rào cản tài chính ban đầu.
  * Doanh thu và lợi nhuận được tạo ra từ **Gói sản xuất phim tư liệu minh bạch chuỗi cung ứng**: Biến các dữ liệu kỹ thuật vi sinh phức tạp thành video truyền thông hấp dẫn, giúp khách hàng sử dụng để đấu thầu và quảng bá thương hiệu.

---

## 8. KHUNG CHỈ SỐ ĐÁNH GIÁ & TIÊU CHUẨN CHẤP NHẬN (AC / KPIS)

Trích xuất từ Phụ lục B Đề án Thuyết minh GOTRACE V2.2:

### 8.1. Tiêu chuẩn chấp nhận kỹ thuật (Acceptance Criteria)
* **AC-01 (Universal Core):** Mô hình hóa hoàn chỉnh chuỗi Bột - Sợi tươi - Bếp ăn trên 9 primitives lõi mà không làm phá vỡ cấu trúc schema.
* **AC-03 (Traceforward Precision):** Từ 1 lô bột gạo bị nhiễm vi sinh, hệ thống phải truy xuôi chính xác 100% các khay sợi tươi thành phẩm và xác định đích danh trường học đã nhập lô hàng đó trong vòng dưới 15 phút.
* **AC-05 (Government Tiering):** Lãnh đạo Phòng GD&ĐT hoặc Trung tâm Y tế huyện chỉ xem dữ liệu trong địa bàn phụ trách; không xem chéo bí mật thương mại ngoài phạm vi quản lý.
* **AC-07 (Selective Disclosure):** Phụ huynh học sinh quét mã QR chỉ thấy kết quả kiểm định ATTP, ngày sản xuất và thực đơn; tuyệt đối không thấy giá mua nguyên liệu nội bộ của nhà thầu.
* **AC-TECH-01 (Evidence Integrity):** Mọi phiếu kiểm nghiệm vi sinh và ảnh chụp lưu mẫu 24h được băm nhỏ thành mã Hash SHA-256 kèm timestamp, chống sửa đổi nhật ký.

### 8.2. Hệ chỉ số KPI vận hành thực địa (Field KPIs)
1. **Trace Completeness (Độ trọn vẹn chuỗi):** $\ge 98\%$ các bước từ xuất bột $\rightarrow$ tráng bánh $\rightarrow$ giao bếp ăn được ghi nhận sự kiện `EVENT`.
2. **Traceback Latency (Thời gian truy vết ngược):** $\le 15$ phút từ lúc phát hiện cảnh báo đến khi xuất danh sách nguồn gốc mẻ bột.
3. **Automated Event Rate (Tỷ lệ tự động hóa):** $\ge 80\%$ sự kiện được xác nhận qua quét mã QR/Mobile App tại chỗ, không nhập hồi tố trên máy tính.
4. **False-Positive Recall Rate (Tỷ lệ thu hồi nhầm):** Giảm từ $100\%$ (thu hồi toàn bộ nhà máy theo cách truyền thống) xuống còn $< 5\%$ (chỉ thu hồi đúng lô mẻ bị lỗi).

---

## 9. LỘ TRÌNH HÀNH ĐỘNG 90 NGÀY CỦA PMO SA ĐÉC

```
[ THÁNG 1: THIẾT LẬP NỀN MÓNG ]
  │  - Ký kết biên bản hợp tác thí điểm với 01 HTX Bột (Tân Phú Đông)
  │  - Ký kết thỏa thuận đối tác biểu tượng ESG với Công ty TNHH Tinh Bột Xanh
  │  - Chọn 01 Trường Tiểu học bán trú tại Sa Đéc làm điểm thí điểm (Pilot Site)
  ▼
[ THÁNG 2: TRIỂN KHAI & ĐẤU NỐI KỸ THUẬT ]
  │  - Cài đặt ứng dụng GOTRACE Mobile cho cơ sở bột và nhân viên tiếp nhận bếp ăn
  │  - Số hóa quy trình Kiểm thực 3 bước và quy trình Lưu mẫu thức ăn 24h
  │  - Sản xuất 01 tập phim tư liệu 4K mẫu "Hành trình mẻ bột sạch từ làng nghề tới học đường"
  ▼
[ THÁNG 3: NGHIỆM THU & MỞ RỘNG QUY MÔ ]
  │  - Tổ chức Hội thảo Báo cáo kết quả thí điểm có sự tham dự của Chi cục ATVSTP & Sở GD&ĐT
  │  - Đóng gói "Sổ tay chuyển đổi số bếp ăn trường học an toàn"
  │  - Nhân rộng sang 10 trường học tại Cao Lãnh và 02 bếp ăn Khu công nghiệp Sa Đéc
```

---

## CÂU HỎI MỞ & RỦI RO CẦN QUẢN TRỊ (OPEN QUESTIONS)
1. **Mức độ sẵn sàng thiết bị tại bếp ăn:** Các nhân viên cấp dưỡng tại trường học có sẵn sàng dùng smartphone cá nhân để chụp ảnh kiểm thực 3 bước hay cần trang bị máy quét cầm tay chuyên dụng?
2. **Chi phí xét nghiệm vi sinh định kỳ:** Tần suất kiểm nghiệm nhanh mẫu bột (test kit nhanh) do cơ sở bột chi trả hay tính vào chi phí dịch vụ của nhà thầu suất ăn?
3. **Cơ chế chia sẻ dữ liệu liên ngành:** Cần văn bản hướng dẫn cụ thể từ UBND Tỉnh để quy định rõ thẩm quyền khai thác dữ liệu giữa ngành Y tế (quản lý ATTP bếp ăn) và ngành Nông nghiệp (quản lý cơ sở chế biến bột).
