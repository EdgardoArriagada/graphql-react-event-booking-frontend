import React from 'react';
import { Theme, withStyles, WithStyles, Typography, Divider, Button } from '@material-ui/core';
import { IStyles } from '../../shared/styles/styles';
import AppModalContent from '../sharedComponents/AppModalContent';

const style = (theme: Theme): IStyles => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: '0.3rem 1.5rem',
    },
    content: {
        padding: '1.5rem',
    },
    actions: {
        padding: '.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

type Props = {
    closeModal: any;
};

type PropsWithStyles = Props & WithStyles<'header' | 'content' | 'actions'>;

const CreateEventModalContent: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    return (
        <AppModalContent>
            <React.Fragment>
                <Typography className={classes.header} variant="h6">
                    Some Header
                </Typography>
                <Typography className={classes.content}>Some Content</Typography>

                <Divider />

                <span className={classes.actions}>
                    <Button variant="text" color="primary" onClick={props.closeModal}>
                        Cancel
                    </Button>
                    <Button variant="raised" color="primary">
                        Create
                    </Button>
                </span>
            </React.Fragment>
        </AppModalContent>
    );
};

export default withStyles(style as any)(CreateEventModalContent);
