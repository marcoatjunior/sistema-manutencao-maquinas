import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { SharedModule } from '@shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent]
})

export class LoginModule { }
