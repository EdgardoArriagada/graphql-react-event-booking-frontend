import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './components/Auth/Auth';
import EventsPage from './components/Events/Events';
import BookingsPage from './components/Bookings/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import './app.scss';
import SideDrawer from './components/Navigation/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import { useStateValue } from './Store/Store';

function App() {
    const { UIState, AuthState } = useStateValue();
    const userLoggedIn = Boolean(AuthState.token);
    let backdrop;
    if (UIState.isSideDrawOpen) {
        backdrop = <Backdrop />;
    }
    return (
        <div className="main-content">
            <BrowserRouter>
                <MainNavigation />
                <SideDrawer />
                {backdrop}
                <main>
                    <Switch>
                        {!userLoggedIn && <Redirect from="/" to="/auth" exact />}
                        {userLoggedIn && <Redirect from="/" to="/events" exact />}
                        {userLoggedIn && <Redirect from="/auth" to="/events" exact />}
                        {!userLoggedIn && <Route path="/auth" component={AuthPage} />}
                        <Route path="/events" component={EventsPage} />
                        {userLoggedIn && <Route path="/bookings" component={BookingsPage} />}
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
