import React from 'react';
import SliderContainer from '../components/HomeComponents/SliderContainer';
import GigList from '../components/GigComponents/GigList';
import { gigs } from '../data/gigs';
import { slides } from '../data/slides';
import CategorySearchBar from '../components/HomeComponents/CategorySearchBar';

const HomePage = () => {

  const handleGigClick = (gig) => {
    alert(`${gig.name} - ${gig.profession}`);
  };
  
  return (
    <>
      {/* Slider */}
      <SliderContainer slides={slides} />
      <CategorySearchBar />
      {/* Gigs Section */}
      <section className="gigs-section">
        <div className="container">
          <h1 className="section-title">Available Gigs</h1>
          <GigList gigs={gigs} onGigClick={handleGigClick} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
