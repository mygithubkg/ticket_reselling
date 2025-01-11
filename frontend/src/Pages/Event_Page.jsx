import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Event_Page.css"; // Optional: Add styles if needed
import { Link } from "react-router-dom";
import Ticket_card from '../Components/listing/Ticket_card';



export default function Event_Page() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
  useEffect(() => {
    const fetchEvent = async () => {
      console.log(id);
      try {
        const response = await fetch(`${API_BASE_URL}/eventdetails`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
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
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;


  }



  return (
    <div className="event-page">
      <div className="background-image"><img src={event.photo}  /></div>
      <div className="event-header">
     
      <div className='above-image'>
      <img src={event.image_url} alt="Event Poster" className="event-image" /></div>

      <div className='event-name'><h2>{event.eventName}</h2></div>
      <p className='Intro-line'>{event.event_bio}</p>
      <div className="event-meta">
            <p><strong>Event Type:</strong> {event.event_type}</p>
            <p><strong>Date & Time:</strong> {event.event_date}  {event.event_time}</p>
            <p><strong>Location:</strong> {event.event_location}</p>
            <p><strong>Description:</strong> {event.event_bio}</p>
        </div>
      </div>
      <Ticket_card event={event} />
    </div>

  );
}