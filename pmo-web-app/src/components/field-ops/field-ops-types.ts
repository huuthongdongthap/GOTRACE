export interface GateInspectionRecord {
  id: string;
  timestamp: string;
  pillar: "Starch" | "Protein" | "Egg" | "Veg";
  supplier: string;
  itemName: string;
  gciCode: string;
  lotNumber: string;
  weightKg: number;
  tempCelsius: number;
  hasVetCert: boolean;
  freshnessHours: number;
  eggCrackRatePercent: number;
  sensoryPassed: boolean;
  violations: string[];
  status: "PASSED" | "REJECTED" | "QUARANTINED";
  sampleSaved: boolean;
  sampleTemp: number;
  inspectorName: string;
}

export const DEFAULT_RECORDS: GateInspectionRecord[] = [
  {
    id: "LOG-20260926-001",
    timestamp: "2026-09-26 05:45",
    pillar: "Starch",
    supplier: "HTX Bột Tân Phú Đông (Sa Đéc)",
    itemName: "Hủ tiếu tươi truyền thống Sa Đéc (sợi tươi 18h)",
    gciCode: "GT:VN:ITEM:SADEC-FD:HT-20260926-01",
    lotNumber: "LOT-HT-0926-A",
    weightKg: 85,
    tempCelsius: 24.5,
    hasVetCert: true,
    freshnessHours: 4,
    eggCrackRatePercent: 0,
    sensoryPassed: true,
    violations: [],
    status: "PASSED",
    sampleSaved: true,
    sampleTemp: 4.2,
    inspectorName: "Kỹ thuật viên Hiện Trường PMO",
  },
  {
    id: "LOG-20260926-002",
    timestamp: "2026-09-26 06:15",
    pillar: "Protein",
    supplier: "Cty CP Thực phẩm VietGAP Cần Thơ",
    itemName: "Thịt heo nạc dăm làm sạch",
    gciCode: "GT:VN:ITEM:CT-PROTEIN:TH-20260926-02",
    lotNumber: "LOT-HEO-0926-B",
    weightKg: 120,
    tempCelsius: 3.8,
    hasVetCert: true,
    freshnessHours: 6,
    eggCrackRatePercent: 0,
    sensoryPassed: true,
    violations: [],
    status: "PASSED",
    sampleSaved: true,
    sampleTemp: 3.5,
    inspectorName: "Kỹ thuật viên Hiện Trường PMO",
  },
  {
    id: "LOG-20260926-003",
    timestamp: "2026-09-26 06:40",
    pillar: "Egg",
    supplier: "Trang trại Trứng Sạch Ba Huân",
    itemName: "Trứng gà tiệt trùng UV đóng vỉ",
    gciCode: "GT:VN:ITEM:BH-EGG:TRUNG-0926-03",
    lotNumber: "LOT-EGG-0926-C",
    weightKg: 45,
    tempCelsius: 22.0,
    hasVetCert: true,
    freshnessHours: 24,
    eggCrackRatePercent: 1.2,
    sensoryPassed: true,
    violations: [],
    status: "PASSED",
    sampleSaved: true,
    sampleTemp: 4.0,
    inspectorName: "Bếp trưởng Ca Sáng",
  },
];
