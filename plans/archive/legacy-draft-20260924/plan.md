---
title: "GOTRACE Mekong GTM & Implementation - Next Steps Plan"
description: "Implementation plan to complete deliverables 02-07, execute PMO 90-day pipeline, and launch 3 vertical pilots (Rice, Fruit, Kitchen) across Dong Thap, Can Tho, and HCMC."
status: pending
priority: P1
effort: 80h
branch: gotrace-mekong-gtm
tags: [gotrace, mekong, supply-chain, data-graph, rice, fruit, kitchen, gtm, pmo, dong-thap, can-tho]
created: 2026-09-24
---

# GOTRACE Mekong Implementation & GTM — Next Steps Plan

## Executive Summary
Chuyển hóa Market Intelligence và Object Implementation Blueprint thành bộ tài liệu thực thi hoàn chỉnh (Deliverables 02–07) và kích hoạt kế hoạch 90 ngày của PMO nhằm khởi chạy 3 Pilot chiến lược tại ĐBSCL.

---

## Deliverables & Phase Roadmap

| Phase | Output Deliverable | Scope & Objective | Effort | Priority | Status |
|:---|:---|:---|:---:|:---:|:---:|
| **Phase 01** | `02_Rice_Playbook.md` | Playbook Lúa gạo: Linear Chain, Mass Balance, HTX Onboarding, Export Evidence | 16h | P1 | pending |
| **Phase 02** | `03_Fruit_Playbook.md` | Playbook Trái cây: Branching Chain, Mã số vùng trồng, Kho lạnh, Split/Merge | 16h | P1 | pending |
| **Phase 03** | `04_Kitchen_Playbook.md` | Playbook Bếp ăn: Converging Chain, Meal Batch Genealogy, Incident Impact | 14h | P1 | pending |
| **Phase 04** | `06_Target_Account_Map.md` | Danh sách 100 Anchor Accounts (Đồng Tháp, Cần Thơ, TP.HCM) + Chấm điểm Network Value | 12h | P1 | pending |
| **Phase 05** | `07_Sales_Discovery_Playbook.md` | Bộ câu hỏi Discovery, kịch bản chẩn đoán (Diagnostic Offer 2-4 tuần), Objection Handling | 10h | P1 | pending |
| **Phase 06** | `05_Mekong_PMO_Execution_Plan.md` | Khung điều hành PMO 90 ngày (Days 1-30 Mapping, Days 31-60 Discovery, Days 61-90 Pilot) | 12h | P1 | pending |

---

## Detailed Phases

### Phase 01: 02_Rice_Playbook.md (Linear Chain & Network Scale)
- [ ] Xây dựng ICP chi tiết cho Nhà máy chế biến gạo & Doanh nghiệp xuất khẩu tại Đồng Tháp/An Giang.
- [ ] Chuẩn hóa Data Model cho Lúa gạo: `Production Area` → `Harvest Lot` → `Collection Lot` → `Milling Batch` → `Finished Lot` → `Export Shipment`.
- [ ] Thiết kế cơ chế cân bằng khối lượng (Mass Balance) chống gian lận pha trộn.
- [ ] Thiết kế Pilot 1: 1 Nhà máy + 5-10 HTX + 1 Giống lúa + 1 Lô xuất khẩu.

### Phase 02: 03_Fruit_Playbook.md (Branching Chain & Data Complexity)
- [ ] Xây dựng ICP cho Vựa/Cơ sở đóng gói xuất khẩu (sầu riêng, xoài, mít, thanh long).
- [ ] Chuẩn hóa Data Model cho Trái cây: Tách lô theo phân loại (Grade/Size), Gộp lô, Sự kiện chuỗi lạnh (Cold-chain IoT), Chứng nhận kiểm định dư lượng BVTV.
- [ ] Tích hợp quản lý Mã số vùng trồng (MSVT) và Mã cơ sở đóng gói (MSCSĐG).
- [ ] Thiết kế Pilot 2: 1 Cơ sở đóng gói + 3-5 Vùng trồng + 1 Lô xuất khẩu.

### Phase 03: 04_Kitchen_Playbook.md (Converging Chain & Downstream Demand)
- [ ] Xây dựng ICP cho Chuỗi bếp ăn công nghiệp KCN, Bệnh viện, Trường học tại Cần Thơ/TP.HCM/Đồng Tháp.
- [ ] Chuẩn hóa Data Model cho Bếp ăn: Tiếp nhận nguyên liệu đa nguồn → Lưu kho/Kiểm định tiếp nhận → Xuất chế biến theo Recipe → Suất ăn/Mẻ nấu (Meal Batch) → Phân phối người ăn.
- [ ] Xây dựng mô phỏng phân tích tác động sự cố (Incident Impact Analysis Engine).
- [ ] Thiết kế Pilot 3: 1 Bếp ăn + 1 Chu kỳ thực đơn + 5-10 Nhóm nguyên liệu + 1 Mẻ nấu thực tế.

### Phase 04: 06_Target_Account_Map.md (100 Accounts Database)
- [ ] Thu thập và phân loại 100 Accounts:
  - 30 Doanh nghiệp Lúa gạo (Đồng Tháp, An Giang, Cần Thơ)
  - 25 Doanh nghiệp Trái cây & Đóng gói (Đồng Tháp, Tiền Giang, Vĩnh Long)
  - 15 Đơn vị Bếp ăn công nghiệp & Dịch vụ thực phẩm (TP.HCM, Cần Thơ, KCN Đồng Tháp)
  - 10 Doanh nghiệp Chế biến thực phẩm
  - 10 Đơn vị Logistics chuỗi lạnh & Kho bãi
  - 10 Đơn vị hiệp hội / đối tác dữ liệu
- [ ] Chấm điểm theo trọng số Network Value: Anchor Value × Network Reach × Data Criticality × Expansion Potential.
- [ ] Lọc Shortlist Top 30 Priority Accounts cho đợt tiếp cận đầu tiên.

### Phase 05: 07_Sales_Discovery_Playbook.md (Commercial Enablement)
- [ ] Soạn thảo bộ 20 câu hỏi Discovery xoáy sâu vào "1 LOT thật" và chi phí đối soát thủ công.
- [ ] Đóng gói tài liệu chào hàng Entry Offer: "Supply Chain Data Diagnostic (2–4 tuần)".
- [ ] Xây dựng ma trận xử lý phản đối (Objection Handling): Phản đối về chi phí, sợ lộ bí mật nguồn hàng, sự trùng lặp với hệ thống nhà nước/ERP.
- [ ] Thiết kế mẫu Demo Scenario trực quan hóa Reverse Trace và Forward Trace.

### Phase 06: 05_Mekong_PMO_Execution_Plan.md (PMO Operating Framework)
- [ ] Thiết lập Dashboard theo dõi 5 cụm chỉ số: Market, Network, Data, Commercial, Strategic.
- [ ] Lập lịch trình chi tiết 90 ngày (Phân bổ nhân sự, ngân sách MCU, đầu việc tuần).
- [ ] Kịch bản kích hoạt và nghiệm thu 3 Pilot thực tế.

---

## Validation & Success Criteria
1. Đầy đủ 6 tài liệu chi tiết (02 đến 07) chuẩn hóa theo định dạng Markdown đồng bộ với `01_Mekong_Object_Implementation_Blueprint.md`.
2. Danh sách 100 Account có thông tin thực tế, phân định rõ ràng các vai trò (`Economic Buyer`, `Data Owner`, `Operational Owner`).
3. Khung chào hàng Diagnostic được phê duyệt để Sales đội ngũ thực địa tại Mekong bắt đầu triển khai ngay.
