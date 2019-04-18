import React, { createContext, useContext, useReducer } from 'react';

const initialState = { isSideDrawOpen: false };

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'TOGGLE_SIDE_NAV':
            return { isSideDrawOpen: !state.isSideDrawOpen };
        default:
            return initialState;
    }
};

interface IStore {
    state: any;
    dispatch: any;
}

const StateContext = createContext({} as IStore);

export const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);
