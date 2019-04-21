import { Dispatch } from 'react';

export interface AuthStore {
    AuthState: AuthState;
    AuthDispatch: Dispatch<AuthActions>;
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

// Actions
interface AuthLogIn {
    type: 'AUTH_LOG_IN';
}

interface AuthLogOut {
    type: 'AUTH_LOG_OUT';
}

type AuthActions = AuthLogIn | AuthLogOut;
