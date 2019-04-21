export type AuthActionTypes = 'AUTH_LOG_IN' | 'AUTH_LOG_OUT' | null;

export interface AuthAction {
    type: AuthActionTypes;
    payload?: any;
}

export interface AuthState {
    isLogIn: boolean;
}

export const initialAuthState = { isLogIn: false };

export const AuthReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'AUTH_LOG_IN':
            return { isLogIn: true };
        case 'AUTH_LOG_OUT':
            return { isLogIn: false };
        default:
            return state || initialAuthState;
    }
};
