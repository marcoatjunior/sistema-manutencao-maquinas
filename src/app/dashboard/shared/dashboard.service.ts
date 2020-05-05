import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "@environments/environment";
import { Dashboard } from "./dashboard.model";

@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Dashboard> {
    return this.httpClient
      .get<Dashboard>(`${environment.apiUrl}/dashboard`)
      .pipe(take(1));
  }
}
