import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">Asan Rozgar</a>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li><a href="/provide-service">Provide Service</a></li>
                    <li><a href="/order-service">Order Service</a></li>
                    <li><a href="/be-a-manager">Be a Manager</a></li>
                </ul>
                <div className="nav-buttons">
                    <button className="btn btn-primary">Sign In</button>
                    <button className="btn btn-success">Join</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
