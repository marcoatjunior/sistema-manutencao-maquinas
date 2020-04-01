import { Machine } from '@machines/shared/machine.model';
import { Moment } from 'moment';

export interface Manager {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    email_verified_at?: Moment;
    created_at?: Moment;
    updated_at?: Moment;
    telephone?: string;
    additional?: string;
    machines?: Machine[];
}