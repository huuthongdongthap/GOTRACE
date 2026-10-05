# PROJECT INITIATION REPORT: GOTRACE MEKONG PILOT 2026–2030
**Document Version:** 1.0  
**Prepared by:** PMO Sa Đéc – Western Mekong Delta Region (Long An to Cà Mau)  
**Date:** September 18, 2026  
**Status:** Approved for Execution  

---

## EXECUTIVE SUMMARY

GOTRACE V2.2 sẽ triển khai thí điểm khu vực Tây Nam Bộ thông qua mô hình **“Supply Chain Data Infrastructure + Network Enablement”** thay vì giải pháp tem QR đơn lẻ. Pilot tập trung vào chuỗi **Bột gạo & Sợi tươi tại Sa Đéc → Bếp ăn tập thể (trường học bán trú, KCN, bệnh viện)**, mở rộng dần sang Long An và Cà Mau trong vòng 12 tháng.

Tài liệu này bao gồm:
- **PMO Action Plan**: Kế hoạch hành động nội bộ cho team PMO Sa Đéc (90 ngày đầu).
- **Founder Playbook**: Dữ liệu chiến lược & thị trường để Founder thuyết phục đối tác lớn, ngân sách đầu tư công.
- **Sales/BizDev Playbook**: Quy trình tiếp cận doanh nghiệp theo 11 bước, entry offer là “Chẩn đoán dữ liệu chuỗi cung ứng” (2–4 tuần), không bán phần mềm ngay.

---

## 1. STRATEGIC THESIS & OBJECTIVES

### 1.1 Strategic Thesis (Luận điểm chiến lược)

ĐBSCL không thiếu nông sản và cũng không bắt đầu từ con số 0 về truy xuất nguồn gốc truyền thống.

Khoảng trống lớn nằm ở việc biến **dữ liệu phân tán** của hàng nghìn chủ thể thành **dữ liệu chuỗi có thể liên kết, kiểm chứng và sử dụng cho quyết định kinh doanh**.

GOTRACE nên tiếp cận Mekong không phải như một sản phẩm QR/truy xuất đơn lẻ mà như:

> **Supply Chain Data Infrastructure + Network Enablement**

Vai trò đề xuất:
- **Government Layer (Regulatory Pull):** Hạ tầng quản lý nhà nước, dashboard giám sát tỉnh/thành, case management vụ việc ATTP.
- **Anchor Enterprise (Enterprise Pull):** Kéo dữ liệu từ chuỗi cung ứng (nhà máy bột lớn, nhà thầu bếp ăn đầu tàu) tham gia chuẩn hóa GCI.
- **Network Effect:** Càng nhiều mắt xích tham gia, chi phí xác minh dữ liệu giảm xuống và giá trị mạng lưới tăng lên.

### 1.2 Objectives (Mục tiêu dự án)

| Nhóm | Mục tiêu | Chỉ số đánh giá |
| :--- | :--- | :--- |
| **Triển khai kỹ thuật** | Thiết lập hạ tầng GOTRACE V2.2 cho vùng Tây Nam Bộ | Core Objects (PARTY, PLACE, ITEM, EVENT…) + GCI registry hoạt động cho ≥50 chủ thể |
| **Pilot chuỗi thực tế** | Số hóa chuỗi Bột/Sơi tươi Sa Đéc → 3 loại bếp ăn | Trace Completeness ≥98%, Traceback Latency ≤15 phút |
| **Kinh tế - xã hội** | Giảm ≥80% thời gian thu hồi nhầm khi có sự cố ATTP | False-Positive Recall Rate <5% |
| **Pháp lý - tuân thủ** | Đạt 100% hồ sơ Kiểm thực ba bước QĐ 1246 cho các bếp ăn pilot | Không vi phạm Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân |
| **Nhân rộng** | Mở rộng ra Long An & Cà Mau sau 12 tháng | ≥5 Anchor Enterprises tại mỗi tỉnh ký SLA Gotrace |

---

## 2. PMO ACTION PLAN (INTERNAL EXECUTION)

### 2.1组织架构 & Roles (PMO Team Structure)

