import { Moment } from 'moment';

export interface File {
    id?: number;
    name?: string;
    description?: string;
    created_at?: Moment;
    type?: string;
}