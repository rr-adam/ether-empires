import Colony from "../abi/Colony.js";
import { Contract } from 'ethers';
import { useCall } from '@usedapp/core';

function useOwner(colonyAddress) {
  const { value, error } = useCall(colonyAddress && {
    contract: new Contract(colonyAddress, Colony),
    method: 'owner',
  }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
}

export default useOwner;