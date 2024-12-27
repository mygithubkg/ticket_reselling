import React from 'react'
import { useState } from 'react';
import Faq from "../Components/Faq_section";
import { faqDat } from "../data";
import SearchBox from '../Components/SearchBox'
import Searchedcontent from "../Components/Searchedcontent"
import Featuresseller from "../Components/Features_seller"
import "../styles/Seller1.css"
import {Link} from "react-router-dom";
import MessageDropdown from '../Components/chat';

export default function Seller1() {
    const [search, setSearch] = useState("");
    const [messages, setMessages] = useState([
      { user: "Alice", text: "Hi there!" },
      { user: "Bob", text: "Hello!" },
    ]);
  
    const handleSendMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, { user: "Me", text: newMessage }]);
    };
  
    return (
      <>
        <div className="container-main">
          {/* Search and Searched Content */}
          <div className="search-container">
            <SearchBox search={search} setSearch={setSearch} />
            <div>
              <Link to='/listing'><button className='add_event'>+Add Event</button></Link>
            </div>

            <Searchedcontent condition={true} search={search} setSearch={setSearch} />
          </div>
  
          {/* Features Section */}
          <div className="features-container">
            <Featuresseller />
          </div>
  
          {/* FAQ Section */}
          <div className="faq-container">
            
          </div>
          <MessageDropdown messages={messages} onSendMessage={handleSendMessage} />
        </div>
        <Faq faqData={faqDat} />

        
      </>
    );
  }