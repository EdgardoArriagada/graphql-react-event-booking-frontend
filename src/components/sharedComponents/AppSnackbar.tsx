import React, { useState, useEffect } from 'react';
import { Theme, withStyles, WithStyles, Button, Snackbar, IconButton } from '@material-ui/core';
import { IStyles } from '../../shared/models/styles.model';
import { Close } from '@material-ui/icons';

const style = (theme: Theme): IStyles => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

type Props = {
    message: string;
    duration?: number; // in seconds
    centered?: boolean;
};

type PropsWithStyles = Props & WithStyles<'close'>;

const AppSnackbar: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    const { message, duration, centered } = props;

    function handleClose() {
        setSnackbarOpen(false);
    }

    useEffect(() => {
        if (duration !== null && duration !== undefined) {
            setTimeout(() => {
                setSnackbarOpen(false);
            }, duration);
        }
    }, []);

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: centered ? 'center' : 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
                action={[
                    <Button
                        color="secondary"
                        aria-label="Close"
                        onClick={handleClose}
                        className={classes.close}
                        key="close"
                    >
                        DISMISS
                    </Button>,
                ]}
            />
        </React.Fragment>
    );
};

export default withStyles(style as any)(AppSnackbar);
