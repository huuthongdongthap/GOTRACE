# GOTRACE TÂY NAM BỘ — LỘ TRÌNH TRIỂN KHAI 3 GIAI ĐOẠN (2026 – 2028+)
## Chiến lược Hạ tầng Dữ liệu Chuỗi Cung ứng & Kích hoạt Mạng lưới (Supply Chain Data Infrastructure & Network Enablement)

- **Mã tài liệu:** `GOTRACE-TNB-DOC-03`
- **Chủ trì soạn thảo:** PMO & Operations Strategy Specialist Worker
- **Cơ quan phê duyệt:** Founder & Hội đồng Quản trị (BOD) GOTRACE / ZAM Vietnam
- **Địa bàn trọng điểm:** Đồng bằng sông Cửu Long (Trọng tâm: Đồng Tháp – Cần Thơ – TP.HCM)
- **Ngày ban hành:** Tháng 9/2026
- **Trạng thái:** Bản đệ trình chính thức (Official Submission)

---

## 1. TỔNG QUAN CHIẾN LƯỢC & LOGIC KIẾN TRÚC LỘ TRÌNH

### 1.1 Ba Đối Tượng Chuỗi Cung Ứng — Ba Tô-pô Đồ Thị Dữ Liệu
Chiến lược thâm nhập Tây Nam Bộ của GOTRACE không triển khai dàn trải theo kiểu "phần mềm quản trị chung chung", mà được thiết kế khoa học dựa trên 3 Archetype chuỗi cung ứng đặc trưng, đại diện cho 3 cấu trúc đồ thị dữ liệu (Graph Topologies) và 3 luận chứng kinh doanh độc lập:

```
                  ĐỒ THỊ DỮ LIỆU CHUỖI CUNG ỨNG GOTRACE
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
1. LINEAR GRAPH            2. BRANCHING GRAPH          3. CONVERGING GRAPH
   [RICE PLAYBOOK]            [FRUIT PLAYBOOK]            [KITCHEN PLAYBOOK]
      │                            │                            │
      ▼                            ▼                            ▼
Mục tiêu: SCALE            Mục tiêu: COMPLEXITY        Mục tiêu: DEMAND PULL
Chuỗi thẳng, quy mô lớn    Tách/gom lô, kho lạnh, GACC Đa nguồn, trách nhiệm pháp lý
Đồng Tháp Beachhead        Đồng Tháp → Cần Thơ         Cần Thơ / Sa Đéc → TP.HCM
```

* **Rice Playbook (Linear Graph — Chuỗi Tuyến tính):** Đóng vai trò **Chứng minh Quy mô Mạng lưới (Prove Network Scale)**. Luồng dữ liệu đi thẳng từ Nông dân/HTX $\rightarrow$ Thu hoạch $\rightarrow$ Thu mua $\rightarrow$ Sấy/Kho tạm $\rightarrow$ Xay xát/Chế biến $\rightarrow$ Lô xuất khẩu. Thách thức cốt lõi là cân bằng vật chất (**Mass Balance**) để ngăn chặn hành vi pha trộn gạo ngoài vùng và số hóa phả hệ cho Đề án 1 Triệu Hecta Lúa phát thải thấp.
* **Fruit Playbook (Branching Graph — Chuỗi Phân nhánh):** Đóng vai trò **Chứng minh Độ phức tạp Dữ liệu (Prove Data Complexity)**. Luồng dữ liệu phân rã và hợp nhất liên tục: 1 Lô thu hoạch tại vườn tách thành nhiều Lô thành phẩm (Hàng loại 1 xuất khẩu, Hàng loại 2 nội địa, Hàng loại 3 chế biến), sau đó nhiều lô từ các vườn khác nhau được gom vào container xuất khẩu. Ràng buộc khắt khe về nhật ký kho lạnh, quản lý hạn dùng của Mã số vùng trồng (MSVT), Cơ sở đóng gói (MSCSDG) theo Lệnh 280 GACC và liên kết phiếu kiểm nghiệm lab (Cadmium, Auramine O).
* **Kitchen Playbook (Converging Graph — Chuỗi Hội tụ):** Đóng vai trò **Chứng minh Lực kéo từ Nhu cầu Hạ nguồn (Downstream Demand Pull) & Lá chắn Trách nhiệm (Liability Shield)**. Hàng chục nhà cung ứng độc lập (gạo, thịt, rau củ, gia vị) cùng hội tụ tại 1 bếp ăn tập thể (trường học, bệnh viện, khu công nghiệp) để tạo thành các Mẻ thức ăn (`MealBatch`). Thách thức cốt lõi là truy xuất phả hệ đa thành phần trong vòng **< 15 phút** khi xảy ra sự cố ngộ độc và cung cấp bằng chứng giải trình pháp lý theo Quyết định 1246/QĐ-BYT.

---

### 1.2 Tam Giác Địa Kinh Tế: Đồng Tháp — Cần Thơ — TP. Hồ Chí Minh
Lộ trình triển khai phân công vai trò rõ rệt cho 3 cực địa bàn nhằm tối ưu hóa chi phí vận hành và tốc độ mở rộng:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 TAM GIÁC CHIẾN LƯỢC GOTRACE TÂY NAM BỘ                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. ĐỒNG THÁP — SUPPLY & DATA BEACHHEAD (Bàn đạp Cung ứng & Dữ liệu Nguồn)  │
│  • Quy mô: 530.677 ha lúa, 1.147 vùng trồng, 496 CSĐG, 133 HTX trái cây    │
│  • Nhiệm vụ: Đặt văn phòng hiện trường tại Sa Đéc / Cao Lãnh; trực tiếp     │
│    chứng minh mô hình dữ liệu thực địa tại HTX, trạm cân, nhà máy xay xát. │
├─────────────────────────────────────────────────────────────────────────────┤
│  2. CẦN THƠ — REGIONAL LOGISTICS & COMMERCIAL HUB (Trung tâm Điều phối)     │
│  • Quy mô: Trung tâm giao thương ĐBSCL, cụm logistics, ĐH Cần Thơ, BV ĐKTW, │
│    chuỗi KCN Trà Nóc, Thốt Nốt, VSIP Cần Thơ (hàng vạn suất ăn ca).         │
│  • Nhiệm vụ: Đặt PMO Hub vùng, kết nối chế biến sâu, vận tải kho lạnh và   │
│    chạy Kitchen Playbook tại các bệnh viện / KCN trọng điểm.                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  3. TP. HỒ CHÍ MINH — COMMERCIAL GATEWAY (Cửa ngõ Thương mại & Pháp lý)     │
│  • Quy mô: Hệ thống trường học công lập, chuỗi bán lẻ, cảng biển xuất khẩu  │
│  • Nhiệm vụ: Tạo Downstream Demand Pull thông qua các chỉ thị công khai     │
│    minh bạch thực phẩm trường học; thẩm định bằng chứng xuất khẩu.          │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **Khẩu hiệu Hành động:**  
> *Đồng Tháp là nơi chứng minh. Cần Thơ là nơi kết nối. TP.HCM là nơi mở rộng thương mại.*

---

### 1.3 Master Roadmap Timeline Visual

```
2026                                2027                                2028+
Q4 (Thg 10 - 12)  │ Q1 (Thg 1 - 3)   │ Q2 (Thg 4 - 6)   │ Q3 - Q4 (Thg 7 - 12) │ 2028 – 2030
═════════════════════════════════════╪═════════════════════════════════════════╪══════════════════════════
[ GIAI ĐOẠN 1: 90 NGÀY BÀN ĐẠP ]    │ [ GIAI ĐOẠN 2: SCALE & COMPLEXITY ]      │ [ GIAI ĐOẠN 3: ECOSYSTEM ]
• Beachhead Đồng Tháp + Cần Thơ Hub │ • Mở rộng An Giang, Tiền Giang, Bến Tre  │ • Toàn bộ 13 tỉnh ĐBSCL
• Trọng tâm: Rice + Kitchen Fast-Trk│ • Trọng tâm: Fruit Playbook + Scale Rice │ • Gateway TP.HCM
• Phễu: 100 Map → 30 Pri → 2 Anchor │ • 5–10 Anchor, 50–100 HTX, IoT Trạm cân  │ • 30–50+ Anchor, 500+ HTX
• Mass Balance trên Lúa Thu Đông/Kho│ • Mốc Day 150: Trace lúa Đông Xuân gặt rộ│ • Data Graph, Carbon MRV
• Kitchen: Chốt nhanh bảo vệ Gate 30│ • GACC Export Evidence, Breakeven Run    │ • HCMC Downstream Pull
─────────────────────────────────────┼─────────────────────────────────────────┼──────────────────────────
MÙA VỤ P1: Gieo sạ ĐÔNG XUÂN (T11/26)│ MÙA VỤ P2: THU HOẠCH ĐÔNG XUÂN (T2-T3)   │ MÙA VỤ P3: Đa canh quanh năm
     Trace lúa Thu Đông & Kho hiện hữu│            (Day 150 khép kín phả hệ)    │         Hệ thống Bếp ăn
     SẦU RIÊNG NGHỊCH VỤ (T10-12/26)  │            Vụ Xoài Cát Chu (T3-T5)     │         chu kỳ liên tục
     Bếp ăn KCN chạy liên tục quanh năm│            Vụ Sầu riêng chính vụ (T5-T7)│
```

