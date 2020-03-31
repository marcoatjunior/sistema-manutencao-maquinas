import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Machine } from '@machines/shared/models/machine.model';
import { MachineService } from '@machines/shared/services/machine.service';
import { ManagerService } from 'src/app/managers/shared/manager.service';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/managers/shared/manager.model';
import { FileService } from '@shared/services/file-upload.service';
import { openModalDialog } from '@shared/components/modal-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { modalSuccess, modalError } from '@shared/models';

@Component({
    selector: 'app-machine-form',
    templateUrl: 'machine-form.component.html'
})
export class MachineFormComponent implements OnInit, OnDestroy {

    managers$: Observable<Manager[]>;
    formGroup: FormGroup;
    machineId: number;
    machine: Machine;

    downloadError = '';
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private machineService: MachineService,
        private managerService: ManagerService,
        private fileService: FileService,
        private modalService: NgbModal
    ) {
        this.machineId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            description: ['', Validators.required],
            technical: ['', Validators.required],
            patrimony: ['', Validators.required],
            review_period: ['', Validators.required],
            warning_period: ['', Validators.required],
            warning_email_address: ['', Validators.required],
            user: [null]
        });
        this.managers$ = this.managerService.get();
        this.populateForm();
    }

    private populateForm() {
        if (this.machineId) {
            this.machineService.getById(this.machineId)
                .pipe(untilDestroyed(this))
                .subscribe((machine: Machine) => {
                    this.machine = machine;
                    this.formGroup.patchValue({ ...machine })
                });
        }
    }

    downloadFile(id: number) {
        this.fileService.getById(id)
            .pipe(untilDestroyed(this))
            .subscribe((blob: Blob) => this.saveBlob(blob), (error) => this.downloadError = error);
    }

    saveBlob(blob: Blob) {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            let machine = this.formGroup.value as Machine;
            machine.users = [this.formGroup.get('user').value as Manager];
            this.machineService.save(machine)
                .pipe(untilDestroyed(this))
                .subscribe(
                    () => openModalDialog(this.modalService, { ...modalSuccess, route: 'maquinas' }),
                    () => openModalDialog(this.modalService, { ...modalError, route: 'maquinas' }));
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.loading = false;
    }
}