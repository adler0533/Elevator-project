import React, { Component } from 'react';
import './style.css'; // Import your CSS file for styling

interface ElevatorButtonProps {
  number: number; // Define the prop type
}

class ElevatorButton extends Component<ElevatorButtonProps> {
  render() {
    const { number } = this.props; // Destructure number from props
    return (
      <div className="metal linear">
        {number} {/* Display the number inside the button */}
      </div>
    );
  }
}

export default ElevatorButton;
