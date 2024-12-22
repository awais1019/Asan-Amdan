import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavbarComponents/Navbar';
import HomePage from './Pages/HomePage';
import { links } from './data/links';
import { buttons } from './data/links';
import SignUp from './Components/AuthenticationComponents/UserSignUp';
import SignIn from './Components/AuthenticationComponents/UserSignIn';
import CreateGig from './Components/GigComponents/MakeGig';
import GigDetail from './Components/GigComponents/GigDetails';
import ServiceProviderForm from './Components/AuthenticationComponents/ServiceProviderSignUp';

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
        <Route path="/provide-service" element={<CreateGig/>} />
        <Route path="/gig/:id" element={<GigDetail />} />
        <Route path="/service-provider-sign-up" element={<ServiceProviderForm />} />
      </Routes>
    </>
  );
};

export default App;
