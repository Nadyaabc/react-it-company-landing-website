import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevStages from './pages/DevStages'
import Pricing from './pages/Pricing' // Страница "О нас"
import Home from './pages/Home'
import AppOrder from './pages/AppOrder'
import { Toolbar } from './components/Toolbar.jsx';

import AboutUs from './pages/AboutUs';
import './App.css';

function App() {
  return (
    <Router basename="/react-it-company-landing-website">
      <div className="container">
        <Toolbar/>
        <Routes>
          <Route path="/" element={<Home />} /> {}
          <Route path="/about-us" element={<AboutUs />} /> {}
          <Route path='/app-order' element={<AppOrder/>}/> {}
          <Route path='/dev-stages' element={<DevStages/>}/> {}          
          <Route path='/pricing' element={<Pricing/>}/> {}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;