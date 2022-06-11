/* global describe it before ethers */

const generateDummyContractForEtherscan = require('../scripts/libraries/generateDummyContractForEtherscan.js')

const { deployDiamond } = require('../scripts/deploy.js')
const { expect } = require('chai')

describe('EtherscanTest', async function () {
  let diamondAddress
  let diamondCutFacet
  let diamondLoupeFacet
  let ownershipFacet
  let tx
  let receipt
  let result
  let test1Facet
  const addresses = []

  before(async function () {
    diamondAddress = await deployDiamond()
    diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
    ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
    const Test1Facet = await ethers.getContractFactory('Test1Facet')
    test1Facet = await Test1Facet.deploy()
    await test1Facet.deployed()
  })

  it('should generate a dummy contract (check contracts/dummy/)', () => {
    generateDummyContractForEtherscan([diamondCutFacet, diamondLoupeFacet, ownershipFacet, test1Facet], {})
  })
})
