import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Building from './Building.tsx';
import reportWebVitals from './reportWebVitals.js';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <div className='container'>
      <Building totalFloors={7} totalElevators = {3} />
      <Building totalFloors={5} totalElevators = {2} />
      <Building totalFloors={3} totalElevators = {1} />
      </div>
    </React.StrictMode>,
    rootElement
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
