import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Carousel from './Carousel';
import Eventbox from './Eventbox';
import SubHeading from './Subheading';
import Footer from './Footer';
import EventBoxes from "./EventBoxes"


const list = [
  "https://images.pexels.com/photos/29254310/pexels-photo-29254310/free-photo-of-mystical-autumn-landscape-in-foggy-hamburg.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
  'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
  'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
  "https://images.pexels.com/photos/29254310/pexels-photo-29254310/free-photo-of-mystical-autumn-landscape-in-foggy-hamburg.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];


function App() {
  return (
    <div className="App">
      <Header className="Header"/>
      
      <Carousel />
      <SubHeading info = "Trending Events" />
      <EventBoxes data={list}/>
      
      <SubHeading info = "Popular Artist" />
      <EventBoxes data={list}/>
      
      <Footer />
    </div>
  );
}

export default App;
