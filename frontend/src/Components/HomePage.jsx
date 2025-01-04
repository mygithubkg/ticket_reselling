import { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Carousel from '../Components/Carousel';
import SubHeading from '../Components/Subheading';
import EventBoxes from '../Components/EventBoxes';
import Search_Box from './SearchBox';
import Searched_content from './Searchedcontent';
import Features from "./Features";
import "../styles/homepage.css";
import { tickets } from "../data";

function HomePage() {
  const [search, setSearch] = useState("");
  

  return (
    <>
     

     

      <div style={{ position: "relative" }}>
        <Carousel />
        <div style={{ width: "100%", display: 'flex', justifyContent: "center" }}>
          <div style={{ position: "relative", padding: "0 10px", width: "50%" }}>
            <Search_Box search={search} setSearch={setSearch} />
          </div>
        </div>
        <Searched_content condition={true} search={search} setSearch={setSearch} />
      </div>

      <div className='statement'>
        <span className='word'>Sell</span>&nbsp;Tickets&nbsp;
        <span className='effort'>Effortlessly!</span>
      </div>

      <Features />

      <SubHeading info="Trending Events" />
      <EventBoxes data={tickets} />
      <SubHeading info="Popular Artist" />
      <EventBoxes data={tickets} />
    </>
  );
}

export default HomePage;
