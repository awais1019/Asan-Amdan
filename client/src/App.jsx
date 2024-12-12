import React from "react";
import Navbar from "./components/Navbar";
import SliderContainer from "./components/SliderContainer";
import GigList from "./components/GigList";

// Importing data
import { links } from "./data/links";
import { buttons } from "./data/links";
import { slides } from "./data/slides";
import { gigs } from "./data/gigs";

const App = () => {
  const handleGigClick = (gig) => {
    alert(gig.name + " - " + gig.profession); // Handle the click here
  };

  return (
    <>
      {/* Navbar */}
      <Navbar logoText="Asan Rozgar" logoHref="/" links={links} buttons={buttons} />

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
  );
};

export default App;
