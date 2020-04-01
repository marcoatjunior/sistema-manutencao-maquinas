import { Component, OnInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Machine } from '@machines/shared/machine.model';
import { MaintenanceFilter } from '@maintenances/shared/maintenance-filter.model';
import { reviewTypes } from '@shared/constants';
import { ManagerService } from '@managers/shared/manager.service';

@Component({
    selector: 'app-maintenance-filter',
    templateUrl: './maintenance-filter.component.html'
})
export class MaintenanceFilterComponent implements OnInit, OnDestroy {

    @Input() formSubmit: EventEmitter<MaintenanceFilter>;

    managers$: Observable<Machine[]>;
    formGroup: FormGroup;

    searching = false;
    reviewTypes = reviewTypes

    constructor(
        private formBuilder: FormBuilder,
        private managerService: ManagerService
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            start_date: [''],
            end_date: [''],
            review_type_id: [null],
            technical_manager_id: [null]
        });
        this.managers$ = this.managerService.get();
    }

    filter() {
        this.searching = true;
        this.formSubmit.emit(this.formGroup.value as MaintenanceFilter);
        this.searching = false;
    }

    ngOnDestroy() { }
}