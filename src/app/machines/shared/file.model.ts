import { Moment } from 'moment';

export interface File {
    id?: number;
    name?: string;
    description?: string;
    createdAt?: Moment;
    type?: string;
}