```
┌─────────────────────────────────────────────────────────────────┐
│                     ZAM VIETNAM FOUNDERS                         │
│                 (Hội đồng Quản trị / Tổng Giám đốc)              │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Ủy quyền đại diện hợp pháp & chỉ đạo chiến lược
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│               PMO KEY PERSON (Đại diện hợp pháp ủy quyền)         │
│              Trụ sở: Sa Đéc, Đồng Tháp — Phụ trách vùng TNB      │
├─────────────────────────────────────────────────────────────────┤
│ • Chịu trách nhiệm: Ký MOU với Sở/Bệnh viện/Trường học           │
│ • Điều phối team địa phương tại Long An, Đồng Tháp, Cà Mau       │
│ • Báo cáo trực tiếp cho Founders về tiến độ Pilot               │
└────────────┬───────────────────┬───────────────────┬───────────┘
             │                   │                   │
             ▼                   ▼                   ▼
    ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
    │  Tech Lead    │  │  BizDev Lead  │  │  Media Lead   │
    │  (Backend API │  │  (Anchor      │  │  (Video 4K,   │
    │   Connector)  │  │   Account     │  │   Storytelling)│
    │               │  │   Mgmt)       │  │               │
    └───────────────┘  └───────────────┘  └───────────────┘
```

### 2.2 Resource Requirements (Nhân sự & Công cụ cần thiết)

| Vai trò | Mô tả công việc | Nguồn lực | Thời gian |
| :--- | :--- | :--- | :--- |
| **PMO** | Đại diện pháp luật, ký kết, điều phối chính phủ-doanh nghiệp | Founder delegate hoặc nhân sự cấp C-level | Full-time |
| **Tech Lead** | Triển khai backend GOTRACE, tích hợp API/connector, mobile app | Senior Backend Engineer (Node.js/Go) | Full-time |
| **BizDev Lead** | Tiếp cận anchor enterprises, ký MOU với doanh nghiệp đầu tàu | Sales Manager với quan hệ tỉnh miền Tây | Full-time |
| **Media Lead** | Sản xuất video 4K chuỗi cung ứng, chụp ảnh bằng chứng hiện trường | Crew quay phim sự kiện (có sẵn) | Part-time |
| **Data Steward** | Quản lý dictionary, taxonomy, đảm bảo chất lượng dữ liệu | Junior Data Analyst | Full-time |
| **Mobile Field Worker** | Hỗ trợ doanh nghiệp quét mã QR, nhập liệu di động (bán thời gian) | Sinh viên thực tập IT địa phương | Part-time |

### 2.3 Timeline: 90-Day Launch Window

#### Phase 1: Month 1 – Foundation Setup (Tháng 1)
- [ ] **Ngày 1–10:** Ký biên bản ghi nhớ (MOU) với **Sở Khoa học & Công nghệ Đồng Tháp** + **Chi cục ATVSTP**.
- [ ] **Ngày 11–20:** Chọn **3 Anchor Enterprises** làm đối tượng thí điểm:
  1. *Công ty TNHH Tinh Bột Xanh* (ESG/Kinh tế tuần hoàn).
  2. *Nhà thầu suất ăn trường học ABC* (Bếp ăn tập thể).
  3. *HTX Bột Sa Đéc* (Nguyên liệu nguồn).
- [ ] **Ngày 21–30:** Tuyển dụng/phan bổ team Tech Lead + BizDev Lead; mua sắm/sửa chữa server hạ tầng GOTRACE region.

#### Phase 2: Month 2 – Technical Integration (Tháng 2)
- [ ] **Tuần 1–2:** Cài đặt backend GOTRACE V2.2 (core services, event ledger, evidence index, government dashboard).
- [ ] **Tuần 3–4:** Triển khai **Mobile App (Field Scanner)** cho nhân viên doanh nghiệp quét mã GCI, chụp ảnh kiểm thực 3 bước.
- [ ] **Tuần 4:** Tích thử nghiệm với 1 ERP/MES đơn giản của Tinh Bột Xanh qua REST API.

