// import React, { Component } from 'react';
// import './style.css'; // Import CSS for styling the elevator

// // Define interface for props
// interface ElevatorProps {
//   totalFloors: number; // Total number of floors in the building
// }

// // Define interface for state
// interface ElevatorState {
//   currentFloor: number; // Current floor the elevator is on
// }

// class Elevator extends Component<ElevatorProps, ElevatorState> {
//   constructor(props: ElevatorProps) {
//     super(props);
//     this.state = {
//       currentFloor: 0, // Initialize current floor to 0
//     };
//   }

//   // Function to handle elevator movement
//   goToFloor = (floorNumber: number) => {
//     // Simulate elevator movement by setting current floor
//     this.setState({ currentFloor: floorNumber });
//   };

//   render() {
//     const { totalFloors } = this.props;
//     const { currentFloor } = this.state;

//     return (
//     <div className='container'>
//         <div className='building-container'>
//             <div className="elevator-container">
//                 <img src="elevator.png" alt="Elevator" className="elevator" />
//                 <div className="floor-number">{currentFloor}</div>
//                 <div className="floor-buttons">
//                 {[...Array(totalFloors).keys()].map((floor) => (
//                     <button key={floor} onClick={() => this.goToFloor(floor)}>
//                     {floor === currentFloor ? '🔲' : '◻️'} Floor {floor}
//                     </button>
//                 ))}
//                 </div>
//             </div>
//         </div>
//     </div>
//     );
//   }
// }

// export default Elevator;

import React, { Component } from 'react';
import './style.css';


interface ElevatorProps {
  ElevatorNumber: number; // Define the prop type for floorNumber
}

class Elevator extends Component<ElevatorProps> {
    
  render() {
    const { ElevatorNumber } = this.props;
    return (  
        <div className='elevator'>
            
        
            <img src="elevator.png" alt="Elevator" className="elevator"  />
            </div>
       
    );
  }
}

export default Elevator;
