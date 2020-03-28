import { Moment } from 'moment';

export interface Log {
    historyId?: number;
    historyCreatedAt?: Moment;
    historyDescription?: string;
    machineName?: string;
    machineDescription?: string;
    maintenanceDescription?: string;
    maintenanceReviewAt?: Moment;
}