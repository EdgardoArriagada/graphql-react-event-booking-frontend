import React from 'react';
import { Theme, withStyles, WithStyles, Typography } from '@material-ui/core';
import { IStyles } from '../../shared/styles/styles';
import AppModalContent from '../sharedComponents/AppModalContent';

const style = (theme: Theme): IStyles => ({});

type Props = {};

type PropsWithStyles = Props & WithStyles<''>;

const CreateEventModalContent: React.SFC<PropsWithStyles> = ({ classes }: PropsWithStyles) => {
    return (
        <AppModalContent>
            <Typography>Some Typography</Typography>
        </AppModalContent>
    );
};

export default withStyles(style as any)(CreateEventModalContent);
