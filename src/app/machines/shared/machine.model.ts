import { Moment } from 'moment';

export interface Machine {
    id?: number;
    name?: string;
    description?: string;
    technical?: string;
    patrimony?: string;
    reviewPeriod?: Moment;
    warningPeriod?: Moment;
    warningEmailAddress?: string;
}