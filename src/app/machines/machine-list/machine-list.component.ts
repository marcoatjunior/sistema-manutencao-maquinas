import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Machine } from '@machines/shared/models/machine.model';
import { MachineService } from '@machines/shared/services/machine.service';

@Component({
    selector: 'app-machine-list',
    templateUrl: 'machine-list.component.html',
    styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit, OnDestroy {

    machines$: Observable<Machine[]>;
    selectedMachine: Machine;

    deleteError = '';

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
        this.machineService.delete(this.selectedMachine.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => this.machineService.get(), (err) => this.deleteError = err);
    }

    ngOnDestroy() { }
}