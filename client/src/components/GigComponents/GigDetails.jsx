import React from "react";
import { useParams } from "react-router-dom";
import { gigs } from "../../data/gigs"; // Import the gigs data
import "../styles/GigDetail.css"; // Add styles for the detailed page

const GigDetail = () => {
  const { id } = useParams(); // Get the gig id from the URL parameters
  const gig = gigs.find((gig) => gig.id === parseInt(id)); // Find the gig based on the id

  if (!gig) {
    return <div className="gig-detail-container"><h2>Gig not found</h2></div>; // If no gig is found, show a message
  }

  // Example reviews and ratings data
  const reviews = [
    { name: "John Doe", comment: "Amazing service! Highly recommend.", rating: 5 },
    { name: "Jane Smith", comment: "Good work, but could be faster.", rating: 4 },
    { name: "Michael Brown", comment: "Great experience, will hire again!", rating: 5 }
  ];

  // Calculate the average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="gig-detail-container">
      <div className="gig-detail">
        <div className="gig-detail__image-container">
          <img src={gig.image} alt={gig.name} className="gig-detail__image" />
        </div>
        <div className="gig-detail__info">
          <h1 className="gig-detail__name">{gig.name}</h1>
          <h2 className="gig-detail__profession">{gig.profession}</h2>
          <p><strong>Price:</strong> ${gig.price}</p>
          <p><strong>Location:</strong> {gig.location}</p>
          <p><strong>Description:</strong> This is a detailed description of the gig. The service includes...</p>

          <div className="gig-detail__rating">
            <span className="rating">
              <strong>Average Rating:</strong> {averageRating.toFixed(1)} ⭐
            </span>
            <div className="reviews">
              {reviews.map((review, index) => (
                <div key={index} className="review-box">
                  <p><strong>{review.name}:</strong> {review.comment}</p>
                  <p><strong>Rating:</strong> {review.rating} ⭐</p>
                </div>
              ))}
            </div>
          </div>
          
          <button className="gig-detail__button">Take Service</button>
        </div>
      </div>
    </div>
  );
};

export default GigDetail;
