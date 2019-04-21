import React from 'react';

import './backdrop.scss';
import { useStateValue } from '../../Store/Store';

const Backdrop = () => {
    const { dispatch } = useStateValue();
    const clickHandler = () => {
        dispatch({ type: 'UI_TOGGLE_SIDE_NAV' });
    };
    return <div className="backdrop" onClick={clickHandler} />;
};

export default Backdrop;
