import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Maintenance } from '../models/maintenance.model';

@Injectable()
export class MaintenanceService {

    constructor(private httpClient: HttpClient) { }

    post(maintenance: Maintenance): Observable<Maintenance> {
        console.log(maintenance)
        return this.httpClient
            .post<Maintenance>(`${environment.apiUrl}/maintenances/`, maintenance)
            .pipe(take(1));
    }
}