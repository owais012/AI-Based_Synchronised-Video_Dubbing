import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Contacts from './components/Contacts';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Price from './components/Price';
import TryMe from './components/TryMe';
import AboutUs from './components/AboutUs';  // Import the new AboutUs component
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/about" element={<AboutUs />} /> {/* New About Us route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/price" element={<Price />} />
        <Route path="/tryme" element={<TryMe />} />
        <Route path="/try-me" element={<TryMe />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
