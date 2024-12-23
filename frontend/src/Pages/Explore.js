import React from "react";
import { useState } from 'react';
import EventBoxes from "../Components/EventBoxes";
import list from "../data";
import SubHeading from "../Components/Subheading";
import Carousel from "../Components/Carousel";
import SearchBox from '../Components/SearchBox'
import Searchedcontent from '../Components/Searchedcontent'

function Explore(){
     const [search, setSearch] = useState("")
    return (
        <div>
            <Carousel />
            <SubHeading info="Discover your Next Event" />
            <SearchBox search={search} setSearch={setSearch}/>
            <Searchedcontent condition={false} search={search} setSearch={setSearch} />
         
            
        </div>
    );
}


export default Explore;