/**
 * GoTRACE Swagger UI & HTML Documentation Renderer
 * 
 * Serves an interactive Swagger UI documentation viewer at `/api-docs`.
 */

export function renderSwaggerHtml(swaggerJsonUrl = '/swagger.json'): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GoTRACE ERP/WMS Connector API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .topbar { background-color: #0f172a; padding: 12px 24px; color: white; display: flex; align-items: center; justify-content: space-between; }
    .topbar h1 { margin: 0; font-size: 1.15rem; font-weight: 600; }
    .badge { background-color: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
  </style>
</head>
<body>
  <div class="topbar">
    <h1>🌾 GoTRACE Mekong Field Integration Toolkit — ERP/WMS Connector API</h1>
    <span class="badge">OpenAPI 3.0.3</span>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: "${swaggerJsonUrl}",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "BaseLayout"
      });
    };
  </script>
</body>
</html>`;
}
