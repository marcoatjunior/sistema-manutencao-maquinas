import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MachinesComponent } from './machines.component';
import { MachinesRoutingModule } from './machines-routing.module';
import { ChartsModule } from 'ng2-charts';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineFormComponent } from './machine-form/machine-form.component';
import { MachineComponent } from './machine/machine.component';
import { MachineService } from './shared/services/machine.service';
import { AddFileFormComponent } from './shared/components/add-file-form/add-file-form.component';
import { AddMaintenanceFormComponent } from './shared/components/add-maintenance-form/add-maintenance-form.component';
import { AddManagerFormComponent } from './shared/components/add-manager-form/add-manager-form.component';
import { AddPieceFormComponent } from './shared/components/add-piece-form/add-piece-form.component';
import { MaintenanceService } from './shared/services/maintenance.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MachinesRoutingModule,
        ChartsModule
    ],
    declarations: [
        MachinesComponent,
        MachineComponent,
        MachineListComponent,
        MachineFormComponent,
        AddFileFormComponent,
        AddMaintenanceFormComponent,
        AddManagerFormComponent,
        AddPieceFormComponent
    ],
    exports: [MachinesComponent],
    providers: [MachineService, MaintenanceService]
})

export class MachinesModule { }
