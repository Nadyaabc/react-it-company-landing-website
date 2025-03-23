import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevStages from './pages/DevStages'
import Pricing from './pages/Pricing'
import AboutUs from './pages/AboutUs'; // Страница "О нас"
import Home from './pages/Home'
import AppOrder from './pages/AppOrder'

import './App.css';

function App() {
  return (
    <Router>
      <div className="container">

        <Routes>
          <Route path="/" element={<Home />} /> {/* Главная страница */}
          <Route path="/about-us" element={<AboutUs />} /> {/* О нас */}
          <Route path='/app-order' element={<AppOrder/>}/> {}
          <Route path='/dev-stages' element={<DevStages/>}/> {}
          
          <Route path='/pricing' element={<Pricing/>}/> {}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;