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
import { MachineService } from './shared/machine.service';

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
        MachineFormComponent
    ],
    exports: [MachinesComponent],
    providers: [MachineService]
})

export class MachinesModule { }
