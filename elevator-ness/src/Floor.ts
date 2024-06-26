import { SETTINGS } from "./Settings";

export default class Floor {
  floorNumber: number;
  isWaiting: boolean = false;
  
  floorDiv: HTMLDivElement = document.createElement("div");
  lineDiv: HTMLDivElement = document.createElement("div");
  button: HTMLButtonElement = document.createElement("button");
  timerElement: HTMLSpanElement = document.createElement("span");

  expectedTime: number | null = null;
  timerInterval: ReturnType<typeof setInterval> | null = null;

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

  startTimer(arrivalTime: number) {
    this.expectedTime = arrivalTime;
    this.timerInterval = setInterval(() => this.updateTimer(), SETTINGS.elevatorTravelTime);
    this.updateTimer();
  }
}
