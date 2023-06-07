import { useContext, useState } from 'react';

import Colony from '../../../abi/Colony';
import ColonyContext from '../../../store/ColonyContext';
import { Contract } from 'ethers';
import { remainingTimeCountdownString } from '../../../util/helpers';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';

function WarpButton({ assault, colossus, destination }) {
  const { colonyAddress } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'useWarpGate', { transactionName: 'useWarpGate' });

  const warp = () => {
    send(assault, colossus, destination);
  }

  if (state.status === 'Mining') {
    return (
      <>
        <button className="btn btn-primary btn-disabled btn-sm mt-4">
          Transaction pending...
        </button>
      </>
    );
  }
  if (assault == 0 && colossus == 0 || !utils.isAddress(destination)) {
    return (
      <>
        <button className="btn btn-primary btn-disabled btn-sm mt-4">
          Warp units
        </button>
      </>
    );
  }
  else {
    return (
      <>
        <button onClick={warp} className="btn btn-primary btn-sm mt-4">
          Warp {assault} assault and {colossus} colossus
        </button>
      </>
    );
  }
}

function BuildingAction_8() {
  const { lastWarpTimestamp, buildingsInfo, colonyInfo } = useContext(ColonyContext);

  const maxAssault = colonyInfo ? colonyInfo.assaultUnits.toNumber() : 0;
  const maxColossus = colonyInfo ? colonyInfo.colossusUnits.toNumber() : 0;

  const [assault, setAssault] = useState(0);
  const [colossus, setColossus] = useState(0);
  const [destination, setDestination] = useState('');

  const lastWarp = lastWarpTimestamp ? lastWarpTimestamp[0].toNumber() : Date.now() / 1000;
  const warpLevel = buildingsInfo ? buildingsInfo[8].level.toNumber() : 1;
  const hour = 3600;
  const day = hour * 24;
  const month = day * 30;
  const nextPossibleWarpTime = lastWarp + (month / warpLevel);

  const canWarp = Date.now() / 1000 > nextPossibleWarpTime;

  // estimate remaining time
  const timeLeft = nextPossibleWarpTime - Date.now() / 1000;

  let remainingTimeCountdown = remainingTimeCountdownString(timeLeft);

  const handleAssaultChange = (e) => {
    setAssault(e.target.value);
  };

  const handleColossusChange = (e) => {
    setColossus(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  if (lastWarpTimestamp && buildingsInfo) {
    return (
      <>
        <div>
          {canWarp ?
            (<>
              <h2 className='text-lg'>Destination colony address:</h2>
              <input type="text" placeholder="0x..." className="input w-full max-w-xs text-xs" onChange={handleDestinationChange} />
              <div className="flex mt-4">
                <div className="left mr-4 flex-1">
                  <h2 className='text-lg'>Assault amount:</h2>
                  <input type="range" min="0" max={maxAssault} value={assault} onChange={handleAssaultChange} className="range" />
                  <span className='mt-2 text-xs text-slate-600'>{maxAssault} assault owned</span>
                </div>
                <div className="right flex-1">
                  <h2 className='text-lg'>Colossus amount:</h2>
                  <input type="range" min="0" max={maxColossus} value={colossus} onChange={handleColossusChange} className="range" />
                  <span className='mt-2 text-xs text-slate-600'>{maxColossus} colossus owned</span>
                </div>
              </div>
              <WarpButton assault={assault} colossus={colossus} destination={destination} />
            </>) :
            (<>
              <div>
                <h2 className='text-lg'>Warp Gate is not ready.</h2>
                <h2 className="text-md font-semibold mb-2">Time left:</h2>
                <h2 className="text-md mb-2">{remainingTimeCountdown}</h2>
              </div>
            </>)
          }
        </div>
      </>
    );
  } else {
    return (
      <>
        Loading...
      </>
    );
  }
}

export default BuildingAction_8;