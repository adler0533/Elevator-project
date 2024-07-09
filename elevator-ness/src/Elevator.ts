import { SETTINGS } from "./Settings";
import type { IElevator } from './Interface';

// Represents an elevator in a building.
export default class Elevator implements IElevator {
  ID: number;
  currentFloor: number = 0;
  destination: number = 0;
  timer: number = 0;

  elevatorDiv: HTMLImageElement = document.createElement("img");
  audio: HTMLAudioElement = document.createElement("audio");

  /**
   * Creates a new instance of an elevator.
   * @param id - The unique identifier of the elevator.
   */
  constructor(id: number) {
    this.ID = id;

    this.elevatorDiv.src = "./elevator.png";
    this.elevatorDiv.className = "elevator";

    this.audio.src = "./ding.mp3";
    this.audio.controls = true;
  }

  /**
  * Moves the elevator to a requested floor.
  * @param floorRequest - The number of the requested floor.
  * @param freeElevator - Callback function to be called when the elevator reaches its destination.
  */
  move = (
    floorRequest: number,
    freeElevator: (floorNumber: number) => void
  ) => {
    let gap = Math.abs(this.currentFloor - floorRequest);
    this.elevatorDiv.style.transition = `transform ${
      gap * SETTINGS.elevatorSpeed
    }s ease`;
    this.elevatorDiv.style.transform = `translateY(${
      -floorRequest * SETTINGS.elavatorMovement
    }px)`;
    this.currentFloor = floorRequest;
    setTimeout(() => {
      this.audio.currentTime = 0;
      this.audio.play();
      setTimeout(() => {
        freeElevator(floorRequest);
      }, SETTINGS.doorOpenTime);
    }, gap * SETTINGS.elevatorTravelTime);
  };
}
