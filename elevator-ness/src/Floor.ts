import { SETTINGS } from "./Settings";
import type { IFloor } from './Interface';

// Represents a floor in a building.
export default class Floor implements IFloor {
  floorNumber: number;
  isWaiting: boolean = false;
  
  floorDiv: HTMLDivElement = document.createElement("div");
  lineDiv: HTMLDivElement = document.createElement("div");
  button: HTMLButtonElement = document.createElement("button");
  timerElement: HTMLSpanElement = document.createElement("span");

  expectedTime: number | null = null;
  timerInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Creates a new instance of a floor.
   * @param floorNum - The floor number.
   * @param callElevator - Function to call an elevator.
   */
  constructor(floorNum: number, callElevator: (floorNumber: number) => void) {
    this.floorNumber = floorNum;
    this.floorDiv.className = "floor";
    this.lineDiv.className = "blackline";
    this.button.className = "metal linear";
    this.button.textContent = floorNum.toString();
    this.timerElement.className = "timer";

    this.button.onclick = () => {
      if (!this.isWaiting) {
        callElevator(this.floorNumber);
        this.button.style.color = "green";
        this.isWaiting = true;
      }
    };
    this.floorDiv.appendChild(this.button);
    this.floorDiv.appendChild(this.timerElement);
  }

  /**
   * Updates the timer displaying the waiting time for the elevator.
   */
  updateTimer() {
    if (this.expectedTime === null) {
      this.timerElement.textContent = "";
      return;
    }

    const remainingTime = this.expectedTime - Date.now();
    if (remainingTime <= 0) {
      this.expectedTime = null;
      clearInterval(this.timerInterval!);
      this.timerElement.textContent = "";
    } else {
      const seconds = Math.ceil(remainingTime / SETTINGS.milliSecond);
      this.timerElement.textContent = seconds.toString();
    }
  }

   /**
   * Starts a new timer for the estimated arrival time of the elevator.
   * @param arrivalTime - The estimated arrival time (in milliseconds).
   */
  startTimer(arrivalTime: number) {
    this.expectedTime = arrivalTime;
    this.timerInterval = setInterval(() => this.updateTimer(), SETTINGS.elevatorTravelTime);
    this.updateTimer();
  }
}
