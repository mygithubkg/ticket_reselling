import { useState } from 'react';
import Carousel from '../Components/Carousel';
import SubHeading from '../Components/Subheading';
import EventBoxes from '../Components/EventBoxes';
import Footer from '../Components/Footer';
import list from '../data';
import Search_Box from './Search_Box'
import Searched_content from './Searched_content'


function HomePage() {
  const [search, setSearch] = useState("")
  return (
    <>
      <Carousel />
      <Search_Box search={search} setSearch={setSearch}/>
      <Searched_content condition={true} search={search} setSearch={setSearch} />
      <SubHeading info="Trending Events" />
      <EventBoxes data={list} />
      <SubHeading info="Popular Artist" />
      <EventBoxes data={list} />
      
    </>
  );
}

export default HomePage;