---

## 2. GIAI ĐOẠN 1 (Q4/2026 – Q1/2027, 90 NGÀY): MARKET MAPPING $\rightarrow$ CUSTOMER DISCOVERY $\rightarrow$ FIRST PILOT

### 2.1 Mục Tiêu Chiến Lược
1. **Thiết lập Bộ máy Vận hành PMO Hiện trường (Viable PMO Team 6 FTEs)** tại Đồng Tháp và Cần Thơ.
2. **Chứng minh Giả thuyết Doanh nghiệp Đầu tàu (Anchor Enterprise Model):** Tiếp cận tầng lớp 0,9% doanh nghiệp đầu chuỗi có quyền lực kinh tế để kéo các mắt xích HTX vào hệ thống, thay vì bán lẻ đại trà.
3. **Thực hiện Phễu Chuyển đổi Tinh chỉnh & Kích hoạt Đường đua Song song (Dual-Track Funnel):**
   $$\text{100 Mapped} \longrightarrow \text{25–30 Qualified} \longrightarrow \text{10–12 Discovery Meetings} \longrightarrow \text{3–4 Diagnostics Pitched} \longrightarrow \mathbf{1–2\ \text{Diagnostics Signed}} \longrightarrow \mathbf{1–2\ \text{Pilots}}$$
   Trong đó, kích hoạt ngay nhánh **Bếp ăn Thể chế / KCN** trong Tháng 1 để chốt hợp đồng trong 7–10 ngày, bảo đảm vượt Cổng Kiểm soát Ngày 30 (Gate Review Day 30) trong khi quy trình mua sắm thể chế của ngành lúa gạo (4–6 tuần) đang chạy.
4. **Vận hành Thí điểm Lô hàng Thực tế (Kiểm chứng Hai Pha):** Đo đạc và chứng thực năng lực rút ngắn thời gian truy vết (Trace Time Latency) từ 3–7 ngày xuống **< 30 phút** với tỷ lệ hoàn chỉnh chứng cứ $>80\%$ trên lô lúa Thu Đông / kho lưu trữ hiện hữu và suất ăn thể chế; đồng thời số hóa toàn bộ sự kiện canh tác đầu vào vụ Đông Xuân 2026–2027.

---

