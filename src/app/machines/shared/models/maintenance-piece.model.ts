import { Maintenance } from './maintenance.model';
import { Piece } from '@pieces/shared/piece.model';
import { Moment } from 'moment';

export interface MaintenancePiece {
    maintenance?: Maintenance;
    piece?: Piece;
    amount_used?: number;
    created_at?: Moment;
    updated_at: Moment;
}