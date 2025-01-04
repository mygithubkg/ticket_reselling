<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 9f45d79e6228f92150ded3eecfd1cd49586a6d96
import { useParams } from 'react-router-dom';
import "../styles/Event_Page.css"; // Optional: Add styles if needed
import { Link } from "react-router-dom";
import Ticket_card from '../Components/listing/Ticket_card';



export default function Event_Page() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

<<<<<<< HEAD
 
  // Find the event details based on the id
  const event = tickets.find((ticket) => ticket.id === parseInt(id));
=======
  useEffect(() => {
    const fetchEvent = async () => {
      console.log(id);
      try {
        const response = await fetch('/eventdetails', {
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
>>>>>>> 9f45d79e6228f92150ded3eecfd1cd49586a6d96

  if (!event) {
    return <p>Event not found.</p>;


  }


<<<<<<< HEAD
  return (<div className="event-card">
     <div className="background-image"><img src={event.photo}  /></div>
  
    
    <div className="event-header">
     
      <div id="test" className='above-image'>
      <img src={event.photo} alt="Event Poster" className="event-image" /></div>
      <div className='event-name'><h2>{event.eventName}</h2></div>
      
      <div className="event-meta">
        <p><strong>Date & Time:</strong> {event.eventDateTime}</p>
        <p><strong>Location:</strong> {event.eventLocation}</p>
=======
  return (
    <div className="event-page">
      <h1>{event.event_name}</h1>
      <p className='Intro-line'>{event.event_bio}</p>
      <div className='Upper_section'>
        <img className="align-centre event-photo" src={event.photo} alt={event.event_name} />
        <div className='Event-Deatils'>
            <p><strong>Event Type:</strong> {event.event_type}</p>
            <p><strong>Date & Time:</strong> {event.event_date}  {event.event_time}</p>
            <p><strong>Location:</strong> {event.event_location}</p>
            <p><strong>Description:</strong> {event.event_bio}</p>
        </div>
>>>>>>> 9f45d79e6228f92150ded3eecfd1cd49586a6d96
      </div>
      <Ticket_card />
    </div>

  );
}