#### Phase 3: Month 3 – Operations & Validation (Tháng 3)
- [ ] **Tuần 1–2:** Chạy song song quy trình thật tại 3 anchor enterprises; thu thập dữ liệu sự kiện `EVENT` cho từng lô/batch.
- [ ] **Tuần 3:** Sản xuất **video tư liệu 4K mẫu** “Hành trình mẻ bột sạch từ làng nghề tới học đường”.
- [ ] **Tuần 4:** Tổ chức hội thảo báo cáo kết quả có sự tham dự của lãnh đạo Chi cục ATVSTP, Sở GD&ĐT; đóng gói **Bộ chuẩn chuyển đổi số bếp ăn**.

### 2.4 Budget Estimate (Dự toán chi phí 90 ngày)

| Hạng mục | Chi tiết | Chi phí ước tính (VND) |
| :--- | :--- | :--- |
| **Nhân sự核心团队** | 5 người (1 PMO, 1 Tech, 1 BizDev, 1 Media, 1 Data) x 3 tháng | 450,000,000 |
| **Hạ tầng Cloud** | Server, Database, Storage, CDN (AWS/Vietnamese cloud provider) | 75,000,000 |
| **Thiết bị di động** | 10 smartphone chuyên dụng cho field workers | 50,000,000 |
| **Production Video** | Quay dựng, hậu kỳ, nhạc bản quyền cho 1 chuỗi phim 4K | 30,000,000 |
| **Chi phí vận hành** | Văn phòng, đi lại, họp, legal fees, marketing materials | 45,000,000 |
| **Contingency (10%)** | Dự phòng rủi ro | 65,000,000 |
| **Tổng cộng** | | **715,000,000 VND (~$29,000 USD)** |

*(Chi phí này có thể giảm nếu tận dụng infrastructure đám mây hiện có từ ZAM Vietnam)*

---

## 3. FOUNDER PLAYBOOK (STRATEGIC PITCH TO STAKEHOLDERS)

### 3.1 Value Proposition для Founders

Founders cần thuyết phục ai?
- **Chính phủ (Sở, UBND Tỉnh):** Cần dữ liệu tổng hợp để quản lý an toàn thực phẩm, phòng ngừa khủng hoảng.
- **Anchor Enterprises (Tinh Bột Xanh, Bích Chi, Sa Giang):** Cần lợi thế cạnh tranh, ESG storytelling, mở rộng xuất khẩu.
- **Investors/Family Office:** Cần ROI rõ ràng, khả năng nhân rộng, barrier to entry cao.

### 3.2 Key Messaging Pillars (Thông điệp then chốt)

```
┌─────────────────────────────────────────────────────────────────┐
│  PILAR 1: Regulatory Safety Net                                  │
│  "GOTRACE giúp Chính phủ tỉnh phòng ngừa ngộ độc, giảm          │
│  khủng hoảng bằng traceforward traceback thời gian thực."      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  Pilar 2: Competitive Differentiator                             │
│  "Doanh nghiệp tham gia GOTRACE bán được hàng cao hơn nhờ      │
│  minh bạch nguyên liệu, xuất khẩu sang EU/Mỹ dễ dàng hơn."      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  Pilar 3: Scalable Infrastructure                                │
│  "Không phải bán tem QR; xây hạ tầng dữ liệu dùng chung        │
│  phục vụ toàn bộ vùng Tây Nam Bộ – network effect tăng giá trị │
│  theo thời gian."                                                │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Business Model for Investors

| Doanh thu | Mô hình | Ví dụ |
| :--- | :--- | :--- |
| **GCI Registration Fees** | Phí định danh GCI theo số lượng item/lot | 50,000 VND/item/year cho 10,000 items = 500M VND/năm |
| **Event Ledger Subscriptions** | Phí duy trì sổ cái sự kiện theo volume | 20M VND/tháng cho doanh nghiệp lớn (unlimited events) |
| **Government Dashboard Licenses** | Gói license cho Sở/Tỉnh (RBAC, aggregate-first) | 100M VND/năm cho 1 tỉnh |
| **Connector Implementation Fees** | Phí tích hợp ERP/MES/LIMS với GOTRACE API | 50–100M VND/hệ thống |
| **Premium Analytics & Reports** | Phân tích thị trường, cảnh báo rủi ro, forecasting | 30M VND/báo cáo/quý |
| **Visual Evidence Production** | Gói sản xuất video 4K chuỗi cung ứng (không phải recurring) | 200–300M VND/chuỗi phim |

---

## 4. SALES & BIZDEV PLAYBOOK (ENTERPRISE ACQUISITION)

### 4.1 11-Step Sales Funnel (NOT Demo → Quote → Contract)

```
[1] Market Mapping      → Xác định top 20 anchor enterprises in TLN (Tây Nam Bộ)
        ↓
