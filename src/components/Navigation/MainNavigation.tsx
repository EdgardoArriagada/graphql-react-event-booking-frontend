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
import { Toolbar, Theme, withStyles, WithStyles } from '@material-ui/core';
import { IStyles } from '../../shared/models/styles.model';
import AppSnackbar from '../sharedComponents/AppSnackbar';

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

type SnackbarState = 'PRISTINE' | 'NOT_IMPLEMENTED_YET' | 'LOGOUT_SUCCESSFUL' | 'ERROR';

type PropsWithStyles = Props & WithStyles<'root' | 'grow' | 'menuButton'>;

const MainNavigation: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { AuthState, AuthDispatch } = useStateValue();
    const userLoggedIn = Boolean(AuthState.token);
    const [anchorEl, setAnchorEl] = useState();
    const isMenuOpen = Boolean(anchorEl);
    const [snackbarState, setSnackbarState] = useState('PRISTINE' as SnackbarState);

    function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    async function handleLogout() {
        await setSnackbarState('PRISTINE');
        await AuthDispatch({ type: 'AUTH_LOG_OUT' });
        closeMenu();
        await setSnackbarState('LOGOUT_SUCCESSFUL');
    }

    async function handleProfileClick() {
        await setSnackbarState('PRISTINE');
        closeMenu();
        await setSnackbarState('NOT_IMPLEMENTED_YET');
    }

    function closeMenu() {
        setAnchorEl(null);
    }

    const renderMenu = (
        <MuMenu anchorEl={anchorEl} open={isMenuOpen} onClose={closeMenu}>
            <MuMenuItem onClick={handleProfileClick}>Profile</MuMenuItem>
            <MuMenuItem onClick={handleLogout}>Logout</MuMenuItem>
        </MuMenu>
    );

    const showSnackBar = () => {
        switch (snackbarState) {
            case 'ERROR':
                return <AppSnackbar message="Error!: Check connection or call administrator" />;
            case 'NOT_IMPLEMENTED_YET':
                return <AppSnackbar message="Feature not implemented yet" duration={3000} />;
            case 'LOGOUT_SUCCESSFUL':
                return <AppSnackbar message="You have logout successfully" duration={3000} />;
            default:
                return <div />;
        }
    };

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
            {showSnackBar()}
        </React.Fragment>
    );
};

type Props = {};

export default withStyles(styles as any)(MainNavigation);
