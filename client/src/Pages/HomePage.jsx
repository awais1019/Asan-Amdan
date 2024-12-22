// HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import SliderContainer from "../components/HomeComponents/SliderContainer";
import GigList from "../components/GigComponents/GigList";
import { gigs } from "../data/gigs";
import { slides } from "../data/slides";
import CategorySearchBar from "../components/HomeComponents/CategorySearchBar";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleGigClick = (gig) => {
    // Navigate to the GigDetail page, passing the gig's id as a parameter
    navigate(`/gig/${gig.id}`);
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
