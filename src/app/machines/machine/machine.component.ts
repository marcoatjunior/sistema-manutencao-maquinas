import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from '@machines/shared/machine.model';
import { MachineService } from '@machines/shared/machine.service';

@Component({
    selector: 'app-machine',
    templateUrl: 'machine.component.html'
})
export class MachineComponent implements OnInit, OnDestroy {

    machine$: Observable<Machine>;
    machineId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private machineService: MachineService,
    ) {
        this.machineId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.machine$ = this.machineService.getById(this.machineId);
    }

    goBack(): void {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}