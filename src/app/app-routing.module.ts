import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'responsaveis',
        loadChildren: () => import('./managers/managers.module').then(m => m.ManagersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'pecas',
        loadChildren: () => import('./pieces/pieces.module').then(m => m.PiecesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'maquinas',
        loadChildren: () => import('./machines/machines.module').then(m => m.MachinesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'logs',
        loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }