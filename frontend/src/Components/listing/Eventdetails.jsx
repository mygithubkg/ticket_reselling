import React from "react";
import "../../styles/Eventdetail.css";
import Faq from "../Faq_section";
import { faqDat } from "../../data";

function EventDetails(){
    return (
        <div>
            <form className="categorycontainer2" action='/addevent_3'>
                <h1>Event Details</h1>
                    <div className="typess">
                        <label htmlFor="Event Name">Event Name</label>
                        <input type="text" id="texting" name="event_name" placeholder="Enter Event Name" />
                    </div>
                    <div className="typess">
                        <label htmlFor="Event Description">Event Description</label>
                        <textarea id="text1" name="description" placeholder="Enter Description"/>
                    </div>
                    <div className="typess">
                        <input type="submit" id="next" value="Next Page"/>
                    </div>
            </form>
            <div>
                <Faq faqData={faqDat}/>
            </div>
        </div>
    );
};

export default EventDetails;
