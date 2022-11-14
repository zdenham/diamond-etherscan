import { fetchFacets } from "../utils/fetchFacets.js";
import { generateDummyContract } from "../utils/generateDummyContract.js";
import * as fs from "fs";

const main = async () => {
  const diamondAddress = process.argv[2];
  const network = process.argv[3];

  if (!diamondAddress || !network) {
    throw new Error("missing argument");
  }

  const facets = await fetchFacets(diamondAddress, network);

  const contractString = generateDummyContract(facets, {
    network,
    diamondAddress,
  });

  fs.writeFileSync(
    "./contracts/dummy/DummyDiamondImplementation.sol",
    contractString
  );
};

main();
