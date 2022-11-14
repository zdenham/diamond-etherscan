<p align="center">
  <img width="300px" alt="etherscan diamond" src="https://user-images.githubusercontent.com/16373521/201745986-08ad050e-df47-4839-8ac1-2916c7f37bb6.png">
</p>
<p align="center">
  <b style="font-size: 30px">
    Diamond Etherscan
  </b>
  <br/>
  <i>
    Make your <a href="https://eips.ethereum.org/EIPS/eip-2535" target="_blank">EIP-2535</a> diamond <a href="https://eips.ethereum.org/EIPS/eip-2535" target="_blank">etherscan</a> compatible.
  </i>
</p>

## Motivation

[EIP-2535 Diamond Standard](https://github.com/ethereum/EIPs/issues/2535) is really cool. But etherscan (the most popular block explorer) doesn't support diamonds yet. [Louper](https://louper.dev) is a great tool that solves this issue, but many users have more experience with etherscan and might prefer to interact with the contract there.

And so, we are left with diamond etherscan, a workaround to support etherscan interactions with diamonds.

## How it works

Diamond Etherscan has two components.

The first is a script to generate a "Dummy Implementation" of your diamond located at [`scripts/runGenerateDummy.ts`](https://github.com/zdenham/diamond-etherscan/blob/main/scripts/runGenerateDummy.ts). This uses the etherscan API to grab all of your facets' ABI and then generates a noop mock of your whole diamond. **Note** this will only work for verified facets.

The second is a Facet called [`DiamondEtherscanFacet.sol`](https://github.com/zdenham/diamond-etherscan/blob/main/contracts/facets/DiamondEtherscanFacet.sol) that implements [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967) so you can point your diamond proxy to that implementation. Because all of your diamonds function signatures are implemented in the dummy, etherscan which knows about EIP-1967 will be able to appropriately display functions for interaction.

## How to support etherscan in your diamond

1. Generate your dummy implementation (via the [website](https://etherscan.diamonds.dev/) / cli or manually)
2. Deploy your dummy implementation
3. Add the EtherscanFacet to your diamond
4. Set the proxy implementation to point to the deployed dummy
5. Repeat any time you update the diamond


## Generating your dummy implementation

### **(New!)** Via the [Website](https://etherscan.diamonds.dev) UI: 

<img width="973" alt="Screen Shot 2022-11-13 at 10 52 54 PM" src="https://user-images.githubusercontent.com/16373521/201594198-de153e9f-3b31-425b-bb89-13c5ed9bdef9.png">

1. Input your diamond address and network on the diamond etherscan [website](https://etherscan.diamonds.dev/)
2. Generate your dummy diamond implementation

### Via the CLI

First you will need to rename .env.example to .env and add the appropriate block explorer / infura api keys. We use `[UPPERCASE_NETWORK_NAME]_EXPLORER_API_KEY`.

```
git clone https://github.com/zdenham/diamond-etherscan.git
yarn install
yarn run generate-dummy [0xyourdiamondaddress] [yourNetwork]
```

The dummy contract will be written to `contracts/dummy/DummyDiamondImplementation.sol`

## Example

Here is a live example [contract](https://rinkeby.etherscan.io/address/0xc173ae57b7479b95EA9EF0B1A3C70a61e84d0F30) deployed to rinkeby.

