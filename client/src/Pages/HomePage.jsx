// HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SliderContainer from "../components/HomeComponents/SliderContainer";
import GigList from "../components/GigComponents/GigList";
import { slides } from "../data/slides";
import CategorySearchBar from "../components/HomeComponents/CategorySearchBar";

const HomePage = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchActiveGigs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/gig/getAllGigs", {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      setGigs(response.data.gigs);
    } catch (err) {
      setError("Failed to fetch gigs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveGigs();
  }, []);

  const handleGigClick = (gigId) => {
    // Navigate to the GigDetail page, passing the gig's id as a parameter
    navigate(`/gig/${gigId}`);
  };

  if (loading) return <p>Loading available gigs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SliderContainer slides={slides} />
      <CategorySearchBar />
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
