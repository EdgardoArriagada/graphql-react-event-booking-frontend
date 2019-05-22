import React, { useEffect, useState } from 'react';
import {
    Card,
    Typography,
    Theme,
    withStyles,
    WithStyles,
    CardContent,
    CardHeader,
    IconButton,
    CardActions,
    Button,
} from '@material-ui/core';
import { appClasses } from '../../../shared/styles/styles';
import { Create, Delete } from '@material-ui/icons';
import classNames from 'classnames';
import { useStateValue } from '../../../Store/Store';
import { IStyles } from '../../../shared/models/styles.model';
import { IBooking } from '../../../shared/models/booking.model';
import Axios from 'axios';
import config from '../../../config';
import AppSnackbar from '../../sharedComponents/AppSnackbar';

const style = (theme: Theme): IStyles => ({
    card: { ...appClasses.card },
    cardContent: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: '-1rem 0', // gutter hack :-(
    },
    cardContentItem: {
        margin: '1rem 0', // gutter hack :-(
        flex: '1 0 200px',
    },
    cardHeader: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardDescription: {
        marginRight: '1rem',
    },
    cardActions: {
        width: '95%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

type SnackbarState = 'PRISTINE' | 'NOT_IMPLEMENTED_YET' | 'ERROR' | 'CANCEL_BOOKING_SUCCESSFUL';

type PropsWithStyles = Props &
    WithStyles<'card' | 'cardContent' | 'cardHeader' | 'cardContentItem' | 'cardDescription' | 'cardActions'>;

const BookingItem: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    let _isActive: boolean = true;
    const [progress, setProgress] = useState(0);
    const [snackbarState, setSnackbarState] = useState('PRISTINE' as SnackbarState);

    const { AuthState, BookingsDispatch } = useStateValue();
    const { booking } = props;
    const { event } = booking;
    const userLoggedIn = Boolean(AuthState.token);
    const isThisUser = AuthState.userId === booking.event.creator._id;
    function deleteBookingHandler() {
        if (!userLoggedIn) {
            alert('you should log in to cancel an event');
            return;
        }
        const requestBody = {
            query: `mutation {
                cancelBooking(bookingId: "${booking._id}") {
                  _id
                  title
                }
              }`,
        };
        BookingsDispatch({ type: 'CANCEL_BOOKINGS_PENDING' });
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
                    throw new Error('Failed!');
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                BookingsDispatch({ type: 'CANCEL_BOOKINGS_FULFILLED', bookingId: booking._id });
                if (_isActive) {
                    setSnackbarState('CANCEL_BOOKING_SUCCESSFUL');
                }
            })
            .catch(err => {
                BookingsDispatch({ type: 'CANCEL_BOOKINGS_REJECTED' });

                if (_isActive) {
                    setSnackbarState('ERROR');
                }
            });
    }

    async function handleDetailsClick() {
        if (_isActive) {
            await setSnackbarState('PRISTINE');
        }
        if (_isActive) {
            await setSnackbarState('NOT_IMPLEMENTED_YET');
        }
    }

    useEffect(() => {
        return () => {
            _isActive = false;
        };
    }, []);

    const showSnackBar = () => {
        switch (snackbarState) {
            case 'ERROR':
                return <AppSnackbar message="Error!: Check connection or call administrator" />;
            case 'NOT_IMPLEMENTED_YET':
                return <AppSnackbar message="Feature not implemented yet" />;
            case 'CANCEL_BOOKING_SUCCESSFUL':
                return <AppSnackbar message="Event have been cancelled successfully" />;
            default:
                return <div />;
        }
    };

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title={event.title}
                    action={
                        <React.Fragment>
                            {isThisUser && (
                                <IconButton aria-label="Edit">
                                    <Create fontSize="small" />
                                </IconButton>
                            )}
                            <IconButton aria-label="Delete" onClick={deleteBookingHandler}>
                                <Delete fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
                <CardContent className={classes.cardContent}>
                    <span className={classNames(classes.cardContentItem, classes.cardDescription)}>
                        <Typography variant="body1" gutterBottom>
                            {event.description}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                            {new Date(event.date).toLocaleString()}
                        </Typography>
                        <Typography variant="h6">{event.price} USD </Typography>
                    </span>
                    {isThisUser && (
                        <span className={classes.cardContentItem}>
                            <Typography variant="caption">You are the owner of this event</Typography>
                        </span>
                    )}
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button onClick={handleDetailsClick} variant="text">
                        Details
                    </Button>
                </CardActions>
            </Card>
            {showSnackBar()}
        </React.Fragment>
    );
};

type Props = {
    booking: IBooking;
    classes: any;
};

export default withStyles(style as any)(BookingItem);
