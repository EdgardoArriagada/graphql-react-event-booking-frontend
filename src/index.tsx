import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { StateProvider } from './Store/Store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { theme } from './shared/styles/styles';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <StateProvider>
            <App />
        </StateProvider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
