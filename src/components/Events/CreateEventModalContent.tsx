import React, { useRef, useState } from 'react';
import { Theme, withStyles, WithStyles, Typography, Divider, Button, FormGroup, TextField } from '@material-ui/core';
import { IStyles, appStyles } from '../../shared/styles/styles';
import AppModalContent from '../sharedComponents/AppModalContent';
import { Alarm } from '@material-ui/icons';
import { MuiPickersUtilsProvider, InlineDatePicker, InlineTimePicker } from 'material-ui-pickers';
import DateFNSUtils from '@date-io/date-fns';
import { setHours, getHours, setDayOfYear, getDayOfYear, setMinutes, getMinutes } from 'date-fns';
import classNames from 'classnames';

import './createEventModalContent.scss';
import Axios from 'axios';
import { useStateValue } from '../../Store/Store';

const style = (theme: Theme): IStyles => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: '0.3rem 1.5rem',
    },
    content: {
        margin: '1.5rem',
    },
    actions: {},
});

type Props = {
    closeModal: any;
};

type PropsWithStyles = Props & WithStyles<'header' | 'content' | 'actions'>;

const CreateEventModalContent: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    const { AuthState } = useStateValue();
    const [selectedDayOfTeYear, HandleDayOfTheYearChange] = useState(new Date());
    const [selectedTime, handleTimeChange] = useState(new Date());

    const inputTitle = useRef({} as HTMLInputElement);
    const inputDescription = useRef({} as HTMLInputElement);
    const inputPrice = useRef({} as HTMLInputElement);

    function constructModifiedDate(selectedDayOfTeYear: Date, selectedTime: Date) {
        if (!selectedDayOfTeYear || !selectedTime) {
            throw new Error('Date and time must be selected');
        }
        let modifiedDate = new Date();
        modifiedDate = setDayOfYear(modifiedDate, getDayOfYear(selectedDayOfTeYear));
        modifiedDate = setHours(modifiedDate, getHours(selectedTime));
        modifiedDate = setMinutes(modifiedDate, getMinutes(selectedTime));
        return modifiedDate.toISOString();
    }

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const title = inputTitle.current.value.trim();
        const description = inputDescription.current.value.trim();
        const price = parseFloat(inputPrice.current.value.trim());
        const date = constructModifiedDate(selectedDayOfTeYear, selectedTime);

        if (!title || !description || !price || !date) {
            throw new Error('All input must be selected');
        }

        const requestBody = {
            query: `mutation {
                createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                    _id
                    title
                    description
                    date
                    price
                    creator{
                        _id
                        email
                    }
                }
            }`,
        };

        Axios({
            url: 'http://localhost:3000/graphql',
            method: 'POST',
            data: requestBody,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthState.token,
            },
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                if (res.data) {
                    return res.data.data;
                }
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <AppModalContent>
            <React.Fragment>
                <Typography className={classes.header} variant="h6">
                    Create Event
                </Typography>

                <form
                    className={classNames(classes.content, 'create-event-modal-content__form')}
                    onSubmit={submitHandler}
                >
                    <FormGroup className="create-event-modal-content__title">
                        <TextField id="title" variant="outlined" label="Title" inputRef={inputTitle} />
                    </FormGroup>

                    <FormGroup className="create-event-modal-content__description">
                        <TextField
                            id="description"
                            variant="outlined"
                            label="description"
                            inputRef={inputDescription}
                        />
                    </FormGroup>

                    <FormGroup className="create-event-modal-content__date">
                        <MuiPickersUtilsProvider utils={DateFNSUtils}>
                            <InlineDatePicker
                                keyboard
                                clearable
                                variant="outlined"
                                label="Date"
                                onChange={HandleDayOfTheYearChange}
                                value={selectedDayOfTeYear}
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>

                    <FormGroup className="create-event-modal-content__time">
                        <MuiPickersUtilsProvider utils={DateFNSUtils}>
                            <InlineTimePicker
                                keyboard
                                variant="outlined"
                                keyboardIcon={<Alarm />}
                                label="Time"
                                onChange={handleTimeChange}
                                value={selectedTime}
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>

                    <FormGroup className="create-event-modal-content__price">
                        <TextField id="price" variant="outlined" label="price" inputRef={inputPrice} />
                    </FormGroup>

                    <Divider className="create-event-modal-content__actions-divider" />
                    <div className={classNames(classes.actions, 'create-event-modal-content__actions')}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={props.closeModal}
                            style={appStyles.primaryButton}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit" style={appStyles.primaryButton}>
                            Create
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        </AppModalContent>
    );
};

export default withStyles(style as any)(CreateEventModalContent);
