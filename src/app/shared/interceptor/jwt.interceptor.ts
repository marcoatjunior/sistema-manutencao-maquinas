import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@shared/services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let currentUser = this.authenticationService.currentUserValue;
        // if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            });
        // }

        return next.handle(request);
    }
}