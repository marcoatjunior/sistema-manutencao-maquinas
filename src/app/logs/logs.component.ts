import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from './shared/log.model';
import { LogService } from './shared/log.service';

@Component({
    templateUrl: 'logs.component.html'
})
export class LogsComponent implements OnInit, OnDestroy {

    logs$: Observable<Log[]>;

    constructor(
        private logService: LogService
    ) { }

    ngOnInit() {
        this.logs$ = this.logService.get();
    }

    ngOnDestroy() { }
}