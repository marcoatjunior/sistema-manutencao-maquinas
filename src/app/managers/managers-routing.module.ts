import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ManagersComponent } from "./managers.component";
import { AuthGuard } from "@shared/guard";
import { ManagerFormComponent } from "./manager-form/manager-form.component";
import { ManagerComponent } from "./manager/manager.component";

const routes: Routes = [
  { path: "", component: ManagersComponent, canActivate: [AuthGuard] },
  { path: "n", component: ManagerFormComponent },
  { path: ":id", component: ManagerFormComponent },
  { path: ":id/d", component: ManagerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRoutingModule {}
