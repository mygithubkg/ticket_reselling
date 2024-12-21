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
import Profile from '../Components/profile/Profile';
import CurrentListing from "../Components/profile/CurrentListing";
import Dashboard from '../Components/profile/Dashboard';
import Orders from '../Components/profile/Orders';
import Wallet from '../Components/profile/Wallet';
import Recent from '../Components/profile/RecentEvents';
import PreviousListing from '../Components/profile/Previous Listing';
import Manage from '../Components/profile/Manage';
import Ratings from '../Components/profile/Ratings';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path='/Addevent' element={<AddEvent />} />
          <Route path="/addevent_2" element={<AddEventstep2 />} />
          <Route path="/addevent_3" element={<AddEventstep3 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/dashboard" element={<Dashboard />} />
          <Route path='/profile/orders' element={<Orders />} />
          <Route path='/profile/wallet' element={<Wallet />} />
          <Route path='/profile/recentevents' element={<Recent /> } />
          <Route path='/profile/currentlisting' element={<CurrentListing /> } /> 
          <Route path='/profile/previouslisting' element={<PreviousListing /> } />
          <Route path='/profile/manage' element={<Manage /> } />
          <Route path='/profile/ratings' element={<Ratings /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

