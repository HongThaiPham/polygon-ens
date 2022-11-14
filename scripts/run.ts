import * as hre from "hardhat";

const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // We pass in "ninja" to the constructor when deploying
  const domainContract = await domainContractFactory.deploy("fui");
  await domainContract.deployed();

  // const domainContract = await domainContractFactory.attach(
  //   "0xFfBdaca38b225912e3a39453aCD129C70F8c20Bc"
  // );

  console.log("Contract deployed to:", domainContract.address);

  // We're passing in a second variable - value. This is the moneyyyyyyyyyy
  let txn = await domainContract.register("rut", {
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("rut");
  console.log("Owner of domain rut:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
