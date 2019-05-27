import { Dispatch } from 'react';
import { Status } from './utils/types';

export interface EventsStore {
    EventsState: EventsState;
    EventsDispatch: Dispatch<EventsActions>;
}

export interface Event {
    _id: string;
    title: string;
    description: string;
    price: number;
    date: string;
    creator: Array<any>;
}

export interface EventsState {
    status: Status;
    events: Array<Event>;
}

export const initialEventsState: EventsState = { events: [], status: 'PRISTINE' };

export const EventsReducer = (state: EventsState, action: EventsActions): EventsState => {
    switch (action.type) {
        case 'FETCH_EVENTS_PENDING':
        case 'CREATE_EVENT_PENDING':
        case 'MODIFY_EVENT_PENDING':
            return { events: [...state.events], status: 'PENDING' };
        case 'FETCH_EVENTS_FULFILLED':
            return { events: [...action.events], status: 'FULFILLED' };
        case 'CREATE_EVENT_FULFILLED':
            return { events: [...state.events, { ...action.event }], status: 'FULFILLED' };
        case 'MODIFY_EVENT_FULFILLED':
            const eventsWithoutModifiedOne = state.events.filter(event => action.event._id !== event._id);
            return { events: [...eventsWithoutModifiedOne, { ...action.event }], status: 'FULFILLED' };
        case 'FETCH_EVENTS_REJECTED':
        case 'CREATE_EVENT_REJECTED':
        case 'MODIFY_EVENT_REJECTED':
            return { events: [...state.events], status: 'REJECTED' };
        default:
            return state || initialEventsState;
    }
};

// Actions
interface FetchEventsPending {
    type: 'FETCH_EVENTS_PENDING';
}

interface EventPending {
    type: 'CREATE_EVENT_PENDING' | 'MODIFY_EVENT_PENDING';
}

interface FetchEventsRejected {
    type: 'FETCH_EVENTS_REJECTED';
}

interface EventRejected {
    type: 'CREATE_EVENT_REJECTED' | 'MODIFY_EVENT_REJECTED';
}

interface FetchEventsFulfilled {
    type: 'FETCH_EVENTS_FULFILLED';
    events: EventsState['events'];
}

interface EventFulfilled {
    type: 'CREATE_EVENT_FULFILLED' | 'MODIFY_EVENT_FULFILLED';
    event: Event;
}

type EventsActions =
    | FetchEventsPending
    | EventPending
    | FetchEventsRejected
    | EventRejected
    | FetchEventsFulfilled
    | EventFulfilled;
