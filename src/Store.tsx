import React, { createContext, useContext, useReducer, Dispatch } from 'react';

const initialState = { isSideDrawOpen: false };

export interface IAction {
    type: 'TOGGLE_SIDE_NAV' | null;
    payload?: any;
}
const reducer = (state: any, action: IAction) => {
    switch (action.type) {
        case 'TOGGLE_SIDE_NAV':
            return { isSideDrawOpen: !state.isSideDrawOpen };
        default:
            return initialState;
    }
};

interface IState {
    isSideDrawOpen: boolean;
}

interface IStore {
    state: IState;
    dispatch: Dispatch<IAction>;
}

const StateContext = createContext({} as IStore);

export const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
