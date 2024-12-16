import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Carousel from './Carousel';
import Eventbox from './Eventbox';
import SubHeading from './Subheading';
import Footer from './Footer';


const list = [
  'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
  'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
  'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
  'https://grammarpartyblog.com/wp-content/uploads/2013/01/ok_hand.jpg',
];


function App() {
  return (
    <div className="App">
      <Header />
      <Carousel />
      <SubHeading info = "Trending Events" />
      {list.map((x) => {
        return <Eventbox img_id={x} />;
      })}
      <SubHeading info = "Popular Artist" />
      {list.map((x) => {
        return <Eventbox img_id={x} />;
      })}
      <Footer />
    </div>
  );
}

export default App;
