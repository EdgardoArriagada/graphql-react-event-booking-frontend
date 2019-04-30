import React from 'react';
import EventItem from './EventItem';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { IStyles } from '../../../shared/styles/styles';
import { useStateValue } from '../../../Store/Store';

const style = (theme: Theme): IStyles => ({
    list: {
        listStyle: 'none',
    },
});

type PropsWithStyles = Props & WithStyles<'list'>;

const EventList: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { EventsState } = useStateValue();
    const eventList = EventsState.events.map((event: any) => <EventItem event={event} />);

    return <section className={classes.list}>{eventList}</section>;
};

type Props = {};

export default withStyles(style as any)(EventList);
