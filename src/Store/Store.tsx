import React, { createContext, useContext, useReducer } from 'react';
import { initialUIState, UIReducer, UIStore } from './Reducers/ui.reducer';
import { initialAuthState, AuthReducer, AuthStore } from './Reducers/auth.reducer';
import { EventsStore, initialEventsState, EventsReducer } from './Reducers/events.reducer';
import { BookingsStore, initialBookingsState, BookingsReducer } from './Reducers/bookings.reducer';

type MainStore = UIStore & AuthStore & EventsStore & BookingsStore;

const StateContext = createContext({} as MainStore);

export const StateProvider = ({ children }: any) => {
    const [UIState, UIDisptch] = useReducer(UIReducer, initialUIState);
    const [AuthState, AuthDispatch] = useReducer(AuthReducer, initialAuthState);
    const [EventsState, EventsDispatch] = useReducer(EventsReducer, initialEventsState);
    const [BookingsState, BookingsDispatch] = useReducer(BookingsReducer, initialBookingsState);

    const MainStore: MainStore = {
        UIState,
        UIDisptch,
        AuthState,
        AuthDispatch,
        EventsState,
        EventsDispatch,
        BookingsState,
        BookingsDispatch,
    };

    return <StateContext.Provider value={MainStore}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
