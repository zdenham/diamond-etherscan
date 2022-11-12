const { fetchFacetsABI } = require('../utils/fetchFacetsABI')

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  fetchFacetsABI('0x86935f11c86623dec8a25696e1c19a8659cbf95d')
}