import { useCall } from '@usedapp/core';
import { Contract } from 'ethers';
import Colony from "../abi/Colony.js";

function useColonyInfo(colonyAddress) {
  const { value, error } = useCall(colonyAddress && {
    contract: new Contract(colonyAddress, Colony),
    method: 'colony',
  }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
}

export default useColonyInfo;