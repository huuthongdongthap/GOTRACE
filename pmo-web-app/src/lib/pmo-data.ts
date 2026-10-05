/**
 * PMO execution data model & simulation fixtures.
 * Mirrors the project initiation report at plans/260918-pmo-initiation-report.md
 * and supplies interactive engines for Founder pitch, Sales enablement, and B2G trace simulation.
 */

export type Workstream = "Foundation" | "Integration" | "Validation";

export interface Milestone {
  id: string;
  phase: 1 | 2 | 3;
  workstream: Workstream;
  window: string;
  title: string;
  detail: string;
  owner: string;
  status: "done" | "in_progress" | "blocked" | "pending";
  evidence: string;
}

export interface AnchorAccount {
  id: string;
  name: string;
  segment: "Raw material" | "Processing" | "Catering" | "Institutional";
  location: string;
  legalRep: string;
  role: string;
  scores: {
    networkReach: number;
    traceabilityPain: number;
    dataComplexity: number;
    buyerAuthority: number;
    digitalReadiness: number;
    expansionPotential: number;
  };
  stage: "Prospect" | "Diagnostic" | "Pilot" | "Contract";
}

export interface GovDocument {
  id: string;
  name: string;
  authority: string;
  purpose: string;
  status: "drafted" | "submitted" | "signed";
  deadline: string;
}

export interface RiskRow {
  risk: string;
  probability: "Thấp" | "Trung bình" | "Cao";
  impact: "Thấp" | "Trung bình" | "Cao";
  mitigation: string;
  owner: string;
}

export interface SalesBattleCard {
  objection: string;
  clientPerspective: string;
  trojanHorseResponse: string;
  evidenceToPresent: string;
}

export interface KitchenRiskRule {
  id: string;
  name: string;
  stage: "Gate" | "Storage" | "Preparation" | "Cooking" | "Serving";
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  logic: string;
  action: string;
}

export interface TracebackScenario {
  id: string;
  name: string;
  pillar: "Starch" | "Protein" | "Egg" | "Veg";
  targetLot: string;
  timeElapsed: string;
  conclusion: string;
  events: TracebackEvent[];
}

export interface TracebackEvent {
  step: string;
  timestamp: string;
  entity: string;
  action: string;
  gci: string;
  status: "NORMAL" | "ALERT" | "CRITICAL";
  detail: string;
}

/** Qualification threshold from the report: total >= 25 of 30. */
export const QUALIFICATION_THRESHOLD = 25;

export const PROGRAM_START = "2026-09-18";
export const PROGRAM_END = "2027-09-18";

