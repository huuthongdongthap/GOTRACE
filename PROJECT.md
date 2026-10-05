# Project: GOTRACE Mekong — Tái cấu trúc & Hợp nhất toàn diện Hệ thống Tài liệu

## Architecture & Nguyên tắc Cốt lõi
- **Kiến trúc tổ chức tài liệu (Single-Tier Flat Hierarchy)**: Xóa bỏ phân tầng 2 cấp (`docs/` và `docs/playbooks/`), quy tụ toàn bộ tài liệu chính thức vào một cấp duy nhất tại `docs/` với mã số chuẩn hóa từ `00` đến `09`.
- **Cơ chế lưu trữ an toàn (Safe Archiving)**: Mọi tài liệu cũ, bản nháp lịch sử (.docx), và các kiến trúc tham chiếu sau khi tích hợp đều được di chuyển vào `docs/archive/`, bảo toàn 100% lịch sử và không làm mất bất kỳ dữ liệu nào.
- **Bảo tồn toàn vẹn số liệu ĐBSCL**: Duy trì 100% các số liệu thực tế đã được khảo sát (Đồng Tháp 530.677 ha lúa, 1.147 vùng trồng / 2.758 MSVT, 496 cơ sở đóng gói; Đề án 1Mha 421.000 ha; 58 vụ ngộ độc thực phẩm H1/2026; ngân sách PMO 90 ngày 568M VND, doanh thu 200–300M VND...).
- **Không có liên kết gãy (0 Broken Links)**: Chuyển đổi 100% trích dẫn văn bản thành siêu liên kết tương đối chuẩn (`./<file_name>.md`), bảo đảm nhấp chuột trực tiếp di chuyển chính xác giữa các tài liệu.

---

