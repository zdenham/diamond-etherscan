require('dotenv').config();

const getEtherscanApiKey = (network) => {
  const key = process.env[`${network.toUpperCase()}_ETHERSCAN_API_KEY`]
  console.log(key)
  return key ? key : process.env.ETHERSCAN_API_KEY
}

export const fetchFacetsABI = async (diamondAddress, network) => {
  const apiUrl = NETWORKS[network].explorerApiUrl;
  const fullUrl = `${apiUrl}?module=contract&action=getsourcecode&address=${diamondAddress}&apikey=${process.env.API_KEY}`;

}