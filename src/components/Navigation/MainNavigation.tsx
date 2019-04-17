import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.scss';

const MainNavigation = () => (
    <header className="main-navigation">
        <span className="main-navigation__logo">
            <h1>EasyEvent</h1>
        </span>
        <nav className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/auth">Log In</NavLink>
                </li>
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default MainNavigation;
