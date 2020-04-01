import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Maintenance } from '@maintenances/shared/maintenance.model';
import { MaintenanceFilter } from 'src/app/maintenances/shared/maintenance-filter.model';

@Injectable()
export class MaintenanceService {

    constructor(private httpClient: HttpClient) { }

    getById(id: number): Observable<Maintenance> {
        return this.httpClient
            .get<Maintenance>(`${environment.apiUrl}/maintenances/${id}`)
            .pipe(take(1));
    }
    
    getByFilter(filter: MaintenanceFilter): Observable<Maintenance[]> {
        return this.httpClient
            .post<Maintenance[]>(`${environment.apiUrl}/maintenances`, filter)
            .pipe(take(1));
    }

    post(maintenance: Maintenance): Observable<Maintenance> {
        console.log(maintenance)
        return this.httpClient
            .post<Maintenance>(`${environment.apiUrl}/maintenances`, maintenance)
            .pipe(take(1));
    }
}