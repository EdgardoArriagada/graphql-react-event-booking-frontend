import React, { createContext, useContext, useReducer } from 'react';
import { initialUIState, UIReducer, UIState, UIStore } from './Reducers/ui.reducer';
import { AuthState, initialAuthState, AuthReducer, AuthStore } from './Reducers/auth.reducer';

interface MainState extends UIState, AuthState {}

interface MainStore extends UIStore, AuthStore {
    MainState: MainState;
}

const StateContext = createContext({} as MainStore);

export const StateProvider = ({ children }: any) => {
    const [UIState, UIDisptch] = useReducer(UIReducer, initialUIState);
    const [AuthState, AuthDispatch] = useReducer(AuthReducer, initialAuthState);

    const MainState: MainState = { ...UIState, ...AuthState };

    const MainStore: MainStore = { UIState, UIDisptch, AuthState, AuthDispatch, MainState };

    return <StateContext.Provider value={MainStore}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
