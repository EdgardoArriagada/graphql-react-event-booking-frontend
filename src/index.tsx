import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { StateProvider } from './Store/Store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#800080',
        },
    },
});

export const styles = {
    primaryButton: {
        margin: '0.25rem 0.1rem',
    },
};

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <StateProvider>
            <App />
        </StateProvider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
