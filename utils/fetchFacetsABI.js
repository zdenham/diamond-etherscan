require('dotenv').config();
const { NETWORKS } = require('./networkConfig');
const fetch = require('node-fetch');

const INFURA_API_KEY = process.env['INFURA_API_KEY'];

// fetches the facet addresses for a given diamond and network
const getFacetAddresses = async (diamondAddress, network) => {
  const abi = ['function facets() external view returns (tuple(address,bytes4[])[])'];
  let rpcUrl = network ? NETWORKS[network].rpcUrl : NETWORKS['mainnet'].rpcUrl;
  rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const diamondContract = new ethers.Contract(diamondAddress, abi, provider);
  const facets = await diamondContract.facets();

  return facets.map(([address]) => address);
}

const getFacetAbi = async (facetAddress, network) => {
  const apiUrl = NETWORKS[network].explorerApiUrl;
  const fullUrl = `${apiUrl}?module=contract&action=getsourcecode&address=${facetAddress}&apikey=${process.env.EXPLORER_API_KEY}`;

  const res = await fetch(fullUrl);
  const data = await res.json();

  console.log("THE ABI???", data)
}


const fetchFacetsABI = async (diamondAddress, network) => {
  const facetAddresses = await getFacetAddresses(diamondAddress, network);

  await getFacetAbi(facetAddresses[0]);
}

module.exports = {
  fetchFacetsABI
}