import { Dispatch } from 'react';
import { Status } from './utils/types';
import { IBooking } from '../../shared/models/booking.model';

export interface BookingsStore {
    BookingsState: BookingsState;
    BookingsDispatch: Dispatch<BookingsActions>;
}

export interface BookingsState {
    status: Status;
    bookings: Array<IBooking>;
}

export const initialBookingsState: BookingsState = { bookings: [], status: 'PRISTINE' };

export const BookingsReducer = (state: BookingsState, action: BookingsActions): BookingsState => {
    switch (action.type) {
        case 'FETCH_BOOKINGS_PENDING':
        case 'CANCEL_BOOKINGS_PENDING':
            return { bookings: [...state.bookings], status: 'PENDING' };
        case 'FETCH_BOOKINGS_FULFILLED':
            return { bookings: [...action.bookings], status: 'FULFILLED' };
        case 'CANCEL_BOOKINGS_FULFILLED':
            const updatedBookings = state.bookings.filter(booking => action.bookingId !== booking._id);
            return { bookings: updatedBookings, status: 'FULFILLED' };
        case 'FETCH_BOOKINGS_REJECTED':
        case 'CANCEL_BOOKINGS_REJECTED':
            return { bookings: [...state.bookings], status: 'REJECTED' };
        default:
            return state || initialBookingsState;
    }
};

// Actions
interface BookingsPending {
    type: 'FETCH_BOOKINGS_PENDING' | 'CANCEL_BOOKINGS_PENDING';
}

interface bookingsRejected {
    type: 'FETCH_BOOKINGS_REJECTED' | 'CANCEL_BOOKINGS_REJECTED';
}
interface fetchBookingsFulfilled {
    type: 'FETCH_BOOKINGS_FULFILLED';
    bookings: BookingsState['bookings'];
}
interface cancelBookingsFulfilled {
    type: 'CANCEL_BOOKINGS_FULFILLED';
    bookingId: IBooking['_id'];
}

type BookingsActions = BookingsPending | bookingsRejected | fetchBookingsFulfilled | cancelBookingsFulfilled;
