import { Machine } from '@machines/shared/models/machine.model';
import { Moment } from 'moment';
import { ReviewTypeEnum } from '@machines/shared/enums/review-type.enum';
import { MaintenancePiece } from './maintenance-piece.model';

export interface Maintenance {
    id?: number;
    description: string;
    machine: Machine;
    reviewType: ReviewTypeEnum;
    reviewAt: Moment;
    maintenancePieces: MaintenancePiece[];
}