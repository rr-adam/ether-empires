import LeftPanel from './components/Colony/LeftPanel';
import colony from './assets/colony.png'

function Colony({ setColonyAddress }) {
  return (
    <>
      <div className="left h-full top-16 left-0 w-1/4 p-4">
        <LeftPanel setColonyAddress={setColonyAddress} />
      </div>
      <div className="right flex flex-1">
        <div className="w-3/4 flex-1 h-full overflow-hidden relative">
          <div className="overlay h-full w-1/4 absolute left-0 top-0 bg-gradient-to-r from-base-100"></div>
          <img src={colony} alt="colony view" className='w-full h-full object-cover object-center' />
        </div>
      </div>
    </>
  )
}

export default Colony;