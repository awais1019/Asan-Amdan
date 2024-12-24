// GigList.jsx
import React from "react";
import GigCard from "./GigCard";
import "../styles/GigList.css"; // Import the grid styles

const GigList = ({ gigs, onGigClick }) => {
  return (
    <div className="gig-list">
      {gigs.map((gig) => (
        <GigCard
          key={gig._id} // Use _id instead of id
          image={gig.image}
          title={gig.title} // Passing title prop
          description={gig.description} // Passing description prop
          profession={gig.profession}
          price={gig.price}
          location={gig.location}
          onClick={() => onGigClick(gig._id)} // Pass the gig to the click handler
        />
      ))}
    </div>
  );
};

export default GigList;
