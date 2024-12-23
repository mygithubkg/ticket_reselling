import React from "react";
import "../styles/EventBoxes.css"

function Eventbox(props) {
    return (
        <div className="button">
               <div className=" image">
                <img src={props.img_id} alt="image"  className="image"/>
                </div>
            
        </div>
    );
}

export default Eventbox;