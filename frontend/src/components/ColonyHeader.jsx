import ColonyContext from '../store/ColonyContext';
import ConnectButton from './ConnectButton';
import ResourcesContext from '../store/ResourcesContext';
import energy_image from "../assets/resource_energy.png";
import logo from "../assets/logo.png";
import ore_image from "../assets/resource_ore.png";
import { shortenNumber } from '../util/helpers';
import { useContext } from 'react';
import water_image from "../assets/resource_water.png";

function DisplayResources() {
  const { buildingsInfo, colonyInfo } = useContext(ColonyContext);
  const { energy, water, ore } = useContext(ResourcesContext);

  const assault = colonyInfo?.assaultUnits?.toString();
  const colossus = colonyInfo?.colossusUnits?.toString();

  return (
    <>
      {buildingsInfo && colonyInfo ?
        <>
          <li className='relative mx-2'>
            <img src={energy_image} className="w-full h-full object-cover absolute left-0 top-0 p-0 opacity-40" />
            <div className='absolute left-0 w-full h-full bg-gradient-to-l from-base-300 p-0' />
            <div className="tooltip tooltip-bottom z-50" data-tip={parseInt(energy)}>
              <a><span className='font-bold drop-shadow-xl'>Energy:</span> {shortenNumber(energy)}</a>
            </div>
          </li>
          <li className='relative mx-2'>
            <img src={water_image} className="w-full h-full object-cover absolute left-0 top-0 p-0 opacity-40" />
            <div className='absolute left-0 w-full h-full bg-gradient-to-l from-base-300 p-0' />
            <div className="tooltip tooltip-bottom z-50" data-tip={parseInt(water)}>
              <a><span className='font-bold drop-shadow-xl'>Water:</span> {shortenNumber(water)}</a>
            </div>
          </li>
          <li className='relative mx-2'>
            <img src={ore_image} className="w-full h-full object-cover absolute left-0 top-0 p-0 opacity-40" />
            <div className='absolute left-0 w-full h-full bg-gradient-to-l from-base-300 p-0' />
            <div className="tooltip tooltip-bottom z-50" data-tip={parseInt(ore)}>
              <a><span className='font-bold drop-shadow-xl'>Ore:</span> {shortenNumber(ore)}</a>
            </div>
          </li>
          <div className='flex outline outline-1 outline-red-900 rounded-md ml-8'>
            <li>
              <div className="tooltip tooltip-bottom z-50" data-tip={parseInt(assault)}>
                <a><span className='font-bold'>Assault Units:</span> {shortenNumber(assault)}</a>
              </div>
            </li>
            <li>
              <div className="tooltip tooltip-bottom z-50" data-tip={parseInt(colossus)}>
                <a><span className='font-bold'>Colossus Units:</span> {shortenNumber(colossus)}</a>
              </div>
            </li>
          </div>
        </> :
        <>
          <li>
            <a><span className='font-bold'>Loading...</span></a>
          </li>
        </>
      }

    </>
  )
}

function ColonyHeader() {
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl ml-2">
            <img src={logo} className="w-10 h-10 mr-2 p-0 opacity-80" />
            EtherEmpires
          </a>
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            <DisplayResources />
          </ul>
        </div>
        <div className="navbar-end">
          <ConnectButton />
        </div>
      </div>
    </>
  );
}

export default ColonyHeader;