import { Contract } from "ethers";
import type { FunctionFragment, ParamType } from "ethers/lib/utils.js";

type GenerateContractParams = {
  diamondAddress?: string;
  network?: string;
  spdxIdentifier?: string;
  solidityVersion?: string;
};

type GetContractStringParams = GenerateContractParams & {
  signatures: string[];
  structs: string[];
};

export const generateDummyContract = (
  facetList: Contract[],
  {
    spdxIdentifier,
    solidityVersion,
    diamondAddress,
    network,
  }: GenerateContractParams
): string => {
  const structs = facetList
    .reduce((structsArr, contract) => {
      return [...structsArr, ...getFormattedStructs(contract)];
    }, [])
    .filter(dedoop);

  const signatures = facetList
    .reduce((signaturesArr, contract) => {
      return [...signaturesArr, ...getFormattedSignatures(contract)];
    }, [])
    .filter(dedoop);

  const str = getContractString({
    spdxIdentifier,
    solidityVersion,
    diamondAddress,
    signatures,
    structs,
    network,
  });

  return str;
};

const getContractString = ({
  spdxIdentifier,
  solidityVersion,
  signatures,
  structs,
  diamondAddress,
  network,
}: GetContractStringParams) => `
// SPDX-License-Identifier: ${spdxIdentifier || "MIT"}
pragma solidity ${solidityVersion || "^0.8.18"};

${generateComment(diamondAddress, network)}

contract DummyDiamondImplementation {
${structs.reduce((all, struct) => {
  return `${all}\n\n${struct}`;
}, "")}
${signatures.reduce((all, sig) => {
  return `${all || "    "}${"\n\n"}   ${sig}`;
}, "")}
}
`;

const getFormattedSignatures = (facet: Contract) => {
  const signatures = Object.keys(facet.interface.functions);

  return signatures.map((signature) =>
    formatSignature(facet.interface.functions[signature])
  );
};

const formatSignature = (func: FunctionFragment) => {
  const paramsString = formatParams(func.inputs);
  const outputStr = formatParams(func.outputs);

  const stateMutability =
    func.stateMutability === "nonpayable" ? "" : ` ${func.stateMutability}`;
  const outputs = outputStr ? ` returns (${outputStr})` : "";

  return `function ${func.name}(${paramsString}) external${stateMutability}${outputs} {}`;
};

const formatParams = (params: ParamType[]): string => {
  let paramsString = params.reduce((currStr, param, i) => {
    const comma = i < params.length - 1 ? ", " : "";
    const formattedType = formatType(param);
    const name = param.name ? ` ${param.name}` : "";

    return `${currStr}${formattedType}${name}${comma}`;
  }, "");

  return paramsString;
};

const formatType = (type: ParamType) => {
  const storageLocation = getStorageLocationForType(type.type);

  const arrString = getArrayString(type);
  const formattedType = type.components
    ? getTupleName(type) + arrString
    : type.type;

  return `${formattedType} ${storageLocation}`;
};

const getArrayString = (type: ParamType): string => {
  if (!type.arrayLength) {
    return "";
  }

  if (type.arrayLength === -1) {
    return "[]";
  }

  return `[${type.arrayLength}]`;
};

const getStorageLocationForType = (type: string): string => {
  // check for arrays
  if (type.indexOf("[") !== -1) {
    return "memory";
  }

  // check for tuples
  if (type.indexOf("tuple") !== -1) {
    return "memory";
  }

  switch (type) {
    case "bytes":
    case "string":
      return "memory";
    default:
      return "";
  }
};

// deterministic naming convention
const getTupleName = (param: ParamType) => {
  return "Tuple" + hashCode(JSON.stringify(param));
};

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString().substring(3, 10);
}

// declare structs used in function arguments
const getFormattedStructs = (facet: Contract) => {
  const funcs = Object.values(facet.interface.functions);

  const inputStructs = funcs.reduce((inputStructsArr, func) => {
    return [...inputStructsArr, ...getFormattedStructsFromParams(func.inputs)];
  }, []);

  const outputStructs = funcs.reduce((outputStructsArr, func) => {
    return [
      ...outputStructsArr,
      ...getFormattedStructsFromParams(func.outputs),
    ];
  }, []);

  return [...inputStructs, ...outputStructs];
};

const getFormattedStructsFromParams = (params: ParamType[]): string[] => {
  return params
    .map(recursiveFormatStructs)
    .flat()
    .filter((str) => str.indexOf(" struct ") !== -1);
};

const recursiveFormatStructs = (param: ParamType): string[] => {
  // base case
  if (!param.components) {
    return [""];
  }

  const otherStructs = param.components
    .map(recursiveFormatStructs)
    .flat()
    .filter((str) => str.indexOf(" struct ") !== -1);

  const structMembers = param.components.map(formatStructMember);
  const struct = `    struct ${getTupleName(param)} {${structMembers.reduce(
    (allMembers, member) => `${allMembers}${member}`,
    ""
  )}\n    }`;

  return [struct, ...otherStructs];
};

const formatStructMember = (param: ParamType) => {
  const arrString = getArrayString(param);
  return `\n        ${
    param.components ? getTupleName(param) + arrString : param.type
  } ${param.name};`;
};

const dedoop = (str: string, index: number, allmembers: string[]) => {
  for (let i = 0; i < index; i++) {
    if (allmembers[i] === str) {
      return false;
    }
  }

  return true;
};

const generateComment = (diamondAddress: string, network: string) => {
  if (!diamondAddress || !network) {
    return "";
  }

  return `/**
 * This is a generated dummy diamond implementation for compatibility with 
 * etherscan. For full contract implementation, check out the diamond on louper:
 * https://louper.dev/diamond/${diamondAddress}?network=${network}
 */`;
};
