export interface UIAction {
    type: 'TOGGLE_SIDE_NAV' | null;
    payload?: any;
}

export interface UIState {
    isSideDrawOpen: boolean;
}

export const initialUIState = { isSideDrawOpen: false };

export const uiReducer = (state: UIState, action: UIAction) => {
    switch (action.type) {
        case 'TOGGLE_SIDE_NAV':
            return { isSideDrawOpen: !state.isSideDrawOpen };
        default:
            return initialUIState;
    }
};