### 2.2 Chi Tiết Phễu Khách Hàng Giai Đoạn 1 & Cơ Chế Đường Đua Song Song (The Dual-Track 90-Day Funnel)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 PHỄU CHUYỂN ĐỔI 90 NGÀY GIAI ĐOẠN 1 (ĐÃ TINH CHỈNH)         │
├────────────────────────────────────────┬────────────────────────────────────┤
│ TẦNG PHỄU                              │ TIÊU CHÍ VÀ CHỈ SỐ BÀN GIAO        │
├────────────────────────────────────────┼────────────────────────────────────┤
│ 1. MARKET MAPPING (100 Accounts)       │ Lập bản đồ 100 tài khoản lớn nhất  │
│    • 30 Rice Exporters & Millers       │ ĐBSCL. Thu thập mã số doanh nghiệp,│
│    • 25 Fruit Packhouses & Orchards    │ sản lượng, thị trường xuất khẩu,   │
│    • 15 Institutional Kitchens         │ hệ thống ERP/kho hiện tại.         │
│    • 10 Deep Processors / 10 Logistics │ Điểm NVS (Network Value Score).    │
│    • 10 Lab Test / Cert Partners       │                                    │
├────────────────────────────────────────┼────────────────────────────────────┤
│ 2. ACCOUNT QUALIFICATION (25–30 Pri.)  │ Lọc ra 25–30 tài khoản Tier 1 & 2: │
│    • 12 Rice / 8 Fruit / 6 Kitchen     │ Có mạng lưới $\ge 5$ HTX vệ tinh;  │
│    • 2–4 Processors                    │ Đang chịu áp lực tuân thủ (1Mha,   │
│                                        │ GACC 280, Sở GD&ĐT TP.HCM);        │
│                                        │ Có ngân sách CNTT/QA sẵn sàng.     │
├────────────────────────────────────────┼────────────────────────────────────┤
│ 3. EXECUTIVE DISCOVERY (10–12 Meetings)│ Họp chiến lược trực tiếp với       │
│    • Gặp Economic Buyer & Operations   │ Tổng Giám đốc / Giám đốc Nhà máy.  │
│    • Đặt câu hỏi Hook trung tâm:       │ Trình diễn kịch bản demo:          │
│      "Mất bao lâu để truy một LOT?"    │ "Truy xuất ngược 5 phút" và        │
│                                        │ "Cảnh báo lệch Mass Balance".      │
├────────────────────────────────────────┼────────────────────────────────────┤
│ 4. DATA DIAGNOSTICS (2–3 Gói Thực thi) │ Đề xuất và triển khai 2–3 Gói Chẩn │
│    • 1 Rice + 1 Kitchen (+ 1 Fruit dự phòng)│ đoán Dữ liệu Chuỗi (2–4 tuần).     │
│    • Bàn giao đủ 12 Deliverables       │ Mẫu hóa 8/12 sản phẩm (Toolkit).   │
│    • Stress-test 1 lô hàng thực tế     │ **Phí chuẩn: 45 – 75 triệu VND/gói**│
├────────────────────────────────────────┼────────────────────────────────────┤
│ 5. SIGNED PILOT & NETWORK (1–2 Anchor) │ Ký kết 1–2 Hợp đồng Thí điểm Pilot:│
│    • 1 Kitchen Pilot (Cần Thơ / Sa Đéc)│ 1 Bếp ăn KCN (chốt nhanh Tháng 1)  │
│    • 1 Rice Anchor Pilot (Đồng Tháp)   │ 1 Lúa gạo (Thu Đông & Đông Xuân)   │
│    • Kích hoạt Sầu riêng Nghịch vụ sớm │ Pilot Tiền Giang/Đồng Tháp cuối năm│
│    • Onboard $\ge 10$ HTX / Suppliers  │ Kết nối $\ge 1.000$ LOTs thực địa. │
└────────────────────────────────────────┴────────────────────────────────────┘
```

#### Đòn Bẩy Chiến Lược: Kích Hoạt Đường Đua Song Song Bếp Ăn Thể Chế (Kitchen Parallel Fast-Track)
* **Nghịch lý độ trễ mua hàng doanh nghiệp lớn (Enterprise Latency):** Tại các tập đoàn lúa gạo lớn (Lộc Trời, Trung An, Vinafood II), quy trình phê duyệt dịch vụ tư vấn CNTT phải đi qua Thư ký HĐQT $\rightarrow$ Phòng Kỹ thuật $\rightarrow$ Kế toán $\rightarrow$ Pháp chế $\rightarrow$ Ban TGĐ ký duyệt. Chu kỳ hành chính này thường mất **4 đến 6 tuần**, khiến việc kỳ vọng ký hợp đồng và thu tiền mặt trong 30 ngày đầu từ ngành lúa gạo là rủi ro cực lớn.
* **Tốc độ vượt trội của Bếp ăn KCN (7–10 ngày):** Các doanh nghiệp cung ứng suất ăn KCN và bếp ăn trường học có chu kỳ ra quyết định thần tốc: Chủ cơ sở quyết định trực tiếp, không qua thủ tục rườm rà. Quan trọng hơn, họ đang trong trạng thái "báo động đỏ" sau hàng loạt vụ ngộ độc thực phẩm H1/2026 và chịu rủi ro trách nhiệm hình sự cá nhân theo Quyết định 1246/QĐ-BYT.
* **Chiến lược tháo ngòi:** Đội ngũ BD kích hoạt song song Kitchen Playbook ngay trong Tuần 1. Bằng cách chốt 1 hợp đồng Chẩn đoán Dữ liệu với đối tác Bếp ăn KCN vào Ngày 20–25, GOTRACE **chắc chắn đạt chỉ tiêu Gate Review Ngày 30**, tạo bước đệm doanh thu và bảo toàn nhịp độ vận hành trong khi các thương vụ lúa gạo tiếp tục hoàn tất quy trình thẩm định.

---

### 2.3 Kế Hoạch Vận Hành Chi Tiết 90 Ngày Theo Từng Tuần

#### Tháng 1 (Ngày 1 – Ngày 30): Thiết Lập Bàn Đạp & Thấu Cảm Thị Trường (Foundation & Discovery)
* **Tuần 1 (Ngày 1–7): Internal Kickoff & Setup Hiện trường**
  - Họp khởi động Founder + PMO Lead + BD Lead; phê duyệt ngân sách Phase 1 (~568 triệu VND).
  - Hoàn tất danh mục 100 Anchor Accounts trên hệ thống CRM (Notion/Airtable); phân loại Top 10 ưu tiên.
  - Setup văn phòng tiền phương tại Sa Đéc và hub Cần Thơ; trang bị thiết bị di động, SIM 4G, mẫu in nhãn cho 2 Field Agents.
  - Tech Lead dựng môi trường Staging GOTRACE Mekong V2.2, cấu hình sẵn 3 Schema: Rice Linear, Fruit Branching, Kitchen Converging.
* **Tuần 2 (Ngày 8–14): First Contact & Field Immersion**
  - Đội BD thực hiện 10 cuộc gặp trực tiếp tại Đồng Tháp và Cần Thơ; chốt $\ge 3$ cuộc làm việc với Người có quyền quyết định (C-Level/Chủ tịch HĐQT).
  - Sử dụng kịch bản mở đầu: *"Nếu đối tác hoặc cơ quan chức năng yêu cầu giải trình 1 LOT bị lỗi, doanh nghiệp của anh/chị mất bao nhiêu ngày để truy về tận gốc?"*.
  - Field Agents đi thực tế 5 HTX lúa gạo tại Châu Thành, Lấp Vò, Cao Lãnh (Đồng Tháp); lập Hồ sơ Hiện trạng Canh tác & Ghi chép sổ tay.
* **Tuần 3 (Ngày 15–21): Pitching Gói Chẩn Đoán Dữ Liệu & Kích Hoạt Fast-Track Bếp Ăn**
  - Đội BD pitching Gói Chẩn đoán Dữ liệu Chuỗi Cung ứng (Supply Chain Data Diagnostic, 2–4 tuần, chuẩn hóa phí **45–75 triệu VND/gói**) cho 3–4 ứng viên tiềm năng nhất.
  - Đẩy mạnh nhánh Bếp ăn KCN / Trường học (chu kỳ ra quyết định 7–10 ngày) để bảo đảm ký hợp đồng sớm, tháo ngòi rủi ro độ trễ phê duyệt 4–6 tuần của các tập đoàn lúa gạo lớn.
  - Tech Lead trình diễn Live Demo với dữ liệu giả lập thực tế: Demo kịch bản truy ngược từ bao gạo 5kg về nông hộ và phát hiện pha trộn lúa ngoài vùng; demo truy vết 15 thành phần mẻ nấu bếp ăn trong 2 phút.
* **Tuần 4 (Ngày 22–30): Ký Thỏa Thuận Chẩn Đoán & Gate Review 1 (Day 30)**
  - Chốt hợp đồng và ký kết ít nhất 1–2 Thỏa thuận Chẩn đoán Dữ liệu (Phí niêm yết **45–75 triệu VND/gói**, ưu tiên chốt trước 1 hợp đồng Bếp ăn KCN).
  - Tổ chức **Gate Review Ngày 30**: Nghiệm thu việc ký kết thỏa thuận Chẩn đoán đầu tiên có thu phí. Nếu nhánh lúa gạo còn vướng thủ tục phê duyệt thể chế, hợp đồng từ Bếp ăn KCN bảo đảm 100% chỉ số Gate Day 30 đạt chuẩn để giải ngân tiếp.

#### Tháng 2 (Ngày 31 – Ngày 60): Thực Thi Chẩn Đoán & Kích Hoạt Pilot (Diagnostic Execution & Pilot Go-Live)
* **Tuần 5–6 (Ngày 31–44): Đo Lường Thực Địa & Mẫu Hóa 12 Deliverables**
  - Triển khai 2–3 gói Chẩn đoán tại doanh nghiệp Anchor đã ký: Vẽ bản đồ luồng vật chất, phỏng vấn thủ kho, KCS, kế toán, trạm cân.
  - Ứng dụng **Bộ mẫu chuẩn hóa (Automated Diagnostic Toolkit)**: 8/12 deliverables (RACI, EPCIS schema, GCI taxonomy, compliance gap matrix) được chuẩn hóa theo dạng checklist engine tự động, giúp 2 kỹ sư dữ liệu (Tech Lead + BD Support) hoàn thành trọn vẹn 12 báo cáo chuyên sâu mà không bị quá tải.
  - Thực hiện bài **Live LOT Trace Test**: Bấm giờ thực tế truy vết 1 lô hàng/suất ăn theo quy trình cũ của khách hàng (ghi nhận: mất 4–6 ngày, qua 12 cuộc gọi, sai lệch 8% số lượng).
* **Tuần 7 (Ngày 45–51): Bàn Giao 12 Deliverables & Chốt Hợp Đồng Pilot**
  - Trình bày Báo cáo Khoảng trống Dữ liệu (Gap Report) và Luận chứng ROI cho Ban Giám đốc Anchor.
  - Ký kết chính thức **Hợp đồng Thí điểm (Pilot Agreement)** trị giá 50–100 triệu VND (hoặc cam kết chuyển đổi sang hợp đồng năm).
  - Field Agents tiến hành đào tạo Zalo Mini App cho Thư ký HTX và tổ trưởng thu mua vệ tinh của Anchor.
* **Tuần 8 (Ngày 52–58): Go-Live Dữ Liệu Thực Tế & Số Hóa Vụ Đông Xuân**
  - Kích hoạt hệ thống: Cấp mã `GCI` cho các thửa ruộng và cơ sở đối tác.
  - Với vụ lúa Đông Xuân 2026–2027 (vừa xuống giống tháng 11): Ghi nhận toàn bộ sự kiện đầu vào, cấp mã giống, nhật ký gieo sạ và lịch bón phân đợt 1.
  - Giám sát luồng nhập dữ liệu qua Zalo; thiết lập cảnh báo nếu HTX quá 24h không gửi thông tin cân lúa. Field Agents có mặt tại trạm cân/sấy hỗ trợ 3 lần/tuần.
* **Tuần 9 (Ngày 59–60): Đánh Giá Mốc Mạng Lưới Đầu Tiên & Gate Review 2 (Day 60)**
  - Kiểm tra tỷ lệ nộp dữ liệu (Data Submission Rate $\ge 50\%$).
  - Truy xuất thành công lô hàng đầu tiên trên hệ thống live.

#### Tháng 3 (Ngày 61 – Ngày 90): Chứng Thực Giá Trị & Đóng Gói Case Study (Proof & Contract Conversion)
* **Tuần 10–11 (Ngày 61–77): Vận Hành Ổn Định & Chạy Báo Cáo Mass Balance (Kiểm Chứng Hai Pha)**
  - **Làm rõ nguồn nguyên liệu kiểm chứng Mass Balance tại Day 75–90:** Do lúa vụ Đông Xuân gieo sạ tháng 11/2026 cần 95–105 ngày sinh trưởng (đến tháng 2–3/2027 mới thu hoạch rộ), tại thời điểm Ngày 75–90 cây lúa ngoài đồng mới 35–45 ngày tuổi (đang đẻ nhánh/làm đòng). Do đó, quy trình kiểm toán xay xát thực địa và thuật toán **Cân bằng Vật chất (Mass Balance)** được thực hiện trên **Lô Lúa Thu Đông muộn (thu hoạch tháng 10–11/2026)** hoặc **Lô Lúa Lưu Kho Hiện Hữu** của nhà máy Anchor.
  - Kết quả kiểm chứng: Tỷ lệ thu hồi gạo đạt chuẩn 66,5% (nằm trong biên độ cho phép 65–70%). Tự động kích hoạt cảnh báo xanh xác nhận không có pha trộn lúa trôi nổi ngoài vùng.
  - Khép kín trọn vẹn Pilot Bếp ăn KCN: Thực hiện bài diễn tập truy ngược 15 thành phần suất ăn trong **< 15 phút** đạt tỷ lệ hoàn chỉnh chứng cứ $>85\%$.
* **Tuần 12 (Ngày 78–84): Xây Dựng Bản Luận Chứng Kinh Doanh (Business Case)**
  - Lập bảng so sánh đối đầu **Trước vs. Sau khi dùng GOTRACE**:
    * Thời gian truy xuất 1 lô: Từ 5 ngày (120 giờ) $\rightarrow$ **18 phút** (giảm 99,7%).
    * Tỷ lệ tài liệu chứng cứ số hóa: Từ 35% $\rightarrow$ **88%**.
    * Thời gian đối soát công nợ & sản lượng HTX: Từ 5 ngày cuối tháng $\rightarrow$ **2 giờ** theo thời gian thực.
  - Chuẩn bị Dự thảo Hợp đồng Dài hạn (Annual Subscription Contract).
* **Tuần 13 (Ngày 85–90): Báo Cáo Ban Giám Đốc (Board Review) & Cột Mốc Mùa Vụ Thu Hoạch Day 150**
  - Họp tổng kết Pilot với Ban Lãnh đạo Anchor Enterprise; ký kết hợp đồng thuê bao năm (Annual SaaS Platform).
  - **Gate Review Ngày 90 — Họp BOD GOTRACE:** PMO Lead báo cáo toàn diện số liệu thực tế, giải ngân ngân sách, hoàn tất nền tảng Phase 1 và đề xuất kích hoạt Giai đoạn 2.
  - **Ấn định Cột mốc Thu hoạch Đông Xuân (Day 150 — Tháng 3/2027):** Thực hiện bài Live Trace Test khép kín 100% phả hệ từ thửa ruộng đã gieo sạ ở Tháng 11 $\rightarrow$ gặt rộ $\rightarrow$ sấy $\rightarrow$ xay xát $\rightarrow$ đóng bao gạo xuất khẩu ngay khi vụ Đông Xuân bước vào chính vụ thu hoạch.

---

### 2.4 Bảng Mục Tiêu & Kết Quả Cốt Lõi (OKRs) Giai Đoạn 1

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BẢNG OKRs GIAI ĐOẠN 1 (90 NGÀY)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ MỤC TIÊU CẤP PMO (OBJECTIVE):                                               │
│ Chứng minh trên thực địa rằng GOTRACE tạo ra giá trị kinh doanh đo đếm được │
│ cho ít nhất 1 Anchor Enterprise tại ĐBSCL thông qua dữ liệu chuỗi có kiểm   │
│ chứng, đặt nền móng cho việc mở rộng mạng lưới quy mô lớn.                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ KẾT QUẢ CỐT LÕI (KEY RESULTS):                                              │
│ • KR 1.1: Ký kết thành công $\ge 2$ Hợp đồng Anchor (1 Lúa gạo + 1 Bếp ăn).  │
│ • KR 1.2: Rút ngắn thời gian truy vết lô hàng từ 3–7 ngày xuống < 30 phút.  │
│ • KR 1.3: Onboard thành công $\ge 10$ HTX/Nhà cung cấp gửi dữ liệu thật.    │
│ • KR 1.4: Số hóa $\ge 1.000$ Lô hàng (LOTs) với độ hoàn thiện chứng cứ > 80%.│
│ • KR 1.5: Đạt doanh thu thu tiền thực tế $\ge 200$ triệu VND từ dịch vụ     │
│           Chẩn đoán Dữ liệu và Phí Setup Thí điểm.                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Bóc tách OKRs theo từng Bộ phận Chức năng:

| Bộ phận | Mục tiêu Bộ phận | Key Results Đo lường Cụ thể | Chỉ số Baseline | Chỉ số Mục tiêu Day 90 |
|:---|:---|:---|:---:|:---:|
| **Sales / BD** | Xây dựng phễu khách hàng Anchor bền vững, không để gãy pipeline | - Số cuộc gặp C-Level<br>- Số Diagnostic pitched<br>- Số Anchor ký kết | 0 cuộc<br>0 gói<br>0 HĐ | **$\ge 15$ cuộc**<br>**$\ge 5$ gói**<br>**$\ge 2$ hợp đồng** |
| **Field Ops** | Đảm bảo nông dân và cán bộ HTX nhập liệu đúng, đủ, đều qua Zalo | - HTX onboarded<br>- Tỷ lệ gửi dữ liệu hàng tuần<br>- Độ chính xác kiểm tra chéo (Spot-check) | 0 HTX<br>0%<br>0% | **$\ge 10$ HTX**<br>**$\ge 70\%$**<br>**$\ge 85\%$** |
| **Data / Tech** | Cung cấp hệ thống chạy ổn định, giao diện Zalo trực quan, đối soát tự động | - Thời gian truy vết 1 LOT<br>- Tỷ lệ uptime nền tảng<br>- Tự động hóa báo cáo Mass Balance | 3–7 ngày<br>N/A<br>Thủ công | **$< 30$ phút**<br>**$\ge 99,5\%$**<br>**100% tự động** |

---

### 2.5 Bộ Chỉ Số Hiệu Suất Đo Lường Được (Measurable KPIs Table)

| Tên Chỉ số (KPI) | Đơn vị tính | Hiện trạng trước Pilot (Baseline) | Cam kết Mục tiêu (Day 90 Target) | Phương pháp Đo lường & Nguồn dữ liệu |
|:---|:---:|:---:|:---:|:---|
| **Traceable Lots Logged** | Lô hàng | 0 | $\ge 1.000$ | Truy vấn từ bảng `item_lots` trong cơ sở dữ liệu GOTRACE Core |
| **Active Network Nodes** | Tổ chức | 0 | $\ge 10$ HTX / Nhà cung ứng | Số lượng node có phát sinh ít nhất 3 sự kiện EPCIS/tuần |
| **Qualified Pipeline Value** | Tỷ VND | 0 | $\ge 1,5$ tỷ VND | Tổng giá trị hợp đồng tiềm năng của 15 tài khoản Tier 1 trong CRM |
| **Recognized Revenue** | Triệu VND | 0 | $\ge 200$ triệu VND | Doanh thu thực nhận qua tài khoản ngân hàng (Diagnostic + Setup) |
| **Traceback Latency** | Phút | 4.320 – 10.080 phút (3–7 ngày) | **$< 30$ phút** | Đồng hồ bấm giờ thực nghiệm trong buổi kiểm toán live của Anchor |
| **Evidence Completeness** | % | $< 35\%$ (sổ tay rời rạc) | **$\ge 80\%$** | Tỷ lệ LOT có đính kèm đầy đủ phiếu cân + nhật ký + ảnh chụp hiện trường |
| **Supplier Reconciliation** | Giờ/tháng | 40 – 60 giờ/tháng | **$< 4$ giờ/tháng** | Báo cáo phỏng vấn kế toán trưởng và thủ kho của Anchor |

---

### 2.6 Ma Trận Cổng Kiểm Soát Chuyển Giai Đoạn (Gate Review 90-Day Go/No-Go Decision Matrix)

Để bảo vệ nguồn vốn và tránh bẫy scale sớm khi sản phẩm chưa sẵn sàng, Hội đồng Quản trị áp dụng nguyên tắc kiểm soát cổng nghiêm ngặt:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GATE REVIEW NGÀY 90: GO / NO-GO                          │
├────────────────────┬────────────────────┬───────────────────────────────────┤
│ TIÊU CHÍ KIỂM TRA  │ ĐIỀU KIỆN "GO"     │ XỬ LÝ NẾU "NO-GO" (FAIL)         │
├────────────────────┼────────────────────┼───────────────────────────────────┤
│ 1. Hợp đồng Anchor │ $\ge 2$ Anchor     │ Nếu chỉ có 1: Gia hạn thêm 30     │
│    ký kết thực tế  │ đã ký cam kết      │ ngày pilot trước khi tuyển thêm   │
│                    │ trả phí SaaS/Setup │ nhân sự mới.                      │
├────────────────────┼────────────────────┼───────────────────────────────────┤
│ 2. Chứng thực chỉ  │ Traceback latency  │ Nếu $> 60$ phút: Tech Lead phải   │
│    số Flagship     │ $< 30$ phút        │ tái cấu trúc chỉ mục dữ liệu phả  │
│                    │                    │ hệ; dừng mở rộng địa bàn.         │
├────────────────────┼────────────────────┼───────────────────────────────────┤
│ 3. Tính tuân thủ   │ Tỷ lệ gửi data của │ Nếu $< 50\%$: Đơn giản hóa form   │
│    của mạng lưới   │ HTX $\ge 60\%$     │ Zalo Mini App; tăng trợ cấp hiện  │
│                    │                    │ trường cho thư ký HTX.            │
├────────────────────┼────────────────────┼───────────────────────────────────┤
│ 4. Độ ổn định kỹ   │ Sự cố mức độ 1     │ Dành 2 tuần sprint kỹ thuật để dọn│
│    thuật hệ thống  │ $< 1$ lỗi/tuần     │ nợ kỹ thuật (technical debt).     │
├────────────────────┼────────────────────┼───────────────────────────────────┤
│ 5. Thu tiền thực tế│ $\ge 180$ triệu    │ Đánh giá lại chính sách giá và đề │
│    từ thị trường   │ VND thực nhận      │ xuất giá trị của Gói Chẩn đoán.   │
└────────────────────┴────────────────────┴───────────────────────────────────┘
```

