import { fetchFacets } from "./utils/fetchFacets.js";
import { generateContractCode } from "./utils/generateContractCode.js";

const main = async () => {
  const facets = await fetchFacets(
    "0x86935f11c86623dec8a25696e1c19a8659cbf95d",
    "polygon"
  );

  const contractString = generateContractCode(facets, {
    network: "polygon",
    diamondAddress: "0x86935f11c86623dec8a25696e1c19a8659cbf95d",
  });

  console.log("CONTRACT STRING: ", contractString);

  // fs.writeFileSync(
  //   "./contracts/dummy/DummyDiamondImplementation-dot-sol",
  //   contractString
  // );
};

main();
