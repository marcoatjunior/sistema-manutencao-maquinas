import { Moment } from "moment";

export interface MachineLog {
  machine_name?: string;
  machine_description?: string;
  log_description?: string;
  log_time?: Moment;
  maintenance_description?: string;
  maintenance_review_at?: Moment;
}