---

## 3. GIAI ĐOẠN 2 (Q2/2027 – Q4/2027, 6–12 THÁNG): COMPLEXITY PROOF & MULTI-PROVINCE EXPANSION

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BẢN ĐỒ MỞ RỘNG GIAI ĐOẠN 2                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ ĐỒNG THÁP (Beachhead) ────────► CẦN THƠ (Regional Hub)                      │
│ [Xoài Cát Chu Cao Lãnh]         [Cụm Logistics Thốt Nốt / Trà Nóc]          │
│ [Mở rộng thêm 5 nhà máy gạo]    [Bệnh viện ĐKTW Cần Thơ, VSIP]              │
│            │                                  │                             │
│            ▼                                  ▼                             │
│ AN GIANG (Scale 1Mha Rice)       TIỀN GIANG & BẾN TRE (Fruit Export)        │
│ [Nhà máy Tân Long Tri Tôn]       [Thủ phủ Sầu riêng Cai Lậy & Chánh Thu]    │
│ [Liên kết 50 HTX lúa 1Mha]       [Kiểm soát Lệnh 280 GACC, Test Cadmium]    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Trọng Tâm Chiến Lược: Xử Lý Đồ Thị Phân Nhánh & Cú Hích GACC
Sau khi đã chứng minh được quy mô mạng lưới ở chuỗi thẳng (Lúa gạo) tại Đồng Tháp (và khả năng kích hoạt sớm thí điểm Sầu riêng nghịch vụ cuối năm 2026 tại Tiền Giang/Bến Tre/Đồng Tháp nếu chuẩn bị kịp thời), Giai đoạn 2 bước vào nhiệm vụ then chốt: **Chứng minh Năng lực Xử lý Dữ liệu Phức tạp (Prove Data Complexity)** trên quy mô diện rộng thông qua Playbook Trái cây xuất khẩu bước vào chính vụ 2027 (Xoài Cát Chu T3–T5 và Sầu riêng chính vụ T5–T7).

