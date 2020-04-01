import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MachineService } from '@machines/shared/machine.service';
import { Observable } from 'rxjs';
import { Machine } from '@machines/shared/machine.model';
import { ActionEnum } from '@logs/shared/action.enum';
import { enumSelector } from '@logs/shared/action.enum';
import { Log } from '@logs/shared/log.model';
import { LogService } from '@logs/shared/log.service';
import { LogFilter } from '@logs/shared/log-filter.model';

@Component({
    selector: 'app-log-filter',
    templateUrl: './log-filter.component.html',
    styleUrls: ['./log-filter.component.scss']
})
export class LogFilterComponent implements OnInit, OnDestroy {

    @Input() logs$: Observable<Log[]>;

    machines$: Observable<Machine[]>;
    formGroup: FormGroup;

    actions = enumSelector(ActionEnum);

    constructor(
        private formBuilder: FormBuilder,
        private machineService: MachineService,
        private logService: LogService
    ) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            machine: [null],
            action: [null]
        });
        this.machines$ = this.machineService.get();
    }

    filter() {
        this.logs$ = this.logService.getByFilter(this.formGroup.value as LogFilter);
    }

    ngOnDestroy() { }
}