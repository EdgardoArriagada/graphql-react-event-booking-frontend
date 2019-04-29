import React from 'react';
import { Card, Typography, Theme, withStyles, WithStyles, CardContent, CardHeader } from '@material-ui/core';
import { IStyles, appClasses } from '../../../shared/styles/styles';
import EventList from './EventList';

const style = (theme: Theme): IStyles => ({
    card: { ...appClasses.card },
    listItem: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
});

type PropsWithStyles = Props & WithStyles<'card' | 'listItem'>;

const EventItem: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    const { event } = props;
    return (
        <Card className={classes.card} key={event._id}>
            <CardContent className={classes.listItem}>
                <CardHeader title={event.title} />
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                        {event.description}
                    </Typography>
                    <Typography>{event.price} USD </Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
};

type Props = {
    event: any;
    classes: any;
};

export default withStyles(style as any)(EventItem);
