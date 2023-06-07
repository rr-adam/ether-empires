export default [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_squad1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_squad2",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_squad3",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_target",
        "type": "address"
      }
    ],
    "name": "attackColony",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "stolenEnergy",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stolenWater",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stolenOre",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "assaultsLeft",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_subject",
        "type": "address"
      }
    ],
    "name": "checkColony",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_colonyName",
        "type": "string"
      }
    ],
    "name": "createColony",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_building",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_level",
        "type": "uint256"
      }
    ],
    "name": "getUpgradeRequirements",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "energy",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "water",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ore",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
];