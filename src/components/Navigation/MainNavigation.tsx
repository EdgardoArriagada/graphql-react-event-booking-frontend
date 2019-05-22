import React, { useState } from 'react';
import DrawerToggleButton from './DrawerToggleButton';
import NavigationItems from './NavigationItems';
import MuIconButton from '@material-ui/core/IconButton';
import MuAccountCircle from '@material-ui/icons/AccountCircle';
import MuMenu from '@material-ui/core/Menu';
import MuMenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';

import './mainNavigation.scss';
import { useStateValue } from '../../Store/Store';
import { Toolbar, IconButton, Typography, Button, Theme, withStyles, WithStyles } from '@material-ui/core';
import { IStyles } from '../../shared/models/styles.model';

const styles = (theme: Theme): IStyles => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

type PropsWithStyles = Props & WithStyles<'root' | 'grow' | 'menuButton'>;

const MainNavigation: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { AuthState, AuthDispatch } = useStateValue();
    const userLoggedIn = Boolean(AuthState.token);
    const [anchorEl, setAnchorEl] = useState();
    const isMenuOpen = Boolean(anchorEl);

    function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleLogout() {
        AuthDispatch({ type: 'AUTH_LOG_OUT' });
        closeMenu();
    }

    function closeMenu() {
        setAnchorEl(null);
    }

    const renderMenu = (
        <MuMenu anchorEl={anchorEl} open={isMenuOpen} onClose={closeMenu}>
            <MuMenuItem onClick={void 0}>Profile</MuMenuItem>
            <MuMenuItem onClick={handleLogout}>Logout</MuMenuItem>
        </MuMenu>
    );

    return (
        <React.Fragment>
            <AppBar className="main-navigation">
                <Toolbar className="main-navigation__toolbar">
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
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

type Props = {};

export default withStyles(styles as any)(MainNavigation);
