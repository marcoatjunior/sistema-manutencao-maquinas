import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Machine } from '@machines/shared/machine.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Manager } from 'src/app/managers/shared/manager.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/managers/shared/manager.service';
import { MachineService } from '@machines/shared/machine.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
    selector: 'app-add-manager-form',
    templateUrl: './add-manager-form.component.html'
})
export class AddManagerFormComponent implements OnInit, OnDestroy {

    @Input() machine: Machine;
    @Input() modal: NgbModal;

    managers$: Observable<Manager[]>;
    loading = false;
    formGroup: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private managerService: ManagerService,
        private machineService: MachineService
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            manager: ['', Validators.required]
        });

        this.managers$ = this.managerService.get();
    }

    submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.machine.managers.push(this.formGroup.get('manager').value as Manager);
            this.machineService.save(this.machine)
                .pipe(untilDestroyed(this))
                .subscribe(() => this.updatePage(), () => { this.loading = false });
        }
        Object.values(this.formGroup.controls).forEach((control: FormControl) => control.markAsDirty());
    }

    updatePage(): void {
        this.router.navigate(['/'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}