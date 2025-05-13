import React from 'react';
import '../../styles/components/LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Caricamento...</p>
    </div>
  );
}

export default LoadingSpinner;