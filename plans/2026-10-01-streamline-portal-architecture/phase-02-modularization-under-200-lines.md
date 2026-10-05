# Phase 02: Mô-Đun Hóa Toàn Diện Codebase Dưới 200 Dòng
**Trạng thái:** Pending  
**Mục tiêu:** Tái cấu trúc các file lớn hơn 200 dòng thành các mô-đun chức năng tập trung, tuân thủ nguyên tắc Clean Code và quy chuẩn phát triển dự án.

---

## 1. DANH SÁCH FILE VƯỢT ĐỊNH MỨC CẦN PHÂN RÃ

| File Hiện Tại | Số Dòng | Đích Đến Phân Rã (Sub-Components) | Dự Kiến Số Dòng |
|:---|:---:|:---|:---:|
| `tab-field-ops.tsx` | **791 dòng** | • `src/components/field-ops/step1-receiving.tsx`<br>• `src/components/field-ops/step2-cooking.tsx`<br>• `src/components/field-ops/step3-sampling.tsx`<br>• `src/components/field-ops/event-history-table.tsx`<br>• `tab-field-ops.tsx` (Điều phối) | $\le 120$ dòng/file<br>$\le 110$ dòng<br>$\le 130$ dòng<br>$\le 115$ dòng<br>**$\le 95$ dòng** |
| `tab-platform-gateway.tsx` | **652 dòng** | • `src/components/gateway/api-docs-card.tsx`<br>• `src/components/gateway/offline-sync-card.tsx`<br>• `src/components/gateway/edge-bridge-card.tsx`<br>• `tab-platform-gateway.tsx` (Điều phối) | $\le 130$ dòng<br>$\le 125$ dòng<br>$\le 135$ dòng<br>**$\le 90$ dòng** |
| `tab-kitchen-rules.tsx` | **300 dòng** | • `src/components/kitchen/kitchen-rule-card.tsx`<br>• `tab-kitchen-rules.tsx` | $\le 110$ dòng<br>**$\le 120$ dòng** |
| `tab-food-chain.tsx` | **286 dòng** | • `src/components/food-chain/food-pillar-card.tsx`<br>• `tab-food-chain.tsx` | $\le 110$ dòng<br>**$\le 115$ dòng** |

---

## 2. NGUYÊN TẮC KỸ THUẬT ÁP DỤNG
1. **Composition over Inheritance:** Tách riêng UI và Business Logic / State.
2. **Kebab-Case Naming:** Đặt tên file mang tính mô tả rõ ràng mục đích nghiệp vụ.
3. **Zero-Side-Effects:** Đảm bảo toàn bộ form nhập liệu, cơ chế lưu trữ cục bộ LocalStorage và các hàm tính toán giữ nguyên 100% tính năng hiện hữu.
4. **Strict Typing:** Đảm bảo TypeScript interface đầy đủ, không sử dụng kiểu `any` tùy tiện.

---

## 3. CHECKLIST CÔNG VIỆC CỤ THỂ
- [ ] Tạo thư mục `src/components/field-ops/` và tách 4 sub-components kiểm thực QĐ 1246.
- [ ] Tạo thư mục `src/components/gateway/` và tách 3 sub-components đấu nối hạ tầng kỹ thuật.
- [ ] Tạo thư mục `src/components/kitchen/` và `src/components/food-chain/` tách thẻ hiển thị.
- [ ] Kiểm tra lệnh `wc -l` đảm bảo 100% file đều $\le 200$ dòng code.
