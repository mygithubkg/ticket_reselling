import React from "react";
import "../styles/Ticketdetails.css";

function TicketDetails(){
    return (
        <div>
            <form className="categorycontainer3">
                <h1>Ticket Details</h1>
                    <div className="typess">
                        <label htmlFor="Quantity">Number of Tickets</label>
                        <input type="number" id="quantity" min= '1' name="quantity" placeholder="0" />
                    </div>
                    <div className="typess">
                        <label htmlFor="Seating Information">Seating Information</label>
                        <textarea id="information" name="info" placeholder="Enter Seating Information"/>
                    </div>
                    <div className="typess">
                        <label htmlFor="Transferbiality">Further Details</label>
                        <input type="text" id="transfer" name="mode" placeholder="Online/Delivery" />
                    </div>
                    <div className="typess">
                        <label htmlFor="Transferbiality">Mode of Transfer</label>
                        <textarea id="moreinfo" name="moreinfo" placeholder="Enter Details for Buyers" />
                    </div>
                    <div className="typess">
                        <label htmlFor="Face Value">Face Value</label>
                        <input type="number" id="face_value" name="face_value" placeholder="800/-"/>
                    </div>
                    <div className="typess">
                        <label htmlFor="Selling Price">Selling Price</label>
                        <input type="number" id="selling_price" name="selling_price" placeholder="1000/-"/>
                    </div>
                    <div className="typess">
                        <input type="submit" id="submit" value="Add Listing"/>
                    </div>
            </form>
        </div>
    );
};

export default TicketDetails;
