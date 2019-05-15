import React, { useState, useEffect } from 'react';
import { Theme, withStyles, WithStyles, LinearProgress } from '@material-ui/core';
import { appClasses } from '../../shared/styles/styles';

import { useStateValue } from '../../Store/Store';
import Axios from 'axios';
import BookingList from './BookingsList/BookingsList';
import { IStyles } from '../../shared/models/styles.model';
import config from '../../config';

const style = (theme: Theme): IStyles => ({
    card: { ...appClasses.card },
});

type PropsWithStyles = Props & WithStyles<'list' | 'card'>;

const BookingsPage: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    let _isActive: boolean = true;
    const { BookingsDispatch, AuthState } = useStateValue();
    // useState(1) is because 0 doesn't render the component
    const [progress, setProgress] = useState(1);
    function fetchEvents() {
        if (_isActive) {
            setProgress(10);
        }

        const requestBody = {
            query: `query {
                bookings {
                    _id
                    createdAt
                    event {
                        _id
                        title
                        date
                        price
                        creator {
                            _id
                        }
                    }
                }
            }`,
        };
        BookingsDispatch({ type: 'FETCH_BOOKINGS_PENDING' });
        Axios({
            url: config.getGraphqlUrl(),
            method: 'POST',
            data: requestBody,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthState.token,
            },
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    BookingsDispatch({ type: 'FETCH_BOOKINGS_REJECTED' });
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                BookingsDispatch({ type: 'FETCH_BOOKINGS_FULFILLED', bookings: resData.bookings });
                if (_isActive) {
                    setProgress(100);
                }
            })
            .catch(err => {
                BookingsDispatch({ type: 'FETCH_BOOKINGS_REJECTED' });
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

    return (
        <div className="bookins-page .app-centered-page">
            {Boolean(progress) && <LinearProgress variant="determinate" value={progress} />}
            <BookingList />
        </div>
    );
};

type Props = {};

export default withStyles(style as any)(BookingsPage);
