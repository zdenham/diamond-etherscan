import "dotenv/config";

import fetch from "node-fetch";
import { ethers } from "ethers";
import { NETWORKS } from "./config.js";

const INFURA_API_KEY = process.env["INFURA_API_KEY"] || "";

// fetches the facet addresses for a given diamond and network
const getFacetAddresses = async (diamondAddress: string, network: string) => {
  const abi = [
    "function facets() external view returns (tuple(address,bytes4[])[])",
  ];

  let rpcUrl = network ? NETWORKS[network].rpcUrl : NETWORKS["mainnet"].rpcUrl;
  rpcUrl = rpcUrl.replace("%INFURA_API_KEY%", INFURA_API_KEY);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const diamondContract = new ethers.Contract(diamondAddress, abi, provider);
  const facets = await diamondContract.facets();

  return facets.map(([address]) => address);
};

type ExplorerResponse = {
  result: { ABI: any }[];
};

const getFacetAbi = async (facetAddress: string, network: string) => {
  const apiUrl = NETWORKS[network].explorerApiUrl;
  const fullUrl = `${apiUrl}?module=contract&action=getsourcecode&address=${facetAddress}&apikey=${process.env.EXPLORER_API_KEY}`;

  const res = await fetch(fullUrl);
  const data = (await res.json()) as ExplorerResponse;

  const abi = data.result[0].ABI;

  return abi;
};

export const fetchFacetsABI = async (
  diamondAddress: string,
  network: string
) => {
  const facetAddresses = await getFacetAddresses(diamondAddress, network);
  const promises = [];
  for (let facetAddress of facetAddresses) {
    promises.push(getFacetAbi(facetAddress, network));
  }
  const allAbis = await Promise.all(promises);

  console.log("ALL ABIS!", allAbis);
  return allAbis;
};
