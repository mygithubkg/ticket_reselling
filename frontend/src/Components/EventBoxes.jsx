import React from 'react'
import Eventbox from './Eventbox';
import { useNavigate } from "react-router-dom";
import Event_Card from "./Event_Card";
import "../styles/Searched_content.css";
import { useParams } from 'react-router-dom';

export default function EventBoxes(props) {
  // console.log(props.data);
  const navigate = useNavigate();

  function handleonclick  (id)  {
    navigate(`/Event/${id}`);
  };

    return (
    <div className='card-container'>
      {props.data.map((x) => {
        return   <div key={x.event_id} onClick={() => handleonclick(x.event_id)}> <Event_Card item={x}/></div>;
      })}
    </div>
  )
}
