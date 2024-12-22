import React, { useState } from "react";
import ManageUsers from "../ManagementComponents/ManageUsers";
import ManageServiceProviders from "../ManagementComponents/ManageServiceProviders";
import "../styles/Dashboards/AdminDashboard.css";
import ManageGigs from "../ManagementComponents/ManageGigs";
import CategoryForm from "../Category/CategoryForm.jsx";


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");

    const renderContent = () => {
        switch (activeTab) {
            case "users":
                return <ManageUsers />;
            case "serviceProviders":
                return <ManageServiceProviders />;
            case "gigs":
                return <ManageGigs />;
            case "categories":
                return <CategoryForm />;
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