# 05_PMO EXECUTION PLAN — GOTRACE MEKONG
## 90-Day Launch Framework · Team Design · Budget · Risk Register

**Version:** 1.0 — September 2026
**Dành cho:** PMO Team tại ĐBSCL — Trình bày Ban Giám đốc / Founder GOTRACE
**Mục tiêu:** Đưa GOTRACE từ "kế hoạch" sang "pilot thực tế đang chạy" trong 90 ngày.

---

## PHẦN A — NGUYÊN TẮC VẬN HÀNH PMO

### A.1 Ba Ưu Tiên Cứng — Không Thay Đổi

```
1. ANCHOR FIRST — Không scale trước khi có Anchor đã ký
   → Mọi hoạt động field phải phục vụ mục tiêu ký Anchor Agreement

2. DATA INTEGRITY — Không có dữ liệu kém hơn có
   → Thà pilot nhỏ với data tốt còn hơn pilot lớn với data rác

3. PROVE VALUE TRƯỚC KHI EXPAND — Pilot phải có Business Case cụ thể
   → Không mở vertical mới trước khi vertical đầu tiên có Revenue Signal
```

### A.2 Định Nghĩa Thành Công 90 Ngày

```
MUST HAVE (Bắt buộc — không đạt = STOP & Review):
  ✅ Ký được ≥ 1 Anchor Agreement (bất kỳ vertical nào)
  ✅ Pilot đang chạy với dữ liệu thực — ít nhất 1 LOT được trace đầy đủ
  ✅ Có ít nhất 1 KPI cải thiện so với baseline đo được

SHOULD HAVE (Nên đạt):
  🎯 Ký được ≥ 2 Anchor Agreement (ưu tiên: Rice + Kitchen)
  🎯 ≥ 5 HTX / Supplier đã onboarded và đang nhập dữ liệu
  🎯 Business Case sơ bộ với số liệu thực từ pilot

NICE TO HAVE:
  💡 1 Inbound inquiry từ Anchor không tiếp cận trước
  💡 1 Referral từ Anchor đang pilot
  💡 MOU với đơn vị chính phủ (UBND tỉnh hoặc Sở NN)
```

---

## PHẦN B — CẤU TRÚC PMO TEAM

### B.1 Sơ Đồ Tổ Chức PMO

```
                    FOUNDER / CEO GOTRACE
                           │
                    PMO LEAD (1 người)
                    Cần Thơ / Đồng Tháp
                    ┌──────┼──────────┐
                    │      │          │
             BD Lead  Technical    Field Ops
             (1 người) Lead (1)    Lead (1)
                    │              │
             BD Support         Field Agents
             (1 người)          (2 người)
                                Đồng Tháp + An Giang
```

### B.2 Mô Tả Vai Trò Chi Tiết

**PMO Lead (1 người)**
- Báo cáo trực tiếp: Founder / CEO
- Trách nhiệm: Quản lý toàn bộ pilot, phân bổ nguồn lực, báo cáo tuần
- KPI cá nhân: Số Anchor ký, số pilot đang chạy, Budget vs. Actuals
- Profile: Có kinh nghiệm quản lý dự án B2B tại miền Tây, biết ngành nông nghiệp
- Địa điểm: Cần Thơ (hub trung tâm)

**Business Development Lead (1 người)**
- Trách nhiệm: Tiếp cận Anchor, Discovery meeting, Diagnostic offer, ký thầu
- KPI: Số cuộc gặp/tuần, số Diagnostic đang chạy, số Anchor Agreement ký
- Profile: Có network trong ngành gạo hoặc trái cây tại ĐBSCL
- Địa điểm: Đồng Tháp (gần Anchor candidates đầu tiên)

**BD Support (1 người)**
- Trách nhiệm: Chuẩn bị tài liệu thầu, theo dõi pipeline CRM, research account
- KPI: Tài liệu sẵn sàng đúng hạn, CRM được cập nhật mỗi tuần
- Profile: Junior BD, tốt nghiệp đại học Cần Thơ / An Giang ngành kinh tế/nông nghiệp

