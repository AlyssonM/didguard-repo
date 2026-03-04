function registerSystemRoutes(app, context) {
  app.get("/api/health", (req, res) => {
    res.json({
      ok: true,
      service: context.serviceName,
      uptimeSeconds: Math.floor((Date.now() - context.startedAt.getTime()) / 1000)
    });
  });

  app.get("/api/time", (req, res) => {
    const now = new Date();
    res.json({
      ok: true,
      iso: now.toISOString(),
      epochMs: now.getTime()
    });
  });

  app.get("/api/status", (req, res) => {
    res.json({
      ok: true,
      service: context.serviceName,
      version: context.version,
      env: context.nodeEnv,
      node: process.version,
      startedAt: context.startedAt.toISOString()
    });
  });
}

module.exports = { registerSystemRoutes };
