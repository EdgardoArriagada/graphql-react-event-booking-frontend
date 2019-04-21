export type AuthActions = AuthLogIn | AuthLogOut | AuthDefault;

interface AuthLogIn {
    type: 'AUTH_LOG_IN';
}

interface AuthLogOut {
    type: 'AUTH_LOG_OUT';
}

interface AuthDefault {
    type: null;
    payload?: null;
}

export interface AuthState {
    isLogIn: boolean;
}

export const initialAuthState = { isLogIn: false };

export const AuthReducer = (state: AuthState, action: AuthActions) => {
    switch (action.type) {
        case 'AUTH_LOG_IN':
            return { isLogIn: true };
        case 'AUTH_LOG_OUT':
            return { isLogIn: false };
        default:
            return state || initialAuthState;
    }
};
