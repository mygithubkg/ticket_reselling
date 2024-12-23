import React from "react";
import "../styles/HowItWorks.css";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();
  const handlebuy = ()=>{
    navigate('/Explore');
  }
  const handlesell = ()=>{
    navigate('/Seller1');
  }
  return (

    <div className="how-it-works">
      <header className="how-it-works-header">
        <h1>How It Works</h1>
        <p>Discover how easy it is to buy and sell tickets on our platform.</p>
      </header>

      <section className="process-section">
        <div className="process-card">
          <h2>For Buyers</h2>
          <ol>
            <li>
              <strong>Search for Tickets:</strong> Use our search bar to find tickets for events you want to attend.
            </li>
            <li>
              <strong>Secure Purchase:</strong> Pay securely with our trusted payment system.
            </li>
            <li>
              <strong>Receive Your Ticket:</strong> Instantly receive your ticket electronically in your account or via email.
            </li>
          </ol>
          <p>
            Enjoy transparent pricing with no hidden fees. All tickets are verified for authenticity.
          </p>
        </div>

        <div className="process-card">
          <h2>For Sellers</h2>
          <ol>
            <li>
              <strong>List Your Ticket:</strong> Upload your ticket with details like event, date, and seat number.
            </li>
            <li>
              <strong>Set Your Price:</strong> Choose a fair price, or let us recommend one based on market trends.
            </li>
            <li>
              <strong>Get Paid:</strong> Once your ticket is sold, receive your payment directly into your account.
            </li>
          </ol>
          <p>
            We ensure a hassle-free experience with secure transfers and guaranteed payouts.
          </p>
        </div>
      </section>

      <footer className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of users who buy and sell tickets seamlessly on our platform.
        </p>
        <div className="cta-buttons">
          <button className="cta-button" onClick={handlebuy}>Start Buying</button>
          <button className="cta-button" onClick={handlesell}>Start Selling</button>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
