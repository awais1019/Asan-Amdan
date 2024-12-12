import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLink = ({ href, text }) => {
    return (
        <li>
            {/* <a href={href}>{text}</a> */}
            <Link to={href}>{text}</Link>
        </li>
    );
};

export default NavbarLink;