**Technical Lead (1 người)**
- Trách nhiệm: Setup data model cho từng pilot, demo, training, integration
- KPI: Số pilot đang running ổn định, uptime hệ thống, data quality score
- Profile: Software background, hiểu agri supply chain hoặc học nhanh
- Địa điểm: Remote (Cần Thơ hoặc TP.HCM)

**Field Agent (2 người — 1 Đồng Tháp, 1 An Giang)**
- Trách nhiệm: Thực địa tại HTX / Vùng trồng / Packhouse, hỗ trợ nhập liệu
- KPI: Số HTX/Supplier đã onboard, data submission rate, spot-check accuracy
- Profile: Biết tiếng địa phương, có xe máy, tốt nghiệp Cao đẳng/ĐH ngành nông nghiệp
- Budget: ~15–20 triệu VND/người/tháng (all-in)

### B.3 RACI Matrix — Các Quyết Định Quan Trọng

| Quyết định | PMO Lead | BD Lead | Tech Lead | Field Agent | Founder |
|:---|:---:|:---:|:---:|:---:|:---:|
| Chọn Anchor để tiếp cận | A | R | I | I | C |
| Điều khoản Anchor Agreement | C | R | I | — | A |
| Pilot scope & KPI | R | C | C | I | A |
| Budget allocation | R | I | I | I | A |
| Expand sang Anchor mới | C | R | I | I | A |
| Go/No-Go sau pilot | R | C | C | I | A |
| Giá pricing pilot | C | R | — | — | A |

*R = Responsible | A = Accountable | C = Consulted | I = Informed*

---

## PHẦN C — KẾ HOẠCH 90 NGÀY CHI TIẾT

### C.1 GIAI ĐOẠN 1 — NGÀY 1–30: FOUNDATION

**Mục tiêu:** Ký được Diagnostic Agreement với ≥ 1 Anchor. Setup hệ thống sẵn sàng.

```
TUẦN 1 (Ngày 1–7): INTERNAL SETUP
  PMO:
    □ PMO Lead + BD Lead: Kickoff meeting với Founder — align chiến lược
    □ Xác nhận danh sách Anchor Candidates ưu tiên (top 10)
    □ Setup công cụ: CRM (Notion/Airtable), Zalo group, báo cáo tuần
    □ Technical Lead: Setup môi trường GOTRACE, cấu hình 3 data model cơ bản
    □ In tài liệu Diagnostic Offer, Playbook tóm tắt

  Field:
    □ Field Agent 2 người: Nhận Playbook, đọc và nắm ICP
    □ Map địa bàn: Đồng Tháp (Cao Lãnh, Sa Đéc, Châu Thành)
    □ Identify contact point tại HTX qua mạng lưới hiện có

TUẦN 2 (Ngày 8–14): FIRST CONTACT
  BD:
    □ 10 cuộc gặp cold outreach với Anchor Candidates
    □ Mục tiêu: ≥ 3 cuộc gặp thực sự với decision maker
    □ Sử dụng: "Truy xuất nguồn gốc — Anh mất bao lâu?" opening

  Field:
    □ Visit 5 HTX lúa gạo tại Đồng Tháp (tìm hiểu quy trình hiện tại)
    □ Ghi chép: Họ dùng gì? Sổ tay / Excel / gì? Khó khăn gì?
    □ Kết quả: Field Research Note gửi PMO Lead

  Tech:
    □ Chuẩn bị Demo environment với dữ liệu mẫu (Rice + Kitchen)
    □ Script demo: "Truy xuất ngược 5 phút" + "Mass Balance Alert"

TUẦN 3 (Ngày 15–21): DIAGNOSTIC PITCH
  BD:
    □ Pitch Diagnostic Offer cho ≥ 3 Anchor candidates
    □ Goal: ≥ 1 Anchor đồng ý Diagnostic (paid hoặc negotiation)
    □ Báo cáo: Pipeline status, top 3 Anchor đang thương lượng

  Tech:
    □ Chạy demo live với ít nhất 2 Anchor candidates
    □ Ghi lại feedback: Họ hỏi gì? Lo ngại gì?

TUẦN 4 (Ngày 22–30): CLOSE DIAGNOSTIC AGREEMENT
  BD + PMO:
    □ Close ≥ 1 Diagnostic Agreement
    □ Nếu chưa close: Review → Điều chỉnh pitch → 2 tuần thêm

  Gate Review Ngày 30:
    □ ≥ 1 Diagnostic Agreement ký? → GO sang Phase 2
    □ 0 Agreement? → STOP. Review với Founder. Điều chỉnh ICP hoặc Offer.
```

