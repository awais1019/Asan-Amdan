import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavbarComponents/Navbar';
import HomePage from './Pages/HomePage';
import { links } from './data/links';
import { buttons } from './data/links';
import SignUp from './components/AuthenticationComponents/UserSignUp';
import SignIn from './components/AuthenticationComponents/UserSignIn';

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
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
