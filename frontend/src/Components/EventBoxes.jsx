import React from 'react'
import Eventbox from './Eventbox';
import "../styles/EventBoxes.css";
export default function EventBoxes(props) {
  console.log(props.data)
    return (
    <div className='container'>
      {props.data.map((x) => {
        return <Eventbox img_id={x} />;
      })}
    </div>
  )
}
