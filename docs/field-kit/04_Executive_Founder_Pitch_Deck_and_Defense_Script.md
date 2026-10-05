# KỊCH BẢN THUYẾT TRÌNH 4 SLIDE & CẨM NANG PHẢN BIỆN BẢO VỆ DỰ ÁN
## BẢO VỆ KẾ HOẠCH TRIỂN KHAI 90 NGÀY PMO TÂY NAM BỘ TRƯỚC FOUNDER & BOD
**Dự án:** Nền tảng Dữ liệu Chuỗi Cung ứng & An toàn Thực phẩm GOTRACE V2.2  
**Người trình bày:** PMO Lead (Đại diện Ban Quản trị Dự án Tây Nam Bộ)  
**Thời lượng trình bày:** 15 Phút Thuyết trình + 15 Phút Chất vấn Phản biện (Q&A)  
**Công cụ tương tác trực tiếp:** Cổng điều hành trực tuyến [**`https://gotrace-pmo.pages.dev`**](https://gotrace-pmo.pages.dev)

---

## PHẦN I: CẤU TRÚC 4 SLIDE PITCH DECK ĐIỀU HÀNH

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                        4 SLIDE EXECUTIVE PITCH DECK — GOTRACE V2.2                      │
├──────────────────────────┬──────────────────────────┬───────────────────────────────────┤
│ SLIDE 1: NỖI ĐAU TỬ HUYỆT│ SLIDE 2: MŨI KHOAN CHIẾN │ SLIDE 3: BỘ MÁY 6 FTEs & LỘ TRÌNH │
│ 58 vụ ngộ độc H1/2026.   │ LƯỢC (TROJAN HORSE)      │ 90 NGÀY TÁC CHIẾN TẠI SA ĐÉC      │
│ QĐ 1246 siết chặt bếp ăn.│ Bột Sa Đéc 18h rủi ro cao│ Ngân sách 568M (715M Full equip). │
│ Bẫy B2C tem nhãn thất bại│ Gói Diagnostic 30-50M.   │ 4 Phân kỳ P0-P3. Cân điện tử IoT. │
│ B2B data infra là sốngcòn│ Nhân rộng mạng lưới 1:4.8│ Traceback sự cố ≤ 15 phút.        │
├──────────────────────────┴──────────────────────────┴───────────────────────────────────┤
│ SLIDE 4: MÔ HÌNH HÒA VỐN (THÁNG 7) & BẢN ĐỒ PHÒNG THỦ CẠNH TRANH                        │
│ ARR Năm 1: 1.02 Tỷ VNĐ. ROI +43%. Bức tường phòng thủ 3 lớp đè bẹp iCheck.              │
│ Tuân thủ Nghị định 13/2023/NĐ-CP (Zero PII). Tích hợp Cổng Quốc gia & Lệnh 280.         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## PHẦN II: LỜI THOẠI TRUYỀN CẢM HỨNG TỪNG SLIDE (VERBAL PRESENTATION SCRIPT)

### Slide 1: Bối Cảnh Thị Trường & Nỗi Đau Tử Huyệt (00:00 – 03:30)
> *"Kính thưa Anh/Chị trong Ban Điều Hành và Sáng Lập Viên GOTRACE,*  
> *Đồng bằng Sông Cửu Long là vựa lương thực khổng lồ của cả nước với 24 triệu tấn lúa và gần 7 triệu tấn trái cây mỗi năm. Nhưng tại sao 90% giải pháp công nghệ truy xuất nguồn gốc khi về miền Tây đều thất bại thảm hại?*  
> *Bởi vì họ rơi vào **'Bẫy bán lẻ'**: Bán những chiếc tem nhãn QR B2C thụ động vài trăm đồng, nơi doanh nghiệp chỉ tự khai báo mà không giải quyết được tính toàn vẹn dữ liệu chuỗi.*  
> *Hôm nay, một 'cửa sổ cơ hội vàng' chưa từng có vừa mở ra: Làn sóng siết chặt An toàn thực phẩm sau 58 vụ ngộ độc thương tâm trong 6 tháng đầu năm 2026. Bộ Y tế và Chi cục ATVSTP các tỉnh miền Tây đang tổng kiểm tra gắt gao việc thực hiện **Quyết định 1246/QĐ-BYT** về Kiểm thực 3 bước và Lưu mẫu 24h.*  
> *Các Bếp ăn bán trú trường học và Suất ăn công nghiệp KCN đang đối mặt với nỗi sợ hãi tột cùng: Bị phạt 80 triệu, đình chỉ hoạt động, và mất hợp đồng hàng chục tỷ nếu để xảy ra ngộ độc mà không chứng minh được nguồn gốc. GOTRACE không bán tem nhãn; chúng tôi bán **Hạ tầng Dữ liệu Bảo Hiểm Tuân Thủ (Compliance Infrastructure)** giải quyết đúng nỗi đau sống còn này."*

### Slide 2: Mũi Khoan Trojan Horse & Hệ Số Nhân 1:4.8 (03:30 – 07:30)
> *"Để thâm nhập thị trường mà không gặp rào cản, chúng tôi sử dụng chiến lược **Trojan Horse (Mũi khoan Ngựa gỗ Thành Troy)**:*  
> *1. **Điểm đột phá:** Chọn Tinh bột & Sợi tươi Sa Đéc. Đây là nguyên liệu nhạy cảm nhất ĐBSCL với hạn sử dụng chỉ 18 giờ, nguy cơ sinh độc tố vi sinh Bacillus cereus và áp lực kiểm soát hóa chất Tinopal, Hàn the.*  
> *2. **Vũ khí thương mại:** Chúng tôi không ép khách hàng ký ngay hợp đồng SaaS tiền trăm triệu. Chúng tôi chào bán **Gói Chẩn Đoán Hiện Trạng Chuỗi Cung Ứng (Diagnostic Service)** trị giá 30–50 triệu VNĐ triển khai trong 2–4 tuần. Điểm đặc sắc là cam kết: **Hoàn 100% chi phí khấu trừ vào Hợp đồng Thuê bao SaaS năm đầu**.*  
> *3. **Hệ số nhân mạng lưới 1 : 4.8:** Khi chiếm lĩnh được 1 Bếp ăn hạt nhân, Bếp ăn đó sẽ tự động bắt buộc trung bình **4.8 Nhà cung cấp vệ tinh** thuộc 4 Trụ cột Thực phẩm (Tinh bột Sa Đéc, Đạm CP/Vissan, Trứng Ba Huân, Rau an toàn) phải đấu nối tài khoản lên GOTRACE. Chiếm 1 điểm mỏ neo, kéo theo cả một mạng lưới chuỗi giá trị."*

### Slide 3: Kế Hoạch 90 Ngày & Ngân Sách 568 Triệu VNĐ (07:30 – 11:30)
> *(Chuyển màn hình sang Tab 4 và Tab 8 trên `https://gotrace-pmo.pages.dev`)*  
> *"Thưa Ban Điều Hành, để hiện thực hóa chiến lược này tại TP. Sa Đéc, chúng tôi đã lập kế hoạch tác chiến 90 ngày với 4 phân kỳ rõ ràng:*  
> *- **P0 (Tuần 1–2):** Ký ủy quyền pháp lý, mở Văn phòng Tiền phương tại Sa Đéc, onboard bộ máy 6 nhân sự nòng cốt (1 PMO Lead, 1 Tech Ops, 2 Field Ops, 2 BD).*  
> *- **P1 (Tuần 3–6):** Bắt tay Hội Ngành bột Sa Đéc, tiếp cận 2 Cụm Bếp ăn, ký kết Gói Diagnostic đầu tiên trị giá 35–50 triệu.*  
> *- **P2 (Tuần 7–10):** Đưa chuỗi vào Live Pilot, số hóa kiểm thực bằng Cân điện tử Bluetooth, tổ chức Diễn tập Phản ứng Sự cố Traceback $\le 15$ phút trước sự thị sát của Chi cục ATVSTP.*  
> *- **P3 (Tuần 11–12):** Đối soát Cân bằng khối lượng (Mass Balance), ký Hợp đồng SaaS 120–180 triệu, kéo 5 NCC vệ tinh và đóng gói Case Study nhân rộng sang Cần Thơ & Long An.*  
> *Toàn bộ ngân sách 90 ngày được kiểm soát nghiêm ngặt ở mức **568.000.000 VNĐ** (Baseline) hoặc **715.000.000 VNĐ** (kèm trọn bộ thiết bị đo kiểm hiện trường)."*

### Slide 4: Mô Hình Tài Chính Hòa Vốn & Bản Đồ Phòng Thủ (11:30 – 15:00)
> *(Chuyển màn hình sang Bảng tính ROI trên Tab 1 và Bản đồ Phòng thủ trên Tab 13)*  
> *"Về mặt tài chính, mô hình dòng tiền chứng minh:*  
> *- Với 30 điểm bếp ăn mỏ neo được onboard trong năm đầu, doanh thu đạt **1.020.000.000 VNĐ**.*  
> *- Dự án đạt **Điểm hòa vốn (Break-even) chỉ sau 7 tháng vận hành**, mang lại tỷ suất sinh lời **+43%** so với vốn đầu tư ban đầu.*  
> *Về mặt cạnh tranh, chúng tôi dựng lên **Bức tường lửa 3 lớp** mà đối thủ iCheck không thể chạm tới:*  
> *1. iCheck là ứng dụng B2C đọc mã vạch tĩnh; GOTRACE là Hạ tầng Dữ liệu B2B/B2B2G xác thực qua Cân bằng khối lượng và IoT lạnh.*  
> *2. Tuyệt đối tuân thủ **Nghị định 13/2023/NĐ-CP**: Chúng tôi chỉ định danh lô hàng GCI ẩn danh, không thu thập dữ liệu cá nhân phụ huynh/học sinh, triệt tiêu mọi rủi ro pháp lý.*  
> *3. Kiến trúc sẵn sàng đấu nối vào Cổng Truy Xuất Nguồn Gốc Quốc Gia và chuẩn xuất khẩu Lệnh 280.*  
> *Tôi xin khẳng định: Kế hoạch này khả thi 100%, kiểm soát rủi ro triệt để và là bàn đạp vững chắc nhất để GOTRACE thống lĩnh toàn bộ thị trường miền Nam."*

---

## PHẦN III: DIỄN TẬP PHẢN BIỆN CHUYÊN SÂU 4 CÂU HỎI GAI GÓC (GRILL-ME DRILL)

### Câu Hỏi 1 (Founder hỏi): "Tại sao không tập trung đánh vào Thủy sản xuất khẩu (Cá tra, Tôm) vốn là thế mạnh của Đồng Tháp mà lại chọn Bếp ăn tập thể & Bột Sa Đéc?"
- **Phản biện sắc bén của PMO Lead:**  
  *"Thưa Anh/Chị, ngách Thủy sản xuất khẩu có quy mô lớn nhưng là một **'vùng biển đỏ đẫm máu'**. Các tập đoàn lớn như Vĩnh Hoàn, Minh Phú đã chi hàng triệu USD cho các hệ thống ERP quốc tế như SAP, Infor hay MES chuyên dụng. Chu kỳ bán hàng (Sales Cycle) kéo dài 9–18 tháng và họ kiểm soát chuỗi khép kín, GOTRACE rất khó thâm nhập với tư cách là giải pháp mới.*  
  *Ngược lại, **Bếp ăn tập thể và Làng bột Sa Đéc là một 'đại dương xanh'** đang quằn quại trong nỗi đau tuân thủ. Các bếp ăn đang dùng sổ sách giấy ghi chép tay, bị thanh tra phạt liên tục và chưa có bất kỳ phần mềm chuyên dụng nào giải quyết được bài toán Kiểm thực 3 bước và Lưu mẫu 24h. Chu kỳ bán hàng của gói Diagnostic chỉ mất **2–4 tuần**, thu tiền tươi ngay, tạo dòng tiền nuôi bộ máy và xây dựng mạng lưới dữ liệu từ gốc."*

### Câu Hỏi 2 (BOD hỏi): "Đối thủ iCheck đã có mặt ở khắp nơi và được nhiều cơ quan địa phương biết đến, GOTRACE lấy gì để cạnh tranh và không bị họ sao chép?"
- **Phản biện sắc bén của PMO Lead:**  
  *"iCheck và GOTRACE giải quyết hai bài toán hoàn toàn khác nhau:*  
  *1. **Bản chất công nghệ:** iCheck bán con tem QR tĩnh quét bằng điện thoại, ai cũng dán được và ai cũng in nhái được (Self-declaration). GOTRACE vận hành **Hạ tầng Dữ liệu Sự kiện (Event-driven Ledger)** với định danh GCI, yêu cầu đối soát Cân bằng khối lượng (Mass Balance) giữa nguyên liệu đầu vào và thành phẩm bán ra, chặn đứng hành vi dán tem khống.*  
  *2. **Năng lực hiện trường:** iCheck không có đội ngũ Field Ops cắm chốt tại cổng bếp cùng cân điện tử IoT để đo nhiệt độ chuỗi lạnh và lập biên bản lưu mẫu 24h.*  
  *3. **Độ sâu pháp lý:** Chúng tôi ký kết trực tiếp với Sở KH&CN và Chi cục ATVSTP Đồng Tháp dựa trên quy chuẩn kỹ thuật QĐ 1246 chứ không chỉ dừng ở việc bán dịch vụ truyền thông tem nhãn."*

### Câu Hỏi 3 (CFO hỏi): "Ngân sách 568 triệu VNĐ cho 90 ngày với 6 nhân sự tại Sa Đéc, nếu hết 90 ngày khách hàng không chịu chuyển sang Hợp đồng SaaS thì phương án thu hồi vốn là gì?"
- **Phản biện sắc bén của PMO Lead:**  
  *"Chúng tôi đã thiết kế cấu trúc tài chính có chốt chặn an toàn 2 tầng:*  
  *1. **Tầng 1 - Thu tiền ngay từ Gói Diagnostic:** Mục tiêu 90 ngày là ký kết ít nhất 2–3 Hợp đồng Diagnostic (35–50M/hợp đồng), mang về ngay **100–150 triệu VNĐ** doanh thu dịch vụ ngắn hạn trong tháng thứ hai. Số tiền này đủ bù đắp toàn bộ chi phí văn phòng và thiết bị.*  
  *2. **Tầng 2 - Khóa chặt dữ liệu (Data Lock-in):** Khi Bếp ăn và 4.8 Nhà cung cấp đã vận hành qua cổng GCI trong 4 tuần, toàn bộ hồ sơ kiểm thực điện tử để trình cơ quan thanh tra đều nằm trên hệ thống GOTRACE. Nếu quay lại sổ giấy, họ đối mặt ngay với nguy cơ bị xử phạt 20–80 triệu đồng. Vì chi phí Diagnostic được khấu trừ 100% vào SaaS, chi phí gia hạn thêm chỉ còn 80–130 triệu/năm, ROI quá rõ ràng nên tỷ lệ từ chối là cực kỳ thấp.*  
  *3. **Tài sản bàn giao:** Dù trường hợp xấu nhất xảy ra, GOTRACE vẫn sở hữu 1 bộ dữ liệu chuỗi cung ứng thực tế, 1 Case Study mẫu đã quay phim tài liệu 4K để bán hàng cho các KCN tại Cần Thơ và Long An."*

### Câu Hỏi 4 (Legal/Compliance hỏi): "Học sinh và công nhân là đối tượng nhạy cảm, số hóa dữ liệu bếp ăn có nguy cơ vi phạm Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân không?"
- **Phản biện sắc bén của PMO Lead:**  
  *"Chúng tôi khẳng định 100% tuân thủ Nghị định 13/2023/NĐ-CP nhờ nguyên tắc thiết kế **Zero-PII (Không lưu dữ liệu định danh cá nhân)**:*  
  *1. Hệ thống GOTRACE chỉ quản lý các thực thể vật lý: Lô hàng (`BATCH`), Địa điểm (`PLACE`), Sự kiện nhập xuất (`EVENT`), Nhiệt độ và Khối lượng.*  
  *2. Trong quy trình kiểm thực bếp ăn trường học, hệ thống chỉ ghi nhận: 'Suất ăn Khối 1 — Lớp 1A — Số lượng 35 suất', tuyệt đối **không lưu tên, không lưu hình ảnh, không lưu số điện thoại hay thông tin phụ huynh/học sinh**.*  
  *3. Khi cần khoanh vùng phơi nhiễm sự cố, hệ thống truy xuất theo 'Số lượng suất ăn đã phân phối đến Lớp 1A lúc 11:15', việc chăm sóc y tế cụ thể do Cán bộ Y tế học đường thực hiện theo sổ điểm danh nội bộ của Nhà trường, đảm bảo dữ liệu công nghệ của GOTRACE hoàn toàn vô danh hóa (Anonymized) và an toàn tuyệt đối trước pháp luật."*
