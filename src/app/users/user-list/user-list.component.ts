import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

    users$: Observable<User[]>;
    selectedUser: User;

    deleteError = '';

    constructor(
        private userService: UserService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.users$ = this.userService.get();
    }

    openDeleteModal(content, user) {
        this.selectedUser = user;
        this.modalService.open(content);
    }

    deleteUser() {
        this.userService.delete(this.selectedUser.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.userService.get(), (err) => this.deleteError = err);
    }

    ngOnDestroy() { }
}