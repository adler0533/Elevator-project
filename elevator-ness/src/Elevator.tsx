import React, { useState, useEffect } from 'react';
import './style.css';

interface ElevatorProps {
  ElevatorNumber: number;
  requestedFloor: number | null;
  activeElevator: number | null;
  elevatorRequests: number[];
  setElevatorRequests: React.Dispatch<React.SetStateAction<number[]>>;
}

const Elevator: React.FC<ElevatorProps> = ({
  ElevatorNumber,
  requestedFloor,
  activeElevator,
  elevatorRequests,
  setElevatorRequests,
}) => {
  const [position, setPosition] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  useEffect(() => {
    if (activeElevator === ElevatorNumber && !isMoving && elevatorRequests.length > 0) {
      const nextFloor = elevatorRequests[0];
      setPosition(nextFloor);
      setIsMoving(true);
    }
  }, [activeElevator, isMoving, elevatorRequests, ElevatorNumber]);

  useEffect(() => {
    if (isMoving && position === elevatorRequests[0]) {
      const timer = setTimeout(() => {
        setElevatorRequests((prevRequests) => prevRequests.slice(1));
        setIsMoving(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isMoving, position, elevatorRequests, setElevatorRequests]);

  return (
    <div className='elevator' style={{ bottom: position * 117 }}>
      <img src="elevator.png" className="elevator" alt={`Elevator ${ElevatorNumber}`} />
    </div>
  );
};

export default Elevator;