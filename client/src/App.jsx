
import React from 'react';
import Navbar from './Components/Navbar';
import SliderContainer from './Components/HomeComponents/SliderContainer';
import { Route, Routes } from 'react-router-dom';
import { links } from "./data/links";
import { buttons } from "./data/links";
import { slides } from "./data/slides";
import { gigs } from "./data/gigs";
import HomePage from './Pages/HomePage';
const App = () => {
  const handleGigClick = (gig) => {
    alert(gig.name + " - " + gig.profession); // Handle the click here
  };


    return (
        <>
            <Navbar 
                logoText="Asan Rozgar" 
                logoHref="/" 
                links={links} 
                buttons={buttons} 
            />
                    {/* Slider */}
      <SliderContainer slides={slides} />

      {/* Gigs Section */}
      <section className="gigs-section">
        <div className="container">
          <h1 className="section-title">Available Gigs</h1>
          <GigList gigs={gigs} onGigClick={handleGigClick} />
        </div>
      </section>
    </>

            <Routes>
                <Route path="/" element={<HomePage />} />

            </Routes>


        </>
    );

};

export default App;
