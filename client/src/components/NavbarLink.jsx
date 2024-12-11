import React from 'react';

const NavbarLink = ({ href, text }) => {
    return (
        <li>
            <a href={href}>{text}</a>
        </li>
    );
};

export default NavbarLink;
