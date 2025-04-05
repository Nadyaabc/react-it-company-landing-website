import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toolbar } from './components/Toolbar.jsx';
import DevStages from './pages/DevStages'
import Pricing from './pages/Pricing' // Страница "О нас"
import Home from './pages/Home'
import AppOrder from './pages/AppOrder'
import './i18n';
import AboutUs from './pages/AboutUs';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer 
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
    <ToastContainer/>
    </>
  );
}

export default App;