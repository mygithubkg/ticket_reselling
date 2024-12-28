import React from "react";
import { faqDat } from "../data";
import Footer from "../Components/Footer";
import Faq from "../Components/Faq_section";
import EventDetails from "../Components/listing/Eventdetails";
import ProgressBar from "../Components/ProgressBar"


function AddEventstep2(){
    let currentStep =1
    return (
        <>
        <ProgressBar currentStep={currentStep}/>
       <div>
            <div>kmfceeeejeddddddddddddddddd</div>
            <EventDetails />
            <Faq  faqData ={faqDat} />
            
        </div>
        </>
    );
}

export default AddEventstep2;