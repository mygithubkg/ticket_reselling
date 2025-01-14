
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventList.css";
import { tickets } from "../data";


export default function EventList({search}) {
  const navigate = useNavigate();

  const handleEventClick = (id) => {
    navigate(`/listing/step3_ticketdetails/${id}`);
  };

  const handleAddEventClick = () => {
    navigate('/listing/step1_eventdetails');
  };

  

  var events = tickets.filter((e) =>
    (e.eventName.toLowerCase().includes(search.toLowerCase()) )
  );



  return (
    <div className="event-list-container">
      <h2>All Events</h2>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => handleEventClick(event.id)}
            >
              <h3 className="event-name">{event.eventName}</h3>
              <p className="event-location">Location: {event.location}</p>
              <p className="event-date">Date: {event.date}</p>
            </div>
          ))
        ) : (
          <div>
            <p>No events available.</p>
            <button className="add-event-button" onClick={handleAddEventClick}>
              Add New Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
