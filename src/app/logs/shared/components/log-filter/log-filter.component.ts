import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineService } from '@machines/shared/services/machine.service';
import { Observable } from 'rxjs';
import { Machine } from '@machines/shared/models/machine.model';
import { ActionEnum } from '@logs/shared/action.enum';
import { enumSelector } from '@shared/enums';
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