import React from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ currentStep }) => {
  const steps = ["Categorization","Event Details", "Ticket Details"];
  
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div key={index} className="progress-step">
          <div className={`circle ${index <= currentStep ? "active" : ""}`}>
            {index + 1}
          </div>
        <div className="label">{step}</div>
          {index < steps.length - 1 && (
            <div className={`line ${index < currentStep ? "active" : ""}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
