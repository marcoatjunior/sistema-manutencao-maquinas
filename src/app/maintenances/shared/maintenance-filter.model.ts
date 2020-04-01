import { Moment } from 'moment';
import { ReviewType } from '@shared/models/review-type.model';
import { Manager } from '@managers/shared/manager.model';

export interface MaintenanceFilter {
    start_date?: Moment;
    end_date?: Moment;
    review_type?: ReviewType;
    manager?: Manager
}