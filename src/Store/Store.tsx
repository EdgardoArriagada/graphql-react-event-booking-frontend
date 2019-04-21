import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { UIAction, initialUIState, UIReducer, UIState, UIActionTypes } from './Reducers/ui.reducer';
import { AuthState, initialAuthState, AuthReducer, AuthAction, AuthActionTypes } from './Reducers/auth.reducer';

const initialState = {
    UIState: { ...initialUIState },
    AuthState: { ...initialAuthState },
};

type MainActionTypes = UIActionTypes | AuthActionTypes;

interface MainAction {
    type: MainActionTypes;
    payload?: any;
}

const MainReducer = ({ UIState, AuthState }: MainState, action: MainAction) => ({
    UIState: UIReducer(UIState, action as UIAction),
    AuthState: AuthReducer(AuthState, action as AuthAction),
});

interface MainState {
    UIState: UIState;
    AuthState: AuthState;
}

interface MainStore {
    state: MainState;
    dispatch: Dispatch<MainAction>;
}

const StateContext = createContext({} as MainStore);

export const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(MainReducer, initialState);
    return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
