import { SETTINGS } from "./Settings";
import Floor from "./Floor";
import Elevator from "./Elevator";


// Represents a building with multiple floors and elevators.
export default class Building {
  floors: Floor[] = [];
  elevators: Elevator[] = [];

  buildingDiv: HTMLDivElement = document.createElement("div");
  floorsDiv: HTMLDivElement = document.createElement("div");
  elevatorsDiv: HTMLDivElement = document.createElement("div");

  constructor(numberOfFloors: number, numberOfElevators: number) {
    
    this.createFloors(numberOfFloors);
    this.createElevators(numberOfElevators);

    this.floorsDiv.className = "floors";
    this.elevatorsDiv.className = "shaft";
    this.buildingDiv.className = "building";

    this.buildingDiv.appendChild(this.floorsDiv);
    this.buildingDiv.appendChild(this.elevatorsDiv);

    const screen = document.getElementById("screen");
    if (screen) {
      screen.appendChild(this.buildingDiv);
    }
  }

  private createElevators(numberOfElevators: number) {
    for (let i = 0; i < numberOfElevators; i++) {
      const elevator = new Elevator(i);
      this.elevators.push(elevator);
      this.elevatorsDiv.appendChild(elevator.elevatorDiv);
    }
  }

  private createFloors(numberOfFloors: number) {
    for (let i = 0; i <= numberOfFloors; i++) {
      const floor: Floor = new Floor(i, this.callElevator);
      this.floors.push(floor);
      if (i != 0) {
        this.floorsDiv.appendChild(floor.lineDiv);
      }
      this.floorsDiv.appendChild(floor.floorDiv);
    }
  }

  /**
   * Chooses the most appropriate elevator for a call from a specific floor.
   * @param floorNum - The floor number from which the elevator was called.
   * @param currentTime - The current time (in milliseconds).
   * @returns The chosen elevator.
   */
  public chooseElevator(floorNum: number, currentTime: number): Elevator {
    let minTime: number = Infinity;
    let elevatorID: number = 0;
    for (let elevator of this.elevators) {
      const currentMin =
        Math.abs(elevator.destination - floorNum) * SETTINGS.elevatorTravelTime +
        (currentTime > elevator.timer ? 0 : elevator.timer - currentTime);
      if (currentMin < minTime) {
        minTime = currentMin;
        elevatorID = elevator.ID;
      }
    }
    const elevator = this.elevators[elevatorID];
    return elevator;
  }

  /**
   * Handles an elevator call from a specific floor.
   * @param floorNumber - The floor number from which the elevator was called.
   */
  callElevator = (floorNumber: number) => {
    let currentTime: number = Date.now();

    const choosenElevator: Elevator = this.chooseElevator(
      floorNumber,
      currentTime
    );
    let gap = Math.abs(choosenElevator.destination - floorNumber);
    const arrivalTime = currentTime + (gap * SETTINGS.elevatorTravelTime + SETTINGS.doorOpenTime);
    const totalTime =
      arrivalTime +
      (currentTime > choosenElevator.timer
        ? 0
        : choosenElevator.timer - currentTime);
    const timerTime = Math.ceil(
      arrivalTime -
        SETTINGS.doorOpenTime +
        (currentTime > choosenElevator.timer
          ? 0
          : choosenElevator.timer - currentTime)
    );
    choosenElevator.destination = floorNumber;
    if (currentTime > choosenElevator.timer) {
      choosenElevator.move(floorNumber, this.freeFloor);
      choosenElevator.timer = arrivalTime;
    } else {
      setTimeout(() => {
        choosenElevator.move(floorNumber, this.freeFloor);
      }, choosenElevator.timer - currentTime);
      choosenElevator.timer = totalTime;
    }

    this.floors[floorNumber].startTimer(timerTime);
  };
  freeFloor = (floorNumber: number) => {
    this.floors[floorNumber].button.style.color = "hsla(0, 0%, 20%, 1)";
    this.floors[floorNumber].isWaiting = false;
    this.floors[floorNumber].expectedTime = null;
  };
}
