import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const NavbarButtonLink = ({ text, onClick, className, to }) => {
    if (to) {
        // If a 'to' prop is provided, use Link for navigation
        return (
            <Link to={to} className={`btn ${className}`}>
                {text}
            </Link>
        );
    }

    // Otherwise, render a regular button with onClick
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default NavbarButtonLink;
