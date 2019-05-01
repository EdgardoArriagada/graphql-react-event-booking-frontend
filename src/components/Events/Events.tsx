import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Card, Modal, Typography, Theme, withStyles, WithStyles, LinearProgress } from '@material-ui/core';
import { appClasses } from '../../shared/styles/styles';

import '../../index.scss';
import CreateEventModalContent from './CreateEventModalContent';
import { useStateValue } from '../../Store/Store';
import Axios from 'axios';
import EventsList from './EventsList/EventsList';
import { IStyles } from '../../shared/models/styles.model';

const style = (theme: Theme): IStyles => ({
    card: { ...appClasses.card },
});

type PropsWithStyles = Props & WithStyles<'list' | 'card'>;

const EventsPage: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { EventsDispatch } = useStateValue();
    // useState(1) is because 0 doesn't render the component
    const [progress, setProgress] = useState(1);
    function fetchEvents() {
        setProgress(10);
        const requestBody = {
            query: `query {
                events {
                    _id
                    title
                    description
                    date
                    price
                    creator{
                        _id
                        email
                    }
                }
            }`,
        };
        EventsDispatch({ type: 'FETCH_EVENTS_PENDING' });
        Axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: requestBody,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    EventsDispatch({ type: 'FETCH_EVENTS_REJECTED' });
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                console.log(resData);
                EventsDispatch({ type: 'FETCH_EVENTS_FULFILLED', events: resData.events });
                setProgress(100);
            })
            .catch(err => {
                EventsDispatch({ type: 'FETCH_EVENTS_REJECTED' });
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setProgress(0);
                }, 300);
            });
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const { AuthState } = useStateValue();
    const userLoggedIn = Boolean(AuthState.token);
    const [isModalOpen, setModalOpen] = useState(false);
    function closeModal() {
        setModalOpen(false);
    }

    return (
        <div className="events-page app-centered-page">
            {Boolean(progress) && <LinearProgress variant="determinate" value={progress} />}
            {userLoggedIn && (
                <React.Fragment>
                    <Card className={classes.card}>
                        <Typography>Share your own Event!</Typography>

                        <Button variant="contained" color="primary" type="button" onClick={_ => setModalOpen(true)}>
                            Create Event
                        </Button>
                    </Card>
                    <Modal open={isModalOpen} onClose={_ => setModalOpen(false)}>
                        <CreateEventModalContent closeModal={closeModal} fetchEvents={fetchEvents} />
                    </Modal>
                </React.Fragment>
            )}
            <EventsList />
        </div>
    );
};

type Props = {};

export default withStyles(style as any)(EventsPage);
