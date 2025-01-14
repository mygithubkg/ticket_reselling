import React from 'react'
import "../styles/Event_Card.css"
import {useNavigate, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
export default function Event_card({item}) {
 

  return (
    <div>
       <div className="card">
                  <div className='image-container'>
                   <img className="image-card" src={item.image_url} alt={item.name} />
                  </div>
                  <p className="name">{item.event_name}</p>
                  <p className="details">{item.event_bio}</p>
                  <div className='text_icon'>
                  <FontAwesomeIcon icon={faMapPin} size="2xl" style={{color:"#000000"}} />
                  <p>{item.event_date}</p>
                  </div>
                  <div className='text_icon'>
                  <FontAwesomeIcon icon={faCalendarDays} size="xl" style={{color:"#000000"}} />
                  <p>{item.event_location}</p>
                  </div>
                  
                
                  <div className='Price_container'>
                  <p className="price">₹{item.sellingPrice}</p>
                  </div>
                </div>
    </div>
    
  )
}

