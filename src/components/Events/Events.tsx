import React, { useState, useEffect } from 'react';
import { Modal, Theme, withStyles, WithStyles, LinearProgress } from '@material-ui/core';
import { appClasses } from '../../shared/styles/styles';

import '../../index.scss';
import CreateEventModalContent from './CreateEventModalContent';
import { useStateValue } from '../../Store/Store';
import Axios from 'axios';
import EventsList from './EventsList/EventsList';
import { IStyles } from '../../shared/models/styles.model';
import config from '../../config';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const style = (theme: Theme): IStyles => ({
    card: { ...appClasses.card },
    fab: {
        position: 'fixed',
        right: '5%',
        bottom: '2rem',
        margin: theme.spacing.unit,
    },
});

type PropsWithStyles = Props & WithStyles<'card' | 'fab'>;

const EventsPage: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    let _isActive: boolean = true;
    const { EventsDispatch } = useStateValue();
    const [progress, setProgress] = useState(0);
    function fetchEvents() {
        if (_isActive) {
            setProgress(10);
        }
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
            url: config.getGraphqlUrl(),
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
                EventsDispatch({ type: 'FETCH_EVENTS_FULFILLED', events: resData.events });
                if (_isActive) {
                    setProgress(100);
                }
            })
            .catch(err => {
                EventsDispatch({ type: 'FETCH_EVENTS_REJECTED' });
            })
            .finally(() => {
                setTimeout(() => {
                    if (_isActive) {
                        setProgress(0);
                    }
                }, 300);
            });
    }

    useEffect(() => {
        fetchEvents();
        return () => {
            _isActive = false;
        };
    }, []);

    const { AuthState } = useStateValue();
    const userLoggedIn = Boolean(AuthState.token);
    const [isModalOpen, setModalOpen] = useState(false);
    function closeModal() {
        setModalOpen(false);
    }

    return (
        <div className="events-page app-centered-page">
            <LinearProgress variant="determinate" value={progress} style={{ opacity: progress ? 1 : 0 }} />
            {userLoggedIn && (
                <React.Fragment>
                    <Fab className={classes.fab} color="primary" type="button" onClick={_ => setModalOpen(true)}>
                        <AddIcon />
                    </Fab>
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
