import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavbarComponents/Navbar';
import HomePage from './pages/HomePage';
import { links } from './data/links';
import { buttons } from './data/links';
// Hello world from Mohsin
const App = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar 
        logoText="Asan Rozgar" 
        logoHref="/" 
        links={links} 
        buttons={buttons} 
      />

   
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
