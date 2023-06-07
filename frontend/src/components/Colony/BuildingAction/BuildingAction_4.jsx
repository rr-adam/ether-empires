import { useContext, useState } from 'react';

import Colony from '../../../abi/Colony';
import ColonyContext from '../../../store/ColonyContext';
import { Contract } from 'ethers';
import ResourcesContext from '../../../store/ResourcesContext';
import { remainingTimeCountdownString } from '../../../util/helpers';
import { useContractFunction } from '@usedapp/core';

function FinishTrainingButton() {
  const { colonyAddress } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'claimAssaultUnits', { transactionName: 'claimAssaultUnits' });

  const claim = () => {
    send();
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
        <button onClick={claim} className="btn btn-secondary btn-sm mt-4">
          Claim assault units
        </button>
      </>
    );
  }
}

function StartTrainingButton({ amount }) {
  const { colonyAddress } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'trainAssaultUnits', { transactionName: 'trainAssaultUnits' });

  const train = () => {
    send(amount);
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
          Train assault units
        </button>
      </>
    );
  }
  else {
    return (
      <>
        <button onClick={train} className="btn btn-primary btn-sm mt-4">
          Train {amount} assault units
        </button>
      </>
    );
  }
}

function BuildingAction_4() {
  const { unitTraining, buildingsInfo } = useContext(ColonyContext);
  const { energy, water } = useContext(ResourcesContext);
  const [trainValue, setTrainValue] = useState(0);

  const energyCostPerUnit = 6;
  const waterCostPerUnit = 4;

  const maxUnitsForEnergy = Math.floor(energy / energyCostPerUnit);
  const maxUnitsForWater = Math.floor(water / waterCostPerUnit);

  const maximumUnitAmount = Math.min(maxUnitsForEnergy, maxUnitsForWater);

  const assaultTrainingAmount = unitTraining?.assaultTrainingAmount.toNumber();
  const assaultUnitClaimTimestamp = unitTraining?.assaultUnitClaimTimestamp.toNumber();

  // current training
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const remainingTime = assaultUnitClaimTimestamp - currentTimestamp;

  // estimate training time
  const estimatedTimeInSeconds = buildingsInfo ? (trainValue * 120) / buildingsInfo[4].level : 0;

  let remainingTimeCountdown = remainingTimeCountdownString(remainingTime);
  let estimatedTimeCountdown = remainingTimeCountdownString(estimatedTimeInSeconds);

  const handleTrainChange = (e) => {
    setTrainValue(e.target.value);
  };

  if (unitTraining) {
    return (
      <>
        <div>
          {assaultTrainingAmount > 0 && remainingTime > 0 ?
            (<>
              <p className="text-gray-500 mb-4">Training in progress...</p>
              <h2 className="text-md font-semibold mb-2">Training will finish in:</h2>
              <h2 className="text-md mb-2">{remainingTimeCountdown}</h2>
            </>) :
            assaultTrainingAmount > 0 ?
              (<>
                <div>
                  <p className="text-gray-500 mb-4">Training finished!</p>
                  <h2 className="text-md font-semibold mb-2">You can claim {assaultTrainingAmount} assault units</h2>
                  <FinishTrainingButton />
                </div>
              </>) :
              (<>
                <div>
                  <h2 className='text-lg'>Train assault units:</h2>
                  <input type="range" min="0" max={maximumUnitAmount} value={trainValue} onChange={handleTrainChange} className="range" />
                  <StartTrainingButton amount={trainValue} />
                  <div className='flex mt-6'>
                    <div className="flex-1">
                      <p className="text-md font-bold mb-4">Resource cost:</p>
                      <h2 className="text-md mb-2">Energy: {trainValue * energyCostPerUnit}</h2>
                      <h2 className="text-md mb-2">Water: {trainValue * waterCostPerUnit}</h2>
                    </div>
                    <div className="flex-1">
                      <p className="text-md font-bold mb-4">Training time:</p>
                      <h2 className="text-md mb-2">{estimatedTimeCountdown}</h2>
                    </div>
                  </div>
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

export default BuildingAction_4;