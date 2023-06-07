// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Colony.sol";
import "hardhat/console.sol";

contract EtherEmpires {
    mapping(address => bool) isColony; // true for addresses that are colony contracts
    mapping(address => bool) hasColony; // true for adresses that created a colony with this contract
    address[] allColonies;

    constructor() {}

    function checkColony(address _subject) public view returns (bool) {
        return isColony[_subject];
    }

    function createColony(string memory _colonyName) public returns (address) {
        require(!hasColony[msg.sender], "Colony limit");
        Colony newColony = new Colony(msg.sender, _colonyName);
        allColonies.push(address(newColony));
        isColony[address(newColony)] = true;
        hasColony[msg.sender] = true;

        return address(newColony);
    }

    function attackColony(
        uint _squad1,
        uint _squad2,
        uint _squad3,
        address _target
    )
        external
        returns (
            uint stolenEnergy,
            uint stolenWater,
            uint stolenOre,
            uint assaultsLeft
        )
    {
        require(Colony(msg.sender).pvpEnabled());
        require(Colony(_target).pvpEnabled());
        require(isColony[msg.sender]);
        require(isColony[_target]);
        require(msg.sender != _target);
        require(Colony(msg.sender).owner() != Colony(_target).owner());

        (stolenEnergy, stolenWater, stolenOre, assaultsLeft) = Colony(_target)
            .defend(_squad1, _squad2, _squad3);
    }

    function getUpgradeRequirements(
        uint _building,
        uint _level
    ) public pure returns (uint energy, uint water, uint ore) {
        require(_building >= 0 && _building <= 8 && _level > 0 && _level <= 20);
        // Nexus
        if (_building == 0) {
            uint requiredEnergy = _level * _level * 350;
            uint requiredWater = _level * _level * 250;
            uint requiredOre = _level * _level * 500;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Solar Collector
        else if (_building == 1) {
            uint requiredEnergy = _level * _level * 150;
            uint requiredWater = _level * _level * 50;
            uint requiredOre = _level * _level * 450;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Water Reclamation Center
        else if (_building == 2) {
            uint requiredEnergy = _level * _level * 250;
            uint requiredWater = _level * _level * 150;
            uint requiredOre = _level * _level * 250;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Ore Extractor
        else if (_building == 3) {
            uint requiredEnergy = _level * _level * 150;
            uint requiredWater = _level * _level * 250;
            uint requiredOre = _level * _level * 150;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Offensive Training Facility
        else if (_building == 4) {
            uint requiredEnergy = _level * _level * 250;
            uint requiredWater = _level * _level * 450;
            uint requiredOre = _level * _level * 500;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Defensive Training Facility
        else if (_building == 5) {
            uint requiredEnergy = _level * _level * 300;
            uint requiredWater = _level * _level * 450;
            uint requiredOre = _level * _level * 450;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Shield Generator
        else if (_building == 6) {
            uint requiredEnergy = _level * _level * 1350;
            uint requiredWater = _level * _level * 350;
            uint requiredOre = _level * _level * 900;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Plasma Turret
        else if (_building == 7) {
            uint requiredEnergy = _level * _level * 1200;
            uint requiredWater = _level * _level * 550;
            uint requiredOre = _level * _level * 600;

            return (requiredEnergy, requiredWater, requiredOre);
        }
        // Warp Gate
        else {
            uint requiredEnergy = _level * _level * 1450;
            uint requiredWater = _level * _level * 550;
            uint requiredOre = _level * _level * 1400;

            return (requiredEnergy, requiredWater, requiredOre);
        }
    }
}
