import React, { useState } from "react";

function Display(props){
    const [isopen,setopen] = useState(false);

    const toggleanswer = ()=>{
        setopen(!isopen);
    };

    return (
        <div>
            <div className="Faq_question" onClick={toggleanswer}>
                <h3>{props.question}</h3>
                <span className="toogle-icon" >{isopen ? "-" : "+"}</span>
            </div>
            {isopen && (<div className="Faq_answer">
                <h4>{props.answer}</h4>
            </div>)}
        </div>
    );
}

export default Display;