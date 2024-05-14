

export default class Floor {
    floorNumber: number;
    isWaiting: boolean = false;
  
    floorDiv: HTMLDivElement = document.createElement('div');
    lineDiv: HTMLDivElement = document.createElement('div');
    button: HTMLButtonElement = document.createElement('button');
  
    constructor(floorNum: number, callElevator: (floorNumber: number) => void) {
      this.floorNumber = floorNum;
  
      this.floorDiv.classList.add('floor');
  
      this.lineDiv.classList.add('blackline');
  
      this.button.className = 'metal linear';
      this.button.textContent = floorNum.toString();
      this.button.onclick = () => {
        if (!this.isWaiting) {
          callElevator(this.floorNumber);
          this.button.style.color = 'green'
          this.isWaiting = true;
        }
      };
  
      this.floorDiv.appendChild(this.button);
    }
  }