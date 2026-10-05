import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LotExtractor } from '@gotrace/erp_connector';
import { isValidFinishedLotGci } from '../../src/verifiers/gci_verifier.ts';

const BRAVO_PAYLOAD = {
  erp_source: 'BRAVO_8' as const,
  order_id: 'DO-20260930-0012',
  timestamp_utc: new Date().toISOString(),
  customer_id: 'VN.SG.PARTY.BUYER.COOPMART-01',
  delivery_date: '2026-09-30T08:30:00Z',
  warehouse_code: 'VN.DT.PLACE.WAREHOUSE.WH-SADEC',
  carrier_code: 'VN.DT.PARTY.CARRIER.MEKONG-TRANS-01',
  items: [
    {
      line_no: 1,
      item_code: 'VN.DT.ITEM.GRAIN.OM5451',
      item_name: 'Gạo Trắng OM5451 Xuất Khẩu',
      lot_number: 'VN.DT.LOT.FINISHED.20260930-OM5451-01',
      quantity: 900,
      uom: 'BAG',
      net_weight_kg: 45000.0,
      gross_weight_kg: 45450.0,
      mfg_date: '2026-09-30',
      exp_date: '2027-09-30',
    },
  ],
};

describe('Tier 1: Feature 17 - LOT Extraction & Lineage Engine', () => {
  it('F17-TC1: Successfully extracts LOT numbers and net weights from ERP Delivery Order', () => {
    const res = LotExtractor.extractFromBravoDo(BRAVO_PAYLOAD);
    assert.strictEqual(res.erpSource, 'BRAVO_8');
    assert.strictEqual(res.lots.length, 1);
    assert.strictEqual(res.lots[0].lot_id, 'VN.DT.LOT.FINISHED.20260930-OM5451-01');
    assert.strictEqual(res.lots[0].quantity_net, 45000.0);
  });

  it('F17-TC2: Verifies extracted lot numbers conform to standard GCI Finished Lot syntax', () => {
    const res = LotExtractor.extractFromBravoDo(BRAVO_PAYLOAD);
    assert.strictEqual(isValidFinishedLotGci(res.lots[0].lot_id), true);
  });

  it('F17-TC3: Validates expiration date is strictly after delivery date', () => {
    const res = LotExtractor.extractFromBravoDo(BRAVO_PAYLOAD);
    const lot = res.lots[0];
    const delDate = new Date(BRAVO_PAYLOAD.delivery_date);
    const expDate = new Date(lot.expiry_date!);
    assert.ok(expDate.getTime() > delDate.getTime());
  });

  it('F17-TC4: Canonicalizes raw non-prefixed ERP lot numbers into valid GCI', () => {
    const rawPayload = {
      ...BRAVO_PAYLOAD,
      items: [{
        ...BRAVO_PAYLOAD.items[0],
        lot_number: '20260930-RAW-LOT-99',
      }],
    };
    const res = LotExtractor.extractFromBravoDo(rawPayload);
    assert.strictEqual(res.lots[0].lot_id, 'VN.DT.LOT.FINISHED.20260930-RAW-LOT-99');
    assert.strictEqual(isValidFinishedLotGci(res.lots[0].lot_id), true);
  });

  it('F17-TC5: Throws descriptive error if line item is missing lot_number or has non-positive quantity', () => {
    const invalidPayload = {
      ...BRAVO_PAYLOAD,
      items: [{
        ...BRAVO_PAYLOAD.items[0],
        lot_number: '',
      }],
    };
    assert.throws(() => LotExtractor.extractFromBravoDo(invalidPayload), /lot_number and positive quantity required/);
  });
});
