import React from 'react'
import { useState } from 'react';
import Faq from "../Components/Faq_section";
import { faqDat } from "../data";
import SearchBox from '../Components/SearchBox'
import Searchedcontent from "../Components/Searchedcontent"
import Featuresseller from "../Components/Features_seller"
import "../styles/Seller1.css"
import {Link} from "react-router-dom";


export default function Seller1() {
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
            </div>
        <div className='container-serached'><Searchedcontent condition={true} search={search} setSearch={setSearch} /></div>
        
  
        
          <div className="features-container">
            <Featuresseller />
          </div>
  
          {/* FAQ Section */}
          <div className="faq-container">
            
          </div>
          <div className='container-faqs'><Faq faqData={faqDat} /></div>
       
        
      </>
    );
  }