**Deliverables Giai Đoạn 1:**
- [ ] Pipeline CRM với ≥ 10 Anchor accounts
- [ ] ≥ 3 Demo đã thực hiện
- [ ] ≥ 1 Diagnostic Agreement ký
- [ ] Field Research Note từ 5 HTX
- [ ] Demo environment sẵn sàng

---

### C.2 GIAI ĐOẠN 2 — NGÀY 31–60: PILOT LAUNCH

**Mục tiêu:** Pilot đang chạy với dữ liệu thực. Ít nhất 1 LOT được trace đầy đủ.

```
TUẦN 5–6 (Ngày 31–44): DIAGNOSTIC EXECUTION
  Tech + Field:
    □ Thực hiện Diagnostic tại Anchor: Mapping supply chain
    □ Live LOT Test: Trace 1 lô thực tế bằng hệ thống hiện tại của Anchor
    □ Đo: Mất bao lâu, bao nhiêu bước, thiếu gì
    □ Ghi chép: Integration complexity, data readiness assessment

  BD:
    □ Tiếp tục outreach 5 Anchor candidates mới song song
    □ Pipeline phải luôn > 3 active prospects

TUẦN 7 (Ngày 45–51): PILOT DESIGN & SIGN-OFF
  PMO + Tech:
    □ Gap Report: Trình bày với Anchor Economic Buyer
    □ Pilot Proposal: Scope, KPI baseline, Timeline, Price
    □ Mục tiêu: Anchor sign-off Pilot Agreement

  Field:
    □ HTX Onboarding: Bắt đầu với 5 HTX ưu tiên
    □ Training: Hướng dẫn nhập liệu qua Zalo / Web form
    □ Setup: QR code cho từng HTX, phiếu cân template

TUẦN 8 (Ngày 52–58): GO-LIVE
  Tech:
    □ Go-live: Anchor + 5 HTX bắt đầu nhập dữ liệu thực
    □ Monitor: Data submission rate, data quality score
    □ Alert: Ping Field Agent nếu HTX nào 2 ngày không có data

  Field:
    □ Thực địa 3×/tuần tại HTX
    □ Spot-check: 10% dữ liệu đối chiếu với sổ tay thực tế

TUẦN 9 (Ngày 59–60): FIRST MILESTONE CHECK
  PMO:
    □ Dashboard review: KPI so với baseline
    □ Có ít nhất 1 LOT được trace đầy đủ chưa?
    □ Data submission rate > 50% chưa?
    □ Báo cáo tuần 9 gửi Founder

  Gate Review Ngày 60:
    □ Pilot đang chạy với data thực? → GO sang Phase 3
    □ Data quality <30%? → Field Agent tăng cường, không mở thêm Anchor
```

**Deliverables Giai Đoạn 2:**
- [ ] Diagnostic Gap Report cho Anchor
- [ ] Pilot Agreement ký
- [ ] 5 HTX onboarded và đang nhập liệu
- [ ] ≥ 1 LOT traced đầy đủ (có thể demo)
- [ ] KPI baseline documented

---

### C.3 GIAI ĐOẠN 3 — NGÀY 61–90: PROVE VALUE

**Mục tiêu:** Có Business Case cụ thể từ số liệu thực. Chuẩn bị expansion proposal.

