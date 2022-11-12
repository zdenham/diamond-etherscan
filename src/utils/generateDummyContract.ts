import { Contract } from "ethers";
import type { FunctionFragment, ParamType } from "ethers/lib/utils.js";
// import fs from "fs";

type GenerateContractParams = {
  diamondAddress: string;
  network: string;
  spdxIdentifier?: string;
  solidityVersion?: string;
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
  const structs = facetList.reduce((structsArr, contract) => {
    return [...structsArr, ...getFormattedStructs(contract)];
  }, []);

  const signatures = facetList.reduce((signaturesArr, contract) => {
    return [...signaturesArr, ...getFormattedSignatures(contract)];
  }, []);

  const str = getContractString({
    spdxIdentifier,
    solidityVersion,
    diamondAddress,
    signatures,
    network,
  });

  return str;
};

const getContractString = ({
  spdxIdentifier,
  solidityVersion,
  signatures,
  diamondAddress,
  network,
}) => `
// SPDX-License-Identifier: ${spdxIdentifier || "MIT"}
pragma solidity ${solidityVersion || "^0.8.0"};

/**
 * This is a generated dummy diamond implementation for compatibility with 
 * etherscan. For full contract implementation, check out the diamond on louper:
 * https://louper.dev/diamond/${diamondAddress}?network=${network}
 */

contract DummyDiamondImplementation {${signatures.reduce((all, sig) => {
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
  const formattedType = type.components ? formatComponentType(type) : type.type;

  return `${formattedType} ${storageLocation}`;
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

const formatComponentType = (type: ParamType) => {
  return "";
};

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
    .map((param) => maybeFormatStruct(param))
    .flat(10)
    .filter((struct) => !!struct);
};

const maybeFormatStruct = (param: ParamType): (string | string[])[] => {
  if (!param.components) {
    return [""];
  }
};
