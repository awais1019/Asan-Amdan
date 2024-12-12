import React from "react";
import GigCard from "./GigCard";
import "../styles/GigList.css"; // Import the grid styles

const GigList = ({ gigs, onGigClick }) => { // Accept onGigClick as a prop
  return (
    <div className="gig-list">
      {gigs.map((gig) => (
        <GigCard
          key={gig.id}
          image={gig.image}
          name={gig.name}
          profession={gig.profession}
          price={gig.price}
          location={gig.location}
          onClick={() => onGigClick(gig)} // Pass the gig to the click handler
        />
      ))}
    </div>
  );
};

export default GigList;
