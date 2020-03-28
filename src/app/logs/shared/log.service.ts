import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Log } from './log.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { take } from 'rxjs/operators';
import { LogFilter } from './log-filter.model';

@Injectable()
export class LogService {

    constructor(private httpClient: HttpClient) { }

    get(): Observable<Log[]> {
        return this.httpClient
            .get<Log[]>(`${environment.apiUrl}/logs`)
            .pipe(take(1));
    }

    getById(id: number): Observable<Log> {
        return this.httpClient
            .get<Log>(`${environment.apiUrl}/logs/${id}`)
            .pipe(take(1));
    }

    getByFilter(filter: LogFilter): Observable<Log[]> {
        const getParams = `machineId=${filter.machine ? filter.machine.id : 0}&action=${filter.action}`;
        return this.httpClient
            .get<Log[]>(`${environment.apiUrl}/logs?${getParams}`)
            .pipe(take(1));
    }
}