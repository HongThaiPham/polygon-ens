import * as hre from "hardhat";

const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // const domainContract = await domainContractFactory.deploy("fui");
  // await domainContract.deployed();

  const domainContract = await domainContractFactory.attach(
    "0x5d7526F02C903CF4dFE4cC52C4de129714837b93"
  );

  // console.log("Contract deployed to:", domainContract.address);
  let txn;
  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  // let txn = await domainContract.register("rut", {
  //   value: hre.ethers.utils.parseEther("0.005"),
  // });
  // await txn.wait();
  // console.log("Minted domain rut.fui");

  txn = await domainContract.setRecord("rut", "Am I a rut or a fui??");
  await txn.wait();
  console.log("Set record for rut.fui");

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
