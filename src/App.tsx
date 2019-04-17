import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './components/Auth/Auth';
import EventsPage from './components/Events/Events';
import BookingsPage from './components/Bookings/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import './App.scss';

const App = () => (
    <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
            <Switch>
                <Redirect from="/" to="/auth" exact />
                <Route path="/auth" component={AuthPage} />
                <Route path="/events" component={EventsPage} />
                <Route path="/bookings" component={BookingsPage} />
            </Switch>
        </main>
    </BrowserRouter>
);

export default App;