export const milestones: Milestone[] = [
  {
    id: "M1.1",
    phase: 1,
    workstream: "Foundation",
    window: "Ngày 1–10",
    title: "Ký MOU với Sở KH&CN và Chi cục ATVSTP Đồng Tháp",
    detail:
      "Biên bản ghi nhớ ba bên xác lập phạm vi chia sẻ dữ liệu, thẩm quyền khai thác và đầu mối phối hợp liên ngành cho giai đoạn thí điểm.",
    owner: "PMO",
    status: "in_progress",
    evidence: "MOU scan có số văn bản + danh sách đầu mối hai bên",
  },
  {
    id: "M1.2",
    phase: 1,
    workstream: "Foundation",
    window: "Ngày 11–20",
    title: "Chốt 3 Anchor Enterprise của chuỗi Bột – Sợi – Bếp ăn",
    detail:
      "Sàng lọc theo 6 tiêu chí Account Qualification, chỉ chọn doanh nghiệp đạt từ 25/30 điểm trở lên.",
    owner: "BizDev Lead",
    status: "in_progress",
    evidence: "Scorecard 6 tiêu chí đã ký xác nhận nội bộ",
  },
  {
    id: "M1.3",
    phase: 1,
    workstream: "Foundation",
    window: "Ngày 21–30",
    title: "Thành lập tổ công tác tại văn phòng Sa Đéc",
    detail:
      "Bố trí 5 vị trí lõi gồm PMO, Tech Lead, BizDev Lead, Media Lead và Data Steward; chuẩn bị hạ tầng kết nối cho vùng.",
    owner: "PMO",
    status: "pending",
    evidence: "Sơ đồ tổ chức + hợp đồng lao động/thỏa thuận dân sự",
  },
  {
    id: "M2.1",
    phase: 2,
    workstream: "Integration",
    window: "Tuần 5–6",
    title: "Dựng backend GOTRACE V2.2 cho vùng Tây Nam Bộ",
    detail:
      "Kích hoạt core services: GCI Registry, Event Ledger, Evidence Index, Government Dashboard với phân quyền RBAC + ABAC.",
    owner: "Tech Lead",
    status: "pending",
    evidence: "4 nhóm năng lực pilot chạy được trên môi trường staging",
  },
  {
    id: "M2.2",
    phase: 2,
    workstream: "Integration",
    window: "Tuần 7–8",
    title: "Triển khai Mobile Field App cho nhân viên hiện trường",
    detail:
      "Ứng dụng quét GCI, chụp ảnh kiểm thực ba bước và lưu mẫu 24 giờ, có chế độ offline cho vùng sóng yếu.",
    owner: "Tech Lead",
    status: "pending",
    evidence: "Build APK cài trên thiết bị thật + bản ghi sự kiện đồng bộ thành công",
  },
  {
    id: "M2.3",
    phase: 2,
    workstream: "Integration",
    window: "Tuần 8",
    title: "Đấu nối thử với hệ thống nguồn của anchor enterprise",
    detail:
      "Kiểm chứng nguyên tắc Connect not Replace: mapping định danh, reconciliation, xử lý dead-letter qua REST API.",
    owner: "Tech Lead",
    status: "pending",
    evidence: "Biên bản đấu nối + báo cáo reconciliation delta",
  },
  {
    id: "M3.1",
    phase: 3,
    workstream: "Validation",
    window: "Tuần 9–10",
    title: "Chạy song song quy trình thật tại 3 anchor enterprise",
    detail:
      "Ghi nhận sự kiện theo lô/mẻ thực tế, đo Trace Completeness và Traceback Latency ngay trên dữ liệu vận hành.",
    owner: "Data Steward",
    status: "pending",
    evidence: "Dashboard KPI có 1000 sự kiện thật đầu tiên",
  },
  {
    id: "M3.2",
    phase: 3,
    workstream: "Validation",
    window: "Tuần 11",
    title: "Sản xuất phim tư liệu 4K mẫu của chuỗi",
    detail:
      "Ghi hình hành trình mẻ bột từ làng nghề tới bếp ăn học đường, dùng làm tài liệu thầu và hồ sơ minh bạch.",
    owner: "Media Lead",
    status: "pending",
    evidence: "01 phim hoàn thiện + thư viện ảnh bằng chứng",
  },
  {
    id: "M3.3",
    phase: 3,
    workstream: "Validation",
    window: "Tuần 12",
    title: "Hội thảo báo cáo kết quả và đóng gói bộ chuẩn",
    detail:
      "Báo cáo trước Chi cục ATVSTP và Sở GD&ĐT; ban hành Bộ chuẩn chuyển đổi số bếp ăn làm cơ sở nhân rộng.",
    owner: "PMO",
    status: "pending",
    evidence: "Biên bản hội thảo + tài liệu bộ chuẩn phát hành",
  },
];

export const anchorAccounts: AnchorAccount[] = [
  {
    id: "A1",
    name: "Công ty TNHH Tinh Bột Xanh",
    segment: "Processing",
    location: "Xã Tân Phú Đông, TP. Sa Đéc, Đồng Tháp",
    legalRep: "Ông Phạm Đông Huy",
    role: "Đối tác biểu tượng về kinh tế tuần hoàn (ống hút bột gạo), mở đường cho hộ chiếu số sản phẩm xuất khẩu.",
    scores: {
      networkReach: 4,
      traceabilityPain: 4,
      dataComplexity: 4,
      buyerAuthority: 5,
      digitalReadiness: 4,
      expansionPotential: 5,
    },
    stage: "Diagnostic",
  },
  {
    id: "A2",
    name: "Nhà thầu suất ăn trường học bán trú",
    segment: "Catering",
    location: "TP. Sa Đéc và TP. Cao Lãnh, Đồng Tháp",
    legalRep: "Ban Điều Hành Chuỗi Bếp Ăn",
    role: "Chủ thể chịu áp lực tuân thủ nặng nhất: kiểm thực ba bước và lưu mẫu 24 giờ theo Quyết định 1246/QĐ-BYT.",
    scores: {
      networkReach: 5,
      traceabilityPain: 5,
      dataComplexity: 3,
      buyerAuthority: 4,
      digitalReadiness: 3,
      expansionPotential: 5,
    },
    stage: "Prospect",
  },
  {
    id: "A3",
    name: "Hợp tác xã sản xuất và cung ứng Bột Sa Đéc",
    segment: "Raw material",
    location: "Phường Tân Quy Đông, TP. Sa Đéc, Đồng Tháp",
    legalRep: "Hội đồng quản trị HTX",
    role: "Vùng nguyên liệu gốc, nơi phát sinh mẻ bột cần được định danh GCI đầu tiên.",
    scores: {
      networkReach: 5,
      traceabilityPain: 3,
      dataComplexity: 2,
      buyerAuthority: 3,
      digitalReadiness: 2,
      expansionPotential: 5,
    },
    stage: "Prospect",
  },
  {
    id: "A4",
    name: "Công ty Cổ phần Thực phẩm Bích Chi",
    segment: "Processing",
    location: "TP. Sa Đéc, Đồng Tháp",
    legalRep: "Ban Tổng Giám đốc",
    role: "Anchor doanh nghiệp công nghiệp lớn, kéo mạng lưới nhà cung cấp bột chuẩn vào hệ thống.",
    scores: {
      networkReach: 5,
      traceabilityPain: 3,
      dataComplexity: 5,
      buyerAuthority: 4,
      digitalReadiness: 5,
      expansionPotential: 5,
    },
    stage: "Prospect",
  },
  {
    id: "A5",
    name: "Bếp ăn Khu công nghiệp Sa Đéc",
    segment: "Catering",
    location: "KCN Sông Hậu, Đồng Tháp",
    legalRep: "Đơn vị vận hành bếp",
    role: "Đầu ra khối lượng lớn (1.500 suất/ngày), rủi ro ngộ độc diện rộng gây gián đoạn sản xuất công nghiệp.",
    scores: {
      networkReach: 4,
      traceabilityPain: 4,
      dataComplexity: 3,
      buyerAuthority: 3,
      digitalReadiness: 3,
      expansionPotential: 4,
    },
    stage: "Prospect",
  },
  {
    id: "A6",
    name: "Bệnh viện Đa khoa khu vực Đồng Tháp",
    segment: "Institutional",
    location: "TP. Sa Đéc & Cao Lãnh",
    legalRep: "Khoa Dinh Dưỡng Bệnh Viện",
    role: "Chuẩn khắt khe nhất về suất ăn bệnh lý và hồ sơ lưu mẫu, tạo uy tín bảo chứng cao nhất khi nhân rộng.",
    scores: {
      networkReach: 3,
      traceabilityPain: 4,
      dataComplexity: 3,
      buyerAuthority: 4,
      digitalReadiness: 3,
      expansionPotential: 4,
    },
    stage: "Prospect",
  },
];