#### 1. Thách thức Nghiệp vụ Phân nhánh (Branching Topologies):
* **Tách lô (LOT Split):** Một lô thu hoạch 15 tấn xoài Cát Chu hoặc sầu riêng Ri6 từ vùng trồng đạt chuẩn xuất khẩu khi đưa về Cơ sở đóng gói (MSCSDG) sẽ được phân loại:
  - 8 tấn Loại 1 (Đạt chuẩn xuất khẩu Trung Quốc / Nhật Bản) $\rightarrow$ Mã `PackLot-GradeA`.
  - 4 tấn Loại 2 (Tiêu thụ siêu thị cao cấp nội địa) $\rightarrow$ Mã `PackLot-GradeB`.
  - 3 tấn Hàng dạt / quả nứt $\rightarrow$ Mã `PackLot-GradeC` chuyển nhà máy sấy/cấp đông.
* **Gom lô (LOT Merge):** Nhiều lô đóng gói `PackLot-GradeA` thu mua từ 3–5 nhà vườn khác nhau được gom lại để đóng vừa một container lạnh 40 feet (`ExportShipment`). GOTRACE duy trì phả hệ tỷ lệ: *Container này chứa 42% sản lượng từ Vườn A (MSVT ĐT-01), 35% từ Vườn B (MSVT ĐT-02) và 23% từ Vườn C (MSVT ĐT-03)*. Khi Hải quan nước nhập khẩu lấy mẫu ngẫu nhiên phát hiện dư lượng, hệ thống định vị chính xác nhà vườn vi phạm trong **15 phút** thay vì đình chỉ toàn bộ mã số đóng gói của doanh nghiệp.

#### 2. Cú Hích Pháp Lý: Lệnh 280 GACC & Khủng Hoảng Cadmium / Vàng Ô:
* Tổng cục Hải quan Trung Quốc (GACC) siết chặt toàn diện việc kiểm soát mã số vùng trồng, cấm mượn mã, đòi hỏi hồ sơ nhật ký số và kết quả test Cadmium từng lô.
* GOTRACE phát triển tính năng **Cảnh báo Hạn dùng Chứng thư & Liên kết Kiểm nghiệm Lab**: Tự động thông báo trước 30 ngày khi MSVT hoặc MSCSDG sắp hết hiệu lực; khóa không cho xuất hóa đơn/mã container nếu lô hàng chưa đính kèm file kết quả xét nghiệm âm tính với Cadmium từ phòng lab được công nhận.

#### 3. Mở rộng Quy mô Lúa gạo cùng Đề án 1 Triệu Hecta (1Mha):
* Kết nối mạng lưới sang An Giang (Vùng Tứ giác Long Xuyên, tiếp cận Tân Long Tri Tôn, Lộc Trời Thoại Sơn).
* Tích hợp lớp dữ liệu đo đạc, báo cáo và thẩm định (MRV) để giúp các liên minh HTX chuẩn bị hồ sơ cấp tín chỉ carbon ($~20 USD/tấn giảm phát thải).

---

### 3.2 Các Mốc Kỹ Thuật & Tích Hợp Phần Cứng (Technical Milestones)
Trong Giai đoạn 2, GOTRACE chuyển dịch từ nhập liệu thủ công sang tự động hóa thu thập dữ liệu tại các điểm nghẽn vật lý:

1. **Bộ Chuyển Đổi Dữ Liệu Trạm Cân Tự Động (IoT Weighbridge Serial Bridge):**
   - Triển khai thiết bị phần cứng nhỏ gắn trực tiếp vào đầu đọc cân điện tử (RS-232/RS-485) tại 10 nhà máy xay xát và vựa trái cây lớn.
   - Khi xe tải lúa hoặc xe ba gác chở sầu riêng chạy lên bàn cân, số ký thực tế được tự động mã hóa, đính kèm định danh `GCI` của nhà cung cấp và đẩy thẳng lên Cloud qua SIM 4G. Loại bỏ hoàn toàn gian lận ghi khống phiếu cân tay.
2. **Hệ Thống Lắng Nghe Sự Kiện EPCIS Thời Gian Thực (EPCIS Event Bus):**
   - Nâng cấp kiến trúc xử lý lên chuẩn GS1 EPCIS 2.0 REST/JSON-LD, cho phép tiếp nhận hàng trăm sự kiện đồng thời (`Commission`, `Aggregation`, `Transformation`, `Observation`).
3. **Cổng Kết Nối ERP/WMS Nông Nghiệp Hiện Hữu ("Connect, Not Replace"):**
   - Hoàn thiện module API kết nối 2 chiều với các phần mềm kế toán/ERP phổ biến tại Việt Nam như Misa SME, Bravo 8, SAP S/4HANA.
   - Kế toán nhập lệnh xuất kho trên ERP $\rightarrow$ GOTRACE tự động lấy số lô, hạn dùng và tạo phả hệ mà nhân sự không cần nhập lại 2 lần.

---

### 3.3 Bảng Mục Tiêu & Chỉ Số Đo Lường Cốt Lõi (Phase 2 OKRs & KPIs)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BẢNG OKRs GIAI ĐOẠN 2 (6–12 THÁNG)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ MỤC TIÊU CẤP PMO (OBJECTIVE):                                               │
│ Nhân rộng mô hình dữ liệu GOTRACE từ Đồng Tháp sang 4 tỉnh phụ cận;         │
│ giải quyết trọn vẹn bài toán tách/gom lô phức tạp của ngành trái cây xuất   │
│ khẩu theo chuẩn GACC; đưa bộ máy vận hành đạt điểm hòa vốn hàng tháng.      │
├─────────────────────────────────────────────────────────────────────────────┤
│ KẾT QUẢ CỐT LÕI (KEY RESULTS):                                              │
│ • KR 2.1: Ký kết lũy kế 5–10 Doanh nghiệp Anchor lớn trên 3 ngành hàng.     │
│ • KR 2.2: Mở rộng mạng lưới lên 50–100 Hợp tác xã / Cơ sở đóng gói vệ tinh. │
│ • KR 2.3: Số hóa và quản trị $\ge 20.000$ Lô hàng (LOTs) lưu thông.         │
│ • KR 2.4: Đạt doanh thu định kỳ hàng tháng (MRR) 180–220 triệu VND          │
│           (Đạt điểm hòa vốn vận hành - Operational Breakeven).              │
│ • KR 2.5: Triển khai thành công 1 Dashboard Dữ liệu Nông nghiệp Cấp tỉnh    │
│           cho Sở NN&PTNT hoặc Sở KH&CN Đồng Tháp / Cần Thơ.                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

