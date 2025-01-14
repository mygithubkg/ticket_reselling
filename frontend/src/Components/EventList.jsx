
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventList.css";
import { tickets } from "../data";
import { useState, useEffect } from "react";

export default function EventList({search}) {
  const navigate = useNavigate();

  const handleEventClick = (id) => {
    navigate(`/listing/step3_ticketdetails/${id}`);
  };

  const handleAddEventClick = () => {
    navigate('/listing/step1_eventdetails');
  };
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/eventdetail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const result = await response.json();
        
        if (result.success) {
          setEvent(result.event);
        } else {
          setError(result.message || "Error fetching event");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  let arr = event ? event : tickets;

  var events = arr.filter((e) =>
    (e.event_name.toLowerCase().includes(search.toLowerCase()) )
  );



  return (
    <div className="event-list-container">
      <h2>All Events</h2>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((x) => (
            <div
              key={x.event_id}
              className="event-card"
              onClick={() => handleEventClick(x.event_id)}
            >
              <h3 className="event-name">{x.event_name}</h3>
              <p className="event-location">Location: {x.event_location}</p>
              <p className="event-date">Date: {x.event_date}</p>
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
