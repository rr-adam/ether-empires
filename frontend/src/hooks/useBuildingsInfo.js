import Colony from "../abi/Colony.js";
import { Contract } from 'ethers';
import { useCalls } from '@usedapp/core';

function useBuildingsInfo(colonyAddress) {
  const buildings = colonyAddress ? [0, 1, 2, 3, 4, 5, 6, 7, 8] : [];

  const calls = buildings?.map(building => ({
    contract: new Contract(colonyAddress, Colony),
    method: 'buildings',
    args: [building]
  })) ?? [];
  const results = useCalls(calls) ?? []
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(`Error encountered calling 'buildings' on ${calls[idx]?.contract.address}: ${result.error.message}`)
    }
  })
  if (results[1]?.value)
    return results.map(result => result?.value)
  else
    return undefined
}

export default useBuildingsInfo;