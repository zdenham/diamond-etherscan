const fs = require('fs');

const generateDummyContractForEtherscan = (contractList, { spdxIdentifier, solidityVersion, diamondAddress, network }) => {

  const signatures = contractList.reduce((signaturesArr, contract) => {
    return [...signaturesArr, ...getFormattedSignatures(contract)]
  }, []);

  const str = getContractString({ spdxIdentifier, solidityVersion, diamondAddress, signatures, network});

  fs.writeFileSync('./contracts/dummy/DummyDiamondImplementation.sol', str);
}

const getFormattedSignatures = (contract) => {
  const signatures = Object.keys(contract.interface.functions);
  return signatures.map(signature => formatSignature(contract.interface.functions[signature]));
}

const formatSignature = (func) => {
  
  const paramsString = formatParams(func.inputs);
  const outputStr = formatParams(func.outputs);

  
  const stateMutability = func.stateMutability === 'nonpayable' ? '' : ` ${func.stateMutability}`;
  const outputs = outputStr ? ` returns (${outputStr})` : '';


  return `function ${func.name}(${paramsString}) external${stateMutability}${outputs} {}`
}

const formatParams = (params) => {
  let paramsString = params.reduce((currStr, param, i) => {
    const comma = i < (params.length - 1) ? ', ' : '';
    const formattedType = formatType(param);
    const name = param.name ? ` ${param.name}` : ''

    return `${currStr}${formattedType}${name}${comma}`;
  }, '');

  return paramsString
}

const memoryTypes = {
    'tuple[]': true,
    'address[]': true,
    // TODO add more
}

// TODO - support more complex types
const formatType = (type) => {
  const storageLocation = memoryTypes[type.type] ? ' memory' : ''

  return type.components ? 'fixmeplease calldata' : type.type + storageLocation;
}

const getContractString = ({spdxIdentifier, solidityVersion, signatures, diamondAddress, network}) =>
(`
// SPDX-License-Identifier: ${spdxIdentifier || 'MIT'}
pragma solidity ${solidityVersion || '^0.8.0'};

/**
 * This is a generated dummy diamond implementation for compatibility with 
 * etherscan. For full contract implementation, check out the diamond on louper:
 * https://louper.dev/diamond/${diamondAddress}?network=${network}
 */

contract DummyDiamondImplementation {${
  signatures.reduce((all, sig) => {
    return `${all || '    '}${'\n\n'}   ${sig}`
  }, '')
}
}
`);

// const getSignaturesString

module.exports = generateDummyContractForEtherscan;