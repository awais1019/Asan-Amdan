import React from 'react';

const NavbarButton = ({ text, onClick, className }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default NavbarButton;
