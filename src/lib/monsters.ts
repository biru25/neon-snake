
// Array of monster data with images
export type Monster = {
  id: number;
  name: string;
  image: string;
};

export const monsters: Monster[] = [
  {
    id: 1,
    name: "Purple Blob",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='50' rx='40' ry='30' fill='%23A78BFA'/%3E%3Ccircle cx='40' cy='40' r='5' fill='white'/%3E%3Ccircle cx='60' cy='40' r='5' fill='white'/%3E%3Ccircle cx='40' cy='40' r='2' fill='black'/%3E%3Ccircle cx='60' cy='40' r='2' fill='black'/%3E%3Cpath d='M40 60 Q50 70 60 60' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E"
  },
  {
    id: 2,
    name: "Robo Friend",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect x='25' y='20' width='50' height='60' rx='5' fill='%23C4B5FD'/%3E%3Crect x='35' y='10' width='30' height='10' rx='3' fill='%23A78BFA'/%3E%3Ccircle cx='40' cy='40' r='8' fill='white'/%3E%3Ccircle cx='60' cy='40' r='8' fill='white'/%3E%3Ccircle cx='40' cy='40' r='3' fill='black'/%3E%3Ccircle cx='60' cy='40' r='3' fill='black'/%3E%3Crect x='40' y='60' width='20' height='5' rx='2' fill='%23475569'/%3E%3Crect x='15' y='40' width='10' height='20' rx='3' fill='%23A78BFA'/%3E%3Crect x='75' y='40' width='10' height='20' rx='3' fill='%23A78BFA'/%3E%3C/svg%3E"
  },
  {
    id: 3,
    name: "Mountain Ox",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='50' rx='40' ry='30' fill='%23A16207'/%3E%3Cpath d='M20 30 L35 15 L35 30' fill='%23854D0E'/%3E%3Cpath d='M80 30 L65 15 L65 30' fill='%23854D0E'/%3E%3Ccircle cx='35' cy='40' r='5' fill='white'/%3E%3Ccircle cx='65' cy='40' r='5' fill='white'/%3E%3Ccircle cx='35' cy='40' r='2' fill='black'/%3E%3Ccircle cx='65' cy='40' r='2' fill='black'/%3E%3Cpath d='M40 60 Q50 65 60 60' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E"
  },
  {
    id: 4,
    name: "Pixel Ghost",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFD166'/%3E%3Ccircle cx='50' cy='40' r='20' fill='white'/%3E%3Ccircle cx='42' cy='35' r='5' fill='black'/%3E%3Ccircle cx='58' cy='35' r='5' fill='black'/%3E%3Cpath d='M35 60 Q50 70 65 60' stroke='black' stroke-width='3' fill='none'/%3E%3Cpath d='M25 80 L35 60 L45 80 L55 60 L65 80 L75 60' fill='%23FFD166' stroke='%23FFD166' stroke-width='1'/%3E%3C/svg%3E"
  },
  {
    id: 5,
    name: "Slime",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='50' rx='40' ry='30' fill='%2306D6A0'/%3E%3Ccircle cx='40' cy='40' r='5' fill='white'/%3E%3Ccircle cx='60' cy='40' r='5' fill='white'/%3E%3Ccircle cx='40' cy='40' r='2' fill='black'/%3E%3Ccircle cx='60' cy='40' r='2' fill='black'/%3E%3Cpath d='M40 60 Q50 70 60 60' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E"
  },
  {
    id: 6,
    name: "Fire Spirit",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 L60 30 L80 20 L70 40 L90 50 L70 60 L80 80 L60 70 L50 90 L40 70 L20 80 L30 60 L10 50 L30 40 L20 20 L40 30 Z' fill='%23EF476F'/%3E%3Ccircle cx='40' cy='45' r='5' fill='white'/%3E%3Ccircle cx='60' cy='45' r='5' fill='white'/%3E%3Ccircle cx='40' cy='45' r='2' fill='black'/%3E%3Ccircle cx='60' cy='45' r='2' fill='black'/%3E%3Cpath d='M40 60 Q50 70 60 60' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E"
  },
  {
    id: 7,
    name: "Rock Monster",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpolygon points='20,20 80,20 90,50 80,80 20,80 10,50' fill='%23a0a0a0'/%3E%3Ccircle cx='40' cy='40' r='8' fill='white'/%3E%3Ccircle cx='60' cy='40' r='8' fill='white'/%3E%3Ccircle cx='40' cy='40' r='3' fill='black'/%3E%3Ccircle cx='60' cy='40' r='3' fill='black'/%3E%3Cpath d='M35 60 Q50 70 65 60' stroke='%23606060' stroke-width='3' fill='none'/%3E%3C/svg%3E"
  },
  {
    id: 8,
    name: "Water Blob",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%2326C6DA'/%3E%3Ccircle cx='35' cy='40' r='5' fill='white'/%3E%3Ccircle cx='65' cy='40' r='5' fill='white'/%3E%3Ccircle cx='35' cy='40' r='2' fill='black'/%3E%3Ccircle cx='65' cy='40' r='2' fill='black'/%3E%3Cpath d='M40 60 Q50 65 60 60' stroke='white' stroke-width='2' fill='none'/%3E%3Cpath d='M20 50 Q30 45 40 50' fill='%2326C6DA' stroke='%2318A1B5' stroke-width='1'/%3E%3Cpath d='M60 50 Q70 45 80 50' fill='%2326C6DA' stroke='%2318A1B5' stroke-width='1'/%3E%3C/svg%3E"
  }
];

// Get a subset of monsters based on level (for difficulty scaling)
export const getMonstersByLevel = (level: number): Monster[] => {
  // For easier levels, use fewer monsters
  const baseCount = Math.min(3 + Math.floor(level / 2), 8);
  return monsters.slice(0, baseCount);
};
