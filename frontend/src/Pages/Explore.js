import React from "react";
import { useState } from 'react';
import EventBoxes from "../Components/EventBoxes";
import list from "../data";
import SubHeading from "../Components/Subheading";
import Carousel from "../Components/Carousel";
import SearchBox from '../Components/SearchBox'
import Searchedcontent from '../Components/Searchedcontent'
import "../styles/Headings.css"
import Filters from "../Components/Filters";

function Explore(){
     const [search, setSearch] = useState("")
     const[EventType,setEventType] = useState("")
     const[date,setdate] = useState("")
     const[price,setprice] = useState("")
     
    return (
        <div>
           
            <Carousel />
            
            <div  className="heading" style={{margin:"25px 0px", alignContent:"center"}}> Discover your Next&nbsp;<span>Event</span></div>
            <div style={{width:'100%',display:"flex",justifyContent:"center"}}><SearchBox search={search} setSearch={setSearch}/></div>
            <Filters  setEventType={setEventType} setdate={setdate} setprice={setprice}  />
            <Searchedcontent condition={false} search={search} setSearch={setSearch}  EventType={EventType} date={date} price={price} />
         
            
        </div>
    );
}


export default Explore;