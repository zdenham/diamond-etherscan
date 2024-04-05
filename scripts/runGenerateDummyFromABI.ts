import { generateDummyContract } from "../utils/generateDummyContract.js";
import { ethers } from "ethers";
import * as fs from "fs";

const main = async () => {
  const abiPath = process.argv[2];

  const { abi } = JSON.parse(fs.readFileSync(abiPath, "utf8"));

  if (!abi) {
    throw new Error("missing abi path");
  }

  const contract = new ethers.Contract(ethers.constants.AddressZero, abi);

  const contractString = generateDummyContract([contract], {});

  fs.writeFileSync(
    "./contracts/dummy/DummyDiamondImplementation.sol",
    contractString,
  );
};

main();
