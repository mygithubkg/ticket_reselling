import '../styles/App.css';
import Header from '../Components/Header';
import Carousel from '../Components/Carousel';
import Eventbox from '../Components/Eventbox';
import SubHeading from '../Components/Subheading';
import Footer from '../Components/Footer';
import list from '../data';
import EventBoxes from '../Components/EventBoxes';


function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/*slider */}
      <Carousel />


      {/* Trending Events */}
      <SubHeading info = "Trending Events" />
      <EventBoxes data = {list}/>

      {/*Popular Artist*/}
      <SubHeading info = "Popular Artist" />
      <EventBoxes data = {list}/>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
