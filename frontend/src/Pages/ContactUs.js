import React from 'react'
import "../styles/contactus.css"
import { useState } from 'react';
export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const API_URL = process.env.REACT_APP_API_BASE_URL;  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;  
    const response = await fetch (`${API_URL}/user/sendmail`, {   
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name,email,message}),
      credentials: "include",
      withcredentials: true,
    });
    
    console.log(response);
    const result = await response.json();
    if (result.success) {
      console.log("Email sent successfully");
      setSubmitted(true);
    } else {
      console.log("Email not sent");
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>
      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Thank you for contacting us!</h2>
          <p>We will get back to you soon.</p>
        </div>
      )}
    </div>
  )
}
