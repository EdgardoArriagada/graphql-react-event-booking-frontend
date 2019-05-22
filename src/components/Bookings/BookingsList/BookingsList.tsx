import React from 'react';
import BookingItem from './BookingItem';
import { withStyles, WithStyles, Theme, Card, CardHeader } from '@material-ui/core';
import { useStateValue } from '../../../Store/Store';
import { IStyles } from '../../../shared/models/styles.model';
import { appClasses } from '../../../shared/styles/styles';

const style = (theme: Theme): IStyles => ({
    card: {
        padding: '3rem 0',
        ...appClasses.card,
    },
    cardHeader: {
        textAlign: 'center',
        width: '90%',
    },
});

type PropsWithStyles = Props & WithStyles<'card' | 'cardHeader'>;

const BookingsList: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { BookingsState } = useStateValue();
    const BookingsList = BookingsState.bookings.length ? (
        BookingsState.bookings.map((booking: any) => <BookingItem booking={booking} key={booking._id} />)
    ) : (
        <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} title="You haven't booked any event yet" />
        </Card>
    );

    return <section>{BookingsList}</section>;
};

type Props = {};

export default withStyles(style as any)(BookingsList);
