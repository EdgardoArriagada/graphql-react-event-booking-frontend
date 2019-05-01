import React from 'react';
import BookingItem from './BookingItem';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { useStateValue } from '../../../Store/Store';
import { IStyles } from '../../../shared/models/styles.model';

const style = (theme: Theme): IStyles => ({});

type PropsWithStyles = Props & WithStyles<''>;

const BookingsList: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { BookingsState } = useStateValue();
    const BookingsList = BookingsState.bookings.map((booking: any) => (
        <BookingItem booking={booking} key={booking._id} />
    ));

    return <section>{BookingsList}</section>;
};

type Props = {};

export default withStyles(style as any)(BookingsList);
