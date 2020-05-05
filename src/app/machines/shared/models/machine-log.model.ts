import { Moment } from "moment";

export interface MachineLog {
  historyId?: number;
  historyCreatedAt?: Moment;
  historyDescription?: string;
  machineName?: string;
  machineDescription?: string;
  maintenanceDescription?: string;
  maintenanceReviewAt?: Moment;
}
