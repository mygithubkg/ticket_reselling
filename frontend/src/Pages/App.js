import '../styles/App.css';
import Header from '../Components/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn';
import HomePage from '../Components/HomePage'; // Extract the home page content to a separate component
import Register from './Register';
import RegisterPage from '../Components/Registerpage';
import Explore from './Explore';
import AddEvent from './Addevent';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

