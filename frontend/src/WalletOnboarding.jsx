import ConnectButton from './components/ConnectButton';
import Window from './components/UI/Window';

function WalletOnboarding() {
  return (
    <>
      <div className='fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen max-w-4xl'>
        <Window>
          <div className='p-6'>
            <p className='text-xl mb-3'>Please connect your wallet to continue.</p>
            <p className="text-gray-500 mb-12">
              This is a decentralized game, so in order for it to work you need to connect a wallet, for example Metamask.
            </p>
            <ConnectButton />
          </div>
        </Window>
      </div>
    </>
  )
}

export default WalletOnboarding;