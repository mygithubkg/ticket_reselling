import React, { useState, useEffect } from 'react';
import "../../styles/Event_Page.css"; // Ensure the CSS file is updated accordingly
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Mychatbot from '../chatbot';

function Ticket_card({ event }) {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const [showchat, setchat] = useState(false);
    const [user, setuser] = useState('');
    const [ticketing, setTicketing] = useState(null);
    const handlenavigate = () => {
        navigate('/Seller1');
    };

    const handle_buy = ()=>{
        setchat(!showchat);
    }




    useEffect(() => {
        const fetchTickets = async () => {
            const event_name = event.event_name;
            try {
                const response = await fetch(`${API_BASE_URL}/ticketdetails`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ event_name }),
                });

                const result = await response.json();
                if (result.success) {
                    setTickets(result.ticket || []);
                } else {
                    setError(result.message || "Error fetching tickets");
                }
            } catch (err) {
                setError("An unexpected error occurred.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [event.event_name]);

    if (loading) {
        return <p>Loading tickets...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (tickets.length === 0) {
        return <p>No Tickets Available Now!</p>;
    }

    return (<>
        <div className='tickettt'>
            <p className='tickett-heading'>Available Tickets</p>
         <div className='tickets-container'>
            {tickets.map((ticket, index) => (
                <div key={index} className='ticket-card'>
                    
                    <div className='pricing-details'>
                        <h2 className='price'>₹{ticket.selling_price}</h2>
                        <p><strong>Face Value:</strong> ₹{ticket.face_value}</p>
                    </div>
                    <div className='buttons'>
                        <button className='btn-sell' onClick={handlenavigate}>
                            Sell
                        </button>
                        <button className='btn-buy' onClick={()=> {handle_buy();setuser(ticket.username); setTicketing(ticket.ticket_id)}}> Buy </button>
                    </div>
                    <div className='seller-details'>
                        <h3>Seller Details</h3>
                        <p><strong>Name:</strong> {ticket.seller_name}</p>
                    </div>
                    <div className='ticket-details'>
                        <p><strong>Ticket Type:</strong> {ticket.ticket_type}</p>
                        <p><strong>Quantity:</strong> {ticket.quantity}</p>
                        <p><strong>Transferable:</strong> {ticket.transferability ? "Yes" : "No"}</p>
                        <p><strong>Ticket Format:</strong> {ticket.ticket_format}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
            <div>
                {showchat ? (<Mychatbot username = {user} id = {ticketing} />) : null}
            </div>
       </>
    );
}

export default Ticket_card;
