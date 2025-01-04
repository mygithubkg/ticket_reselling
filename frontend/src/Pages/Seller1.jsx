import React, { useState } from 'react';
import Faq from "../Components/Faq_section";
import { faqDat } from "../data";
import SearchBox from '../Components/SearchBox';
import Searchedcontent from "../Components/Searchedcontent";
import Featuresseller from "../Components/Features_seller";
import "../styles/Seller1.css";
import { Link } from "react-router-dom";
// import MessageDropdown from '../Components/chat';

export default function Seller1() {
<<<<<<< HEAD
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([
    { user: "Alice", text: "Hi there!" },
    { user: "Bob", text: "Hello!" },
  ]);

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, { user: "Me", text: newMessage }]);
  };
=======
    const [search, setSearch] = useState("");

  
    return (
      <>
        <div className="container-main">
          {/* Search and Searched Content */}
          <div className="search-container">
            <SearchBox search={search} setSearch={setSearch} />
           

            
          </div> </div>
          <div>
              <Link to='/listing/step1_eventdetails'><button className='add_event'>+Add Event</button></Link>
              <Link to='/listing/step3_ticketdetails'><button className='add_event'>+Add Ticket</button></Link>
          </div>
        <div className='container-serached'><Searchedcontent condition={true} search={search} setSearch={setSearch} /></div>
        
  
        
          <div className="features-container">
            <Featuresseller />
          </div>
  
          {/* FAQ Section */}
          <div className="faq-container">
            
          </div>
>>>>>>> 9f45d79e6228f92150ded3eecfd1cd49586a6d96

  return (
    <>
      <div className="container-main">
        {/* Search and Searched Content */}
        <div className="search-container">
          <SearchBox search={search} setSearch={setSearch} />
        </div>
        <div>
          <Link to="/listing/step1_eventdetails">
            <button className="add_event">+Add Event</button>
          </Link>
        </div>
        <div className="container-serached">
          <Searchedcontent condition={true} search={search} setSearch={setSearch} />
        </div>

<<<<<<< HEAD
        <div className="features-container">
          <Featuresseller />
        </div>

        {/* FAQ Section */}
        <div className="faq-container"></div>
        <div className="container-faqs">
          <Faq faqData={faqDat} />
        </div>
=======
          <MessageDropdown />
>>>>>>> 9f45d79e6228f92150ded3eecfd1cd49586a6d96

        
      </div>
    </>
  );
}
