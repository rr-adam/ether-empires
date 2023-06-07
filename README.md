# EtherEmpires

This is a simple strategy game where each player colony is a separate smart contract on the network.
The goal is to build a prospering space colony that has a lot of resources and military units.

## Features

- Creating new colonies and loading existing ones
- Time based resource management
- Upgrading and managing buildings
- Training offensive and defensive units
- PvP colony fights

## Todo

- Frontend could use more polishing and responsiveness 
- Add colony attack feature to the frontend
- Rework colony attack/defense mechanism to make it more interesting

## Gallery

# Running the project locally

The project can be launched on localhost by utilizing local hardhat network.

## 1. Hardhat setup

In the `hardhat` folder:

```shell
# install dependencies
npm run install

# start local hardhat node (keep the process running in the background)
npm run hardhat

# deploy the contracts on the local hardhat network
npm run deploy-localhost
```

The deployment script will print addresses of main EtherEmpires contract and a Multicall contract, save them.

## 2. Frontend setup

In the `frontend` folder:

You need to set the `etherEmpiresAddress` and `multicallAddress` constants with values you saved in the previous step.
Go to `frontend/src/util/constants.js` and set the values.

Now you can launch the frontend:

```shell
# install dependencies
npm run install

# start local server
npm run dev
```

## 3. Wallet setup

To launch the project locally you need a EVM compatible wallet, like Metamask, where you can add custom networks.
You can learn more about the local hardhat network here: https://hardhat.org/hardhat-network/docs/overview

### Add this local network:
Network name: Hardhat Network
RPC URL: http://127.0.0.1:8545
Chain Id: 31337
Currency Symbol: ETH

### Import Hardhat development account
Use one of the default Hardhat accounts to test the project, when launching the local node Hardhat will display list of accounts that have their addresses and private keys shown.
The accounts are topped up with 10000 ETH and can be used to interact with the locally deployed game.

### Additional info
Colonies have a lot of resources in the beginning but this can be adjusted in the `Colony.sol` constructor.
