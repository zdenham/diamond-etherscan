
/* global ethers task */
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config();

const {
  TESTNET_CONTRACT_OWNER_PRIVATE_KEY,
  RINKEBY_RPC_URL,
  MAINNET_SCANNER_API_KEY
} = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.6',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [TESTNET_CONTRACT_OWNER_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: MAINNET_SCANNER_API_KEY,
    },
  },
}
