import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@shared/services';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input() isLogged: Boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() { }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}