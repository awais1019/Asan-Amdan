import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // If you're using axios for HTTP requests

const ManageGigs = () => {
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        // Fetch active gigs when the component loads
        axios.get("/api/gigs/active") // Assuming the API route returns active gigs
            .then(response => {
                setGigs(response.data.gigs);
            })
            .catch(error => {
                console.error("Error fetching gigs", error);
            });
    }, []);

    const handleDelete = (gigId) => {
        // Call API to delete the gig
        axios.delete(`/api/gigs/${gigId}`)
            .then(response => {
                // Remove the deleted gig from the list
                setGigs(gigs.filter(gig => gig._id !== gigId));
            })
            .catch(error => {
                console.error("Error deleting gig", error);
            });
    };

    return (
        <div className="gig-list">
            {gigs.map(gig => (
                <div className="gig-card" key={gig._id}>
                    <div className="gig-card-header">
                        <h3>{gig.title}</h3>
                        <div className="options">
                            <Link to={`/gigs/${gig._id}`}>View</Link>
                            <button onClick={() => handleDelete(gig._id)}>Delete</button>
                            <Link to={`/gigs/update/${gig._id}`}>Update</Link>
                        </div>
                    </div>
                    <p>{gig.description}</p>
                    <p>Price: ${gig.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ManageGigs;
