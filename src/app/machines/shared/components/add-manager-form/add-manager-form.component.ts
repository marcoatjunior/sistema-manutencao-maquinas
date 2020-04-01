import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Machine } from '@machines/shared/machine.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Manager } from '@managers/shared/manager.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ManagerService } from '@managers/shared/manager.service';
import { MachineService } from '@machines/shared/machine.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { openModalDialog } from '@shared/components/modal-dialog';
import { modalSuccess, modalError } from '@shared/models';

@Component({
    selector: 'app-add-manager-form',
    templateUrl: './add-manager-form.component.html'
})
export class AddManagerFormComponent implements OnInit, OnDestroy {

    @Input() machine: Machine;
    @Input() modal: NgbActiveModal;

    managers$: Observable<Manager[]>;
    including = false;
    formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private managerService: ManagerService,
        private machineService: MachineService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            manager: [null, Validators.required]
        });

        this.managers$ = this.managerService.get();
    }

    submit() {
        if (this.formGroup.valid) {
            this.including = true;
            this.machineService.addManager({ machine_id: this.machine.id, user_id: this.formGroup.get('manager').value })
                .pipe(untilDestroyed(this))
                .subscribe(
                    () => openModalDialog(this.modalService, { ...modalSuccess, route: 'maquinas' }),
                    () => openModalDialog(this.modalService, { ...modalError, route: 'maquinas' }));
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    ngOnDestroy() {
        this.including = false;
    }
}