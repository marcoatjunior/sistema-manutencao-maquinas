import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ChartsModule } from 'ng2-charts';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user/user.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        ChartsModule
    ],
    declarations: [
        UsersComponent,
        UserComponent,
        UserListComponent,
        UserFormComponent
    ],
    exports: [UsersComponent]
})

export class UsersModule { }
