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
    const { token } = AuthState;
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
                <main className="main-content">
                    <Switch>
                        {!token && <Redirect from="/" to="/auth" exact />}
                        {token && <Redirect from="/" to="/events" exact />}
                        {token && <Redirect from="/auth" to="/events" exact />}
                        {!token && <Route path="/auth" component={AuthPage} />}
                        <Route path="/events" component={EventsPage} />
                        {token && <Route path="/bookings" component={BookingsPage} />}
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
