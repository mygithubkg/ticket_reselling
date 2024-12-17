import React from "react";
import "../styles/EventBoxes.css"

function Eventbox(props){
    return (
        <div>
            <button className="button" >
                <img src={props.img_id} alt="image"  className="image"/>
            </button>
        </div>
    );
}

export default Eventbox;