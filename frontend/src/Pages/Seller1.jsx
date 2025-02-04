import React, { useState,useEffect } from 'react';
import Faq from "../Components/Faq_section";
import { faqDat } from "../data";
import SearchBox from '../Components/SearchBox';
import Searchedcontent from "../Components/Searchedcontent";
import Featuresseller from "../Components/Features_seller";
import "../styles/Seller1.css";
import { Link } from "react-router-dom";
import EventList from "../Components/EventList"
// import MessageDropdown from '../Components/chat';

export default function Seller1() {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([
    { user: "Alice", text: "Hi there!" },
    { user: "Bob", text: "Hello!" },
  ]);
  const [searchBoxResults,setSearchBoxResults] = useState([{}]);
  const [id, setId] = useState(null);

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, { user: "Me", text: newMessage }]);
  };

  return (
    <>
      <div className="container-main">
        {/* Search and Searched Content */}
        <div className="search-container">
          <SearchBox search={search} setSearch={setSearch} searchBoxResults={searchBoxResults} id={id} setId={setId} sellerpage={true}/>
        
        <div style={{"display": "flex"
,
    "justify-content": "right",
    
        }}>
          <Link to="/listing/step1_eventdetails">
          <p className='add_event'>Event not listed? Add it now!</p>
          
            
          </Link></div>
        </div>
        <div className="container-serached">
        <EventList search={search} setSearchBoxResults={setSearchBoxResults}/>

          
        </div>
        {/* <div className="features-container">
          <Featuresseller />
        </div> */}

        {/* FAQ Section */}
        <div className="faq-container"></div>
        <div className="container-faqs">
          <Faq faqData={faqDat} />
        </div>

        
      </div>
    </>
  );
}
