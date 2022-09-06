// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {LibDiamondEtherscan} from "../libraries/LibDiamondEtherscan.sol";

contract DiamondEtherscanFacet {
    function setDummyImplementation(address _implementation) external {
        LibDiamond.enforceIsContractOwner();
        LibDiamondEtherscan._setDummyImplementation(_implementation);
    }

    function implementation() external view returns (address) {
        return LibDiamondEtherscan._dummyImplementation();
    }
}
