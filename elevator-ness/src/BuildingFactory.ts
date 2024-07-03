import Building from './Building';

export default class BuildingFactory {
  static createBuilding(numberOfFloors: number, numberOfElevators: number): Building {
    return new Building(numberOfFloors, numberOfElevators);
  }
}

