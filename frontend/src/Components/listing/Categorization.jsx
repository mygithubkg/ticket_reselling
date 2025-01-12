import React, { useState } from "react";
import "../../styles/Categorization.css";
import Faq from "../Faq_section";
import { faqDat } from "../../data";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar"

function Category(){
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const navigate = useNavigate();

    // For backend Data Fetch
    const [userDetails, setUserDetails] = useState({
        event_type : "",
        event_date : "",
        event_time : "",
        event_location : "",
        event_name : "",
        event_bio : "",
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        const event_type = userDetails.event_type;
        const event_bio = userDetails.event_bio;
        const event_date = userDetails.event_date;
        const event_location = userDetails.event_location;
        const event_time = userDetails.event_time;
        const event_name = userDetails.event_name;
        console.log(event_time);
        const response = await fetch(`${API_BASE_URL}/listing1`,{
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({event_bio, event_date, event_location, event_name, event_time, event_type })
        })

        const result = await response.json();

        if (result.success){
            navigate('/listing/step2_eventdetails');
        }else{
            alert(result.message);
        }
    }

    // let currentStep= 0
    return(
        <div>
             {/* <ProgressBar currentStep={currentStep}/> */}
           
            <form className="categorycontainer" onSubmit={handlesubmit}>
                <h1 id="h1">Event Details</h1>
                <div className="typess">
                    <label htmlFor="Event Type">Event Type</label>
                    <select id="Event_Type" name="event_type" value={userDetails.event_type} onChange={handleChange} required>
                        <option value="" disabled selected>Select Event Type</option>
                        <option value="Concerts" name="concert">Concerts</option>
                        <option value="sports" name="sports">Sports Events</option>
                        <option value="festivals" name="festivals">Festivals</option>
                        <option value="comedy shows" name="comedy">Comedy Shows</option>
                    </select>
                </div>
                <div className="typess">
                    <label htmlFor="Event Date">Event Date</label>
                    <input type="date" id="date" name="event_date" value={userDetails.event_date} onChange={handleChange} required />
                    <label htmlFor="Event Date">Event Time</label>
                    <input type="time" id="time" name="event_time" value={userDetails.event_time} onChange={handleChange} required/>
                </div>
                <div className="typess">
                    <label htmlFor="Event Location">Event Location</label>
                    <input id="Location" type="text" name="event_location" value={userDetails.event_location} onChange={handleChange} placeholder="Enter Location" required/>
                </div>
                <div className="typess">
                    <label htmlFor="Event Name">Event Name</label>
                    <input type="text" id="texting" name="event_name" value={userDetails.event_name} onChange={handleChange} placeholder="Enter Event Name" required />
                </div>
                <div className="typess">
                    <label htmlFor="Event Description">Event Description</label>
                    <textarea id="text1" name="event_bio" value={userDetails.event_bio} onChange={handleChange} placeholder="Enter Description" required/>
                </div>
                <div className="typess">
                    <input  type="submit" id="next" value="Submit Step 1" required/>
                </div>
            </form>
            <div>
                <Faq faqData={faqDat}/>
            </div>
        </div>
    );
}

export default Category;