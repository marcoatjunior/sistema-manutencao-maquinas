import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersComponent } from "./users.component";
import { AuthGuard } from "@shared/guards";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
  { path: "", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "n", component: UserFormComponent },
  { path: ":id", component: UserFormComponent },
  { path: ":id/d", component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
