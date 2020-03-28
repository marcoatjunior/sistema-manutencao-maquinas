import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from '@machines/shared/models/machine.model';
import { MachineService } from '@machines/shared/services/machine.service';
import { FileService } from '@shared/services/file-upload.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
    selector: 'app-machine',
    templateUrl: 'machine.component.html'
})
export class MachineComponent implements OnInit, OnDestroy {

    machine$: Observable<Machine>;
    machineId: number;
    downloadError: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private machineService: MachineService,
        private fileService: FileService
    ) {
        this.machineId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.machine$ = this.machineService.getById(this.machineId);
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

    goBack(): void {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }

    ngOnDestroy() { }
}