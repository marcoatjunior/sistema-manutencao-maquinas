import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager } from '@managers/shared/manager.model';
import { ManagerService } from '@managers/shared/manager.service';

@Component({
    selector: 'app-manager',
    templateUrl: 'manager.component.html'
})
export class ManagerComponent implements OnInit, OnDestroy {

    manager$: Observable<Manager>;
    managerId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private managerService: ManagerService,
    ) {
        this.managerId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.manager$ = this.managerService.getById(this.managerId);
    }

    goBack(): void {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}