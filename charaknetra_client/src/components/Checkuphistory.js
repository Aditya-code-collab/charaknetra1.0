import React from 'react';
import './Checkuphistory.css';

function Checkuphistory(props) {
  const { checkups } = props;

  return (
    <>
      {checkups.map((checkup, index) => (
        <div key={index} className="checkup-item">
          <div className="checkup-row">
            <span className="checkup-label">Date:</span>
            <span className="checkup-value">{checkup.date}</span>
          </div>

          <div className="checkup-row">
            <span className="checkup-label">Time:</span>
            <span className="checkup-value">{checkup.time}</span>
          </div>

          <div className="checkup-row">
            <span className="checkup-label">Reason:</span>
            <span className="checkup-value">{checkup.reason}</span>
          </div>

          <div className="checkup-row">
            <span className="checkup-label">Doctor's Notes:</span>
            <span className="checkup-value">{checkup.notes}</span>
          </div>

          <div className="checkup-row">
            <span className="checkup-label">Tablets:</span>
            <span className="checkup-value">{checkup.tablets}</span>
          </div>

          <div className="checkup-row">
            <span className="checkup-label">Doses:</span>
            <span className="checkup-value">{checkup.doses}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Checkuphistory;
