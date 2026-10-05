/**
 * GoTRACE Two-Way ERP/WMS Connector API
 * 
 * Main package entrypoint exporting all services, models, and server handlers.
 */

// Types & Models
export * from './types/models.js';

// Cryptography & HMAC
export * from './crypto/hmac.js';

// Dynamic QR Generator & ZPL Thermal Labels
export * from './qr/qr_matrix.js';
export * from './qr/qr_svg.js';
export * from './qr/qr_png.js';
export * from './qr/qr_generator.js';
export * from './qr/zpl_builder.js';

// Core Business Services
export * from './services/gci_validator.js';
export * from './services/lot_extractor.js';
export * from './services/transaction_mapper.js';
export * from './services/lineage_engine.js';

// Webhooks
export * from './webhooks/webhook_receiver.js';

// API & OpenAPI Server
export * from './api/openapi_spec.js';
export * from './api/swagger_ui.js';
export * from './api/server.js';

import { startServer } from './api/server.js';

// Start server if directly executed or START_SERVER is set
if (process.env.START_SERVER === 'true' || (process.argv[1] && process.argv[1].endsWith('index.js'))) {
  const port = parseInt(process.env.PORT || '3000', 10);
  const sharedSecret = process.env.SHARED_SECRET || 'gotrace_default_field_secret_2026';
  startServer({ port, sharedSecret }).then(({ port: boundPort }) => {
    console.log(`🌾 GoTRACE ERP/WMS Connector API listening on http://localhost:${boundPort}`);
    console.log(`📖 Swagger UI Documentation: http://localhost:${boundPort}/api-docs`);
    console.log(`📋 OpenAPI 3.0 Specification: http://localhost:${boundPort}/swagger.json`);
  }).catch((err) => {
    console.error('Failed to start server:', err);
  });
}
