import React from 'react';
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
import { IStyles } from '../../../shared/models/styles.model';
import { IBooking } from '../../../shared/models/booking.model';

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

type PropsWithStyles = Props &
    WithStyles<'card' | 'cardContent' | 'cardHeader' | 'cardContentItem' | 'cardDescription' | 'cardActions'>;

const BookingItem: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    const { AuthState } = useStateValue();
    const { booking } = props;
    const { event } = booking;
    const isThisUser = AuthState.userId === booking.event.creator._id;
    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                title={event.title}
                action={
                    <IconButton aria-label="Edit">
                        <Create fontSize="small" />
                    </IconButton>
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
                <Button variant="text">Details</Button>
            </CardActions>
        </Card>
    );
};

type Props = {
    booking: IBooking;
    classes: any;
};

export default withStyles(style as any)(BookingItem);
