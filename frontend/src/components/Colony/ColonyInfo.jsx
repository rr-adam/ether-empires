import Colony from '../../abi/Colony';
import ColonyContext from '../../store/ColonyContext';
import { Contract } from 'ethers';
import { useContext } from 'react';
import { useContractFunction } from '@usedapp/core';

function TogglePvPButton({ pvpEnabled }) {
  const { colonyAddress, lastPvPSwitchTimestamp } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'setPvpEnabled', { transactionName: 'setPvpEnabled' });

  const toggle = () => {
    send(!pvpEnabled);
  }

  const hour = 3600;
  const day = hour * 24;

  const switchDelay = 7 * day;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const remainingTime = lastPvPSwitchTimestamp + switchDelay - currentTimestamp;

  const canToggle = remainingTime <= 0;

  if (state.status === 'Mining') {
    return (
      <>
        <button className="btn btn-primary btn-disabled btn-sm mt-4">
          Transaction pending...
        </button>
      </>
    );
  }
  else if (canToggle) {
    return (
      <>
        <button onClick={toggle} className="btn btn-primary btn-sm mt-4">
          {pvpEnabled ? 'Disable PvP' : 'Enable PvP'}
        </button>
      </>
    );
  }
  else {
    return (
      <>
        <p className="text-gray-500 mb-4">You must wait 7 days to toggle PvP status</p>
      </>
    );
  }
}

function ColonyInfo({ setColonyAddress }) {
  const { colonyInfo, owner, pvpEnabled, colonyAddress } = useContext(ColonyContext);

  return (
    <>
      <div>
        <p>Colony name:</p>
        <p className='text-sm font-bold'>{colonyInfo?.name}</p>
      </div>
      <div className='mt-4'>
        <p>Colony address:</p>
        <p className='text-sm font-bold'>{colonyAddress}</p>
      </div>
      <div className='mt-4'>
        <p>Owner:</p>
        <p className='text-sm font-bold'>{owner}</p>
      </div>
      <div className='mt-4'>
        <p>PvP enabled:</p>
        <p className='text-sm font-bold'>{pvpEnabled?.[0] ? 'ENABLED' : 'NOT ENABLED'}</p>
        <TogglePvPButton pvpEnabled={pvpEnabled?.[0]} />
      </div>
      <div className="flex-1"></div>
      <button className='btn btn-sm btn-accent self-end' onClick={() => { setColonyAddress(null) }}>Close Colony</button>
    </>
  );
}

export default ColonyInfo;