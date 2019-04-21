import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { UIActions, initialUIState, UIReducer, UIState } from './Reducers/ui.reducer';
import { AuthState, initialAuthState, AuthReducer, AuthActions } from './Reducers/auth.reducer';

interface MainState extends UIState, AuthState {}

interface MainStore {
    UIState: UIState;
    UIDisptch: Dispatch<UIActions>;
    AuthState: AuthState;
    AuthDispatch: Dispatch<AuthActions>;
    MainState: MainState;
}

const StateContext = createContext({} as MainStore);

export const StateProvider = ({ children }: any) => {
    let [UIState, UIDisptch] = useReducer(UIReducer, initialUIState);
    let [AuthState, AuthDispatch] = useReducer(AuthReducer, initialAuthState);
    let MainState: MainState = { ...UIState, ...AuthState };
    return (
        <StateContext.Provider value={{ UIState, UIDisptch, AuthState, AuthDispatch, MainState }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);
