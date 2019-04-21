import React from 'react';

import './backdrop.scss';
import { useStateValue } from '../../Store/Store';

const Backdrop = () => {
    const { UIDisptch } = useStateValue();
    const clickHandler = () => {
        UIDisptch({ type: 'UI_TOGGLE_SIDE_NAV' });
    };
    return <div className="backdrop" onClick={clickHandler} />;
};

export default Backdrop;
