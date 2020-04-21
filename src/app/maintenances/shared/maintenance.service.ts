import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "@environments/environment";
import { Maintenance } from "@maintenances/shared/maintenance.model";
import { MaintenanceFilter } from "src/app/maintenances/shared/maintenance-filter.model";

@Injectable()
export class MaintenanceService {
  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<Maintenance> {
    return this.httpClient
      .get<Maintenance>(`${environment.apiUrl}/maintenance/${id}`)
      .pipe(take(1));
  }

  get(filter: MaintenanceFilter): Observable<Maintenance[]> {
    let params = "";
    params += filter.start_date ? `start_date=${filter.start_date}&` : "";
    params += filter.end_date ? `end_date=${filter.end_date}&` : "";
    params += filter.review_type_id
      ? `review_type_id=${filter.review_type_id}&`
      : "";
    params += filter.technical_manager_id
      ? `technical_manager_id=${filter.technical_manager_id}&`
      : "";

    return this.httpClient
      .get<Maintenance[]>(`${environment.apiUrl}/maintenance?${params}`)
      .pipe(take(1));
  }

  post(maintenance: Maintenance): Observable<Maintenance> {
    return this.httpClient
      .post<Maintenance>(`${environment.apiUrl}/maintenance`, maintenance)
      .pipe(take(1));
  }
}
