import { Machine } from '@machines/shared/machine.model';
import { Moment } from 'moment';
import { MaintenancePiece } from '@maintenances/shared/maintenance-piece.model';
import { ReviewType } from '@shared/models/review-type.model';

export interface Maintenance {
    id?: number;
    description: string;
    machine: Machine;
    review_type: ReviewType;
    review_at: Moment;
    pieces: MaintenancePiece[];
}