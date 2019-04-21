import { Dispatch } from 'react';

export interface UIStore {
    UIState: UIState;
    UIDisptch: Dispatch<UIActions>;
}

export interface UIState {
    isSideDrawOpen: boolean;
}

export const initialUIState = { isSideDrawOpen: false };

export const UIReducer = (state: UIState, action: UIActions) => {
    switch (action.type) {
        case 'UI_TOGGLE_SIDE_NAV':
            return { isSideDrawOpen: !state.isSideDrawOpen };
        default:
            return state || initialUIState;
    }
};

//Actions
interface UIToggleSideNav {
    type: 'UI_TOGGLE_SIDE_NAV';
}

type UIActions = UIToggleSideNav;
