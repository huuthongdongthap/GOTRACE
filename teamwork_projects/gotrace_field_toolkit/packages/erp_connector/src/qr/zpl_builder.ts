/**
 * GoTRACE Zebra ZPL Industrial Label Generator
 * 
 * Generates standard ZPL II (Zebra Programming Language) commands for
 * warehouse carton and pallet thermal printers (e.g., Zebra ZT411, ZD421).
 */

export interface CartonLabelParams {
  productName: string; // e.g. "GAO ST25 CO MAY DONG THAP"
  lotGci: string; // e.g. "VN.DT.LOT.FINISHED.20260928-ST25-5K-01"
  productionDate: string; // YYYY-MM-DD
  expiryDate?: string; // YYYY-MM-DD
  weightKg?: number; // e.g. 5.0
  uom?: string; // e.g. "KG" or "BAG"
  originFacility?: string; // e.g. "NHA MAY CO MAY SA DEC"
  traceabilityUrl: string; // e.g. "https://trace.gotrace.vn/resolve?gci=..."
  cartonBarcode?: string; // GS1-128 or Code 128 barcode content
  dpi?: 203 | 300; // Default 203 DPI (8 dots/mm)
}

export interface PalletLabelParams {
  sscc: string; // Serial Shipping Container Code: e.g. "089350010000000124"
  sellerName: string; // e.g. "CONG TY CP CO MAY"
  buyerName: string; // e.g. "SAIGON CO.OP - KHO BINH DUONG"
  deliveryOrderNumber: string; // e.g. "DO-20260930-0012"
  primaryLotGci: string;
  totalCartons: number;
  totalNetWeightKg: number;
  totalGrossWeightKg: number;
  traceabilityUrl: string;
  dispatchDate: string;
  dpi?: 203 | 300;
}

export class ZplGenerator {
  /**
   * Generates standard ZPL II commands for warehouse carton thermal labels (4" x 4" or 4" x 6").
   */
  public static generateCartonLabel(params: CartonLabelParams): string {
    const widthDots = params.dpi === 300 ? 1200 : 800;
    const lengthDots = params.dpi === 300 ? 1200 : 800;
    const qrMagnification = params.dpi === 300 ? 7 : 5;

    // Clean strings of characters that could break ZPL commands
    const cleanProd = sanitizeZpl(params.productName);
    const cleanLot = sanitizeZpl(params.lotGci);
    const cleanOrigin = params.originFacility ? sanitizeZpl(params.originFacility) : 'DONG THAP - VIET NAM';
    const cleanBarcode = sanitizeZpl(params.cartonBarcode ?? params.lotGci.replace(/[^A-Za-z0-9_-]/g, ''));

    const weightLine = params.weightKg !== undefined
      ? `^FO230,145^A0N,20,20^FDTRONG LUONG: ${params.weightKg} ${params.uom ?? 'KG'}^FS\n`
      : '';

    const expLine = params.expiryDate
      ? `^FO230,115^A0N,20,20^FDNSX: ${params.productionDate} - HSD: ${params.expiryDate}^FS\n`
      : `^FO230,115^A0N,20,20^FDNGAY DONG GOI: ${params.productionDate}^FS\n`;

    return [
      '^XA',
      `^PW${widthDots}`,
      `^LL${lengthDots}`,
      '^LH0,0',
      // Outer border frame
      '^FO20,20^GB760,760,3^FS',
      // QR Code (Model 2, Magnification 5, Error correction M)
      `^FO40,40^BQN,2,${qrMagnification}^FDQA,${params.traceabilityUrl}^FS`,
      // Header Information
      `^FO230,40^A0N,26,26^FD${cleanProd}^FS`,
      `^FO230,75^A0N,20,20^FDCO SO: ${cleanOrigin}^FS`,
      `^FO230,95^GB530,1,1^FS`,
      expLine,
      weightLine,
      `^FO40,210^A0N,22,22^FDLO: ${cleanLot}^FS`,
      // Horizontal separator line
      '^FO40,245^GB720,2,2^FS',
      // Barcode 128
      '^FO80,270^BY3,2,90^BCN,90,Y,N,N^FD' + cleanBarcode + '^FS',
      // Footer: GOTRACE Authenticated
      '^FO40,410^A0N,18,18^FDXAC THUC NGUON GOC CHUOI CUNG UNG GOTRACE^FS',
      '^FO40,435^A0N,16,16^FDQUET MA QR DE XEM PHA HE LO HANG VA CHUNG CHI^FS',
      '^XZ'
    ].join('\n');
  }

