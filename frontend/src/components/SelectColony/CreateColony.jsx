import { useEffect, useState } from 'react';

import { Contract } from 'ethers';
import EtherEmpires from '../../abi/EtherEmpires';
import { etherEmpiresAddress } from '../../util/constants';
import { useContractFunction } from '@usedapp/core';

function CreateColony({ handleSelectColony }) {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const contract = new Contract(etherEmpiresAddress, EtherEmpires);
  const { state, send } = useContractFunction(contract, 'createColony', { transactionName: 'Create Colony' })

  const createNewColony = () => {
    send(name);
  }

  useEffect(() => {
    if (state && state.receipt) {
      const receipt = state.receipt;
      const returnedAddress = receipt.logs[0].address; // Assuming the address is in the first log
      console.log('Returned address:', returnedAddress);

      handleSelectColony(returnedAddress);
    }
  }, [state, handleSelectColony]);

  console.log(state)

  return (
    <>
      <div>
        <h2 className="text-lg mb-2">Create a new colony</h2>
        <input type="text" placeholder="Enter colony name..." className="input w-full max-w-xs text-xs" onChange={handleNameChange} value={name} />
        <button className='btn btn-primary ml-2' onClick={createNewColony}>Create</button>
        {state?.status == 'Exception' ? <p className='text-sm text-red-700 mt-4'>Error! Remember you can create only one colony per address.</p> : null}
      </div>
    </>
  );
}

export default CreateColony;