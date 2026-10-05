# GIAI ĐOẠN 2 - PHÂN KỲ 03: TÍCH HỢP ĐỀ ÁN 1MHA LÚA PHÁT THẢI THẤP & MRV CARBON (M3)
**Mã Tài Liệu:** `PLN-PHASE2-P03-RICE-1MHA-MRV-CARBON`  
**Dự Án:** GOTRACE V2.2 — Hạ Tầng Dữ Liệu Chuỗi Cung Ứng Nông Sản Tây Nam Bộ  
**Thời Gian Thực Hiện:** Tuần 8 – Tuần 20 (Q2 – Q3/2027)  
**Địa Bàn:** Đồng Tháp (Tam Nông, Tháp Mười) $\rightarrow$ Cần Thơ (Thới Lai, Cờ Đỏ)  
**Chủ Quản:** Solution Architect, Tech Ops, Agronomy Partner, Carbon Credit Verifier  

---

## 1. MỤC TIÊU CHIẾN LƯỢC CỦA PHÂN KỲ (OBJECTIVES)

1. **Chuẩn Hóa 29 Canonical Events Chuỗi Tuyến Tính (Linear Chain at Scale):**
   - Đảm bảo tính liên tục của dữ liệu từ chuẩn bị đất, gieo sạ, quản lý nước ngập - khô xen kẽ (AWD), bón phân, thu hoạch, sấy, xay xát, đóng gói và xuất khẩu.
2. **Đấu Nối Hệ Thống Đo Đạc, Báo Cáo & Xác Minh (MRV Carbon):**
   - Tính toán lượng khí nhà kính ($CH_4$ và $N_2O$) giảm phát thải nhờ áp dụng kỹ thuật tưới ngập khô xen kẽ (Alternate Wetting and Drying - AWD) so với tập quán ngập nước liên tục truyền thống.
3. **Phát Hành Tín Chỉ Carbon Gắn Liền Với Lô Lúa Gạo (`LOT`):**
   - Định lượng chính xác $2.4\text{ tấn } CO_2e/\text{ha/vụ}$ giảm thiểu. Với đơn giá quốc tế ước tính $20\text{ USD/tấn } CO_2e$, tạo thêm nguồn thu $1.200.000\text{ VNĐ/ha/vụ}$ cho nông dân và Hợp tác xã (HTX).
4. **Đối Soát Cân Bằng Khối Lượng & Độ Ẩm (Moisture & Mass Balance Reconciliation):**
   - Xử lý bài toán hao hụt độ ẩm tự nhiên từ lúa ướt ($24\% - 28\%$) sang lúa khô ($14\%$) và tỷ lệ thu hồi gạo ($64\% - 68\%$), triệt tiêu hoàn toàn rủi ro pha trộn gạo ngoài vùng dự án.

---

## 2. KIẾN TRÚC DỮ LIỆU CHUỖI LÚA GẠO & CƠ CHẾ MRV CARBON

```
                     ┌──────────────────────────────────────────┐
                     │          VÙNG LÚA ĐỀ ÁN 1 TRIỆU HA       │
                     │          (Primitive: PLACE - Cánh đồng)  │
                     └────────────────────┬─────────────────────┘
                                          │
                                          ▼
                     ┌──────────────────────────────────────────┐
                     │       CHUỖI NHẬT KÝ CANH TÁC AWD         │
                     │   (Primitive: EVENT - Nước & Phân bón)   │
                     │   • Rút cạn nước (Drainage Event)        │
                     │   • Bơm ngập nước (Reflooding Event)     │
                     │   • Nhật ký bón đạm (N-fertilizer log)   │
                     └────────────────────┬─────────────────────┘
                                          │
                   ┌──────────────────────┴──────────────────────┐
                   ▼                                             ▼
    ┌─────────────────────────────┐               ┌─────────────────────────────┐
    │    LÔ LÚA THƯƠNG PHẨM       │               │      TÍN CHỈ CARBON (MRV)   │
    │     (Primitive: LOT)        │               │     (Primitive: CLAIM)      │
    │   • Giống xác nhận          │               │   • Giảm 2.4 tấn CO2e/ha    │
    │   • Mass Balance lúa khô    │               │   • Thẩm định bên thứ 3     │
    │   • Độ ẩm 14% tiêu chuẩn    │               │   • Chứng thư phát hành     │
    └─────────────────────────────┘               └─────────────────────────────┘
```

---

## 3. CÔNG THỨC & THUẬT TOÁN TÍNH TOÁN MRV CARBON (IPCC TIER 2)

Lượng phát thải khí mê-tan ($CH_4$) từ ruộng lúa được tính theo phương pháp chuẩn hóa của Ủy ban Liên chính phủ về Biến đổi Khí hậu (IPCC Tier 2):

