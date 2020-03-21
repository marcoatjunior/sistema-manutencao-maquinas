import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '@shared/models';
import { Profile } from '@shared/models/profile';

const profile: Profile = { name: 'Administrador' }

const users: User[] = [
    {
        id: 1,
        name: 'Marco Taborda',
        username: 'marco.taborda',
        email: 'marcotaborda.jr@gmail.com',
        password: 'teste',
        profile
    },
    {
        id: 2,
        name: 'Ricardo Kovalski',
        username: 'ricardo.kovalski',
        email: 'ricardokovalskicruz@gmail.com',
        password: 'teste',
        profile
    }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/users/1') && method === 'GET':
                    return getUser(0);
                case url.endsWith('/users/2') && method === 'GET':
                    return getUser(1);
                case url.endsWith('/users') && method === 'POST':
                    return getUser(0);
                case url.endsWith('/users') && method === 'PUT':
                    return getUser(0);
                case url.endsWith('/users') && method === 'DELETE':
                    return ok(null);
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Usuário e/ou senha inválidos.');
            return ok({
                id: user.id,
                name: user.name,
                email: user.email,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUser(id) {
            if (!isLoggedIn()) return unauthorized();
            return ok(users[id]);
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};