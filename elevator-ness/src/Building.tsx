import React, { Component } from 'react';
import './style.css';
import Floor from './Floor.tsx';
import Elevator from './Elevator.tsx';

interface BuildingProps {
  totalFloors: number; // Define prop for total number of floors
  totalElevators: number;
}

class Building extends Component<BuildingProps> {
  render() {
    const { totalFloors } = this.props;
    const floors: JSX.Element[] = [];

    
    const { totalElevators } = this.props;
    const elevators: JSX.Element[] = [];


    // Loop through the total number of floors and create Floor components in reverse order
    for (let i = 0; i <= totalFloors - 1; i++) {
      floors.push(<Floor key={i} floorNumber={i} /> ,<div className="blackline"></div>);
    }

    for (let i = 0; i <= totalElevators - 1; i++) {
      elevators.push(<Elevator key={i} ElevatorNumber={i} />);
    }
    

    return (
      <div className='container'>
        <div className='building-container'>
          <div  className='floor-container'>{floors}</div>
          <div className='elevator-container' >{elevators}</div>
        </div>
      </div>
    );
  }
}

export default Building;
