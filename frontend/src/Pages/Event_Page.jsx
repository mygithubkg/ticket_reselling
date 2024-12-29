import React from 'react';
import { useParams } from 'react-router-dom';
import { tickets } from "../data";
import "../styles/Event_Page.css"; // Optional: Add styles if needed
import {Link} from "react-router-dom"

export default function Event_Page() {
  const params = useParams();
  const { id } = params;

  // Find the event details based on the id
  const event = tickets.find((ticket) => ticket.id === parseInt(id));

  // Check if event exists
  if (!event) {
    return <p>Event not found.</p>;
  }

  return (<div className="event-card">
     <div className="background-image"><img src={event.photo}  /></div>
  
    
    <div className="event-header">
     
      <div className='above-image'>
      <img src={event.photo} alt="Event Poster" className="event-image" /></div>
      <div className='event-name'><h2>{event.eventName}</h2></div>
      
      <div className="event-meta">
        <p><strong>Date & Time:</strong> {event.eventDateTime}</p>
        <p><strong>Location:</strong> {event.eventLocation}</p>
      </div>
    </div>
    

    <div className="event-details">
      
      <div className="price-section">
        <h3>₹{event.sellingPrice}/-</h3>
        <p>Selling price per ticket</p>
      </div>
      <div className="chat">
      <button className="chat-button">Chat with Seller</button></div>
    </div>

    <div className="seller-details">
      <h4>Seller Details</h4>
      <p><strong>Name:</strong> {event.sellerName}</p>
      <p><strong>Rating:</strong> {event.sellerRating}</p>
    </div>

    <div className="ticket-details">
      <h4>Ticket Details</h4>
      <p><strong>Ticket Type:</strong> {event.ticketType}</p>
      <p><strong>Quantity:</strong> {event.quantity}</p>
      <p><strong>Seating Info:</strong> {event.seatingInfo}</p>
      <p><strong>Transferable:</strong> {event.transferability ? "Yes" : "No"}</p>
      <p><strong>Ticket Format:</strong> {event.ticketFormat}</p>
    </div>

    <div className="event-extra">
      <h4>Event Details</h4>
      <p><strong>Event Type:</strong> {event.eventType}</p>
      <p><strong>Organizer:</strong> {event.organizer}</p>
      <p><strong>Description:</strong> {event.description}</p>
    </div>
  </div>
);
};
