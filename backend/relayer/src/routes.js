const { registerSystemRoutes } = require("./routes/system");
const { registerHelloRoutes } = require("./routes/hello");

function registerRoutes(app, context) {
  app.get("/", (req, res) => {
    res.json({
      ok: true,
      service: context.serviceName,
      message: "Relayer hello world online",
      docs: "/api"
    });
  });

  app.get("/api", (req, res) => {
    res.json({
      ok: true,
      endpoints: [
        "GET /api/health",
        "GET /api/time",
        "GET /api/status",
        "GET /api/hello",
        "GET /api/hello/:name",
        "POST /api/echo"
      ]
    });
  });

  registerSystemRoutes(app, context);
  registerHelloRoutes(app, context);
}

module.exports = { registerRoutes };
