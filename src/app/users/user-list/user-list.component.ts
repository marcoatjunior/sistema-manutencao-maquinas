import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "@shared/services/user.service";
import { Observable } from "rxjs";
import { User } from "@shared/models/user.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { untilDestroyed } from "ngx-take-until-destroy";
import { openModalDialog } from "@shared/components/modal-dialog/modal-dialog.component";
import { modalSuccess, modalError } from "@shared/models";
import { AuthenticationService } from '@shared/services';
import { RoleEnum } from "@shared/enums";

@Component({
  selector: "app-user-list",
  templateUrl: "user-list.component.html",
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  selectedUser: User;

  excluding = false;
  hasDeletePermission = false;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.users$ = this.userService.get();
    const userLogged = this.authenticationService.currentUserValue;
    if (userLogged) {
      this.hasDeletePermission = userLogged.roles[0].id === RoleEnum.ADMIN;
    }
  }

  openDeleteModal(content, user) {
    this.selectedUser = user;
    this.modalService.open(content);
  }

  deleteUser() {
    this.excluding = true;
    this.userService
      .delete(this.selectedUser.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () =>
          openModalDialog(this.modalService, {
            ...modalSuccess,
            route: "usuarios",
          }),
        () =>
          openModalDialog(this.modalService, {
            ...modalError,
            route: "usuarios",
          })
      );
  }

  ngOnDestroy() {
    this.excluding = false;
  }
}
