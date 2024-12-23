import React from 'react'
import { useState } from 'react';
import Faq from "../Components/Faq_section";
import { faqDat } from "../data";
import Search_Box from '../Components/Search_Box'
import Searched_content from "../Components/Searched_content"
import Features_seller from "../Components/Features_seller"
import "../styles/Seller1.css"
import {Link} from "react-router-dom";


export default function Seller1() {
    const [search, setSearch] = useState("");
  
    return (
      <>
        <div className="container-main">
          {/* Search and Searched Content */}
          <div className="search-container">
            <Search_Box search={search} setSearch={setSearch} />
            <div>
              <Link to='/Addevent'><button className='add_event'>+Add Event</button></Link>
            </div>

            <Searched_content condition={true} search={search} setSearch={setSearch} />
          </div>
  
          {/* Features Section */}
          <div className="features-container">
            <Features_seller />
          </div>
  
          {/* FAQ Section */}
          <div className="faq-container">
            
          </div>
        </div>
        <Faq faqData={faqDat} />
      </>
    );
  }