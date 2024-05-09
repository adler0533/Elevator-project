import React from 'react';
import './style.css';
import Floor from './Floor.tsx';
import Elevator from './Elevator.tsx';

interface BuildingProps {
  totalFloors: number; // Define prop for total number of floors
  totalElevators: number;
}

const Building: React.FC<BuildingProps> = ({ totalFloors, totalElevators }) => {
  const floors: JSX.Element[] = [];
  const elevators: JSX.Element[] = [];

  // Loop through the total number of floors and create Floor components
  for (let i = 0; i < totalFloors; i++) {
    floors.push(<Floor key={i} floorNumber={i}/>);
    // Add a black line after each floor, except for the last floor
    if (i < totalFloors - 1) {
      floors.push(<div key={`line-${i}`} className="blackline"></div>);
    }
  }

  // Loop through the total number of elevators and create Elevator components
  for (let i = 0; i < totalElevators; i++) {
    elevators.push(<Elevator key={i} ElevatorNumber={i}/>);
  }

  return (
    <div className='container'>
      <div className='building-container'>
        <div className='floor-container'>{floors}</div>
        <div className='elevator-container'>{elevators}</div>
      </div>
    </div>
  );
}

export default Building;
