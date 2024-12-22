import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the gig ID from the URL

const GigDetailsPage = () => {
    const { gigId } = useParams(); // Get the gig ID from the URL
    const [gigDetails, setGigDetails] = useState(null);

    useEffect(() => {
        // Fetch the gig details based on the gig ID
        axios.get(`/api/gigs/${gigId}`)
            .then(response => {
                setGigDetails(response.data.gig);
            })
            .catch(error => {
                console.error("Error fetching gig details", error);
            });
    }, [gigId]);

    if (!gigDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="gig-details">
            <h2>{gigDetails.title}</h2>
            <p>{gigDetails.description}</p>
            <p>Price: ${gigDetails.price}</p>
            <p>Location: {gigDetails.location}</p>
            <p>Orders Completed: {gigDetails.ordersCompleted}</p>
            <p>Overall Earnings: ${gigDetails.overallEarnings}</p>
        </div>
    );
};

export default GigDetailsPage;
