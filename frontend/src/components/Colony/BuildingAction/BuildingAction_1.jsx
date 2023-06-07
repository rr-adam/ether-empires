import { useContext, useState } from 'react';

import Colony from '../../../abi/Colony';
import ColonyContext from '../../../store/ColonyContext';
import { Contract } from 'ethers';
import { useContractFunction } from '@usedapp/core';

function WithdrawButton({ amount }) {
  const { colonyAddress } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'withdrawDefenses', { transactionName: 'withdrawDefenses' });

  const withdraw = () => {
    send(1, amount);
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
  if (amount == 0) {
    return (
      <>
        <button className="btn btn-primary btn-disabled btn-sm mt-4">
          Withdraw defenses
        </button>
      </>
    );
  }
  else {
    return (
      <>
        <button onClick={withdraw} className="btn btn-primary btn-sm mt-4">
          Withdraw {amount} defenses
        </button>
      </>
    );
  }
}

function AssignButton({ amount }) {
  const { colonyAddress } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'assignDefenses', { transactionName: 'assignDefenses' });

  const assign = () => {
    send(1, amount);
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
  if (amount == 0) {
    return (
      <>
        <button className="btn btn-primary btn-disabled btn-sm mt-4">
          Assign defenses
        </button>
      </>
    );
  }
  else {
    return (
      <>
        <button onClick={assign} className="btn btn-primary btn-sm mt-4">
          Assign {amount} defenses
        </button>
      </>
    );
  }
}

function BuildingAction_1() {
  const { buildingsInfo, colonyInfo } = useContext(ColonyContext);
  const [assignValue, setAssignValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);

  const unassignedDefenses = colonyInfo?.colossusUnits.toString();
  const assignedDefenses = buildingsInfo?.[1].defenses.toString();

  if (parseInt(assignValue) > parseInt(unassignedDefenses)) setAssignValue(0);
  if (parseInt(withdrawValue) > parseInt(assignedDefenses)) setWithdrawValue(0);

  const energyProdLevel = buildingsInfo?.[1]?.level.toNumber() || 0;
  const energyRate = energyProdLevel ? ((energyProdLevel * energyProdLevel) / 3 + 3) : 0;

  const handleAssignChange = (e) => {
    setAssignValue(e.target.value);
  };

  const handleWithdrawChange = (e) => {
    setWithdrawValue(e.target.value);
  };

  if (buildingsInfo) {
    return (
      <>
        <div>
          <p><span className='font-bold'>Production rate:</span> {energyRate.toFixed(2)} Energy / min</p>
          <p><span className='font-bold'>Assigned defenses:</span> {assignedDefenses} Colossus units</p>

          <div className="flex mt-4">
            <div className="left mr-4 flex-1">
              <h2 className='text-lg'>Assign defenses:</h2>
              <input type="range" min="0" max={unassignedDefenses} value={assignValue} onChange={handleAssignChange} className="range" />
              <span className='mt-2 text-xs text-slate-600'>{unassignedDefenses} unassigned colossus</span>
              <AssignButton amount={assignValue} />
            </div>
            <div className="right flex-1">
              <h2 className='text-lg'>Withdraw defenses:</h2>
              <input type="range" min="0" max={assignedDefenses} value={withdrawValue} onChange={handleWithdrawChange} className="range" />
              <span className='mt-2 text-xs text-slate-600'>{assignedDefenses} assigned colossus</span>
              <WithdrawButton amount={withdrawValue} />
            </div>
          </div>
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

export default BuildingAction_1;