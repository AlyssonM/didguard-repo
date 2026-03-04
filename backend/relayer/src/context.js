function buildContext() {
  const startedAt = new Date();
  return {
    serviceName: "didguard-relayer-example",
    version: "1.0.0",
    startedAt,
    port: Number(process.env.PORT || 3000),
    nodeEnv: process.env.NODE_ENV || "development"
  };
}

module.exports = { buildContext };
