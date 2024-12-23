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

  return (
    <div className="event-page">
      <h1>{event.eventName}</h1>
      <p className='Intro-line'> {event.eventDescription}</p>
      <div className='Upper_section'>
        <img className="align-centre event-photo" src={event.photo} alt={event.eventName} className="event-photo" />
        <div className='Upper_details '>
          <div className='Pricing-Detials'>
          <h1 className='Price'> <strong> ₹{event.sellingPrice} </strong></h1>
          {/* <p id="sp">Selling Price</p> */}

          <p><strong>Face Value:</strong> ₹{event.faceValue}</p>
            



          </div>
          <div className='buttons'>
         <button className='Interested'> <Link className="sell" to="/addevent_3">Sell</Link></button>
          <button className='Interested'>Buy</button>
          </div>
          < div className='Seller Details'>
            <h2>Seller Details</h2>
            <p>Name:</p>
            <p>Rating:</p>
          </div>
        </div>
      </div>

      <div className='details-container'>

        <div className='Event-Deatils'>
          <p><strong>Event Type:</strong> {event.eventType}</p>
          <p><strong>Date & Time:</strong> {event.eventDateTime}</p>
          <p><strong>Location:</strong> {event.eventLocation}</p>
          <p><strong>Description:</strong> {event.eventDescription}</p>
        </div>
        <div className='Ticket-Detials'>
          <p><strong>Ticket Type:</strong> {event.ticketType}</p>

          <p><strong>Quantity:</strong> {event.quantity}</p>
          <p><strong>Seating Info:</strong> {event.seatingInfo}</p>
          <p><strong>Transferable:</strong> {event.transferability ? "Yes" : "No"}</p>
          <p><strong>Ticket Format:</strong> {event.ticketFormat}</p>
        </div>
      </div>


    </div>
  );
}
