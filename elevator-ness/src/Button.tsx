import React from 'react';
import './style.css';

interface ElevatorButtonProps {
  floorNumber: number;
}

const ElevatorButton: React.FC<ElevatorButtonProps> = ({ floorNumber }) => {
  return (
    <button className="metal linear">{floorNumber}</button>
  );
}

export default ElevatorButton;
