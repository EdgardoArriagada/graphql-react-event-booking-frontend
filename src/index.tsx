import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { StateProvider } from './Store/Store';

ReactDOM.render(
    <StateProvider>
        <App />
    </StateProvider>,
    document.getElementById('root'),
);
