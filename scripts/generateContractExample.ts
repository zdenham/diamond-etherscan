import { fetchFacets } from "../utils/fetchFacets.js";
import { generateDummyContract } from "../utils/generateDummyContract.js";
import * as fs from "fs";

const main = async () => {
  const facets = await fetchFacets(
    "0x86935f11c86623dec8a25696e1c19a8659cbf95d",
    "polygon"
  );

  const contractString = generateDummyContract(facets, {
    network: "polygon",
    diamondAddress: "0x86935f11c86623dec8a25696e1c19a8659cbf95d",
  });

  fs.writeFileSync(
    "./contracts/dummy/DummyDiamondImplementation.sol",
    contractString
  );
};

main();
