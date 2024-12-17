import React from "react";
import "../styles/Headings.css"


function SubHeading(props){
    return (
        <div className="sub_heading">
            {props.info}
        </div>
    );

}

export default SubHeading;