import React, { useState, useEffect } from 'react';
import './style.css';

interface ElevatorProps {
  ElevatorNumber: number;
  elevatorRequests: number[]; // נמחקה requestedFloor
  setElevatorRequests: React.Dispatch<React.SetStateAction<number[]>>;
}

const Elevator: React.FC<ElevatorProps> = ({
  ElevatorNumber,
  // requestedFloor,
  elevatorRequests,
  setElevatorRequests,
}) => {
  const [position, setPosition] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [destinationFloors, setDestinationFloors] = useState<number[]>([]); // נוספה
  const dingAudio = new Audio("/ding.mp3"); // נוספה - מתאימים את הנתיב למיקום התיקייה של ding.mp3 בפרויקט

  useEffect(() => {
    if (!isMoving && elevatorRequests.length > 0) {
      const nextFloor = elevatorRequests[0];
      setPosition(nextFloor);
      setDestinationFloors((prev) => [...prev, nextFloor]); // נוספה
      setIsMoving(true);
    }
  }, [isMoving, elevatorRequests]);

  useEffect(() => {
    if (isMoving && position === destinationFloors[0]) {
      const timer = setTimeout(() => {
        setDestinationFloors((prev) => prev.slice(1));
        setElevatorRequests((prev) => prev.slice(1));
        setIsMoving(false);
        dingAudio.play(); // נוספה
      }, 2000); // נשמרה תקינות הזמן

      return () => clearTimeout(timer);
    }
  }, [isMoving, position, destinationFloors, setElevatorRequests]);

  useEffect(() => {
    if (destinationFloors.length > 0) {
      const totalDistance = destinationFloors.reduce(
        (acc, curr) => acc + Math.abs(curr - position),
        0
      );
      const totalTravelTime = totalDistance * 500; // 500ms per floor
      // נוסף
    }
  }, [position, destinationFloors]);

  return (
    <div className='elevator' style={{ bottom: position * 117 }}>
      <img src="elevator.png" className="elevator" alt={`Elevator ${ElevatorNumber}`} />
    </div>
  );
};

export default Elevator;
