import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { OpenApiSpec } from '@gotrace/erp_connector';

describe('Tier 1: Feature 15 - OpenAPI 3.0 RESTful API Service', () => {
  it('F15-TC1: OpenAPI version is 3.0.x and title matches GoTRACE ERP/WMS Connector', () => {
    assert.strictEqual(OpenApiSpec.openapi, '3.0.3');
    assert.ok(OpenApiSpec.info.title.includes('GoTRACE') && OpenApiSpec.info.title.includes('ERP/WMS'));
  });

  it('F15-TC2: Exposes endpoint /api/v1/erp/webhook/delivery-order with POST method', () => {
    const doPath = (OpenApiSpec.paths as any)['/api/v1/erp/webhook/delivery-order'];
    assert.ok(doPath);
    assert.ok(doPath.post);
    assert.strictEqual(doPath.post.responses['200'] !== undefined, true);
  });

  it('F15-TC3: Exposes endpoint /api/v1/erp/webhook/e-invoice with POST method', () => {
    const invoicePath = (OpenApiSpec.paths as any)['/api/v1/erp/webhook/e-invoice'];
    assert.ok(invoicePath);
    assert.ok(invoicePath.post);
  });

  it('F15-TC4: Exposes endpoint /api/v1/erp/qr/generate for dynamic QR & ZPL generation', () => {
    const qrPath = (OpenApiSpec.paths as any)['/api/v1/erp/qr/generate'];
    assert.ok(qrPath);
    assert.ok(qrPath.post);
  });

  it('F15-TC5: Declares X-GoTRACE-Signature apiKey header security scheme for HMAC validation', () => {
    const scheme = (OpenApiSpec.components as any).securitySchemes.HmacSignature;
    assert.strictEqual(scheme.type, 'apiKey');
    assert.strictEqual(scheme.in, 'header');
    assert.strictEqual(scheme.name, 'X-GoTRACE-Signature');
  });
});
