import React from "react";
import PropTypes from "prop-types";
import "../styles/GigCard.css";

const GigCard = ({ image, name, profession, price, location, onClick }) => {
  return (
    <div className="gig-card" onClick={onClick}>
      <img src={image} alt={`${name}'s gig`} className="gig-card__image" />
      <div className="gig-card__content">
        <h3 className="gig-card__name">{name}</h3>
        <p className="gig-card__profession">{profession}</p>
        <p className="gig-card__price">Starts at: ${price}</p>
        <p className="gig-card__location">Location: {location}</p>
        <button className="gig-card__button">View Details</button>
      </div>
    </div>
  );
};

GigCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GigCard;
