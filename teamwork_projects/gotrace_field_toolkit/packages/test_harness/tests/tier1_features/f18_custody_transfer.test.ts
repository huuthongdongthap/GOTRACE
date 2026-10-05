import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LotExtractor, TransactionMapper } from '@gotrace/erp_connector';
import { isValidCustodyTransferGci } from '../../src/verifiers/gci_verifier.ts';

const BRAVO_PAYLOAD = {
  erp_source: 'BRAVO_8' as const,
  order_id: 'DO-20260930-0012',
  timestamp_utc: new Date().toISOString(),
  customer_party_gci: 'VN.SG.PARTY.BUYER.COOPMART',
  warehouse_gci: 'VN.DT.PARTY.ENTERPRISE.COMAY-001',
  carrier_party_gci: 'VN.DT.PARTY.LOGISTICS.CH-SA-DEC-01',
  delivery_date: '2026-09-30T08:30:00Z',
  items: [
    {
      item_code: 'GAO-OM5451-50KG',
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

describe('Tier 1: Feature 18 - TRANSACTION: CUSTODY_TRANSFER Generation', () => {
  it('F18-TC1: Successfully maps ERP Delivery Order to TRANSACTION: CUSTODY_TRANSFER entity', () => {
    const extraction = LotExtractor.extractFromBravoDo(BRAVO_PAYLOAD);
    const tx = TransactionMapper.mapDeliveryOrder(extraction.normalizedOrder!, extraction.lots);
    assert.strictEqual(tx.transaction_type, 'CUSTODY_TRANSFER');
    assert.strictEqual(tx.contract_ref, BRAVO_PAYLOAD.order_id);
    assert.strictEqual(tx.status, 'EXECUTED');
  });

  it('F18-TC2: Generates valid GCI identifier for CUSTODY_TRANSFER transaction', () => {
    const extraction = LotExtractor.extractFromBravoDo(BRAVO_PAYLOAD);
    const tx = TransactionMapper.mapDeliveryOrder(extraction.normalizedOrder!, extraction.lots);
    assert.strictEqual(isValidCustodyTransferGci(tx.transaction_id), true);
    assert.ok(tx.transaction_id.startsWith('VN.DT.TRANSACTION.CUSTODY_TRANSFER.'));
  });

  it('F18-TC3: Correctly preserves seller and buyer party relationships', () => {
    const extraction = LotExtractor.extractFromBravoDo(BRAVO_PAYLOAD);
    const tx = TransactionMapper.mapDeliveryOrder(extraction.normalizedOrder!, extraction.lots);
    assert.strictEqual(tx.seller_party_id, 'VN.DT.PARTY.ENTERPRISE.COMAY-001');
    assert.strictEqual(tx.buyer_party_id, 'VN.SG.PARTY.BUYER.COOPMART');
  });

  it('F18-TC4: Maps all dispatched LOTs and verifies total transferred mass', () => {
    const extraction = LotExtractor.extractFromBravoDo(BRAVO_PAYLOAD);
    const tx = TransactionMapper.mapDeliveryOrder(extraction.normalizedOrder!, extraction.lots);
    assert.strictEqual(tx.input_lots.length, 1);
    assert.strictEqual(tx.input_lots[0].lot_id, 'VN.DT.LOT.FINISHED.20260930-OM5451-01');
    assert.strictEqual(tx.input_lots[0].weight, 45000.0);
  });

  it('F18-TC5: Successfully handles multiple line items in custody transfer', () => {
    const multiItemPayload = {
      ...BRAVO_PAYLOAD,
      order_id: 'DO-MULTI-1234',
      items: [
        {
          item_code: 'GAO-OM5451-50KG',
          lot_number: 'VN.DT.LOT.FINISHED.20260930-OM5451-01',
          quantity: 500,
          uom: 'BAG',
          net_weight_kg: 25000.0,
          gross_weight_kg: 25250.0,
        },
        {
          item_code: 'GAO-ST25-50KG',
          lot_number: 'VN.DT.LOT.FINISHED.20260930-ST25-01',
          quantity: 400,
          uom: 'BAG',
          net_weight_kg: 20000.0,
          gross_weight_kg: 20200.0,
        },
      ],
    };
    const extraction = LotExtractor.extractFromBravoDo(multiItemPayload);
    const tx = TransactionMapper.mapDeliveryOrder(extraction.normalizedOrder!, extraction.lots);
    assert.strictEqual(tx.input_lots.length, 2);
    const totalMass = tx.input_lots.reduce((sum, item) => sum + item.weight, 0);
    assert.strictEqual(totalMass, 45000.0);
  });
});
