import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Machine } from '@machines/shared/models/machine.model';
import { MachineService } from '@machines/shared/services/machine.service';
import { ManagerService } from 'src/app/managers/shared/manager.service';
import { Observable } from 'rxjs';
import { Manager } from 'src/app/managers/shared/manager.model';

@Component({
    selector: 'app-machine-form',
    templateUrl: 'machine-form.component.html'
})
export class MachineFormComponent implements OnInit, OnDestroy {

    managers$: Observable<Manager[]>;
    formGroup: FormGroup;
    machineId: number;
    machine: Machine;

    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private machineService: MachineService,
        private managerService: ManagerService
    ) {
        this.machineId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            technical: ['', Validators.required],
            patrimony: ['', Validators.required],
            reviewPeriod: ['', Validators.required],
            warningPeriod: ['', Validators.required],
            warningEmailAddress: ['', Validators.required],
            manager: [null]
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

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            let machine = this.formGroup.value as Machine;
            machine.managers = [this.formGroup.get('manager').value as Manager];
            this.machineService.save(machine)
                .pipe(untilDestroyed(this))
                .subscribe(() => this.goBack(), () => { this.loading = false });
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}