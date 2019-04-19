import React, { useRef, useState } from 'react';
import MuButton from '@material-ui/core/Button';
import axios from 'axios';

import './auth.scss';

const AuthPage = () => {
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
            url: 'http://localhost:3000/graphql',
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
                console.log(res.data);
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
            <div className="form-actions">
                <MuButton variant="contained" color="primary" type="submit">
                    {isLoginForm ? 'Login' : 'Signup'}
                </MuButton>
                <span />
                <MuButton variant="contained" color="primary" type="button" onClick={_ => setIsLogInForm(!isLoginForm)}>
                    Switch to {isLoginForm ? 'Signup' : 'Login'}
                </MuButton>
            </div>
        </form>
    );
};

export default AuthPage;
