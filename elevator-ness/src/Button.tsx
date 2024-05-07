import React, { Component } from 'react';
import './style.css'; // Import your CSS file for styling

interface ElevatorButtonProps {
  number: number; // Define the prop type
}

class ElevatorButton extends Component<ElevatorButtonProps> {
  constructor(props: ElevatorButtonProps) {
    super(props);
  }

  render() {
    const { number } = this.props; // Destructure number from props
    return (
      <button  className="metal linear">
        {number} {}
      </button>
    );
  }
}

export default ElevatorButton;
