import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './shared/services';
import { User } from './shared/models';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    currentUser: User;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
}