import React from 'react';

import './mainNavigation.scss';
import DrawerToggleButton from './DrawerToggleButton';
import NavigationItems from './NavigationItems';

const MainNavigation = () => (
    <header className="main-navigation">
        <span className="main-navigation__logo">
            <DrawerToggleButton />
            <h1>EasyEvent</h1>
        </span>
        <span className="main-navigation__items">
            <NavigationItems />
        </span>
    </header>
);

export default MainNavigation;
