import ColonyContext from '../../../store/ColonyContext';
import { useContext } from 'react';

function BuildingAction_0() {
  const { buildingsInfo } = useContext(ColonyContext);

  if (buildingsInfo) {
    return (
      <>
        You have to upgrade the Nexus in order to upgrade your other buildings.
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

export default BuildingAction_0;