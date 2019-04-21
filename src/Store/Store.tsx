import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { UIAction, initialUIState, uiReducer, UIState } from './Reducers/ui-reducer';

const initialState = {
    uiState: { ...initialUIState },
};

const mainReducer = ({ uiState }: any, action: any) => ({
    uiState: uiReducer(uiState, action),
});

interface State {
    uiState: UIState;
}

interface Store {
    state: State;
    dispatch: Dispatch<UIAction>;
}

const StateContext = createContext({} as Store);

export const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
