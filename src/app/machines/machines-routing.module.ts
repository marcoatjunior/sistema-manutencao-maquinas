import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MachinesComponent } from "./machines.component";
import { AuthGuard } from "@shared/guards";
import { MachineFormComponent } from "./machine-form/machine-form.component";
import { MachineComponent } from "./machine/machine.component";
import { MachineLogsComponent } from "./machine-logs/machine-logs.component";

const routes: Routes = [
  { path: "", component: MachinesComponent, canActivate: [AuthGuard] },
  { path: "logs", component: MachineLogsComponent },
  { path: "n", component: MachineFormComponent },
  { path: ":id", component: MachineFormComponent },
  { path: ":id/d", component: MachineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachinesRoutingModule {}
