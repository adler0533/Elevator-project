import React from 'react';
import './style.css';
import ElevatorButton from './Button.tsx';

interface FloorProps {
  floorNumber: number; // Define the prop type for floorNumber
  handleButtonClick: (floorNumber: number) => void;
  requestedFloor: number | null;
}

const Floor: React.FC<FloorProps> = ({ floorNumber, handleButtonClick, requestedFloor }) => {
  return (
    <div className="floor">
      <ElevatorButton floorNumber={floorNumber}
                      handleButtonClick={handleButtonClick}
                      requestedFloor={requestedFloor} 
      />
    </div>
  );
}

export default Floor;
