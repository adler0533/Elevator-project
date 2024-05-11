import React from 'react';
import './style.css';

interface ElevatorButtonProps {
  floorNumber: number;
  handleButtonClick: (floorNumber: number) => void;
  requestedFloor: number | null;
}

const ElevatorButton: React.FC<ElevatorButtonProps> = ({
  floorNumber,
  handleButtonClick,
  requestedFloor, }) => {
  const isRequestedFloor = requestedFloor === floorNumber;
  
  return (
    <button
      className="metal linear"
      onClick={() => handleButtonClick(floorNumber)}
      style={{ backgroundColor: isRequestedFloor ? 'green' : 'initial' }}
    >
      {floorNumber}
    </button>
  );
};

export default ElevatorButton;
