import React from "react";
import Display from "./Faq_object";
import "../styles/Faq_section.css";

function Faq({faqData}){
    return(
        <div>
            <div className="Faq_placement">
            <h2>FAQ's</h2>
                {faqData.map((info)=>{
                    return (<Display 
                    key= {info.id}
                    question ={info.question}
                    answer = {info.answer}
                    />);
                })}
            </div>
        </div>
    );
}

export default Faq;