import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../Store/Store';

const NavigationItems = () => {
    const { AuthState } = useStateValue();
    return (
        <nav>
            <ul>
                {!AuthState.token && (
                    <li>
                        <NavLink to="/auth">Log In</NavLink>
                    </li>
                )}
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                {AuthState.token && (
                    <li>
                        <NavLink to="/bookings">Bookings</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavigationItems;
