import { ActionEnum } from './action.enum';
import { Machine } from '@machines/shared/models/machine.model';

export interface LogFilter {
    machine?: Machine;
    action?: ActionEnum;
}