export const govDocuments: GovDocument[] = [
  {
    id: "D1",
    name: "Biên bản ghi nhớ phối hợp thí điểm",
    authority: "Sở Khoa học & Công nghệ Đồng Tháp",
    purpose: "Xác lập phạm vi dữ liệu, đầu mối phối hợp và cơ chế báo cáo định kỳ theo Đề án 100/QĐ-TTg.",
    status: "submitted",
    deadline: "2026-10-05",
  },
  {
    id: "D2",
    name: "Thỏa thuận khai thác dữ liệu phục vụ hậu kiểm",
    authority: "Chi cục An toàn vệ sinh thực phẩm Đồng Tháp",
    purpose: "Quy định thẩm quyền truy cập theo mandate, purpose và data class khi có sự cố cảnh báo ngộ độc.",
    status: "drafted",
    deadline: "2026-10-20",
  },
  {
    id: "D3",
    name: "Kế hoạch phối hợp kiểm thực ba bước trong trường học",
    authority: "Sở Giáo dục và Đào tạo Đồng Tháp",
    purpose: "Đưa hồ sơ số thay thế sổ giấy theo Quyết định 1246/QĐ-BYT tại các trường bán trú.",
    status: "drafted",
    deadline: "2026-11-10",
  },
  {
    id: "D4",
    name: "Cam kết bảo vệ dữ liệu cá nhân người tiêu dùng",
    authority: "Nội bộ ZAM Việt Nam, đối chiếu Nghị định 13/2023/NĐ-CP",
    purpose: "Bảo vệ dữ liệu phụ huynh và học sinh khi quét mã tra cứu bữa ăn dinh dưỡng.",
    status: "signed",
    deadline: "2026-09-30",
  },
];

export const riskRegister: RiskRow[] = [
  {
    risk: "Doanh nghiệp ngại chia sẻ dữ liệu nội bộ",
    probability: "Cao",
    impact: "Trung bình",
    mitigation: "Nhấn mạnh Connect not Replace, cam kết bảo vệ bí mật thương mại bằng NDA và selective disclosure.",
    owner: "BizDev Lead",
  },
  {
    risk: "Nhân sự nhà máy và bếp ăn chưa quen thao tác số",
    probability: "Trung bình",
    impact: "Cao",
    mitigation: "Đào tạo tại chỗ, giao diện ba chạm, hỗ trợ thiết bị quét nhiệt trong giai đoạn đầu.",
    owner: "Tech Lead",
  },
  {
    risk: "Cơ quan quản lý truy cập quá phạm vi dữ liệu doanh nghiệp",
    probability: "Trung bình",
    impact: "Cao",
    mitigation: "Nguyên tắc aggregate-first, RBAC kết hợp ABAC, audit trail mọi lượt truy cập của thanh tra.",
    owner: "PMO",
  },
  {
    risk: "Dữ liệu lệch giữa các hệ thống nguồn",
    probability: "Cao",
    impact: "Trung bình",
    mitigation: "Chuẩn hóa theo Universal Core, dịch vụ reconciliation và xử lý dead-letter.",
    owner: "Tech Lead",
  },
  {
    risk: "Thí điểm kéo dài gây vượt ngân sách",
    probability: "Thấp",
    impact: "Cao",
    mitigation: "Nghiệm thu theo cột mốc, họp tiến độ hằng tuần, quỹ dự phòng 10% (65 triệu).",
    owner: "PMO",
  },
];

