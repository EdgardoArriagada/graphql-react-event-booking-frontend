export type UIActionTypes = 'UI_TOGGLE_SIDE_NAV' | null;

export interface UIAction {
    type: UIActionTypes;
    payload?: any;
}

export interface UIState {
    isSideDrawOpen: boolean;
}

export const initialUIState = { isSideDrawOpen: false };

export const UIReducer = (state: UIState, action: UIAction) => {
    switch (action.type) {
        case 'UI_TOGGLE_SIDE_NAV':
            return { isSideDrawOpen: !state.isSideDrawOpen };
        default:
            return state || initialUIState;
    }
};
