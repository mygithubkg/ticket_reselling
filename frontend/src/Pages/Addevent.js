import React from "react";
import Category from "../Components/listing/Categorization";
import { faqDat } from "../data";
import Footer from "../Components/Footer";
import Faq from "../Components/Faq_section";

function AddEvent(){
    return (
        <div>
            <Category />
            <Faq  faqData ={faqDat} />
            
        </div>
    );
}

export default AddEvent;