export const salesBattleCards: SalesBattleCard[] = [
  {
    objection: "“Chúng tôi đang dùng phần mềm kế toán/bán hàng rồi, không muốn cài thêm phần mềm mới phiền phức.”",
    clientPerspective: "Sợ phát sinh chi phí mua bản quyền mới và sợ nhân sự không quen thao tác lại từ đầu.",
    trojanHorseResponse: "“Dạ GOTRACE tuân thủ nguyên tắc 'Connect not Replace' — hệ thống tự động kết nối qua API với phần mềm anh/chị đang có, nhân viên giữ nguyên thói quen làm việc, không phải gỡ bỏ hay học lại.”",
    evidenceToPresent: "Sơ đồ kiến trúc Universal Core và API Connector kết nối với Bravo, Misa, Fast.",
  },
  {
    objection: "“Dữ liệu công thức bột và giá mua của tôi có bị lộ cho đối thủ hoặc thuế xem không?”",
    clientPerspective: "E ngại mất bí mật thương mại và rủi ro thanh tra thuế.",
    trojanHorseResponse: "“GOTRACE áp dụng kiến trúc 'Selective Disclosure': Cơ quan chức năng chỉ thấy chứng nhận ATTP và nhật ký kiểm thực; Người tiêu dùng chỉ thấy câu chuyện sản phẩm; Toàn bộ giá vốn, định lượng BOM nằm trong phân quyền đóng tuyệt đối của riêng doanh nghiệp.”",
    evidenceToPresent: "Chứng minh cơ chế RBAC + ABAC và cam kết tuân thủ Nghị định 13/2023/NĐ-CP.",
  },
  {
    objection: "“Phần mềm truy xuất chi phí đắt quá, cơ sở chúng tôi làm ăn nhỏ không kham nổi.”",
    clientPerspective: "Nghĩ rằng phải bỏ ra 50–100 triệu mua gói trọn đời.",
    trojanHorseResponse: "“Giai đoạn này PMO Sa Đéc tài trợ 100% chi phí trong Gói Chẩn đoán Dữ liệu Chuỗi Cung ứng (2–4 tuần). Doanh nghiệp chỉ chi trả khi thấy hiệu quả rõ ràng giúp thắng thầu suất ăn hoặc tránh án phạt 20–50 triệu của Chi cục ATVSTP.”",
    evidenceToPresent: "Bảng so sánh chi phí bị xử phạt theo Quyết định 1246 vs Gói thuê bao GOTRACE (1.5tr/tháng).",
  },
  {
    objection: "“Lò bột/xưởng sợi Sa Đéc làm thủ công, bán đứt đoạn bằng giấy viết tay, sao nhập liệu?”",
    clientPerspective: "Tâm lý ngại công nghệ và sợ nhân công cao tuổi ở làng nghề không dùng được smartphone.",
    trojanHorseResponse: "“Xưởng bột không cần nhập liệu phần mềm. Cân điện tử in sẵn tem mã GCI dán lên bao bột/khay sợi trong 3 giây. Mọi đối soát do cổng bếp ăn quét tự động. Khi có tem GOTRACE, xưởng bột được ưu tiên bán thẳng vào bếp ăn học đường với giá cao hơn 25–30%.”",
    evidenceToPresent: "Quy trình in tem tự động 1 chạm từ cân điện tử và hợp đồng bao tiêu suất ăn mẫu.",
  },
  {
    objection: "“Trường học ký khoán trọn gói cho bên Catering, có ngộ độc thì họ chịu, trường mua làm gì?”",
    clientPerspective: "Ảo tưởng miễn trừ trách nhiệm pháp lý khi ký hợp đồng khoán.",
    trojanHorseResponse: "“Theo Luật ATTP sửa đổi 2026, khi ngộ độc xảy ra tại khuôn viên trường, Hiệu trưởng bị tạm đình chỉ công tác phục vụ điều tra ngay lập tức. GOTRACE là lá chắn bảo vệ Ban Giám Hiệu chứng minh trường đã giám sát kiểm thực 3 bước và lưu mẫu 24h đầy đủ.”",
    evidenceToPresent: "Văn bản chỉ đạo của Sở Y tế và Báo cáo giải tỏa trách nhiệm pháp lý trong 15 phút.",
  },
  {
    objection: "“Nhà cung cấp thịt, rau, trứng là mối quen hàng chục năm, tin tưởng nhau cần gì tem truy xuất?”",
    clientPerspective: "Tin tưởng vào quan hệ cá nhân thay vì bằng chứng kiểm chứng độc lập.",
    trojanHorseResponse: "“Mối quen không thể xuất trình cho Thanh tra Y tế hay Cơ quan Điều tra khi có 50 học sinh nhập viện cấp cứu. Pháp luật chỉ nói chuyện bằng Nhật ký kiểm thực 3 bước và Mẫu lưu 24h có chữ ký số điện tử.”",
    evidenceToPresent: "Hồ sơ vụ án điểm 2026 về tuồn thịt bệnh vào trường học và mức án hình sự Điều 317.",
  },
];

