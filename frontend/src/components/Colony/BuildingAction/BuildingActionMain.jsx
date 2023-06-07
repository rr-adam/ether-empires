import BuildingAction_0 from './BuildingAction_0';
import BuildingAction_1 from './BuildingAction_1';
import BuildingAction_2 from './BuildingAction_2';
import BuildingAction_3 from './BuildingAction_3';
import BuildingAction_4 from './BuildingAction_4';
import BuildingAction_5 from './BuildingAction_5';
import BuildingAction_6 from './BuildingAction_6';
import BuildingAction_7 from './BuildingAction_7';
import BuildingAction_8 from './BuildingAction_8';
import ColonyContext from '../../../store/ColonyContext';
import { useContext } from 'react';

function BuildingActionMain({ selectedBuilding }) {
  const { buildingsInfo } = useContext(ColonyContext);

  if (buildingsInfo) {
    if (buildingsInfo[selectedBuilding.id].isUpgrading) {
      return (
        <>
          <h1 className="text-2xl font-semibold opacity-25 mb-2">Under construction</h1>
        </>
      );
    }
    else if (buildingsInfo[selectedBuilding.id].level == 0) {
      return (
        <>
          <h1 className="text-2xl font-semibold opacity-25 mb-2">Not built</h1>
        </>
      );
    }
    else {
      if (selectedBuilding.id == 0) return <BuildingAction_0 />;
      if (selectedBuilding.id == 1) return <BuildingAction_1 />;
      if (selectedBuilding.id == 2) return <BuildingAction_2 />;
      if (selectedBuilding.id == 3) return <BuildingAction_3 />;
      if (selectedBuilding.id == 4) return <BuildingAction_4 />;
      if (selectedBuilding.id == 5) return <BuildingAction_5 />;
      if (selectedBuilding.id == 6) return <BuildingAction_6 />;
      if (selectedBuilding.id == 7) return <BuildingAction_7 />;
      if (selectedBuilding.id == 8) return <BuildingAction_8 />;
      else return (<></>);
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