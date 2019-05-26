import React, { useState, useEffect, ChangeEvent } from 'react';
import { Theme, withStyles, WithStyles, Typography, Divider, Button, FormGroup, TextField } from '@material-ui/core';
import { appClasses } from '../../shared/styles/styles';
import AppModalContent from '../sharedComponents/AppModalContent';
import { Alarm } from '@material-ui/icons';
import { MuiPickersUtilsProvider, InlineDatePicker, InlineTimePicker } from 'material-ui-pickers';
import DateFNSUtils from '@date-io/date-fns';
import { setHours, getHours, setDayOfYear, getDayOfYear, setMinutes, getMinutes } from 'date-fns';
import classNames from 'classnames';

import './eventModalContent.scss';
import Axios from 'axios';
import { useStateValue } from '../../Store/Store';
import { IStyles } from '../../shared/models/styles.model';
import config from '../../config';
import { IEvent } from '../../shared/models/event.model';

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
    eventToModify?: IEvent;
};

type PropsWithStyles = Props & WithStyles<'header' | 'content' | 'actions'>;

const EventModalContent: React.SFC<PropsWithStyles> = ({ classes, ...props }: PropsWithStyles) => {
    const { AuthState } = useStateValue();
    const [selectedDayOfTeYear, handleDayOfTheYearChange] = useState(new Date());
    const [selectedTime, handleTimeChange] = useState(new Date());

    const eventToModify = props.eventToModify || ({} as IEvent);
    const [inputTitleValue, setInputTitleValue] = useState(eventToModify.title);
    const [inputDescriptionValue, setInputDescriptionValue] = useState(eventToModify.description);
    const [inputPriceValue, setInputPriceValue] = useState(eventToModify.price);

    function onChangeFunction(
        seter: React.Dispatch<React.SetStateAction<any>>,
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) {
        seter(event.currentTarget.value);
    }

    function mapDateToSelectedDayAndSelectedTime(dateToMap: Date) {
        handleDayOfTheYearChange(dateToMap);
        handleTimeChange(dateToMap);
    }

    useEffect(() => {
        eventToModify.date && mapDateToSelectedDayAndSelectedTime(new Date(eventToModify.date));
    }, []);

    function constructDate(selectedDayOfTeYear: Date, selectedTime: Date) {
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
        const title = inputTitleValue && inputTitleValue.trim();
        const description = inputDescriptionValue && inputDescriptionValue.trim();
        const price = inputPriceValue && inputPriceValue.toString();
        const date = constructDate(selectedDayOfTeYear, selectedTime);
        console.log(typeof price);
        if (!title || !description || !price || !date) {
            alert('All input must be selected');
            return;
        }

        const requestBody = eventToModify._id
            ? {
                  query: `mutation {
                        modifyEvent(modifyEventInput: {_id: "${
                            eventToModify._id
                        }", title: "${title}", description: "${description}",
                        price: ${price}, date: "${date}"}) {
                            _id
                            title
                            description
                            date
                            price
                        }
                }`,
              }
            : {
                  query: `mutation {
                createEvent(eventInput: {title: "${title}", description: "${description}",
                price: ${price}, date: "${date}"}) {
                    _id
                    title
                    description
                    date
                    price
                }
            }`,
              };

        Axios({
            url: config.getGraphqlUrl(),
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
                props.closeModal();
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

                <form className={classNames(classes.content, 'event-modal-content__form')} onSubmit={submitHandler}>
                    <FormGroup className="event-modal-content__title">
                        <TextField
                            id="title"
                            variant="outlined"
                            label="Title"
                            value={inputTitleValue}
                            onChange={event => onChangeFunction(setInputTitleValue, event)}
                        />
                    </FormGroup>

                    <FormGroup className="event-modal-content__description">
                        <TextField
                            id="description"
                            variant="outlined"
                            label="description"
                            value={inputDescriptionValue}
                            onChange={event => onChangeFunction(setInputDescriptionValue, event)}
                        />
                    </FormGroup>

                    <FormGroup className="event-modal-content__date">
                        <MuiPickersUtilsProvider utils={DateFNSUtils}>
                            <InlineDatePicker
                                keyboard
                                clearable
                                variant="outlined"
                                label="Date"
                                onChange={handleDayOfTheYearChange}
                                value={selectedDayOfTeYear}
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>

                    <FormGroup className="event-modal-content__time">
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

                    <FormGroup className="event-modal-content__price">
                        <TextField
                            id="price"
                            variant="outlined"
                            label="price"
                            value={inputPriceValue}
                            onChange={event => onChangeFunction(setInputPriceValue, event)}
                        />
                    </FormGroup>

                    <Divider className="event-modal-content__actions-divider" />
                    <div className={classNames(classes.actions, 'event-modal-content__actions')}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={props.closeModal}
                            style={appClasses.primaryButton}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit" style={appClasses.primaryButton}>
                            {eventToModify._id ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        </AppModalContent>
    );
};

export default withStyles(style as any)(EventModalContent);