export const kitchenRiskRules: KitchenRiskRule[] = [
  {
    id: "K01",
    name: "Lô nguyên liệu quá hạn dùng (Expired Lot)",
    stage: "Storage",
    severity: "CRITICAL",
    logic: "IF CurrentDate >= IngredientLot.expiry_date AND TargetAction == 'ISSUE_TO_KITCHEN'",
    action: "Khóa cứng xuất kho, phát còi cảnh báo KCS, thông báo Bếp trưởng lập biên bản tiêu hủy.",
  },
  {
    id: "K02",
    name: "Nhiệt độ tiếp nhận nguy hiểm (Temp Violation)",
    stage: "Gate",
    severity: "HIGH",
    logic: "IF Product.category == 'FRESH_MEAT' AND Receiving.temperature_celsius > 5.0",
    action: "Đánh dấu REJECTED hoặc CONDITIONAL (nếu 5-7°C); bắt buộc chụp ảnh nhiệt kế.",
  },
  {
    id: "K03",
    name: "Nhà cung cấp chưa duyệt (Unapproved Supplier)",
    stage: "Gate",
    severity: "HIGH",
    logic: "IF Supplier.qualification_status != 'APPROVED' OR Supplier.trust_score < 50",
    action: "Từ chối tạo phiếu tiếp nhận; khóa thanh toán kho vận; cảnh báo Giám đốc Mua sắm.",
  },
  {
    id: "K04",
    name: "Thiếu chứng thư kiểm dịch thú y",
    stage: "Gate",
    severity: "CRITICAL",
    logic: "IF Product.requires_vet_cert == true AND Receiving.evidence_vet_cert IS NULL",
    action: "Chuyển trạng thái QUARANTINED; yêu cầu tài xế xuất trình chứng thư mộc đỏ trong 60 phút.",
  },
  {
    id: "K05",
    name: "Quá 30p chưa lưu mẫu thức ăn 24h",
    stage: "Cooking",
    severity: "HIGH",
    logic: "IF (CurrentTime - MealBatch.cooking_finished_at) > 30m AND SampleRetentionRecord IS NULL",
    action: "Báo động đỏ Dashboard Bếp trưởng; gửi SMS khẩn cấp cho Y tế trường niêm phong mẫu.",
  },
  {
    id: "K06",
    name: "Cố tình xuất nguyên liệu cách ly",
    stage: "Storage",
    severity: "CRITICAL",
    logic: "IF IngredientLot.status == 'QUARANTINED' AND TargetMovement == 'PREPARATION'",
    action: "Khóa tài khoản thao tác; kích hoạt cảnh báo an ninh bếp; báo cáo Ban Giám đốc.",
  },
  {
    id: "K07",
    name: "Tủ bảo quản đứt gãy chuỗi lạnh",
    stage: "Storage",
    severity: "HIGH",
    logic: "IF StorageLocation.type == 'FREEZER' AND Temp > -12.0°C AND Duration > 120m",
    action: "Gắn cờ rã đông nguy cơ; buộc KCS đo lại vi sinh trước khi cấp phép nấu.",
  },
  {
    id: "K08",
    name: "Bỏ qua kiểm thực 3 bước QĐ 1246",
    stage: "Cooking",
    severity: "HIGH",
    logic: "IF MealBatch.is_served == true AND (Step1 == false OR Step2 == false OR Step3 == false)",
    action: "Đánh dấu vi phạm tuân thủ; tự động trừ điểm KPI an toàn của bếp trưởng.",
  },
  {
    id: "K09",
    name: "Lan truyền triệu hồi từ thượng nguồn",
    stage: "Cooking",
    severity: "CRITICAL",
    logic: "IF UpstreamLot.status == 'RECALLED' AND ExistsInGraph(UpstreamLot -> IngredientLot)",
    action: "Kích hoạt Blast Radius Engine; phong tỏa tồn kho; phát lệnh dừng chia suất khẩn cấp.",
  },
  {
    id: "K10",
    name: "Sợi tươi/Bột Sa Đéc tồn quá 18h (Bacillus cereus)",
    stage: "Storage",
    severity: "CRITICAL",
    logic: "IF Product.category == 'FRESH_NOODLES' AND (CurrentTime - ProductionTime) > 18h AND Temp > 15°C",
    action: "Tự động khóa mẻ sợi tươi; buộc thay thế thực đơn bằng gạo/bún khô lưu trữ an toàn.",
  },
  {
    id: "K11",
    name: "Phụ gia cấm Tinopal/Formol/Hàn the",
    stage: "Gate",
    severity: "CRITICAL",
    logic: "IF TestKitResult.substance IN ['TINOPAL', 'FORMALDEHYDE', 'BORAX'] AND Result == POSITIVE",
    action: "Phong tỏa cổng tiếp nhận; chụp ảnh Kit thử nhanh; khóa mã NCC; báo Chi cục ATVSTP.",
  },
  {
    id: "K12",
    name: "Trứng dập vỡ/vỏ bẩn vượt ngưỡng (Salmonella)",
    stage: "Gate",
    severity: "HIGH",
    logic: "IF Product.category == 'EGGS' AND (CrackedRatio > 0.02 OR FecesStain == TRUE)",
    action: "Loại bỏ 100% trứng nứt vỡ; chiếu đèn buồng khí; sát khuẩn vỏ trước khi chế biến.",
  },
];

