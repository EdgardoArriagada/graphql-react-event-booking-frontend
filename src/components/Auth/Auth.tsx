import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import './auth.scss';
import { useStateValue } from '../../Store/Store';
import { appClasses } from '../../shared/styles/styles';
import config from '../../config';
import AppSnackbar from '../sharedComponents/AppSnackbar';

type SnackbarState =
    | 'PRISTINE'
    | 'ATTEMPT_WITH_EMPTY_fORM'
    | 'ERROR'
    | 'LOGIN_WRONG_CREDENTIALS'
    | 'SIGNUP_USER_EXISTS'
    | 'SIGNUP_SUCCESS';

const AuthPage = () => {
    const { AuthDispatch } = useStateValue();

    const [isLoginForm, setIsLogInForm] = useState(true);
    const [snackbarState, setSnackbarState] = useState('PRISTINE' as SnackbarState);

    const inputEmail = useRef({} as HTMLInputElement);
    const inputPassword = useRef({} as HTMLInputElement);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await setSnackbarState('PRISTINE'); //important as snackbar appear only when state changes

        const email = inputEmail.current.value.trim();
        const password = inputPassword.current.value.trim();
        if (!email || !password) {
            await setSnackbarState('ATTEMPT_WITH_EMPTY_fORM');
            return;
        }

        const signUpData = {
            query: `
            mutation {
                createUser(userInput: {email:"${email}", password:"${password}"}) {
                  _id
                  email
                }
              }
            `,
        };
        const loginData = {
            query: `
            query {
                login(email:"${email}", password:"${password}") {
                  userId
                  token
                  tokenExpiration
                }
              }
            `,
        };
        axios({
            url: config.getGraphqlUrl(),
            method: 'POST',
            data: isLoginForm ? loginData : signUpData,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    return setSnackbarState('ERROR');
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                switch (isLoginForm) {
                    case true: // is login form
                        if (!resData.login) {
                            return setSnackbarState('LOGIN_WRONG_CREDENTIALS');
                        }

                        const { token, userId, tokenExpiration } = resData.login;
                        AuthDispatch({ type: 'AUTH_LOG_IN', token, userId, tokenExpiration });
                        return;

                    case false: // is signup form
                        if (!resData.createUser) {
                            return setSnackbarState('SIGNUP_USER_EXISTS');
                        }
                        return setSnackbarState('SIGNUP_SUCCESS');
                }
            })
            .catch(err => {
                return setSnackbarState('ERROR');
            });
    };

    const showSnackBar = () => {
        switch (snackbarState) {
            case 'LOGIN_WRONG_CREDENTIALS':
                return <AppSnackbar message="Wrong credentials" centered />;
            case 'SIGNUP_USER_EXISTS':
                return <AppSnackbar message="User already exists" centered />;
            case 'SIGNUP_SUCCESS':
                return <AppSnackbar message="User Creation have been SUCCESFULL" centered />;
            case 'ERROR':
                return <AppSnackbar message="Error!: Check connection or call administrator" centered />;
            case 'ATTEMPT_WITH_EMPTY_fORM':
                return <AppSnackbar message="Please provide both Email and Password" centered />;
            default:
                return <div />;
        }
    };

    return (
        <React.Fragment>
            {showSnackBar()}
            <form className="auth-page" onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" ref={inputEmail} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={inputPassword} />
                </div>
                <Button variant="contained" color="primary" type="submit" style={appClasses.primaryButton}>
                    {isLoginForm ? 'Login' : 'Signup'}
                </Button>
                <Button
                    variant="text"
                    color="primary"
                    type="button"
                    style={appClasses.primaryButton}
                    onClick={_ => setIsLogInForm(!isLoginForm)}
                >
                    Switch to {isLoginForm ? 'Signup' : 'Login'}
                </Button>
            </form>
        </React.Fragment>
    );
};

export default AuthPage;
