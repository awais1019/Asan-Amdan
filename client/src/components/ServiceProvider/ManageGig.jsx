import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useServiceProviderAuth } from "../../Contexts/serviceProviderContexts";
import "../styles/CreateGig/ManageGig.css";

const ManageGigs = () => {
    const navigate = useNavigate();
    const { serviceProviderAuth } = useServiceProviderAuth();

    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch gigs from the backend
    useEffect(() => {
        const fetchGigs = async () => {
            setError("");
            setLoading(true);

            try {
                const response = await axios.get(
                    `http://localhost:4000/api/v1/gig/getServiceProviderGigs/${serviceProviderAuth.user._id}`,
                    {
                        headers: {
                            Authorization: `${serviceProviderAuth.token}`,
                        },
                    }
                );

                if (response.data.success) {
                    setGigs(response.data.gigs);
                } else {
                    setError(response.data.msg || "Failed to fetch gigs.");
                }
            } catch (err) {
                setError(`Server error. Could not retrieve gigs. ${err}`);
                console.error("Error fetching gigs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, [serviceProviderAuth]);

    // Handle Delete Gig
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this gig?")) return;

        try {
            const response = await axios.delete(
                `http://localhost:4000/api/v1/gig/deleteGig/${id}`,
                {
                    headers: {
                        Authorization: `${serviceProviderAuth.token}`,
                    },
                }
            );

            if (response.data.success) {
                const updatedGigs = gigs.filter((gig) => gig._id !== id);
                setGigs(updatedGigs);
            } else {
                setError(response.data.msg || "Failed to delete the gig.");
            }
        } catch (err) {
            console.error("Error deleting gig:", err);
            setError("Failed to delete the gig.");
        }
    };

    // Navigate to Update Gig Page
    const handleUpdate = (gig) => {
        navigate(`/Gig/UpdateGig/${gig._id}`);
    };
    // Navigate to Add Gig Page
    const handleAddGig = () => {
        navigate("/Gig/addGig");
    };

    // Loading State
    if (loading) return <div className="spinner">Loading gigs...</div>;

    // Error State
    if (error) return <p className="error">{error}</p>;

    // Empty Gigs State
    if (gigs.length === 0) return <p>No gigs found. Add one to get started!</p>;

    return (
        <div className="manage-gigs">
            <div className="header">
                <h3>Manage Gigs</h3>
                <button className="add-gig-button" onClick={handleAddGig}>
                    Add Gig
                </button>
            </div>
            <div className="gig-list">
                {gigs.map((gig) => (
                    <div key={gig._id} className="gig-card">
                        <div className="gig-details">
                            <h4>{gig.title}</h4>
                            <p>{gig.description}</p>
                            <p>Experience: {gig.experience} years</p>
                            <p>Price: ${gig.price}</p>
                            <p>Availability Hours: {gig.availabilityHours}</p>
                            <p>Location: {gig.location}</p>
                            <p>Category: {gig.category}</p>
                            <p>Status: {gig.status}</p>
                        </div>
                        <div className="gig-actions">
                            <button onClick={() => handleUpdate(gig)}>Update</button>
                            <button onClick={() => handleDelete(gig._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageGigs;
