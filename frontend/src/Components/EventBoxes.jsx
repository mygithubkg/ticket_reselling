import React from 'react'
import Eventbox from './Eventbox';
import { useNavigate } from "react-router-dom";
import Event_Card from "./Event_Card";
import "../styles/Searched_content.css";


export default function EventBoxes(props) {
  console.log(props.data)

  const navigate = useNavigate();

  function handleonclick  (id)  {
    navigate(`/Event/${id}`)
 
    
  };

    return (
    <div className='card-container'>
      {props.data.map((x) => {
        return   <div onClick={() => handleonclick(x.id)}> <Event_Card item={x}/></div>;
      })}
    </div>
  )
}
