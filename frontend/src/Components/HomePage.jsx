import { useState } from 'react';
import Carousel from '../Components/Carousel';
import SubHeading from '../Components/Subheading';
import EventBoxes from '../Components/EventBoxes';
import Footer from '../Components/Footer';

import { tickets } from "../data";

import list from '../data';
import Search_Box from './SearchBox'
import Searched_content from './Searchedcontent'
import "../styles/homepage.css"
import Features from "./Features"
import ProgressBar from "../Components/ProgressBar"



function HomePage() {
  const [search, setSearch] = useState("")
  let currentStep =1
  return (
    <>
    
    <div style={{ position: "relative" }}>
        
        <Carousel />
        <ProgressBar currentStep={currentStep}/>

        <div
          style={{
            position: "absolute",
            top: "50vh",
            left: "50%",
            transform: "translate(-50%, -50%)",
            
            width: "80%", 
            
          }}
        >
        <Search_Box search={search} setSearch={setSearch} />
        </div>
        <Searched_content condition={true} search={search} setSearch={setSearch} />
      </div>
      <div className='statement'>Buy and Sell Tickets&nbsp;<span> Effortlessly!</span></div>
      
      <Features/>
      

      
      <SubHeading info="Trending Events" />
      <EventBoxes data= {tickets} />
      <SubHeading info="Popular Artist" />
      <EventBoxes data= {tickets} />
      
    </>
  );
}

export default HomePage;
