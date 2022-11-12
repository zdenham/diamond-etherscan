import { fetchFacetsABI } from "./utils/fetchFacets.js";

const main = async () => {
  fetchFacetsABI("0x86935f11c86623dec8a25696e1c19a8659cbf95d", "polygon");
};

main();
