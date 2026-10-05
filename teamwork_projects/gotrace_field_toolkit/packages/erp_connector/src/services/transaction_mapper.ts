/**
 * GoTRACE Transaction Mapper Engine
 * 
 * Maps normalized Delivery Orders and Invoices into immutable
 * `TRANSACTION: CUSTODY_TRANSFER` graph primitives.
 */

import { 
  GoTraceTransaction, 
  GoTraceLot, 
  NormalizedDeliveryOrder, 
  NormalizedInvoice 
} from '../types/models.js';
import { GciValidator } from './gci_validator.js';

export class TransactionMapper {
  /**
   * Map a normalized Delivery Order to a CUSTODY_TRANSFER transaction.
   */
  public static mapDeliveryOrder(
    order: NormalizedDeliveryOrder,
    lots: GoTraceLot[],
    defaultProvince = 'DT'
  ): GoTraceTransaction {
    const now = new Date().toISOString();
    const cleanId = order.orderId.replace(/[^A-Za-z0-9._-]/g, '-');
    const txId = GciValidator.build(
      defaultProvince,
      'TRANSACTION',
      'CUSTODY_TRANSFER',
      cleanId
    );

    const sellerGci = GciValidator.canonicalizePartyGci(
      order.warehouseCode,
      'ENTERPRISE',
      defaultProvince
    );

    const buyerGci = GciValidator.canonicalizePartyGci(
      order.customerPartyGci,
      'BUYER',
      'SG'
    );

    const inputLots = lots.map(lot => ({
      lot_id: lot.lot_id,
      weight: lot.quantity_net,
      uom: lot.uom
    }));

    return {
      transaction_id: txId,
      transaction_type: 'CUSTODY_TRANSFER',
      seller_party_id: sellerGci,
      buyer_party_id: buyerGci,
      contract_ref: order.orderId,
      input_lots: inputLots,
      output_lots: inputLots, // Custody transfer of same physical lots
      conversion_ratio: 1.0,
      financial_value_vnd: order.financialTotalVnd,
      status: 'EXECUTED',
      executed_at: order.deliveryDate,
      created_at: now,
      updated_at: now
    };
  }

  /**
   * Map a normalized Invoice to a CUSTODY_TRANSFER transaction.
   */
  public static mapInvoice(
    invoice: NormalizedInvoice,
    lots: GoTraceLot[],
    defaultProvince = 'DT'
  ): GoTraceTransaction {
    const now = new Date().toISOString();
    const cleanId = invoice.invoiceNumber.replace(/[^A-Za-z0-9._-]/g, '-');
    const txId = GciValidator.build(
      defaultProvince,
      'TRANSACTION',
      'CUSTODY_TRANSFER',
      cleanId
    );

    const inputLots = lots.map(lot => ({
      lot_id: lot.lot_id,
      weight: lot.quantity_net,
      uom: lot.uom
    }));

    return {
      transaction_id: txId,
      transaction_type: 'CUSTODY_TRANSFER',
      seller_party_id: invoice.sellerPartyGci,
      buyer_party_id: invoice.buyerPartyGci,
      contract_ref: `${invoice.invoiceSeries}-${invoice.invoiceNumber}`,
      input_lots: inputLots,
      output_lots: inputLots,
      conversion_ratio: 1.0,
      financial_value_vnd: invoice.totalAmountVnd,
      status: 'EXECUTED',
      executed_at: invoice.issueDate,
      created_at: now,
      updated_at: now
    };
  }
}
