import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from './components/Auth/Auth';
import EventsPage from './components/Events/Events';
import BookingsPage from './components/Bookings/Bookings';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to="/auth" exact />
                <Route path="/auth" component={AuthPage} />
                <Route path="/events" component={EventsPage} />
                <Route path="/bookings" component={BookingsPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
