import React from 'react';
import NavbarLink from './NavbarLink'; // A reusable link component
import NavbarButton from './NavbarButton'; // A reusable button component
import '../styles/Navbar.css';

const Navbar = ({ logoText, logoHref, links, buttons }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href={logoHref} className="logo">{logoText}</a>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    {links.map((link, index) => (
                        <NavbarLink key={index} href={link.href} text={link.text} />
                    ))}
                </ul>
                <div className="nav-buttons">
                    {buttons.map((button, index) => (
                        <NavbarButton 
                            key={index} 
                            text={button.text} 
                            onClick={button.onClick} 
                            className={button.className} 
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
