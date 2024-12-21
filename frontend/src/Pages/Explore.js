import React from "react";
import { useState } from 'react';
import EventBoxes from "../Components/EventBoxes";
import list from "../data";
import SubHeading from "../Components/Subheading";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";
import Search_Box from '../Components/Search_Box'
import Searched_content from '../Components/Searched_content'

function Explore(){
     const [search, setSearch] = useState("")
    return (
        <div>
            <Carousel />
            <SubHeading info="Discover your Next Event" />
            <Search_Box search={search} setSearch={setSearch}/>
            <Searched_content condition={false} search={search} setSearch={setSearch} />
         
            
        </div>
    );
}


export default Explore;