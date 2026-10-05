# BÁO CÁO THỰC THI GIAI ĐOẠN P0: KÍCH HOẠT PHÁP LÝ & BỘ MÁY TIỀN PHƯƠNG SA ĐÉC
**Mã Báo Cáo:** `REP-PMO-P0-20260926`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Thực Phẩm Tây Nam Bộ  
**Địa Bàn:** TP. Sa Đéc (Đồng Tháp) → Cần Thơ, Long An, Cà Mau  
**Trách Nhiệm:** PMO Lead (Người đại diện hợp pháp)  

---

## 1. QUYẾT ĐỊNH ỦY QUYỀN ĐẠI DIỆN PHÁP LÝ KHU VỰC TÂY NAM BỘ

```
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập – Tự do – Hạnh phúc
----------o0o----------

QUYẾT ĐỊNH CỦA HỘI ĐỒNG QUẢN TRỊ / TỔNG GIÁM ĐỐC
CÔNG TY CỔ PHẦN CÔNG NGHỆ GOTRACE VIỆT NAM
(V/v: Thành lập Văn phòng Tiền phương PMO Tây Nam Bộ và Ủy quyền Người đại diện hợp pháp)

- Căn cứ Luật Doanh nghiệp số 59/2020/QH14;
- Căn cứ Điều lệ tổ chức và hoạt động của Công ty Cổ phần Công nghệ GOTRACE;
- Căn cứ Chiến lược phát triển thị trường Tây Nam Bộ giai đoạn 2026–2030;

QUYẾT ĐỊNH:

Điều 1: Thành lập Văn phòng Quản lý Dự án Tiền phương (PMO Forward Operating Base) tại TP. Sa Đéc, tỉnh Đồng Tháp.
Điều 2: Bổ nhiệm và Ủy quyền toàn diện cho PMO Lead làm Người đại diện hợp pháp của GOTRACE tại 13 tỉnh thành Đồng bằng Sông Cửu Long.
Điều 3: Phạm vi ủy quyền bao gồm:
  1. Đại diện làm việc, ký kết Biên bản ghi nhớ hợp tác (MOU) với Sở Khoa học & Công nghệ, Chi cục ATVSTP, Sở GD&ĐT các tỉnh ĐBSCL.
  2. Ký kết các Hợp đồng Dịch vụ Chẩn đoán Dữ liệu Chuỗi (Diagnostic Service) trị giá đến 50.000.000 VNĐ và Hợp đồng Triển khai Thí điểm (Pilot SOW) với các Doanh nghiệp Anchor, Bếp ăn tập thể trường học và KCN.
  3. Quản lý và điều hành trực tiếp ngân sách tác chiến 568.000.000 VNĐ cho giai đoạn 90 ngày.
  4. Đại diện phát ngôn và xử lý khủng hoảng truyền thông/pháp lý liên quan đến hệ thống dữ liệu truy xuất GOTRACE tại địa bàn.
Điều 4: Quyết định có hiệu lực kể từ ngày ký.
```

---

## 2. KHUNG THỎA THUẬN HỢP TÁC B2G VỚI SỞ KH&CN VÀ CHI CỤC ATVSTP

### 2.1 Đối với Sở Khoa học & Công nghệ tỉnh Đồng Tháp
- **Cơ sở pháp lý:** Đề án 100/QĐ-TTg và Thông tư 02/2024/TT-BKHCN về Quản lý truy xuất nguồn gốc sản phẩm hàng hóa.
- **Nội dung phối hợp:**
  1. Thiết lập cơ chế thử nghiệm có kiểm soát (Regulatory Sandbox) cho mã định danh toàn cầu GCI (`GT:VN:...`) trong chuỗi Tinh bột & Sợi tươi Sa Đéc.
  2. Đấu nối cổng dữ liệu mở phục vụ quản lý nhà nước về sản phẩm OCOP và làng nghề truyền thống.

### 2.2 Đối với Chi cục An toàn Vệ sinh Thực phẩm & Sở GD&ĐT
- **Cơ sở pháp lý:** Quyết định 1246/QĐ-BYT về Hướng dẫn thực hiện chế độ Kiểm thực 3 bước và Lưu mẫu thức ăn đối với cơ sở kinh doanh dịch vụ ăn uống.
- **Nội dung phối hợp:**
  1. Triển khai thí điểm Sổ số hóa Kiểm thực 3 bước thay thế sổ giấy thủ công tại các trường tiểu học bán trú và bếp ăn KCN Sa Đéc.
  2. Thiết lập quy trình phản ứng khẩn cấp: Giảm thời gian truy xuất lịch sử nguồn gốc bữa ăn khi có nghi ngờ sự cố xuống $\le 15$ phút.

---

## 3. CHECKLIST ONBOARDING 6 NHÂN SỰ & THIẾT LẬP TIỀN PHƯƠNG SA ĐÉC

| STT | Vị Trí | Nhân Sự | Nhiệm Vụ Tuần 1–2 | Bằng Chứng Nghiệm Thu (Evidence) |
|:---:|:---|:---:|:---|:---|
| 1 | **PMO Lead** | 01 | Nhận ủy quyền pháp lý, tiếp cận Sở KH&CN, duyệt Pilot Anchor | Biên bản bàn giao ủy quyền + Lịch làm việc Sở |
| 2 | **Tech Lead / SA** | 01 | Cấu hình Rule Engine K01–K12, kiểm thử offline LocalStorage | Bản dựng `pmo-web-app` chạy trên iPad KCS |
| 3 | **Field Agent 1** | 01 | Bám chốt cổng tiếp nhận Bếp ăn Sa Đéc (05:00–07:30 sáng) | Nhật ký kiểm thực 10 lô nguyên liệu tươi |
| 4 | **Field Agent 2** | 01 | Khảo sát 3 lò bột Sa Đéc, hướng dẫn cấp mã GCI lô sợi tươi 18h | Danh sách 3 lò bột được cấp mã `GT:VN:ITEM...` |
| 5 | **BD Lead** | 01 | Tiếp cận 5 Bếp ăn trường học/KCN, chào bán gói Diagnostic | 05 Biên bản tiếp xúc & Giả thuyết Nỗi đau |
| 6 | **BD Support** | 01 | Soạn thảo hồ sơ báo giá Diagnostic 30–50M và Pilot SOW | Trọn bộ Proposal & Báo giá sẵn sàng gửi khách |

---

## 4. TÀI LIỆU LIÊN KẾT
- Kế hoạch Tác chiến 90 Ngày: [`plans/90_DAY_FIELD_EXECUTION_PLAN.md`](../../plans/90_DAY_FIELD_EXECUTION_PLAN.md)
- Web App Vận Hành: [`pmo-web-app/src/components/tab-field-ops.tsx`](../../pmo-web-app/src/components/tab-field-ops.tsx)
