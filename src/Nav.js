import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';

class Nav extends React.Component {
    render() {
        const navStyle = {
            color: 'white',
            'textDecoration':'none'
        }
        return <nav>
            <Link style={navStyle} to="/">
                <h1> Logo </h1>
            </Link>
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li> Home </li>
                </Link>
                <Link style={navStyle} to="/contact">
                    <li> Contact Us </li>
                </Link>
                <Link style={navStyle} to="/about">
                    <li> About </li>
                </Link>
                <Link style={navStyle} to="/admin">
                    <li> Admin </li>
                </Link>
            </ul>
        </nav>
    }
}

export default Nav;