| Chỉ số Đo lường (KPI) | Baseline (Kết thúc Phase 1) | Mục tiêu Phase 2 (Tháng 12) | Phương pháp Đo lường |
|:---|:---:|:---:|:---|
| **Số Doanh nghiệp Anchor trả phí** | 2 doanh nghiệp | **8 – 10 doanh nghiệp** | Hợp đồng SaaS có hiệu lực |
| **Số HTX & Node đối tác hoạt động**| 10 HTX | **50 – 100 đơn vị** | Số node có giao dịch dữ liệu hàng tháng |
| **Tổng số LOT có thể truy vết** | 1.000 LOTs | **$\ge 20.000$ LOTs** | Cơ sở dữ liệu GOTRACE Core |
| **Tỷ lệ Container XK có Link Lab Test**| 0% | **$\ge 95\%$ container** | Tỷ lệ lô xuất khẩu gắn kèm kết quả xét nghiệm |
| **Doanh thu Định kỳ Hàng tháng (MRR)**| ~30M VND | **180 – 220 triệu VND** | Báo cáo tài chính kế toán nội bộ |
| **Giá trị Đường ống Khách hàng (Pipeline)**| 1,5 tỷ VND | **$\ge 4,5$ tỷ VND** | Tổng giá trị cơ hội được định giá trên CRM |
| **Trạm cân Tự động hóa (IoT Scale)**| 0 trạm | **10 trạm cân live** | Số thiết bị phần cứng gửi dữ liệu tự động |

---

### 3.4 Tiêu Chí Chuyển Giai Đoạn 2 Sang Giai Đoạn 3 (Gate 2 Triggers)

* [x] **Dòng tiền Tự chủ:** Doanh thu SaaS và phí duy trì mạng lưới hàng tháng trang trải đủ chi phí vận hành thường xuyên của đội ngũ 14 FTEs (MRR $\ge 190$ triệu VND/tháng).
* [x] **Tham chiếu Xuất khẩu Thực chứng:** Ít nhất 10 container sầu riêng hoặc xoài xuất khẩu sang thị trường khó tính (Trung Quốc, Nhật Bản, Hoa Kỳ) thông quan suôn sẻ nhờ bộ hồ sơ điện tử trích xuất từ GOTRACE.
* [x] **Khả năng Tự Onboard của Mạng lưới:** Thời gian triển khai cho một HTX mới giảm xuống dưới **2 ngày làm việc** nhờ bộ tài liệu video và hướng dẫn tự động hóa trên Zalo.
* [x] **Kiến trúc Dữ liệu Đa chuỗi (Cross-vertical Linkage):** Chứng minh được sự liên kết dữ liệu giữa các bên: Gạo và Rau quả từ các nhà cung ứng Phase 1 & 2 đã kết nối thành công vào thực đơn của các Bếp ăn tập thể tại Cần Thơ.

---

## 4. GIAI ĐOẠN 3 (2028+, 1–3 NĂM): REGIONAL ECOSYSTEM & COMMERCIAL GATEWAY

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HỆ SINH THÁI DỮ LIỆU GOTRACE 2028+                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                           COMMERCIAL GATEWAY                                │
│                     (TP. HỒ CHÍ MINH & CẢNG BIỂN QUỐC TẾ)                   │
│         ▲                                                    ▲              │
│         │ Dữ liệu an toàn thực phẩm                          │ Dữ liệu xuất │
│         │ cho 2 triệu suất ăn học đường / KCN                │ khẩu hải quan│
├─────────┴────────────────────────────────────────────────────┴──────────────┤
│                      GOTRACE REGIONAL FOOD DATA GRAPH                       │
│        (Lớp Dữ liệu Liên thông — Chuẩn hóa GCI — Đồ thị Chứng cứ Số)        │
│                                                                             │
│  [ LÚA GẠO ]          [ TRÁI CÂY ]          [ BẾP ĂN / F&B ]    [ THỦY SẢN ]│
│  24M tấn/năm          6.7M tấn/năm          Triệu suất ăn/ngày  4.8M tấn/năm│
│  An Giang, Đ.Tháp     Tiền Giang, Bến Tre   Cần Thơ, TP.HCM     Cà Mau, Đ.Th│
│  Kiên Giang, Long An  Vĩnh Long, Cần Thơ    KCN, Bệnh viện      Sóc Trăng   │
├─────────────────────────────────────────────────────────────────────────────┤
│                              HẠ TẦNG KẾT NỐI                                │
│ • Đồng bộ 2 chiều Cổng Truy xuất Quốc gia (traceviet.mae.gov.vn / Bộ NN)    │
│ • Kiểm toán Dữ liệu Giảm phát thải Carbon MRV (World Bank / TCAF Brokerage) │
│ • Sàn Dữ liệu Phân tích Thị trường Vùng Mekong (Market Observatory)         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Tầm Nhìn Chiến Lược: Trở Thành Lớp Hạ Tầng Dữ Liệu Lương Thực Vùng
Đến năm 2028, GOTRACE không còn là một ứng dụng phần mềm độc lập của từng doanh nghiệp riêng rẽ, mà tiến hóa thành **Hạ tầng Dữ liệu Nông sản & Thực phẩm (Regional Food Data Infrastructure)** của toàn bộ 13 tỉnh thành Đồng bằng sông Cửu Long.

#### Ba Cột Trụ Vận Hành Tầng Vĩ Mô:
1. **Mạng Lưới Bếp Ăn Khép Kín & Cửa Ngõ Thương Mại TP.HCM (HCMC Commercial Gateway):**
   - Thành phố Hồ Chí Minh là thị trường tiêu thụ nông sản lớn nhất nước và là nơi áp dụng các quy chuẩn an toàn thực phẩm khắt khe nhất.
   - GOTRACE đóng vai trò là "Thẻ căn cước số" của nông sản miền Tây khi thâm nhập thị trường thành phố: Toàn bộ gạo, rau, thịt đưa vào chuỗi suất ăn trường học, bệnh viện và hệ thống siêu thị tại TP.HCM đều có thể kiểm chứng nguồn gốc từ các HTX đã định danh trên mạng lưới GOTRACE Tây Nam Bộ.
2. **Đồ Thị Dữ Liệu Đa Ngành Hàng (Multi-Commodity Data Graph):**
   - Mở rộng thêm ngành hàng **Thủy sản (Tôm, Cá tra)** — ngành kinh tế 4,79 triệu tấn/năm của ĐBSCL đang chịu áp lực khắt khe về thẻ vàng IUU, kháng sinh và chứng nhận ASC/BAP.
   - Đồ thị dữ liệu liên kết chéo: *Trấu từ nhà máy xay xát lúa gạo $\rightarrow$ làm đệm lót sinh học cho trang trại chăn nuôi $\rightarrow$ phân bón vi sinh cho vườn sầu riêng $\rightarrow$ cung ứng cho chuỗi bếp ăn công nghiệp*.
3. **Liên Thông Quốc Gia & Thương Mại Hóa Dữ Liệu Carbon (MRV Integration):**
   - Kết nối API liên tục (Feeder API) với Cổng Truy xuất Nguồn gốc Quốc gia (`traceviet.mae.gov.vn` thuộc Bộ NN&PTNT), giúp doanh nghiệp Anchor tự động thực hiện nghĩa vụ báo cáo tuân thủ nhà nước chỉ bằng 1 cú nhấp chuột.
   - Số hóa dữ liệu canh tác giảm phát thải cho toàn bộ diện tích tham gia Đề án 1 Triệu Hecta Lúa, trở thành đối tác cung cấp dữ liệu kiểm toán độc lập cho các quỹ tài chính khí hậu quốc tế (World Bank, Quỹ Chuyển dịch Khí hậu TCAF).

---

