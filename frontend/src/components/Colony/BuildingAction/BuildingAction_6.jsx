import ColonyContext from '../../../store/ColonyContext';
import { useContext } from 'react';

function BuildingAction_6() {
  const { buildingsInfo } = useContext(ColonyContext);
  const defenseBoost = buildingsInfo ? buildingsInfo[6].level * buildingsInfo[6].level * 150 : 0;

  if (buildingsInfo) {
    return (
      <>
        <p className="text-gray-500 text-sm mb-6">Shield generator passively increases your colony defenses.</p>
        <h2 className="text-md font-semibold mb-4">Defenses boost for production buildings:</h2>
        <div className='w-min'>
          <h2 className="text-2xl p-4 outline outline-1 outline-slate-400 rounded-xl">{defenseBoost}</h2>
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

export default BuildingAction_6;