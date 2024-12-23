import React, { useState } from "react";
import "../../styles/Categorization.css";
import Faq from "../Faq_section";
import { faqDat } from "../../data";

function Category(){

    // const [currval, setval] = useState("");

    // const [eventDetails, setEventDetails] = useState({
    //         event: "",
    //         age: "",
    //         email: "",
    //         role: "Buyer",
    //         gender: "Male",
    //         phoneNumber: "",
    //         otherDetails: "",
    //     });

    // const handlestep1 = async () => {
    //     try {
    //         const response = await fetch('/listing/step1',{
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({username, password}),
    //         })
    //     }
    // }




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
                    <input onClick={handlestep1} type="submit" id="next" value="Submit Step 1"/>
                </div>
            </form>
            <div>
                <Faq faqData={faqDat}/>
            </div>
        </div>
    );
}

export default Category;