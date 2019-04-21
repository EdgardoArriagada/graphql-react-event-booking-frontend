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
    const { uiState } = useStateValue().state;

    let backdrop;
    if (uiState.isSideDrawOpen) {
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
                        <Redirect from="/" to="/auth" exact />
                        <Route path="/auth" component={AuthPage} />
                        <Route path="/events" component={EventsPage} />
                        <Route path="/bookings" component={BookingsPage} />
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
