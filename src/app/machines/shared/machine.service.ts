import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from './machine.model';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class MachineService {

    constructor(private httpClient: HttpClient) { }

    get(): Observable<Machine[]> {
        return this.httpClient
            .get<Machine[]>(`${environment.apiUrl}/machines`)
            .pipe(take(1));
    }

    getById(id: number): Observable<Machine> {
        return this.httpClient
            .get<Machine>(`${environment.apiUrl}/machines/${id}`)
            .pipe(take(1));
    }

    save(machine: Machine): Observable<Machine> {
        console.log(machine)
        if (machine.id === null) {
            return this.insert(machine);
        }
        return this.update(machine);
    }

    private insert(machine: Machine): Observable<Machine> {
        return this.httpClient
            .post<Machine>(`${environment.apiUrl}/machines/`, machine)
            .pipe(take(1));
    }

    private update(machine: Machine): Observable<Machine> {
        return this.httpClient
            .put<Machine>(`${environment.apiUrl}/machines/`, machine)
            .pipe(take(1));
    }

    delete(id: number): Observable<void> {
        return this.httpClient
            .delete<void>(`${environment.apiUrl}/machines/${id}`)
            .pipe(take(1));
    }
}