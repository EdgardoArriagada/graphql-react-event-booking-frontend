import React from 'react';
import EventItem from './EventItem';
import { withStyles, WithStyles, Theme, Card, Typography } from '@material-ui/core';
import { useStateValue } from '../../../Store/Store';
import { IStyles } from '../../../shared/models/styles.model';
import { appClasses } from '../../../shared/styles/styles';

const style = (theme: Theme): IStyles => ({
    card: {
        padding: '3rem',
        ...appClasses.card,
    },
});

type PropsWithStyles = Props & WithStyles<'card'>;

const EventsList: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { EventsState } = useStateValue();
    const EventsList =
        EventsState.events.length > 0 ? (
            EventsState.events.map((event: any) => <EventItem event={event} key={event._id} />)
        ) : (
            <Card className={classes.card}>
                <Typography variant="h5">There are no events yet</Typography>
            </Card>
        );

    return <section>{EventsList}</section>;
};

type Props = {};

export default withStyles(style as any)(EventsList);
