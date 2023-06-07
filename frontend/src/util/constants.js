import building0 from '../assets/building0.png';
import building1 from '../assets/building1.png';
import building2 from '../assets/building2.png';
import building3 from '../assets/building3.png';
import building4 from '../assets/building4.png';
import building5 from '../assets/building5.png';
import building6 from '../assets/building6.png';
import building7 from '../assets/building7.png';
import building8 from '../assets/building8.png';

// SET THE CONSTANTS BELOW:
// --------------------------------------------------------------------------

const etherEmpiresAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const multicallAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

// --------------------------------------------------------------------------

const buildings = [
  { id: 0, name: 'Nexus', description: 'The central hub of your colony.', coverImage: building0 },
  { id: 1, name: 'Solar Collector', description: 'Produces energy for your colony.', coverImage: building1 },
  { id: 2, name: 'Water Reclamation Center', description: 'Produces water for your colony.', coverImage: building2 },
  { id: 3, name: 'Ore Extractor', description: 'Produces ore for your colony.', coverImage: building3 },
  { id: 4, name: 'Offensive Training Facility', description: 'Train assault units here.', coverImage: building4 },
  { id: 5, name: 'Defensive Training Facility', description: 'Train colossus units here.', coverImage: building5 },
  { id: 6, name: 'Shield Generator', description: 'Increases colony defenses.', coverImage: building6 },
  { id: 7, name: 'Plasma Turret', description: 'Can be used to defend one of the production buildings.', coverImage: building7 },
  { id: 8, name: 'Warp Gate', description: 'Allows you to send units to another colony owned by you.', coverImage: building8 }
];

export { buildings, etherEmpiresAddress, multicallAddress };