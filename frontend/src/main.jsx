import './index.css'

import { DAppProvider, Goerli, Hardhat } from '@usedapp/core'

import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { getDefaultProvider } from 'ethers'
import { multicallAddress } from './util/constants'

const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Hardhat.chainId]: 'http://127.0.0.1:8545',
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
  multicallAddresses: {
    [Hardhat.chainId]: multicallAddress,
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
)
