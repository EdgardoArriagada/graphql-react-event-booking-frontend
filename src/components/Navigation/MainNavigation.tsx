import React, { useState } from 'react';
import DrawerToggleButton from './DrawerToggleButton';
import NavigationItems from './NavigationItems';
import MuIconButton from '@material-ui/core/IconButton';
import MuAccountCircle from '@material-ui/icons/AccountCircle';
import MuMenu from '@material-ui/core/Menu';
import MuMenuItem from '@material-ui/core/MenuItem';

import './mainNavigation.scss';
import { useStateValue } from '../../Store/Store';

const MainNavigation = () => {
    const { AuthState } = useStateValue();
    const userLoggedIn = Boolean(AuthState.token);
    const [anchorEl, setAnchorEl] = useState();
    const isMenuOpen = Boolean(anchorEl);
    function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    const renderMenu = (
        <MuMenu anchorEl={anchorEl} open={isMenuOpen} onClose={_ => setAnchorEl(null)}>
            <MuMenuItem onClick={void 0}>Profile</MuMenuItem>
            <MuMenuItem onClick={void 0}>Logout</MuMenuItem>
        </MuMenu>
    );

    return (
        <header className="main-navigation">
            <span className="main-navigation__logo">
                <span className="main-navigation__button">
                    <DrawerToggleButton />
                </span>
                <h1>EasyEvent</h1>
            </span>
            <span className="main-navigation__items">
                <span className="main-navigation__links">
                    <NavigationItems />
                </span>
                {userLoggedIn && (
                    <MuIconButton onClick={handleProfileMenuOpen}>
                        <MuAccountCircle className="account-circle" />
                    </MuIconButton>
                )}
            </span>
            {renderMenu}
        </header>
    );
};

export default MainNavigation;
