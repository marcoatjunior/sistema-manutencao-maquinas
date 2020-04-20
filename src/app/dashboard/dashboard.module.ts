import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';
import { DashboardService } from './shared/dashboard.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        ChartsModule
    ],
    declarations: [
        DashboardComponent
    ],
    exports: [DashboardComponent],
    providers: [DashboardService]
})

export class DashboardModule { }
