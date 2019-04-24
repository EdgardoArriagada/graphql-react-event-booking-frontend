import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Card, Modal, Typography, Theme, withStyles, WithStyles } from '@material-ui/core';
import { appStyles, IStyles } from '../../shared/styles/styles';

import './events.scss';

const style = (theme: Theme): IStyles => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    card: {
        width: '30rem',
        padding: '1rem',
        margin: '2rem auto',
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

type Props = {};

type PropsWithStyles = Props & WithStyles<'paper' | 'card' | 'button'>;

const EventsPage: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div className="events-page">
            <Card className={classes.card}>
                <Typography>Share your own Event!</Typography>

                <Button variant="contained" color="primary" type="button" onClick={_ => setModalOpen(true)}>
                    Create Event
                </Button>
            </Card>
            <Modal open={isModalOpen} onClose={_ => setModalOpen(false)}>
                <div className={classes.paper} style={appStyles.modalCentered}>
                    <Typography>Some Typography</Typography>
                </div>
            </Modal>
        </div>
    );
};

export default withStyles(style as any)(EventsPage);
