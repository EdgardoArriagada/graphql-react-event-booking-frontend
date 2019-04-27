import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Card, Modal, Typography, Theme, withStyles, WithStyles } from '@material-ui/core';
import { IStyles } from '../../shared/styles/styles';

import './events.scss';
import CreateEventModalContent from './CreateEventModalContent';
import { useStateValue } from '../../Store/Store';

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
    const { AuthState } = useStateValue();
    const userLoggedIn = Boolean(AuthState.token);
    const [isModalOpen, setModalOpen] = useState(false);
    function closeModal() {
        setModalOpen(false);
    }
    return (
        <div className="events-page">
            {userLoggedIn && (
                <div className="events-page_create-event">
                    <Card className={classes.card}>
                        <Typography>Share your own Event!</Typography>

                        <Button variant="contained" color="primary" type="button" onClick={_ => setModalOpen(true)}>
                            Create Event
                        </Button>
                    </Card>
                    <Modal open={isModalOpen} onClose={_ => setModalOpen(false)}>
                        <CreateEventModalContent closeModal={closeModal} />
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default withStyles(style as any)(EventsPage);
