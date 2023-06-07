import { useEffect, useState } from 'react';

import Colony from './Colony';
import ColonyContext from './store/ColonyContext';
import ColonyHeader from './components/ColonyHeader';
import Header from './components/Header';
import ResourcesContext from './store/ResourcesContext';
import SelectColony from './SelectColony';
import WalletOnboarding from './WalletOnboarding';
import useBuildingsInfo from './hooks/useBuildingsInfo';
import useColonyInfo from './hooks/useColonyInfo';
import { useEthers } from '@usedapp/core';
import useLastPvpSwitchTimestamp from './hooks/useLastPvpSwitchTimestamp';
import useLastWarpTimestamp from './hooks/useLastWarpTimestamp';
import useOwner from './hooks/useOwner';
import usePlasmaTurret from './hooks/usePlasmaTurret';
import usePvpEnabled from './hooks/usePvpEnabled';
import useUnitTraining from './hooks/useUnitTraining';

function App() {
  const [colonyAddress, setColonyAddress] = useState(null);
  const { account } = useEthers();

  const colonyInfo = useColonyInfo(colonyAddress);
  const buildingsInfo = useBuildingsInfo(colonyAddress);
  const unitTraining = useUnitTraining(colonyAddress);
  const plasmaTurret = usePlasmaTurret(colonyAddress);
  const lastWarpTimestamp = useLastWarpTimestamp(colonyAddress);
  const pvpEnabled = usePvpEnabled(colonyAddress);
  const lastPvPSwitchTimestamp = useLastPvpSwitchTimestamp(colonyAddress);
  const owner = useOwner(colonyAddress);

  const colonyData = {
    colonyAddress,
    colonyInfo,
    buildingsInfo,
    unitTraining,
    plasmaTurret,
    lastWarpTimestamp,
    pvpEnabled,
    lastPvPSwitchTimestamp,
    owner
  };

  // resources real time update

  const [energy, setEnergy] = useState('0');
  const [water, setWater] = useState('0');
  const [ore, setOre] = useState('0');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentEnergy = colonyInfo?.energy.toNumber() || 0;
      const currentWater = colonyInfo?.water.toNumber() || 0;
      const currentOre = colonyInfo?.ore.toNumber() || 0;
      const energyProdLevel = buildingsInfo?.[1]?.level.toNumber() || 0;
      const waterProdLevel = buildingsInfo?.[2]?.level.toNumber() || 0;
      const oreProdLevel = buildingsInfo?.[3]?.level.toNumber() || 0;
      const energyRate = energyProdLevel ? ((energyProdLevel * energyProdLevel) / 3 + 3) : 0;
      const waterRate = waterProdLevel ? ((waterProdLevel * waterProdLevel) / 3 + 3) : 0;
      const oreRate = energyRate ? ((oreProdLevel * oreProdLevel) / 3 + 3) : 0;
      const lastClaimTimestamp = colonyInfo?.lastResourceClaimTimestamp.toNumber() || Date.now();
      const currentTime = Date.now() / 1000;
      const timeSinceLastClaim = (currentTime - lastClaimTimestamp) / 60;

      setEnergy(() => {
        const estimatedEnergy = parseInt(currentEnergy) + energyRate * timeSinceLastClaim;
        return estimatedEnergy.toString();
      });
      setWater(() => {
        const estimatedWater = parseInt(currentWater) + waterRate * timeSinceLastClaim;
        return estimatedWater.toString();
      });
      setOre(() => {
        const estimatedOre = parseInt(currentOre) + oreRate * timeSinceLastClaim;
        return estimatedOre.toString();
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [buildingsInfo, colonyInfo]);

  const resourcesData = {
    energy,
    water,
    ore
  };

  return (
    <>
      <ResourcesContext.Provider value={resourcesData}>
        <ColonyContext.Provider value={colonyData}>
          <div className="viewport flex flex-col relative h-screen w-full">
            {account && colonyAddress ?
              <ColonyHeader /> :
              <Header />
            }
            <div className="flex h-full overflow-hidden">
              {!account ? <WalletOnboarding /> :
                !colonyAddress ? <SelectColony setColonyAddress={setColonyAddress} /> :
                  <Colony setColonyAddress={setColonyAddress} />}
            </div>
          </div>
        </ColonyContext.Provider>
      </ResourcesContext.Provider>
    </>
  )
}

export default App;
