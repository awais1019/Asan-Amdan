import React, { useState } from "react";
import ManageUsers from "../Admin/ManageUsers.jsx";
import ManageServiceProviders from "../Admin/ManageServiceProviders.jsx";
import "../styles/Dashboards/AdminDashboard.css";
import CategoryPage from "../../Pages/CategoryPage"
import PendingGigs from "../Admin/PendingGigs.jsx";


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");

    const renderContent = () => {
        switch (activeTab) {
            case "users":
                return <ManageUsers />;
            case "serviceProviders":
                return <ManageServiceProviders />;
            case "gigs":
                return <PendingGigs />;
            case "categories":
                return <CategoryPage />;
            default:
                return <h2>Select an option from the panel</h2>;
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="side-panel">
                <ul>
                    <li 
                        className={activeTab === "users" ? "active" : ""}
                        onClick={() => setActiveTab("users")}
                    >
                        Manage Users
                    </li>
                    <li 
                        className={activeTab === "serviceProviders" ? "active" : ""}
                        onClick={() => setActiveTab("serviceProviders")}
                    >
                        Manage Service Providers
                    </li>
                    <li 
                        className={activeTab === "gigs" ? "active" : ""}
                        onClick={() => setActiveTab("gigs")}
                    >
                        Approve Gigs
                    </li>
                    <li 
                        className={activeTab === "categories" ? "active" : ""}
                        onClick={() => setActiveTab("categories")}
                    >
                        Manage Categories
                    </li>
                </ul>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};
export default AdminDashboard;