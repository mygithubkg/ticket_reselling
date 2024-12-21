import '../styles/App.css';
import Header from '../Components/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn';
import HomePage from '../Components/HomePage'; // Extract the home page content to a separate component
import Register from './Register';
import RegisterPage from '../Components/Registerpage';
import Explore from './Explore';
import AddEvent from './Addevent';
import AddEventstep2 from './Addeventstep2';
import AddEventstep3 from './Addeventstep3';
import HowItWorks from "./HowItWorks"
import Footer from '../Components/Footer';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="Routes">
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path='/Addevent' element={<AddEvent />} />
          <Route path="/addevent_2" element={<AddEventstep2 />} />
          <Route path="/addevent_3" element={<AddEventstep3 />} />
          <Route path="/HowItworks" element={<HowItWorks />} />
        </Routes>
        </div>
        <Footer/>
        
        
      </div>
    </BrowserRouter>
  );
}

export default App;

