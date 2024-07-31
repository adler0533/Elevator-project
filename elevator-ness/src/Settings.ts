import BuildingFactory from './BuildingFactory';

const milliSecond = 1000

export const SETTINGS = {
    milliSecond: milliSecond,
    elevatorSpeed: 0.5,
    elevatorTravelTime: 0.5 * milliSecond,
    doorOpenTime: 2 * milliSecond,
    elavatorMovement: 110,
  };

  const building1 = BuildingFactory.createBuilding(17, 5);
  const building2 = BuildingFactory.createBuilding(5, 1);
  const building3 = BuildingFactory.createBuilding(7, 3);
  const building4 = BuildingFactory.createBuilding(4, 2);