function registerHelloRoutes(app, context) {
  app.get("/api/hello", (req, res) => {
    res.json({
      ok: true,
      message: "Hello world from relayer example",
      service: context.serviceName
    });
  });

  app.get("/api/hello/:name", (req, res) => {
    const { name } = req.params;
    res.json({
      ok: true,
      message: `Ola, ${name}!`,
      service: context.serviceName
    });
  });

  app.post("/api/echo", (req, res) => {
    res.json({
      ok: true,
      received: req.body ?? null
    });
  });
}

module.exports = { registerHelloRoutes };
