import React from 'react';
import EventItem from './EventItem';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { useStateValue } from '../../../Store/Store';
import { IStyles } from '../../../shared/models/styles.model';

const style = (theme: Theme): IStyles => ({
    list: {
        listStyle: 'none',
    },
});

type PropsWithStyles = Props & WithStyles<'list'>;

const EventsList: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { EventsState } = useStateValue();
    const EventsList = EventsState.events.map((event: any) => <EventItem event={event} key={event._id} />);

    return <section className={classes.list}>{EventsList}</section>;
};

type Props = {};

export default withStyles(style as any)(EventsList);
