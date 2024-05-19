import { SETTINGS } from "./Settings";
import Floor from "./Floor";
import Elevator from "./Elevator";

export default class Building {
  floors: Floor[] = [];
  elevators: Elevator[] = [];

  buldingDiv: HTMLDivElement = document.createElement("div");
  floorsDiv: HTMLDivElement = document.createElement("div");
  elevatorsDiv: HTMLDivElement = document.createElement("div");

  constructor(numberOfFloors: number, numberOfElevators: number) {
    for (let i = 0; i <= numberOfFloors; i++) {
      const floor: Floor = new Floor(i, this.callElevator);
      this.floors.push(floor);
      if (i != 0) {
        this.floorsDiv.appendChild(floor.lineDiv);
      }
      this.floorsDiv.appendChild(floor.floorDiv);
    }
    this.floorsDiv.className = "floors";

    for (let i = 0; i < numberOfElevators; i++) {
      const elevators = new Elevator(i);
      this.elevators.push(elevators);
      this.elevatorsDiv.appendChild(elevators.elevatorDiv);
    }
    this.elevatorsDiv.className = "shaft";

    this.buldingDiv.className = "building";

    this.buldingDiv.appendChild(this.floorsDiv);
    this.buldingDiv.appendChild(this.elevatorsDiv);

    const screen = document.getElementById("screen");
    if (screen) {
      screen.appendChild(this.buldingDiv);
    }
  }

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
