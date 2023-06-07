function getUpgradeRequirements(_building, _level) {
  if (_building < 0 || _building > 8 || _level <= 0 || _level > 20) {
    throw new Error("Incorrect input");
  }
  // Nexus
  if (_building === 0) {
    const requiredEnergy = _level * _level * 350;
    const requiredWater = _level * _level * 250;
    const requiredOre = _level * _level * 500;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Solar Collector
  else if (_building === 1) {
    const requiredEnergy = _level * _level * 150;
    const requiredWater = _level * _level * 50;
    const requiredOre = _level * _level * 450;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Water Reclamation Center
  else if (_building === 2) {
    const requiredEnergy = _level * _level * 250;
    const requiredWater = _level * _level * 150;
    const requiredOre = _level * _level * 250;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Ore Extractor
  else if (_building === 3) {
    const requiredEnergy = _level * _level * 150;
    const requiredWater = _level * _level * 250;
    const requiredOre = _level * _level * 150;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Offensive Training Facility
  else if (_building === 4) {
    const requiredEnergy = _level * _level * 250;
    const requiredWater = _level * _level * 450;
    const requiredOre = _level * _level * 500;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Defensive Training Facility
  else if (_building === 5) {
    const requiredEnergy = _level * _level * 300;
    const requiredWater = _level * _level * 450;
    const requiredOre = _level * _level * 450;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Shield Generator
  else if (_building === 6) {
    const requiredEnergy = _level * _level * 1350;
    const requiredWater = _level * _level * 350;
    const requiredOre = _level * _level * 900;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Plasma Turret
  else if (_building === 7) {
    const requiredEnergy = _level * _level * 1200;
    const requiredWater = _level * _level * 550;
    const requiredOre = _level * _level * 600;

    return [requiredEnergy, requiredWater, requiredOre];
  }
  // Warp Gate
  else {
    const requiredEnergy = _level * _level * 1450;
    const requiredWater = _level * _level * 550;
    const requiredOre = _level * _level * 1400;

    return [requiredEnergy, requiredWater, requiredOre];
  }
}

const shortenNumber = (numberString) => {
  const number = parseInt(numberString);
  if (number >= 1e9) return `${(number / 1e9).toFixed(1)}b`;
  if (number >= 1e6) return `${(number / 1e6).toFixed(1)}m`;
  if (number >= 1e3) return `${(number / 1e3).toFixed(1)}k`;
  return number.toFixed(0);
};

const remainingTimeCountdownString = (remainingTimeInSeconds) => {
  let remainingTimeCountdown;

  const days = Math.floor(remainingTimeInSeconds / (60 * 60 * 24));
  const hours = Math.floor((remainingTimeInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingTimeInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(remainingTimeInSeconds % 60);

  // readable format
  remainingTimeCountdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  return remainingTimeCountdown;
}

export { getUpgradeRequirements, shortenNumber, remainingTimeCountdownString };