export const foodSupplyChainAnchors: AnchorAccount[] = [
  {
    id: "S01",
    name: "Doanh nghiệp Tinh bột quy mô lớn Sa Đéc",
    segment: "Processing",
    location: "Xã Tân Phú Đông, TP. Sa Đéc, Đồng Tháp",
    legalRep: "Ban Giám Đốc Nhà Máy",
    role: "Đầu tàu chế biến tinh bột gạo, cung ứng nguyên liệu bột cho chuỗi hủ tiếu, bánh canh toàn vùng.",
    scores: {
      networkReach: 5,
      traceabilityPain: 5,
      dataComplexity: 4,
      buyerAuthority: 5,
      digitalReadiness: 4,
      expansionPotential: 5,
    },
    stage: "Diagnostic",
  },
  {
    id: "S02",
    name: "HTX Làng nghề Bột Tân Phú Đông",
    segment: "Raw material",
    location: "Làng nghề bột Sa Đéc, Đồng Tháp",
    legalRep: "Chủ nhiệm Hợp Tác Xã",
    role: "Hạt nhân liên kết 100+ hộ làm bột truyền thống, bảo vệ thương hiệu tập thể Bột Sa Đéc.",
    scores: {
      networkReach: 5,
      traceabilityPain: 4,
      dataComplexity: 3,
      buyerAuthority: 4,
      digitalReadiness: 3,
      expansionPotential: 5,
    },
    stage: "Prospect",
  },
  {
    id: "S03",
    name: "Cơ sở Sản xuất Sợi Hủ tiếu & Bánh canh tươi Sa Đéc",
    segment: "Processing",
    location: "Phường 2, TP. Sa Đéc, Đồng Tháp",
    legalRep: "Chủ Cơ Sở Chế Biến",
    role: "Cung ứng 15–20 tấn sợi tươi/ngày cho bếp ăn trường học/KCN, chịu rủi ro vi sinh và hạn dùng 18h.",
    scores: {
      networkReach: 5,
      traceabilityPain: 5,
      dataComplexity: 3,
      buyerAuthority: 4,
      digitalReadiness: 3,
      expansionPotential: 5,
    },
    stage: "Diagnostic",
  },
  {
    id: "S04",
    name: "Tập đoàn Chăn nuôi & Trứng sạch ĐBSCL",
    segment: "Raw material",
    location: "Tiền Giang / Long An",
    legalRep: "Ban Tổng Giám Đốc",
    role: "Kiểm soát dịch bệnh Salmonella khép kín, truy xuất từng quả trứng, bảo chứng cho bếp học đường.",
    scores: {
      networkReach: 5,
      traceabilityPain: 4,
      dataComplexity: 4,
      buyerAuthority: 5,
      digitalReadiness: 5,
      expansionPotential: 5,
    },
    stage: "Prospect",
  },
  {
    id: "S05",
    name: "Chuỗi Cung Ứng Thịt Heo VietGAP Tiền Giang",
    segment: "Raw material",
    location: "Châu Thành, Tiền Giang",
    legalRep: "Đại Diện Liên Minh HTX Chăn Nuôi",
    role: "Kiểm soát dịch tả heo ASF, chứng thư kiểm dịch điện tử kết nối cổng tiếp nhận bếp trong 15 phút.",
    scores: {
      networkReach: 4,
      traceabilityPain: 5,
      dataComplexity: 3,
      buyerAuthority: 4,
      digitalReadiness: 4,
      expansionPotential: 4,
    },
    stage: "Prospect",
  },
  {
    id: "S06",
    name: "HTX Rau An Toàn Cần Thơ & Đà Lạt",
    segment: "Raw material",
    location: "Ô Môn, Cần Thơ & Đơn Dương, Lâm Đồng",
    legalRep: "Ban Quản Trị HTX Rau Sạch",
    role: "Cung ứng rau sạch VietGAP kiểm soát dư lượng thuốc BVTV, truy xuất đến tận tọa độ luống trồng.",
    scores: {
      networkReach: 4,
      traceabilityPain: 4,
      dataComplexity: 3,
      buyerAuthority: 4,
      digitalReadiness: 3,
      expansionPotential: 4,
    },
    stage: "Prospect",
  },
];

