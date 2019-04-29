import React from 'react';
import EventItem from './EventItem';
import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { IStyles } from '../../../shared/styles/styles';

const style = (theme: Theme): IStyles => ({
    list: {
        listStyle: 'none',
    },
});

type PropsWithStyles = Props & WithStyles<'list'>;

const EventList: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    const eventList = props.events.map((event: any) => <EventItem event={event} />);

    return <section className={classes.list}>{eventList}</section>;
};

type Props = {
    events: Array<any>;
};

export default withStyles(style as any)(EventList);