## Feature Inventory

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|:---:|:---:|
| 1 | PMO Master Consolidation | Hợp nhất 44 chương chiến lược của bản docs và kế hoạch 90 ngày thực tế của bản playbooks thành 1 bản PMO Master duy nhất | M1 | Survey (PMO Spec Miner) |
| 2 | Budget & Headcount Modeling | Tích hợp bảng ngân sách 568M VND, doanh thu 200-300M VND, RACI 7 quyết định, 6 headcount vào PMO Master | M1 | Survey (PMO Spec Miner) |
| 3 | Rice Playbook Linear & 29 Events | Bổ sung bảng ánh xạ chi tiết 29 Canonical Events (Trigger, Actor, Inputs, Outputs, Evidence L1-L3, Rules) | M2 (Rice) | Survey (Playbook Spec Miner) |
| 4 | Rice Mass Balance & Moisture | Bổ sung phương trình hiệu chỉnh độ ẩm khi sấy, thuật toán chống pha trộn và code Python kiểm soát | M2 (Rice) | Survey (Playbook Spec Miner) |
| 5 | Rice 1Mha MRV & Carbon Credit | Bổ sung module đo đạc MRV Đề án 1 triệu ha lúa chất lượng cao & phát thải thấp, tín chỉ carbon $20/tấn | M2 (Rice) | Survey (Playbook Spec Miner) |
| 6 | Fruit First-Class MSVT & Grading | Tích hợp mã số vùng trồng First-Class (GIS Polygon, Quota), phân cấp chất lượng Grade 1/2/Cull từ Ref Arch | M2 (Fruit) | Survey (Playbook Spec Miner) |
| 7 | Fruit International Quarantine | Tích hợp ma trận luật kiểm dịch: GACC Lệnh 248/249/280, Úc BICON VHT, Hàn Quốc PLS, Mỹ chiếu xạ | M2 (Fruit) | Survey (Playbook Spec Miner) |
| 8 | Fruit Cold-Chain IoT & 10 Risk Rules | Tích hợp giám sát nhiệt độ chuỗi lạnh time-series và 10 Fruit Risk Engine Rules | M2 (Fruit) | Survey (Playbook Spec Miner) |
| 9 | Kitchen Many-to-1-to-Many & Recipe | Tích hợp mô hình chuỗi hội tụ, đối soát Recipe Definition vs Actual Consumption theo từng lô con | M2 (Kitchen) | Survey (Playbook Spec Miner) |
| 10 | Kitchen 60s Incident Blast Radius | Tích hợp động cơ Forward Trace quét đồ thị xác định bán kính tác động ngộ độc trong ≤ 60 giây | M2 (Kitchen) | Survey (Playbook Spec Miner) |
| 11 | Kitchen 24h Sample Retention & Microbiology | Tích hợp quy trình kiểm thực 3 bước và lưu mẫu 24h theo QĐ 1246/QĐ-BYT kèm 5 chỉ tiêu vi sinh | M2 (Kitchen) | Survey (Playbook Spec Miner) |
| 12 | Kitchen 9 Risk Rules & Schemas | Tích hợp 9 Kitchen Risk Engine Rules và 4 Schema YAML đầy đủ | M2 (Kitchen) | Survey (Playbook Spec Miner) |
| 13 | Safe Archiving to `docs/archive/` | Tạo `docs/archive/` và di chuyển an toàn 7 file lịch sử/nháp/ref arch đã tích hợp | M3 | Survey (Doc Explorer) |
| 14 | Standardized 00-09 Re-indexing | Đánh số thứ tự liên tục chuẩn 00–09 cho toàn bộ 10 file chính thức tại thư mục gốc `docs/` | M3 | Survey (Doc Explorer) |
| 15 | Master Index & Navigator (`00_MASTER_INDEX.md`) | Xây dựng file chỉ mục Single Source of Truth, Directory Tree, Executive Summary từng file, Cross-Link Matrix | M4 | Survey (Doc Explorer) |
| 16 | Link Integrity & 0 Broken Links | Cập nhật toàn bộ link tham chiếu giữa các file, chuyển đổi text mentions thành markdown link tương đối | M5 | Survey (Doc Explorer) |
| 17 | Language & Formatting Standardization | Tiếng Việt chuyên nghiệp ĐBSCL + chuẩn quốc tế, GitHub Alerts, Mermaid diagrams, Markdown tables | M5 | User Request |
| 18 | Independent Verification & Forensic Audit | Thẩm định tính toàn vẹn độc lập bằng Reviewer, Challenger và Forensic Auditor | M6 | Orchestration Pattern |
| 19 | Sentinel Final Synthesis Report | Tổng hợp toàn diện kết quả bàn giao gửi về cho Sentinel | M7 | Orchestrator Protocol |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|:---:|
| M0 | Survey & Mapping | Khảo sát toàn diện 16 file hiện hữu, trích xuất đặc tả PMO và Playbooks | None | DONE |
| M1 | PMO Master Consolidation | Soạn thảo `docs/06_PMO_Master_Execution_Plan.md` hợp nhất trọn vẹn 44 chương và kế hoạch 90 ngày | M0 | DONE |
| M2 | Playbooks Deep Ref Arch Integration | Tích hợp sâu Ref Arch vào 3 Playbook (Rice: 29 Events + Mass Balance + 1Mha; Fruit: MSVT + Cold-chain + 10 Rules; Kitchen: 60s Incident + QĐ 1246 + 9 Rules) | M0 | DONE |
| M3 | File Re-indexing & Safe Archiving | Tạo `docs/archive/`, chuyển 7 file cũ/nháp, di chuyển và đổi tên các file chính thức theo thứ tự 00–09 | M1, M2 | DONE |
| M4 | Master Index & Navigation System | Xây dựng `docs/00_MASTER_INDEX.md` làm Single Source of Truth | M3 | DONE |
| M5 | Link Integrity & Format Harmonization | Chuẩn hóa toàn bộ 40+ liên kết chéo thành markdown relative links (0 broken links), thẩm định định dạng | M3, M4 | DONE |
| M6 | Independent Review & Forensic Audit | Chạy Reviewers (APPROVE), Challengers (APPROVE) và Forensic Auditor (CLEAN) | M1-M5 | DONE |
| M7 | Sentinel Report & Final Delivery | Lập báo cáo tổng kết hoàn tất dự án gửi Sentinel | M6 | DONE |
| M8 | Phase 3 Regional Ecosystem & Carbon Exchange | Phát triển Multi-tenant Cloud RLS, 3 Cụm Edge Nodes, Sàn giao dịch Carbon $20/tấn và 13-Tab Next.js 14 PMO Portal | M7 | DONE |

