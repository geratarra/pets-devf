import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import "./navbar_style.css";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="teal accent-2" style={{ padding: "0% 2%" }}>
                    <div className="nav-wrapper">
                        <ul id="nav-mobile">
                            <li className="logo" style={{ cursor: "pointer" }}>
                                <a href="/">
                                    <i className="fas fa-paw"></i>
                                </a>
                            </li>
                            <li>
                                <NavLink to="/dogs" activeStyle={{ fontWeight: "bold" }}>
                                    Dogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cats" activeStyle={{ fontWeight: "bold" }}>
                                    Cats
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;