import { Dispatch } from 'react';

export interface AuthStore {
    AuthState: AuthState;
    AuthDispatch: Dispatch<AuthActions>;
}

export interface AuthState {
    userId: string | null;
    token: string | null;
    tokenExpiration: number | null;
}

export const initialAuthState: AuthState = { token: null, userId: null, tokenExpiration: null };

export const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'AUTH_LOG_IN':
            const { token, userId, tokenExpiration } = action;
            return { token, userId, tokenExpiration };
        case 'AUTH_LOG_OUT':
            return initialAuthState;
        default:
            return state || initialAuthState;
    }
};

// Actions
interface AuthLogIn {
    type: 'AUTH_LOG_IN';
    userId: AuthState['userId'];
    token: AuthState['token'];
    tokenExpiration: AuthState['tokenExpiration'];
}

interface AuthLogOut {
    type: 'AUTH_LOG_OUT';
}

type AuthActions = AuthLogIn | AuthLogOut;
