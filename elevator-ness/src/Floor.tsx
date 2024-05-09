import React from 'react';
import './style.css';
import ElevatorButton from './Button.tsx';

interface FloorProps {
  floorNumber: number; // Define the prop type for floorNumber
}

const Floor: React.FC<FloorProps> = ({ floorNumber }) => {
  return (
    <div className="floor">
      <ElevatorButton floorNumber={floorNumber} />
    </div>
  );
}

export default Floor;
