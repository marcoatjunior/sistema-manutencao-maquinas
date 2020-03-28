import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    get(): Observable<User[]> {
        return this.httpClient
            .get<User[]>(`${environment.apiUrl}/users`)
            .pipe(take(1));
    }

    getById(id: number): Observable<User> {
        return this.httpClient
            .get<User>(`${environment.apiUrl}/users/${id}`)
            .pipe(take(1));
    }

    save(user: User): Observable<User> {
        if (user.id === null) {
            return this.insert(user);
        }
        return this.update(user);
    }

    private insert(user: User): Observable<User> {
        return this.httpClient
            .post<User>(`${environment.apiUrl}/users/`, user)
            .pipe(take(1));
    }

    private update(user: User): Observable<User> {
        return this.httpClient
            .put<User>(`${environment.apiUrl}/users/`, user)
            .pipe(take(1));
    }

    delete(id: number): Observable<void> {
        return this.httpClient
            .delete<void>(`${environment.apiUrl}/users/${id}`)
            .pipe(take(1));
    }
}
