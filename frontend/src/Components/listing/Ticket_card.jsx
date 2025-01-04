import React from "react";
import "../../styles/Event_Page.css"; // Optional: Add styles if needed

function Ticket_card(){
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
          console.log(id);
          try {
            const response = await fetch('/ticketdetails', {
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


    return (
    <div className='details-container'>
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
        <div className='Ticket-Detials'>
          <p><strong>Ticket Type:</strong> {event.ticket_type}</p>
          <p><strong>Quantity:</strong> {event.quantity}</p>
          <p><strong>Seating Info:</strong> {event.seating_info}</p>
          <p><strong>Transferable:</strong> {event.transferability ? "Yes" : "No"}</p>
          <p><strong>Ticket Format:</strong> {event.ticket_format}</p>
        </div>
      </div>
    );
}

export default Ticket_card;