```
TUẦN 10–11 (Ngày 61–77): PILOT OPERATION & DATA COLLECTION
  Tech:
    □ Vận hành ổn định, fix bugs, cải thiện UX từ feedback thực tế
    □ Build: Mass Balance Report tự động
    □ Build: First KPI Dashboard cho Anchor

  Field:
    □ Mở rộng: Onboard thêm 5–10 HTX nếu data quality > 70%
    □ Spot-check: Tần suất tăng trước khi báo cáo cuối

  BD:
    □ ≥ 1 Anchor Agreement mới (khác vertical nếu có thể)
    □ Kitchen Anchor tiếp cận song song (không phụ thuộc mùa vụ)

TUẦN 12 (Ngày 78–84): BUSINESS CASE BUILD
  PMO + Tech:
    □ Compile: So sánh KPI Before vs. After Pilot
    □ Calculate: ROI hypothesis với số liệu thực
    □ Prepare: Expansion Proposal (từ Pilot → Full Anchor contract)

TUẦN 13 (Ngày 85–90): PILOT REVIEW & NEXT PHASE
  PMO + BD:
    □ Pilot Review Meeting với Economic Buyer
    □ Present: Business Case, KPI improvement, Expansion Proposal
    □ Goal: Ký Full Anchor Contract hoặc Extended Pilot

  Ngày 90 — Board Report:
    □ PMO Lead trình bày với Founder / Board:
       - Số Anchor ký, Pilot đang chạy
       - KPI achieved vs. target
       - Budget actuals vs. plan
       - Recommendation cho Phase 2 (Tháng 4–6/2027)
```

**Deliverables Giai Đoạn 3:**
- [ ] Pilot Report với KPI Before/After
- [ ] Business Case có số liệu thực
- [ ] Expansion Proposal
- [ ] Board Report 90 ngày
- [ ] Recommendation cho Phase 2

---

## PHẦN D — BUDGET 90 NGÀY

### D.1 Budget Breakdown

| Hạng mục | Đơn vị | Tháng 1 | Tháng 2 | Tháng 3 | Tổng |
|:---|:---|:---:|:---:|:---:|:---:|
| **NHÂN SỰ** | | | | | |
| PMO Lead | 25–35 triệu/tháng | 30 | 30 | 30 | **90** |
| BD Lead | 20–30 triệu/tháng | 25 | 25 | 25 | **75** |
| BD Support | 10–15 triệu/tháng | 12 | 12 | 12 | **36** |
| Technical Lead | 25–35 triệu/tháng | 30 | 30 | 30 | **90** |
| Field Agent × 2 | 15–20 triệu/tháng | 35 | 35 | 35 | **105** |
| **Subtotal Nhân sự** | | **132** | **132** | **132** | **396** |
| | | | | | |
| **VẬN HÀNH** | | | | | |
| Di chuyển (xe máy, xăng, đò) | — | 15 | 15 | 15 | **45** |
| Accommodation Field Agent | — | 5 | 5 | 5 | **15** |
| Thiết bị (tablet, sim, QR printer) | One-time | 20 | 0 | 0 | **20** |
| Tài liệu, in ấn, quà nhỏ HTX | — | 5 | 5 | 5 | **15** |
| **Subtotal Vận hành** | | **45** | **25** | **25** | **95** |
| | | | | | |
| **KỸ THUẬT** | | | | | |
| Cloud hosting / Server | — | 5 | 5 | 5 | **15** |
| Software tools (CRM, Zalo OA) | — | 3 | 3 | 3 | **9** |
| **Subtotal Kỹ thuật** | | **8** | **8** | **8** | **24** |
| | | | | | |
| **DỰ PHÒNG (10%)** | | **19** | **17** | **17** | **52** |
| | | | | | |
| **TỔNG** | | **~204** | **~182** | **~182** | **~568** |

> **Tổng budget 90 ngày: ~550–600 triệu VND** (tùy salary thực tế và mức độ field activity)

### D.2 Revenue Target 90 Ngày

| Nguồn | Q4/2026 Target | Ghi chú |
|:---|:---|:---|
| Diagnostic Fees | 2–3 × 30–50 triệu | Paid diagnostic, không miễn phí |
| Pilot Contracts | 1–2 × 50–100 triệu | Pilot 90 ngày hoặc 6 tháng |
| **Tổng Revenue Target** | **~200–300 triệu** | Bù ~35–50% cost |

