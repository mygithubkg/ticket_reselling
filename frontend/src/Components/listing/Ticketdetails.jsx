import React, {useState} from "react";
import "../../styles/Ticketdetails.css";
import Faq from "../Faq_section";
import { faqDat } from "../../data";
import { useNavigate } from "react-router-dom";

function TicketDetails(){
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        ticket_type : "",
        selling_price : "",
        face_value : "",
        ticket_format : "",
        quantity : "",
        transferiability: "",
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
        const ticket_type = userDetails.ticket_type;
        const selling_price = userDetails.selling_price;
        const face_value = userDetails.face_value;
        const ticket_format = userDetails.ticket_format;
        const quantity = userDetails.quantity;
        const transferability = userDetails.transferability;
        const response = await fetch('/listing2',{
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({ticket_type, selling_price, face_value, ticket_format, quantity, transferability})
        })

        const result = await response.json();

        if (result.success){
            alert("Submitted");
            navigate('/listing');
        }else{
            alert(result.message);
        }
    }

    return (
        <div>
            <form className="categorycontainer3" onSubmit={handlesubmit}>
                <h1>Ticket Details</h1>
                    <div className="typess">
                        <label htmlFor="Ticket Type">Ticket Type</label>
                        <select id="Ticket_Type" name="ticket_type" value={userDetails.ticket_type} onChange={handleChange}>
                            <option value="VIP" name="vip">VIP Tickets</option>
                            <option value="E-Tickets" name="eticket">E-Tickets</option>
                        </select>
                    </div>
                    <div className="typess">
                        <label htmlFor="Quantity">Number of Tickets</label>
                        <input type="number" id="quantity" min= '1' max='10' name="quantity" placeholder="0" value={userDetails.quantity} onChange={handleChange} />
                    </div>
                    <div className="typess">
                        <label htmlFor="Seating Information">Ticket Format</label>
                        <input type="text" id="information" name="ticket_format" value={userDetails.ticket_format} onChange={handleChange} placeholder="Enter Seating Information"/>
                    </div>
                    <div className="typess">
                        <label htmlFor="Transferbiality">Mode of Transfer</label>
                        <select id="moreinfo" name="transferiability" placeholder="Online/Physical Delivery" value={userDetails.transferability} onChange={handleChange} >
                            <option value="" disabled selected>Select your option</option>
                            <option value="Online" name="online" >Online</option>
                            <option value="Physical Delivery" name="delivery" >Physical Delivery</option>
                        </select>
                    </div>
                    <div className="typess">
                        <label htmlFor="Face Value">Face Value</label>
                        <input type="number" id="face_value" name="face_value" placeholder="800/-" value={userDetails.face_value} onChange={handleChange}/>
                    </div>
                    <div className="typess">
                        <label htmlFor="Selling Price">Selling Price</label>
                        <input type="number" id="selling_price" name="selling_price" placeholder="1000/-" value={userDetails.selling_price} onChange={handleChange}/>
                    </div>
                    <div className="typess">
                        <input type="submit" id="submit" value="Add Listing"/>
                    </div>
            </form>
            <div>
                <Faq faqData={faqDat}/>
            </div>
        </div>
    );
};

export default TicketDetails;
