import { Piece } from '@pieces/shared/piece.model';
import { Moment } from 'moment';
import { Maintenance } from '@maintenances/shared/maintenance.model';

export interface MaintenancePiece {
    maintenance?: Maintenance;
    piece?: Piece;
    amount_used?: number;
    created_at?: Moment;
    updated_at: Moment;
}