import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { UIActions, initialUIState, UIReducer, UIState } from './Reducers/ui.reducer';
import { AuthState, initialAuthState, AuthReducer, AuthActions } from './Reducers/auth.reducer';

const initialState = {
    UIState: { ...initialUIState },
    AuthState: { ...initialAuthState },
};

type MainActions = AuthActions | UIActions;

const MainReducer = ({ UIState, AuthState }: MainState, action: MainActions) => ({
    UIState: UIReducer(UIState, action as UIActions),
    AuthState: AuthReducer(AuthState, action as AuthActions),
});

interface MainState {
    UIState: UIState;
    AuthState: AuthState;
}

interface MainStore {
    state: MainState;
    dispatch: Dispatch<MainActions>;
}

const StateContext = createContext({} as MainStore);

export const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(MainReducer, initialState);
    return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
