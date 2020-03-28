import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { users, machines, managers, pieces } from '@shared/constants/';

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
                case url.endsWith('/managers') && method === 'GET':
                    return getManagers();
                case url.endsWith('/managers/1') && method === 'GET':
                    return getManager(0);
                case url.endsWith('/managers/2') && method === 'GET':
                    return getManager(1);
                case url.endsWith('/managers') && method === 'POST':
                    return getManager(0);
                case url.endsWith('/managers') && method === 'PUT':
                    return getManager(0);
                case url.endsWith('/managers') && method === 'DELETE':
                    return ok(null);
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
                case url.endsWith('/pieces') && method === 'GET':
                    return getPieces();
                case url.endsWith('/pieces/1') && method === 'GET':
                    return getPiece(0);
                case url.endsWith('/pieces/2') && method === 'GET':
                    return getPiece(1);
                case url.endsWith('/pieces') && method === 'POST':
                    return getPiece(0);
                case url.endsWith('/pieces') && method === 'PUT':
                    return getPiece(0);
                case url.endsWith('/pieces') && method === 'DELETE':
                    return ok(null);
                case url.endsWith('/machines') && method === 'GET':
                    return getMachines();
                case url.endsWith('/machines/1') && method === 'GET':
                    return getMachine(0);
                case url.endsWith('/machines/2') && method === 'GET':
                    return getMachine(1);
                case url.endsWith('/machines') && method === 'POST':
                    return getMachine(0);
                case url.endsWith('/machines') && method === 'PUT':
                    return getMachine(0);
                case url.endsWith('/machines') && method === 'DELETE':
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

        function getManagers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(managers);
        }

        function getManager(id) {
            if (!isLoggedIn()) return unauthorized();
            return ok(managers[id]);
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUser(id) {
            if (!isLoggedIn()) return unauthorized();
            return ok(users[id]);
        }

        function getPieces() {
            if (!isLoggedIn()) return unauthorized();
            return ok(pieces);
        }

        function getPiece(id) {
            if (!isLoggedIn()) return unauthorized();
            return ok(pieces[id]);
        }

        function getMachines() {
            if (!isLoggedIn()) return unauthorized();
            return ok(machines);
        }

        function getMachine(id) {
            if (!isLoggedIn()) return unauthorized();
            return ok(machines[id]);
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