import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Event_Page.css"; // Optional: Add styles if needed
import { Link } from "react-router-dom";

export default function Event_Page() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

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

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-page">
      <h1>{event.event_name}</h1>
      <p className='Intro-line'>{event.event_bio}</p>
      <div className='Upper_section'>
        <img className="align-centre event-photo" src={event.photo} alt={event.event_name} />
        <div className='Upper_details'>
          <div className='Pricing-Detials'>
            <h1 className='Price'> <strong>₹{event.selling_price}</strong></h1>
            <p><strong>Face Value:</strong> ₹{event.face_value}</p>
          </div>
          <div className='buttons'>
            <button className='Interested'>
              <Link className="sell" to="/addevent_3">Sell</Link>
            </button>
            <button className='Interested'>Buy</button>
          </div>
          <div className='Seller Details'>
            <h2>Seller Details</h2>
            <p>Name: {event.seller_name}</p>
            <p>Rating: {event.seller_rating}</p>
          </div>
        </div>
      </div>

      <div className='details-container'>
        <div className='Event-Deatils'>
          <p><strong>Event Type:</strong> {event.event_type}</p>
          <p><strong>Date & Time:</strong> {event.event_date_time}</p>
          <p><strong>Location:</strong> {event.event_location}</p>
          <p><strong>Description:</strong> {event.event_description}</p>
        </div>
        <div className='Ticket-Detials'>
          <p><strong>Ticket Type:</strong> {event.ticket_type}</p>
          <p><strong>Quantity:</strong> {event.quantity}</p>
          <p><strong>Seating Info:</strong> {event.seating_info}</p>
          <p><strong>Transferable:</strong> {event.transferability ? "Yes" : "No"}</p>
          <p><strong>Ticket Format:</strong> {event.ticket_format}</p>
        </div>
      </div>
    </div>
  );
}