[2] Account Qualification → Đánh giá theo 6 tiêu chí (Network Reach, Traceability Pain...)
        ↓
[3] Executive Discovery  → Cuộc họp C-level với CEO/General Director, tìm economic pain
        ↓
[4] Supply Chain Diagnostic → 2–4 tuần kiểm toán dữ liệu, không bán phần mềm
        ↓
[5] Traceability Proof    → Chạy thử nghiệm nhỏ: 1 lô hàng từ nguyên liệu đến khách hàng
        ↓
[6] Pilot Agreement       → Ký thỏa thuận pilot 90 ngày với SLA rõ ràng
        ↓
[7] Business Case         → Chứng minh ROI: giảm thu hồi nhầm 80%, tăng sales 15%
        ↓
[8] Contract Signing      → Hợp đồng năm đầu tiên
        ↓
[9] Supplier Expansion    → Kéo nhà cung cấp của anchor enterprise vào mạng lưới
        ↓
[10] Regional Network     → Mở rộng sang tỉnh lân cận (Long An, Kiên Giang)
        ↓
[11] Platform Ecosystem   → Mở API marketplace, third-party integrations
```

### 4.2 Entry Offer: Supply Chain Data Diagnostic (2–4 Tuần)

**Không bán phần mềm ngay!** Thay vào đó, tài trợ hoặc bán gói “chẩn đoán dữ liệu” để:
1. Chỉ ra lỗ hổng dữ liệu hiện tại (ví dụ: không thể traceback khi có sự cố).
2. Đo lường rủi ro pháp lý (vi phạm QĐ 1246/QĐ-BYT).
3. Đề xuất kiến trúc phù hợp nhất cho doanh nghiệp.

Deliverables:
- Report đánh giá dữ liệu chuỗi cung ứng (hiện trạng + đề xuất).
- Prototype GCI mapping cho sản phẩm chủ lực.
- Business Case ROI dự kiến sau triển khai đầy đủ.

### 4.3 Account Qualification Criteria (6 Tiêu chí)

Khi chọn anchor enterprise, đánh giá theo thứ tự ưu tiên:

| # | Tiêu chí | Điểm số (1–5) | Gợi ý câu hỏi khảo sát |
| :--- | :--- | :--- | :--- |
| 1 | **Network Reach** (Độ vươn mạng lưới vệ tinh) | ___ | “Doanh nghiệp có bao nhiêu nhà cung cấp/người phân phối trong vùng?” |
| 2 | **Traceability Pain** (Nỗi đau thực sự) | ___ | “Có lần nào bị thu hồi hàng/phạt/khủng hoảng ATTP chưa?” |
| 3 | **Data Complexity** (Độ phức tạp dữ liệu) | ___ | “Hệ thống ERP/MES hiện tại có gì khó khăn khi theo dõi lô/batch?” |
| 4 | **Buyer Authority** (Thẩm quyền người ra quyết định) | ___ | “Ai là người cuối cùng ký hợp đồng mua phần mềm/triết khai dự án?” |
| 5 | **Digital Readiness** (Mức độ sẵn sàng số hóa) | ___ | “Nhân viên đã quen dùng smartphone/tablet cho công việc chưa?” |
| 6 | **Expansion Potential** (Tiềm năng nhân rộng) | ___ | “Doanh nghiệp có sẵn sàng giới thiệu sang tỉnh khác sau khi thành công?” |

=> Chọn doanh nghiệp có tổng điểm $\ge 25/30$.

### 4.4 Pitch Script Template (Kịch bản thuyết trình C-level)

```
LỜI MỞ ĐẦU (3 phút):
“Kính thưa ông/bà, trong ngành [bột/sợi/thực phẩm], chúng ta đang đối mặt với 3 thách thức:
(1) Rủi ro pháp lý từ QĐ 1246 về kiểm thực 3 bước;
(2) Không thể traceback nhanh khi có sự cố ngộ độc;
(3) Khó chứng minh minh bạch với khách hàng xuất khẩu.”