> **Kỳ vọng thực tế:** Q4/2026 là giai đoạn đầu tư. Revenue bù một phần chi phí. Breakeven từ Q2/2027 khi Full Anchor Contracts chạy.

---

## PHẦN E — RISK REGISTER

### E.1 Top 12 Rủi Ro — Có Mitigation Plan

| # | Rủi ro | Xác suất | Tác động | Mitigation |
|:---|:---|:---:|:---:|:---|
| **R01** | Không ký được Anchor nào trong 30 ngày | Trung bình | Rất cao | Xem R01 detail bên dưới |
| **R02** | Anchor ký nhưng team nội bộ không dùng | Cao | Cao | Field Agent hỗ trợ tại chỗ 3×/tuần |
| **R03** | HTX từ chối cung cấp dữ liệu | Cao | Cao | Zalo-first, cực đơn giản, Field Agent hỗ trợ |
| **R04** | Data quality quá thấp → không có giá trị | Trung bình | Rất cao | Spot-check 10%, halt nếu <30% accuracy |
| **R05** | Technical Lead không available / quit | Thấp | Rất cao | Backup: outsource theo task, không full-time |
| **R06** | Anchor bị phá sản / thay đổi leadership | Thấp | Cao | Không phụ thuộc 1 Anchor, luôn có pipeline |
| **R07** | Cạnh tranh từ iCheck hoặc platform khác | Thấp-Trung | Trung bình | Positioning rõ ràng (không phải QR) |
| **R08** | GACC / regulatory thay đổi ảnh hưởng pain | Thấp | Trung bình | Diversify vertical (Rice + Kitchen không phụ thuộc GACC) |
| **R09** | Field Agent không hiệu quả ở địa bàn | Trung bình | Cao | KPI rõ ràng, review tuần 4 và tuần 8 |
| **R10** | Budget overrun | Trung bình | Trung bình | 10% contingency, weekly budget tracking |
| **R11** | Mùa vụ lúa không phù hợp cho pilot | Thấp (đã plan) | Trung bình | Agricultural Calendar đã map — Đông Xuân Nov-Mar |
| **R12** | Sản phẩm chưa đủ tính năng cho Anchor | Trung bình | Rất cao | Pilot scope nhỏ, không over-promise |

### E.2 Risk R01 — Không Ký Được Anchor: Escalation Protocol

```
NGÀY 15: Chưa có cuộc gặp nào với Decision Maker
  → Review: ICP đúng chưa? Outreach channel đúng chưa?
  → Action: Founder/CEO tham gia trực tiếp 1-2 cuộc gặp

NGÀY 21: Có gặp nhưng chưa ai đồng ý Diagnostic
  → Review: Pitch có vấn đề gì? Offer có đủ hấp dẫn không?
  → Action: Điều chỉnh Entry Offer (giá, scope, cam kết)
  → Parallel: Mở thêm 5 Anchor candidates mới

NGÀY 30: Vẫn chưa ký được gì
  → STOP. Họp khẩn với Founder.
  → 3 lựa chọn:
     A. Đổi ICP — tiếp cận Kitchen thay vì Rice
     B. Đổi Offer — miễn phí pilot đầu tiên (chấp nhận mất revenue)
     C. Đổi BD Lead — nếu vấn đề là người
```

### E.3 Go / No-Go Criteria Rõ Ràng

| Milestone | Go Criteria | No-Go → Action |
|:---|:---|:---|
| **Ngày 30** | ≥ 1 Diagnostic Agreement ký | Review ICP + Offer với Founder |
| **Ngày 45** | Diagnostic đang chạy thực tế | Tìm nguyên nhân delay, không thêm Anchor |
| **Ngày 60** | ≥ 1 LOT traced đầy đủ trong hệ thống | Tăng Tech + Field support |
| **Ngày 75** | Data submission rate ≥ 50% | Review Field Ops model, không mở HTX mới |
| **Ngày 90** | ≥ 1 Pilot có KPI cải thiện đo được | Extend pilot thêm 30 ngày trước khi scale |

---

## PHẦN F — AGRICULTURAL CALENDAR ALIGNMENT

### F.1 Lịch Vận Hành PMO theo Mùa Vụ

