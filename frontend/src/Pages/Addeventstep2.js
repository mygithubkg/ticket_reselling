import React from "react";
import { faqDat } from "../data";
import Footer from "../Components/Footer";
import Faq from "../Components/Faq_section";
import EventDetails from "../Components/Eventdetails";

function AddEventstep2(){
    return (
        <div>
            <EventDetails />
            <Faq  faqData ={faqDat} />
            
        </div>
    );
}

export default AddEventstep2;