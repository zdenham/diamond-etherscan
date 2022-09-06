# Diamond Etherscan

[EIP-2535 Diamond Standard](https://github.com/ethereum/EIPs/issues/2535) is really cool. But etherscan (the most popular block explorer) doesn't support diamonds yet. [Louper](https://louper.dev) is a great tool that solves this issue, but many users have more experience with etherscan and might prefer to interact with the contract there.

And so, we are left with diamond etherscan, a workaround to support etherscan interactions with diamonds.

## How it works

Diamond Etherscan has two components.

The first is a script to generate a "Dummy Implementation" of your diamond located at `scripts/libraries/generateDummyContractForEtherscan.js`. This creates a noop mock of your whole diamond given your facets. Its not perfect right now, so you will probably need to make some edits to the generated mock.

The second is a Facet called `DiamondEtherscanFacet.sol` that should implement the [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967) so you can point your diamond proxy to that implementation. Because all of your diamonds function signatures are implemented in the dummy, etherscan which knows about eip-1967 will be able to appropriately display functions for interaction.

## How to support etherscan in your diamond

1. Generate your dummy implementation
2. Deploy your dummy implementation
3. Set the implementation to point to the dummy
4. Repeat any time you update the diamond

## Example

Here is a live example [contract](https://rinkeby.etherscan.io/address/0xc173ae57b7479b95EA9EF0B1A3C70a61e84d0F30) deployed to rinkeby.

## Note

This was a quick weekend hack for a proof of concept. The example isn't fully eip-1967 compliant, and how etherscan responds to updating proxy is currently untested.

Also, I'm still not sure if this should be used in production. Its technically less transparent than just directing users to Louper. Nonetheless it was pretty fun to work on. If there are any other improvements / feedbacks pls let me know.

## TODO

- [ ] support more complex types in mock script (may need to declare these)
- [ ] turn the dummy contract generator into a CLI installable via NPM
