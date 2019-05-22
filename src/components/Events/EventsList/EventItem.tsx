import React, { useState, useEffect } from 'react';
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
import { Create } from '@material-ui/icons';
import classNames from 'classnames';
import { useStateValue } from '../../../Store/Store';
import Axios from 'axios';
import { IStyles } from '../../../shared/models/styles.model';
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

type SnackbarState = 'PRISTINE' | 'NOT_IMPLEMENTED_YET' | 'ERROR';

type PropsWithStyles = Props &
    WithStyles<'card' | 'cardContent' | 'cardHeader' | 'cardContentItem' | 'cardDescription' | 'cardActions'>;

const EventItem: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    let _isActive: boolean = true;

    const [snackbarState, setSnackbarState] = useState('PRISTINE' as SnackbarState);

    async function detailsHandler() {
        if (_isActive) {
            await setSnackbarState('PRISTINE');
        }
        if (_isActive) {
            await setSnackbarState('NOT_IMPLEMENTED_YET');
        }
    }

    function bookEventHandler() {
        if (!userLoggedIn) {
            alert('you should log in to book an event');
            return;
        }
        const requestBody = {
            query: `mutation {
                bookEvent(eventId: "${event._id}") {
                  _id
                  createdAt
                  updatedAt
                }
              }`,
        };

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
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    }
    const { AuthState } = useStateValue();
    const { event } = props;
    const userLoggedIn = Boolean(AuthState.token);
    const isThisUser = AuthState.userId === event.creator._id;

    const showSnackBar = () => {
        switch (snackbarState) {
            case 'ERROR':
                return <AppSnackbar message="Error!: Check connection or call administrator" />;
            case 'NOT_IMPLEMENTED_YET':
                return <AppSnackbar message="Feature not implemented yet" />;
            default:
                return <div />;
        }
    };

    useEffect(() => {
        return () => {
            _isActive = false;
        };
    }, []);

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title={event.title}
                    action={
                        isThisUser && (
                            <IconButton aria-label="Edit">
                                <Create fontSize="small" />
                            </IconButton>
                        )
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
                    <Button variant="text" onClick={detailsHandler}>
                        Details
                    </Button>
                    {!isThisUser && (
                        <Button variant="text" color="primary" onClick={bookEventHandler}>
                            Book this
                        </Button>
                    )}
                </CardActions>
            </Card>

            {showSnackBar()}
        </React.Fragment>
    );
};

type Props = {
    event: any;
    classes: any;
};

export default withStyles(style as any)(EventItem);