PROBLEM FRAME (3 phút):
“GOTRACE không bán phần mềm tem QR. Chúng tôi xây hạ tầng dữ liệu chuỗi cung ứng giúp:
- Giảm 80% thời gian traceback từ 1 ngày xuống 15 phút;
- Phòng ngừa 100% vi phạm QĐ 1246;
- Tăng brand equity với khách hàng EU/Mỹ nhờ Digital Product Passport.”

ENTRY OFFER (2 phút):
“Chúng tôi không yêu cầu cam kết mua hàng ngay. Trong 2–4 tuần tới, team GOTRACE sẽ
tiến hành ‘Chẩn đoán dữ liệu chuỗi cung ứng’ miễn phí/fair fee cho doanh nghiệp, 
chỉ ra lỗ hổng và ROI dự kiến. Nếu thấy phù hợp, chúng ta cùng làm pilot 90 ngày.”

CALL TO ACTION (1 phút):
“Tôi xin phép đề nghị ông/bà cho phép tổ chức cuộc họp kỹ thuật với đội ngũ quản lý 
dữ liệu/an toàn thực phẩm của doanh nghiệp vào tuần tới. Được không ạ?”
```

---

## 5. WEB APP PLATFORM FOR PMO EXECUTION

### 5.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PMO WEB PORTAL (React + Tailwind)            │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Dashboard    │  │ Anchor Co.   │  │ Govt Layer   │          │
│  │ (KPIs)       │  │ Management   │  │ (Access RBAC)│          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Event Ledger │  │ Evidence     │  │ Case         │          │
│  │ Viewer       │  │ Gallery      │  │ Management   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                GOTRACE CORE SERVICES (Node.js/Go)               │
│  • GCI Registry  • Event Ledger  • Evidence Index  • RBAC/API  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Mobile SDK
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PMO FIELD MOBILE APP (React Native)            │
│  • Scan GCI QR  • Capture Inspection Evidence  • Offline Mode  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Core Features (Modules)

| Module | Chức năng | Đối tượng sử dụng |
| :--- | :--- | :--- |
| **Dashboard** | KPI tổng hợp: Coverage, Active Events, Alert Count, Recall Scope | PMO Leader, Govt Officials |
| **Anchor Co. Management** | Danh sách doanh nghiệp, SLA status, contract expiry alerts | BizDev Lead |
| **Govt Layer View** | Dashboard tỉnh, drill-down theo mandate, aggregate-first reports | Chi cục ATVSTP, Sở KH&CN |
| **Event Ledger Viewer** | Xem dòng thời gian sự kiện (traceforward/traceback) | Tech Lead, Auditors |
| **Evidence Gallery** | Kho lưu trữ ảnh chụp kiểm thực 3 bước, lưu mẫu 24h, phiếu test | Food Safety Inspectors |
| **Case Management** | Xử lý cảnh báo, khiếu nại, lệnh thu hồi (workflow routing) | Incident Responders |
| **Mobile Sync** | Đồng bộ offline data → upload khi online | Field Workers |

### 5.3 MVP Feature Set (90-day Build Priority)

#### Week 1–4: Foundation
- User authentication (RBAC-based login).
- GCI registry lookup page (public scan view).
- Basic dashboard (active accounts, total events processed).

#### Week 5–8: Core Modules
- Event Ledger Viewer (filter by item/lot/place/date).
- Evidence Gallery (upload/download metadata, image hash verification).
- Anchor Co. CRUD (create/read/update/delete enterprise profiles).

#### Week 9–12: Advanced Features
- Case Management workflow (alert → assign → resolve → close).
- Mobile app beta (offline mode + sync validation).
- Government layer with drill-down restrictions.

---

## 6. RISKS & MITIGATION STRATEGIES

| Risk | Probability | Impact | Mitigation Strategy | Owner |
| :--- | :--- | :--- | :--- | :--- |
| **Doanh nghiệp không muốn chia sẻ dữ liệu** | Cao | Trung bình | Nhấn mạnh “Connect, not Replace”; cam kết bảo vệ bí mật thương mại | BizDev Lead |
| **Nhân sự nhà máy không quen quét QR** | Trung bình | Cao | Đào tạo tại chỗ; cung cấp device miễn phí; gamification (điểm thi đua) | Tech Lead |
| **Cơ quan Nhà nước xem quá mức dữ liệu** | Trung bình | Cao | Áp dụng nguyên tắc aggregate-first; audit trail mọi truy cập | PMO |
| **Dữ liệu không đồng bộ giữa các hệ thống** | Cao | Trung bình | Chuẩn hóa schema theo Universal Core; reconciliation service | Tech Lead |
| **Budget overruns do pilot kéo dài** | Thấp | Cao | Milestone-based billing; weekly progress review meetings | PMO |

---

## 7. ACCEPTANCE CRITERIA (PROJECT LAUNCH)

Dự án được coi là hoàn thành giai đoạn khởi tạo khi đạt được tất cả các tiêu chí sau:

- [ ] **PMO Team Operational:** 5 nhân sự chính thức hoạt động tại văn phòng Sa Đéc.
- [ ] **3 Anchor Enterprises Signed:** MOU/SLA với 3 doanh nghiệp đầu tàu (Tinh Bột Xanh, nhà thầu bếp ăn, HTX Bột).
- [ ] **Technical Baseline:** GOTRACE backend operational, mobile app beta deployed to Android devices.
- [ ] **First 1000 Events Captured:** Thực tế dữ liệu sự kiện đã được ingest vào ledger.
- [ ] **Executive Buy-in:** Founder presentation delivered to investors/government stakeholders.
- [ ] **Web Portal Live:** PMO execution portal accessible internally.

---

## UNRESOLVED QUESTIONS

1. **Data ownership model:** Có nên yêu cầu doanh nghiệp chuyển nhượng dữ liệu tuyệt đối hay chỉ là license tạm thời cho GOTRACE?
2. **Revenue-sharing arrangement:** Khi mở rộng sang tỉnh khác (Long An, Cà Mau), cơ chế chia sẻ doanh thu giữa PMO Sa Đéc và HQ ra sao?
3. **Legal entity structure:** Nên thành lập subsidiary riêng tại ĐBSCL hay giữ dưới dạng branch office của ZAM Vietnam?

---

## APPENDIX A: GLOSSARY

| Term | Definition |
| :--- | :--- |
| **GCI** | GOTRACE Canonical Identifier — Định danh logic chuẩn hóa GT:<CC>:<TYPE>:<AUTHORITY>:<LOCAL-ID> |
| **Traceforward** | Truy xuôi từ nguyên liệu → thành phẩm → khách hàng cuối |
| **Traceback** | Truy ngược từ sản phẩm lỗi → lô nguyên liệu → nguồn gốc |
| **EVIDENCE** | Bằng chứng gốc (phiếu test, ảnh chụp, biên bản) đính kèm sự kiện chuỗi cung ứng |
| **CREDENTIAL** | Chứng nhận/chứng chỉ (ISO, HACCP, VietGAP, Giấy ATTP) của chủ thể |
| **CASE** | Hồ sơ vụ việc (cảnh báo ngộ độc, khiếu nại, lệnh thu hồi) |
| **Selective Disclosure** | Nguyên tắc công bố có chọn lọc: public vs private vs regulator-restricted data |

---

## APPENDIX B: REFERENCES

1. DEAN_THUYET_MINH_GOTRACE_V2.2.docx (ZAM Vietnam, Sept 2026)
2. GoTrace_Gia_tri_chuoi_cung_ung_va_kinh_te_du_lieu.docx
3. PMO Initiative Report v1.0 (this document)

---

**Document Status:** Approved for Execution  
**Next Step:** Delegate to `/mk:cook` or Task tool to initiate Phase 1 activities.
