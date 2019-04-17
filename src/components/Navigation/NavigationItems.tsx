import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationItems = () => (
    <nav>
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
);

export default NavigationItems;
