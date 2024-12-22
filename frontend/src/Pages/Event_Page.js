import React from 'react';
import { useParams } from 'react-router-dom';
import { tickets } from "../data";
import "../styles/Event_Page.css"; // Optional: Add styles if needed

export default function Event_Page() {
  const params = useParams();
  const { id } = params;

  // Find the event details based on the id
  const event = tickets.find((ticket) => ticket.id === parseInt(id));

  // Check if event exists
  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-page">
      <h1>{event.eventName}</h1>
      <img src={event.photo} alt={event.eventName} className="event-photo" />
      <p><strong>Event Type:</strong> {event.eventType}</p>
      <p><strong>Date & Time:</strong> {event.eventDateTime}</p>
      <p><strong>Location:</strong> {event.eventLocation}</p>
      <p><strong>Ticket Type:</strong> {event.ticketType}</p>
      <p><strong>Description:</strong> {event.eventDescription}</p>
      <p><strong>Quantity:</strong> {event.quantity}</p>
      <p><strong>Seating Info:</strong> {event.seatingInfo}</p>
      <p><strong>Transferable:</strong> {event.transferability ? "Yes" : "No"}</p>
      <p><strong>Ticket Format:</strong> {event.ticketFormat}</p>
      <p><strong>Face Value:</strong> ₹{event.faceValue}</p>
      <p><strong>Selling Price:</strong> ₹{event.sellingPrice}</p>
    </div>
  );
}
