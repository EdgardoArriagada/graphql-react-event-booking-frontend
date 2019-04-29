import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Card, Modal, Typography, Theme, withStyles, WithStyles, CardContent, CardHeader } from '@material-ui/core';
import { IStyles, appClasses } from '../../shared/styles/styles';

import './events.scss';
import CreateEventModalContent from './CreateEventModalContent';
import { useStateValue } from '../../Store/Store';
import Axios from 'axios';
import EventList from './EventsList/EventList';

const style = (theme: Theme): IStyles => ({
    card: { ...appClasses.card },
});

type PropsWithStyles = Props & WithStyles<'list' | 'card'>;

const EventsPage: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const [fetchedEvents, setFetchedEvents] = useState([]);
    function fetchEvents() {
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
                    throw new Error('Failed!');
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                console.log(resData);
                setFetchedEvents(resData.events);
            })
            .catch(err => {
                console.log(err);
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
        <div className="events-page">
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
            <EventList events={fetchedEvents} />
        </div>
    );
};

type Props = {};

export default withStyles(style as any)(EventsPage);
