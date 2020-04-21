import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MachinesComponent } from "./machines.component";
import { AuthGuard } from "@shared/guard";
import { MachineFormComponent } from "./machine-form/machine-form.component";
import { MachineComponent } from "./machine/machine.component";

const routes: Routes = [
  { path: "", component: MachinesComponent, canActivate: [AuthGuard] },
  { path: "n", component: MachineFormComponent },
  { path: ":id", component: MachineFormComponent },
  { path: ":id/d", component: MachineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachinesRoutingModule {}
