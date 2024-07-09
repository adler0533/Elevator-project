

export interface IElevator {
    ID: number;
    currentFloor: number;
    destination: number;
    timer: number;
    move(floorRequest: number, onArrival: (floorNumber: number) => void): void;
  }


export interface IFloor {
    floorNumber: number;
    isWaiting: boolean;
    startTimer(arrivalTime: number): void;
    updateTimer(): void;
  }