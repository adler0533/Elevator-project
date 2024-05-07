import React, { Component } from 'react';
import './style.css';
import ElevatorButton from './Button.tsx';

interface FloorProps {
  floorNumber: number; // Define the prop type for floorNumber
}

class Floor extends Component<FloorProps> {
  render() {
    const { floorNumber } = this.props;
    return (
      <div className="floor">
        <ElevatorButton number={floorNumber} />
      </div>
    );
  }
}

export default Floor;
