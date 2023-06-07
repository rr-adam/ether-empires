import BuildingInfo from './BuildingInfo';
import { buildings } from '../../util/constants'
import { useState } from 'react';

function BuildingsList() {

  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const openPopup = (building) => {
    setSelectedBuilding(building);
  };

  const closePopup = () => {
    setSelectedBuilding(null);
  };

  return (
    <>
      <ul>
        {buildings.map((building) => (
          <li onClick={() => openPopup(building)} key={building.id} className={`mb-2 rounded-lg overflow-hidden hover:opacity-80 hover:cursor-pointer transition-colors ${building === selectedBuilding ? "outline outline-1 outline-slate-600" : ""}`}>
            <div className="flex justify-between relative">
              <div className='p-2 w-2/3'>
                <h3 className="text-md font-semibold pointer-events-none">{building.name}</h3>
                <p className="text-sm text-gray-500 pointer-events-none">{building.description}</p>
              </div>
              <img src={building.coverImage} alt="cover" className='absolute right-0 h-full w-1/3 object-cover' />
              <div className='absolute right-0 h-full w-1/3 bg-gradient-to-r from-base-300' />
            </div>
          </li>
        ))}
      </ul>

      {selectedBuilding && (
        <BuildingInfo selectedBuilding={selectedBuilding} closePopup={closePopup} />
      )}
    </>
  );
}

export default BuildingsList;