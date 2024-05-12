import React, { useState, useEffect } from 'react';
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
  const [requestedFloor, setRequestedFloor] = useState<number | null>(null);
  const [elevatorRequests, setElevatorRequests] = useState<number[]>([]);
  const [activeElevator, setActiveElevator] = useState<number | null>(null);

  const handleButtonClick = (floorNumber: number) => {
    setRequestedFloor(floorNumber);
    setElevatorRequests((prevRequests) => [...prevRequests, floorNumber]);
    console.log(floorNumber + ' הוזמנה');

    // Find the closest elevator to the requested floor
    const closestElevator = elevators.reduce((prev, curr) => {
      const prevDistance = Math.abs((prev.props.position || 0) - floorNumber);
      const currDistance = Math.abs((curr.props.position || 0) - floorNumber);
      return currDistance < prevDistance ? curr : prev;
    });

    setActiveElevator(closestElevator.props.ElevatorNumber);
  };

  // Loop through the total number of floors and create Floor components
  for (let i = 0; i < totalFloors; i++) {
    floors.push(
      <Floor
        key={i}
        floorNumber={i}
        handleButtonClick={handleButtonClick}
        requestedFloor={requestedFloor}
      />
    );
    // Add a black line after each floor, except for the last floor
    if (i < totalFloors - 1) {
      floors.push(<div key={`line-${i}`} className="blackline"></div>);
    }
  }

  // Loop through the total number of elevators and create Elevator components
  for (let i = 0; i < totalElevators; i++) {
    elevators.push(
      <Elevator
        key={i}
        ElevatorNumber={i}
        // requestedFloor={requestedFloor}
        // activeElevator={activeElevator}
        elevatorRequests={elevatorRequests}
        setElevatorRequests={setElevatorRequests}
      />
    );
  }

  return (
    <div className="building-container">
      <div className="floor-container">{floors}</div>
      <div className="elevator-container">{elevators}</div>
    </div>
  );
};

export default Building;