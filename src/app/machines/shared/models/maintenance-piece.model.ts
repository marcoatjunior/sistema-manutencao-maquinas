import { Maintenance } from './maintenance.model';
import { Piece } from '@pieces/shared/piece.model';

export interface MaintenancePiece {
    maintenance: Maintenance;
    piece: Piece;
    userQuantity: number;
}