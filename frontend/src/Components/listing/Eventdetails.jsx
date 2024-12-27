import React from "react";
import "../../styles/Eventdetail.css";
import Faq from "../Faq_section";
import { faqDat } from "../../data";
import ProgressBar from "../ProgressBar"
function EventDetails(){
    let currentStep = 1
    return (
        <div>
            <ProgressBar currentStep={currentStep}/>
            <form className="categorycontainer2" action='/addevent_3'>
                <h1>Event Details</h1>
                    <div className="typees">
                        <label htmlFor=""></label>

                    </div>
                    <div className="typess">
                        <input type="submit" id="next" value="Next Page"/>
                    </div>
            </form>
            <div>
                <Faq faqData={faqDat}/>
            </div>
        </div>
    );
};

export default EventDetails;
