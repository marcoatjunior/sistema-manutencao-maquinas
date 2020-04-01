import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaintenancesComponent } from './maintenances.component';
import { AuthGuard } from '@shared/guard';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
    { path: '', component: MaintenancesComponent, canActivate: [AuthGuard] },
    { path: ':id/d', component: MaintenanceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenancesRoutingModule { }
