import React from "react";
import Category from "../Components/listing/Categorization";
import { faqDat } from "../data";
import Footer from "../Components/Footer";
import Faq from "../Components/Faq_section";
import ProgressBar from "../Components/ProgressBar"

function AddEvent(){
   let  currentStep = 1
    return (
        <div>
            <ProgressBar currentStep={currentStep}/>
            <Category />
            <Faq  faqData ={faqDat} />
            
        </div>
    );
}

export default AddEvent;