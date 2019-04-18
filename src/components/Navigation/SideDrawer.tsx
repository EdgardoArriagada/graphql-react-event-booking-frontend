import React from 'react';
import NavigationItems from './NavigationItems';

import './sideDrawer.scss';
import { useStateValue } from '../../Store';

const SideDrawer = () => {
    const { state } = useStateValue();

    let sideDrawerClasses = ['side-drawer'];
    if (state.isSideDrawOpen) {
        sideDrawerClasses.push('side-drawer__open');
    }
    return (
        <span className={sideDrawerClasses.join(' ')}>
            <NavigationItems />
        </span>
    );
};

export default SideDrawer;