export const simulatedTraceback: TracebackEvent[] = [
  {
    step: "Sự Cố",
    timestamp: "11:45:00 - 25/09/2026",
    entity: "Bếp ăn Trường Tiểu học Kim Đồng (Sa Đéc)",
    action: "Cảnh báo ngộ độc nhẹ: 3 học sinh có triệu chứng đau bụng sau bữa trưa",
    gci: "GT:VN:CASE:EMERGENCY-2026-0925-01",
    status: "CRITICAL",
    detail: "Kích hoạt giao thức Traceback khẩn cấp theo Quyết định 1246/QĐ-BYT.",
  },
  {
    step: "Kho Lưu Mẫu",
    timestamp: "11:47:30 (sau 2.5 phút)",
    entity: "Tủ Lưu Mẫu Bếp Ăn",
    action: "Truy xuất mã niêm phong hộp mẫu số H-0925-BUNBO",
    gci: "GT:VN:SAMPLE:DEC1246-24H-H0925",
    status: "ALERT",
    detail: "Mẫu lưu 150g ghi nhận nhiệt độ lưu trữ ổn định 4.2°C lúc 09:30. Khóa hộp gửi Quatest 3.",
  },
  {
    step: "Xưởng Sợi Tươi",
    timestamp: "11:51:15 (sau 6.2 phút)",
    entity: "Cơ sở sản xuất Hủ tiếu & Bún tươi Tân Phú Đông",
    action: "Định danh lô sợi giao sáng 25/09: Lô B-2509-02 (250 kg)",
    gci: "GT:VN:ITEM:LOT-SOI-2509-02",
    status: "NORMAL",
    detail: "Nhiệt độ luộc sợi đạt 100°C trong 18 phút. Nước rửa đạt chuẩn clo dư 0.5 ppm.",
  },
  {
    step: "HTX Bột Gốc",
    timestamp: "11:55:00 (sau 10 phút)",
    entity: "HTX Sản xuất Bột Sa Đéc (Lò lắng số 4)",
    action: "Xác minh mẻ bột ướt: Mẻ BOT-SA-0924-L4",
    gci: "GT:VN:ITEM:SADEC-RAW-0924",
    status: "NORMAL",
    detail: "Thời gian ngâm gạo 48h, pH nước lọc 6.8. Chứng chỉ kiểm nghiệm vi sinh đạt chuẩn ngày 24/09.",
  },
  {
    step: "Kết Luận Hậu Kiểm",
    timestamp: "11:58:30 (Tổng thời gian: 13.5 phút)",
    entity: "Chi cục ATVSTP Tỉnh Đồng Tháp",
    action: "Cô lập nguồn nghi vấn: Lô sợi và mẻ bột âm tính vi sinh",
    gci: "GT:VN:CASE:CLEARED-INVESTIGATION-01",
    status: "NORMAL",
    detail: "Nguyên nhân xác định do dị ứng hải sản từ món phụ kèm. Toàn bộ chuỗi Bột Sa Đéc được giải tỏa trách nhiệm pháp lý trong vòng < 15 phút!",
  },
];

