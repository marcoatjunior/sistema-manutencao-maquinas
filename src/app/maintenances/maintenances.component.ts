import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Maintenance } from '@maintenances/shared/maintenance.model';
import { MaintenanceService } from 'src/app/maintenances/shared/maintenance.service';
import { MaintenanceFilter } from './shared/maintenance-filter.model';
import { switchMap } from 'rxjs/operators';

@Component({
    templateUrl: 'maintenances.component.html'
})
export class MaintenancesComponent implements OnInit, OnDestroy {

    formSubmit = new EventEmitter<MaintenanceFilter>();
    maintenances$: Observable<Maintenance[]>;

    constructor(
        private maintenanceService: MaintenanceService
    ) { }

    ngOnInit() {
        this.filterData();
        this.initialFilter();
    }

    private initialFilter() {
        this.maintenances$ = this.maintenanceService.get({} as MaintenanceFilter);
    }

    private filterData() {
        this.maintenances$ = this.formSubmit.pipe(switchMap(filter => this.maintenanceService.get(filter)));
    }

    ngOnDestroy() { }
}