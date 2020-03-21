import { Component } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models';

@Component({
    selector: 'app-user',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss']
})
export class UserComponent {

    users$: Observable<User[]>;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.users$ = this.userService.get();
    }
}