import React from 'react';
import "../styles/Filters.css";

export default function Filters({ setEventType, setdate, setprice }) {

    const handletype = (event) => {
        setEventType(event.target.value);
        console.log(event.target.value);
    };

    const handledate = (event) => {
        setdate(event.target.value);
        console.log(event.target.value);
    };

    const handleprice = (event) => {
        setprice(event.target.value);
        console.log(event.target.value);
    };

    const handleremove = () => {
        setEventType("");  // Reset the event type
        setprice("");      // Reset the price filter
      
        document.querySelectorAll("#dropdown").forEach(element => {
            element.value="def"

        
      });
    };

    return (<div className='flex'>
        <div className='remove-filter' onClick={handleremove}>X</div>
        <div className='filer-container'>
         
            <div>
                <select 
                    // Set selected value to the state value
                  
                    onChange={handletype} 
                    name="event_type" 
                    id="dropdown"
                >
                    <option value="def" disabled selected>Event Type</option>
                    <option value="Concerts">Concerts</option>
                    <option value="Sports & Fitness">Sports & Fitness</option>
                    <option value="Festivals">Festivals</option>
                    <option value="Comedy shows">Comedy shows</option>
                    <option value="Corporate & Startup Events">Corporate & Startup Events</option>
                    <option value="Parties & Nightlife">Parties & Nightlife</option>
                </select>
            </div>

            <div>
                <input type="date" id="date_filter" name="event_date" onChange={handledate} />
            </div>
            <div>
                <select 
                  
                    onChange={handleprice} 
                    name="price_filter" 
                    id="dropdown"
                >
                    <option value="def" disabled selected>Price</option>
                    <option value="asc">Low-High</option>
                    <option value="desc">High-Low</option>
                </select>
            </div>
        </div></div>
    );
}
