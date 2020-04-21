import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { ManagersComponent } from "./managers.component";
import { ManagersRoutingModule } from "./managers-routing.module";
import { ChartsModule } from "ng2-charts";
import { ManagerListComponent } from "./manager-list/manager-list.component";
import { ManagerFormComponent } from "./manager-form/manager-form.component";
import { ManagerComponent } from "./manager/manager.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ManagersRoutingModule,
    ChartsModule,
  ],
  declarations: [
    ManagersComponent,
    ManagerComponent,
    ManagerListComponent,
    ManagerFormComponent,
  ],
  exports: [ManagersComponent],
})
export class ManagersModule {}
