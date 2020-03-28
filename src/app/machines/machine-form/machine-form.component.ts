import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Machine } from '@machines/shared/machine.model';
import { MachineService } from '@machines/shared/machine.service';

@Component({
    selector: 'app-machine-form',
    templateUrl: 'machine-form.component.html'
})
export class MachineFormComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    machineId: number;

    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private machineService: MachineService
    ) {
        this.machineId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            technical: [''],
            patrimony: ['', Validators.required],
            reviewPeriod: ['', Validators.required],
            warningPeriod: ['', Validators.required],
            warningEmailAddress: ['', Validators.required]
        });
        this.populateForm();
    }

    private populateForm() {
        if (this.machineId) {
            this.machineService.getById(this.machineId)
                .pipe(untilDestroyed(this))
                .subscribe((machine: Machine) => this.formGroup.patchValue({ ...machine }));
        }
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.machineService.save(this.formGroup.value as Machine)
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