const generateDummyContractForEtherscan = require('./libraries/generateDummyContractForEtherscan.js');

const generateDummy = async () => {
  const diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', '0x63492fff405c01121Aec0Ca673d737979d2Ab2e1');
  const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', '0x97d8b5BDCa3f37bd6e3738a421F250817e6a0f83');
  const  ownershipFacet = await ethers.getContractAt('OwnershipFacet', '0xC504c3b1c11ce1D767fdF87BD007D81ead03C546');
  const etherscanFacet = await ethers.getContractAt('DiamondEtherscanFacet', '0xd7dd14Fd324ddE7fb3928AE3fFCba79679Ad3389');

  generateDummyContractForEtherscan(
    [diamondCutFacet, diamondLoupeFacet, ownershipFacet, etherscanFacet], 
    { network: 'rinkeby', diamondAddress: '0xc173ae57b7479b95EA9EF0B1A3C70a61e84d0F30' }
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  generateDummy()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}