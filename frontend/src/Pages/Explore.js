import React from "react";
import EventBoxes from "../Components/EventBoxes";
import list from "../data";
import SubHeading from "../Components/Subheading";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";

function Explore(){
    return (
        <div>
            <Carousel />
            <SubHeading info="Discover your Next Event" />
            <EventBoxes data={list} />
            <EventBoxes data={list} />
            <Footer />
        </div>
    );
}


export default Explore;