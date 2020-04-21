import { ActionEnum } from "./action.enum";
import { Machine } from "@machines/shared/machine.model";

export interface LogFilter {
  machine?: Machine;
  action?: ActionEnum;
}
