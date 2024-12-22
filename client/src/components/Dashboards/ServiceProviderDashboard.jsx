import React, { useState } from "react";
// import ManageGigs from "../ManagementComponents/ManageGigs";
// import Profile from "../ManagementComponents/Profile";
// import Settings from "../ManagementComponents/Settings";
import "../styles/Dashboards/ServiceProviderDashboard.css";
import GigDetailsPage from "../ServiceProvider/GigDetailsPage";
import ManageGigs from "../ServiceProvider/ManageGig.jsx";

const ServiceProviderDashboard = () => {
    const [activeTab, setActiveTab] = useState("gigs");

    const renderContent = () => {
        switch (activeTab) {
            case "gigs":
                return <ManageGigs/>
            case "profile":
                // return <Profile />;
            case "settings":
                // return <Settings />;
            default:
                return <h2>Select an option from the panel</h2>;
        }
    };

    return (
        <div className="service-provider-dashboard">
            <div className="side-panel">
                <ul>
                    <li 
                        className={activeTab === "gigs" ? "active" : ""}
                        onClick={() => setActiveTab("gigs")}
                    >
                        Manage Gigs
                    </li>
                    <li 
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </li>
                    <li 
                        className={activeTab === "settings" ? "active" : ""}
                        onClick={() => setActiveTab("settings")}
                    >
                        Settings
                    </li>
                </ul>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ServiceProviderDashboard;
