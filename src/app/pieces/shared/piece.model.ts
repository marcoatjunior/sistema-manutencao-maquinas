import { MaintenancePiece } from '@machines/shared/models/maintenance-piece.model';

export interface Piece {
    id?: number;
    name?: string;
    description?: string;
    stock_quantity?: number;
    minimal_quantity?: number;
    maintenances?: MaintenancePiece[];
}