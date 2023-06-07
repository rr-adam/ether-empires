import { useEthers } from '@usedapp/core';

function ConnectButton() {
  const { account, activateBrowserWallet } = useEthers();

  if (account) {
    return (
      <>
        <button className='btn btn-outline'>{account.slice(0, 8)}...</button>
      </>
    );
  }
  else {
    return (
      <>
        <button className='btn btn-primary' onClick={activateBrowserWallet}>Connect wallet</button>
      </>
    );
  }
}

export default ConnectButton;