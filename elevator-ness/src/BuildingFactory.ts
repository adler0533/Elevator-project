import Building from './Building';

export default class BuildingFactory {
  static createBuilding(numberOfFloors: number, numberOfElevators: number): Building {
    return new Building(numberOfFloors, numberOfElevators);
  }
}

const building1 = BuildingFactory.createBuilding(20, 3);
const building2 = BuildingFactory.createBuilding(5, 1);