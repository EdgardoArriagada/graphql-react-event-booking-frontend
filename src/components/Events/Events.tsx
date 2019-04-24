import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Card, Modal, Typography, Theme, withStyles, WithStyles } from '@material-ui/core';
import { IStyles } from '../../shared/styles/styles';

import './events.scss';
import CreateEventModalContent from './CreateEventModalContent';

const style = (theme: Theme): IStyles => ({
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

type PropsWithStyles = Props & WithStyles<'card' | 'button'>;

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
                <CreateEventModalContent />
            </Modal>
        </div>
    );
};

export default withStyles(style as any)(EventsPage);