```
THÁNG 9–10/2026 (Phase 1: Foundation)
  Lúa: Đang vụ Thu Đông → Có thể capture dữ liệu đầu tiên
  Trái cây: Off-season (sầu riêng sau vụ chính, xoài chưa vào vụ)
  Kitchen: Bất kỳ lúc nào → ƯU TIÊN KITCHEN PILOT nếu Rice chậm
  → PMO Focus: Setup + Ký Anchor + Onboard HTX

THÁNG 11/2026 (Phase 2: Pilot Launch)
  Lúa: Bắt đầu gieo mạ Đông Xuân → PILOT RICE BẮT ĐẦU
  Trái cây: Vẫn off-season → Tiếp tục setup packhouse system
  Kitchen: Pilot đang chạy → Thu thập data, chứng minh value
  → PMO Focus: Rice Pilot Go-Live + Kitchen Pilot đang vận hành

THÁNG 12/2026 – THÁNG 1/2027 (Phase 3: Prove Value)
  Lúa: Đông Xuân đang canh tác → Field Agent thu thập canh tác data
  Kitchen: Pilot đủ 6-8 tuần → Business Case, đàm phán contract
  → PMO Focus: Pilot Review + Expansion Proposal

THÁNG 2–3/2027 (Phase 4: Scale — ngoài 90 ngày)
  Lúa: Đông Xuân thu hoạch (Feb-Mar) → FULL PILOT RICE CYCLE hoàn chỉnh
  Xoài: Cát Chu vào vụ (Mar-May) → BẮT ĐẦU FRUIT PILOT
  → PMO Focus: Full Anchor Contract, mở thêm Anchor
```

### F.2 Không Để Tháng Nào "Rảnh"

| Tháng | Rice | Fruit | Kitchen | BD Activity |
|:---:|:---:|:---:|:---:|:---|
| 9/2026 | Setup | Setup | Pilot | 10 outreach, 3+ demo |
| 10/2026 | Onboard HTX | Setup packhouse | Running | Close ≥ 1 Anchor |
| 11/2026 | Go-live (Đông Xuân) | Setup | Running | Close Anchor 2 |
| 12/2026 | Running | Waiting | Business Case | Pitch expansion |
| 1/2027 | Running | Waiting | Contract | Scale planning |
| 2/2027 | Harvest Trace! | Waiting | Expanding | Full contract |
| 3/2027 | Business Case | Xoài Pilot | Scale | Phase 2 launch |

---

## PHẦN G — WEEKLY CADENCE & REPORTING

### G.1 Lịch Họp Cố Định

| Cuộc họp | Tần suất | Ai tham dự | Thời lượng | Output |
|:---|:---|:---|:---:|:---|
| **Daily Standup** | Hàng ngày | PMO + Field (Zalo) | 15 phút | Block update, cần gì hôm nay |
| **Weekly Review** | Thứ Hai | PMO + BD + Tech | 60 phút | KPI review, block removal |
| **Field Debrief** | Thứ Sáu | PMO + Field Agent | 30 phút | Feedback từ HTX/Anchor |
| **Founder Update** | Thứ Sáu | PMO Lead + Founder | 30 phút | Dashboard, blockers, decisions |
| **Monthly Review** | Cuối tháng | All + Founder | 90 phút | Milestone review, next month plan |

### G.2 Weekly Report Template (Gửi Founder mỗi thứ Sáu)

```
GOTRACE PMO WEEKLY REPORT — Tuần [X]
Date: DD/MM/2026

1. KPI SNAPSHOT
   • Anchor Agreements ký: X/Target
   • Diagnostics đang chạy: X
   • Pilots đang chạy: X
   • HTX/Supplier onboarded: X
   • LOT đã traced thành công: X

2. WINS TUẦN NÀY
   → [Bullet points — tối đa 3]

3. BLOCKERS
   → [Mỗi blocker có Owner và Deadline]

4. NEXT WEEK PLAN
   → [3 priorities cụ thể]

5. BUDGET (Tháng M)
   • Spent to date: X triệu
   • Committed: X triệu
   • Available: X triệu
   • Projection vs. Budget: +/- X%

6. SIGNAL (Cảnh báo sớm)
   → 🟢 On track / 🟡 Watch / 🔴 Off track
```

