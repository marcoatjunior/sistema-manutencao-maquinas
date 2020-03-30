import { Machine } from '@machines/shared/models/machine.model';
import { Moment } from 'moment';
import { MaintenancePiece } from './maintenance-piece.model';
import { ReviewType } from './review-type.model';

export interface Maintenance {
    id?: number;
    description: string;
    machine: Machine;
    review_type: ReviewType;
    review_at: Moment;
    pieces: MaintenancePiece[];
}