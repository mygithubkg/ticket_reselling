import React from "react";
import "../../styles/Listing.css";
import { Link } from "react-router-dom";

function Progress() {
  const steps = [
    "Event Details - 1",
    "Event Details - 2",
    "Ticket Details",
  ];

  return (
    <div className="progress-container">
      <h1 className="progress-header">Register Your Event</h1>
      <div className="steps-container">
          <div  className="step basic-step">
            <Link to='/listing/step1_eventdetails'>Step 1 - Event Categorization Detais</Link>
          </div>
          <div  className="step basic-step">
            <Link to='/listing/step2_eventdetails'>Step 2 - Event Detais</Link>
          </div>
          <div  className="step basic-step">
            <Link to='/listing/step3_ticketdetails'>Step 3 - Ticket Detais</Link>
          </div>
      </div>
    </div>
  );
}

export default Progress;
