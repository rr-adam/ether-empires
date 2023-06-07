import CreateColony from './components/SelectColony/CreateColony';
import LoadColony from './components/SelectColony/LoadColony';
import Window from './components/UI/Window';
import { useState } from 'react';

function SelectColony({ setColonyAddress }) {
  const handleSelectColony = (address) => {
    // save address in local storage for quick access later
    localStorage.setItem('currentColony', address);

    // save in recent colonies
    const recentColonies = localStorage.getItem('recentColonies');

    let newRecentColonies;
    if (!recentColonies) {
      newRecentColonies = [address];
    }
    else {
      newRecentColonies = JSON.parse(recentColonies);

      const index = newRecentColonies.findIndex(element => element == address);
      if (index != -1) {
        newRecentColonies.splice(index, 1);
      }

      newRecentColonies.unshift(address);

      if (newRecentColonies.length > 5) {
        newRecentColonies.slice(0, 5);
      }
    }

    localStorage.setItem('recentColonies', JSON.stringify(newRecentColonies));

    setColonyAddress(address);
  }

  const [tab, setTab] = useState(0);

  return (
    <>
      <div className='fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen max-w-4xl'>
        <Window>
          <div className='p-6'>
            <p className='text-xl mb-3'>Select colony to open.</p>
            <p className="text-gray-500 mb-12">
              You need to be the owner of the selected colony, otherwise you will not be able to perform any actions.
            </p>
            <div className="tabs border-b border-slate-600">
              <a className={'tab tab-lg tab-lifted ' + (tab == 0 ? 'tab-active' : '')} onClick={() => setTab(0)}>Create Colony</a>
              <a className={'tab tab-lg tab-lifted ' + (tab == 1 ? 'tab-active' : '')} onClick={() => setTab(1)}>Load Colony</a>
            </div>
            <div className="p-4">
              {tab == 0 ? <CreateColony handleSelectColony={handleSelectColony} /> : <LoadColony handleSelectColony={handleSelectColony} />}
            </div>
          </div>
        </Window>
      </div>
    </>
  )
}

export default SelectColony;