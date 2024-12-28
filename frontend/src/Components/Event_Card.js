import React from 'react'
import "../styles/Event_Card.css"
import {useNavigate, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Event_card({item}) {
  return (
    <div>
       <div className="card">
                  <img className="image" src={item.photo} alt={item.name} />
                  <p className="name">{item.eventName}</p>
                  
                  <p className="price">₹{item.sellingPrice}</p>
                  <p className="details">{item.eventDescription}</p>
                </div>
    </div>
    
  )
}

