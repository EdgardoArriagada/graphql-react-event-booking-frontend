import React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core';
import { appClasses, IStyles } from '../../shared/styles/styles';

const style = (theme: Theme): IStyles => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        maxWidth: '80%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        outline: 'none',
    },
});

type Props = {
    children: JSX.Element;
};

type PropsWithStyles = Props & WithStyles<'paper'>;

const AppModalContent: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    return (
        <div className={classes.paper} style={appClasses.modalCentered}>
            {props.children}
        </div>
    );
};

export default withStyles(style as any)(AppModalContent);
