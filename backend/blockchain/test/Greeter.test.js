const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, DIDGuard!");
    await greeter.waitForDeployment();
    return { greeter, owner, other };
  }

  it("deve iniciar com greeting padrao", async function () {
    const { greeter } = await deployFixture();
    expect(await greeter.greet()).to.equal("Hello, DIDGuard!");
  });

  it("deve atualizar a greeting e emitir evento", async function () {
    const { greeter, other } = await deployFixture();
    await expect(greeter.connect(other).setGreeting("Oi turma!"))
      .to.emit(greeter, "GreetingUpdated")
      .withArgs("Hello, DIDGuard!", "Oi turma!", other.address);
    expect(await greeter.greet()).to.equal("Oi turma!");
  });
});
