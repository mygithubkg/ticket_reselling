import React from 'react';
import "../styles/Footer.css"
import {Link} from "react-router-dom";

function Footer() {
  return (
    <div className="footer align_centre">
      
        <div className='logo_box align_centre'><div className="logo_button">Trade<span className='my'>My</span>Ticket</div></div>
      
      <div className="footer_links ">
        <Link id= "link" to='/HowItWorks'><p>How it Works?</p></Link>
        <Link id= "link" to='/Explore'><p>Explore</p></Link>
        <Link id= "link" to='/Seller1'><p>Sell</p></Link>
        <Link id= "link" to='/ContactUs'><p>Contact us</p></Link>
        
      </div>
    </div>
  );
}

export default Footer;
