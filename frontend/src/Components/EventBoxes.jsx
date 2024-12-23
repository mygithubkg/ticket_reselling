import React from 'react'
import Eventbox from './Eventbox';
import "../styles/EventBoxes.css";
import Event_Card from "./Event_Card";


export default function EventBoxes(props) {
  console.log(props.data)
    return (
    <div className='container'>
      {props.data.map((x) => {
        return <Event_Card item={x}/>;
      })}
    </div>
  )
}
