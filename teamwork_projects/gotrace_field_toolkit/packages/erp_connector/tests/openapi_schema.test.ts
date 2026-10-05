/**
 * Test Suite: OpenAPI 3.0 Specification Validation
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { OPENAPI_SPEC } from '../src/api/openapi_spec.js';

describe('OpenAPI 3.0 Schema Validity', () => {
  test('spec version is OpenAPI 3.0.x', () => {
    assert.match(OPENAPI_SPEC.openapi, /^3\.0\.\d+$/);
  });

  test('info section has required metadata', () => {
    assert.ok(OPENAPI_SPEC.info.title.length > 0);
    assert.ok(OPENAPI_SPEC.info.version.length > 0);
    assert.ok(OPENAPI_SPEC.info.description.length > 0);
    assert.ok(OPENAPI_SPEC.info.contact.email.includes('@'));
  });

  test('servers are defined with valid URLs', () => {
    assert.ok(Array.isArray(OPENAPI_SPEC.servers) && OPENAPI_SPEC.servers.length >= 1);
    for (const server of OPENAPI_SPEC.servers) {
      assert.ok(server.url.startsWith('http://') || server.url.startsWith('https://'));
    }
  });

  test('all required REST & Webhook endpoints are declared', () => {
    const paths = Object.keys(OPENAPI_SPEC.paths);
    const requiredEndpoints = [
      '/api/v1/erp/webhook/delivery-order',
      '/api/v1/erp/webhook/e-invoice',
      '/api/v1/erp/qr/generate',
      '/api/v1/erp/lots/{lotId}',
      '/api/v1/erp/transactions/{txId}',
      '/api/v1/erp/lineage/{lotId}',
      '/api/v1/health'
    ];

    for (const ep of requiredEndpoints) {
      assert.ok(paths.includes(ep), `Missing required endpoint: ${ep}`);
    }
  });

  test('security scheme HmacSignature is configured in components', () => {
    const secSchemes = OPENAPI_SPEC.components.securitySchemes;
    assert.ok(secSchemes.HmacSignature, 'HmacSignature security scheme missing');
    assert.strictEqual(secSchemes.HmacSignature.type, 'apiKey');
    assert.strictEqual(secSchemes.HmacSignature.in, 'header');
    assert.strictEqual(secSchemes.HmacSignature.name, 'X-GoTRACE-Signature');
  });

  test('all $ref pointers in paths resolve to valid component schemas', () => {
    const schemas = OPENAPI_SPEC.components.schemas;
    const pathsObj = OPENAPI_SPEC.paths as Record<string, Record<string, unknown>>;

    // Recursive helper to find all $ref strings
    const findRefs = (obj: unknown, refs: string[] = []): string[] => {
      if (!obj || typeof obj !== 'object') return refs;
      if ('$ref' in obj && typeof (obj as { $ref: string }).$ref === 'string') {
        refs.push((obj as { $ref: string }).$ref);
      }
      for (const val of Object.values(obj)) {
        findRefs(val, refs);
      }
      return refs;
    };

    const allRefs = findRefs(pathsObj);
    assert.ok(allRefs.length > 0, 'Should have $ref pointers in path operations');

    for (const ref of allRefs) {
      assert.ok(ref.startsWith('#/components/schemas/'), `Unexpected ref path: ${ref}`);
      const schemaName = ref.replace('#/components/schemas/', '') as keyof typeof schemas;
      assert.ok(schemaName in schemas, `Unresolved $ref target: ${ref}`);
    }
  });
});
