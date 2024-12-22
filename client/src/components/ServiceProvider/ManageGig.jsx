import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // If you're using axios for HTTP requests

const ManageGigs = () => {
    const navigate = useNavigate();
    const [gigs, setGigs] = useState([
        { id: 1, title: "Logo Design", description: "Professional logo design services." },
        { id: 2, title: "Web Development", description: "Full-stack web development solutions." },
        { id: 3, title: "SEO Optimization", description: "Improve your website's ranking." },
    ]);

    const handleDelete = (id) => {
        const updatedGigs = gigs.filter((gig) => gig.id !== id);
        setGigs(updatedGigs);
    };

    const handleUpdate = (id) => {
        navigate(`/updateGigPage/${id}`);
    };

    const handleAddGig = () => {
        navigate("/Gig/addGig");
    };

    return (
        <div className="manage-gigs">
            <div className="header">
                <h3>Manage Gigs</h3>
                <button className="add-gig-button" onClick={handleAddGig}>
                    Add Gig
                </button>
            </div>
            <ul>
                {gigs.map((gig) => (
                    <li key={gig.id} className="gig-item">
                        <div className="gig-details">
                            <h4>{gig.title}</h4>
                            <p>{gig.description}</p>
                        </div>
                        <div className="gig-actions">
                            <button onClick={() => handleUpdate(gig.id)}>Update</button>
                            <button onClick={() => handleDelete(gig.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageGigs;
