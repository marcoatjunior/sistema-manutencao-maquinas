import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ManagerService } from '@managers/shared/manager.service';
import { Manager } from '@managers/shared/manager.model';

@Component({
    selector: 'app-manager-form',
    templateUrl: 'manager-form.component.html'
})
export class ManagerFormComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    managerId: number;

    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private managerService: ManagerService
    ) {
        this.managerId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            telephone: ['', Validators.required],
            additional: ['']
        });

        this.populateForm();
    }

    private populateForm() {
        if (this.managerId) {
            this.managerService.getById(this.managerId)
                .pipe(untilDestroyed(this))
                .subscribe((manager: Manager) => this.formGroup.patchValue({ ...manager }));
        }
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.managerService.save(this.formGroup.value as Manager)
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