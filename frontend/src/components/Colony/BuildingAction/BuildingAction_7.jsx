import { useContext, useState } from 'react';

import Colony from '../../../abi/Colony';
import ColonyContext from '../../../store/ColonyContext';
import { Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';

function ActivateButton({ target }) {
  const { colonyAddress } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'setPlasmaTurretTarget', { transactionName: 'setPlasmaTurretTarget' });

  const changeTarget = () => {
    send(target);
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
  else {
    return (
      <>
        <button onClick={changeTarget} className="btn btn-secondary btn-sm mt-4">
          Activate
        </button>
      </>
    );
  }
}

function BuildingAction_7() {
  const { buildingsInfo, plasmaTurret } = useContext(ColonyContext);

  const currentTarget = plasmaTurret?.target.toNumber();
  const [target, setTarget] = useState(currentTarget);
  const defenseBoost = buildingsInfo ? buildingsInfo[7].level * buildingsInfo[7].level * 5000 : 0;

  const isActive = plasmaTurret && buildingsInfo ? Date.now() / 1000 <= plasmaTurret.lastActivationTimestamp.toNumber() + (60 * 60 * 2 * buildingsInfo[7].level) : 0;

  const handleTargetSelect = (e) => {
    setTarget(e.target.value);
  };

  if (buildingsInfo) {
    return (
      <>
        <h2 className="text-md font-semibold">Boost when active: {defenseBoost}</h2>
        <h2 className="text-md font-semibold">Status: {isActive ? 'ACTIVE' : 'NOT ACTIVE'}</h2>
        <h2 className="text-md font-semibold">Target: {currentTarget == 1 ? 'Solar Collector' : currentTarget == 2 ? 'Water Reclamation Center' : currentTarget == 3 ? 'Ore Extractor' : 'None'}</h2>
        <h2 className="text-md font-semibold my-4">Activate:</h2>
        <select value={target} onChange={handleTargetSelect} className="select w-full max-w-xs">
          <option disabled>Target</option>
          <option value={1}>Solar Collector</option>
          <option value={2}>Water Reclamation Center</option>
          <option value={3}>Ore Extractor</option>
        </select>
        <div>
          {currentTarget != target ?
            <ActivateButton target={target} /> :
            null
          }
          <p className="text-gray-500 text-sm my-2">Activation cost: {buildingsInfo ? 200 * buildingsInfo[7].level : 0} Energy</p>

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

export default BuildingAction_7;