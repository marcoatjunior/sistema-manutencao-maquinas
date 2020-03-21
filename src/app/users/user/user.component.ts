import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    user$: Observable<User>;
    userId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
    ) {
        this.userId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.user$ = this.userService.getById(this.userId);
    }

    goBack(): void {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}