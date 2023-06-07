import RecentColonies from './RecentColonies';
import { useState } from 'react';

function LoadColony({ handleSelectColony }) {
  const [address, setAddress] = useState('');

  const recentColoniesStorageItem = localStorage.getItem('recentColonies');
  const recentColonies = JSON.parse(recentColoniesStorageItem);

  console.log('recentColonies', recentColonies)

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleLoadButtonClick = () => {
    handleSelectColony(address);
  }

  return (
    <>
      <div>
        <h2 className="text-lg mb-2">Load from address:</h2>
        <input type="text" placeholder="0x..." className="input w-full max-w-xs text-xs" onChange={handleAddressChange} value={address} />
        <button className='btn btn-primary ml-2' onClick={handleLoadButtonClick}>Load</button>
        <h2 className="text-lg mt-6 mb-2">Recent history:</h2>
        {recentColonies
          ? <RecentColonies recentColonies={recentColonies} handleSelectColony={handleSelectColony} />
          : <p className='font-sm text-slate-600'>No recent colony history.</p>
        }
      </div>
    </>
  );
}

export default LoadColony;