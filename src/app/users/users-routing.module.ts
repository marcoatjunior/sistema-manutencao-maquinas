import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { AuthGuard } from '@shared/guard';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
    { path: '', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'n', component: UserFormComponent },
    { path: ':id', component: UserFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
