import React from 'react';
import EventItem from './EventItem';
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

const EventsList: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { EventsState } = useStateValue();
    const EventsList =
        EventsState.events.length > 0 ? (
            EventsState.events.map((event: any) => <EventItem event={event} key={event._id} />)
        ) : (
            <Card className={classes.card}>
                <CardHeader className={classes.cardHeader} title="There are no events yet" />
            </Card>
        );

    return <section>{EventsList}</section>;
};

type Props = {};

export default withStyles(style as any)(EventsList);
