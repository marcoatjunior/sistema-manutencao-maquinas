import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { LogsComponent } from './logs.component';
import { LogsRoutingModule } from './log-routing.module';
import { LogListComponent } from './log-list/log-list.component';
import { LogComponent } from './log/log.component';
import { LogService } from './shared/log.service';
import { LogFilterComponent } from './shared/components/log-filter/log-filter.component';
import { MachineService } from '@machines/shared/services/machine.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        LogsRoutingModule
    ],
    declarations: [
        LogsComponent,
        LogComponent,
        LogListComponent,
        LogFilterComponent
    ],
    exports: [LogsComponent],
    providers: [LogService, MachineService]
})

export class LogsModule { }
