import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import './auth.scss';
import { useStateValue } from '../../Store/Store';
import { appClasses } from '../../shared/styles/styles';
import config from '../../config';
import AppSnackbar from '../sharedComponents/AppSnackbar';

type AuthFormState = 'PRISTINE' | 'ERROR' | 'LOGIN_WRONG_CREDENTIALS' | 'SIGNUP_USER_EXISTS' | 'SIGNUP_SUCCESS';

const AuthPage = () => {
    const { AuthDispatch } = useStateValue();

    const [isLoginForm, setIsLogInForm] = useState(true);
    const [authFormState, setAuthFormState] = useState('PRISTINE' as AuthFormState);

    const inputEmail = useRef({} as HTMLInputElement);
    const inputPassword = useRef({} as HTMLInputElement);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        setAuthFormState('PRISTINE'); //important as snackbar appear only when state changes

        event.preventDefault();
        const email = inputEmail.current.value.trim();
        const password = inputPassword.current.value.trim();
        if (!email || !password) {
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
                    setAuthFormState('ERROR');
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                switch (isLoginForm) {
                    case true: // is login form
                        if (!resData.login) {
                            setAuthFormState('LOGIN_WRONG_CREDENTIALS');
                            return;
                        }

                        const { token, userId, tokenExpiration } = resData.login;
                        AuthDispatch({ type: 'AUTH_LOG_IN', token, userId, tokenExpiration });
                        return;

                    case false: // is signup form
                        if (!resData.createUser) {
                            setAuthFormState('SIGNUP_USER_EXISTS');
                            return;
                        }
                        setAuthFormState('SIGNUP_SUCCESS');
                        return;
                }
            })
            .catch(err => {
                setAuthFormState('ERROR');
            });
    };

    return (
        <React.Fragment>
            {authFormState === 'LOGIN_WRONG_CREDENTIALS' && <AppSnackbar message="Wrong credentials" centered />}
            {authFormState === 'SIGNUP_USER_EXISTS' && <AppSnackbar message="User already exists" centered />}
            {authFormState === 'SIGNUP_SUCCESS' && (
                <AppSnackbar message="User Creation have been SUCCESFULL" centered />
            )}
            {authFormState === 'ERROR' && (
                <AppSnackbar message="Error!: Check connection or call administrator" centered />
            )}

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
                <span />
                <Button
                    variant="contained"
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
