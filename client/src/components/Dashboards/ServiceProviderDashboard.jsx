import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboards/ServiceProviderDashboard.css";
const ServiceProviderDashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [gigs, setGigs] = useState([]);
    const [serviceProvider, setServiceProvider] = useState({});
    const [newGig, setNewGig] = useState({ title: "", description: "", price: "" });

    // Fetching service provider data and gigs
    useEffect(() => {
        // Get service provider data
        const fetchServiceProvider = async () => {
            try {
                const response = await axios.get("/api/service-provider/profile");
                setServiceProvider(response.data);
            } catch (error) {
                console.error("Error fetching service provider data", error);
            }
        };

        // Get service provider gigs
        const fetchGigs = async () => {
            try {
                const response = await axios.get("/api/gigs");
                setGigs(response.data);
            } catch (error) {
                console.error("Error fetching gigs", error);
            }
        };

        fetchServiceProvider();
        fetchGigs();
    }, []);

    // Handle Gig CRUD operations
    const handleAddGig = async () => {
        try {
            const response = await axios.post("/api/gigs", newGig);
            setGigs([...gigs, response.data]);
            setNewGig({ title: "", description: "", price: "" });
        } catch (error) {
            console.error("Error adding gig", error);
        }
    };

    const handleUpdateProfile = async (updatedData) => {
        try {
            const response = await axios.put("/api/service-provider/update", updatedData);
            setServiceProvider(response.data);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div>
                        <h2>Profile Information</h2>
                        <p>First Name: {serviceProvider.firstName}</p>
                        <p>Last Name: {serviceProvider.lastName}</p>
                        <p>Email: {serviceProvider.email}</p>
                        <p>Username: {serviceProvider.username}</p>
                        <button onClick={() => setActiveTab("editProfile")}>Edit Profile</button>
                    </div>
                );
            case "editProfile":
                return (
                    <div>
                        <h2>Edit Profile</h2>
                        {/* Form for updating profile */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateProfile(serviceProvider);
                            }}
                        >
                            <input
                                type="text"
                                value={serviceProvider.firstName}
                                onChange={(e) => setServiceProvider({ ...serviceProvider, firstName: e.target.value })}
                            />
                            <input
                                type="text"
                                value={serviceProvider.lastName}
                                onChange={(e) => setServiceProvider({ ...serviceProvider, lastName: e.target.value })}
                            />
                            <input
                                type="email"
                                value={serviceProvider.email}
                                onChange={(e) => setServiceProvider({ ...serviceProvider, email: e.target.value })}
                            />
                            <input
                                type="text"
                                value={serviceProvider.username}
                                onChange={(e) => setServiceProvider({ ...serviceProvider, username: e.target.value })}
                            />
                            <button type="submit">Update</button>
                        </form>
                    </div>
                );
            case "gigs":
                return (
                    <div>
                        <h2>Manage Gigs</h2>
                        <ul>
                            {gigs.map((gig) => (
                                <li key={gig._id}>
                                    {gig.title} - ${gig.price}
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <h3>Add New Gig</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddGig();
                            }}
                        >
                            <input
                                type="text"
                                value={newGig.title}
                                onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                                placeholder="Gig Title"
                            />
                            <input
                                type="text"
                                value={newGig.description}
                                onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                                placeholder="Gig Description"
                            />
                            <input
                                type="number"
                                value={newGig.price}
                                onChange={(e) => setNewGig({ ...newGig, price: e.target.value })}
                                placeholder="Gig Price"
                            />
                            <button type="submit">Add Gig</button>
                        </form>
                    </div>
                );
            default:
                return <h2>Select an option from the panel</h2>;
        }
    };

    return (
        <div className="dashboard">
            <div className="side-panel">
                <ul>
                    <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</li>
                    <li className={activeTab === "gigs" ? "active" : ""} onClick={() => setActiveTab("gigs")}>Manage Gigs</li>
                </ul>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ServiceProviderDashboard;
