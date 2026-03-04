const express = require("express");
const dotenv = require("dotenv");
const { buildContext } = require("./src/context");
const { registerRoutes } = require("./src/routes");

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const context = buildContext();
registerRoutes(app, context);

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "Rota nao encontrada",
    path: req.path
  });
});

app.use((err, req, res, next) => {
  console.error("[relayer-example] erro inesperado:", err);
  res.status(500).json({
    ok: false,
    error: "Erro interno no servidor"
  });
});

app.listen(context.port, () => {
  console.log(`[relayer-example] escutando na porta ${context.port}`);
});
