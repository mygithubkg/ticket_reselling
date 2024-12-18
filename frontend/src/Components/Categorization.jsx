import React from "react";
import "../styles/Categorization.css";

function Category(){
    return(
        <div>
            <form className="categorycontainer" action='/addevent_2'>
                <h1>Categorization</h1>
                <div className="typess">
                    <label htmlFor="Event Type">Event Type</label>
                    <select id="Event_Type" name="Event_type">
                        <option value="Concerts" name="concert">Concerts</option>
                        <option value="sports" name="sports">Sports Events</option>
                        <option value="festivals" name="festivals">Festivals</option>
                        <option value="comedy shows" name="comedy">Comedy Shows</option>
                    </select>
                </div>
                <div className="typess">
                    <label htmlFor="Event Date">Event Date</label>
                    <input type="date" id="date" name="date" />
                    <label htmlFor="Event Date">Event Time</label>
                    <input type="time" id="time" name="time" />
                </div>
                <div className="typess">
                    <label htmlFor="Event Location">Event Location</label>
                    <input id="Location" type="text" name="location" placeholder="Enter Location"/>
                </div>
                <div className="typess">
                    <label htmlFor="Ticket Type">Ticket Type</label>
                    <select id="Ticket_Type" name="Ticket_type">
                        <option value="VIP" name="vip">VIP Tickets</option>
                        <option value="E-Tickets" name="eticket">E-Tickets</option>
                    </select>
                </div>
                <div className="typess">
                    <input type="submit" id="next" value="Next Page"/>
                </div>
            </form>
        </div>
    );
}

export default Category;