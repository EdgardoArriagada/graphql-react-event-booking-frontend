import React from 'react';
import EventItem from './EventItem';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { useStateValue } from '../../../Store/Store';
import { IStyles } from '../../../shared/models/styles.model';

const style = (theme: Theme): IStyles => ({});

type PropsWithStyles = Props & WithStyles<''>;

const EventsList: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    const { EventsState } = useStateValue();
    const EventsList = EventsState.events.map((event: any) => <EventItem event={event} key={event._id} />);

    return <section>{EventsList}</section>;
};

type Props = {};

export default withStyles(style as any)(EventsList);
