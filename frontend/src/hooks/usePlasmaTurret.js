import Colony from "../abi/Colony.js";
import { Contract } from 'ethers';
import { useCall } from '@usedapp/core';

function usePlasmaTurret(colonyAddress) {
  const { value, error } = useCall(colonyAddress && {
    contract: new Contract(colonyAddress, Colony),
    method: 'plasmaTurret',
  }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
}

export default usePlasmaTurret;