/* global describe it before ethers */
require('dotenv').config();

const { DIAMOND_ADDRESS } = process.env;

const deployDummy = async () => {
  const Dummy = await ethers.getContractFactory('DummyDiamondImplementation')
  const dummy = await Dummy.deploy()
  await dummy.deployed()
  console.log(`Dummy deployed: ${dummy.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDummy()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
