export default [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
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
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "assignDefenses",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
    "name": "attack",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "buildings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "defenses",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isUpgrading",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "upgradeFinishTimestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimAssaultUnits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimColossusUnits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimResources",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "colony",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
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
      },
      {
        "internalType": "uint256",
        "name": "assaultUnits",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "colossusUnits",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastResourceClaimTimestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
      }
    ],
    "name": "defend",
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
        "internalType": "uint256",
        "name": "_building",
        "type": "uint256"
      }
    ],
    "name": "finishUpgrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastPvpSwitchTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastWarpTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "plasmaTurret",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "target",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastActivationTimestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pvpEnabled",
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
        "internalType": "uint256",
        "name": "_amountAssault",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amountColossus",
        "type": "uint256"
      }
    ],
    "name": "receiveWarp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_building",
        "type": "uint256"
      }
    ],
    "name": "setPlasmaTurretTarget",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_pvpEnabled",
        "type": "bool"
      }
    ],
    "name": "setPvpEnabled",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_building",
        "type": "uint256"
      }
    ],
    "name": "startUpgrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "trainAssaultUnits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "trainColossusUnits",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unitTraining",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "assaultUnitClaimTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "assaultTrainingAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "colossusUnitClaimTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "colossusTrainingAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amountAssault",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amountColossus",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_destination",
        "type": "address"
      }
    ],
    "name": "useWarpGate",
    "outputs": [],
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
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawDefenses",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];