$$E_{CH_4} = EF_c \times SF_w \times SF_p \times SF_o \times A \times t$$

Trong đó:
- $EF_c$: Hệ số phát thải cơ sở đối với ruộng ngập nước liên tục ($1.30\text{ kg } CH_4/\text{ha/ngày}$).
- $SF_w$: Hệ số điều chỉnh chế độ tưới:
  - Ruộng ngập nước liên tục: $SF_w = 1.00$.
  - Tưới ngập - khô xen kẽ (AWD) nhiều lần: $SF_w = 0.52$ (**Giảm 48% phát thải $CH_4$**).
- $SF_p$: Hệ số vụ mùa trước đó ($SF_p = 1.00$).
- $SF_o$: Hệ số sử dụng phân bón hữu cơ / vùi rơm rạ ($SF_o = 1.00 - 1.25$).
- $A$: Diện tích canh tác (ha).
- $t$: Thời gian vụ lúa (90 – 100 ngày).

Chuyển đổi sang đương lượng $CO_2$ ($CO_2e$) với hệ số nóng lên toàn cầu của $CH_4$ là $GWP = 27.9$:
$$\Delta CO_2e = (E_{baseline} - E_{AWD}) \times 27.9 \times 10^{-3} \approx 2.4\text{ Tấn } CO_2e/\text{ha/vụ}$$

---

## 4. QUY TRÌNH THU THẬP & ĐỐI SOÁT DỮ LIỆU HIỆN TRƯỜNG

1. **Ghi Nhận Mực Nước Bằng Ống Cảm Biến Cắm Ruộng (AWD Water Tubes):**
   - Nông dân hoặc HTX lắp đặt ống nhựa PVC có đục lỗ để theo dõi mực nước ngập dưới mặt đất $-15\text{ cm}$.
   - Chụp ảnh kèm gắn thẻ định vị GPS hoặc cắm cảm biến IoT siêu âm truyền dữ liệu qua LoRaWAN.
2. **Tự Động Tạo Lập Sự Kiện Trên Ledger GOTRACE:**
   - Khi mực nước xuống $-15\text{ cm} \implies$ Ghi nhận sự kiện `AWD_DRY_PHASE`.
   - Khi bơm nước trở lại $+5\text{ cm} \implies$ Ghi nhận sự kiện `AWD_FLOOD_PHASE`.
   - Toàn bộ chu kỳ phải lặp lại tối thiểu 3 lần trong giai đoạn sinh trưởng của cây lúa.
3. **Thẩm Định Độc Lập & Phát Hành Tín Chỉ (Verification Engine):**
   - Đơn vị xác minh độc lập (3rd party MRV auditor) truy cập API Ledger GOTRACE để kiểm tra tính toàn vẹn và không thể tẩy xóa của chuỗi dữ liệu.
   - Khi hoàn tất thu hoạch, hệ thống tự động sinh `CLAIM` tín chỉ giảm phát thải gắn kèm mã `LOT` của lô lúa tương ứng.

---

## 5. ĐỐI SOÁT CÂN BẰNG KHỐI LƯỢNG (MASS BALANCE ENGINE)

Để loại trừ gian lận trộn lúa từ vùng không đạt chuẩn AWD vào kho nhà máy:
$$\text{Khối Lượng Lúa Sấy Khô (14\%)} = \text{Khối Lượng Lúa Ướt (26\%)} \times \frac{100 - 26}{100 - 14} \times (1 - \text{Hao Hụt Kỹ Thuật } 1.5\%)$$
- Nếu khối lượng lúa khô nhập kho thành phẩm vượt quá công thức trên với dung sai $\pm 2\%$, hệ thống tự động gắn cờ `FLAG_MASS_BALANCE_MISMATCH` và tạm dừng cấp tín chỉ Carbon.

---

## 6. TIÊU CHÍ NGHIỆM THU PHÂN KỲ M3 (GATE 3 PASS CRITERIA)

1. **Quy mô diện tích:** Tích hợp thành công dữ liệu canh tác AWD cho ít nhất $1.000\text{ héc-ta}$ lúa tại Đồng Tháp và Cần Thơ.
2. **Toàn vẹn sự kiện:** 100% lô lúa được cấp chứng thư có đủ chuỗi 29 sự kiện chuẩn hóa và tối thiểu 3 chu kỳ ngập - khô xen kẽ.
3. **Phát hành tín chỉ Carbon:** Khởi tạo thành công hồ sơ MRV chuẩn hóa cho $2.400\text{ tấn } CO_2e$ giảm phát thải (tương đương giá trị $48.000\text{ USD}$).
4. **Đối soát nhà máy:** Hệ thống Mass Balance Engine vận hành chính xác tại 2 nhà máy xay xát hạt nhân liên kết với Tổng công ty Lương thực.
