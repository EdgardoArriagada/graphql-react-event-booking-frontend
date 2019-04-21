import React from 'react';

import './drawerToggleButton.scss';
import { useStateValue } from '../../Store/Store';

const DrawerToggleButton = () => {
    const { dispatch } = useStateValue();
    const clickHandler = () => {
        dispatch({ type: 'UI_TOGGLE_SIDE_NAV' });
    };
    return (
        <button className="drawer-toggle-button" onClick={clickHandler}>
            <div className="drawer-toggle-button__line" />
            <div className="drawer-toggle-button__line" />
            <div className="drawer-toggle-button__line" />
        </button>
    );
};

export default DrawerToggleButton;
