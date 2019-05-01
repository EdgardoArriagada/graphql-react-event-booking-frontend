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
            return { events: [...state.events], status: 'PENDING' };
        case 'FETCH_EVENTS_FULFILLED':
            return { events: [...action.events], status: 'FULFILLED' };
        case 'FETCH_EVENTS_REJECTED':
            return { events: [...state.events], status: 'REJECTED' };
        default:
            return state || initialEventsState;
    }
};

// Actions
interface FetchEventsPending {
    type: 'FETCH_EVENTS_PENDING';
}

interface FetchEventsRejected {
    type: 'FETCH_EVENTS_REJECTED';
}
interface FetchEventsFulfilled {
    type: 'FETCH_EVENTS_FULFILLED';
    events: EventsState['events'];
}

type EventsActions = FetchEventsPending | FetchEventsRejected | FetchEventsFulfilled;