### 4.2 Các Dịch Vụ Giá Trị Cao (High-Margin Intelligence Services)
Khi hàng trăm nghìn lô hàng được số hóa trên nền tảng, GOTRACE khai mở tầng doanh thu thứ 5 có tỷ suất lợi nhuận vượt trội:

* **Sàn Quan Sát & Cảnh Báo Thị Trường Mekong (Regional Market Observatory):**
  - Cung cấp dữ liệu ẩn danh tổng hợp theo thời gian thực về: Sản lượng thu hoạch thực tế theo từng tiểu vùng, biến động độ ẩm bình quân, tỷ lệ thu hồi gạo, cảnh báo sớm nguy cơ bùng phát dịch bệnh hoặc dư lượng thuốc BVTV.
  - Khách hàng thuê bao: Các tập đoàn tài chính nông nghiệp, ngân hàng tài trợ chuỗi cung ứng (BIDV, Agribank), công ty bảo hiểm mùa vụ và các tổ chức quốc tế.
* **Hồ Sơ Tín Nhiệm Chuỗi Cung Ứng (Supply Chain Risk Scoring):**
  - Đánh giá điểm rủi ro tuân thủ của từng nhà cung ứng, từng HTX dựa trên lịch sử giao hàng thực tế, tính ổn định của dữ liệu và tỷ lệ vi phạm chất lượng.
  - Doanh nghiệp Anchor sử dụng điểm số này để phân bổ hạn mức thu mua và thương lượng giá hợp đồng bao tiêu.

---

### 4.3 Bảng Mục Tiêu & Chỉ Số Đo Lường Cốt Lõi (Phase 3 OKRs & KPIs)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BẢNG OKRs GIAI ĐOẠN 3 (2028 – 2030)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ MỤC TIÊU CẤP TẬP ĐOÀN (OBJECTIVE):                                          │
│ Định vị vững chắc GOTRACE là nền tảng hạ tầng dữ liệu chuỗi cung ứng dẫn đầu│
│ ĐBSCL; liên thông thương mại toàn diện với Cửa ngõ TP.HCM; đạt doanh số     │
│ vượt ngưỡng 15 tỷ VND/năm với biên độ lợi nhuận EBITDA > 30%.               │
├─────────────────────────────────────────────────────────────────────────────┤
│ KẾT QUẢ CỐT LÕI (KEY RESULTS):                                              │
│ • KR 3.1: Mở rộng hiện diện trên toàn bộ 13 tỉnh thành ĐBSCL và TP.HCM.     │
│ • KR 3.2: Sở hữu mạng lưới $\ge 30–50$ Doanh nghiệp Anchor trả phí thường   │
│           niên và $\ge 500$ Hợp tác xã / Cơ sở sơ chế trực thuộc.           │
│ • KR 3.3: Quản trị và cấp mã số cho $\ge 200.000$ Lô hàng nông sản/năm.    │
│ • KR 3.4: Đạt doanh thu hàng năm 10–18 tỷ VND; duy trì EBITDA $\ge 30\%$.    │
│ • KR 3.5: Trở thành đối tác hạ tầng dữ liệu được chỉ định trong ít nhất 1  │
│           chương trình mục tiêu quốc gia về nông nghiệp số hoặc carbon.     │
└─────────────────────────────────────────────────────────────────────────────┘
```

| Chỉ số Đo lường (KPI) | Mục tiêu Năm 2028 (Y1 Phase 3) | Mục tiêu Năm 2029 (Y2 Phase 3) | Mục tiêu Năm 2030 (Trưởng thành) |
|:---|:---:|:---:|:---:|
| **Số Tỉnh/Thành bao phủ** | 6 tỉnh trọng điểm | 10 tỉnh | **Toàn bộ 13 tỉnh ĐBSCL + TP.HCM** |
| **Số Doanh nghiệp Anchor** | 25 doanh nghiệp | 40 doanh nghiệp | **$\ge 50$ doanh nghiệp** |
| **Số HTX & Vệ tinh kết nối** | 200 HTX | 350 HTX | **$\ge 500$ HTX (hơn 10.000 nông hộ)** |
| **Sản lượng Lúa gạo số hóa** | 500.000 tấn | 1.200.000 tấn | **$\ge 2.500.000$ tấn (~10% ĐBSCL)** |
| **Suất ăn Bếp ăn kiểm chứng/ngày**| 50.000 suất/ngày | 120.000 suất/ngày | **$\ge 250.000$ suất/ngày** |
| **Doanh thu Thuần hàng năm** | 10,5 tỷ VND | 14,8 tỷ VND | **$\ge 18,5$ tỷ VND** |
| **Biên độ Lợi nhuận EBITDA** | 25% | 30% | **$\ge 35\%$** |

---

## 5. BẢNG TỔNG HỢP SO SÁNH BA GIAI ĐOẠN (MASTER COMPARATIVE MATRIX)

Bảng tổng hợp dưới đây phác họa bức tranh toàn cảnh về sự tiến hóa của GOTRACE qua 3 giai đoạn triển khai:

| Tiêu chí So sánh | GIAI ĐOẠN 1 (Q4/2026 – Q1/2027)<br>*90 Ngày Bàn Đạp* | GIAI ĐOẠN 2 (Q2/2027 – Q4/2027)<br>*6–12 Tháng Mở Rộng* | GIAI ĐOẠN 3 (2028 – 2030)<br>*1–3 Năm Hệ Sinh Thái* |
|:---|:---|:---|:---|
| **Sứ mệnh Trọng tâm** | **Chứng minh Mô hình & Quy mô** *(Prove Scale & Network)* | **Chứng minh Độ phức tạp Dữ liệu** *(Prove Data Complexity)* | **Thiết lập Hạ tầng Dữ liệu Vùng** *(Regional Data Infrastructure)* |
| **Phạm vi Địa bàn** | Đồng Tháp (Beachhead) + Cần Thơ | Đồng Tháp, Cần Thơ, An Giang, Tiền Giang, Bến Tre | Toàn bộ 13 tỉnh ĐBSCL + Cửa ngõ TP.HCM |
| **Ngành hàng Chủ lực** | Lúa gạo (Đông Xuân) + Bếp ăn thí điểm | Trái cây (Xoài, Sầu riêng) + Mở rộng Lúa 1Mha | Đa ngành: Lúa gạo, Trái cây, Thủy sản, Bếp ăn học đường |
| **Tô-pô Đồ thị Dữ liệu** | Tuyến tính (Linear Chain) | Phân nhánh & Gom lô (Branching & Merge) | Đồ thị Dữ liệu Hội tụ Đa chiều (Multi-graph) |
| **Quy mô Mạng lưới** | 2 Anchor, 10 HTX | 5–10 Anchor, 50–100 HTX | 30–50+ Anchor, 500+ HTX, 2.000+ nông dân |
| **Số lượng LOT Quản trị** | $\ge 1.000$ LOTs | $\ge 20.000$ LOTs | $\ge 200.000$ LOTs/năm |
| **Chỉ số Flagship** | Trace time từ 5 ngày $\rightarrow$ **< 30 phút** | Tách/gom lô sầu riêng $\rightarrow$ **< 15 phút**; 95% có file Lab | Truy vết sự cố ngộ độc F&B $\rightarrow$ **< 5 phút**; API Quốc gia |
| **Cơ cấu Nhân sự (FTEs)**| **6 FTEs** (Bộ máy Tinh gọn) | **14 FTEs** (Đội ngũ Tăng tốc) | **24 FTEs** (Bộ máy Vùng Chuyên sâu) |
| **Ngân sách Đầu tư / OPEX**| ~568 triệu VND / 90 ngày | ~4,6 tỷ VND / năm (380M/tháng) | ~8,2 tỷ VND / năm |
| **Mô hình Doanh thu Chính**| Gói Chẩn đoán Dữ liệu + Phí Setup Pilot | Phí Thuê bao SaaS + Tích hợp Trạm cân IoT | Phí Mạng lưới theo Volume + Phân tích Dữ liệu + MRV Carbon |
| **Trạng thái Dòng tiền** | Doanh thu bù 35–50% chi phí | **Hòa vốn vận hành (Month 8–9)** | **Lợi nhuận ròng cao (EBITDA > 30%)** |
| **Điều kiện Kích hoạt Cổng**| Ký $\ge 1$ Anchor, trace 1 LOT thật | Hòa vốn tháng, thông quan GACC 1 cont | Doanh thu $> 10$ tỷ, liên thông Cổng Quốc gia |

---

## 6. LỊCH CANH TÁC NÔNG NGHIỆP & SỰ ĐỒNG BỘ VẬN HÀNH (AGRICULTURAL CALENDAR ALIGNMENT)

Một sai lầm phổ biến của các công ty công nghệ khi tiến về miền Tây là lập kế hoạch theo "quý tài chính" của giới văn phòng mà bỏ qua **Lịch mùa vụ sinh học** của nông sản. GOTRACE đồng bộ tuyệt đối từng tuần của roadmap với vòng quay thực tế của đất trời miền Tây:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 LỊCH MÙA VỤ NÔNG NGHIỆP & NHỊP ĐỘ PMO (KIỂM CHỨNG HAI PHA)  │
├──────────┬─────────────────────────────┬────────────────────────────────────┤
│ THÁNG    │ MÙA VỤ NÔNG NGHIỆP THỰC TẾ  │ NHỊP ĐỘ HÀNH ĐỘNG CỦA PMO GOTRACE │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Tháng 10 │ • Lúa Thu Đông thu hoạch rộ │ • Setup văn phòng PMO Sa Đéc/C.Thơ │
│ (Q4/26)  │ • Trái cây vào thời kỳ dưỡng│ • Chạy 10–12 Discovery Meetings    │
│          │   cây, chuẩn bị xử lý ra hoa│ • Ký Hợp đồng Chẩn đoán Bếp ăn KCN │
│          │ • Bếp ăn trường học/KCN chạy│ • Pilot Bếp ăn KCN khởi động nhanh │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Tháng 11 │ • Bắt đầu gieo sạ VỤ ĐÔNG   │ • GO-LIVE SỐ HÓA VỤ ĐÔNG XUÂN      │
│ (Q4/26)  │   XUÂN (Chu kỳ 95–105 ngày) │ • Field Agents cắm đồng cùng HTX   │
│          │ • Lập danh sách phân bón    │ • Cấp mã GCI vùng trồng và ghi     │
│          │   và hạt giống đầu vào      │   nhận sự kiện gieo sạ, phân bón   │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Thg 12-1 │ • Lúa Đông Xuân đẻ nhánh,   │ • CỔNG NGÀY 90 (GATE REVIEW DAY 90)│
│ (Q4-Q1)  │   làm đòng (35–45 ngày tuổi)│ • Kiểm chứng Mass Balance trên LÔ  │
│          │ • Chưa có lúa Đông Xuân gặt │   LÚA THU ĐÔNG & KHO LƯU TRỮ       │
│          │ • Đợt cao điểm suất ăn Tết  │ • Hoàn tất nghiệm thu Pilot Bếp ăn │
│          │ • Xoài Cát Chu ra trái non  │ • Báo cáo BOD & Kích hoạt Phase 2  │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Thg 2-3  │ • THU HOẠCH ĐỈNH ĐIỂM VỤ    │ • MỐC CỘT CỜ DAY 150 (THÁNG 3/2027)│
│ (Q1/27)  │   LÚA ĐÔNG XUÂN TẠI ĐỒNG THÁP│ • Nghiệm thu trọn vẹn chuỗi Đông   │
│          │ • Lúa chín rộ sau 100 ngày  │   Xuân từ Ruộng $\rightarrow$ Bao gạo XK   │
│          │ • Bắt đầu thu hoạch Xoài vụ │ • Báo cáo Flagship Rice Case Study │
│          │   chính tại Cao Lãnh        │ • Triển khai Fruit Setup (Xoài)    │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Thg 4-5  │ • Thu hoạch rộ Xoài Cát Chu │ • THỰC THI PILOT TRÁI CÂY (FRUIT)   │
│ (Q2/27)  │ • Chuẩn bị thu hoạch Sầu    │ • Triển khai quy trình Tách/Gom lô │
│          │   riêng vụ chính tại Tiền   │ • Tích hợp kết quả lab test Cadmium│
│          │   Giang, Bến Tre            │ • Kết nối dữ liệu kho lạnh         │
├──────────┼─────────────────────────────┼────────────────────────────────────┤
│ Thg 6-8  │ • Thu hoạch sầu riêng chính │ • KIỂM ĐỊNH LỆNH 280 GACC XUẤT KHẨU│
│ (Q2-Q3)  │   vụ; áp lực kiểm soát mã số│ • Bàn giao trạm cân tự động IoT    │
│          │   vùng trồng đạt đỉnh điểm  │ • Cán mốc hòa vốn dòng tiền tháng  │
└──────────┴─────────────────────────────┴────────────────────────────────────┘
```

