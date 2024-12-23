import { useState } from 'react';
import Carousel from '../Components/Carousel';
import SubHeading from '../Components/Subheading';
import EventBoxes from '../Components/EventBoxes';
import Footer from '../Components/Footer';

import { tickets } from "../data";

import list from '../data';
import Search_Box from './SearchBox'
import Searched_content from './Searchedcontent'



function HomePage() {
  const [search, setSearch] = useState("")
  return (
    <>
      <Carousel />
      <Search_Box search={search} setSearch={setSearch}/>
      <Searched_content condition={false} search={search} setSearch={setSearch} />
      <SubHeading info="Trending Events" />
      <EventBoxes data= {tickets} />
      <SubHeading info="Popular Artist" />
      <EventBoxes data= {tickets} />
      
    </>
  );
}

export default HomePage;
