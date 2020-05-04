import { Moment } from "moment";
export interface MaintenanceFilter {
  start_date?: Moment;
  end_date?: Moment;
  review_type_id: number;
  technical_manager_id?: number;
}
