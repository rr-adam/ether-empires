import { getUpgradeRequirements, remainingTimeCountdownString } from '../../util/helpers';

import Colony from '../../abi/Colony';
import ColonyContext from '../../store/ColonyContext';
import { Contract } from 'ethers';
import ResourcesContext from '../../store/ResourcesContext';
import { useContext } from 'react';
import { useContractFunction } from '@usedapp/core';

function UpgradeBtn({ selectedBuilding }) {
  const { buildingsInfo, colonyAddress } = useContext(ColonyContext);
  const { energy, water, ore } = useContext(ResourcesContext);


  const buildingLevel = buildingsInfo?.[selectedBuilding.id].level.toNumber();
  const [upgradeEnergy, upgradeWater, upgradeOre] = getUpgradeRequirements(selectedBuilding.id, buildingLevel + 1);
  const resourcesRequirementsMet = water >= upgradeWater && energy >= upgradeEnergy && ore >= upgradeOre;
  const nexusRequirementsMet = selectedBuilding.id == 0 || buildingsInfo[selectedBuilding.id].level.toNumber() < buildingsInfo[0].level.toNumber();

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'startUpgrade', { transactionName: 'startUpgrade' });

  const startUpgrade = () => {
    send(selectedBuilding.id);
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
  else if (resourcesRequirementsMet && nexusRequirementsMet) {
    return (
      <>
        <button onClick={startUpgrade} className="btn btn-primary btn-sm mt-4">
          Upgrade
        </button>
      </>
    );
  }
  else if (!nexusRequirementsMet) {
    return (
      <>
        <button className="btn btn-primary btn-sm btn-disabled mt-4">
          First upgrade your Nexus!
        </button>
      </>
    );
  }
  else if (!resourcesRequirementsMet) {
    return (
      <>
        <button className="btn btn-primary btn-sm btn-disabled mt-4">
          Not enough resources!
        </button>
      </>
    );
  }
}

function FinishUpgradeBtn({ selectedBuilding }) {
  const { colonyAddress } = useContext(ColonyContext);

  // transactions
  const colonyContract = new Contract(colonyAddress, Colony);
  const { state, send } = useContractFunction(colonyContract, 'finishUpgrade', { transactionName: 'finishUpgrade' });

  const finishUpgrade = () => {
    send(selectedBuilding.id);
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
        <button onClick={finishUpgrade} className="btn btn-secondary btn-sm mt-4">
          Finish upgrade
        </button>
      </>
    );
  }
}

function BuildingActionMain({ selectedBuilding }) {
  const { buildingsInfo, colonyInfo } = useContext(ColonyContext);

  const buildingLevel = buildingsInfo?.[selectedBuilding.id].level.toNumber();
  const isUpgrading = buildingsInfo?.[selectedBuilding.id].isUpgrading;
  const upgradeFinishTimestampSeconds = buildingsInfo?.[selectedBuilding.id].upgradeFinishTimestamp.toNumber();
  const [upgradeEnergy, upgradeWater, upgradeOre] = getUpgradeRequirements(selectedBuilding.id, buildingLevel + 1);

  // get the current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // calculate the remaining time in seconds
  const remainingTime = upgradeFinishTimestampSeconds - currentTimestamp;

  let remainingTimeCountdown = remainingTimeCountdownString(remainingTime);

  if (buildingsInfo) {
    if (isUpgrading && remainingTime > 0) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Level: {buildingLevel}</h2>

          <p className="text-gray-500 text-center mb-4">Building is being upgraded...</p>
          <h2 className="text-md font-semibold mb-2">Upgrade will finish in:</h2>
          <h2 className="text-md mb-2">{remainingTimeCountdown}</h2>
        </>
      );
    }
    else if (isUpgrading && remainingTime <= 0) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Level: {buildingLevel}</h2>

          <p className="text-gray-500 text-center mb-4">Building is being upgraded...</p>
          <h2 className="text-md mb-2">Upgrade is ready!</h2>

          <FinishUpgradeBtn selectedBuilding={selectedBuilding} />
        </>
      );
    }
    else {
      return (
        <>
          <h2 className="text-xl font-semibold mb-2">Level: {buildingLevel}</h2>

          {buildingLevel < 20 ?
            <>
              <h2 className="text-lg font-semibold mb-2">Upgrade requirements</h2>
              <h2 className="text-md mb-2">Energy: {upgradeEnergy}</h2>
              <h2 className="text-md mb-2">Water: {upgradeWater}</h2>
              <h2 className="text-md mb-2">Ore: {upgradeOre}</h2>
              <UpgradeBtn buildingsInfo={buildingsInfo} colonyInfo={colonyInfo} selectedBuilding={selectedBuilding} />
            </> :
            <>
              <p className="text-gray-500 text-center mb-4">Building at max level</p>
            </>
          }
        </>
      );
    }
  } else {
    return (
      <>
        Loading...
      </>
    );
  }
}

export default BuildingActionMain;