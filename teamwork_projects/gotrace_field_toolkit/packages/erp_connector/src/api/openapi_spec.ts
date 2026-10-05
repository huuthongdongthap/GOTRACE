/**
 * GoTRACE ERP Connector - OpenAPI 3.0.3 Specification Definition
 */

export const OPENAPI_SPEC = {
  openapi: '3.0.3',
  info: {
    title: 'GoTRACE Two-Way ERP/WMS Connector API',
    version: '1.0.0',
    description: 'Hai chiều kết nối dữ liệu chuỗi cung ứng nông sản - thực phẩm Tây Nam Bộ với hệ thống ERP/WMS (Bravo 8, MISA AMIS, SAP S/4HANA).',
    contact: {
      name: 'GoTRACE Mekong Engineering Team',
      url: 'https://gotrace.vn',
      email: 'tech@gotrace.vn'
    },
    license: {
      name: 'Apache-2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Field Gateway Server'
    },
    {
      url: 'https://api.gotrace.vn',
      description: 'Production Cloud Integration Gateway'
    }
  ],
  paths: {
    '/api/v1/erp/webhook/delivery-order': {
      post: {
        summary: 'Lắng nghe Webhook Lệnh xuất kho (Delivery Order) từ ERP',
        description: 'Tiếp nhận webhook DO từ Bravo 8, SAP S/4HANA hoặc hệ thống ERP đối tác. Kiểm chứng HMAC-SHA256, trích xuất LOT, tạo TRANSACTION: CUSTODY_TRANSFER, sinh mã QR động và mã lệnh in tem Zebra ZPL.',
        operationId: 'ingestDeliveryOrder',
        security: [{ HmacSignature: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/BravoDeliveryOrderPayload' },
                  { $ref: '#/components/schemas/SapDeliveryOrderPayload' }
                ]
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Đã xử lý thành công, trả về phả hệ Lô hàng, mã QR động và mã ZPL in tem',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TraceabilityLabelResponse' }
              }
            }
          },
          '401': {
            description: 'Chữ ký HMAC-SHA256 không hợp lệ hoặc thiếu header',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '422': {
            description: 'Dữ liệu Lệnh xuất kho không hợp lệ hoặc thiếu trường bắt buộc',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/v1/erp/webhook/e-invoice': {
      post: {
        summary: 'Lắng nghe Webhook Hóa đơn điện tử GTGT từ MISA AMIS / Kế toán',
        description: 'Tiếp nhận webhook Hóa đơn điện tử. Kiểm chứng HMAC-SHA256, ánh xạ danh sách LOTs và khởi tạo giao dịch chuyển nhượng sở hữu.',
        operationId: 'ingestEInvoice',
        security: [{ HmacSignature: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MisaInvoicePayload' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Đã liên kết Hóa đơn điện tử vào phả hệ Lô hàng thành công',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TraceabilityLabelResponse' }
              }
            }
          },
          '401': {
            description: 'Chữ ký HMAC-SHA256 không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          '422': {
            description: 'Dữ liệu Hóa đơn không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/v1/erp/qr/generate': {
      post: {
        summary: 'Cấp phát động mã QR và lệnh in Zebra ZPL độc lập',
        description: 'Sinh trực tiếp mã QR Base64 PNG/SVG và mã lệnh máy in Zebra ZPL cho bất kỳ mã định danh GCI nào (< 30ms).',
        operationId: 'generateQrDirect',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/QrGenerateRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Mã QR và lệnh in ZPL',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/QrGenerateResponse' }
              }
            }
          },
          '400': {
            description: 'Tham số không hợp lệ',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/v1/erp/lots/{lotId}': {
      get: {
        summary: 'Truy vấn thực thể LOT theo GCI',
        operationId: 'getLotByGci',
        parameters: [
          {
            name: 'lotId',
            in: 'path',
            required: true,
            description: 'GCI của Lô hàng (VN.<PROV>.LOT.<SUBTYPE>.<ID>)',
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Thực thể LOT',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/GoTraceLot' }
              }
            }
          },
          '404': {
            description: 'Không tìm thấy Lô hàng'
          }
        }
      }
    },
    '/api/v1/erp/transactions/{txId}': {
      get: {
        summary: 'Truy vấn thực thể TRANSACTION theo GCI',
        operationId: 'getTransactionByGci',
        parameters: [
          {
            name: 'txId',
            in: 'path',
            required: true,
            description: 'GCI của Giao dịch (VN.<PROV>.TRANSACTION.CUSTODY_TRANSFER.<ID>)',
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Thực thể TRANSACTION',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/GoTraceTransaction' }
              }
            }
          },
          '404': {
            description: 'Không tìm thấy Giao dịch'
          }
        }
      }
    },
    '/api/v1/erp/lineage/{lotId}': {
      get: {
        summary: 'Truy xuất phả hệ toàn chuỗi cho Lô hàng (Lineage Graph)',
        operationId: 'getLineage',
        parameters: [
          {
            name: 'lotId',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Báo cáo phả hệ chuỗi cung ứng',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LineageReport' }
              }
            }
          },
          '404': {
            description: 'Lô hàng không tồn tại'
          }
        }
      }
    },
    '/api/v1/health': {
      get: {
        summary: 'Kiểm tra trạng thái dịch vụ (Health Check)',
        operationId: 'healthCheck',
        responses: {
          '200': {
            description: 'Dịch vụ đang hoạt động bình thường',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'UP' },
                    service: { type: 'string', example: 'gotrace-erp-connector' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      HmacSignature: {
        type: 'apiKey',
        in: 'header',
        name: 'X-GoTRACE-Signature',
        description: 'Mã băm HMAC-SHA256 tính từ Raw Request Body bằng khóa Pre-shared Secret Key (định dạng `sha256=<hex>` hoặc `<hex>`).'
      }
    },
    schemas: {
      BravoDeliveryOrderPayload: {
        type: 'object',
        required: ['erp_source', 'order_id', 'delivery_date', 'items', 'timestamp_utc'],
        properties: {
          event_id: { type: 'string', example: 'EVT-ERP-DO-20260930-9921' },
          erp_source: { type: 'string', enum: ['BRAVO_8'], example: 'BRAVO_8' },
          order_id: { type: 'string', example: 'DO-20260930-0012' },
          warehouse_gci: { type: 'string', example: 'VN.DT.PLACE.WAREHOUSE.WH-COMAY-01' },
          carrier_party_gci: { type: 'string', example: 'VN.DT.PARTY.LOGISTICS.CH-SA-DEC-01' },
          customer_party_gci: { type: 'string', example: 'VN.SG.PARTY.BUYER.COOPMART' },
          delivery_date: { type: 'string', format: 'date', example: '2026-09-30' },
          vehicle_plate: { type: 'string', example: '66C-998.81' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              required: ['item_code', 'lot_number', 'quantity', 'uom'],
              properties: {
                item_code: { type: 'string', example: 'GAO-ST25-5KG' },
                lot_number: { type: 'string', example: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01' },
                quantity: { type: 'number', minimum: 0, example: 1000 },
                uom: { type: 'string', example: 'BAG' },
                gross_weight_kg: { type: 'number', example: 5050.0 },
                net_weight_kg: { type: 'number', example: 5000.0 },
                mfg_date: { type: 'string', format: 'date', example: '2026-09-28' },
                exp_date: { type: 'string', format: 'date', example: '2027-09-28' }
              }
            }
          },
          issued_by_accountant: { type: 'string', example: 'Nguyễn Thị Mai' },
          timestamp_utc: { type: 'string', format: 'date-time', example: '2026-09-30T04:20:00Z' }
        }
      },
      SapDeliveryOrderPayload: {
        type: 'object',
        required: ['orderNumber', 'partnerTaxId', 'warehouseCode', 'issueDate', 'lineItems'],
        properties: {
          orderNumber: { type: 'string', example: 'SAP-DO-889123' },
          erpSource: { type: 'string', enum: ['SAP_S4HANA'], example: 'SAP_S4HANA' },
          partnerTaxId: { type: 'string', example: '0300987654' },
          warehouseCode: { type: 'string', example: 'WH_SADEC_01' },
          issueDate: { type: 'string', format: 'date', example: '2026-09-30' },
          lineItems: {
            type: 'array',
            items: {
              type: 'object',
              required: ['itemGci', 'lotGci', 'quantity', 'unit', 'expiryDate'],
              properties: {
                itemGci: { type: 'string', example: 'VN.DT.ITEM.GRAIN.OM5451' },
                lotGci: { type: 'string', example: 'VN.DT.LOT.FINISHED.20260930-OM5451-01' },
                quantity: { type: 'number', example: 25000 },
                unit: { type: 'string', example: 'KG' },
                expiryDate: { type: 'string', format: 'date', example: '2027-09-30' }
              }
            }
          }
        }
      },
      MisaInvoicePayload: {
        type: 'object',
        required: ['invoice_number', 'invoice_series', 'erp_source', 'issue_date', 'seller_tax_code', 'buyer_tax_code', 'total_amount_before_vat', 'total_amount_vnd', 'lots'],
        properties: {
          invoice_number: { type: 'string', example: 'HD-0012894' },
          invoice_series: { type: 'string', example: '1C26TNB' },
          erp_source: { type: 'string', enum: ['MISA_AMIS'], example: 'MISA_AMIS' },
          issue_date: { type: 'string', format: 'date-time', example: '2026-09-30T04:25:00Z' },
          seller_tax_code: { type: 'string', example: '1400123456' },
          seller_name: { type: 'string', example: 'Công ty Cổ phần Cỏ May' },
          buyer_tax_code: { type: 'string', example: '0300987654' },
          buyer_name: { type: 'string', example: 'Liên hiệp HTX Thương mại TP.HCM (Saigon Co.op)' },
          total_amount_before_vat: { type: 'number', example: 125000000.0 },
          vat_rate_pct: { type: 'number', example: 5.0 },
          total_amount_vnd: { type: 'number', example: 131250000.0 },
          lots: {
            type: 'array',
            items: {
              type: 'object',
              required: ['quantity', 'uom'],
              properties: {
                lot_gci: { type: 'string', example: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01' },
                quantity: { type: 'number', example: 5000.0 },
                uom: { type: 'string', example: 'KG' },
                unit_price_vnd: { type: 'number', example: 25000.0 }
              }
            }
          }
        }
      },
      TraceabilityLabelResponse: {
        type: 'object',
        required: ['traceabilityId', 'qrPayload', 'qrImageBase64', 'qrSvg', 'zplCode', 'generationLatencyMs', 'extractedLots', 'transaction'],
        properties: {
          traceabilityId: { type: 'string', example: 'VN.DT.TRANSACTION.CUSTODY_TRANSFER.DO-20260930-0012' },
          qrPayload: { type: 'string', example: 'https://trace.gotrace.vn/resolve?tx=VN.DT.TRANSACTION.CUSTODY_TRANSFER.DO-20260930-0012' },
          qrImageBase64: { type: 'string', description: 'Base64 encoded PNG Data URL' },
          qrSvg: { type: 'string', description: 'Raw SVG markup string' },
          zplCode: { type: 'string', description: 'Zebra ZPL II printer commands' },
          generationLatencyMs: { type: 'number', description: 'Generation latency in ms (< 30ms SLA)', example: 1.84 },
          extractedLots: {
            type: 'array',
            items: { $ref: '#/components/schemas/GoTraceLot' }
          },
          transaction: { $ref: '#/components/schemas/GoTraceTransaction' },
          isIdempotent: { type: 'boolean', example: false }
        }
      },
      QrGenerateRequest: {
        type: 'object',
        required: ['targetGci'],
        properties: {
          targetGci: { type: 'string', example: 'VN.DT.LOT.FINISHED.20260928-ST25-5K-01' },
          commodityName: { type: 'string', example: 'GAO ST25 CO MAY' },
          productionDate: { type: 'string', format: 'date', example: '2026-09-28' },
          expiryDate: { type: 'string', format: 'date', example: '2027-09-28' },
          weightNetKg: { type: 'number', example: 5.0 },
          landingBaseUrl: { type: 'string', example: 'https://trace.gotrace.vn/resolve' },
          level: { type: 'string', enum: ['L', 'M', 'Q', 'H'], default: 'M' }
        }
      },
      QrGenerateResponse: {
        type: 'object',
        required: ['targetGci', 'url', 'generationLatencyMs'],
        properties: {
          targetGci: { type: 'string' },
          url: { type: 'string' },
          pngBase64: { type: 'string' },
          svg: { type: 'string' },
          zplCarton: { type: 'string' },
          zplPallet: { type: 'string' },
          generationLatencyMs: { type: 'number' }
        }
      },
      GoTraceLot: {
        type: 'object',
        required: ['lot_id', 'item_id', 'quantity_net', 'quantity_gross', 'uom', 'production_date', 'status'],
        properties: {
          lot_id: { type: 'string' },
          item_id: { type: 'string' },
          parent_lot_ids: { type: 'array', items: { type: 'string' } },
          quantity_net: { type: 'number' },
          quantity_gross: { type: 'number' },
          uom: { type: 'string' },
          production_date: { type: 'string', format: 'date' },
          expiry_date: { type: 'string', format: 'date' },
          status: { type: 'string', enum: ['CREATED', 'IN_PROCESS', 'INSPECTED', 'BLENDED', 'CONSUMED', 'RECALLED', 'DISPOSED'] }
        }
      },
      GoTraceTransaction: {
        type: 'object',
        required: ['transaction_id', 'transaction_type', 'seller_party_id', 'buyer_party_id', 'input_lots', 'output_lots', 'status'],
        properties: {
          transaction_id: { type: 'string' },
          transaction_type: { type: 'string', enum: ['PURCHASE_CONTRACT', 'CUSTODY_TRANSFER', 'BILL_OF_LADING', 'PROCESSING_TRANSFORMATION', 'COOKING_CONVERSION'] },
          seller_party_id: { type: 'string' },
          buyer_party_id: { type: 'string' },
          contract_ref: { type: 'string' },
          status: { type: 'string', enum: ['PENDING', 'EXECUTED', 'SETTLED', 'CANCELLED', 'DISPUTED'] }
        }
      },
      LineageReport: {
        type: 'object',
        required: ['lotGci', 'lot', 'parentLots', 'custodyTransactions'],
        properties: {
          lotGci: { type: 'string' },
          lot: { $ref: '#/components/schemas/GoTraceLot' },
          parentLots: { type: 'array', items: { $ref: '#/components/schemas/GoTraceLot' } },
          custodyTransactions: { type: 'array', items: { $ref: '#/components/schemas/GoTraceTransaction' } }
        }
      },
      ErrorResponse: {
        type: 'object',
        required: ['error', 'message'],
        properties: {
          error: { type: 'string' },
          message: { type: 'string' }
        }
      }
    }
  }
};

export const OpenApiSpec = OPENAPI_SPEC;

