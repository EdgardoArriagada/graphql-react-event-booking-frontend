import { IEvent } from './event.model';
import { IUser } from './user.model';

export interface IBooking {
    _id: string;
    event: IEvent;
    user: IUser;
    createdAt: string;
    updatedAt: string;
}
