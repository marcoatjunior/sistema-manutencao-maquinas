import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Maintenance } from '@maintenances/shared/maintenance.model';
import { MaintenanceService } from '@maintenances/shared/maintenance.service';

@Component({
    selector: 'app-maintenance',
    templateUrl: 'maintenance.component.html'
})
export class MaintenanceComponent implements OnInit, OnDestroy {

    maintenance$: Observable<Maintenance>;
    maintenanceId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private maintenanceService: MaintenanceService
    ) {
        this.maintenanceId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.maintenance$ = this.maintenanceService.getById(this.maintenanceId);
    }

    goBack(): void {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}