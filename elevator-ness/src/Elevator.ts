
export default class Elevator {
    ID: number;
    currentFloor: number = 0;
    destination: number = 0;
    timer: number = 0;
  
    elevatorDiv: HTMLImageElement = document.createElement('img');
    audio: HTMLAudioElement = document.createElement('audio');
  
    constructor(id: number) {
      this.ID = id;
  
      this.elevatorDiv.src = './elevator.png';
      this.elevatorDiv.className = 'elevator';
  
      this.audio.src = './ding.mp3';
      this.audio.controls = true;
    }
  
    move = (
      floorRequest: number,
      freeElevator: (floorNumber: number) => void,
    ) => {
      let gap = Math.abs(this.currentFloor - floorRequest);
      console.log("gap" + gap + " floorRequest " + floorRequest);
      this.elevatorDiv.style.transition = `transform ${gap * 0.5}s ease`;
      this.elevatorDiv.style.transform = `translateY(${-floorRequest * 110}px)`;
      this.currentFloor = floorRequest;
      setTimeout(() => {
        this.audio.currentTime = 0;
        this.audio.play();
        setTimeout(() => {
          // this.audio.pause();
          freeElevator(floorRequest);
        }, 2000);        
      }, gap * 0.5 * 1000);
    };
  }