export type UIActions = UIToggleSideNav | UIDefault;

interface UIToggleSideNav {
    type: 'UI_TOGGLE_SIDE_NAV';
}

interface UIDefault {
    type: null;
    payload?: null;
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