---

## PHẦN H — OKR THÁNG 10–12/2026

### H.1 OKR Cấp PMO

**Objective:** Chứng minh GOTRACE tạo ra giá trị thực đo được cho ≥ 1 Anchor tại ĐBSCL trong 90 ngày.

| Key Result | Target | Đo lường |
|:---|:---|:---|
| KR1: Anchor Agreements | ≥ 2 ký | CRM deal status |
| KR2: Pilots đang chạy | ≥ 1 pilot (ưu tiên Rice hoặc Kitchen) | System active users |
| KR3: Trace Time (KPI flagship) | Giảm từ 3–7 ngày xuống <30 phút ở ≥ 1 Anchor | Đo thực tế + ghi lại |
| KR4: HTX/Supplier Onboarded | ≥ 10 đơn vị nhập dữ liệu thực | System log |
| KR5: Revenue từ Diagnostic + Pilot | ≥ 200 triệu VND | Invoice |

### H.2 OKR Cấp BD

**Objective:** Build pipeline đủ lớn để đảm bảo ≥ 2 Anchor ký trong 90 ngày.

| Key Result | Target |
|:---|:---|
| Số cuộc gặp với Decision Maker | ≥ 15 cuộc trong 90 ngày |
| Số Diagnostic Offer được pitch | ≥ 6 |
| Số Diagnostic ký | ≥ 3 |
| Conversion rate Diagnostic → Pilot | ≥ 50% |

### H.3 OKR Cấp Field Ops

**Objective:** Đảm bảo dữ liệu từ HTX/Supplier đủ chất lượng để pilot có thể chứng minh giá trị.

| Key Result | Target |
|:---|:---|
| HTX/Supplier onboarded | ≥ 10 |
| Data submission rate | ≥ 70% (7/10 ngày mỗi HTX gửi data) |
| Spot-check accuracy | ≥ 85% (data nhập khớp với sổ tay thực tế) |
| Training sessions | ≥ 20 sessions tại HTX |

---

## PHẦN I — PMO DASHBOARD

### I.1 Dashboard Theo Dõi (Cập Nhật Hàng Tuần)

```
┌─────────────────────────────────────────────────────────────────┐
│  GOTRACE PMO DASHBOARD — Q4/2026                                │
├──────────────────┬──────────────────┬───────────────────────────┤
│  PIPELINE        │  PILOTS          │  FIELD OPS                │
│  ──────────────  │  ──────────────  │  ──────────────────────   │
│  Prospects: __   │  Running: __     │  HTX onboarded: __        │
│  Diagnostic: __  │  Vertical: __    │  Data sub rate: __%       │
│  Pilot: __       │  KPI tracked: __ │  Spot-check acc: __%      │
│  Contract: __    │                  │  Field visits/week: __    │
├──────────────────┼──────────────────┼───────────────────────────┤
│  REVENUE         │  BUDGET          │  RISK                     │
│  ──────────────  │  ──────────────  │  ──────────────────────   │
│  Invoiced: __M   │  Spent: __M      │  R01 (No Anchor): 🟢/🟡/🔴 │
│  Pipeline: __M   │  Committed: __M  │  R03 (HTX data): 🟢/🟡/🔴 │
│  Target: 200M    │  Budget: 568M    │  R04 (Quality): 🟢/🟡/🔴  │
│                  │  Variance: __%   │  R12 (Product): 🟢/🟡/🔴  │
├──────────────────┴──────────────────┴───────────────────────────┤
│  FLAGSHIP KPI: TRACE TIME                                       │
│  Before: 3–7 ngày | After: __ phút | Delta: -__%               │
│                                                                 │
│  MILESTONES:                                                    │
│  Ngày 30: [ ] Diagnostic ký    Ngày 60: [ ] LOT traced          │
│  Ngày 75: [ ] Sub rate >50%    Ngày 90: [ ] Business Case       │
└─────────────────────────────────────────────────────────────────┘
```

---

