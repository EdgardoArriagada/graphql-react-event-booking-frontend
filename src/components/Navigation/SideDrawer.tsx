import React from 'react';
import NavigationItems from './NavigationItems';

import './sideDrawer.scss';
import { useStateValue } from '../../Store/Store';

const SideDrawer = () => {
    const { uiState } = useStateValue().state;

    let sideDrawerClasses = ['side-drawer'];
    if (uiState.isSideDrawOpen) {
        sideDrawerClasses.push('side-drawer__open');
    }
    return (
        <span className={sideDrawerClasses.join(' ')}>
            <NavigationItems />
        </span>
    );
};

export default SideDrawer;
