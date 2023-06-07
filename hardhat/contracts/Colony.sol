// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./EtherEmpires.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Colony is Ownable {
    struct Building {
        uint level;
        uint defenses;
        bool isUpgrading;
        uint upgradeFinishTimestamp;
    }

    struct ColonyInfo {
        string name; // name of your colony
        uint energy; // resources
        uint water;
        uint ore;
        uint assaultUnits; // your offensive units
        uint colossusUnits; // your defensive units
        uint lastResourceClaimTimestamp; // time of the last resource claim
    }

    struct UnitTraining {
        uint assaultUnitClaimTimestamp;
        uint assaultTrainingAmount;
        uint colossusUnitClaimTimestamp;
        uint colossusTrainingAmount;
    }

    struct PlasmaTurret {
        uint target; // which building is the plasma turret defending, 1: Solar Extractor, 2: Water Reclamation Center, 3: Ore Extractor
        uint lastActivationTimestamp; // last time you activated the plasma turret
    }

    // Buildings array
    // 0 - Nexus
    // 1 - Solar Collector: produces Energy
    // 2 - Water Reclamation Center: produces Water
    // 3 - Ore Extractor: produces Ore
    // 4 - Offensive Training Facility: you can train Assault units here
    // 5 - Defensive Training Facility: you can train Colossus units here
    // 6 - Shield Generator: increases colony defenses
    // 7 - Plasma Turret: can be used to defend one of the production buildings
    // 8 - Warp Gate: allows you to send units to another colony owned by you
    Building[9] public buildings;
    ColonyInfo public colony;

    UnitTraining public unitTraining;
    PlasmaTurret public plasmaTurret;

    uint public lastWarpTimestamp; // last time you activated the Warp Gate

    bool public pvpEnabled = false; // PvP is disabled by default
    uint public lastPvpSwitchTimestamp; // PvP can be changed with a 7 day delay

    address etherEmpires;

    constructor(address _user, string memory _name) {
        transferOwnership(_user);
        colony.name = _name;
        colony.energy = 12200;
        colony.water = 12300;
        colony.ore = 12300;
        colony.colossusUnits = 2000;
        colony.lastResourceClaimTimestamp = block.timestamp;

        // Nexus and production buildings initial level
        buildings[0].level = 1;
        buildings[1].level = 1;
        buildings[2].level = 1;
        buildings[3].level = 1;

        etherEmpires = msg.sender;
    }

    function claimResources() public onlyOwner {
        uint startDate = colony.lastResourceClaimTimestamp;
        uint endDate = block.timestamp;

        uint timePassed = endDate - startDate;

        uint energyRate = (buildings[1].level * buildings[1].level) / 3 + 3;
        uint waterRate = (buildings[2].level * buildings[2].level) / 3 + 3;
        uint oreRate = (buildings[3].level * buildings[3].level) / 3 + 3;

        colony.energy += (timePassed / 60) * energyRate;
        colony.water += (timePassed / 60) * waterRate;
        colony.ore += (timePassed / 60) * oreRate;

        colony.lastResourceClaimTimestamp = block.timestamp;
    }

    function trainAssaultUnits(uint _amount) public onlyOwner {
        require(unitTraining.assaultTrainingAmount == 0, "Already training");
        require(_amount > 0, "Incorrect amount");
        uint energyCost = 6 * _amount;
        uint waterCost = 4 * _amount;

        claimResources();

        require(
            colony.energy >= energyCost && colony.water >= waterCost,
            "Not enough resources"
        );

        colony.energy -= energyCost;
        colony.water -= waterCost;

        unitTraining.assaultTrainingAmount = _amount;
        unitTraining.assaultUnitClaimTimestamp =
            block.timestamp +
            ((_amount * 2 minutes) / buildings[4].level);
    }

    function claimAssaultUnits() public onlyOwner {
        require(unitTraining.assaultTrainingAmount > 0, "No training");
        require(
            block.timestamp >= unitTraining.assaultUnitClaimTimestamp,
            "Not finished"
        );

        colony.assaultUnits += unitTraining.assaultTrainingAmount;
        unitTraining.assaultTrainingAmount = 0;
    }

    function trainColossusUnits(uint _amount) public onlyOwner {
        require(unitTraining.colossusTrainingAmount == 0, "Already training");
        require(_amount > 0, "Incorrect amount");
        uint oreCost = 3 * _amount;
        uint waterCost = 5 * _amount;

        claimResources();

        require(
            colony.ore >= oreCost && colony.water >= waterCost,
            "Not enough resources"
        );

        colony.ore -= oreCost;
        colony.water -= waterCost;

        unitTraining.colossusTrainingAmount = _amount;
        unitTraining.colossusUnitClaimTimestamp =
            block.timestamp +
            ((_amount * 3 minutes) / buildings[5].level);
    }

    function claimColossusUnits() public onlyOwner {
        require(unitTraining.colossusTrainingAmount > 0, "No training");
        require(
            block.timestamp >= unitTraining.colossusUnitClaimTimestamp,
            "Not finished"
        );

        colony.colossusUnits += unitTraining.colossusTrainingAmount;
        unitTraining.colossusTrainingAmount = 0;
    }

    function assignDefenses(uint _building, uint _amount) public onlyOwner {
        require(_building >= 0 && _building <= 3, "Target error");
        require(colony.colossusUnits >= _amount);

        buildings[_building].defenses += _amount;
        colony.colossusUnits -= _amount;
    }

    function withdrawDefenses(uint _building, uint _amount) public onlyOwner {
        require(buildings[_building].defenses >= _amount);

        colony.colossusUnits += _amount;
        buildings[_building].defenses -= _amount;
    }

    function startUpgrade(uint _building) public onlyOwner {
        require(buildings[_building].level < 20, "Building at max level");
        if (_building != 0) {
            require(
                buildings[0].level > buildings[_building].level,
                "Upgrade your Nexus"
            );
        }
        (
            uint energyRequired,
            uint waterRequired,
            uint oreRequired
        ) = EtherEmpires(etherEmpires).getUpgradeRequirements(
                _building,
                buildings[_building].level + 1
            );

        claimResources();

        require(
            colony.energy >= energyRequired &&
                colony.water >= waterRequired &&
                colony.ore >= oreRequired,
            "Not enough resources"
        );

        colony.energy -= energyRequired;
        colony.water -= waterRequired;
        colony.ore -= oreRequired;

        uint buildingTime = (buildings[_building].level + 1) ** 3 *
            1 minutes +
            2 minutes;
        uint buildingFinishDate = block.timestamp + buildingTime;

        buildings[_building].isUpgrading = true;
        buildings[_building].upgradeFinishTimestamp = buildingFinishDate;
    }

    function finishUpgrade(uint _building) public onlyOwner {
        require(buildings[_building].isUpgrading, "Building not upgrading");
        require(
            block.timestamp >= buildings[_building].upgradeFinishTimestamp,
            "Upgrading not finished yet"
        );

        claimResources();

        buildings[_building].isUpgrading = false;
        buildings[_building].level++;
    }

    function setPlasmaTurretTarget(uint _building) public onlyOwner {
        require(buildings[7].level > 0, "Not available");
        require(_building >= 1 && _building <= 3, "Target");

        // activation cost
        uint energyCost = buildings[7].level * 200;

        claimResources();

        require(colony.energy >= energyCost, "Not enough energy");

        plasmaTurret.target = _building;
        plasmaTurret.lastActivationTimestamp = block.timestamp;
    }

    function useWarpGate(
        uint _amountAssault,
        uint _amountColossus,
        address _destination
    ) public onlyOwner {
        require(
            EtherEmpires(etherEmpires).checkColony(_destination),
            "Not a colony"
        );
        require(Colony(_destination).owner() == owner(), "Not your colony");
        require(colony.assaultUnits >= _amountAssault, "No assault");
        require(colony.colossusUnits >= _amountColossus, "No colossus");

        uint assaultMaxAmount = buildings[8].level * 1000;
        uint colossusMaxAmount = buildings[8].level * 1000;

        require(_amountAssault <= assaultMaxAmount, "Assault limit");
        require(_amountColossus <= colossusMaxAmount, "Colossus limit");

        uint nextPossibleWarpTime = lastWarpTimestamp +
            (30 days / buildings[8].level);

        require(block.timestamp >= nextPossibleWarpTime, "Not ready");

        lastWarpTimestamp = block.timestamp;

        colony.assaultUnits -= _amountAssault;
        colony.colossusUnits -= _amountColossus;
        Colony(_destination).receiveWarp(_amountAssault, _amountColossus);
    }

    function receiveWarp(uint _amountAssault, uint _amountColossus) public {
        require(
            EtherEmpires(etherEmpires).checkColony(msg.sender),
            "Not a colony"
        );
        require(Colony(msg.sender).owner() == owner(), "Not your colony");

        colony.assaultUnits += _amountAssault;
        colony.colossusUnits += _amountColossus;
    }

    function attack(
        uint _squad1,
        uint _squad2,
        uint _squad3,
        address _target
    ) public onlyOwner {
        uint attackPower = _squad1 + _squad2 + _squad3;
        require(colony.assaultUnits >= attackPower, "No assault");
        (
            uint stolenEnergy,
            uint stolenWater,
            uint stolenOre,
            uint assaultsLeft
        ) = EtherEmpires(etherEmpires).attackColony(
                _squad1,
                _squad2,
                _squad3,
                _target
            );

        colony.assaultUnits = assaultsLeft;
        colony.energy += stolenEnergy;
        colony.water += stolenWater;
        colony.ore += stolenOre;
    }

    function setPvpEnabled(bool _pvpEnabled) public onlyOwner {
        require(
            block.timestamp >= lastPvpSwitchTimestamp + 7 days,
            "Cant change yet"
        );
        lastPvpSwitchTimestamp = block.timestamp;
        pvpEnabled = _pvpEnabled;
    }

    function defend(
        uint _squad1,
        uint _squad2,
        uint _squad3
    )
        external
        returns (
            uint stolenEnergy,
            uint stolenWater,
            uint stolenOre,
            uint assaultsLeft
        )
    {
        require(msg.sender == etherEmpires);
        require(
            _squad1 >= 0 && _squad2 >= 0 && _squad3 >= 0,
            "Incorrect squad"
        );

        // First unassigned colossus units defend, with defender disadvantage
        uint attackPower = _squad1 + _squad2 + _squad3;
        require(attackPower > 0, "No assault");

        // So that resources can't be hidden from attacker by not claiming them
        claimResources();

        (, _squad1) = _calculateFight(colony.colossusUnits / 3, _squad1);
        (, _squad2) = _calculateFight(colony.colossusUnits / 3, _squad2);
        (, _squad3) = _calculateFight(colony.colossusUnits / 3, _squad3);

        colony.colossusUnits -= (colony.colossusUnits * 5) / 100;

        // Then assigned colossus units defend buildings, with defender advantage
        // shield generator supports defending units in this fight

        uint bonusShield = buildings[6].level * buildings[6].level * 150;
        uint defenses1 = buildings[1].defenses + bonusShield;
        uint defenses2 = buildings[2].defenses + bonusShield;
        uint defenses3 = buildings[3].defenses + bonusShield;

        // If Plasma Turret is active it will defend selected building
        if (
            buildings[7].level > 0 &&
            block.timestamp <=
            plasmaTurret.lastActivationTimestamp +
                (2 hours * buildings[7].level)
        ) {
            if (plasmaTurret.target == 1)
                defenses1 += buildings[7].level * buildings[7].level * 5000;
            if (plasmaTurret.target == 2)
                defenses2 += buildings[7].level * buildings[7].level * 5000;
            if (plasmaTurret.target == 3)
                defenses3 += buildings[7].level * buildings[7].level * 5000;
        }

        if (_squad1 > 0) {
            (defenses1, _squad1) = _calculateFight(defenses1, _squad1);
        }

        if (_squad2 > 0) {
            (defenses2, _squad2) = _calculateFight(defenses2, _squad2);
        }

        if (_squad3 > 0) {
            (defenses3, _squad3) = _calculateFight(defenses3, _squad3);
        }

        // Check if attack was successful, calculate stolen resources
        if (_squad1 > buildings[1].defenses) {
            uint energyLoss = (_squad1 - buildings[1].defenses) *
                buildings[1].level *
                10;
            stolenEnergy = energyLoss > colony.energy
                ? colony.energy
                : energyLoss; // Take only what is available
        }

        // Calculate stolen water
        if (_squad2 > buildings[2].defenses) {
            uint waterLoss = (_squad2 - buildings[2].defenses) *
                buildings[2].level *
                10;
            stolenWater = waterLoss > colony.water ? colony.water : waterLoss; // Take only what is available
        }

        // Calculate stolen ore
        if (_squad3 > buildings[3].defenses) {
            uint oreLoss = (_squad3 - buildings[3].defenses) *
                buildings[3].level *
                10;
            stolenOre = oreLoss > colony.ore ? colony.ore : oreLoss; // Take only what is available
        }

        colony.energy -= stolenEnergy;
        colony.water -= stolenWater;
        colony.ore -= stolenOre;

        assaultsLeft = _squad1 + _squad2 + _squad3;
    }

    function _calculateFight(
        uint _defenders,
        uint _attackers
    ) private pure returns (uint, uint) {
        uint defendPower = ((_defenders * 1000) / _attackers);
        if ((_attackers * defendPower) / 1000 >= _attackers) {
            // squad wiped
            _attackers = 0;
        } else {
            _attackers -= (_attackers * defendPower) / 1000;
        }
        _defenders -= (_defenders * 20) / 100;
        return (_defenders, _attackers);
    }
}
