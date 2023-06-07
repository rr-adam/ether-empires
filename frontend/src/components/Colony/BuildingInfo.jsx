import BuildingActionMain from './BuildingAction/BuildingActionMain';
import BuildingUpgrade from './BuildingUpgrade';
import Window from '../UI/Window';

function BuildingInfo({ selectedBuilding, closePopup }) {
  return (
    <>
      <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen max-w-4xl">
        <Window>
          <div className="flex flex-col">
            <div className="h-96 w-full bg-gray-200">
              <img src={selectedBuilding.coverImage} alt={selectedBuilding.name} className="w-full h-full object-cover" />
              <button className="btn btn-primary btn-sm absolute top-2 right-2" onClick={closePopup}>
                X
              </button>
            </div>
            <div className="p-4">
              <h1 className="text-4xl font-bold mb-2 mt-4">{selectedBuilding.name}</h1>
              <h3 className="text-lg text-gray-500">{selectedBuilding.description}</h3>
            </div>
            <div className="divider"></div>
            <div className="flex">
              <div className="flex flex-col items-start p-4 flex-1">
                <BuildingUpgrade selectedBuilding={selectedBuilding} />
              </div>
              <div className="flex flex-col item-start p-4 flex-1">
                <BuildingActionMain selectedBuilding={selectedBuilding} />
              </div>
            </div>
          </div>
        </Window>
      </div>
    </>
  );
}

export default BuildingInfo;