import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Manager } from "./manager.model";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ManagerService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Manager[]> {
    return this.httpClient
      .get<Manager[]>(`${environment.apiUrl}/technical-managers`)
      .pipe(take(1));
  }

  getById(id: number): Observable<Manager> {
    return this.httpClient
      .get<Manager>(`${environment.apiUrl}/technical-managers/${id}`)
      .pipe(take(1));
  }

  save(manager: Manager): Observable<Manager> {
    if (!manager.id) {
      return this.insert(manager);
    }
    return this.update(manager);
  }

  private insert(manager: Manager): Observable<Manager> {
    return this.httpClient
      .post<Manager>(`${environment.apiUrl}/technical-managers`, manager)
      .pipe(take(1));
  }

  private update(manager: Manager): Observable<Manager> {
    return this.httpClient
      .put<Manager>(
        `${environment.apiUrl}/technical-managers/${manager.id}`,
        manager
      )
      .pipe(take(1));
  }

  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.apiUrl}/technical-managers/${id}`)
      .pipe(take(1));
  }
}
