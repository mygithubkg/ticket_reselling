import React from "react";
import Category from "../Components/Categorization";
import { faqDat } from "../data";
import Footer from "../Components/Footer";
import Faq from "../Components/Faq_section";

function AddEvent(){
    return (
        <div>
            <Category />
            <Faq  faqData ={faqDat} />
            <Footer />
        </div>
    );
}

export default AddEvent;