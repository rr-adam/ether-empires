import BuildingsList from './BuildingsList';
import ColonyInfo from './ColonyInfo';
import Window from '../UI/Window';
import { useState } from 'react';

function LeftPanel({ setColonyAddress }) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Window>
        <div className="flex flex-col h-full">
          <div className="tabs border-b border-slate-600">
            <a className={'tab tab-lg tab-lifted ' + (tab == 0 ? 'tab-active' : '')} onClick={() => setTab(0)}>Colony</a>
            <a className={'tab tab-lg tab-lifted ' + (tab == 1 ? 'tab-active' : '')} onClick={() => setTab(1)}>Buildings</a>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            {tab == 0 ? <ColonyInfo setColonyAddress={setColonyAddress} /> : <BuildingsList />}
          </div>
        </div>
      </Window>
    </>
  );
}

export default LeftPanel;