  /**
   * Generates standard ZPL II commands for pallet / logistics master shipping labels (4" x 6").
   */
  public static generatePalletLabel(params: PalletLabelParams): string {
    const widthDots = params.dpi === 300 ? 1200 : 800;
    const lengthDots = params.dpi === 300 ? 1800 : 1200;
    const cleanSeller = sanitizeZpl(params.sellerName);
    const cleanBuyer = sanitizeZpl(params.buyerName);
    const cleanDO = sanitizeZpl(params.deliveryOrderNumber);
    const cleanLot = sanitizeZpl(params.primaryLotGci);
    const cleanSscc = sanitizeZpl(params.sscc);

    return [
      '^XA',
      `^PW${widthDots}`,
      `^LL${lengthDots}`,
      '^LH0,0',
      // Border
      '^FO20,20^GB760,1160,4^FS',
      // Title
      '^FO40,40^A0N,36,36^FDGOTRACE LOGISTICS PALLET LABEL^FS',
      '^FO40,85^GB720,2,2^FS',
      // Shipper & Consignee
      `^FO40,105^A0N,22,22^FDBEN GIAO: ${cleanSeller}^FS`,
      `^FO40,140^A0N,22,22^FDBEN NHAN: ${cleanBuyer}^FS`,
      `^FO40,175^A0N,22,22^FDSO LENH XUAT KHO (DO): ${cleanDO}^FS`,
      `^FO40,210^A0N,22,22^FDNGAY XUAT: ${params.dispatchDate}^FS`,
      '^FO40,245^GB720,2,2^FS',
      // Pallet Metrics
      `^FO40,265^A0N,26,26^FDSO THUNG: ${params.totalCartons} THUNG^FS`,
      `^FO40,305^A0N,26,26^FDKHOI LUONG RONG: ${params.totalNetWeightKg} KG^FS`,
      `^FO40,345^A0N,26,26^FDKHOI LUONG TONG: ${params.totalGrossWeightKg} KG^FS`,
      `^FO40,385^A0N,22,22^FDLO NGUYEN LIEU: ${cleanLot}^FS`,
      '^FO40,420^GB720,2,2^FS',
      // QR Code
      `^FO520,440^BQN,2,6^FDQA,${params.traceabilityUrl}^FS`,
      // SSCC Section
      '^FO40,440^A0N,24,24^FDSSCC (SERIAL SHIPPING CONTAINER CODE):^FS',
      `^FO40,475^A0N,28,28^FD(00) ${cleanSscc}^FS`,
      // SSCC GS1 Barcode
      `^FO60,540^BY4,2,140^BCN,140,Y,N,N^FD>:(00)${cleanSscc}^FS`,
      '^FO40,730^GB720,2,2^FS',
      '^FO40,750^A0N,20,20^FDTRUONG THONG TIN CHUYEN GIAO LUU KHO (CUSTODY TRANSFER)^FS',
      `^FO40,780^A0N,18,18^FDURL TRUY XUAT: ${params.traceabilityUrl}^FS`,
      '^XZ'
    ].join('\n');
  }
}

/**
 * Remove special characters that could corrupt ZPL syntax.
 */
function sanitizeZpl(input: string): string {
  return input
    .replace(/\^/g, '')
    .replace(/~/g, '')
    .replace(/\r?\n/g, ' ')
    .trim();
}
