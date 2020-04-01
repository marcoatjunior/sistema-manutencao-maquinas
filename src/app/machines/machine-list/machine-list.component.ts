import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Machine } from '@machines/shared/machine.model';
import { MachineService } from '@machines/shared/machine.service';
import { openModalDialog } from '@shared/components/modal-dialog';
import { modalSuccess, modalError } from '@shared/models';

@Component({
    selector: 'app-machine-list',
    templateUrl: 'machine-list.component.html'
})
export class MachineListComponent implements OnInit, OnDestroy {

    machines$: Observable<Machine[]>;
    selectedMachine: Machine;

    excluding = false;

    constructor(
        private machineService: MachineService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.machines$ = this.machineService.get();
    }

    openModal(content, machine) {
        this.selectedMachine = machine;
        this.modalService.open(content, { size: 'lg' });
    }

    deleteMachine() {
        this.excluding = true;
        this.machineService.delete(this.selectedMachine.id)
            .pipe(untilDestroyed(this))
            .subscribe(
                () => openModalDialog(this.modalService, { ...modalSuccess, route: 'maquinas' }),
                () => openModalDialog(this.modalService, { ...modalError, route: 'maquinas' }));
    }

    ngOnDestroy() {
        this.excluding = false;
    }
}