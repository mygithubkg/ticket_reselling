import React from "react";
import "./Headings.css"
function SubHeading(props){
    return (
        <div className="sub_heading">
            {props.info}
        </div>
    );

}

export default SubHeading;