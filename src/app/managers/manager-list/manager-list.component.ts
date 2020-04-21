import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Manager } from "@managers/shared/manager.model";
import { ManagerService } from "@managers/shared/manager.service";
import { openModalDialog } from "@shared/components/modal-dialog/modal-dialog.component";
import { modalSuccess, modalError } from "@shared/models";

@Component({
  selector: "app-manager-list",
  templateUrl: "manager-list.component.html",
})
export class ManagerListComponent implements OnInit, OnDestroy {
  managers$: Observable<Manager[]>;
  selectedManager: Manager;

  excluding = false;

  constructor(
    private managerService: ManagerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.managers$ = this.managerService.get();
  }

  openDeleteModal(content, manager) {
    this.selectedManager = manager;
    this.modalService.open(content);
  }

  deleteManager() {
    this.excluding = true;
    this.managerService
      .delete(this.selectedManager.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () =>
          openModalDialog(this.modalService, {
            ...modalSuccess,
            route: "responsaveis",
          }),
        () =>
          openModalDialog(this.modalService, {
            ...modalError,
            route: "responsaveis",
          })
      );
  }

  ngOnDestroy() {
    this.excluding = false;
  }
}
