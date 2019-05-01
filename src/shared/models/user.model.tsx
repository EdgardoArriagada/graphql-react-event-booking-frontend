import { IEvent } from './event.model';

export interface IUser {
    _id: string;
    email: string;
    createdEvents: Array<IEvent>;
}
