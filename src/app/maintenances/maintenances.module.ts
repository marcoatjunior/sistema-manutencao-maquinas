import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { MaintenancesComponent } from "./maintenances.component";
import { MaintenancesRoutingModule } from "./maintenances-routing.module";
import { MaintenanceListComponent } from "./maintenance-list/maintenance-list.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { MaintenanceFilterComponent } from "./shared/components/maintenance-filter/maintenance-filter.component";
import { MaintenanceService } from "./shared/maintenance.service";
import { ManagerService } from "@managers/shared/manager.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaintenancesRoutingModule,
  ],
  declarations: [
    MaintenancesComponent,
    MaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceFilterComponent,
  ],
  exports: [MaintenancesComponent],
  providers: [MaintenanceService, ManagerService],
})
export class MaintenancesModule {}
