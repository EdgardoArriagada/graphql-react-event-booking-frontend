import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
    Card,
    Modal,
    Typography,
    Theme,
    withStyles,
    WithStyles,
    Divider,
    CardContent,
    CardHeader,
} from '@material-ui/core';
import { IStyles } from '../../shared/styles/styles';

import './events.scss';
import CreateEventModalContent from './CreateEventModalContent';
import { useStateValue } from '../../Store/Store';
import Axios from 'axios';

const style = (theme: Theme): IStyles => ({
    card: {
        width: '30rem',
        margin: '0.5rem auto',
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    list: {
        listStyle: 'none',
    },
    listItem: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
});

type Props = {};

type PropsWithStyles = Props & WithStyles<'card' | 'list' | 'listItem'>;

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

    const eventList = fetchedEvents.map((event: any) => (
        <Card className={classes.card} key={event._id}>
            <CardContent className={classes.listItem}>
                <CardHeader title={event.title} />
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                        {event.description}
                    </Typography>
                    <Typography>{event.price} USD </Typography>
                </CardContent>
            </CardContent>
        </Card>
    ));

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
                        <CreateEventModalContent closeModal={closeModal} />
                    </Modal>
                </React.Fragment>
            )}
            <section className={classes.list}>{eventList}</section>
        </div>
    );
};

export default withStyles(style as any)(EventsPage);
