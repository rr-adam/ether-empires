import { useCall } from '@usedapp/core';
import { Contract } from 'ethers';
import Colony from "../abi/Colony.js";

function useUnitTraining(colonyAddress) {
  const { value, error } = useCall(colonyAddress && {
    contract: new Contract(colonyAddress, Colony),
    method: 'unitTraining',
  }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
}

export default useUnitTraining;