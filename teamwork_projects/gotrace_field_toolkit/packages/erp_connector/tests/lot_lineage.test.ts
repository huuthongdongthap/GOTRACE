/**
 * Test Suite: GCI Syntax, LOT Extraction & Lineage Engine
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { GciValidator } from '../src/services/gci_validator.js';
import { LotExtractor } from '../src/services/lot_extractor.js';
import { TransactionMapper } from '../src/services/transaction_mapper.js';
import { LineageEngine } from '../src/services/lineage_engine.js';
import { GoTraceLot, NormalizedDeliveryOrder } from '../src/types/models.js';

describe('GCI Syntax Validator', () => {
  test('validates standard Mekong GCI identifiers', () => {
    assert.strictEqual(GciValidator.isValid('VN.DT.LOT.FINISHED.20260928-ST25-5K-01'), true);
    assert.strictEqual(GciValidator.isValid('VN.DT.TRANSACTION.CUSTODY_TRANSFER.DO-001'), true);
    assert.strictEqual(GciValidator.isValid('VN.AG.PLACE.WEIGH_STATION.WS-01'), true);
    assert.strictEqual(GciValidator.isValid('VN.SG.PARTY.BUYER.COOPMART'), true);
    assert.strictEqual(GciValidator.isValid('VN.CT.EVENT.WEIGHED.EVT-991'), true);
    assert.strictEqual(GciValidator.isValid('VN.TG.EVIDENCE.WEIGHT_TICKET.WT-002'), true);
  });

  test('rejects invalid GCI syntax', () => {
    assert.strictEqual(GciValidator.isValid('INVALID.GCI.CODE'), false);
    assert.strictEqual(GciValidator.isValid('VN.XX.LOT.FINISHED.01'), false); // XX is invalid province
    assert.strictEqual(GciValidator.isValid('VN.DT.UNKNOWN_PRIMITIVE.01'), false);
    assert.strictEqual(GciValidator.isValid('VN.DT.LOT.with space.01'), false);
  });

  test('parses GCI into structured components', () => {
    const parsed = GciValidator.parse('VN.DT.LOT.FINISHED.20260928-ST25-5K-01');
    assert.strictEqual(parsed.country, 'VN');
    assert.strictEqual(parsed.province, 'DT');
    assert.strictEqual(parsed.primitive, 'LOT');
    assert.strictEqual(parsed.subtype, 'FINISHED');
    assert.strictEqual(parsed.subId, '20260928-ST25-5K-01');
  });

  test('canonicalizes raw lot numbers and party codes', () => {
    const canonicalLot = GciValidator.canonicalizeLotGci('BATCH-2026-X1', 'DT', 'FINISHED');
    assert.strictEqual(canonicalLot, 'VN.DT.LOT.FINISHED.BATCH-2026-X1');
    assert.strictEqual(GciValidator.isValid(canonicalLot), true);

    const canonicalParty = GciValidator.canonicalizePartyGci('0300987654', 'ENTERPRISE', 'DT');
    assert.strictEqual(canonicalParty, 'VN.DT.PARTY.ENTERPRISE.0300987654');
    assert.strictEqual(GciValidator.isValid(canonicalParty), true);
  });
});

describe('Lineage Engine & Entity Storage', () => {
  test('records lots and transactions and constructs lineage report', () => {
    const engine = new LineageEngine();
    const now = new Date().toISOString();

    const parentLot: GoTraceLot = {
      lot_id: 'VN.DT.LOT.HARVEST.20260925-OM5451-FIELD01',
      item_id: 'VN.DT.ITEM.GRAIN.OM5451-FRESH',
      parent_lot_ids: [],
      quantity_net: 45000,
      quantity_gross: 45200,
      uom: 'KG',
      production_date: '2026-09-25',
      status: 'INSPECTED',
      created_at: now,
      updated_at: now
    };

    const finishedLot: GoTraceLot = {
      lot_id: 'VN.DT.LOT.FINISHED.20260928-OM5451-5K-01',
      item_id: 'VN.DT.ITEM.GRAIN.OM5451-MILLED',
      parent_lot_ids: [parentLot.lot_id],
      quantity_net: 30000,
      quantity_gross: 30300,
      uom: 'BAG',
      production_date: '2026-09-28',
      expiry_date: '2027-09-28',
      status: 'INSPECTED',
      created_at: now,
      updated_at: now
    };

    const order: NormalizedDeliveryOrder = {
      orderId: 'DO-20260930-9901',
      erpSource: 'BRAVO_8',
      warehouseCode: 'VN.DT.PLACE.WAREHOUSE.COMAY-01',
      customerPartyGci: 'VN.SG.PARTY.BUYER.SATRA',
      issueDate: '2026-09-30',
      deliveryDate: '2026-09-30',
      lineItems: [
        {
          itemGci: finishedLot.item_id,
          lotNumber: finishedLot.lot_id,
          lotGci: finishedLot.lot_id,
          quantity: 30000,
          unit: 'BAG',
          netWeightKg: 30000,
          grossWeightKg: 30300
        }
      ],
      originalPayload: {},
      timestampUtc: now
    };

    const tx = TransactionMapper.mapDeliveryOrder(order, [finishedLot], 'DT');

    engine.storeLots([parentLot, finishedLot]);
    engine.storeTransaction(tx);

    // Verify querying individual entities
    assert.strictEqual(engine.getLot(finishedLot.lot_id)?.quantity_net, 30000);
    assert.strictEqual(engine.getTransaction(tx.transaction_id)?.transaction_type, 'CUSTODY_TRANSFER');

    // Verify reverse lineage report
    const report = engine.getLineage(finishedLot.lot_id);
    assert.ok(report);
    assert.strictEqual(report.lotGci, finishedLot.lot_id);
    assert.strictEqual(report.parentLots.length, 1);
    assert.strictEqual(report.parentLots[0].lot_id, parentLot.lot_id);
    assert.strictEqual(report.custodyTransactions.length, 1);
    assert.strictEqual(report.custodyTransactions[0].transaction_id, tx.transaction_id);
    assert.strictEqual(report.verifications[0].status, 'PASSED');
  });
});
