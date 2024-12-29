import React from "react";
import { useState } from 'react';
import EventBoxes from "../Components/EventBoxes";
import list from "../data";
import SubHeading from "../Components/Subheading";
import Carousel from "../Components/Carousel";
import SearchBox from '../Components/SearchBox'
import Searchedcontent from '../Components/Searchedcontent'
import "../styles/Headings.css"

function Explore(){
     const [search, setSearch] = useState("")
    return (
        <div>
            <Carousel />
            <div  className="heading" style={{margin:"25px 0px", alignContent:"center"}}> Discover your Next&nbsp;<span>Event</span></div>
            <div style={{width:'100%',display:"flex",justifyContent:"center"}}><SearchBox search={search} setSearch={setSearch}/></div>
            <Searchedcontent condition={false} search={search} setSearch={setSearch} />
         
            
        </div>
    );
}


export default Explore;