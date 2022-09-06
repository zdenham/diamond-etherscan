/* global describe it before ethers */

const generateDummyContractForEtherscan = require('../scripts/libraries/generateDummyContractForEtherscan.js')

const { FacetCutAction, getSelectors } = require('../scripts/libraries/diamond.js')
const { deployDiamond } = require('../scripts/deploy.js')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('EtherscanTest', async function () {
  let diamondAddress
  let diamondCutFacet
  let diamondLoupeFacet
  let ownershipFacet
  let etherscanFacet
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
    console.log('')
    console.log('Diamond Cut:', cut)
    const diamondCut = await ethers.getContractAt('IDiamondCut', diamondAddress)
    let tx

    tx = await diamondCut.diamondCut(cut, ethers.constants.AddressZero, '0x')
    receipt = await tx.wait()

    etherscanFacet = await ethers.getContractAt('DiamondEtherscanFacet', diamondAddress);
  })

  it('should generate a dummy contract (check contracts/dummy/)', () => {
    generateDummyContractForEtherscan([diamondCutFacet, diamondLoupeFacet, ownershipFacet, test1Facet], {})
  })

  it('should return the implementation slot appropriately', async () => {
    await etherscanFacet.setDummyImplementation('0x63492fff405c01121Aec0Ca673d737979d2Ab2e1');
    const dummy = await etherscanFacet.implementation();
    expect(dummy).to.equal('0x63492fff405c01121Aec0Ca673d737979d2Ab2e1');
  })

  it('should emit an upgraded event with the new implementation', async () => {
    const txn = await etherscanFacet.setDummyImplementation('0x63492fff405c01121Aec0Ca673d737979d2Ab2e1');
    expect(txn).to.emit('Upgraded').withArgs(['0x63492fff405c01121Aec0Ca673d737979d2Ab2e1'])
  })
})