export const tracebackScenarios: TracebackScenario[] = [
  {
    id: "sc-starch",
    name: "Kịch Bản 1: Trụ Cột Tinh Bột (Bột Lọc & Bánh Canh Tươi Sa Đéc)",
    pillar: "Starch",
    targetLot: "GT:VN:ITEM:LOT-SOI-2509-02",
    timeElapsed: "13.5 Phút",
    conclusion: "Lô sợi tươi đạt chuẩn nhiệt luộc 100°C, âm tính vi sinh Bacillus cereus. Giải tỏa trách nhiệm pháp lý cho trường học và cơ sở sợi.",
    events: simulatedTraceback,
  },
  {
    id: "sc-protein",
    name: "Kịch Bản 2: Trụ Cột Đạm & Thịt (Thịt Heo VietGAP Nghi Vi Phạm Chuỗi Lạnh)",
    pillar: "Protein",
    targetLot: "GT:VN:ITEM:PORK-VG-TG-0925",
    timeElapsed: "11.2 Phút",
    conclusion: "Phát hiện cảm biến IoT xe tải đông lạnh tăng lên 9.5°C suốt 3 tiếng trong hành trình Tiền Giang -> Sa Đéc. Cô lập tại cổng tiếp nhận trước khi vào bếp.",
    events: [
      {
        step: "Cảnh Báo Cổng",
        timestamp: "05:15:00 - 25/09/2026",
        entity: "Cổng Tiếp Nhận Bếp Ăn KCN Sa Đéc",
        action: "Quét mã GCI thùng thịt heo: Kích hoạt Kitchen Rule K02",
        gci: "GT:VN:ITEM:PORK-VG-TG-0925",
        status: "CRITICAL",
        detail: "Nhiệt kế hồng ngoại đo tâm thịt đạt 8.2°C (Vượt ngưỡng cho phép <= 5°C).",
      },
      {
        step: "Truy Vết IoT Xe Tải",
        timestamp: "05:18:10 (sau 3.1 phút)",
        entity: "Hệ thống Telematics Logistcs Lạnh",
        action: "Đọc log nhiệt độ thùng xe tải số hiệu 63C-182.90",
        gci: "GT:VN:EVENT:COLDCHAIN-BREACH-TGSD",
        status: "CRITICAL",
        detail: "Lốc lạnh xe bị ngắt lúc 02:40 sáng tại Cai Lậy; nhiệt độ thùng duy trì 9.5°C suốt 150 phút.",
      },
      {
        step: "Đối Chiếu Thú Y",
        timestamp: "05:21:40 (sau 6.6 phút)",
        entity: "Cơ quan Thú y Vùng Tiền Giang",
        action: "Kiểm tra Giấy kiểm dịch điện tử số KD-2026-TG8921",
        gci: "GT:VN:CRED:VET-CERT-TG-8921",
        status: "ALERT",
        detail: "Mã mộc kiểm dịch âm tính ASF tại trại, nhưng lỗi vận chuyển vi phạm bảo quản an toàn.",
      },
      {
        step: "Cô Lập & Thay Thế",
        timestamp: "05:26:12 (Tổng thời gian: 11.2 phút)",
        entity: "Hội Đồng Kiểm Thực Bước 1 (Bếp KCN Sa Đéc)",
        action: "Lập biên bản REJECTED 300kg thịt heo, kích hoạt NCC dự phòng",
        gci: "GT:VN:CASE:REJECT-REPLACE-PORK-01",
        status: "NORMAL",
        detail: "Chặn đứng nguy cơ ngộ độc cho 1.500 công nhân. Tự động báo cáo BQL Khu Kinh tế và đổi món cá tra phi lê đạt chuẩn.",
      },
    ],
  },
  {
    id: "sc-egg",
    name: "Kịch Bản 3: Trụ Cột Trứng & Gia Cầm (Truy Vết Ổ Dịch Trứng Dập Nhiễm Salmonella)",
    pillar: "Egg",
    targetLot: "GT:VN:ITEM:EGG-CLEAN-UV-2509",
    timeElapsed: "9.8 Phút",
    conclusion: "Truy ngược đến khay trứng nứt vỡ trong lô 5.000 quả. Khóa mẻ trứng luộc trước khi chia vào khay ăn học sinh tiểu học.",
    events: [
      {
        step: "Kiểm Thực Bước 2",
        timestamp: "09:10:00 - 25/09/2026",
        entity: "Khu Vực Sơ Chế Bếp Ăn Bán Trú",
        action: "Phát hiện khay trứng nứt vỡ có mùi lạ: Kích hoạt Kitchen Rule K12",
        gci: "GT:VN:ITEM:EGG-CLEAN-UV-2509",
        status: "CRITICAL",
        detail: "Tỷ lệ nứt vỡ cục bộ đạt 5.2% trong thùng số 4; nguy cơ thẩm thấu vi khuẩn Salmonella qua vỏ.",
      },
      {
        step: "Truy Xuất Trại Đẻ",
        timestamp: "09:13:30 (sau 3.5 phút)",
        entity: "Tổ hợp Chăn nuôi Gia cầm Long An",
        action: "Xác minh buồng chiếu UV và ngày thu hoạch trứng",
        gci: "GT:VN:EVENT:UV-STERILIZE-LA-0923",
        status: "ALERT",
        detail: "Trứng thu hoạch 23/09, chiếu xạ UV đạt chuẩn nhưng quy cách đóng vỉ vận chuyển đường gồ ghề làm dập vỏ.",
      },
      {
        step: "Niêm Phong Hủy Lô",
        timestamp: "09:19:48 (Tổng thời gian: 9.8 phút)",
        entity: "Tổ Y Tế & KCS Bếp Trường Học",
        action: "Niêm phong toàn bộ 400 quả trứng cùng mẻ, tiêu hủy dưới sự giám sát phụ huynh",
        gci: "GT:VN:CASE:DISPOSAL-EGG-SALM-01",
        status: "NORMAL",
        detail: "Bếp ăn an toàn tuyệt đối. Nhà cung ứng chấp nhận bồi thường và thay đổi khay đệm chống sốc theo tiêu chuẩn GOTRACE.",
      },
    ],
  },
];
