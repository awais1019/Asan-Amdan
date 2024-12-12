import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavbarComponents/Navbar';
import HomePage from './Pages/HomePage';
import { links } from './data/links';
import { buttons } from './data/links';

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
        {/* <Route path='/register' element={<SignUpPage}/> */}
        {/* <Route path='/login' element={<SignInPage}/> */}
        {/* <Route path='/service-provider' element={<ServiceProviderAccountPage}/> */}



      </Routes>
    </>
  );
};

export default App;