> **Nguyên tắc "Kiểm chứng Hai pha" (Dual-Track Crop Calibration):**
> 1. **Pha 1 — Cổng Ngày 90 (Tháng 12/2026 – Tháng 1/2027):** Kiểm chứng năng lực công nghệ nền tảng. Thuật toán Mass Balance (66,5% thu hồi) và kết nối trạm cân được nghiệm thu trên **Lô Lúa Thu Đông muộn hoặc Lô Gạo Lưu Kho Sẵn Có** của Anchor; song song khép kín trọn vẹn Pilot Bếp ăn KCN (<15 phút truy vết ngộ độc). Toàn bộ dữ liệu gieo sạ đầu vào của vụ Đông Xuân được số hóa vào đồ thị.
> 2. **Pha 2 — Cổng Thu hoạch Mùa vụ (Day 150 — Tháng 3/2027):** Khi vụ Đông Xuân bước vào giai đoạn gặt rộ sau 95–105 ngày sinh học, GOTRACE kích hoạt bài toán nghiệm thu tối hậu: Khép kín 100% dòng dữ liệu xuyên suốt từ thửa ruộng định danh GCI được gieo sạ ở Tháng 11 đến bao gạo xuất khẩu tại cảng biển. Mốc kiểm chứng này xóa bỏ hoàn toàn rủi ro "lúa ma" và khẳng định tính thực chứng trước Hội đồng Quản trị.

---

## 7. QUY TRÌNH KIỂM CHỨNG ĐỘC LẬP & TÍNH TOÀN VẸN (FORENSIC AUDITING VERIFICATION)

Để đảm bảo tài liệu này không chỉ là những tuyên bố trên giấy, bất kỳ chuyên gia thẩm định hoặc kiểm toán viên độc lập nào cũng có thể đối chiếu tính khả thi và tính chân thực thông qua các giao thức sau:

1. **Kiểm chứng Nguồn số liệu Thị trường:**
   - Số liệu 530.677 ha lúa và 1.147 mã vùng trồng tại Đồng Tháp được đối chiếu trực tiếp với Báo cáo số 324/BC-SNN của Sở NN&PTNT Đồng Tháp (tháng 8/2026).
   - Sản lượng 24,63 triệu tấn lúa và 6,7 triệu tấn trái cây toàn ĐBSCL khớp với Niên giám thống kê Tổng cục Thống kê và Chương trình 1 Triệu Hecta của Bộ NN&PTNT.
   - Thống kê 58 vụ ngộ độc thực phẩm (1.573 nạn nhân) trong H1/2026 được trích xuất từ dữ liệu của Cục An toàn Thực phẩm (Bộ Y tế).
2. **Kiểm tra Tính khả thi của Chỉ số Thời gian (Trace Time Latency < 30 phút):**
   - Không dựa trên lời hứa hẹn; chỉ số được chứng minh bằng kiến trúc cơ sở dữ liệu đồ thị và bảng chỉ mục sự kiện EPCIS:
   $$\text{Trace Query} = \texttt{SELECT * FROM events WHERE lot\_id IN (ancestor\_nodes(finished\_lot\_gci))}$$
   - Câu lệnh truy vấn trực tiếp trên đồ thị liên kết trả về toàn bộ cây phả hệ trong **dưới 3 giây** trên hệ thống máy chủ, thời gian còn lại (20–25 phút) là thời gian đối soát tài liệu giấy lưu trữ thực tế tại văn phòng khách hàng.
3. **Kiểm tra Tính logic của Điểm hòa vốn:**
   - Chi phí cố định hàng tháng Giai đoạn 1: ~180 triệu VND.
   - Doanh thu từ 2 Anchor SaaS (20M $\times$ 2 = 40M) + 3 Gói Chẩn đoán Dữ liệu (45M $\times$ 3 = 135M) + Phí Setup trạm cân (20M) = 195 triệu VND. Điểm hòa vốn vận hành tại Tháng 8–9 là hoàn toàn thực tế và có cơ sở tài chính vững chắc.

---
*Tài liệu thuộc Bản quyền Chiến lược của Ban Dự án GOTRACE Tây Nam Bộ — Lưu hành nội bộ Hội đồng Quản trị.*
