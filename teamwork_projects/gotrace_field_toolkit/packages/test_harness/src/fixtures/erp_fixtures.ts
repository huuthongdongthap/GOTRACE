/**
 * ERP Connector Test Fixtures
 * Delivery Order payloads, E-invoices, HMAC secrets, and invalid payloads.
 */

import type { ErpDeliveryOrderWebhook } from '../models/contracts.ts';

export const MOCK_HMAC_SECRET = 'gotrace_field_secret_test_2026';

export const MOCK_DELIVERY_ORDER: ErpDeliveryOrderWebhook = {
  eventId: 'EVT-ERP-DO-20260930-9921',
  erpSource: 'BRAVO_8',
  orderId: 'DO-20260930-0012',
  warehouseGci: 'VN.DT.PLACE.WAREHOUSE.WH-COMAY-01',
  carrierPartyGci: 'VN.DT.PARTY.LOGISTICS.CH-SA-DEC-01',
  customerPartyGci: 'VN.SG.PARTY.BUYER.COOPMART',
  deliveryDate: '2026-09-30',
  vehiclePlate: '66C-998.81',
  lineItems: [
    {
      itemCode: 'GAO-OM5451-50KG',
      lotNumber: 'VN.DT.LOT.FINISHED.20260930-OM5451-01',
      quantity: 900,
      uom: 'BAG',
      grossWeightKg: 45450.0,
      netWeightKg: 45000.0,
      mfgDate: '2026-09-30',
      expDate: '2027-09-30',
    },
  ],
  issuedByAccountant: 'Nguyen Thi Mai',
  timestampUtc: new Date().toISOString(),
};

export const MOCK_EXPIRED_DO: ErpDeliveryOrderWebhook = {
  ...MOCK_DELIVERY_ORDER,
  orderId: 'DO-EXPIRED-999',
  timestampUtc: new Date(Date.now() - 400_000).toISOString(), // >300s in past (replay attack)
};

export const MOCK_EMPTY_ITEMS_DO: ErpDeliveryOrderWebhook = {
  ...MOCK_DELIVERY_ORDER,
  orderId: 'DO-EMPTY-000',
  lineItems: [],
};
