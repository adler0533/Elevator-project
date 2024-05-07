import React from 'react';
import './style.css';
import Floor from './Floor.tsx';

interface YourComponentProps {
  totalFloors: number; // Define prop for total number of floors
}

const YourComponent: React.FC<YourComponentProps> = ({ totalFloors }) => {
  // Create an array to store Floor components
  const floors: JSX.Element[] = [];

  // Loop through the total number of floors and create Floor components in reverse order
  for (let i = totalFloors - 1; i >= 0; i--) {
    floors.push(<Floor key={i} floorNumber={i} />);
  }

  return <div>{floors}</div>;
};

export default YourComponent;
