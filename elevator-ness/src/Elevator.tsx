import React, { useState } from 'react';
import './style.css';

interface ElevatorProps {
  ElevatorNumber: number;
}

const Elevator: React.FC<ElevatorProps> = ({ ElevatorNumber }) => {
  const [position, setPosition] = useState<number>(0);

  const handleClick = () => {
    setPosition(prevPosition => prevPosition + 1);
  };

  return (
    <div className='elevator' onClick={handleClick} style={{ bottom: position * 117 }} >
      <img src="elevator.png" className="elevator" alt={`Elevator ${ElevatorNumber}`} />
    </div>
  );
}

export default Elevator;
