import React from 'react';
import { Theme, withStyles, WithStyles, Typography, Divider, Button, FormGroup, TextField } from '@material-ui/core';
import { IStyles, appStyles } from '../../shared/styles/styles';
import AppModalContent from '../sharedComponents/AppModalContent';
import { Alarm } from '@material-ui/icons';
import { MuiPickersUtilsProvider, InlineDatePicker, InlineTimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

const style = (theme: Theme): IStyles => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: '0.3rem 1.5rem',
    },
    content: {
        margin: '1.5rem',
    },
    contentItem: {
        margin: '1em 0',
    },
    actions: {
        padding: '.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

type Props = {
    closeModal: any;
};

type PropsWithStyles = Props & WithStyles<'header' | 'content' | 'contentItem' | 'actions'>;

const CreateEventModalContent: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    return (
        <AppModalContent>
            <React.Fragment>
                <Typography className={classes.header} variant="h6">
                    Create Event
                </Typography>

                <form className={classes.content}>
                    <FormGroup className={classes.contentItem}>
                        <TextField id="title" variant="outlined" label="Title" onChange={void 0} />
                    </FormGroup>
                    <FormGroup className={classes.contentItem}>
                        <TextField id="description" variant="outlined" label="description" onChange={void 0} />
                    </FormGroup>
                    <FormGroup className={classes.contentItem}>
                        <TextField id="price" variant="outlined" label="price" onChange={void 0} />
                    </FormGroup>
                    <FormGroup className={classes.contentItem}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <InlineDatePicker
                                keyboard
                                clearable
                                variant="outlined"
                                label="Date"
                                value={void 0}
                                onChange={date => {}}
                                format={'MM/DD/YYYY'}
                                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>
                    <FormGroup className={classes.contentItem}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <InlineTimePicker
                                keyboard
                                variant="outlined"
                                keyboardIcon={<Alarm />}
                                label="Time"
                                value={void 0}
                                onChange={date => {}}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>
                </form>

                <Divider />

                <span className={classes.actions}>
                    <Button variant="text" color="primary" onClick={props.closeModal} style={appStyles.primaryButton}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" style={appStyles.primaryButton}>
                        Create
                    </Button>
                </span>
            </React.Fragment>
        </AppModalContent>
    );
};

export default withStyles(style as any)(CreateEventModalContent);
