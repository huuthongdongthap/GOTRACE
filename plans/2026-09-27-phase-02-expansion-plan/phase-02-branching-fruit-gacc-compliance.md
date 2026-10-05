# GIAI ĐOẠN 2 - PHÂN KỲ 02: TRIỂN KHAI CHUỖI TRÁI CÂY (BRANCHING) & GACC COMPLIANCE (M2)
**Mã Tài Liệu:** `PLN-PHASE2-P02-FRUIT-BRANCHING-GACC`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Nông Sản Tây Nam Bộ  
**Thời Gian Thực Hiện:** Tuần 5 – Tuần 12 (Q2/2027)  
**Địa Bàn:** Đồng Tháp (Châu Thành, Cao Lãnh) $\rightarrow$ Cần Thơ (Trà Nóc) $\rightarrow$ Cửa khẩu Hữu Nghị / Cảng Cát Lái  
**Chủ Quản:** GIS/IoT Specialist, Solution Architect, Field Ops, Compliance/Legal Lead  

---

## 1. MỤC TIÊU CHIẾN LƯỢC CỦA PHÂN KỲ (OBJECTIVES)

1. **Chứng Minh Năng Lực Xử Lý Đồ Thị Phân Nhánh (Branching Graph):**
   - 1 Vùng trồng (MSVT) phân tách thành hàng trăm Lô hàng (`LOT`), phân bổ qua nhiều nhà đóng gói (`PACKING_HOUSE`), phân chia vào các container lạnh xuất khẩu và tiêu thụ nội địa.
2. **Số Hóa Mã Số Vùng Trồng (MSVT) Thành GIS Polygon:**
   - 100% vườn trồng Sầu riêng Ri6 (Châu Thành) và Xoài Cát Chu (Cao Lãnh) được định danh bằng tọa độ `GeoJSON Polygon` trên Primitive `PLACE`, chống gian lận dùng chung mã số xuất khẩu.
3. **Giám Sát Hành Trình Chuỗi Lạnh Container (Cold-chain IoT):**
   - Lắp đặt thiết bị cảm biến BLE/LoRaWAN/4G ghi nhận nhiệt độ ($2^\circ\text{C} - 5^\circ\text{C}$), độ ẩm ($80\% - 90\%$) và tọa độ GPS liên tục trên chặng đường vận chuyển 1.800 km ra cửa khẩu phía Bắc.
4. **Kiểm Soát Hạn Ngạch Xuất Khẩu Theo Lệnh 280 GACC:**
   - Động cơ Smart Contract tự động khóa lô hàng nếu khối lượng xuất khẩu lũy kế vượt quá diện tích và sản lượng thực tế của GIS Polygon vùng trồng.

---

## 2. KIẾN TRÚC DỮ LIỆU ĐỒ THỊ PHÂN NHÁNH (BRANCHING GRAPH ARCHITECTURE)

```
                       ┌──────────────────────────────────────────┐
                       │           VÙNG TRỒNG (MSVT)              │
                       │    Primitive: PLACE (GeoJSON Polygon)    │
                       │    VD: MSVT-DT-CR-7810 (Châu Thành)      │
                       └────────────────────┬─────────────────────┘
                                            │
                                            ▼
                       ┌──────────────────────────────────────────┐
                       │          SỰ KIỆN THU HOẠCH (HARVEST)     │
                       │           Primitive: EVENT (Lô Gốc)      │
                       └────────────────────┬─────────────────────┘
                                            │
                      ┌─────────────────────┴─────────────────────┐
                      ▼                                           ▼
       ┌─────────────────────────────┐             ┌─────────────────────────────┐
       │   LÔ NGUYÊN LIỆU LOẠI 1     │             │   LÔ NGUYÊN LIỆU LOẠI 2     │
       │   Primitive: LOT (Xuất khẩu)│             │   Primitive: LOT (Nội địa)  │
       └──────────────┬──────────────┘             └──────────────┬──────────────┘
                      │                                           │
         ┌────────────┴────────────┐                 ┌────────────┴────────────┐
         ▼                         ▼                 ▼                         ▼
  ┌──────────────┐          ┌──────────────┐  ┌──────────────┐          ┌──────────────┐
  │ CONTAINER 01 │          │ CONTAINER 02 │  │ SIÊU THỊ 01  │          │ NHÀ MÁY SẤY  │
  │ (Hữu Nghị)   │          │ (Cát Lái)    │  │ (Bách Hóa X) │          │ (Sa Giang)   │
  └──────────────┘          └──────────────┘  └──────────────┘          └──────────────┘
```

---

## 3. CÁC HÀNH ĐỘNG TRIỂN KHAI KỸ THUẬT & VẬN HÀNH

