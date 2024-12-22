import React from 'react'
import "../styles/Event_Card.css"
import {useNavigate, Link} from "react-router-dom";

export default function Event_card({item}) {
  return (
    <div>
       <div className="card">
                  <img className="image" src={item.image} alt={item.name} />
                  <p className="name">{item.name}</p>
                  <p className="price">₹{item.price}</p>
                  <p className="details">{item.details}</p>
                </div>
    </div>
    
  )
}

