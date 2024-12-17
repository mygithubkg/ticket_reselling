import Carousel from '../Components/Carousel';
import SubHeading from '../Components/Subheading';
import EventBoxes from '../Components/EventBoxes';
import Footer from '../Components/Footer';
import list from '../data';

function HomePage() {
  return (
    <>
      <Carousel />
      <SubHeading info="Trending Events" />
      <EventBoxes data={list} />
      <SubHeading info="Popular Artist" />
      <EventBoxes data={list} />
      <Footer />
    </>
  );
}

export default HomePage;