## PHẦN J — QUYẾT ĐỊNH ƯU TIÊN MỞ VERTICAL

### J.1 Framework Quyết Định Cho PMO Lead

```
Câu hỏi 1: Anchor ký thuộc vertical nào?
  → Rice: Triển khai Rice Playbook
  → Kitchen: Triển khai Kitchen Playbook (không phụ thuộc mùa vụ)
  → Fruit: Bắt đầu setup, full pilot chờ Q1-Q2/2027

Câu hỏi 2: Nếu có ≥ 2 Anchor từ 2 vertical khác nhau cùng lúc?
  → Ưu tiên: Kitchen (không chờ mùa vụ) + Rice (mùa Đông Xuân)
  → KHÔNG mở Fruit cùng lúc nếu chưa có đủ Technical resource

Câu hỏi 3: Vertical nào mở tiếp theo sau 90 ngày?
  → Nếu Rice pilot thành công → Expand số HTX + số Anchor cùng tỉnh
  → Nếu Kitchen pilot thành công → Expand catering company multi-site
  → Fruit: Chuẩn bị cho vụ Xoài tháng 3/2027 (setup từ tháng 1/2027)
```

### J.2 Nguyên Tắc Không Scale Sớm

> **KHÔNG mở Anchor mới khi:**
> - Data submission rate của Anchor hiện tại < 50%
> - Technical Lead đang xử lý bug production
> - PMO Lead chưa có báo cáo pilot review đầu tiên
>
> **Lý do:** Scale sớm với data kém = mất trust với tất cả Anchor cùng lúc.

---

## PHẦN K — CHUẨN BỊ CHO GIAI ĐOẠN 2 (THÁNG 4–9/2027)

### K.1 Điều Kiện Để Bước Vào Phase 2

```
Bắt buộc trước khi Phase 2:
  ✅ ≥ 2 Anchor Contracts đang chạy và trả phí
  ✅ ≥ 1 Business Case có số liệu thực (trace time, ROI)
  ✅ HTX onboarding process đã chuẩn hoá (< 2 ngày/HTX)
  ✅ Technical platform stable (< 1 incident/tuần)
  ✅ Có ≥ 1 Referral Account từ Anchor hiện tại

Phase 2 targets:
  → Expand sang Cần Thơ và An Giang
  → ≥ 5 Anchor Contracts
  → ≥ 50 HTX/Supplier trong hệ thống
  → Revenue ≥ 1 tỷ VND/quý
  → Fruit Pilot đang chạy (Xoài vụ chính)
```

---

## PHẦN L — SPECIAL OPPORTUNITY: 1 TRIỆU HA LÚA (PMO ACTION)

### L.1 Tận Dụng Chương Trình 1Mha Như Kênh Tiếp Cận Account

```
1.100+ HTX và 210+ doanh nghiệp đang tham gia 1Mha Program
→ Đây là danh sách Anchor Candidates có sẵn, đang CẦN dữ liệu chuỗi

PMO Action:
  □ Lấy danh sách 210 doanh nghiệp 1Mha từ Sở NN&PTNT Đồng Tháp
  □ Lọc: Doanh nghiệp tại Đồng Tháp + An Giang + Cần Thơ
  □ Outreach với hook: "GOTRACE giúp anh/chị qualify MRV data
    để nhận carbon credit từ World Bank/TCAF"
  □ Kết nối với ViRiCert: Explore data partnership
    (ViRiCert đo GHG, GOTRACE cung cấp supply chain data)

Timeline:
  Tuần 1: Request danh sách từ Sở NN&PTNT
  Tuần 2-3: Outreach 10 doanh nghiệp 1Mha ưu tiên
  Tuần 4: ≥ 2 cuộc gặp với decision maker trong chương trình 1Mha
```

---

*Tài liệu soạn thảo dựa trên: Market Intelligence GTM 2026–2030, Object Implementation Blueprint, Gap Analysis, và best practices PMO framework cho B2B SaaS tại thị trường emerging.*
*Cần review và điều chỉnh budget với Founder/CFO trước khi triển khai.*
*Version 1.0 — Last updated: 2026-09-24*
