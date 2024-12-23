import React from 'react';
import "../styles/Footer.css"
import {Link} from "react-router-dom";

function Footer() {
  return (
    <div className="footer align_centre">
      
        <div className='logo_box align_centre'><div className="logo_button">TradeMyTicket</div></div>
      
      <div className="footer_links ">
        <Link to='/HowItWorks'><p>How it Works?</p></Link>
        <Link to='/Explore'><p>Explore</p></Link>
        <Link to='/Seller1'><p>sell</p></Link>
        <Link to='/ContactUs'><p>Contact us</p></Link>
        {/* <p>FAQs</p> */}
      </div>
    </div>
  );
}

export default Footer;
