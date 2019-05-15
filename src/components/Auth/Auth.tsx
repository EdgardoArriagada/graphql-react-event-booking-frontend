import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import './auth.scss';
import { useStateValue } from '../../Store/Store';
import { appClasses } from '../../shared/styles/styles';
import config from '../../config';

const AuthPage = () => {
    const { AuthDispatch } = useStateValue();

    const [isLoginForm, setIsLogInForm] = useState(true);
    const inputEmail = useRef({} as HTMLInputElement);
    const inputPassword = useRef({} as HTMLInputElement);
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
                    throw new Error('Failed!');
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                if (resData.login) {
                    const { token, userId, tokenExpiration } = resData.login;
                    AuthDispatch({ type: 'AUTH_LOG_IN', token, userId, tokenExpiration });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
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
    );
};

export default AuthPage;
