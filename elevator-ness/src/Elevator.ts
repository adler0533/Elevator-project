
export default class Elevator {
    currentFloor: number = 0;
    ID: number;
    destination: number = 0;
    timer: number = 0;
  
    elevatorDiv: HTMLImageElement = document.createElement('img');
    audio: HTMLAudioElement = document.createElement('audio');
  
    constructor(id: number) {
      this.ID = id;
  
      this.elevatorDiv.src = './elevator.png';
      this.elevatorDiv.classList.add('elevator');
  
      this.audio.src = './ding.mp3';
      this.audio.controls = true;
    }
  
    move = (
      floorRequest: number,
      freeElevator: (floorNumber: number) => void,
    ) => {
      let gap = Math.abs(this.currentFloor - floorRequest);
      this.currentFloor = floorRequest;
      this.elevatorDiv.style.transition = `transform ${gap * 0.5}s ease`;
      this.elevatorDiv.style.transform = `translateY(${-floorRequest * 110}px)`;
      setTimeout(() => {
        this.audio.play();
        setTimeout(() => {
          this.audio.pause();
          freeElevator(floorRequest);
        }, 2000);        
      }, gap * 0.5 * 1000);
    };
  }