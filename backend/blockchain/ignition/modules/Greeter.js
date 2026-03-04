const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreeterModule", (m) => {
  const initialGreeting = m.getParameter("initialGreeting", "Hello, DIDGuard!");
  const greeter = m.contract("Greeter", [initialGreeting]);
  return { greeter };
});
