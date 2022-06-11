/* global describe it before ethers */
require('dotenv').config();
const { FacetCutAction, getSelectors } = require('../scripts/libraries/diamond.js')

const { DIAMOND_ADDRESS } = process.env;

const addEtherscanFacet = async () => {
  const DiamondEtherscanFacet = await ethers.getContractFactory('DiamondEtherscanFacet')
  const etherscanImplementation = await DiamondEtherscanFacet.deploy()
  await etherscanImplementation.deployed()
  console.log(`Etherscan implementation deployed: ${etherscanImplementation.address}`)

  const cut = [{
    facetAddress: etherscanImplementation.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(etherscanImplementation)
  }]

  // upgrade diamond with facets
  console.log('Diamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', DIAMOND_ADDRESS)
  let tx

  tx = await diamondCut.diamondCut(cut, ethers.constants.AddressZero, '0x')
  receipt = await tx.wait()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  addEtherscanFacet()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
