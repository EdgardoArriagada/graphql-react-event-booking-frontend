import React, { createContext, useContext, useReducer } from 'react';
import { initialUIState, UIReducer, UIState, UIStore } from './Reducers/ui.reducer';
import { AuthState, initialAuthState, AuthReducer, AuthStore } from './Reducers/auth.reducer';
import { EventsState, EventsStore, initialEventsState, EventsReducer } from './Reducers/events.reducer';

interface MainState extends UIState, AuthState, EventsState {}

interface MainStore extends UIStore, AuthStore, EventsStore {
    MainState: MainState;
}

const StateContext = createContext({} as MainStore);

export const StateProvider = ({ children }: any) => {
    const [UIState, UIDisptch] = useReducer(UIReducer, initialUIState);
    const [AuthState, AuthDispatch] = useReducer(AuthReducer, initialAuthState);
    const [EventsState, EventsDispatch] = useReducer(EventsReducer, initialEventsState);

    const MainState: MainState = { ...UIState, ...AuthState, ...EventsState };

    const MainStore: MainStore = {
        UIState,
        UIDisptch,
        AuthState,
        AuthDispatch,
        EventsState,
        EventsDispatch,
        MainState,
    };

    return <StateContext.Provider value={MainStore}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
