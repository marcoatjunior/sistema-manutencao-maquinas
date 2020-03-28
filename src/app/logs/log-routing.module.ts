import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogsComponent } from './logs.component';
import { AuthGuard } from '@shared/guard';
import { LogComponent } from './log/log.component';

const routes: Routes = [
    { path: '', component: LogsComponent, canActivate: [AuthGuard] },
    { path: ':id/d', component: LogComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogsRoutingModule { }
