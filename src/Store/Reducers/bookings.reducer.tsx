import { Dispatch } from 'react';
import { Status } from './utils/types';
import { IEvent } from '../../shared/models/event.model';

export interface BookingsStore {
    BookingsState: BookingsState;
    BookingsDispatch: Dispatch<BookingsActions>;
}

export interface BookingsState {
    status: Status;
    bookings: Array<IEvent>;
}

export const initialBookingsState: BookingsState = { bookings: [], status: 'PRISTINE' };

export const BookingsReducer = (state: BookingsState, action: BookingsActions): BookingsState => {
    switch (action.type) {
        case 'FETCH_BOOKINGS_PENDING':
            return { bookings: [...state.bookings], status: 'PENDING' };
        case 'FETCH_BOOKINGS_FULFILLED':
            return { bookings: [...action.bookings], status: 'FULFILLED' };
        case 'FETCH_BOOKINGS_REJECTED':
            return { bookings: [...state.bookings], status: 'REJECTED' };
        default:
            return state || initialBookingsState;
    }
};

// Actions
interface FetchBookingsPending {
    type: 'FETCH_BOOKINGS_PENDING';
}

interface FetchBookingsRejected {
    type: 'FETCH_BOOKINGS_REJECTED';
}
interface FetchBookingsFulfilled {
    type: 'FETCH_BOOKINGS_FULFILLED';
    bookings: BookingsState['bookings'];
}

type BookingsActions = FetchBookingsPending | FetchBookingsRejected | FetchBookingsFulfilled;