---

## Code & Document Layout (Sau Tái Cấu Trúc)

```text
GOTRACE/docs/
├── 00_MASTER_INDEX.md                             [Mới - Single Source of Truth & Điều hướng trung tâm]
├── 00_Executive_Brief.md                          [Di chuyển từ playbooks/00_Executive_Brief.md]
├── 01_Mekong_Market_Intelligence_GTM_2026_2030.md [Chuẩn hóa từ GOTRACE_Mekong_Market_Intelligence_GTM_2026_2030.md]
├── 02_Platform_Object_Implementation_Blueprint.md [Đổi tên từ 01_Mekong_Object_Implementation_Blueprint.md]
├── 03_Rice_Playbook.md                            [Nâng cấp từ playbooks/02_Rice_Playbook.md: 29 Events & 1Mha MRV]
├── 04_Fruit_Playbook.md                           [Hợp nhất playbooks/03_Fruit_Playbook.md & Ref Arch]
├── 05_Kitchen_Playbook.md                         [Hợp nhất playbooks/04_Kitchen_Playbook.md & Ref Arch]
├── 06_PMO_Master_Execution_Plan.md                [HỢP NHẤT TOÀN DIỆN 44 Chương & Kế hoạch 90 ngày 568M]
├── 07_Target_Account_Map.md                       [Di chuyển từ playbooks/06_Target_Account_Map.md]
├── 08_Sales_Discovery_Playbook.md                 [Di chuyển từ playbooks/07_Sales_Discovery_Playbook.md]
├── 09_Strategic_Gap_Analysis.md                   [Di chuyển từ playbooks/GOTRACE_Strategic_Gap_Analysis.md]
└── archive/                                       [Lưu trữ an toàn 7 files lịch sử]
    ├── 03_Fruit_Reference_Architecture.md
    ├── 04_Kitchen_Reference_Architecture.md
    ├── 05_Mekong_PMO_Execution_Plan_Strategic44.md
    ├── 05_PMO_Execution_Plan_Operational90Day.md
    ├── plan_playbooks_sprint.md
    ├── Bao_Cao_Khoi_Tao_Du_An_PMO_GOTRACE_Mekong.docx
    └── Bao_Cao_Tong_Hop_GOTRACE_V2.2_Chien_Luoc_Mien_Nam.docx
```

---

## Interface Contracts giữa các Tài liệu

1. **Khế ước Danh bạ & Mã hiệu (File Registry Contract)**:
   - Tất cả các tài liệu từ 00 đến 09 khi trích dẫn tài liệu khác BẮT BUỘC dùng đường dẫn relative `./<file_name>.md`.
   - Cấm sử dụng đường dẫn tuyệt đối hoặc giả định thư mục con `playbooks/` khi hệ thống đã được phẳng hóa.
2. **Khế ước Đối tượng Dữ liệu (Common Object Model Contract)**:
   - 3 Playbook ngành (03, 04, 05) bắt buộc kế thừa 9 Core Primitives và chuẩn định danh GCI được quy định tại `02_Platform_Object_Implementation_Blueprint.md`.
3. **Khế ước Quản trị PMO (Governance Contract)**:
   - Tiến độ của 3 Playbook ngành và hoạt động BD/Sales tuân thủ nghiêm ngặt theo các mốc Gate 30, Gate 60, Gate 90 và RACI matrix được quy định trong `06_PMO_Master_Execution_Plan.md`.
4. **Khế ước Khách hàng Mục tiêu (Account Targeting Contract)**:
   - Cẩm nang `08_Sales_Discovery_Playbook.md` sử dụng danh mục 100 Anchor Accounts và hệ số điểm NVS từ `07_Target_Account_Map.md`.
