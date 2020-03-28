import { Piece } from 'src/app/pieces/shared/piece.model';
import { Manager } from 'src/app/managers/shared/manager.model';
import { File } from './file.model';

export interface Machine {
    id?: number;
    name?: string;
    description?: string;
    technical?: string;
    patrimony?: string;
    reviewPeriod?: number;
    warningPeriod?: number;
    warningEmailAddress?: string;
    pieces?: Piece[],
    managers?: Manager[],
    files?: File[]
}