### Hành Động 1: Đo Đạc & Thẩm Định GIS Polygon Vùng Trồng (Tuần 5 – Tuần 7)
- Cử GIS Specialist phối hợp Chi cục Trồng trọt & BVTV Đồng Tháp xuống thực địa:
  - Dùng thiết bị RTK-GPS chuyên dụng đo ranh giới 50 héc-ta sầu riêng và 100 héc-ta xoài.
  - Tải lên Ledger GOTRACE định dạng chuẩn GeoJSON thông qua hàm API `GotraceApiClient.createPlace()`.
  - Thiết lập công thức chặn chồng lấn địa lý (Polygon Overlap Detection) để ngăn chặn việc 2 doanh nghiệp cùng đăng ký trùng một thửa đất vườn.

### Hành Động 2: Triển Khai Thiết Bị Cold-chain IoT Trên Xe Lạnh (Tuần 7 – Tuần 9)
- Thử nghiệm trên 20 chuyến xe container đường dài:
  - Cảm biến không dây Inkbird BLE gắn tại 3 vị trí trong container: Cửa gió lạnh, Giữa thùng, Cuối đuôi xe.
  - Bộ truyền Gateway tích hợp Sim 4G/GPS đặt tại cabin xe, liên tục gửi dữ liệu (mỗi 5 phút/lần) về Cổng GOTRACE IoT Gateway.
  - Cài đặt cảnh báo tự động qua tin nhắn Telegram/Zalo cho tài xế và chủ hàng khi nhiệt độ vượt ngưỡng $5.5^\circ\text{C}$ hoặc mất nguồn làm lạnh quá 20 phút.

### Hành Động 3: Cấu Hình Động Cơ Quản Trị Hạn Ngạch GACC (Tuần 9 – Tuần 11)
- Lệnh 280 GACC yêu cầu: *Sản lượng xuất khẩu $\le$ Diện tích canh tác $\times$ Năng suất bình quân được cấp phép*.
- Thuật toán `GaccQuotaEngine`:
  $$\text{Quota Khả Dụng} = \text{Diện Tích (ha)} \times \text{Năng Suất Định Mức (tấn/ha)} - \sum \text{Lô Đã Xuất Cửa Khẩu}$$
- Khi tạo lệnh đóng hàng xuất khẩu (`SHIPMENT_CREATION`):
  - Nếu $\text{Khối lượng lô} > \text{Quota Khả Dụng} \implies$ Từ chối cấp mã vận đơn điện tử GCI và gửi cảnh báo về hải quan.

### Hành Động 4: Đấu Nối Cổng Soi Chiếu X-quang & Metal Detector (Tuần 11 – Tuần 12)
- Tại Cụm đóng gói Trà Nóc:
  - Đấu nối cổng kiểm tra quang học & máy quét dị vật kim loại vào mạng nội bộ GOTRACE Edge Gateway.
  - Mọi thùng carton trái cây đạt chuẩn kiểm tra vật lý sẽ được máy in tự động phun mã QR GCI có chữ ký số xác nhận không chứa dị vật và côn trùng kiểm dịch (ruồi đục quả *Bactrocera*).

---

## 4. MA TRẬN ĐÁNH GIÁ RỦI RO CHUỖI TRÁI CÂY & GIẢI PHÁP

| Rủi Ro Phát Sinh | Tác Động | Nguyên Nhân Gốc | Giải Pháp Kỹ Thuật GOTRACE |
|:---|:---:|:---|:---|
| **Dư lượng Cadmium trong Sầu riêng** | Cực Cao | Thổ nhưỡng nhiễm phèn / Phân bón kém chất lượng | Bắt buộc đính kèm kết quả xét nghiệm test ICP-MS vào `LOT` trước khi đóng cont |
| **Dùng chung Mã Số Vùng Trồng ảo** | Cao | Gian lận thương mại gom hàng ngoài mã | Đối soát tọa độ thu hoạch vs Polygon vườn trên app nông dân |
| **Đứt gãy chuỗi lạnh gây thối hỏng** | Cao | Tài xế tắt máy lạnh tiết kiệm dầu | Cảm biến IoT độc lập pin 60 ngày gửi log bất biến lên cloud |
| **Cửa khẩu ùn tắc làm hết hạn kiểm dịch** | Trung Bình | Thủ tục hải quan chậm trễ | Tự động đồng bộ hóa hồ sơ điện tử e-Phyto sang cổng GACC trước khi xe tới biên giới |

---

## 5. TIÊU CHÍ NGHIỆM THU PHÂN KỲ M2 (GATE 2 PASS CRITERIA)

1. **Số hóa thực địa:** $\ge 50$ hộ nông dân và 150 héc-ta được tạo lập GIS Polygon hợp lệ trên hệ thống.
2. **Telemetry IoT:** 100% các chuyến container thử nghiệm có biểu đồ nhiệt độ và độ ẩm liên tục, không mất dữ liệu quá 15 phút.
3. **Pháp lý GACC:** 0 lô hàng bị hải quan Trung Quốc cảnh báo hoặc trả hàng do sai lệch hồ sơ vùng trồng hoặc vượt nhiệt độ bảo quản.
4. **Hiệu năng hệ thống:** Thời gian truy xuất ngược một thùng sầu riêng tại cửa khẩu về chính xác vườn trồng đạt $\le 3\text{ giây}$.
