import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Manager } from '@managers/shared/manager.model';
import { ManagerService } from '@managers/shared/manager.service';

@Component({
    selector: 'app-manager-list',
    templateUrl: 'manager-list.component.html'
})
export class ManagerListComponent implements OnInit, OnDestroy {

    managers$: Observable<Manager[]>;
    selectedManager: Manager;

    deleteError = '';

    constructor(
        private managerService: ManagerService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.managers$ = this.managerService.get();
    }

    openDeleteModal(content, manager) {
        this.selectedManager = manager;
        this.modalService.open(content);
    }

    deleteManager() {
        this.managerService.delete(this.selectedManager.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.managerService.get(), (err) => this.deleteError = err);
    }

    ngOnDestroy() { }
}