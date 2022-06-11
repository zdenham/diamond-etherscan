# Diamond Etherscan

[EIP-2535 Diamond Standard](https://github.com/ethereum/EIPs/issues/2535) is really cool. But one of the weaknesses is you cannot interact with Diamonds on etherscan (the most popular block explorer). [Louper](https://louper.dev) is a great tool that solves this issue, but some users may have a preference for / experience with etherscan and would prefer to interact with the contract there.

And so, we are left with diamond etherscan, a workaround to support etherscan interactions with diamonds.

## How it works

Diamond Etherscan has two components.

The first is a script to generate a "Dummy Implementation" of your diamond located at `scripts/libraries/generateDummyContractForEtherscan.js`. This creates a noop mock of your whole diamond given your facets.

The second is a Facet called `DiamondEtherscanFacet.sol` that should implement the [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967) so you can point your diamond proxy to that implementation. Because all of your diamonds function signatures are implemented in the dummy, etherscan which knows about eip-1967 will be able to appropriately display function selectors.

## How to support etherscan in your diamond

1. Generate your dummy implementation
2. Deploy your dummy implementation
3. Set the implementation to point to the dummy
4. Repeat any time you update the contract

## Example

Here is a live example [contract](https://rinkeby.etherscan.io/address/0xc173ae57b7479b95EA9EF0B1A3C70a61e84d0F30) deployed to rinkeby.

## Note

This was a quick weekend hack for a proof of concept. The example isn't fully eip-1967 compliant, and how etherscan responds to updating proxy is currently untested. If there are any other improvements / feedbacks pls let me know.

## TODO

- [] support more complex types in mock script (may need to declare these)
- [] fully comply to [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967) with events and admin switches in the example
